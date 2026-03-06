import { initApp, refreshIcons } from '../core/app.js';
import { renderInto, $, $$ } from '../utils/render.js';
import { EMEA_COUNTRIES } from '../utils/data.js';
import { calculateUnified, fmtCurrency, fmtPercent } from '../services/calculators.js';

let chartInstance = null;

const CE_SCENARIOS = {
  minimal:    { convUplift: 0.01, aovUplift: 0.01, label: 'Minimal' },
  moderate:   { convUplift: 0.03, aovUplift: 0.03, label: 'Moderate' },
  strong:     { convUplift: 0.05, aovUplift: 0.05, label: 'Strong' },
  aggressive: { convUplift: 0.08, aovUplift: 0.08, label: 'Aggressive' },
};
let ceActiveScenario = 'moderate';
let ceInclude = false;
let ceLastGrowth = 0;

async function init() {
  await initApp('calculators');
  renderContent();
  refreshIcons();
  attachListeners();
  recalculate();
}

function countryOpts() {
  return Object.entries(EMEA_COUNTRIES)
    .map(([k, c]) => `<option value="${k}">${c.label} (${c.symbol})</option>`)
    .join('');
}

function tip(t) {
  return `<span class="relative group/tip cursor-help ml-1 inline-flex items-center"><i data-lucide="info" class="w-3 h-3 text-gray-300 dark:text-gray-600"></i><span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-56 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] leading-tight p-2 opacity-0 group-hover/tip:opacity-100 transition-opacity z-50 shadow-lg text-center">${t}</span></span>`;
}

function lbl(text, tooltip) {
  return `<label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${text}${tip(tooltip)}</label>`;
}

