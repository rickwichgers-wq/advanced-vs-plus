# Progress — PlusCase

> What works, what's left, current status, known issues.

## What Works ✅

| Feature | Status | Notes |
|---------|--------|------|
| App shell | Done | Sidebar, header, nav, auth, toast, theme |
| Homepage | Done | Quick-access cards, recent activity (if data) |
| Calculators | Done | Fee Savings, TCO, POS Pro, ROI with region selector |
| Comparisons | Done | 6 categories: Overview, Checkout, B2B, API, Support, Commerce |
| Generators | Done | One-pager, email, talk track, exec summary (quick.ai) |
| Features page | Done | Feature list |
| Changelog | Done | Version history |
| Resources | Done | Links to decks, Guru, Vault |
| Settings | Done | Theme, region, cache, sign out |
| Dark mode | Done | Full support |
| Local dev | Done | `npx serve deploy -l 3000` with quick.js stub |
| Deploy | Done | `./scripts/deploy.sh` → Quick |

## What's Left / Backlog

| Item | Priority | Effort |
|------|----------|--------|
| Talk track quick reference (searchable) | High | Low |
| Region-specific pricing validation | High | Medium |
| PDF export for calculations/generators | Medium | Medium |
| Plus value qualifier questionnaire | Medium | Medium |
| Upgrade identifier (proactive pipeline) | Lower | High |
| Proof points / conversion uplift data | Lower | Blocked (no data source) |
| Align MANIFEST slug with deploy script | Low | Trivial |

## Known Issues

- **MANIFEST inconsistency:** MANIFEST lists `pluscase.quick.shopify.io`, deploy uses `advanced-vs-plus`
- **quick.ai dependency:** Generators require Quick platform; local stub may not fully simulate
- **No automated tests** — Manual QA only

## Version History

- **v0.1.0** (March 2026) — Initial release
