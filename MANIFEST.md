# PlusCase — Project Manifest

> **Source of truth** for the PlusCase project.

## Identity

| Field | Value |
|-------|-------|
| **App name** | PlusCase |
| **Tagline** | Make the case for Plus. |
| **Quick slug** | `pluscase.quick.shopify.io` |
| **Version** | 0.1.2 |
| **Audience** | Account Executives & Solutions Consultants selling Shopify Plus vs Advanced |
| **Maintainers** | Rick Wichgers & Tadib — Solutions Consulting, EMEA |

## Tech Stack

| Layer | Tool |
|-------|------|
| Hosting | Quick (`quick.shopify.io`) |
| Database | `quick.db` (JSON collections + sessionStorage cache) |
| Identity | `quick.id` (IAP-based Shopify employee auth) |
| AI | `quick.ai` (OpenAI proxy for document generation) |
| CSS | Tailwind v3 CDN + `css/app.css` |
| Icons | Lucide Icons CDN |
| JS | Vanilla ES modules — no framework, no build step |

## Project Structure

```
advanced-plus/
  MANIFEST.md             ← This file
  FRAMEWORK-BRIEFING.md   ← Framework reference
  research.md             ← Advanced vs Plus research
  deploy/                 ← Deployed to Quick
    index.html            — Homepage / dashboard
    calculators.html      — Calculators tab page
    comparisons.html      — Feature comparison tab page
    generators.html       — Document / text generators tab page
    features.html         — Feature list
    changelog.html        — Version changelog
    settings.html         — User preferences
    200.html              — SPA fallback (copy of index.html)
    css/
      app.css             — Design system
    js/
      core/
        app.js            — App shell: sidebar, header, nav, toast, theme
        db.js             — quick.db collection helpers + sessionStorage cache
        auth.js           — quick.id identity + session caching
      services/
        calculators.js    — Calculator business logic (TCO, fees, POS, ROI)
        comparisons.js    — Feature comparison data + logic
        generators.js     — AI document generation via quick.ai
      pages/
        home.js           — Homepage controller
        calculators.js    — Calculators page controller
        comparisons.js    — Comparisons page controller
        generators.js     — Generators page controller
        settings.js       — Settings page controller
      components/
        modal.js          — Reusable modal dialog + confirm()
        calculator-form.js— Calculator input forms
        comparison-table.js— Feature comparison table component
        generator-form.js — Document generator input form
      utils/
        brand.js          — Nav items, version, app name
        copy.js           — All user-facing strings
        render.js         — DOM helpers ($, $$, html, renderInto, etc.)
        dates.js          — Date formatting helpers
        data.js           — Plus vs Advanced data constants
    assets/
```

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/index.html` | Dashboard with quick-access cards and recent activity |
| Calculators | `/calculators.html` | Fee Savings, TCO, POS Pro, ROI calculators |
| Comparisons | `/comparisons.html` | 3-section layout: Summary (key differentiators + benefits), Details (5 tabs: Functional, Technical, Commercial, Operational, Personal), Proof (public sources + success stories) |
| Generators | `/generators.html` | AI one-pagers, emails, talk tracks, exec summaries |
| Features | `/features.html` | What this tool can do |
| Changelog | `/changelog.html` | Version history |
| Settings | `/settings.html` | Theme, region, cache, sign out |

## Cache Prefixes

All sessionStorage/localStorage keys use the `ap:` prefix:
- `ap:auth:user` — Cached user identity
- `ap:db:{collection}` — Database collection caches
- `ap:theme` — Light/dark preference
- `ap:default-region` — Default region for calculators

## Deploy

The `deploy/` folder is the working source. It includes `deploy/client/quick.js` — a local dev stub that simulates the Quick platform APIs (auth, db, ai) using localStorage. This file must **not** be shipped to Quick (the platform serves its own `/client/quick.js`).

The deploy script copies `deploy/` → `dist/`, excluding `client/`, then deploys `dist/` to Quick.

```bash
# One command:
./scripts/deploy.sh

# Or manually:
rsync -a --exclude='client/' deploy/ dist/
quick deploy dist/ advanced-vs-plus
```

**Local dev:**
```bash
npx serve deploy -l 3000
# → http://localhost:3000 (uses client/quick.js stub)
```

**Quick slug:** `advanced-vs-plus.quick.shopify.io`
