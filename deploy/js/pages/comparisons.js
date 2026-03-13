import { initApp, refreshIcons } from '../core/app.js';
import { renderInto, $, $$ } from '../utils/render.js';
import { renderComparisonTable } from '../components/comparison-table.js';
import {
  getCategories,
  getKeyDifferentiators,
  getKeyBenefits,
  getPublicSources,
  getSuccessStories,
} from '../services/comparisons.js';

async function init() {
  await initApp('comparisons');
  renderContent();
  refreshIcons();
}

function renderContent() {
  renderInto('.app-content', `
    <div class="max-w-5xl mx-auto fade-in space-y-10">
      ${renderSummary()}
      ${renderDetails()}
      ${renderProof()}
    </div>
  `);

  getCategories().forEach(cat => {
    renderComparisonTable(`#table-${cat.id}`, cat.features);
  });

  initTabs();
}

/* ── Section 1: Summary ────────────────────────────────────── */

function renderSummary() {
  const benefits = getKeyBenefits();
  const differentiators = getKeyDifferentiators();

  return `
    <section>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Key Benefits</h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        ${benefits.map(b => `
          <div class="card p-4 text-center">
            <div class="mx-auto mb-2 w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <i data-lucide="${b.icon}" class="w-5 h-5 text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">${b.title}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${b.description}</p>
            ${b.sourceUrl ? `<a href="${b.sourceUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 mt-2 text-xs text-indigo-500 dark:text-indigo-400 hover:underline"><i data-lucide="external-link" class="w-3 h-3"></i>${b.source}</a>` : ''}
          </div>
        `).join('')}
      </div>

      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Key Differentiators</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        ${differentiators.map(d => `
          <div class="card p-4 flex gap-3 items-start">
            <div class="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <i data-lucide="star" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"></i>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">${d.title}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${d.description}</p>
              ${d.url ? `<a href="${d.url}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 mt-1.5 text-xs text-indigo-500 dark:text-indigo-400 hover:underline"><i data-lucide="external-link" class="w-3 h-3"></i>Docs</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/* ── Section 2: Details / Core ─────────────────────────────── */

function renderDetails() {
  const categories = getCategories();

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

  return `
    <section>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Detailed Comparison</h2>
      <div class="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        ${tabButtons}
      </div>
      ${tabPanels}
    </section>
  `;
}

/* ── Section 3: Proof ──────────────────────────────────────── */

function renderProof() {
  const sources = getPublicSources();
  const stories = getSuccessStories();

  return `
    <section>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Public Sources</h2>
      <div class="card divide-y divide-gray-100 dark:divide-gray-800">
        ${sources.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <i data-lucide="external-link" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
            <div class="min-w-0">
              <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">${s.label}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${s.description}</p>
            </div>
          </a>
        `).join('')}
      </div>

      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Success Stories</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        ${stories.map(s => `
          <div class="card p-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                ${s.scenario}
              </span>
            </div>
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">${s.merchant}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">${s.benefit}</p>
            <blockquote class="mt-3 text-xs italic text-gray-500 dark:text-gray-400 border-l-2 border-indigo-300 dark:border-indigo-700 pl-3">
              "${s.quote}"
            </blockquote>
            ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 mt-3 text-xs text-indigo-500 dark:text-indigo-400 hover:underline"><i data-lucide="external-link" class="w-3 h-3"></i>Read full case study</a>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/* ── Tabs ──────────────────────────────────────────────────── */

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

init();
