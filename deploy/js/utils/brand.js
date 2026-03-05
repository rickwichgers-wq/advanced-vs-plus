export { APP_NAME, TAGLINE, CONTEXT_LINE, PAGE_DESCRIPTIONS, EMPTY_STATES } from './copy.js';

export const VERSION = '0.1.0';

export const NAV_ITEMS = [
  { id: 'home',        label: 'Home',        icon: 'home',        href: '/index.html' },
  { id: 'calculators', label: 'Calculators',  icon: 'calculator',  href: '/calculators.html' },
  { id: 'comparisons', label: 'Comparisons',  icon: 'columns',     href: '/comparisons.html' },
  { id: 'generators',  label: 'Generators',   icon: 'file-text',   href: '/generators.html' },
];

export const NAV_FOOTER_ITEMS = [
  { id: 'resources', label: 'Resources', icon: 'library',  href: '/resources.html' },
  { id: 'features',  label: 'Features',  icon: 'sparkles', href: '/features.html' },
  { id: 'changelog', label: 'Changelog', icon: 'history',  href: '/changelog.html' },
  { id: 'settings',  label: 'Settings',  icon: 'settings', href: '/settings.html' },
];
