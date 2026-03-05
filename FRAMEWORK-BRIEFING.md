# Advanced vs Plus — Framework Briefing

> **Purpose**: Hand this file to an AI agent when bootstrapping the new Quick site. It contains everything needed to recreate the Mindslots framework, adapted for the Advanced vs Plus sales enablement tool.
>
> **Based on**: Mindslots v1.1.1 (`stagewise.quick.shopify.io`)
> **For**: Rick Wichgers & Tadib — Solutions Consulting, EMEA

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **App name** | _TBD — pick a name_ (placeholder: `PlusCase`) |
| **Tagline** | _TBD_ (e.g. "Make the case for Plus.") |
| **Quick slug** | _TBD_ (e.g. `pluscase.quick.shopify.io`) |
| **Audience** | Account Executives & Solutions Consultants selling Shopify Plus vs Advanced |
| **Core job** | Give AEs calculators, feature comparisons, and document generators so they can articulate Plus value without building from scratch every time |

---

## 2. Tech Stack (identical to Mindslots)

| Layer | Tool | Notes |
|-------|------|-------|
| Hosting | Quick (`quick.shopify.io`) | Static deploy, no build step |
| Database | `quick.db` | JSON collections with real-time subscriptions |
| Identity | `quick.id` | IAP-based Shopify employee auth |
| AI | `quick.ai` | OpenAI proxy (for document generation) |
| Files | `quick.fs` | PDF export / file storage |
| CSS | **Tailwind v3 CDN** + custom `app.css` | Dark mode via `class` strategy |
| Icons | **Lucide Icons CDN** | `<i data-lucide="icon-name">` + `lucide.createIcons()` |
| JS | **Vanilla ES modules** | No framework, no bundler, no build step |

---

## 3. Project Structure

```
advanced-plus/
  MANIFEST.md              ← Project source of truth (create this first)
  deploy/                  ← Deployed to Quick
    index.html             -- Homepage / dashboard
    calculators.html       -- Calculators tab page
    comparisons.html       -- Feature comparison tab page
    generators.html        -- Document / text generators tab page
    features.html          -- Feature list (updated each release)
    changelog.html         -- Version changelog
    settings.html          -- User preferences
    css/
      app.css              -- Design system (copy from §5 below)
    js/
      core/
        app.js             -- App shell: sidebar, header, nav, toast, theme
        db.js              -- quick.db collection helpers + sessionStorage cache
        auth.js            -- quick.id identity + session caching
      services/
        calculators.js     -- Calculator business logic (TCO, fees, POS, etc.)
        comparisons.js     -- Feature comparison data + logic
        generators.js      -- Document generation (AI-powered)
      pages/
        home.js            -- Homepage controller
        calculators.js     -- Calculators page controller
        comparisons.js     -- Comparisons page controller
        generators.js      -- Generators page controller
        settings.js        -- Settings page controller
      components/
        modal.js           -- Reusable modal dialog + confirm()
        calculator-form.js -- Calculator input forms
        comparison-table.js-- Feature comparison table component
        generator-form.js  -- Document generator input form
      utils/
        brand.js           -- Nav items, version, app name (re-exports copy.js)
        copy.js            -- All user-facing strings, taglines, empty states
        render.js          -- DOM helpers ($, $$, html, renderInto, show, hide, etc.)
        dates.js           -- Date formatting helpers
        data.js            -- Plus vs Advanced data constants (features, pricing, limits)
    assets/
  research.md              -- Existing research document
```

---

## 4. Architecture Patterns

### 4.1 Page Load Pattern

Every page follows this exact sequence:

```
HTML loads → page <script type="module"> → import initApp → await initApp('pageId') → page renders
```

`initApp(pageId)` does:
1. Renders the sidebar from `NAV_ITEMS` / `NAV_FOOTER_ITEMS`
2. Renders the header bar (page title, user avatar)
3. Initializes auth (`quick.id`)
4. Updates user UI (avatar, name)
5. Highlights the active nav item
6. Sets up mobile sidebar toggle
7. Initializes toast container

