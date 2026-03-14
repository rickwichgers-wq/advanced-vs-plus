import { initApp, refreshIcons, showToast } from '../core/app.js';
import { renderInto, mdToHTML } from '../utils/render.js';
import { APP_NAME, TAGLINE, CONTEXT_LINE } from '../utils/brand.js';
import { savedCalculations, generatedDocs } from '../core/db.js';
import { getUserDisplayName, getUserEmail, isAdmin } from '../core/auth.js';
import { timeAgo } from '../utils/dates.js';
import { openModal, closeModal, confirm } from '../components/modal.js';

async function init() {
  await initApp('home');
  await renderContent();
  refreshIcons();
}

async function renderContent() {
  const name = getUserDisplayName();
  const email = getUserEmail();
  const greeting = name ? `Welcome back, ${name}` : 'Welcome';
  const admin = isAdmin();

  const [calcs, docs] = await Promise.all([
    savedCalculations.getAll(),
    generatedDocs.getAll(),
  ]);

  const recentCalcs = calcs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentDocs = docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const allDocs = admin
    ? docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

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
            <span class="stat-value">5</span>
            <span class="stat-label">Comparison areas</span>
          </div>
        </div>
      </div>

      ${recentCalcs.length || recentDocs.length ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          ${recentCalcs.length ? `
            <div class="card">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Calculations</h3>
              <div class="space-y-1">
                ${recentCalcs.map(c => `
                  <div class="flex items-center justify-between py-2 text-sm group">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="text-gray-700 dark:text-gray-300 truncate">${c.type || 'Calculation'}${c.merchantName ? ` — ${c.merchantName}` : ''}</span>
                      ${c.createdBy ? `<span class="text-[10px] text-gray-400 flex-shrink-0">${c.createdBy.split('@')[0]}</span>` : ''}
                    </div>
                    <span class="text-xs text-gray-400 flex-shrink-0">${timeAgo(c.createdAt)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          ${recentDocs.length ? `
            <div class="card">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Documents</h3>
              <div class="space-y-1" id="recent-docs-list">
                ${recentDocs.map(d => renderDocRow(d)).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${admin ? `
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <i data-lucide="shield" class="w-4 h-4"></i> All Documents (Admin)
            </h3>
            <span class="text-[10px] text-gray-400">${allDocs.length} total</span>
          </div>
          <div class="space-y-1" id="admin-docs-list">
            ${allDocs.length ? allDocs.map(d => renderDocRow(d, true)).join('') : '<p class="text-sm text-gray-500">No documents yet.</p>'}
          </div>
        </div>
      ` : ''}
    </div>
  `);

  bindDocEvents();
}

function renderDocRow(d, showOwner = false) {
  const typeLabel = (d.type || 'document').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const ownerTag = showOwner && d.createdBy
    ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex-shrink-0">${d.createdBy.split('@')[0]}</span>`
    : '';

  return `
    <div class="flex items-center justify-between py-2 text-sm group hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-lg transition-colors">
      <button class="flex items-center gap-2 min-w-0 text-left doc-open-btn" data-doc-id="${d.id}">
        <i data-lucide="file-text" class="w-3.5 h-3.5 text-gray-400 flex-shrink-0"></i>
        <span class="text-gray-700 dark:text-gray-300 truncate hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">${typeLabel}${d.merchantName ? ` — ${d.merchantName}` : ''}</span>
        ${ownerTag}
      </button>
      <div class="flex items-center gap-2 flex-shrink-0">
        <span class="text-xs text-gray-400">${timeAgo(d.createdAt)}</span>
        <button class="doc-delete-btn opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20" data-doc-id="${d.id}" title="Delete">
          <i data-lucide="trash-2" class="w-3.5 h-3.5 text-red-400"></i>
        </button>
      </div>
    </div>`;
}

function bindDocEvents() {
  document.querySelectorAll('.doc-open-btn').forEach(btn => {
    btn.addEventListener('click', () => openDocModal(btn.dataset.docId));
  });

  document.querySelectorAll('.doc-delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await deleteDoc(btn.dataset.docId);
    });
  });
}

async function openDocModal(docId) {
  const doc = await generatedDocs.getById(docId);
  if (!doc) {
    showToast('Document not found', { type: 'error' });
    return;
  }

  const typeLabel = (doc.type || 'Document').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const formatted = doc.content ? mdToHTML(doc.content) : '<p class="text-sm text-gray-500">No content.</p>';
  const createdDate = doc.createdAt ? new Date(doc.createdAt).toLocaleString() : 'Unknown';

  const body = `
    <div class="space-y-3">
      <div class="flex items-center gap-3 flex-wrap text-xs text-gray-500 dark:text-gray-400">
        ${doc.merchantName ? `<span class="flex items-center gap-1"><i data-lucide="building" class="w-3 h-3"></i> ${doc.merchantName}</span>` : ''}
        ${doc.createdBy ? `<span class="flex items-center gap-1"><i data-lucide="user" class="w-3 h-3"></i> ${doc.createdBy}</span>` : ''}
        <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${createdDate}</span>
      </div>
      <div class="prose prose-sm dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-3">
        ${formatted}
      </div>
    </div>
  `;

  openModal({
    title: typeLabel,
    body,
    size: 'lg',
    actions: [
      {
        label: 'Copy',
        variant: 'secondary',
        onClick: () => {
          navigator.clipboard.writeText(doc.content || '');
          showToast('Copied to clipboard', { type: 'success' });
        },
      },
      {
        label: 'Delete',
        variant: 'danger',
        onClick: async () => {
          closeModal();
          await deleteDoc(docId);
        },
      },
    ],
  });
}

async function deleteDoc(docId) {
  const yes = await confirm({
    title: 'Delete document?',
    message: 'This will permanently remove this document. This action cannot be undone.',
    confirmLabel: 'Delete',
    danger: true,
  });

  if (!yes) return;

  await generatedDocs.remove(docId);
  showToast('Document deleted', { type: 'success' });
  await renderContent();
  refreshIcons();
}

init();
