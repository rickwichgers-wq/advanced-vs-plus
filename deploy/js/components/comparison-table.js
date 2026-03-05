import { $ } from '../utils/render.js';

function formatValue(val) {
  if (val === true) return '<i data-lucide="check" class="w-4 h-4 text-emerald-500 inline-block"></i>';
  if (val === false) return '<i data-lucide="x" class="w-4 h-4 text-gray-300 dark:text-gray-600 inline-block"></i>';
  return `<span class="text-sm">${val}</span>`;
}

export function renderComparisonTable(containerId, features) {
  const container = typeof containerId === 'string' ? $(containerId) : containerId;
  if (!container) return;

  const rows = features.map(f => `
    <tr class="border-b border-gray-100 dark:border-gray-800">
      <td class="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300 font-medium">${f.name}</td>
      <td class="py-3 px-4 text-center">${formatValue(f.advanced)}</td>
      <td class="py-3 px-4 text-center">${formatValue(f.plus)}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b-2 border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Feature</th>
            <th class="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Advanced</th>
            <th class="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Plus</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}