### 4.2 HTML Shell Template

Every `.html` page uses this exact structure:

```html
<!DOCTYPE html>
<html lang="en" class="">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE_TITLE — APP_NAME</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              100: '#e0e7ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca'
            }
          }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="/client/quick.js"></script>
  <link rel="stylesheet" href="/css/app.css">
</head>
<body class="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
  <div id="sidebar-overlay" class="hidden fixed inset-0 bg-black/30 z-30 lg:hidden"></div>

  <div class="app-layout">
    <aside id="sidebar" class="app-sidebar bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 -translate-x-full lg:translate-x-0"></aside>

    <main class="app-main">
      <div id="header"></div>

      <div class="app-content">
        <!-- Page-specific content goes here -->
      </div>
    </main>
  </div>

  <script type="module" src="/js/pages/PAGE_NAME.js"></script>
</body>
</html>
```

### 4.3 Page Script Template

Every page JS module follows this pattern:

```javascript
import { initApp, setPageTitle, refreshIcons } from '../core/app.js';

async function init() {
  await initApp('pageId');
  setPageTitle('Page Title');

  // Render page content
  await renderContent();

  refreshIcons();
}

async function renderContent() {
  // Page-specific rendering logic
}

init();
```

### 4.4 Tab Pattern (for in-page tabs)

Used when a page has multiple sections (e.g., Calculators page with different calculator types):

**HTML:**
```html
<!-- Tab bar -->
<div class="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
  <button data-tab="tab1" class="app-tab active px-4 py-2.5 text-sm font-medium border-b-2 transition-colors">
    Tab 1
  </button>
  <button data-tab="tab2" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors">
    Tab 2
  </button>
  <button data-tab="tab3" class="app-tab px-4 py-2.5 text-sm font-medium border-b-2 transition-colors">
    Tab 3
  </button>
</div>

<!-- Tab panels -->
<div id="tab-tab1" class="app-panel"></div>
<div id="tab-tab2" class="app-panel hidden"></div>
<div id="tab-tab3" class="app-panel hidden"></div>
```

**JS:**
```javascript
function initTabs() {
  document.querySelectorAll('.app-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.app-tab').forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('border-indigo-600', isActive);
    btn.classList.toggle('text-indigo-600', isActive);
    btn.classList.toggle('dark:border-indigo-400', isActive);
    btn.classList.toggle('dark:text-indigo-400', isActive);
    btn.classList.toggle('border-transparent', !isActive);
    btn.classList.toggle('text-gray-500', !isActive);
  });
  document.querySelectorAll('.app-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `tab-${tabId}`);
  });
}
```

### 4.5 Routing

- **Multi-page**: each feature is its own `.html` file — no SPA router.
- **Detail pages**: use query params (`?id=xyz`).
- Navigation is full page loads via `<a href="/page.html">`.
- `200.html` can be a copy of `index.html` for Quick's SPA fallback.

### 4.6 Database Pattern (`db.js`)

