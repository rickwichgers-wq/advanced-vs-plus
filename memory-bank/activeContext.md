# Active Context — PlusCase

> Current work focus, recent changes, next steps.

## Current Focus

- **Status:** v0.1.0 initial release (March 2026)
- **Primary maintainers:** Rick Wichgers & Tadib
- **Live:** `advanced-vs-plus.quick.shopify.io`

## Recent Changes

- **Unified EMEA Calculator (Mar 2026):**
  - Replaced 4-tab calculator with single unified EMEA calculator
  - Added Shopify Payments rates per country (15 EMEA countries from master rate sheet gid=689462759)
  - Single input form: Country, SP Volume, 3P Volume, POS Volume, POS Locations, Plus Term
  - Live-calculate on every input change (no button)
  - Output: savings cards, net banner with VPF detection, side-by-side comparison table, Chart.js stacked bar chart, collapsible SP rates reference table
  - `calculateUnified()` computes SP savings, 3P savings, POS Pro savings, VPF, TCO, ROI in one pass
- **Rates & data layer (Mar 2026):**
  - Added `memory-bank/RATES-REFERENCE.md` — source-of-truth doc from Internal Help Center + master rate sheet
  - `EMEA_COUNTRIES` in `data.js` now has `sp` object with Advanced/Plus domestic/EEA/intl/amex rates per country
- **Comparisons page restructure (Mar 2026):**
  - Replaced flat 6-tab feature grid with 3-section layout: Summary, Details, Proof
  - Summary: KEY_DIFFERENTIATORS (value-statement cards) + KEY_BENEFITS (outcome-framed propositions)
  - Details: 5 tabs — Functional, Technical, Commercial, Operational, Personal (re-categorized features)
  - Proof: Public source links + success story cards (placeholder data — needs real content)
  - Replaced `HARD_DIFFERENTIATORS` with `KEY_DIFFERENTIATORS` / `KEY_BENEFITS` in data.js
  - Added `PUBLIC_SOURCES` and `SUCCESS_STORIES` exports
- Initial release with full feature set:
  - Fee Savings, TCO, POS Pro, ROI calculators
  - AI generators (one-pagers, emails, talk tracks, exec summaries)
  - Resources page (links to decks, Guru, Vault)
  - Dark mode, responsive layout

## Next Steps (from research priority order)

1. **Region-specific calculator validation** — Confirm EMEA/APAC/NA/UK pricing and fee structures are accurate
2. **Talk track quick reference** — Low-effort add: searchable objection → reframe → proof point
3. **Scenario-based one-pager enhancement** — Improve AI prompt quality based on AE feedback
4. **Plus value qualifier** — Questionnaire that outputs qualification score + recommended features
5. **Upgrade identifier** — Auto-identify Advanced merchants who could benefit (depends on data access)

## Active Decisions

- **MANIFEST says:** Quick slug `pluscase.quick.shopify.io` — **deploy script uses** `advanced-vs-plus`. The live URL is `advanced-vs-plus.quick.shopify.io`. Consider aligning MANIFEST.
- **Resources page** — Contains extensive links; keep updated as new enablement materials are released.
- **Proof points** — Comparisons page now has Proof section with placeholder success stories and public source links. Needs real merchant data to replace placeholders.

## Channels

- **Slack:** `#project-adv-vs-plus`
- **Key people:** Cassie Handrahan (existing calculator), Lauren Ernst (Plus ROI materials), Nathan Davis (CSM Pulse)
