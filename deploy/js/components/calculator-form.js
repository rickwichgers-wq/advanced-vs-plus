import { $, renderInto } from '../utils/render.js';
import { EMEA_COUNTRIES } from '../utils/data.js';

export function renderCalculatorForm(containerId, { fields = [], onCalculate }) {
  const container = typeof containerId === 'string' ? $(containerId) : containerId;
  if (!container) return;

  const countryOptions = Object.entries(EMEA_COUNTRIES)
    .map(([key, c]) => `<option value="${key}">${c.label} (${c.symbol}${c.advanced})</option>`)
    .join('');

  const fieldsHTML = fields.map(field => {
    if (field.type === 'emea_country') {
      return `
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
          <select id="${field.id}" class="form-input">${countryOptions}</select>
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
    return `
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${field.label}</label>
        <input type="${field.type || 'number'}" id="${field.id}" class="form-input"
          placeholder="${field.placeholder || ''}"
          ${field.min !== undefined ? `min="${field.min}"` : ''}
          ${field.max !== undefined ? `max="${field.max}"` : ''}
          ${field.step !== undefined ? `step="${field.step}"` : ''}
          ${field.value !== undefined ? `value="${field.value}"` : ''}>
        ${field.hint ? `<p class="mt-1 text-xs text-gray-400">${field.hint}</p>` : ''}
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="space-y-4">
      ${fieldsHTML}
      <button id="calc-submit" class="btn btn-primary w-full justify-center">
        <i data-lucide="calculator" class="w-4 h-4"></i>
        Calculate
      </button>
    </div>
  `;

  if (onCalculate) {
    container.querySelector('#calc-submit').addEventListener('click', () => {
      const values = {};
      fields.forEach(f => {
        const el = $(`#${f.id}`);
        if (!el) return;
        values[f.id] = f.type === 'number' || f.type === undefined
          ? parseFloat(el.value) || 0
          : el.value;
      });
      onCalculate(values);
    });
  }
}

export function renderResults(containerId, results) {
  const container = typeof containerId === 'string' ? $(containerId) : containerId;
  if (!container) return;

  const rows = results.map(r => `
    <div class="flex items-center justify-between py-2 ${r.highlight ? 'font-semibold' : ''}">
      <span class="text-sm text-gray-600 dark:text-gray-400">${r.label}</span>
      <span class="text-sm ${r.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'}">${r.value}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="divide-y divide-gray-100 dark:divide-gray-800">
      ${rows}
    </div>
  `;
}
