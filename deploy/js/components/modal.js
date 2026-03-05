import { $, on } from '../utils/render.js';
import { refreshIcons } from '../core/app.js';

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function openModal({ title, body, size = 'md', actions = [] }) {
  closeModal();

  const sizeClass = SIZES[size] || SIZES.md;

  const actionsHTML = actions.length
    ? `<div class="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
        ${actions.map((a, i) => `
          <button class="btn ${a.variant === 'primary' ? 'btn-primary' : a.variant === 'danger' ? 'btn-danger' : 'btn-secondary'}" data-action="${i}">
            ${a.label}
          </button>
        `).join('')}
      </div>`
    : '';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'app-modal';
  overlay.innerHTML = `
    <div class="modal-card ${sizeClass}" role="dialog" aria-modal="true">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${title}</h2>
        <button class="modal-close p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <i data-lucide="x" class="w-5 h-5 text-gray-400"></i>
        </button>
      </div>
      <div class="p-4">${body}</div>
      ${actionsHTML}
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('.modal-close').addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  const onEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', onEscape);
    }
  };
  document.addEventListener('keydown', onEscape);

  actions.forEach((action, i) => {
    const btn = overlay.querySelector(`[data-action="${i}"]`);
    if (btn && action.onClick) {
      btn.addEventListener('click', () => action.onClick());
    }
  });

  refreshIcons();
  return overlay;
}

export function closeModal() {
  const modal = $('#app-modal');
  if (modal) modal.remove();
}

export function confirm({ title, message, confirmLabel = 'Confirm', danger = false }) {
  return new Promise((resolve) => {
    openModal({
      title,
      body: `<p class="text-sm text-gray-600 dark:text-gray-400">${message}</p>`,
      size: 'sm',
      actions: [
        { label: 'Cancel', variant: 'secondary', onClick: () => { closeModal(); resolve(false); } },
        { label: confirmLabel, variant: danger ? 'danger' : 'primary', onClick: () => { closeModal(); resolve(true); } },
      ],
    });
  });
}
