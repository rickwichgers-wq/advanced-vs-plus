import { REGIONS } from '../utils/data.js';

export function renderGeneratorForm(containerId, { fields = [], onGenerate, generateLabel = 'Generate', namespace = '' }) {
  const container = typeof containerId === 'string' ? document.querySelector(containerId) : containerId;
  if (!container) return;

  const pfx = namespace ? `${namespace}-` : '';

  const fieldsHTML = fields.map(field => {
    const fid = `${pfx}${field.id}`;
    if (field.type === 'textarea') {
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <textarea id="${fid}" class="form-input" rows="${field.rows || 3}"
            placeholder="${field.placeholder || ''}"></textarea>
        </div>`;
    }
    if (field.type === 'select') {
      const opts = field.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <select id="${fid}" class="form-input">${opts}</select>
        </div>`;
    }
    if (field.type === 'region') {
      const regionOpts = Object.entries(REGIONS)
        .map(([key, r]) => `<option value="${key}">${r.label}</option>`)
        .join('');
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <select id="${fid}" class="form-input">${regionOpts}</select>
        </div>`;
    }
    return `
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
        <input type="${field.type || 'text'}" id="${fid}" class="form-input"
          placeholder="${field.placeholder || ''}"
          ${field.value !== undefined ? `value="${field.value}"` : ''}>
      </div>`;
  }).join('');

  const submitId = `${pfx}gen-submit`;

  container.innerHTML = `
    <div class="space-y-4">
      ${fieldsHTML}
      <button id="${submitId}" class="btn btn-primary w-full justify-center">
        <i data-lucide="sparkles" class="w-4 h-4"></i>
        ${generateLabel}
      </button>
    </div>
  `;

  if (onGenerate) {
    container.querySelector(`#${submitId}`).addEventListener('click', () => {
      const values = {};
      fields.forEach(f => {
        const el = container.querySelector(`#${pfx}${f.id}`);
        if (!el) return;
        values[f.id] = el.value;
      });
      onGenerate(values);
    });
  }
}

export function renderPreview(containerId, content, { loading = false } = {}) {
  const container = typeof containerId === 'string' ? document.querySelector(containerId) : containerId;
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
      <button class="btn btn-secondary text-xs copy-output-btn">
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
      </button>
    </div>
  `;

  container.querySelector('.copy-output-btn')?.addEventListener('click', () => {
    const text = container.querySelector('.whitespace-pre-wrap')?.textContent || '';
    navigator.clipboard.writeText(text);
  });
}
