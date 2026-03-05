# Plus vs Advanced: Sales Enablement Research

**Project:** Help AEs sell Plus more effectively over Advanced  
**Owner:** Rick Wichgers  
**Date:** 2026-02-27  
**Status:** Research complete — pending team discussion  
**[INTERNAL-ONLY]**

---

## Executive Summary

Selling Plus over Advanced is a confidence and tooling problem, not a knowledge problem. AEs broadly know *what* Plus offers — they struggle to articulate *why it matters* in financial and business outcome terms for a specific merchant.

**The data says:**
- Average AE confidence explaining Plus value: **5.5/10** (range 3-9, n=8)
- **#1 reason deals are lost**: "Merchant doesn't see enough value for the price difference" (75% of respondents)
- **#1 success pattern**: Running the numbers — TCO, transaction fee savings, VPF rates at the right GMV. The top sellers win on **commercials**, not features.
- **#1 request from AEs**: Calculators and financial comparison tools (63% of respondents explicitly mention this)

**What exists:** A scattered collection of tools — an existing Quick calculator (SMB-focused, not region-specific), an orphaned enterprise ROI app (owner departed), several Google Sheets, enablement decks, Vault docs, and ad hoc SE-built merchant comparisons in SE-ntral. No standardized, reusable selling toolkit.

**What's missing:** No region-specific calculator. No scenario-based document generator. No consolidated talk tracks. No business outcome mapper. No automated upgrade identification. No proof points with conversion uplift data. Every deal starts from scratch.

**The core gap:** AEs who win Plus deals do so through **financial framing** — mapping TCO, transaction fees, and POS Pro savings to the merchant's specific GMV and setup. But most AEs lack the tools and confidence to build that financial case without SE support. The tooling exists in fragments; it needs to be consolidated, regionalized, and made AE-ready.

---

## Table of Contents

