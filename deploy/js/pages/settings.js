import { initApp, refreshIcons, toggleTheme, showToast } from '../core/app.js';
import { renderInto, $ } from '../utils/render.js';
import { getUserSummary, clearAuthCache } from '../core/auth.js';
import { invalidateAllCaches } from '../core/db.js';
import { VERSION, APP_NAME } from '../utils/brand.js';

async function init() {
  await initApp('settings');
  renderContent();
  refreshIcons();
}

function renderContent() {
  const user = getUserSummary();
  const isDark = document.documentElement.classList.contains('dark');
  const defaultRegion = localStorage.getItem('ap:default-region') || 'emea';

  renderInto('.app-content', `
    <div class="max-w-2xl mx-auto fade-in space-y-6">

      <div class="card">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile</h3>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            ${user.avatar ? `<img src="${user.avatar}" alt="" class="w-12 h-12 rounded-full">` : `<i data-lucide="user" class="w-6 h-6 text-gray-400"></i>`}
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">${user.name || 'Not signed in'}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">${user.email || ''}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Appearance</h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">Dark mode</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Toggle between light and dark themes</p>
          </div>
          <button id="toggle-dark" class="btn btn-secondary">
            <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>
            ${isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>

      <div class="card">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Defaults</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Default region</label>
            <select id="default-region" class="form-input max-w-xs">
              <option value="na" ${defaultRegion === 'na' ? 'selected' : ''}>North America (USD)</option>
              <option value="emea" ${defaultRegion === 'emea' ? 'selected' : ''}>EMEA (EUR)</option>
              <option value="uk" ${defaultRegion === 'uk' ? 'selected' : ''}>UK (GBP)</option>
              <option value="apac" ${defaultRegion === 'apac' ? 'selected' : ''}>APAC (AUD)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Data</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">Clear cache</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Reset local data caches (data will reload from server)</p>
            </div>
            <button id="clear-cache" class="btn btn-secondary">Clear</button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">Sign out</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Clear session and sign out</p>
            </div>
            <button id="sign-out" class="btn btn-danger">Sign out</button>
          </div>
        </div>
      </div>

      <div class="text-center text-xs text-gray-400 dark:text-gray-600 py-4">
        ${APP_NAME} v${VERSION}
      </div>
    </div>
  `);

  $('#toggle-dark')?.addEventListener('click', () => {
    toggleTheme();
    renderContent();
    refreshIcons();
  });

  $('#default-region')?.addEventListener('change', (e) => {
    localStorage.setItem('ap:default-region', e.target.value);
    showToast('Default region updated', { type: 'success' });
  });

  $('#clear-cache')?.addEventListener('click', () => {
    invalidateAllCaches();
    showToast('Cache cleared', { type: 'success' });
  });

  $('#sign-out')?.addEventListener('click', () => {
    clearAuthCache();
    invalidateAllCaches();
    showToast('Signed out', { type: 'info' });
    setTimeout(() => window.location.reload(), 1000);
  });
}

init();