- Uses `quick.db.collection(name)` for all data access.
- **sessionStorage cache**: fetch once per browser session, serve from cache on subsequent reads.
- **Optimistic updates**: `_append`, `_patch`, `_drop` helpers update cache immediately on writes.
- **Cache invalidation**: `invalidateAllCaches()` clears everything (call after major data changes).
- Each collection exposes: `getAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `remove(id)`.

### 4.7 Auth Pattern (`auth.js`)

- `initAuth()` — calls `quick.id.waitForUser()`, caches result in sessionStorage.
- `getCurrentUser()` — synchronous, returns cached user.
- `getUserEmail()`, `getUserDisplayName()`, `getUserAvatar()`, `getUserSummary()` — convenience getters.
- Cached under `sw:auth:user` key (change prefix for new app, e.g. `ap:auth:user`).

---

## 5. Design System

### 5.1 Color Palette

| Role | Light | Dark |
|------|-------|------|
| Background | `gray-50` (`#f9fafb`) | `gray-950` (`#030712`) |
| Surface / cards | `white` | `gray-900` (`#111827`) / `gray-800` |
| Borders | `gray-200` (`#e5e7eb`) | `gray-700` (`#374151`) |
| Primary text | `gray-900` (`#111827`) | `gray-100` (`#f3f4f6`) |
| Secondary text | `gray-500` / `gray-600` | `gray-400` / `gray-500` |
| Muted text | `gray-400` | `gray-500` / `gray-600` |
| Brand accent | Indigo `#6366f1` | Indigo `#818cf8` |
| Brand hover | `#4f46e5` | `#6366f1` |
| Success | Green `#10b981` / `#22c55e` | Green `#4ade80` |
| Warning | Amber `#f59e0b` | Amber `#fbbf24` |
| Error | Red `#ef4444` | Red `#f87171` |

### 5.2 Typography

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
-webkit-font-smoothing: antialiased;
```

Standard Tailwind scale: `text-xs` through `text-xl`. Headings use `font-semibold` or `font-bold`.

### 5.3 Tailwind Config

```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca'
        }
      }
    }
  }
}
```

### 5.4 CSS File (`app.css`)

Copy this entire file as the starting point. It includes:

```css
/* Base */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Layout */
.app-layout { display: flex; min-height: 100vh; }
.app-sidebar { width: 240px; flex-shrink: 0; transition: transform 0.2s ease; }
.app-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.app-content { flex: 1; overflow-y: auto; padding: 1.5rem; }