function renderContent() {
  renderInto('.app-content', `
    <div class="max-w-6xl mx-auto fade-in">

      <div class="card mb-6">
        <div class="p-5">
          <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Merchant Details</h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
            <div>
              ${lbl('Country', 'Merchant billing country. Sets plan price, SP rates, and POS Pro cost.')}
              <select id="inp-country" class="form-input text-sm w-full">${countryOpts()}</select>
            </div>
            <div>
              ${lbl('Plus Term', '3-year term has lower fixed minimum and VPF rate (0.35% vs 0.40% D2C).')}
              <select id="inp-term" class="form-input text-sm w-full">
                <option value="1yr">1 Year</option>
                <option value="3yr">3 Year</option>
              </select>
            </div>
            <div>
              ${lbl('Merchant Type', 'Post-Feb 2024 merchants pay higher 3P fees on Advanced (0.6% vs 0.5%).')}
              <select id="inp-new-merchant" class="form-input text-sm w-full">
                <option value="existing" selected>Existing</option>
                <option value="new">New (post-Feb 2024)</option>
              </select>
            </div>
            <div>
              ${lbl('Shopify Payments', 'Does the merchant use Shopify Payments? If yes, Plus 3P fee = 0% (excl. PayPal).')}
              <select id="inp-sp-enabled" class="form-input text-sm w-full">
                <option value="yes" selected>Yes — SP enabled</option>
                <option value="no">No — 3rd party only</option>
              </select>
            </div>
            <div>
              ${lbl('Stores', 'Advanced charges plan price per store. Plus includes up to 9 expansion stores free.')}
              <input type="number" id="inp-stores" class="form-input text-sm w-full" placeholder="1" value="1" min="1">
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              ${lbl('SP Volume (annual)', 'Annual sales processed through Shopify Payments (credit/debit cards).')}
              <input type="number" id="inp-sp" class="form-input text-sm w-full" placeholder="1000000" value="1000000">
            </div>
            <div>
              ${lbl('3P Volume (annual)', 'Annual sales via 3rd-party gateways (excl. PayPal).')}
              <input type="number" id="inp-tp" class="form-input text-sm w-full" placeholder="0" value="0">
            </div>
          </div>
        </div>

        <details class="group border-t border-gray-100 dark:border-gray-800" id="adv-settings">
          <summary class="px-5 py-3 cursor-pointer flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors select-none">
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
            Advanced Settings
            <i data-lucide="chevron-down" class="w-3 h-3 ml-auto text-gray-400 transition-transform group-open:rotate-180"></i>
          </summary>
          <div class="px-5 pb-5">
            <div class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 mt-1">Volume & Mix</div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                ${lbl('POS Locations', 'Physical retail locations. POS Pro is charged per location on Advanced, free on Plus.')}
                <input type="number" id="inp-pos-loc" class="form-input text-sm w-full" placeholder="0" value="0" min="0">
              </div>
              <div>
                ${lbl('POS Volume (annual)', 'In-person sales volume. VPF uses Retail rate (0.25%) instead of D2C (0.40%).')}
                <input type="number" id="inp-pos-vol" class="form-input text-sm w-full" placeholder="0" value="0">
              </div>
              <div>
                ${lbl('PayPal Volume (annual)', 'PayPal Express volume. Even with SP enabled, Plus still charges 0.15% on PayPal (not 0%).')}
                <input type="number" id="inp-paypal" class="form-input text-sm w-full" placeholder="0" value="0">
              </div>
              <div>
                ${lbl('B2B Volume (annual)', 'B2B on Shopify volume. VPF uses B2B rate (0.18%) — lowest channel rate.')}
                <input type="number" id="inp-b2b" class="form-input text-sm w-full" placeholder="0" value="0">
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                ${lbl('International Card %', 'Share of SP volume from intl/Amex cards (higher rates = bigger Plus savings).')}
                <div class="flex items-center gap-2 mt-1">
                  <input type="range" id="inp-intl" class="flex-1 h-1.5 accent-indigo-500" min="0" max="100" value="10" step="5">
                  <span id="intl-display" class="text-xs font-mono text-gray-500 w-8 text-right">10%</span>
                </div>
              </div>
              <div>
                ${lbl('App Savings (monthly)', 'Monthly cost of apps that Plus features replace (Flow, Launchpad, checkout apps, etc.).')}
                <input type="number" id="inp-apps" class="form-input text-sm w-full" placeholder="0" value="0" min="0">
              </div>
            </div>

            <div class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Rate Overrides <span class="font-normal normal-case">(leave blank for standard rates)</span></div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                ${lbl('Custom Adv SP Rate %', 'Override Advanced SP rate (e.g. legacy/negotiated rate).')}
                <input type="number" id="inp-cust-adv-sp" class="form-input text-sm w-full" placeholder="Auto" step="0.01" min="0">
              </div>
              <div>
                ${lbl('Custom Plus SP Rate %', 'Override Plus SP rate (e.g. negotiated via rate review).')}
                <input type="number" id="inp-cust-plus-sp" class="form-input text-sm w-full" placeholder="Auto" step="0.01" min="0">
              </div>
            </div>
          </div>
        </details>
      </div>

      <div id="savings-cards" class="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6"></div>

      <details class="card mb-6 group" id="checkout-ext-section">
        <summary class="px-5 py-4 cursor-pointer flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors select-none rounded-xl">
          <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
            <i data-lucide="sparkles" class="w-4 h-4 text-indigo-500 dark:text-indigo-400"></i>
          </div>
          <div class="flex-1">
            <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">Checkout Extensibility Growth</div>
            <div class="text-[11px] text-gray-400 dark:text-gray-500">Estimate revenue uplift from Plus checkout customization</div>
          </div>
          <span id="ce-summary-pill" class="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 mr-2 hidden">+€0</span>
          <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0"></i>
        </summary>
        <div class="px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
          <div class="mt-4 mb-4 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-50/50 to-emerald-50/50 dark:from-indigo-900/10 dark:to-emerald-900/10 border border-indigo-100/50 dark:border-indigo-800/30">
            <p class="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong class="text-gray-700 dark:text-gray-200">Plus</strong> unlocks full checkout extensibility — custom UI, Shopify Functions, branded checkout, and third-party extensions.
              <strong class="text-gray-700 dark:text-gray-200">Advanced</strong> is limited to the standard checkout. Select the scenario that best matches this merchant.
            </p>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5" id="ce-scenario-cards">
            <button data-ce-scenario="minimal" class="ce-scenario-btn group/s rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 text-left transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 hover:shadow-md cursor-pointer bg-white dark:bg-gray-800/50">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors ce-radio flex-shrink-0"></div>
                <div class="text-sm font-bold text-gray-800 dark:text-gray-200">Minimal</div>
              </div>
              <div class="flex gap-1.5 mb-2">
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill">+1% Conv</span>
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill">+1% AOV</span>
              </div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">Branded checkout builds trust and reduces abandonment. Custom colours, logo, and fonts aligned to the storefront.</div>
            </button>
            <button data-ce-scenario="moderate" class="ce-scenario-btn group/s rounded-xl border-2 border-emerald-400 dark:border-emerald-600 p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-800/50 shadow-[0_0_0_3px_rgba(16,185,129,0.1)] ce-selected">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center transition-colors ce-radio flex-shrink-0"><div class="w-1.5 h-1.5 rounded-full bg-white"></div></div>
                <div class="text-sm font-bold text-emerald-700 dark:text-emerald-300">Moderate</div>
              </div>
              <div class="flex gap-1.5 mb-2">
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ce-pill">+3% Conv</span>
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ce-pill">+3% AOV</span>
              </div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">Checkout UI extensions for upsells, trust badges, and delivery promises. Custom payment & shipping logic via Shopify Functions.</div>
            </button>
            <button data-ce-scenario="strong" class="ce-scenario-btn group/s rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 text-left transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 hover:shadow-md cursor-pointer bg-white dark:bg-gray-800/50">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors ce-radio flex-shrink-0"></div>
                <div class="text-sm font-bold text-gray-800 dark:text-gray-200">Strong</div>
              </div>
              <div class="flex gap-1.5 mb-2">
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill">+5% Conv</span>
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill">+5% AOV</span>
              </div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">Post-purchase upsells, in-checkout cross-sells, loyalty redemption, and A/B testing checkout flows with partner apps.</div>
            </button>
            <button data-ce-scenario="aggressive" class="ce-scenario-btn group/s rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 text-left transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 hover:shadow-md cursor-pointer bg-white dark:bg-gray-800/50">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors ce-radio flex-shrink-0"></div>
                <div class="text-sm font-bold text-gray-800 dark:text-gray-200">Aggressive</div>
              </div>
              <div class="flex gap-1.5 mb-2">
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill">+8% Conv</span>
                <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill">+8% AOV</span>
              </div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">Full dev team building custom checkout, subscription flows, dynamic discounting, gift options, and advanced personalization.</div>
            </button>
          </div>

          <div id="ce-results" class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"></div>

          <label class="mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors" id="ce-include-label">
            <div class="relative">
              <input type="checkbox" id="ce-include-toggle" class="sr-only peer">
              <div class="w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-emerald-500 transition-colors"></div>
              <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
            </div>
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 peer-checked:text-emerald-600" id="ce-include-text">Include checkout growth in net savings</span>
          </label>
        </div>
      </details>

      <div id="net-banner" class="mb-6"></div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="card" id="comparison-table"></div>
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Annual Cost Breakdown${tip('Stacked bar chart showing cost composition per plan.')}</h3>
          <div style="position:relative; height:320px;">
            <canvas id="cost-chart"></canvas>
          </div>
        </div>
      </div>

      <div class="card mb-6" id="sp-rates-card"></div>
    </div>
  `);
}

