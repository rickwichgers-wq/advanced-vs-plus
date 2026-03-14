import { initApp, refreshIcons, showToast } from '../core/app.js';
import { renderInto, mdToHTML } from '../utils/render.js';
import { renderGeneratorForm, renderPreview } from '../components/generator-form.js';
import { OUTCOME_MAP, VERTICAL_PROFILES, GMV_RANGES, REGIONS } from '../utils/data.js';
import {
  generateValueStory,
  generateTalkingPoints,
  generateObjectionDrill,
  getMatchingProof,
  generateOnePager,
  generateEmail,
  generateTalkTrack,
  generateExecutiveSummary,
} from '../services/generators.js';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let selectedOutcomes = new Set();
let calcData = null;
let includeCalcData = false;

async function init() {
  await initApp('generators');
  detectCalcData();
  renderContent();
  refreshIcons();
}

function detectCalcData() {
  try {
    const raw = sessionStorage.getItem('ap:db:saved_calculations');
    if (!raw) return;
    const items = JSON.parse(raw);
    if (!Array.isArray(items) || !items.length) return;
    const latest = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    if (latest) {
      calcData = latest;
      includeCalcData = true;
    }
  } catch { /* no calc data */ }
}

function getSharedContext() {
  return {
    merchantName: $('#ctx-merchantName')?.value || '',
    vertical: $('#ctx-vertical')?.value || '',
    region: $('#ctx-region')?.value || '',
    gmv: $('#ctx-gmv')?.value || '',
    additionalContext: $('#ctx-additionalContext')?.value || '',
    calcData: includeCalcData ? calcData : null,
  };
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

function renderContent() {
  const verticalOpts = Object.entries(VERTICAL_PROFILES)
    .map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
  const regionOpts = Object.entries(REGIONS)
    .map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
  const gmvOpts = GMV_RANGES
    .map(g => `<option value="${g.value}">${g.label}</option>`).join('');

  const calcBanner = calcData ? `
    <div id="calc-banner" class="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
        <i data-lucide="calculator" class="w-4 h-4 flex-shrink-0"></i>
        <span>Calculator data detected${calcData.merchantName ? ` for <strong>${calcData.merchantName}</strong>` : ''}${calcData.annualSavings ? ` — ${calcData.annualSavings} annual savings` : ''}</span>
      </div>
      <label class="flex items-center gap-2 text-sm cursor-pointer flex-shrink-0">
        <input type="checkbox" id="calc-toggle" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${includeCalcData ? 'checked' : ''}>
        <span class="text-gray-600 dark:text-gray-400">Include</span>
      </label>
    </div>` : '';

  const outcomeCards = Object.entries(OUTCOME_MAP).map(([id, o]) => `
    <button data-outcome="${id}" class="outcome-card group text-left p-3 rounded-lg border-2 transition-all
      border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600">
      <div class="flex items-center gap-2 mb-1">
        <i data-lucide="${o.icon}" class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors"></i>
        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">${o.label}</span>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">${o.description}</p>
    </button>
  `).join('');

  renderInto('.app-content', `
    <div class="max-w-6xl mx-auto fade-in space-y-6">

      <!-- Section A: Shared Context -->
      <div class="card">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <i data-lucide="user" class="w-4 h-4"></i> Merchant Context
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Merchant Name</label>
            <input type="text" id="ctx-merchantName" class="form-input" placeholder="Acme Corp">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Vertical</label>
            <select id="ctx-vertical" class="form-input">
              <option value="">Select...</option>
              ${verticalOpts}
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Region</label>
            <select id="ctx-region" class="form-input">
              <option value="">Select...</option>
              ${regionOpts}
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Annual GMV</label>
            <select id="ctx-gmv" class="form-input">
              <option value="">Select...</option>
              ${gmvOpts}
            </select>
          </div>
        </div>
        <div class="mt-3">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Additional Context</label>
          <textarea id="ctx-additionalContext" class="form-input" rows="2" placeholder="Business issues, pain points, goals, current challenges... (e.g. 'Struggling with checkout abandonment, planning B2B launch in Q3, need to reduce CAC')"></textarea>
        </div>
        ${calcBanner}
      </div>

      <!-- Section B: Rep Prep -->
      <div class="card">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <i data-lucide="briefcase" class="w-4 h-4"></i> Rep Prep — Select Outcomes
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4" id="outcome-grid">
          ${outcomeCards}
        </div>
        <button id="generate-prep-btn" class="btn btn-primary w-full sm:w-auto justify-center" disabled>
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          Generate Prep
        </button>
      </div>

      <!-- Rep Prep Output -->
      <div id="prep-output" class="hidden">
        <div class="flex items-center gap-1 mb-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button data-prep-tab="value-story" class="prep-tab active px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Value Story</button>
          <button data-prep-tab="talking-points" class="prep-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Talking Points</button>
          <button data-prep-tab="objection-drill" class="prep-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Objection Drill</button>
          <button data-prep-tab="proof" class="prep-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Proof</button>
        </div>
        <div id="prep-panel-value-story" class="prep-panel card"></div>
        <div id="prep-panel-talking-points" class="prep-panel card hidden"></div>
        <div id="prep-panel-objection-drill" class="prep-panel card hidden"></div>
        <div id="prep-panel-proof" class="prep-panel card hidden"></div>
      </div>

      <!-- Section C: Document Generators (collapsible) -->
      <div class="card">
        <button id="docgen-toggle" class="w-full flex items-center justify-between text-left">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <i data-lucide="file-text" class="w-4 h-4"></i> Document Generators
          </h3>
          <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 transition-transform" id="docgen-chevron"></i>
        </button>
        <div id="docgen-body" class="hidden mt-4">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Generate polished documents pre-filled with merchant context above.</p>
          <div class="flex items-center gap-1 mb-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button data-doc-tab="onepager" class="doc-tab active px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">One-Pager</button>
            <button data-doc-tab="email" class="doc-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Email</button>
            <button data-doc-tab="talktracks" class="doc-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Talk Track</button>
            <button data-doc-tab="execsummary" class="doc-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Exec Summary</button>
          </div>

          <div id="doc-onepager" class="doc-panel">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div><div id="onepager-form"></div></div>
              <div id="onepager-preview" class="empty-state"><i data-lucide="file-text" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div>
            </div>
          </div>
          <div id="doc-email" class="doc-panel hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div><div id="email-form"></div></div>
              <div id="email-preview" class="empty-state"><i data-lucide="mail" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div>
            </div>
          </div>
          <div id="doc-talktracks" class="doc-panel hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div><div id="talktracks-form"></div></div>
              <div id="talktracks-preview" class="empty-state"><i data-lucide="message-square" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div>
            </div>
          </div>
          <div id="doc-execsummary" class="doc-panel hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div><div id="execsummary-form"></div></div>
              <div id="execsummary-preview" class="empty-state"><i data-lucide="briefcase" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `);

  initOutcomeGrid();
  initPrepTabs();
  initDocGenToggle();
  initDocTabs();
  initDocForms();
  initCalcToggle();
  initVerticalWatcher();
}

// ---------------------------------------------------------------------------
// Outcome grid
// ---------------------------------------------------------------------------

function initOutcomeGrid() {
  $$('.outcome-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.outcome;
      if (selectedOutcomes.has(id)) {
        selectedOutcomes.delete(id);
        card.classList.remove('border-indigo-500', 'dark:border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
        card.classList.add('border-gray-200', 'dark:border-gray-700');
      } else {
        selectedOutcomes.add(id);
        card.classList.add('border-indigo-500', 'dark:border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
        card.classList.remove('border-gray-200', 'dark:border-gray-700');
      }
      updatePrepButton();
    });
  });

  $('#generate-prep-btn')?.addEventListener('click', runRepPrep);
}

