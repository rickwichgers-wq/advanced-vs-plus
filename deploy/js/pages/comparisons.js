import { initApp, refreshIcons } from '../core/app.js';
import { renderInto, $, $$ } from '../utils/render.js';
import { renderComparisonTable } from '../components/comparison-table.js';
import { getCategories, getHardDifferentiators } from '../services/comparisons.js';

async function init() {
  await initApp('comparisons');
  renderContent();
  refreshIcons();
}

function renderContent() {
  const categories = getCategories();
  const differentiators = getHardDifferentiators();

  const tabButtons = categories.map((cat, i) => `
    <button data-tab="${cat.id}" class="app-tab ${i === 0 ? 'active' : ''} px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap">
      ${cat.label}
    </button>
  `).join('');

  const tabPanels = categories.map((cat, i) => `
    <div id="tab-${cat.id}" class="app-panel ${i > 0 ? 'hidden' : ''}">
      <div id="table-${cat.id}"></div>
    </div>
  `).join('');

  renderInto('.app-content', `
    <div class="max-w-5xl mx-auto fade-in">
      <div class="card mb-6">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Plus-Only Differentiators</h3>
        <div class="flex flex-wrap gap-2">
          ${differentiators.map(d => `
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              <i data-lucide="check" class="w-3 h-3 mr-1"></i>${d}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        ${tabButtons}
      </div>

      ${tabPanels}
    </div>
  `);

  categories.forEach(cat => {
    renderComparisonTable(`#table-${cat.id}`, cat.features);
  });

  initTabs();
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
  refreshIcons();
}

init();