const ALL_INPUTS = [
  'inp-country', 'inp-sp', 'inp-tp', 'inp-pos-loc', 'inp-term',
  'inp-paypal', 'inp-pos-vol', 'inp-b2b', 'inp-intl', 'inp-stores',
  'inp-sp-enabled', 'inp-new-merchant', 'inp-apps',
  'inp-cust-adv-sp', 'inp-cust-plus-sp',
];

function attachListeners() {
  ALL_INPUTS.forEach(id => {
    const el = $(`#${id}`);
    if (el) {
      el.addEventListener('input', recalculate);
      el.addEventListener('change', recalculate);
    }
  });
  const sl = $('#inp-intl'), disp = $('#intl-display');
  if (sl && disp) sl.addEventListener('input', () => { disp.textContent = sl.value + '%'; });

  $$('.ce-scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ceActiveScenario = btn.dataset.ceScenario;
      updateScenarioCards();
      recalculate();
    });
  });

  const ceToggle = $('#ce-include-toggle');
  if (ceToggle) {
    ceToggle.addEventListener('change', () => {
      ceInclude = ceToggle.checked;
      updateIncludeLabel();
      recalculate();
    });
  }
}

function updateScenarioCards() {
  const selectedCls = ['ce-selected', 'border-emerald-400', 'dark:border-emerald-600',
    'bg-gradient-to-b', 'from-emerald-50/50', 'to-white',
    'dark:from-emerald-900/10', 'dark:to-gray-800/50',
    'shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'];
  const defaultCls = ['border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800/50'];

  $$('.ce-scenario-btn').forEach(btn => {
    const isActive = btn.dataset.ceScenario === ceActiveScenario;
    if (isActive) {
      btn.classList.remove(...defaultCls);
      btn.classList.add(...selectedCls);
      const radio = btn.querySelector('.ce-radio');
      radio.className = 'w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center transition-colors ce-radio flex-shrink-0';
      radio.innerHTML = '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>';
      btn.querySelector('.text-sm').className = 'text-sm font-bold text-emerald-700 dark:text-emerald-300';
      btn.querySelectorAll('.ce-pill').forEach(p => {
        p.className = 'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ce-pill';
      });
    } else {
      btn.classList.remove(...selectedCls);
      btn.classList.add(...defaultCls);
      const radio = btn.querySelector('.ce-radio');
      radio.className = 'w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors ce-radio flex-shrink-0';
      radio.innerHTML = '';
      btn.querySelector('.text-sm').className = 'text-sm font-bold text-gray-800 dark:text-gray-200';
      btn.querySelectorAll('.ce-pill').forEach(p => {
        p.className = 'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ce-pill';
      });
    }
  });
}