function updatePrepButton() {
  const btn = $('#generate-prep-btn');
  if (!btn) return;
  btn.disabled = selectedOutcomes.size === 0;
}

function setOutcomeSelection(outcomeIds) {
  selectedOutcomes.clear();
  $$('.outcome-card').forEach(card => {
    const id = card.dataset.outcome;
    if (outcomeIds.includes(id)) {
      selectedOutcomes.add(id);
      card.classList.add('border-indigo-500', 'dark:border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
      card.classList.remove('border-gray-200', 'dark:border-gray-700');
    } else {
      card.classList.remove('border-indigo-500', 'dark:border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
      card.classList.add('border-gray-200', 'dark:border-gray-700');
    }
  });
  updatePrepButton();
}

function initVerticalWatcher() {
  $('#ctx-vertical')?.addEventListener('change', (e) => {
    const profile = VERTICAL_PROFILES[e.target.value];
    if (profile) {
      setOutcomeSelection(profile.commonOutcomes);
    }
  });
}

// ---------------------------------------------------------------------------
// Rep Prep generation
// ---------------------------------------------------------------------------

async function runRepPrep() {
  const ctx = { ...getSharedContext(), selectedOutcomes: [...selectedOutcomes] };
  const output = $('#prep-output');
  output.classList.remove('hidden');

  const panels = {
    story: $('#prep-panel-value-story'),
    points: $('#prep-panel-talking-points'),
    drill: $('#prep-panel-objection-drill'),
    proof: $('#prep-panel-proof'),
  };

  const loadingHTML = `<div class="flex items-center justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>`;
  panels.story.innerHTML = loadingHTML;
  panels.points.innerHTML = loadingHTML;
  panels.drill.innerHTML = loadingHTML;

  const { stories, proofPoints } = getMatchingProof(ctx.selectedOutcomes);
  renderProofPanel(panels.proof, stories, proofPoints);

  const btn = $('#generate-prep-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Generating...';

  try {
    const [story, points, drill] = await Promise.all([
      generateValueStory(ctx),
      generateTalkingPoints(ctx),
      generateObjectionDrill(ctx),
    ]);

    renderPrepResult(panels.story, story);
    renderPrepResult(panels.points, points);
    renderPrepResult(panels.drill, drill);
    showToast('Rep prep generated', { type: 'success' });
  } catch (err) {
    const errHTML = `<p class="text-sm text-red-600 dark:text-red-400">Error: ${err.message}</p>`;
    panels.story.innerHTML = errHTML;
    panels.points.innerHTML = errHTML;
    panels.drill.innerHTML = errHTML;
    showToast('Generation failed', { type: 'error' });
  }

  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i> Generate Prep';
  refreshIcons();
}

function renderPrepResult(container, content) {
  const formatted = mdToHTML(content);
  container.innerHTML = `
    <div class="prose prose-sm dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      ${formatted}
    </div>
    <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button class="btn btn-secondary text-xs copy-prep-btn">
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
      </button>
    </div>
  `;
  container.querySelector('.copy-prep-btn')?.addEventListener('click', () => {
    const text = container.querySelector('.prose')?.textContent || '';
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard', { type: 'success' });
  });
}

function renderProofPanel(container, stories, proofPoints) {
  const storiesHTML = stories.length ? stories.map(s => `
    <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">${s.merchant}</span>
        <span class="text-xs text-gray-500">${s.scenario}</span>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">${s.benefit}</p>
      <p class="text-xs italic text-gray-500 dark:text-gray-500">"${s.quote}"</p>
      ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block">Read case study →</a>` : ''}
    </div>
  `).join('') : '<p class="text-sm text-gray-500">No matching case studies for selected outcomes.</p>';

  const proofHTML = proofPoints.length ? `
    <ul class="space-y-1.5 mt-4">
      ${proofPoints.map(p => `
        <li class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
          <i data-lucide="check" class="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0"></i>
          ${p}
        </li>`).join('')}
    </ul>` : '';

  container.innerHTML = `
    <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Matching Success Stories</h4>
    <div class="space-y-3">${storiesHTML}</div>
    ${proofHTML ? `<h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-5 mb-2">Key Proof Points</h4>${proofHTML}` : ''}
  `;
}

// ---------------------------------------------------------------------------
// Prep tabs
// ---------------------------------------------------------------------------

function initPrepTabs() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.prep-tab');
    if (!tab) return;
    const tabId = tab.dataset.prepTab;
    $$('.prep-tab').forEach(t => t.classList.toggle('active', t.dataset.prepTab === tabId));
    $$('.prep-panel').forEach(p => p.classList.toggle('hidden', p.id !== `prep-panel-${tabId}`));
  });
}

// ---------------------------------------------------------------------------
// Doc generators section
// ---------------------------------------------------------------------------

function initDocGenToggle() {
  $('#docgen-toggle')?.addEventListener('click', () => {
    const body = $('#docgen-body');
    const chevron = $('#docgen-chevron');
    body.classList.toggle('hidden');
    chevron.classList.toggle('rotate-180');
    refreshIcons();
  });
}

function initDocTabs() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.doc-tab');
    if (!tab) return;
    const tabId = tab.dataset.docTab;
    $$('.doc-tab').forEach(t => t.classList.toggle('active', t.dataset.docTab === tabId));
    $$('.doc-panel').forEach(p => p.classList.toggle('hidden', p.id !== `doc-${tabId}`));
    refreshIcons();
  });
}

function initCalcToggle() {
  $('#calc-toggle')?.addEventListener('change', (e) => {
    includeCalcData = e.target.checked;
  });
}

function initDocForms() {
  renderGeneratorForm('#onepager-form', {
    namespace: 'op',
    fields: [
      { id: 'needs', label: 'Key needs / pain points', type: 'textarea', placeholder: 'B2B wholesale, checkout customization, multi-location POS...' },
    ],
    generateLabel: 'Generate One-Pager',
    onGenerate: async (v) => {
      const ctx = getSharedContext();
      renderPreview('#onepager-preview', '', { loading: true });
      try {
        const { content } = await generateOnePager({ ...ctx, ...v });
        renderPreview('#onepager-preview', content);
        showToast('One-pager generated', { type: 'success' });
      } catch (err) {
        renderPreview('#onepager-preview', `Error: ${err.message}`);
        showToast('Generation failed', { type: 'error' });
      }
      refreshIcons();
    },
  });

  renderGeneratorForm('#email-form', {
    namespace: 'em',
    fields: [
      { id: 'conversationContext', label: 'Conversation context', type: 'textarea', placeholder: 'Discussed checkout extensibility needs and B2B requirements...' },
      { id: 'tone', label: 'Tone', type: 'select', options: [
        { value: 'professional', label: 'Professional' },
        { value: 'friendly', label: 'Friendly' },
        { value: 'executive', label: 'Executive' },
      ]},
    ],
    generateLabel: 'Generate Email',
    onGenerate: async (v) => {
      const ctx = getSharedContext();
      renderPreview('#email-preview', '', { loading: true });
      try {
        const { content } = await generateEmail({ ...ctx, ...v });
        renderPreview('#email-preview', content);
        showToast('Email generated', { type: 'success' });
      } catch (err) {
        renderPreview('#email-preview', `Error: ${err.message}`);
        showToast('Generation failed', { type: 'error' });
      }
      refreshIcons();
    },
  });

  renderGeneratorForm('#talktracks-form', {
    namespace: 'tt',
    fields: [
      { id: 'scenario', label: 'Scenario', type: 'select', options: [
        { value: 'price-objection', label: 'Price objection ("Plus is too expensive")' },
        { value: 'no-need', label: '"We don\'t need Plus features"' },
        { value: 'migration-fear', label: 'Migration complexity concerns' },
        { value: 'competitor', label: 'Comparing to competitor platforms' },
        { value: 'custom', label: 'Custom scenario' },
      ]},
      { id: 'objection', label: 'Specific objection or context', type: 'textarea', placeholder: 'They said...' },
    ],
    generateLabel: 'Generate Talk Track',
    onGenerate: async (v) => {
      const ctx = getSharedContext();
      renderPreview('#talktracks-preview', '', { loading: true });
      try {
        const { content } = await generateTalkTrack({ ...ctx, ...v });
        renderPreview('#talktracks-preview', content);
        showToast('Talk track generated', { type: 'success' });
      } catch (err) {
        renderPreview('#talktracks-preview', `Error: ${err.message}`);
        showToast('Generation failed', { type: 'error' });
      }
      refreshIcons();
    },
  });

  renderGeneratorForm('#execsummary-form', {
    namespace: 'es',
    fields: [
      { id: 'dealSize', label: 'Deal size / ARR', type: 'text', placeholder: '$22,200/yr' },
      { id: 'timeline', label: 'Timeline', type: 'text', placeholder: 'Q2 2026 launch' },
      { id: 'stakeholders', label: 'Key stakeholders', type: 'textarea', placeholder: 'CTO, VP Commerce, Head of Digital...' },
    ],
    generateLabel: 'Generate Summary',
    onGenerate: async (v) => {
      const ctx = getSharedContext();
      renderPreview('#execsummary-preview', '', { loading: true });
      try {
        const { content } = await generateExecutiveSummary({ ...ctx, ...v });
        renderPreview('#execsummary-preview', content);
        showToast('Executive summary generated', { type: 'success' });
      } catch (err) {
        renderPreview('#execsummary-preview', `Error: ${err.message}`);
        showToast('Generation failed', { type: 'error' });
      }
      refreshIcons();
    },
  });

  refreshIcons();
}

init();