@media (max-width: 1023px) {
  .app-sidebar { position: fixed; inset-y: 0; left: 0; z-index: 40; transform: translateX(-100%); }
  .app-sidebar.open { transform: translateX(0); }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
.dark ::-webkit-scrollbar-thumb { background: #374151; }

/* Nav active state */
.nav-item.active, .nav-item[aria-current="page"] { background: #eef2ff; color: #4338ca; }
.dark .nav-item.active, .dark .nav-item[aria-current="page"] { background: rgba(79, 70, 229, 0.15); color: #818cf8; }

/* Cards */
.card {
  background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem;
  padding: 1rem; transition: box-shadow 0.15s ease, border-color 0.15s ease;
}
.card:hover { box-shadow: 0 1px 3px rgba(0,0,0,0.06); border-color: #d1d5db; }
.dark .card { background: #1f2937; border-color: #374151; }
.dark .card:hover { border-color: #4b5563; }

/* Stat cards */
.stat-card {
  display: flex; align-items: center; gap: 0.75rem; background: white;
  border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 0.75rem 1rem;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
}
.stat-card:hover { box-shadow: 0 1px 3px rgba(0,0,0,0.06); border-color: #d1d5db; }
.dark .stat-card { background: rgba(31,41,55,0.5); border-color: #374151; }
.dark .stat-card:hover { border-color: #4b5563; }

.stat-icon {
  display: flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; border-radius: 0.5rem; flex-shrink: 0;
}
.stat-value { display: block; font-size: 1.125rem; font-weight: 700; line-height: 1.25; color: #111827; }
.dark .stat-value { color: #f3f4f6; }
.stat-label {
  display: block; font-size: 0.625rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.05em; color: #9ca3af; line-height: 1.2;
}
.dark .stat-label { color: #6b7280; }

/* Empty state */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 3rem 1.5rem; text-align: center;
}
.empty-state-icon { width: 3rem; height: 3rem; color: #d1d5db; margin-bottom: 1rem; }
.dark .empty-state-icon { color: #4b5563; }

/* Toast notifications */
.toast-container {
  position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 9999;
  display: flex; flex-direction: column-reverse; gap: 0.5rem;
  pointer-events: none; max-width: 380px;
}
.toast {
  pointer-events: auto; display: flex; align-items: flex-start; gap: 0.625rem;
  padding: 0.75rem 1rem; border-radius: 0.75rem; background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
  animation: toastSlideIn 0.25s ease; transition: opacity 0.2s ease, transform 0.2s ease;
  min-width: 260px;
}
.dark .toast { background: #1f2937; border-color: #374151; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
.toast.removing { opacity: 0; transform: translateX(20px); }
@keyframes toastSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

/* Transitions */
.fade-in { animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

/* Badge safelist */
.bg-indigo-100, .text-indigo-700, .bg-indigo-600 {}
.bg-emerald-100, .text-emerald-700 {}
.bg-amber-100, .text-amber-700 {}
.bg-red-100, .text-red-700 {}
.bg-blue-100, .text-blue-700 {}
.bg-slate-100, .text-slate-700 {}
.bg-green-100, .text-green-700 {}
.bg-gray-100, .text-gray-700 {}
.dark .bg-indigo-900\/30, .dark .text-indigo-400 {}
.dark .bg-emerald-900\/30, .dark .text-emerald-400 {}
.dark .bg-amber-900\/30, .dark .text-amber-400 {}

/* Tab active state (for in-page tabs) */
.app-tab.active { border-color: #6366f1; color: #4f46e5; }
.dark .app-tab.active { border-color: #818cf8; color: #a5b4fc; }
.app-tab:not(.active) { border-color: transparent; color: #6b7280; }
.app-tab:not(.active):hover { color: #374151; border-color: #d1d5db; }
.dark .app-tab:not(.active):hover { color: #d1d5db; border-color: #4b5563; }
```

---

## 6. Core JS Files to Recreate

### 6.1 `js/utils/render.js` — DOM Helpers

```javascript
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
```

### 6.2 `js/utils/copy.js` — User-Facing Strings

```javascript
export const APP_NAME = 'PlusCase';  // TBD — pick your name
export const TAGLINE = 'Make the case for Plus.';  // TBD
export const CONTEXT_LINE = 'Stop building one-pagers from scratch. PlusCase gives you calculators, comparisons, and generators — ready to go.';

export const PAGE_DESCRIPTIONS = {
  home:        { title: 'Home', subtitle: 'Your sales enablement dashboard' },
  calculators: { title: 'Calculators', subtitle: 'TCO, fee savings, POS Pro, and ROI calculators' },
  comparisons: { title: 'Comparisons', subtitle: 'Feature-by-feature Advanced vs Plus breakdowns' },
  generators:  { title: 'Generators', subtitle: 'AI-powered document and text generation' },
  settings:    { title: 'Settings', subtitle: 'Preferences and configuration' },
  features:    { title: 'Features', subtitle: 'What this tool can do' },
  changelog:   { title: 'Changelog', subtitle: 'Version history' },
};

export const EMPTY_STATES = {
  calculators: {
    title: 'No saved calculations',
    message: 'Run a calculator to compare Advanced vs Plus for a specific merchant.',
    icon: 'calculator',
  },
  comparisons: {
    title: 'Select a comparison',
    message: 'Choose a feature area to see the Advanced vs Plus breakdown.',
    icon: 'columns',
  },
  generators: {
    title: 'No documents yet',
    message: 'Generate a tailored one-pager, email, or talk track for your deal.',
    icon: 'file-text',
  },
};
```

### 6.3 `js/utils/brand.js` — Navigation & Config

```javascript
export { APP_NAME, TAGLINE, CONTEXT_LINE, PAGE_DESCRIPTIONS, EMPTY_STATES } from './copy.js';

export const VERSION = '0.1.0';

export const NAV_ITEMS = [
  { id: 'home',        label: 'Home',        icon: 'home',        href: '/index.html' },
  { id: 'calculators', label: 'Calculators',  icon: 'calculator',  href: '/calculators.html' },
  { id: 'comparisons', label: 'Comparisons',  icon: 'columns',     href: '/comparisons.html' },
  { id: 'generators',  label: 'Generators',   icon: 'file-text',   href: '/generators.html' },
];

export const NAV_FOOTER_ITEMS = [
  { id: 'features',  label: 'Features',  icon: 'sparkles', href: '/features.html' },
  { id: 'changelog', label: 'Changelog', icon: 'history',  href: '/changelog.html' },
  { id: 'settings',  label: 'Settings',  icon: 'settings', href: '/settings.html' },
];
```

### 6.4 `js/core/app.js` — App Shell

Recreate from Mindslots but **stripped of** Salesforce sync, backup, recurring tasks, and personal workspace logic. Keep:

- `initApp(pageId)` — renders sidebar, header, toast container, runs auth, highlights nav
- `renderSidebar()` — from `NAV_ITEMS` + `NAV_FOOTER_ITEMS`
- `renderHeader()` — page title + user avatar (no Sync/Backup buttons)
- `highlightCurrentNav(pageId)`
- `initMobileSidebar()`
- `setPageTitle(title)`
- `refreshIcons()` — calls `lucide.createIcons()`
- `showToast()` / `dismissToast()` / `updateToast()`

### 6.5 `js/core/auth.js` — Identity

Copy directly from Mindslots. Change cache prefix from `sw:` to your app's prefix (e.g. `ap:`).

### 6.6 `js/core/db.js` — Database

Copy the pattern from Mindslots but with different collections:

```javascript
const COLLECTIONS = {
  saved_calculations: 'saved_calculations',
  user_settings: 'user_settings',
  generated_docs: 'generated_docs',
};
```

### 6.7 `js/components/modal.js` — Reusable Modal

```javascript
export function openModal({ title, body, size = 'md', actions = [] }) {
  // Creates a full-screen overlay with a centered card
  // size: 'sm' (max-w-sm), 'md' (max-w-lg), 'lg' (max-w-2xl), 'xl' (max-w-4xl)
  // actions: [{ label, variant: 'primary'|'secondary', onClick }]
  // Closes on Escape key and backdrop click
}

export function closeModal() { /* Remove modal from DOM */ }

export function confirm({ title, message, confirmLabel = 'Confirm', danger = false }) {
  // Returns a Promise<boolean>
}
```

---

## 7. Suggested Page Structure

### 7.1 Homepage (`index.html` → `pages/home.js`)

Dashboard with:
- Welcome greeting + tagline
- Quick-access cards linking to Calculators, Comparisons, Generators
- Recent calculations / generated docs (if any saved)
- Stats strip (e.g., "12 calculations saved", "3 docs generated this week")

### 7.2 Calculators Page (`calculators.html` → `pages/calculators.js`)

**In-page tabs** for different calculator types:
- **Fee Savings** — Compare transaction fees at different GMV levels (0.5% vs 0.15-0.30%)
- **TCO Calculator** — Total cost of ownership: plan price + fees + apps + POS Pro
- **POS Pro Savings** — $89/location on Advanced vs included on Plus (multi-location)
- **B2B Sizing** — B2B on Shopify value estimation
- **ROI / Payback** — When does the Plus price premium pay for itself?

Each calculator:
- Input form (GMV, number of locations, region, etc.)
- Live results panel with formatted numbers
- Option to save / export as PDF
- Region selector (EMEA, APAC, NA) for currency and pricing

### 7.3 Comparisons Page (`comparisons.html` → `pages/comparisons.js`)

**In-page tabs** for different comparison areas:
- **Overview** — High-level plan grid (Advanced vs Plus)
- **Checkout & Extensibility** — Checkout extensibility, Functions, Pixels
- **B2B** — B2B on Shopify features
- **API & Developer** — API limits (40 vs 400 req/s), custom gateway apps
- **Support & Operations** — Staff accounts, support tier, locations
- **Commerce Features** — Audiences, Launchpad, Expansion Stores, Bot Protection

Each comparison: feature table with checkmarks / values, "why it matters" explanations, talk track snippets.

### 7.4 Generators Page (`generators.html` → `pages/generators.js`)

**In-page tabs** for different generator types:
- **One-Pager** — AI-generated merchant-specific Plus value prop (inputs: GMV, industry, needs)
- **Email Template** — Follow-up email after Plus conversation
- **Talk Track** — Objection handling scripts by scenario
- **Executive Summary** — Brief for deal review / manager alignment

Each generator:
- Input form (merchant details, scenario, tone)
- AI generation via `quick.ai`
- Preview panel
- Copy to clipboard / Export

---

## 8. Data Constants to Pre-Build

Create `js/utils/data.js` with the structured data from the research:

```javascript
export const PLAN_PRICING = {
  advanced: { monthly_usd: 399, annual_usd: 299, transaction_fee: 0.005 },
  plus:     { monthly_usd: 2300, annual_usd: 1850, transaction_fee_min: 0.0015, transaction_fee_max: 0.003 },
};

export const API_LIMITS = {
  advanced: { requests_per_second: 40 },
  plus:     { requests_per_second: 400 },
};

export const STAFF_ACCOUNTS = {
  advanced: 15,
  plus: 'Unlimited',
};

export const POS_PRO = {
  advanced: { per_location_monthly: 89 },
  plus:     { per_location_monthly: 0, note: 'Included' },
};

export const LOCATIONS = {
  advanced: { max: 'Limited' },
  plus:     { max: 200 },
};

export const HARD_DIFFERENTIATORS = [
  'Checkout extensibility (Checkout UI Extensions, Functions, Branding API)',
  'B2B on Shopify (company accounts, price lists, payment terms)',
  'Shopify Audiences (customer acquisition)',
  'Expansion Stores (multi-brand / multi-region)',
  'Bot Protection (Checkout)',
  'Launchpad (scheduled sales events)',
  'Exclusive APIs (Checkout, Functions, Fulfillment)',
  'Custom payment gateway apps',
];

export const REGIONS = {
  na:   { label: 'North America', currency: 'USD', symbol: '$' },
  emea: { label: 'EMEA', currency: 'EUR', symbol: '€' },
  apac: { label: 'APAC', currency: 'AUD', symbol: 'A$' },
  uk:   { label: 'UK', currency: 'GBP', symbol: '£' },
};
```

---

## 9. Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Clean, calm, confident** | Neutral grays, indigo accent, generous whitespace |
| **Dark mode always** | Full support via Tailwind `dark:` variants on `<html class="dark">` |
| **Linear-inspired minimalism** | Thin borders, subtle shadows, rounded-lg corners |
| **Accessible** | Semantic HTML, focus states, sufficient contrast |
| **Mobile responsive** | Collapsible sidebar, responsive grids, touch-friendly targets |
| **No build step** | CDN for Tailwind + Lucide, ES modules, deploy folder = production |

---

## 10. Deploy

```bash
quick deploy deploy/ APP_SLUG
```

Replace `APP_SLUG` with your chosen Quick slug.

---

## 11. Checklist for First Build

1. [ ] Choose app name, tagline, and Quick slug
2. [ ] Create `MANIFEST.md` as project source of truth
3. [ ] Create `deploy/` directory with the structure from §3
4. [ ] Copy `app.css` from §5.4
5. [ ] Create `render.js`, `copy.js`, `brand.js` from §6
6. [ ] Create `app.js` (stripped shell) and `auth.js` from §6
7. [ ] Create `db.js` with the collections from §6.6
8. [ ] Build `index.html` (homepage shell)
9. [ ] Build `calculators.html` with tab structure
10. [ ] Build `comparisons.html` with tab structure
11. [ ] Build `generators.html` with tab structure
12. [ ] Create `data.js` with Plus vs Advanced constants from §8
13. [ ] Create `features.html` and `changelog.html`
14. [ ] Deploy to Quick and test

---

*Generated from Mindslots v1.1.1 framework analysis — March 2026*