function updateIncludeLabel() {
  const label = $('#ce-include-label');
  const text = $('#ce-include-text');
  if (label) {
    label.className = ceInclude
      ? 'mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors bg-emerald-50 dark:bg-emerald-900/20'
      : 'mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors bg-gray-50 dark:bg-gray-800/50';
  }
  if (text) {
    text.className = ceInclude
      ? 'text-xs font-semibold text-emerald-600 dark:text-emerald-400'
      : 'text-xs font-semibold text-gray-500 dark:text-gray-400';
  }
}

function getInputs() {
  const ca = parseFloat($('#inp-cust-adv-sp')?.value);
  const cp = parseFloat($('#inp-cust-plus-sp')?.value);
  return {
    country: $('#inp-country')?.value || 'de',
    spVolume: parseFloat($('#inp-sp')?.value) || 0,
    thirdPartyVolume: parseFloat($('#inp-tp')?.value) || 0,
    paypalVolume: parseFloat($('#inp-paypal')?.value) || 0,
    posVolume: parseFloat($('#inp-pos-vol')?.value) || 0,
    posLocations: parseInt($('#inp-pos-loc')?.value) || 0,
    plusTerm: $('#inp-term')?.value || '1yr',
    intlPct: parseInt($('#inp-intl')?.value) || 0,
    b2bVolume: parseFloat($('#inp-b2b')?.value) || 0,
    numStores: Math.max(1, parseInt($('#inp-stores')?.value) || 1),
    isNewMerchant: $('#inp-new-merchant')?.value === 'new',
    spEnabled: $('#inp-sp-enabled')?.value !== 'no',
    appSavingsMonthly: parseFloat($('#inp-apps')?.value) || 0,
    customAdvSpRate: isNaN(ca) ? null : ca / 100,
    customPlusSpRate: isNaN(cp) ? null : cp / 100,
  };
}

function recalculate() {
  const inp = getInputs();
  const r = calculateUnified(inp);
  const cc = inp.country;
  renderSavingsCards(r, cc, inp);
  renderCheckoutGrowth(r, cc);
  renderNetBanner(r, cc);
  renderComparisonTable(r, cc, inp);
  renderChart(r, cc);
  renderSpRatesTable(r, cc, inp);
}

// --- Checkout extensibility growth ---

