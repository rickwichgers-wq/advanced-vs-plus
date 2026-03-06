# System Patterns — PlusCase

> Architecture, technical decisions, and design patterns.

## Architecture Overview

- **Multi-page static site** — Each feature is its own `.html` file. No SPA router.
- **Vanilla ES modules** — No framework, no bundler, no build step.
- **Quick platform** — Hosting, auth, db, AI provided by Quick (`quick.shopify.io`).

## Page Load Pattern

Every page follows:

```
HTML loads → <script type="module"> → import initApp → await initApp('pageId') → page renders
```

`initApp(pageId)` does:
1. Renders sidebar from `NAV_ITEMS` / `NAV_FOOTER_ITEMS`
2. Renders header (page title, user avatar)
3. Initializes auth (`quick.id`)
4. Updates user UI
5. Highlights active nav item
6. Sets up mobile sidebar toggle
7. Initializes toast container

## HTML Shell Template

All `.html` pages use the same structure:
- Tailwind CDN + `darkMode: 'class'`
- Lucide Icons CDN
- `/client/quick.js` (local dev stub) or platform quick.js (production)
- `app-layout` → `sidebar` + `main` → `header` + `app-content`
- Page script: `import initApp` → `await initApp('pageId')` → `refreshIcons()`

## Tab Pattern (in-page tabs)

For pages with multiple sections (e.g., Calculators with Fee/TCO/POS/ROI):

- Tab bar: `.app-tab` buttons with `data-tab="tabId"`
- Panels: `#tab-tabId` divs, `.hidden` toggled by `switchTab(tabId)`
- CSS: `.app-tab.active` for selected state

## Data / Database Pattern

- `quick.db.collection(name)` for all data access
- **sessionStorage cache** — fetch once per session, serve from cache
- **Cache prefix:** `ap:` (e.g., `ap:auth:user`, `ap:db:saved_calculations`)
- Collections: `saved_calculations`, `user_settings`, `generated_docs`
- Helpers: `getAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `remove(id)`

## Auth Pattern

- `initAuth()` — calls `quick.id.waitForUser()`, caches in sessionStorage
- `getCurrentUser()` — synchronous, returns cached user
- Cached under `ap:auth:user`

## Component Patterns

- **Modal:** `openModal({ title, body, size, actions })`, `closeModal()`, `confirm()`
- **DOM helpers:** `$()`, `$$()`, `html()`, `renderInto()`, `show()`, `hide()` from `render.js`
- **Copy:** All user-facing strings in `copy.js`, re-exported by `brand.js`

## Design System

- **Colors:** Indigo brand (`#6366f1`), gray scale, dark mode via `class` on `<html>`
- **Cards:** `.card`, `.stat-card` with hover states
- **Empty states:** `.empty-state` with icon + message
- **Toasts:** Bottom-right, stacked, `showToast()`, `dismissToast()`
