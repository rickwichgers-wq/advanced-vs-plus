# Tech Context — PlusCase

> Technologies, development setup, and technical constraints.

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Hosting | Quick (`quick.shopify.io`) | Static deploy, no build step |
| Database | `quick.db` | JSON collections, real-time subscriptions |
| Identity | `quick.id` | IAP-based Shopify employee auth |
| AI | `quick.ai` | OpenAI proxy for document generation |
| CSS | Tailwind v3 CDN + `css/app.css` | Dark mode via `class` strategy |
| Icons | Lucide Icons CDN | `lucide.createIcons()` after render |
| JS | Vanilla ES modules | No framework, no bundler |

## Development Setup

```bash
# Local dev (uses client/quick.js stub for auth, db, ai)
npx serve deploy -l 3000
# → http://localhost:3000

# Deploy to Quick
./scripts/deploy.sh
```

## Project Structure

```
Adv_vs_Plus/
├── MANIFEST.md
├── FRAMEWORK-BRIEFING.md
├── research.md
├── memory-bank/
├── deploy/                 ← Working source, deployed to Quick
│   ├── index.html, calculators.html, comparisons.html, generators.html
│   ├── features.html, changelog.html, resources.html, settings.html
│   ├── 200.html
│   ├── client/quick.js     ← Local dev stub (NOT deployed)
│   ├── css/app.css
│   └── js/
│       ├── core/           app.js, db.js, auth.js
│       ├── services/       calculators.js, comparisons.js, generators.js
│       ├── pages/          home.js, calculators.js, comparisons.js, generators.js, settings.js
│       ├── components/     modal.js, calculator-form.js, comparison-table.js, generator-form.js
│       └── utils/          brand.js, copy.js, render.js, dates.js, data.js
└── scripts/
    └── deploy.sh
```

## Deploy Process

1. `rsync -a --exclude='client/' deploy/ dist/`
2. `quick deploy dist/ advanced-vs-plus`
3. Live at `advanced-vs-plus.quick.shopify.io`

**Critical:** `deploy/client/` contains the local dev stub. It must NOT be shipped to Quick — the platform serves its own `/client/quick.js`.

## Constraints

- **No build step** — CDN for Tailwind + Lucide, ES modules work natively
- **Quick APIs** — Must work with `quick.id`, `quick.db`, `quick.ai` (or stub in local dev)
- **Shopify employee only** — Auth is IAP-based; general public cannot use the app
- **Cache prefix** — All storage keys use `ap:` to avoid collisions