function renderCheckoutGrowth(r, cc) {
  const el = $('#ce-results');
  if (!el) return;

  const scenario = CE_SCENARIOS[ceActiveScenario];
  const totalGMV = r.totalGMV;
  const monthlyGMV = totalGMV / 12;

  const additionalSalesFromConv = monthlyGMV * scenario.convUplift;
  const aovLift = monthlyGMV * scenario.aovUplift;
  const totalGrowthMonthly = additionalSalesFromConv + aovLift;
  ceLastGrowth = totalGrowthMonthly * 12;

  const pill = $('#ce-summary-pill');
  if (pill) {
    pill.textContent = ceInclude && ceLastGrowth > 0 ? `+${fmtCurrency(ceLastGrowth, cc)}/yr` : '';
    pill.classList.toggle('hidden', !ceInclude || ceLastGrowth <= 0);
  }

  updateIncludeLabel();

  const convPct = (scenario.convUplift * 100).toFixed(0);
  const aovPct = (scenario.aovUplift * 100).toFixed(0);

  el.innerHTML = `
    <div class="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
      <div class="p-4 text-center">
        <div class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Conv. Uplift</div>
        <div class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">+${convPct}%</div>
        <div class="text-[10px] text-gray-400 mt-0.5">→ +${fmtCurrency(additionalSalesFromConv, cc)}/mo</div>
      </div>
      <div class="p-4 text-center">
        <div class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">AOV Uplift</div>
        <div class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">+${aovPct}%</div>
        <div class="text-[10px] text-gray-400 mt-0.5">→ +${fmtCurrency(aovLift, cc)}/mo</div>
      </div>
      <div class="p-4 text-center">
        <div class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Total Growth</div>
        <div class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">${fmtCurrency(totalGrowthMonthly, cc)}</div>
        <div class="text-[10px] text-gray-400 mt-0.5">${fmtCurrency(ceLastGrowth, cc)}/yr</div>
      </div>
    </div>
    <div class="px-4 py-3 bg-gradient-to-r from-emerald-50/80 to-emerald-50/30 dark:from-emerald-900/15 dark:to-emerald-900/5 border-t border-emerald-100 dark:border-emerald-800/30 text-center">
      <span class="text-[11px] text-gray-500 dark:text-gray-400">Based on <strong class="text-gray-700 dark:text-gray-200">${fmtCurrency(totalGMV, cc)}</strong> total GMV and <strong class="text-gray-700 dark:text-gray-200">${scenario.label}</strong> scenario</span>
    </div>`;
}

// --- Savings cards ---

function sCard(label, amount, cc, icon, tt) {
  const pos = amount >= 0;
  const col = pos ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';
  const bg = pos ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20';
  return `<div class="card p-3">
    <div class="flex items-center gap-1.5 mb-1.5">
      <div class="w-6 h-6 rounded-md ${bg} flex items-center justify-center"><i data-lucide="${icon}" class="w-3 h-3 ${col}"></i></div>
      <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-tight">${label}${tip(tt)}</span>
    </div>
    <div class="text-lg font-bold ${col}">${fmtCurrency(amount, cc)}</div>
    <div class="text-[9px] text-gray-400">per year</div>
  </div>`;
}

