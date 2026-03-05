import { $, $$, renderInto, on, toggleClass } from '../utils/render.js';
import { APP_NAME, TAGLINE, VERSION, NAV_ITEMS, NAV_FOOTER_ITEMS, PAGE_DESCRIPTIONS } from '../utils/brand.js';
import { initAuth, getUserDisplayName, getUserAvatar } from './auth.js';

let currentPageId = 'home';

export async function initApp(pageId) {
  currentPageId = pageId;
  applyTheme();
  renderSidebar();
  renderHeader();
  await initAuth();
  updateUserUI();
  highlightCurrentNav(pageId);
  initMobileSidebar();
  initToastContainer();
  refreshIcons();
}

function applyTheme() {
  const stored = localStorage.getItem('ap:theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ap:theme', isDark ? 'dark' : 'light');
  refreshIcons();
}

function renderSidebar() {
  const sidebar = $('#sidebar');
  if (!sidebar) return;

  const navHTML = NAV_ITEMS.map(item => `
    <a href="${item.href}" class="nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-nav="${item.id}">
      <i data-lucide="${item.icon}" class="w-4 h-4"></i>
      ${item.label}
    </a>
  `).join('');

  const footerHTML = NAV_FOOTER_ITEMS.map(item => `
    <a href="${item.href}" class="nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-nav="${item.id}">
      <i data-lucide="${item.icon}" class="w-4 h-4"></i>
      ${item.label}
    </a>
  `).join('');

  sidebar.innerHTML = `
    <div class="flex flex-col h-full">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-content-center text-white font-bold text-sm flex items-center justify-center">P+</div>
          <div>
            <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">${APP_NAME}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">${TAGLINE}</div>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        ${navHTML}
      </nav>
      <div class="p-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
        ${footerHTML}
        <button id="theme-toggle" class="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <i data-lucide="moon" class="w-4 h-4 dark:hidden"></i>
          <i data-lucide="sun" class="w-4 h-4 hidden dark:block"></i>
          <span class="dark:hidden">Dark mode</span>
          <span class="hidden dark:inline">Light mode</span>
        </button>
        <div class="px-3 py-1 text-xs text-gray-400 dark:text-gray-600">v${VERSION}</div>
      </div>
    </div>
  `;

  on('#theme-toggle', 'click', toggleTheme);
}

function renderHeader() {
  const header = $('#header');
  if (!header) return;

  const page = PAGE_DESCRIPTIONS[currentPageId] || { title: '', subtitle: '' };

  header.innerHTML = `
    <div class="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div class="flex items-center gap-3">
        <button id="mobile-menu-btn" class="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
        <div>
          <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${page.title}</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400">${page.subtitle}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div id="user-info" class="flex items-center gap-2">
          <span id="user-name" class="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline"></span>
          <div id="user-avatar" class="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  `;
}

function updateUserUI() {
  const name = getUserDisplayName();
  const avatar = getUserAvatar();
  const nameEl = $('#user-name');
  const avatarEl = $('#user-avatar');

  if (nameEl && name) {
    nameEl.textContent = name;
    nameEl.classList.remove('hidden');
    nameEl.classList.add('hidden', 'sm:inline');
  }

  if (avatarEl && avatar) {
    avatarEl.innerHTML = `<img src="${avatar}" alt="" class="w-7 h-7 rounded-full">`;
  }
}

function highlightCurrentNav(pageId) {
  $$('.nav-item').forEach(item => {
    const isActive = item.dataset.nav === pageId;
    toggleClass(item, 'active', isActive);
    if (isActive) item.setAttribute('aria-current', 'page');
  });
}

function initMobileSidebar() {
  const sidebar = $('#sidebar');
  const overlay = $('#sidebar-overlay');
  const menuBtn = $('#mobile-menu-btn');
  if (!sidebar || !overlay || !menuBtn) return;

  menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.remove('hidden');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.add('hidden');
  });
}

function initToastContainer() {
  if ($('.toast-container')) return;
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
}

export function showToast(message, { type = 'info', duration = 3000, id = null } = {}) {
  const container = $('.toast-container');
  if (!container) return;

  const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
  const colors = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-indigo-500',
  };

  const toastId = id || `toast-${Date.now()}`;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = toastId;
  toast.innerHTML = `
    <i data-lucide="${icons[type]}" class="w-5 h-5 flex-shrink-0 ${colors[type]}"></i>
    <span class="text-sm text-gray-700 dark:text-gray-300 flex-1">${message}</span>
    <button class="toast-close p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onclick="this.closest('.toast').remove()">
      <i data-lucide="x" class="w-3.5 h-3.5 text-gray-400"></i>
    </button>
  `;

  container.appendChild(toast);
  refreshIcons();

  if (duration > 0) {
    setTimeout(() => dismissToast(toastId), duration);
  }

  return toastId;
}

export function dismissToast(id) {
  const toast = $(`#${id}`);
  if (!toast) return;
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 200);
}

export function updateToast(id, message) {
  const toast = $(`#${id}`);
  if (!toast) return;
  const span = toast.querySelector('span');
  if (span) span.textContent = message;
}

export function setPageTitle(title) {
  const h1 = $('h1');
  if (h1) h1.textContent = title;
  document.title = `${title} — ${APP_NAME}`;
}

export function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
