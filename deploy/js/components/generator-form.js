import { $ } from '../utils/render.js';
import { REGIONS } from '../utils/data.js';

export function renderGeneratorForm(containerId, { fields = [], onGenerate, generateLabel = 'Generate' }) {
  const container = typeof containerId === 'string' ? $(containerId) : containerId;
  if (!container) return;

  const fieldsHTML = fields.map(field => {
    if (field.type === 'textarea') {
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <textarea id="${field.id}" class="form-input" rows="${field.rows || 3}"
            placeholder="${field.placeholder || ''}"></textarea>
        </div>`;
    }
    if (field.type === 'select') {
      const opts = field.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <select id="${field.id}" class="form-input">${opts}</select>
        </div>`;
    }
    if (field.type === 'region') {
      const regionOpts = Object.entries(REGIONS)
        .map(([key, r]) => `<option value="${key}">${r.label}</option>`)
        .join('');
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <select id="${field.id}" class="form-input">${regionOpts}</select>
        </div>`;
    }
    return `
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
        <input type="${field.type || 'text'}" id="${field.id}" class="form-input"
          placeholder="${field.placeholder || ''}"
          ${field.value !== undefined ? `value="${field.value}"` : ''}>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="space-y-4">
      ${fieldsHTML}
      <button id="gen-submit" class="btn btn-primary w-full justify-center">
        <i data-lucide="sparkles" class="w-4 h-4"></i>
        ${generateLabel}
      </button>
    </div>
  `;

  if (onGenerate) {
    container.querySelector('#gen-submit').addEventListener('click', () => {
      const values = {};
      fields.forEach(f => {
        const el = $(`#${f.id}`);
        if (!el) return;
        values[f.id] = el.value;
      });
      onGenerate(values);
    });
  }
}

export function renderPreview(containerId, content, { loading = false } = {}) {
  const container = typeof containerId === 'string' ? $(containerId) : containerId;
  if (!container) return;

  if (loading) {
    container.innerHTML = `
      <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="prose prose-sm dark:prose-invert max-w-none">
      <div class="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">${content}</div>
    </div>
    <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button id="copy-output" class="btn btn-secondary text-xs">
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
      </button>
      <button id="save-output" class="btn btn-secondary text-xs">
        <i data-lucide="save" class="w-3.5 h-3.5"></i> Save
      </button>
    </div>
  `;
}
