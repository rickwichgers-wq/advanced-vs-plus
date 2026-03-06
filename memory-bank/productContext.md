# Product Context — PlusCase

> Why this project exists, problems it solves, and how it should work.

## Why This Exists

Existing tools are **scattered**:
- adv-plus-calculator (SMB-focused, not region-specific)
- Orphaned ROI/TCO app (owner departed)
- Multiple Google Sheets, enablement decks, Vault docs
- Ad hoc SE-built merchant comparisons in SE-ntral (8+ unique, built from scratch)

No standardized, reusable selling toolkit. Every deal starts from scratch.

## Problems It Solves

| Gap | Solution in PlusCase |
|-----|----------------------|
| No standardized selling tool | Calculators, comparisons, generators in one place |
| No Plus-specific upgrade ROI calculator | TCO, Fee Savings, POS Pro, ROI calculators |
| No region-specific calculator | EMEA, APAC, NA, UK region selector with correct currencies |
| No scenario-based document generator | AI one-pagers, emails, talk tracks from merchant inputs |
| Materials not at point of need | Single Quick site, always accessible |
| AEs lack talk tracks | Talk track generator + comparison tables with "why it matters" |

## User Experience Goals

1. **Fast** — No build step, CDN assets, sessionStorage cache. AE gets results in seconds.
2. **Contextual** — Region-specific pricing. Merchant-specific AI output.
3. **Portable** — Copy to clipboard, export (future PDF). Share with merchant.
4. **Confidence-building** — Pre-built comparisons, quantified savings, ready talk tracks.
5. **Human-in-control** — Auto-generate, but AE reviews before sending. SE-ntral augments, doesn't replace.

## Key User Flows

1. **Calculate savings** → Pick calculator → Enter GMV, locations, region → See results → Save/copy
2. **Compare features** → Pick category → View table with Advanced vs Plus → Use in conversation
3. **Generate document** → Pick generator type → Enter merchant details → AI generates → Review → Copy/share
4. **Find resources** → Resources page → Links to decks, Guru, Vault
