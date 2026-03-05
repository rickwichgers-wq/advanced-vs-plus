import { initApp, refreshIcons, showToast } from '../core/app.js';
import { renderInto, $, $$ } from '../utils/render.js';
import { renderCalculatorForm, renderResults } from '../components/calculator-form.js';
import { calculateFeeSavings, calculateTCO, calculatePOSSavings, calculateROI, formatCurrency } from '../services/calculators.js';
import { savedCalculations } from '../core/db.js';

async function init() {
  await initApp('calculators');
  renderContent();
  refreshIcons();
}

function renderContent() {
  renderInto('.app-content', `
    <div class="max-w-5xl mx-auto fade-in">
      <div class="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <button data-tab="fees" class="app-tab active px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Fee Savings</button>
        <button data-tab="tco" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">TCO</button>
        <button data-tab="pos" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">POS Pro</button>
        <button data-tab="roi" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">ROI / Payback</button>
      </div>

      <div id="tab-fees" class="app-panel">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Inputs</h3><div id="fees-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Results</h3><div id="fees-results" class="empty-state"><i data-lucide="calculator" class="empty-state-icon"></i><p class="text-sm text-gray-500">Enter values and calculate</p></div></div>
        </div>
      </div>
      <div id="tab-tco" class="app-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Inputs</h3><div id="tco-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Results</h3><div id="tco-results" class="empty-state"><i data-lucide="calculator" class="empty-state-icon"></i><p class="text-sm text-gray-500">Enter values and calculate</p></div></div>
        </div>
      </div>
      <div id="tab-pos" class="app-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Inputs</h3><div id="pos-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Results</h3><div id="pos-results" class="empty-state"><i data-lucide="calculator" class="empty-state-icon"></i><p class="text-sm text-gray-500">Enter values and calculate</p></div></div>
        </div>
      </div>
      <div id="tab-roi" class="app-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Inputs</h3><div id="roi-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Results</h3><div id="roi-results" class="empty-state"><i data-lucide="calculator" class="empty-state-icon"></i><p class="text-sm text-gray-500">Enter values and calculate</p></div></div>
        </div>
      </div>
    </div>
  `);

  initTabs();
  initForms();
}

function initTabs() {
  $$('.app-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabId) {
  $$('.app-tab').forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
  });
  $$('.app-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `tab-${tabId}`);
  });
}

