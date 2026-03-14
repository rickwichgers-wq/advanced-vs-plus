import { initApp, refreshIcons } from '../core/app.js';
import { renderInto, $ } from '../utils/render.js';
import { APP_NAME, TAGLINE, CONTEXT_LINE } from '../utils/brand.js';
import { savedCalculations, generatedDocs } from '../core/db.js';
import { getUserDisplayName } from '../core/auth.js';
import { timeAgo } from '../utils/dates.js';

async function init() {
  await initApp('home');
  await renderContent();
  refreshIcons();
}

async function renderContent() {
  const name = getUserDisplayName();
  const greeting = name ? `Welcome back, ${name}` : 'Welcome';

  const [calcs, docs] = await Promise.all([
    savedCalculations.getAll(),
    generatedDocs.getAll(),
  ]);

  const recentCalcs = calcs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentDocs = docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  renderInto('.app-content', `
    <div class="max-w-5xl mx-auto fade-in">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">${greeting}</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${CONTEXT_LINE}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <a href="/calculators.html" class="card group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700">
          <div class="flex items-center gap-3 mb-3">
            <div class="stat-icon bg-indigo-100 dark:bg-indigo-900/30">
              <i data-lucide="calculator" class="w-4 h-4 text-indigo-600 dark:text-indigo-400"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Calculators</h3>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">TCO, fee savings, POS Pro, and ROI calculators for any deal.</p>
        </a>

        <a href="/comparisons.html" class="card group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700">
          <div class="flex items-center gap-3 mb-3">
            <div class="stat-icon bg-emerald-100 dark:bg-emerald-900/30">
              <i data-lucide="columns" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Comparisons</h3>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Feature-by-feature breakdowns across checkout, B2B, API, and more.</p>
        </a>

        <a href="/generators.html" class="card group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700">
          <div class="flex items-center gap-3 mb-3">
            <div class="stat-icon bg-amber-100 dark:bg-amber-900/30">
              <i data-lucide="briefcase" class="w-4 h-4 text-amber-600 dark:text-amber-400"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Rep Prep</h3>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Outcome-based meeting prep, value stories, talking points, and document generators.</p>
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="stat-card">
          <div class="stat-icon bg-indigo-100 dark:bg-indigo-900/30">
            <i data-lucide="calculator" class="w-4 h-4 text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <div>
            <span class="stat-value">${calcs.length}</span>
            <span class="stat-label">Saved calculations</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-emerald-100 dark:bg-emerald-900/30">
            <i data-lucide="file-text" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
          </div>
          <div>
            <span class="stat-value">${docs.length}</span>
            <span class="stat-label">Generated docs</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-amber-100 dark:bg-amber-900/30">
            <i data-lucide="columns" class="w-4 h-4 text-amber-600 dark:text-amber-400"></i>
          </div>
          <div>
            <span class="stat-value">6</span>
            <span class="stat-label">Comparison areas</span>
          </div>
        </div>
      </div>

      ${recentCalcs.length || recentDocs.length ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${recentCalcs.length ? `
            <div class="card">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Calculations</h3>
                <span class="text-[10px] text-gray-400 dark:text-gray-500">Stored in session only</span>
              </div>
              <div class="space-y-2">
                ${recentCalcs.map(c => `
                  <div class="flex items-center justify-between py-1.5 text-sm">
                    <span class="text-gray-700 dark:text-gray-300">${c.type || 'Calculation'}</span>
                    <span class="text-xs text-gray-400">${timeAgo(c.createdAt)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          ${recentDocs.length ? `
            <div class="card">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Documents</h3>
                <span class="text-[10px] text-gray-400 dark:text-gray-500">Stored in session only</span>
              </div>
              <div class="space-y-2">
                ${recentDocs.map(d => `
                  <div class="flex items-center justify-between py-1.5 text-sm">
                    <span class="text-gray-700 dark:text-gray-300">${d.type || 'Document'}${d.merchantName ? ` — ${d.merchantName}` : ''}</span>
                    <span class="text-xs text-gray-400">${timeAgo(d.createdAt)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `);
}

init();