function renderSavingsCards(r, cc, inp) {
  const el = $('#savings-cards');
  if (!el) return;

  const tpLabel = inp.spEnabled ? '3P Savings (0% on Plus)' : '3P Fee Savings';
  const tpTip = inp.spEnabled
    ? 'With SP enabled, Plus charges 0% 3P fee (excl. PayPal) vs Advanced 0.5%.'
    : `Without SP, Plus 3P fee is ${inp.isNewMerchant ? '0.20%' : '0.15%'} vs Advanced ${inp.isNewMerchant ? '0.60%' : '0.50%'}.`;

  const allFeeSavings = r.tpSavings + r.paypalSavings;
  const feeTip = r.paypalSavings > 0
    ? `${tpTip} PayPal saving included: ${fmtCurrency(r.paypalSavings, cc)}/yr.`
    : tpTip;

  const cards = [
    sCard('SP Rate Savings', r.spSavings, cc, 'credit-card',
      `Lower SP card rates on Plus. Blended: Adv ${fmtPercent(r.advSpRate)} → Plus ${fmtPercent(r.plusSpRate)}.`),
    sCard(tpLabel, allFeeSavings, cc, 'receipt', feeTip),
    sCard('POS Pro Savings', r.posSavings, cc, 'store',
      `POS Pro: ${r.country.symbol}${r.posProPerLoc}/mo per location on Advanced, free on Plus.`),
  ];

  if (r.numStores > 1) {
    cards.push(sCard('Store Savings', r.storeSavings, cc, 'layout-grid',
      `${r.numStores} stores. Advanced charges per store, Plus includes up to 9 expansion stores.`));
  }
  if (r.appSavingsAnnual > 0) {
    cards.push(sCard('App Savings', r.appSavingsAnnual, cc, 'package',
      'Annual savings from apps replaced by Plus-included features (Flow, Launchpad, checkout apps, etc.).'));
  }

  cards.push(sCard('Plan Cost Delta', -r.planDelta, cc, 'arrow-up-down',
    r.vpfActive
      ? 'VPF active — Plus platform fee scales with GMV. Advanced has a flat fee.'
      : 'Annual plan cost difference. Plus is higher but includes more.'));

  el.innerHTML = cards.join('');
  refreshIcons();
}

// --- Net banner ---

function renderNetBanner(r, cc) {
  const el = $('#net-banner');
  if (!el) return;

  const ceGrowthAnnual = ceInclude ? ceLastGrowth : 0;
  const combined = r.netSavings + ceGrowthAnnual;
  const pos = combined >= 0;
  const border = pos ? 'border-emerald-400 dark:border-emerald-600' : 'border-red-400 dark:border-red-600';
  const bg = pos ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20';
  const txt = pos ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300';
  const label = pos ? 'Net Annual Savings with Plus' : 'Net Annual Cost Increase with Plus';

  let vpf = '';
  if (r.vpfActive) {
    vpf = `<div class="mt-3 px-4 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-left max-w-xl mx-auto">
      <div class="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">Variable Platform Fee (VPF) is active</div>
      <div class="text-[11px] text-amber-600 dark:text-amber-400 leading-relaxed">
        Total GMV (${fmtCurrency(r.totalGMV, cc)}) exceeds VPF threshold (~${fmtCurrency(r.vpfThresholdAnnual, cc)}/yr).
        Plus platform fee: ${fmtCurrency(r.plusPlanAnnual, cc)}/yr vs Advanced flat ${fmtCurrency(r.advPlanAnnual, cc)}/yr.
        Try 3-year term for lower VPF, or this merchant may need an Enterprise deal.
      </div>
    </div>`;
  }

  let ceNote = '';
  if (ceInclude && ceGrowthAnnual > 0) {
    ceNote = `<div class="mt-2 text-[11px] text-gray-400">
      Fee savings: ${fmtCurrency(r.netSavings, cc)} + Checkout growth: ${fmtCurrency(ceGrowthAnnual, cc)} (${CE_SCENARIOS[ceActiveScenario].label})
    </div>`;
  }

  el.innerHTML = `<div class="rounded-lg border ${border} ${bg} px-4 py-3 flex items-center justify-between flex-wrap gap-2">
    <div class="flex items-center gap-3">
      <div class="text-xs font-medium text-gray-500 dark:text-gray-400">${label}</div>
      <div class="text-xl font-extrabold ${txt}">${fmtCurrency(Math.abs(combined), cc)}</div>
    </div>
    <div class="flex items-center gap-3 text-[11px] text-gray-400">
      <span>${fmtCurrency(Math.abs(combined / 12), cc)}/mo</span>
      <span>&middot;</span>
      <span>Payback ${r.paybackMonths === Infinity ? 'N/A' : r.paybackMonths === 0 ? 'Immediate' : r.paybackMonths + ' mo'}</span>
      ${ceInclude && ceGrowthAnnual > 0 ? `<span>&middot;</span><span>Incl. checkout growth (${CE_SCENARIOS[ceActiveScenario].label})</span>` : ''}
    </div>
    ${vpf}
  </div>`;
}

// --- Comparison table ---

