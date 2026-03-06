# Advanced vs Plus Rates Reference

> **Source:** Pulled from Internal Help Center (search_internal_help_center) and Google Sheet `16Xg0cuXDGph-oegDkJTBXZPb1CECyw-sJhhG7Ly0z0g` (Shopify Payments & MS Products Rate Sheet — Master View).  
> **Owner:** #ms-rates. **INTERNAL ONLY** — do not share with merchants.

---

## 1. Third-Party Transaction Fees (when NOT using Shopify Payments)

Used for fee savings calculations when merchant uses 3rd party gateway (Stripe, Authorize.net, etc.).

| Plan | Rate | Notes |
|------|------|-------|
| Basic | 2% | |
| Shopify/Grow | 1% | |
| **Advanced** | **0.5%** | Grandfathered. New Core (Feb 2024): 0.6% |
| **Plus** | **0.15%–0.20%** | 0.15% = 3yr lock-in; 0.20% = new 2024 |

*Source: Billing - Third-party Transaction Fees Explained, Plus Platform Pricing*

---

## 2. Advanced Plan — Monthly Pricing by Region

From "Breakdown Of Plan Pricing - including Local Pricing" (Jan 2026).

### EMEA (country-level — rates differ by EU country)

| Country | Currency | Advanced Monthly |
|---------|----------|------------------|
| Germany | EUR | 384 |
| France | EUR | 384 |
| Italy | EUR | 384 |
| Spain | EUR | 384 |
| Netherlands | EUR | 384 |
| Finland | EUR | 384 |
| Ireland | EUR | 384 |
| Switzerland, Sweden, Denmark, Norway | EUR | 399 |
| Poland | PLN | 1,630 |
| UAE | USD | 399 |
| Turkey | USD | 399 |

### Other regions

| Region | Currency | Monthly |
|--------|----------|---------|
| US | USD | 399 |
| Canada | CAD | 517 |
| UK | GBP | 344 |
| Australia | AUD | 575 |
| Singapore | SGD | 531 |
| Japan | JPY | 58,500 |
| India | INR | 30,164 |

*Note: Brazil/Mexico, China, HK, Philippines etc. often use USD 399. Feb 2026: CHF, CZK, DKK, NOK, RON, SEK coming for core plans.*

---

## 3. Plus Plan — Platform Fee Model (Feb 2024)

**Fixed minimum OR Variable Platform Fee (VPF), whichever is higher:**

| Term | Fixed Min | VPF (D2C) | VPF (Retail) | VPF (B2B) |
|------|-----------|-----------|--------------|-----------|
| 1 Year | $2,500/mo | 0.40% | 0.25% | 0.18% |
| 3 Year | $2,300/mo | 0.35% | 0.25% | 0.18% |

- D2C = Direct-to-consumer online
- Retail = POS / in-person
- B2B = B2B on Shopify volume

*VPF applies to Eligible Platform Transactions. GMV is in USD (converted at mid-market).*

**EMEA (from public Plus pricing page):** €2,250 (1yr) / €2,100 (3yr) per month.

---

## 4. POS Pro

| Plan | Per Location |
|------|--------------|
| Advanced | $89/mo |
| Plus | Included (up to 200 locations) |

---

## 5. Shopify Payments Rates (Plus Exclusive)

*Country-specific. Used when merchant uses Shopify Payments — not for 3rd party fee comparison.*

- **France:** Domestic 1.00%; International/AMEX 2.30%
- **Japan:** Domestic 2.90%; International/AMEX 3.75%; JCB 2.90%
- **US:** Standard/premium tiers; in-person rates lower than Advanced

*Full rates: [Master sheet gid=310971166](https://docs.google.com/spreadsheets/d/16Xg0cuXDGph-oegDkJTBXZPb1CECyw-sJhhG7Ly0z0g/edit#gid=310971166)*

---

## 6. Calculator Logic Notes

- **Fee savings:** Compare 3rd party transaction fees (Advanced 0.5% vs Plus 0.15–0.20%).
- **TCO:** Include plan + transaction fees + POS Pro.
- **Plus VPF:** When GMV × VPF% > fixed min, use VPF; otherwise use fixed min.
- **Regional plan prices:** Use local currency where available.