function initForms() {
  renderCalculatorForm('#fees-form', {
    fields: [
      { id: 'gmv', label: 'Monthly GMV', type: 'number', placeholder: '500000', hint: 'Gross Merchandise Volume per month' },
      { id: 'region', label: 'Region', type: 'region' },
      { id: 'billingCycle', label: 'Billing cycle', type: 'select', options: [
        { value: 'annual', label: 'Annual' }, { value: 'monthly', label: 'Monthly' }
      ]},
    ],
    onCalculate: (v) => {
      const r = calculateFeeSavings(v);
      renderResults('#fees-results', [
        { label: 'Advanced fees (annual)', value: formatCurrency(r.advFeeAnnual, v.region) },
        { label: 'Plus fees (annual)', value: formatCurrency(r.plusFeeAnnual, v.region) },
        { label: 'Fee savings (annual)', value: formatCurrency(r.feeSavingsAnnual, v.region), highlight: true },
        { label: 'Plan cost delta (annual)', value: formatCurrency(r.planCostDelta, v.region) },
        { label: 'Net annual savings', value: formatCurrency(r.netAnnualSavings, v.region), highlight: true },
        { label: 'Break-even GMV/mo', value: formatCurrency(r.breakEvenGMV, v.region) },
      ]);
      refreshIcons();
    },
  });

  renderCalculatorForm('#tco-form', {
    fields: [
      { id: 'gmv', label: 'Monthly GMV', type: 'number', placeholder: '500000' },
      { id: 'locations', label: 'POS locations', type: 'number', placeholder: '1', value: 1 },
      { id: 'appsMonthly', label: 'App spend (monthly)', type: 'number', placeholder: '200' },
      { id: 'region', label: 'Region', type: 'region' },
      { id: 'billingCycle', label: 'Billing cycle', type: 'select', options: [
        { value: 'annual', label: 'Annual' }, { value: 'monthly', label: 'Monthly' }
      ]},
    ],
    onCalculate: (v) => {
      const r = calculateTCO(v);
      renderResults('#tco-results', [
        { label: 'Advanced TCO', value: formatCurrency(r.advanced.total, v.region) },
        { label: '  Plan', value: formatCurrency(r.advanced.plan, v.region) },
        { label: '  Transaction fees', value: formatCurrency(r.advanced.fees, v.region) },
        { label: '  POS Pro', value: formatCurrency(r.advanced.pos, v.region) },
        { label: 'Plus TCO', value: formatCurrency(r.plus.total, v.region) },
        { label: '  Plan', value: formatCurrency(r.plus.plan, v.region) },
        { label: '  Transaction fees', value: formatCurrency(r.plus.fees, v.region) },
        { label: '  POS Pro', value: formatCurrency(r.plus.pos, v.region) },
        { label: r.plusCheaper ? 'Plus saves' : 'Plus premium', value: formatCurrency(Math.abs(r.delta), v.region), highlight: true },
      ]);
      refreshIcons();
    },
  });

  renderCalculatorForm('#pos-form', {
    fields: [
      { id: 'locations', label: 'Number of POS locations', type: 'number', placeholder: '5', value: 5 },
      { id: 'region', label: 'Region', type: 'region' },
    ],
    onCalculate: (v) => {
      const r = calculatePOSSavings(v);
      renderResults('#pos-results', [
        { label: 'Monthly POS Pro savings', value: formatCurrency(r.monthlySavings, v.region) },
        { label: 'Annual POS Pro savings', value: formatCurrency(r.annualSavings, v.region), highlight: true },
        { label: 'Plus plan premium (annual)', value: formatCurrency(r.plusPremium, v.region) },
        { label: 'Net savings', value: formatCurrency(r.netSavings, v.region), highlight: true },
        { label: 'Break-even locations', value: `${r.breakEvenLocations} locations` },
        { label: 'Worth upgrading?', value: r.worthIt ? 'Yes' : 'Not for POS alone' },
      ]);
      refreshIcons();
    },
  });

  renderCalculatorForm('#roi-form', {
    fields: [
      { id: 'gmv', label: 'Monthly GMV', type: 'number', placeholder: '500000' },
      { id: 'locations', label: 'POS locations', type: 'number', placeholder: '0', value: 0 },
      { id: 'appsReplacedMonthly', label: 'Apps replaced (monthly cost saved)', type: 'number', placeholder: '0', hint: 'Monthly cost of apps replaced by Plus features' },
      { id: 'region', label: 'Region', type: 'region' },
    ],
    onCalculate: (v) => {
      const r = calculateROI(v);
      renderResults('#roi-results', [
        { label: 'Fee savings (annual)', value: formatCurrency(r.feeSavingsAnnual, v.region) },
        { label: 'POS savings (annual)', value: formatCurrency(r.posSavingsAnnual, v.region) },
        { label: 'App savings (annual)', value: formatCurrency(r.appSavingsAnnual, v.region) },
        { label: 'Total savings', value: formatCurrency(r.totalSavings, v.region), highlight: true },
        { label: 'Plus premium (annual)', value: formatCurrency(r.plusPremium, v.region) },
        { label: 'ROI', value: `${Math.round(r.roi)}%`, highlight: true },
        { label: 'Payback period', value: r.paybackMonths === Infinity ? 'N/A' : `${r.paybackMonths} months` },
      ]);
      refreshIcons();
    },
  });

  refreshIcons();
}

init();