function renderComparisonTable(r, cc, inp) {
  const el = $('#comparison-table');
  if (!el) return;

  function row(label, adv, plus, hl = false, indent = false) {
    const cls = hl ? 'font-bold bg-gray-50 dark:bg-gray-800/50' : '';
    const pad = indent ? 'pl-8' : 'px-4';
    const tc = indent ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300';
    const diff = adv - plus;
    const dc = diff > 0 ? 'text-emerald-600 dark:text-emerald-400' : diff < 0 ? 'text-red-500' : 'text-gray-400';
    return `<tr class="${cls}">
      <td class="py-2 ${pad} text-sm ${tc}">${label}</td>
      <td class="py-2 px-4 text-sm text-right font-mono">${fmtCurrency(adv, cc)}</td>
      <td class="py-2 px-4 text-sm text-right font-mono">${fmtCurrency(plus, cc)}</td>
      <td class="py-2 px-4 text-sm text-right font-mono ${dc}">${diff !== 0 ? fmtCurrency(diff, cc) : '—'}</td>
    </tr>`;
  }

  const storeRow = r.numStores > 1 ? row(`Expansion stores (${r.numStores - 1})`, r.advExtraStoreCostAnnual, r.plusExtraStoreCostAnnual, false, true) : '';
  const paypalRow = inp.paypalVolume > 0 ? row('PayPal fees', r.advPaypalFees, r.plusPaypalFees) : '';
  const appRow = r.appSavingsAnnual > 0 ? row('App savings', 0, -r.appSavingsAnnual) : '';

  const ceGrowth = ceInclude ? ceLastGrowth : 0;
  const ceRow = ceGrowth > 0 ? `<tr class="bg-emerald-50/50 dark:bg-emerald-900/10">
    <td class="py-2 px-4 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
      <svg class="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
      Checkout extensibility growth (${CE_SCENARIOS[ceActiveScenario].label})
    </td>
    <td class="py-2 px-4 text-sm text-right font-mono text-gray-400">—</td>
    <td class="py-2 px-4 text-sm text-right font-mono text-emerald-600 dark:text-emerald-400">-${fmtCurrency(ceGrowth, cc)}</td>
    <td class="py-2 px-4 text-sm text-right font-mono text-emerald-600 dark:text-emerald-400">${fmtCurrency(ceGrowth, cc)}</td>
  </tr>` : '';

  const advTotal = r.advTCO - r.appSavingsAnnual;
  const plusTotal = r.plusTCO - r.appSavingsAnnual;
  const plusNetTotal = plusTotal - ceGrowth;

  el.innerHTML = `<div class="p-5">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Annual Cost Comparison${tip('Full cost breakdown. Green = Plus saves money.')}</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-left min-w-[480px]">
        <thead><tr class="border-b border-gray-200 dark:border-gray-700">
          <th class="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"></th>
          <th class="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase text-right">Advanced</th>
          <th class="py-2 px-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase text-right">Plus</th>
          <th class="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase text-right">Saving</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          ${row('Platform fee', r.advPlanAnnual, r.plusPlanAnnual)}
          ${storeRow}
          ${row('SP processing fees', r.advSpFees, r.plusSpFees)}
          ${row('3P transaction fees', r.advTpFees, r.plusTpFees)}
          ${paypalRow}
          ${row('POS Pro', r.advPosCost, r.plusPosCost)}
          ${appRow}
          ${row('Total annual cost', advTotal, plusTotal, true)}
          ${ceRow}
          ${ceGrowth > 0 ? row('Net (incl. checkout growth)', advTotal, plusNetTotal, true) : ''}
          ${r.appSavingsAnnual > 0 && ceGrowth <= 0 ? row('Net (incl. app savings)', r.advTCO, r.plusTCO - r.appSavingsAnnual, true) : ''}
        </tbody>
      </table>
    </div>
  </div>`;
}

// --- Chart ---

