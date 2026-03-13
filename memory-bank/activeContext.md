# Active Context — PlusCase

> Current work focus, recent changes, next steps.

## Current Focus

- **Status:** v0.2.0 (March 2026)
- **Primary maintainers:** Rick Wichgers & Tadib
- **Live:** `advanced-vs-plus.quick.shopify.io`

## Recent Changes

- **Rep Prep (v0.2.0 — Mar 2026):**
  - Rewrote Generators page into outcome-based Rep Prep tool
  - Shared Merchant Context bar: name, vertical, region, GMV — entered once, used by all tools
  - 8 business outcome cards (lower TCO, own checkout, go B2B, expand intl, acquire cheaper, scale retail, automate ops, unlock integrations)
  - Vertical profiles auto-select relevant outcomes when vertical changes
  - AI-generated Value Story, Talking Points, and Objection Drill — personalized to selected outcomes
  - Matching Proof tab: auto-matched case studies and proof points (no AI, instant)
  - Calculator data auto-detection from sessionStorage — surfaces savings from prior calculator runs
  - Document Generators (One-Pager, Email, Talk Track, Exec Summary) moved to collapsible section, pre-filled from shared context
  - Fixed duplicate ID bug in generator-form.js with namespace prefixes
  - Added OUTCOME_MAP, VERTICAL_PROFILES, GMV_RANGES to data.js
  - Renamed nav item from "Generators" to "Rep Prep"
- **Comparisons restructure (v0.1.1-0.1.2 — Mar 2026):**
  - 3-section layout: Summary (KEY_BENEFITS + KEY_DIFFERENTIATORS), Details (5 tabs), Proof (sourced case studies + public links)
  - Real case studies: Peepers, Beard & Blade, Happy Hippo, Schleich, SWATI, Kowtow
  - All differentiators and benefits linked to dev docs / help center sources
- **Unified EMEA Calculator (Mar 2026):**
  - Single unified calculator with 15 EMEA country-level SP rates
  - `calculateUnified()` computes all savings in one pass
- Initial release (v0.1.0): Calculators, Comparisons, Generators, Resources, Dark mode

## Next Steps

1. **Region-specific calculator validation** — Confirm EMEA/APAC/NA/UK pricing and fee structures are accurate
2. **Plus value qualifier** — Questionnaire that outputs qualification score + recommended features
3. **Upgrade identifier** — Auto-identify Advanced merchants who could benefit (depends on data access)
4. **Team feedback** — Align with Tadib on calculator ↔ Rep Prep data flow, and with Maddie on Rep Prep usefulness

## Active Decisions

- **MANIFEST says:** Quick slug `pluscase.quick.shopify.io` — **deploy script uses** `advanced-vs-plus`. The live URL is `advanced-vs-plus.quick.shopify.io`. Consider aligning MANIFEST.
- **Resources page** — Contains extensive links; keep updated as new enablement materials are released.
- **Calculator integration** — Rep Prep auto-detects saved_calculations from sessionStorage. Need to validate this works end-to-end once deployed.

## Channels

- **Slack:** `#project-adv-vs-plus`
- **Key people:** Cassie Handrahan (existing calculator), Lauren Ernst (Plus ROI materials), Nathan Davis (CSM Pulse)
