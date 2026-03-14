export function $(selector, parent = document) { return parent.querySelector(selector); }
export function $$(selector, parent = document) { return Array.from(parent.querySelectorAll(selector)); }

export function html(strings, ...values) {
  const template = document.createElement('template');
  template.innerHTML = strings.reduce((result, str, i) => result + str + (values[i] ?? ''), '');
  return template.content.firstElementChild;
}

export function renderInto(selector, htmlContent) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.innerHTML = htmlContent;
}

export function appendTo(selector, element) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.appendChild(element);
}

export function clearChildren(selector) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.innerHTML = '';
}

export function show(selector) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.classList.remove('hidden');
}

export function hide(selector) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.classList.add('hidden');
}

export function toggleClass(selector, className, force) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.classList.toggle(className, force);
}

export function on(selector, event, handler) {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.addEventListener(event, handler);
}

export function delegate(parentSelector, childSelector, event, handler) {
  const parent = typeof parentSelector === 'string' ? $(parentSelector) : parentSelector;
  if (!parent) return;
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(childSelector);
    if (target && parent.contains(target)) handler(e, target);
  });
}

export function badge(text, color = 'gray') {
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700 dark:bg-${color}-900/30 dark:text-${color}-400">${text}</span>`;
}

export function mdToHTML(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-gray-900 dark:text-gray-100 mt-5 mb-2">$1</h2>')
    .replace(/^---$/gm, '<hr class="my-4 border-gray-200 dark:border-gray-700">')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n{2,}/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p class="mb-3">')
    .replace(/$/, '</p>');
}