function renderChart(r, cc) {
  const canvas = $('#cost-chart');
  if (!canvas) return;
  if (chartInstance) chartInstance.destroy();

  const dark = document.documentElement.classList.contains('dark');
  const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const tick = dark ? '#9ca3af' : '#6b7280';

  const ceGrowthChart = ceInclude ? ceLastGrowth : 0;
  const datasets = [
    { label: 'Platform', data: [r.advPlanAnnual, r.plusPlanAnnual], backgroundColor: '#6366f1' },
    { label: 'SP Fees', data: [r.advSpFees, r.plusSpFees], backgroundColor: '#f59e0b' },
    { label: '3P Fees', data: [r.advTpFees, r.plusTpFees], backgroundColor: '#ef4444' },
  ];
  if (r.advPaypalFees > 0 || r.plusPaypalFees > 0) {
    datasets.push({ label: 'PayPal', data: [r.advPaypalFees, r.plusPaypalFees], backgroundColor: '#0070ba' });
  }
  datasets.push({ label: 'POS Pro', data: [r.advPosCost, r.plusPosCost], backgroundColor: '#8b5cf6' });
  if (ceGrowthChart > 0) {
    datasets.push({ label: 'Checkout Growth', data: [0, -ceGrowthChart], backgroundColor: '#10b981' });
  }

  chartInstance = new Chart(canvas, {
    type: 'bar',
    data: { labels: ['Advanced', 'Plus'], datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: tick, boxWidth: 12, padding: 14, font: { size: 11 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmtCurrency(ctx.raw, cc)}` } },
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: tick, font: { size: 12, weight: 600 } } },
        y: { stacked: true, grid: { color: grid }, ticks: { color: tick, font: { size: 11 }, callback: v => fmtCurrency(v, cc) } },
      },
    },
  });
}

// --- SP rates reference ---

function renderSpRatesTable(r, cc, inp) {
  const el = $('#sp-rates-card');
  if (!el) return;
  const c = r.country, sp = c.sp;

  const fixedFee = new Intl.NumberFormat(c.locale || 'en-US', {
    style: 'currency', currency: c.currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(sp.advanced.fixed);

  function rr(label, adv, plus) {
    const s = adv - plus;
    return `<tr>
      <td class="py-1.5 px-4 text-sm text-gray-600 dark:text-gray-300">${label}</td>
      <td class="py-1.5 px-4 text-sm text-right font-mono">${fmtPercent(adv)} + ${fixedFee}</td>
      <td class="py-1.5 px-4 text-sm text-right font-mono">${fmtPercent(plus)} + ${fixedFee}</td>
      <td class="py-1.5 px-4 text-sm text-right font-mono text-emerald-600 dark:text-emerald-400">${s > 0 ? '-' + fmtPercent(s) : '—'}</td>
    </tr>`;
  }

  const spStatus = inp.spEnabled ? 'enabled' : 'disabled';

  el.innerHTML = `<details class="group">
    <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
      <span>Shopify Payments Rates — ${c.label}</span>
      <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180"></i>
    </summary>
    <div class="px-5 pb-4">
      <table class="w-full text-left">
        <thead><tr class="border-b border-gray-200 dark:border-gray-700">
          <th class="py-1.5 px-4 text-xs font-semibold text-gray-500 uppercase">Card Type</th>
          <th class="py-1.5 px-4 text-xs font-semibold text-gray-500 uppercase text-right">Advanced</th>
          <th class="py-1.5 px-4 text-xs font-semibold text-emerald-600 uppercase text-right">Plus</th>
          <th class="py-1.5 px-4 text-xs font-semibold text-gray-500 uppercase text-right">Saving</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          ${rr('Domestic / EEA', sp.advanced.domestic, sp.plus.domestic)}
          ${rr('International', sp.advanced.intl, sp.plus.intl)}
          ${rr('Amex', sp.advanced.amex, sp.plus.amex)}
        </tbody>
      </table>
      <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
        <div>3P txn fee (SP ${spStatus}): Adv ${fmtPercent(r.advTpRate)} / Plus ${fmtPercent(r.plusTpRate)}</div>
        <div>PayPal txn fee: Adv ${fmtPercent(r.advPaypalRate)} / Plus ${fmtPercent(r.plusPaypalRate)}</div>
        <div>POS Pro: ${c.symbol}${r.posProPerLoc}/mo per location (Advanced) / Free (Plus)</div>
      </div>
    </div>
  </details>`;
  refreshIcons();
}

init();
