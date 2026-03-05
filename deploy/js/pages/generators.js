import { initApp, refreshIcons, showToast } from '../core/app.js';
import { renderInto, $, $$ } from '../utils/render.js';
import { renderGeneratorForm, renderPreview } from '../components/generator-form.js';
import { generateOnePager, generateEmail, generateTalkTrack, generateExecutiveSummary } from '../services/generators.js';

async function init() {
  await initApp('generators');
  renderContent();
  refreshIcons();
}

function renderContent() {
  renderInto('.app-content', `
    <div class="max-w-5xl mx-auto fade-in">
      <div class="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <button data-tab="onepager" class="app-tab active px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">One-Pager</button>
        <button data-tab="email" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Email</button>
        <button data-tab="talktracks" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Talk Track</button>
        <button data-tab="execsummary" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">Exec Summary</button>
      </div>

      <div id="tab-onepager" class="app-panel">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Merchant Details</h3><div id="onepager-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Preview</h3><div id="onepager-preview" class="empty-state"><i data-lucide="file-text" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div></div>
        </div>
      </div>
      <div id="tab-email" class="app-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Email Details</h3><div id="email-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Preview</h3><div id="email-preview" class="empty-state"><i data-lucide="mail" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div></div>
        </div>
      </div>
      <div id="tab-talktracks" class="app-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Scenario</h3><div id="talktracks-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Preview</h3><div id="talktracks-preview" class="empty-state"><i data-lucide="message-square" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div></div>
        </div>
      </div>
      <div id="tab-execsummary" class="app-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Deal Details</h3><div id="execsummary-form"></div></div>
          <div class="card"><h3 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Preview</h3><div id="execsummary-preview" class="empty-state"><i data-lucide="briefcase" class="empty-state-icon"></i><p class="text-sm text-gray-500">Generate to see preview</p></div></div>
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
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  $$('.app-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `tab-${tabId}`);
  });
  refreshIcons();
}

function initForms() {
  renderGeneratorForm('#onepager-form', {
    fields: [
      { id: 'merchantName', label: 'Merchant name', type: 'text', placeholder: 'Acme Corp' },
      { id: 'industry', label: 'Industry', type: 'text', placeholder: 'Fashion & Apparel' },
      { id: 'gmv', label: 'Annual GMV', type: 'text', placeholder: '$5M' },
      { id: 'region', label: 'Region', type: 'region' },
      { id: 'needs', label: 'Key needs / pain points', type: 'textarea', placeholder: 'B2B wholesale, checkout customization, multi-location POS...' },
    ],
    generateLabel: 'Generate One-Pager',
    onGenerate: async (v) => {
      renderPreview('#onepager-preview', '', { loading: true });
      try {
        const { content } = await generateOnePager(v);
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
    fields: [
      { id: 'merchantName', label: 'Merchant name', type: 'text', placeholder: 'Acme Corp' },
      { id: 'context', label: 'Conversation context', type: 'textarea', placeholder: 'Discussed checkout extensibility needs and B2B requirements...' },
      { id: 'tone', label: 'Tone', type: 'select', options: [
        { value: 'professional', label: 'Professional' },
        { value: 'friendly', label: 'Friendly' },
        { value: 'executive', label: 'Executive' },
      ]},
    ],
    generateLabel: 'Generate Email',
    onGenerate: async (v) => {
      renderPreview('#email-preview', '', { loading: true });
      try {
        const { content } = await generateEmail(v);
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
      renderPreview('#talktracks-preview', '', { loading: true });
      try {
        const { content } = await generateTalkTrack(v);
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
    fields: [
      { id: 'merchantName', label: 'Merchant name', type: 'text', placeholder: 'Acme Corp' },
      { id: 'dealSize', label: 'Deal size / ARR', type: 'text', placeholder: '$22,200/yr' },
      { id: 'timeline', label: 'Timeline', type: 'text', placeholder: 'Q2 2026 launch' },
      { id: 'stakeholders', label: 'Key stakeholders', type: 'textarea', placeholder: 'CTO, VP Commerce, Head of Digital...' },
    ],
    generateLabel: 'Generate Summary',
    onGenerate: async (v) => {
      renderPreview('#execsummary-preview', '', { loading: true });
      try {
        const { content } = await generateExecutiveSummary(v);
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