1. [Survey Analysis](#1-survey-analysis)
2. [What Already Exists](#2-what-already-exists)
3. [Plus-Exclusive Features](#3-plus-exclusive-features-current-differentiators)
4. [Gap Analysis](#4-gap-analysis)
5. [Design Suggestions for Discussion](#5-design-suggestions-for-discussion)
6. [Key Channels & People](#6-key-channels--people)
7. [Annex A: Full Survey Responses](#annex-a-full-survey-responses)

---

## 1. Survey Analysis

**Source:** `#project-adv-vs-plus` Slack workflow survey, Feb 23-24, 2026  
**Respondents:** 8 AEs  

### 1.1 Confidence Levels

| Respondent | Confidence (1-10) |
|---|---|
| Matilda Bernard | 7 |
| Davida Sakalauskaite | 3 |
| Crockybalboa | 9 |
| YesSheKhan | 3 |
| Mathias Heidehorn | 5 |
| Matt | 6 |
| Ben | 6 |
| DoubleGandT | 5 |

**Average: 5.5** | **Median: 5.5** | **Range: 3-9**

Only 1/8 is highly confident (9). Three are at 3-5 (not confident). Four are at 5-7 (moderately confident). The majority don't feel equipped.

### 1.2 Why Deals Are Lost to Advanced

| Reason | Count (of 8) |
|---|---|
| Merchant doesn't see enough value for the price difference | **6** |
| The merchant's needs genuinely fit Advanced better | **4** |
| I don't have the right materials or talk tracks ready | **4** |
| The technical differentiation is hard to explain without SE support | **3** |
| I struggle to connect Plus features to business outcomes | **2** |

**Other reasons stated:**
- "Cost and not enough feature differences anymore" (Crockybalboa)
- "Mostly commercials and merchants not seeing enough value from the price difference / features" (Mathias)

The price-value gap is the dominant blocker. But the tooling/materials gap (4/8) and SE-dependency gap (3/8) are actionable — those are things we can fix.

### 1.3 What People DO (Observed Selling Behaviors)

Patterns from Q3 (success stories) and Q4 (conversation approach):

- **Lead with Plus, avoid comparison**: 3/8 (YesSheKhan, Matt, Ben) avoid the Advanced vs Plus conversation entirely and try to lead with Plus from the start. This is a coping strategy for not having strong comparison materials.
- **Win on financials**: The successful deals are consistently won on TCO and commercials, not features:
  - "Mapping out overall TCO including lower rates / trans fees but this only works if they are in the sweet spot for GMV" (Crockybalboa, confidence 9)
  - "Ran the numbers and financially, it made sense for the brand to choose plus" (YesSheKhan)
  - "Commercials when they do over $5M" (Mathias)
  - "I could negotiate discounts, and a PDF to help pay for their migration work on Plus and not on Advanced" (Matilda)
- **Win on prior experience**: "Merchant had experience with Plus in the past. The store they upgraded didn't even fit the revenue threshold but they saw the technical benefits." (Ben) — proof points and references matter.
- **Lean on specific technical triggers**: "API limits, rate reviews, MBA agreements" (Matt) — when there's a hard technical requirement, Plus sells itself.
- **Newer AEs have no playbook**: Davida (confidence 3) hasn't sold against Advanced yet and provided "n/a" for success stories. No onboarding path exists for this conversation.

### 1.4 What People SAY (Stated Challenges)

- The feature gap is perceived as closing: "Cost and not enough feature differences anymore" — if AEs believe Advanced is "good enough," they won't push Plus.
- Materials are missing at the moment of need: 4/8 say they don't have materials ready *when they need them* — the issue isn't that materials don't exist, it's that they're scattered and not accessible in the flow of work.
- SE dependency is a bottleneck: 3/8 can't explain technical differentiation alone. SEs carry too much of the Plus justification burden.
- Price justification is circular: AEs talk about price (Q4) because merchants push back on price (Q2), but they lack the financial modeling tools to make the case.

### 1.5 What People NEED (Direct Requests)

Organized by theme, with direct quotes:

**Financial/Calculator Tools (5/8):**
- "I have recently discovered a quick site / calculator that shows a minimal price difference between the two which I intend to start using more often" (Matilda)
- "I think we have them now with all the adv v plus calcs" (Crockybalboa — the only one who feels served)
- "The Advanced vs Plus calculator, and tied to the features they need (B2B, checkout extensibility etc)" (Mathias)
- "An easy to use TCO/ROI calc" (Ben)
- "Shifting a calculator to a quick site making it region specific" (DoubleGandT)

**Scenario-Based / Personalized Materials (2/8):**
- "A scenario based tool that creates a customer facing doc — i.e. customer x with GMV of y with z requirements creates a one page doc that shows them the key differences relevant to their use case" (Matt)
- "Clear, easy to present deck that shows specific value-adds from Plus" (Ben)

**Proof Points and Data (1/8, but high signal):**
- "Graph showing expected uplift in conversion on Plus" (YesSheKhan)
- "Brands that have moved from Adv to Plus and seen revenue uplift" (YesSheKhan)

**Practical Knowledge (1/8):**
- "If the merchant has more than 10 locations they have to be on plus to use POS" (Davida — learning on the job, no structured knowledge base)

### 1.6 Key Takeaway

The top sellers win on **commercials and financial framing**. The struggling sellers lack the **tools and confidence** to build that case. The solution isn't more feature lists — it's making financial modeling fast, easy, region-specific, and available at the point of need.

---

## 2. What Already Exists

### 2.1 Interactive Tools

| Tool | URL | What It Does | Owner | Status |
|---|---|---|---|---|
| **Adv-Plus Calculator** | `adv-plus-calculator.quick.shopify.io` | 6-page interactive tool for SMB/lower mid-market. Visual conversion funnels, scenario modeling (Poor vs Great), PDF export, net annual benefit summary. | Cassie Handrahan | Active |
| **ROI/TCO App** | `roi-tco.shopify.prod.shopifyapps.com` | Enterprise-focused. Replaces spreadsheets, live merchant fill-in, real-time results. | Pretesh Mistry | **Owner departed — needs new owner** |
| **Rate Limit Calculator** | `rate-limit-calculator.quick.shopify.io` | Compares API rate limits by plan (Advanced: 40 req/s vs Plus: 400 req/s). | Unknown | Active |
| **B2B TCO Calculator** | `b2btco.code.digital` | Partner-created (Code/Domaine). European B2B campaign. Lead-capture wizard for "Why Shopify for B2B?" | Code/Domaine | Active (partner-managed) |
| **CSM Pulse** | `csm-pulse.quick.shopify.io` | AI briefing tool (10 chained agents). Personalized merchant briefings with performance analysis and product opportunities. | Nathan Davis | Active |

### 2.2 Spreadsheet Calculators

| Calculator | Link | Focus |
|---|---|---|
| TCO Calculator (General) | [Google Sheet](https://docs.google.com/spreadsheets/d/1FbHBWKD2uWwaSGvbtD6LZmMovFiHnh0mm9P08PbrEfA/edit) | Platform migration (Magento/SFCC vs Shopify). Has [how-to video](https://share.descript.com/view/YwoOkge13lT). **Not Plus vs Advanced.** |
| Enterprise ROI Calculator | [Google Sheet](https://docs.google.com/spreadsheets/d/1JTJQHVEkqOAXuFGR69O4f5UA53-4L-g4nmVYvRPBcnc/) | Enterprise ROI (Nick Essling) |
| Audiences ROI Calculator | [Google Sheet](https://docs.google.com/spreadsheets/d/1hY8v8vqcR8XaeXaAmyF4HXVkGaV_DpYHUwGvgUb1FlU/) | Audiences-specific ROI (Lauren Ernst) |
| DTC TCO Calculator | [Google Sheet](https://docs.google.com/spreadsheets/d/1OAkt9u24ZW4xAqjmHVAALRSdlAX0-RlKd_aP6UrYm-s/) | DTC TCO (Lauren Ernst) |

### 2.3 Enablement Decks & Documents

| Resource | Link | Author |
|---|---|---|
| Plus ROI Customer Deck | [Google Slides](https://docs.google.com/presentation/d/1H-5moGx4UkEYtg0c2He3KXqTCRd7f_EMcX8p4Kl5wNE/) | Lauren Ernst |
| Audiences & Checkout Enablement Deck | [Google Slides](https://docs.google.com/presentation/d/1bSyi5aTi4j0vaOa-w3TwcUzRaQ4wCSCRPy-mBH5jEoA/) | Lauren Ernst & Jiva |
| Plus Plan Differentiation Deck | [Google Slides](https://docs.google.com/presentation/d/1C2Doa7CbK4MQP_fl_vQijG6h6_Uh8xNy9AyHz0ulZyc/) | William Leiter (Tobi-approved features) |
| Plus Feature Grid | [Google Sheet](https://docs.google.com/spreadsheets/d/1k5EMjglQZjV65e9y5g3JTS4e30Ez7CvO4hZsmC-MCTU/) | Katie Bent |
| Plus Exclusive Features | [Guru Card](https://app.getguru.com/card/qi96aLpi/) | — |
| Plus Trial Board | [Guru Board](https://app.getguru.com/folders/i59nxorT/Plus-Trial) | — |
| Project Doc | [Google Doc](https://docs.google.com/document/d/1yEo7i0SENfovy2CA5RzwBcqg_4Wm50ONK9kQM68BrtY/) | `#project-adv-vs-plus` |
| Survey Results | [Google Sheet](https://docs.google.com/spreadsheets/d/1_bOBbMVjLZhjt4ZkmA6eCnKn8cYwnCG2ZxzXcEouvMY/) | Rick Wichgers |

### 2.4 Vault Resources

| Resource | Vault Ref | What It Contains |
|---|---|---|
| Plus vs Advanced Plan Differentiation | Page `19Yo` / [Google Doc](https://docs.google.com/document/d/1DKTcJX16Xq07O-T8V32bPQxT2pqRPmbr25Jh_8RBTh8/edit) | Feature differentiation details. Notes: "Advanced workarounds are not meant to be shared externally." |
| Value Selling & 5Cs Discovery | Page `s5Ih` | Full framework, pre-assessment, 5Cs activity, training videos. Owner: Rachel Farewell (Revenue Enablement). |
| Land and Expand Playbook | — | Operational guide: "Upgrade to Plus when scale or Audiences makes ROI obvious." |
| AI Commercial Revenue Education | Page `5nll` | TCO comparison methodology and ROI calculation guidance. |

### 2.5 SE-ntral Account Examples

Merchant-specific Plus vs Advanced comparisons exist for at least 8 accounts:

| Merchant | What Was Built | Key Detail |
|---|---|---|
| Whitelbl / KRPV | Plus vs Advanced comparison | Quantified $28K+/year savings at $13M revenue from processing fees + POS Pro |
| Flaconi | API rate limit + decision matrix | Advanced 40 req/s vs Plus 400 req/s — hard technical requirement |
| DPG Media | Plus vs Advanced requirements analysis | Checkout UI Extensions, custom Functions, SSO/OAuth all Plus-only |
| IntexDevelopment | Plan comparison doc | Checkout extensibility, pricing, support tiers |
| Giordano | Feature comparison table | VPF rates, Expansion Stores, Launchpad, Scripts, dedicated support |
| EMCO | Strategic positioning doc | Advantages/disadvantages of phased Advanced-then-Plus approach |
| Humanscale | Commercial + technical comparison | Break-even analysis |
| Hornby / Frasers | Checkout extensibility justification | Custom payment app eligibility is Plus-only |

**Every one of these was built from scratch.** No template. No reusable starting point.

Common ROI formula appearing across accounts: `Performance Recovery + Shop Pay Lift + Platform Savings`

### 2.6 Stalled Internal Projects

| Project | ID | Status | What Happened |
|---|---|---|---|
| Determine desired plan differentiation for Plus | GSD 44123 | **Stopped** | Aimed to add Plus value post-Orion price increase |
| Gating Discount Stacking for Plus | GSD 38057 | **Stopped** | Limiting discount stacking to Plus for differentiation |
| `#proj-plus-plan-differentiation` | — | **Archived** Sept 2025 | Product decisions on Plus-exclusive features |
| Markets Plan Gating (Pt 1) | GSD 37779 | Done | Used Markets features for plan differentiation |

The product-level effort to differentiate Plus has lost momentum. The Plus Trial program (60-day trial at Advanced pricing, >$100K GMV merchants) is active, but EMEA ABM data shows only **1.3% trial rate** among 82.5K eligible merchants — the value proposition isn't landing.

---

## 3. Plus-Exclusive Features (Current Differentiators)

### Hard Differentiators (features Advanced cannot access)

| Feature | Selling Relevance |
|---|---|
| **Checkout Extensibility** (UI Extensions, Functions, custom checkout code) | Highest-impact differentiator for merchants needing custom checkout experiences |
| **B2B on Shopify** (company profiles, custom pricing, catalogs) | Downmarket to Advanced was **paused** — still Plus-only. Strong for wholesale/hybrid merchants |
| **Shopify Audiences** | US & Canada only. Retargeting/lookalike audiences from Shopify network data |
| **Expansion Stores** (up to 9) | Multi-brand or multi-region merchants |
| **Bot Protection** | Plus-exclusive. Critical for flash sale / drop merchants |
| **Launchpad** | Flash sales, product launches, scheduled theme changes |
| **Exclusive APIs** (User, Gift Cards, Multipass) | SSO, loyalty, headless authentication |
| **Custom payment gateway apps** | Plus-only eligibility for custom payment integrations |

### Commercial Differentiators (economics)

| Feature | Advanced | Plus |
|---|---|---|
| API call limits | 40 req/s | 400 req/s (10x) |
| Staff accounts | 15 | Unlimited |
| POS Pro | $89/location/month | Included |
| Third-party gateway fees | 0.5% | 0.15-0.30% |
| Shopify Payments rates | Standard | Discounted (negotiable) |
| Locations | Limited | Up to 200 |
| Support | Standard | 24/7 Priority |

### Key Insight

The commercial differentiators (POS Pro savings, lower transaction fees, rate negotiations) are what close deals today — confirmed by the survey. The hard differentiators (checkout extensibility, B2B, Audiences) are what close deals when a specific technical need exists. The gap: most AEs can articulate features but can't quantify the commercial impact for a given merchant's profile.

---

## 4. Gap Analysis

### Gap 1: No Standardized Selling Tool
**What's missing:** Every SE builds Plus vs Advanced comparisons from scratch per deal. 8+ unique ad hoc comparisons found in SE-ntral.  
**Evidence:** Survey — 4/8 AEs "don't have the right materials or talk tracks ready when I need them."  
**Impact:** Inconsistent quality, wasted SE time, AEs left unsupported.

### Gap 2: No Plus-Specific Upgrade ROI Calculator
**What's missing:** Existing TCO tools are for platform migration (Magento/SFCC vs Shopify), not for comparing Advanced to Plus within Shopify.  
**Evidence:** Survey — 5/8 AEs explicitly request calculators or financial tools. The one highly confident AE (9/10) wins by "mapping out overall TCO."  
**Impact:** AEs can't make the financial case — the single most effective selling approach.

### Gap 3: No Region-Specific Calculator
**What's missing:** Current calculator is not localized. EMEA/APAC pricing, currencies, and fee structures differ.  
**Evidence:** DoubleGandT (survey): "Shifting a calculator to a quick site making it region specific."  
**Impact:** Non-US/Canada AEs can't use the existing tool effectively.

### Gap 4: No Scenario-Based Document Generator
**What's missing:** No tool that takes merchant inputs (GMV, industry, needs) and generates a customer-facing comparison document.  
**Evidence:** Matt (survey): "a scenario based tool that creates a customer facing doc — i.e. customer x with GMV of y with z requirements creates a one page doc."  
**Impact:** AEs spend time manually building merchant-specific materials or skip the step entirely.

### Gap 5: No Proof Points or Conversion Data
**What's missing:** No accessible data showing conversion uplift, revenue impact, or success stories from merchants who upgraded from Advanced to Plus.  
**Evidence:** YesSheKhan (survey): "Graph showing expected uplift in conversion on Plus" and "Brands that have moved from Adv to Plus and seen revenue uplift."  
**Impact:** AEs have no data-backed evidence to counter "Advanced is good enough."

### Gap 6: No Consolidated Talk Tracks or Objection Scripts
**What's missing:** No structured, searchable reference for handling common objections or framing Plus value by deal stage.  
**Evidence:** 4/8 AEs lack materials. 3/8 can't explain technical differentiation without SE support. Davida (confidence 3) is learning basics on the job with no structured guide.  
**Impact:** AEs default to feature lists, defer to SEs, or avoid the conversation.

### Gap 7: No Business Outcome Mapper
**What's missing:** No tool connecting Plus features to specific business outcomes for a given merchant profile/industry.  
**Evidence:** 2/8 AEs "struggle to connect Plus features to business outcomes." Problem discovery doc identifies this as a core hypothesis.  
**Impact:** Conversations stay at the feature level instead of the value level.

### Gap 8: No Automated Merchant Identification
**What's missing:** No reliable way to identify Advanced merchants who would benefit from Plus upgrade.  
**Evidence:** Maddie Furlong (Slack): "trying to figure out some automation but doesn't seem like there is a source of truth."  
**Impact:** Upgrade opportunities are missed. No proactive pipeline for Plus upgrades.

### Gap 9: Stalled Product Differentiation
**What's missing:** No active product-level effort to widen the Plus vs Advanced feature gap.  
**Evidence:** GSD Project 44123 stopped. B2B downmarket to Advanced paused. `#proj-plus-plan-differentiation` archived.  
**Impact:** The feature gap may continue to close, making the selling problem harder over time.

### Gap 10: Plus Value Perception at Scale
**What's missing:** Even with a Plus Trial program, merchant perception isn't shifting.  
**Evidence:** EMEA ABM data: 82.5K Plus-eligible merchants, only 1.3% trial rate. Program explicitly identifies "missing understanding of Plus value proposition."  
**Impact:** This isn't just an AE tooling problem — it's a broader go-to-market perception issue.

---

## 5. Design Suggestions for Discussion

*These are starting points for the project team conversation. No specs, no commitments.*

### A. Region-Specific Plus vs Advanced Calculator

**Problem it solves:** Gaps 2 and 3 — the #1 AE request.  
**Idea:** Extend or rebuild the existing `adv-plus-calculator.quick.shopify.io` with:
- Regional pricing (EMEA, AMER, APAC currencies and fee structures)
- VPF/transaction fee savings modeled against merchant's actual GMV
- POS Pro cost savings calculated per number of locations
- B2B opportunity sizing (if applicable)
- Checkout extensibility conversion uplift estimates (if data available)
- Client-ready PDF export (already exists in current tool)

**Platform:** Quick site.  
**Automation level:** AE inputs merchant data, tool auto-generates comparison. AE reviews output before sharing with merchant.  
**Effort estimate:** Medium (extends existing tool). Depends on whether current calc codebase is usable.

### B. Scenario-Based One-Pager Generator

**Problem it solves:** Gaps 4 and 7 — personalized, merchant-facing materials.  
**Idea:** AE inputs merchant profile (GMV, industry, number of locations, key needs like B2B/checkout/POS), tool generates a branded one-pager with:
- Personalized value proposition
- Quantified savings/ROI (pulling from calculator logic)
- Relevant Plus features mapped to their stated needs
- Proof point or reference if available

**Platform:** Quick site with AI generation, or Gumloop workflow.  
**Automation level:** Auto-generated draft. AE reviews and edits before sending.  
**Effort estimate:** Medium-High.

### C. Talk Track & Objection Quick Reference

**Problem it solves:** Gap 6 — AEs don't have materials at the moment of need.  
**Idea:** Structured reference, searchable by:
- Objection type ("it's too expensive," "we don't need B2B," "checkout is fine")
- Deal stage (Discovery, Demo, Negotiation, Procurement)
- Merchant profile (SMB, mid-market, enterprise)
- Feature area (checkout, B2B, POS, APIs)

Each entry: objection → reframe → proof point → next step.

**Platform:** Quick site, Guru cards, or even a simple searchable page.  
**Automation level:** Static content, maintained manually. Could be AI-assisted to generate initial drafts.  
**Effort estimate:** Low-Medium.

### D. Plus Value Qualifier

**Problem it solves:** Gaps 1 and 7 — no standardized qualification, no outcome mapping.  
**Idea:** Interactive questionnaire where AE inputs merchant characteristics, and the tool outputs:
- Plus qualification score (strong fit / moderate fit / Advanced is fine)
- Recommended Plus features to lead with
- Suggested talk track
- Estimated financial impact range

**Platform:** Quick site.  
**Automation level:** Fully automated output. AE uses as preparation, not as a customer-facing tool.  
**Effort estimate:** Medium.

### E. Advanced-to-Plus Upgrade Identifier

**Problem it solves:** Gap 8 — no proactive pipeline.  
**Idea:** Automated identification of merchants on Advanced who show signals of needing Plus:
- GMV above break-even threshold
- B2B activity or interest signals
- High API usage nearing rate limits
- Multiple POS locations (POS Pro savings)
- Growth trajectory suggesting scale needs

**Platform:** Gumloop workflow with Slack notifications, or extension of CSM Pulse.  
**Automation level:** Auto-identifies and surfaces candidates. AE decides whether to pursue.  
**Effort estimate:** Medium-High (depends on data source access).

### Suggested Priority Order (for discussion)

1. **A (Calculator)** — highest AE demand, extends existing tool, immediate impact
2. **C (Talk Tracks)** — low effort, high value for less confident AEs, fills the "no materials" gap
3. **B (Doc Generator)** — medium effort, directly requested, builds on calculator output
4. **D (Qualifier)** — valuable for newer AEs and deal preparation
5. **E (Upgrade Identifier)** — highest effort, biggest pipeline impact, but depends on data access

### Implementation Philosophy

Same as stagewise: **automate what's possible, keep human control**.
- Auto-generate, but AE approves before sending
- Auto-identify candidates, but AE decides to pursue
- Auto-calculate ROI, but AE validates assumptions
- SE-ntral remains the context source; this tooling augments, doesn't replace

---

## 6. Key Channels & People

### Slack Channels

| Channel | Relevance | Status |
|---|---|---|
| `#project-adv-vs-plus` | Primary project channel. Survey data, calculator links, active discussions. | **Active** |
| `#kickingcass` | Cassie's SMB team. Calculator shared here, active Plus selling. | Active |
| `#proj-plus-plan-differentiation` | Product decisions on Plus vs Advanced features. | **Archived** Sept 2025 |
| `#proj-plus-trial-row-rollout` | Plus Trial rollout coordination. | Active |
| `#plus-trial-questions` | Ongoing Plus Trial Q&A. | Active |
| `#help-rev-tco-roi` | Feedback channel for ROI/TCO app. | Active |
| `#revenue-ai-use-cases` | AI tools for revenue teams. | Active |
| `#hd39-activate-30-club` | Partner enablement — includes "when to pitch advanced vs plus." | Reference |

### Key People

| Person | Context | Relevant For |
|---|---|---|
| **Cassie Handrahan** | Built adv-plus calculator, SMB team lead | Calculator extension, SMB selling patterns |
| **Maddie Furlong** | AE actively selling Plus, identified merchant ID gap | AE perspective, automation needs |
| **Lauren Ernst** | Created Plus ROI deck, Audiences ROI calc, DTC TCO calc | Enterprise enablement materials |
| **Pretesh Mistry** | Built ROI/TCO app (departed) | Understanding existing app, finding new owner |
| **Nathan Davis** | Built CSM Pulse (AI briefings) | Extending briefings for upgrade identification |
| **William Leiter** | Led Plus Plan Differentiation project | Product-level plan decisions context |
| **Clement Daigremont** | Forrester wave positioning, deep technical SE content | Competitive positioning, technical talk tracks |
| **Ben Rajabi** | B2B product lead | B2B feature gating, downmarket strategy |
| **Rachel Farewell** | Revenue Enablement L&D, owns Value Selling 5Cs | Framework alignment, enablement integration |
| **Natasha Sheil** | Plus Trial enablement lead | Trial strategy, feature messaging |

---

## Annex A: Full Survey Responses

**Survey:** Plus vs Advanced Survey (5 questions)  
**Collection:** Slack workflow in `#project-adv-vs-plus`, Feb 23-24, 2026  
**Respondents:** 8

*Note: Question 5 appeared with different formatting in the Slack workflow ("Tell us all your creative ideas and tool workflows that would make it easier to sell Plus") but all responses are to that question.*

---

### Response 1: @matilda.bernard — February 23, 2026, 3:41 PM UTC

**Q1. Confidence:** 7

**Q2. Biggest reasons losing Plus deals:**
- The merchant's needs genuinely fit Advanced better
- The technical differentiation is hard to explain without SE support

**Q2.1 Other reasons:** *(none)*

**Q3. Successful Plus deal — what made the difference?**
> David M. Robinson. The difference was purely made on the basis that I could negotiate discounts, and a PDF to help pay for their migration work on Plus and not on advantage.

**Q4. Conversation focus:**
- Business outcomes (what Plus enables the merchant to achieve)
- Price justification (why the cost difference is worth it)

**Q5. Ideas/tools to make it easier:**
> I have recently discovered a quite site / calculator that shows a minimal price difference between the two which I intend to start using more often.

---

### Response 2: @Davida Sakalauskaite — February 23, 2026, 4:02 PM UTC

**Q1. Confidence:** 3

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- I don't have the right materials or talk tracks ready when I need them
- The technical differentiation is hard to explain without SE support
- I struggle to connect Plus features to the merchant's business outcomes
- The merchant's needs genuinely fit Advanced better

**Q2.1 Other reasons:** n/a

**Q3. Successful Plus deal — what made the difference?**
> n/a

**Q4. Conversation focus:**
- Business outcomes (what Plus enables the merchant to achieve)

**Q5. Ideas/tools to make it easier:**
> Haven't sold against it yet soo not much help. But it for example if the merchant has more than 10 locations they have to be on plus to use POS.

---

### Response 3: @Crockybalboa — February 23, 2026, 4:06 PM UTC

**Q1. Confidence:** 9

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- The technical differentiation is hard to explain without SE support

**Q2.1 Other reasons:**
> Cost and not enough feature differences anymore

**Q3. Successful Plus deal — what made the difference?**
> Mapping out overall TCO including lower rates / trans fees but this only works if they are in the sweet spot for GMV

**Q4. Conversation focus:**
- Feature differences (what Plus has that Advanced doesn't)
- Price justification (why the cost difference is worth it)

**Q5. Ideas/tools to make it easier:**
> I think we have them now with all the adv v plus calcs

---

### Response 4: @YesSheKhan — February 23, 2026, 4:14 PM UTC

**Q1. Confidence:** 3

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- I don't have the right materials or talk tracks ready when I need them

**Q2.1 Other reasons:** *(none)*

**Q3. Successful Plus deal — what made the difference?**
> Ran the numbers and financially, it made sense for the brand to choose plus

**Q4. Conversation focus:**
- Honestly, I avoid the comparison and try to lead with Plus from the start

**Q5. Ideas/tools to make it easier:**
> - Graph showing expected uplift in conversion on Plus
> - Brands that have moved from Adv to Plus and seen revenue uplift

---

### Response 5: @mathias.heidehorn — February 24, 2026, 9:46 AM UTC

**Q1. Confidence:** 5

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- The merchant's needs genuinely fit Advanced better

**Q2.1 Other reasons:**
> Mostly commercials and merchants not seeing enough value from the price difference / features

**Q3. Successful Plus deal — what made the difference?**
> Commercials when they do over $5M

**Q4. Conversation focus:**
- Price justification (why the cost difference is worth it)

**Q5. Ideas/tools to make it easier:**
> The Advanced vs Plus calculator, and tied to the features they need (B2B, checkout extensibility etc)

---

### Response 6: @matt — February 24, 2026, 10:41 AM UTC

**Q1. Confidence:** 6

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- The merchant's needs genuinely fit Advanced better
- I don't have the right materials or talk tracks ready when I need them

**Q2.1 Other reasons:** *(none)*

**Q3. Successful Plus deal — what made the difference?**
> API limits, rate reviews, MBA agreements

**Q4. Conversation focus:**
- Business outcomes (what Plus enables the merchant to achieve)
- Price justification (why the cost difference is worth it)
- Honestly, I avoid the comparison and try to lead with Plus from the start

**Q5. Ideas/tools to make it easier:**
> a scenario based tool that creates a customer facing doc would be brilliant - i.e. customer x with GMV of y with z requirements creates a one page doc that shows them the key differences relevant to their use case

---

### Response 7: @Ben — February 24, 2026, 11:34 AM UTC

**Q1. Confidence:** 6

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- I struggle to connect Plus features to the merchant's business outcomes
- The merchant's needs genuinely fit Advanced better
- I don't have the right materials or talk tracks ready when I need them

**Q2.1 Other reasons:** *(none)*

**Q3. Successful Plus deal — what made the difference?**
> Merchant had experience with Plus in the past. The store they upgraded didn't even fit the revenue threshold but they saw the technical benefits.

**Q4. Conversation focus:**
- Honestly, I avoid the comparison and try to lead with Plus from the start

**Q5. Ideas/tools to make it easier:**
> An easy to use TCO/ROI calc
> Clear, easy to present deck that shows specific value-adds from Plus

---

### Response 8: @DoubleGandT — February 24, 2026, 11:45 AM UTC

**Q1. Confidence:** 5

**Q2. Biggest reasons losing Plus deals:**
- Merchant doesn't see enough value for the price difference
- I don't have the right materials or talk tracks ready when I need them
- The merchant's needs genuinely fit Advanced better

**Q2.1 Other reasons:** *(none)*

**Q3. Successful Plus deal — what made the difference?**
> The Hang Bag Clinic (Agreement out)

**Q4. Conversation focus:**
- Business outcomes (what Plus enables the merchant to achieve)
- Feature differences (what Plus has that Advanced doesn't)

**Q5. Ideas/tools to make it easier:**
> Shifting a calculator to a quick site making it region specific.

---

*End of research document.*
