/**
 * Plan pricing and rates.
 * Source: Internal Help Center + Shopify Payments Rate Sheet (16Xg0cuXDGph-oegDkJTBXZPb1CECyw-sJhhG7Ly0z0g).
 * See memory-bank/RATES-REFERENCE.md. INTERNAL ONLY.
 */

export const PLAN_PRICING = {
  advanced: { monthly_usd: 399, annual_usd: 299, transaction_fee: 0.005 },
  plus:     { monthly_usd: 2300, annual_usd: 1850, transaction_fee_min: 0.0015, transaction_fee_max: 0.003 },
};

/**
 * 3rd-party transaction fees. Rates depend on SP enabled/disabled and new/existing.
 * SP Enabled + Plus = 0% for most gateways, but PayPal Express still charged.
 * Source: Master Rate Sheet "Summary - 3P Transaction Fees" + "Detailed - 3P Transaction Fees".
 */
export const THIRD_PARTY_TRANSACTION_FEES = {
  existing: {
    advanced: { sp_enabled: 0.005, sp_disabled: 0.005, paypal: 0.005 },
    plus:     { sp_enabled: 0,     sp_disabled: 0.0015, paypal: 0.0015 },
  },
  new_2024: {
    advanced: { sp_enabled: 0.006, sp_disabled: 0.006, paypal: 0.006 },
    plus:     { sp_enabled: 0,     sp_disabled: 0.002,  paypal: 0.002 },
  },
};

/** Plus Variable Platform Fee (VPF) — used when GMV × rate > fixed minimum. Rates as decimal. */
export const PLUS_VPF = {
  term_1yr: { fixed_min_monthly: 2500, d2c: 0.004, retail: 0.0025, b2b: 0.0018 },
  term_3yr: { fixed_min_monthly: 2300, d2c: 0.0035, retail: 0.0025, b2b: 0.0018 },
};

/** Regional plan pricing (monthly, in local currency). */
export const REGIONAL_PRICING = {
  na:   { advanced: 399, plus_fixed: 2500, currency: 'USD', symbol: '$' },
  uk:   { advanced: 344, plus_fixed: 2100, currency: 'GBP', symbol: '£' },
  emea: { advanced: 384, plus_fixed: 2250, currency: 'EUR', symbol: '€' },
  apac: { advanced: 575, plus_fixed: 2500, currency: 'AUD', symbol: 'A$' },
};

/**
 * EMEA country-level plan + SP rates.
 * Plan: Advanced monthly / Plus fixed 1yr & 3yr (local currency).
 * SP: Shopify Payments credit card rates (decimal). Source: Master Rate Sheet gid=689462759.
 * 3P transaction fees are global — see THIRD_PARTY_TRANSACTION_FEES.
 */
export const EMEA_COUNTRIES = {
  de: {
    label: 'Germany', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'de-DE',
    sp: {
      advanced: { domestic: 0.016, eea: 0.016, intl: 0.027, amex: 0.027, fixed: 0.30 },
      plus:     { domestic: 0.013, eea: 0.013, intl: 0.023, amex: 0.023, fixed: 0.30 },
    },
  },
  fr: {
    label: 'France', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'fr-FR',
    sp: {
      advanced: { domestic: 0.011, eea: 0.011, intl: 0.024, amex: 0.024, fixed: 0.25 },
      plus:     { domestic: 0.010, eea: 0.010, intl: 0.023, amex: 0.023, fixed: 0.25 },
    },
  },
  it: {
    label: 'Italy', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'it-IT',
    sp: {
      advanced: { domestic: 0.016, eea: 0.016, intl: 0.032, amex: 0.032, fixed: 0.25 },
      plus:     { domestic: 0.014, eea: 0.014, intl: 0.029, amex: 0.029, fixed: 0.25 },
    },
  },
  es: {
    label: 'Spain', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'es-ES',
    sp: {
      advanced: { domestic: 0.016, eea: 0.016, intl: 0.027, amex: 0.027, fixed: 0.30 },
      plus:     { domestic: 0.013, eea: 0.013, intl: 0.023, amex: 0.023, fixed: 0.30 },
    },
  },
  nl: {
    label: 'Netherlands', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'nl-NL',
    sp: {
      advanced: { domestic: 0.016, eea: 0.016, intl: 0.026, amex: 0.026, fixed: 0.25 },
      plus:     { domestic: 0.014, eea: 0.014, intl: 0.025, amex: 0.025, fixed: 0.25 },
    },
  },
  fi: {
    label: 'Finland', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'fi-FI',
    sp: {
      advanced: { domestic: 0.014, eea: 0.014, intl: 0.029, amex: 0.029, fixed: 0.25 },
      plus:     { domestic: 0.013, eea: 0.013, intl: 0.028, amex: 0.028, fixed: 0.25 },
    },
  },
  ie: {
    label: 'Ireland', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'en-IE',
    sp: {
      advanced: { domestic: 0.015, eea: 0.015, intl: 0.025, amex: 0.025, fixed: 0.25 },
      plus:     { domestic: 0.014, eea: 0.014, intl: 0.024, amex: 0.024, fixed: 0.25 },
    },
  },
  at: {
    label: 'Austria', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'de-AT',
    sp: {
      advanced: { domestic: 0.017, eea: 0.017, intl: 0.032, amex: 0.032, fixed: 0.25 },
      plus:     { domestic: 0.015, eea: 0.015, intl: 0.030, amex: 0.030, fixed: 0.25 },
    },
  },
  be: {
    label: 'Belgium', advanced: 384, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'EUR', symbol: '€', locale: 'nl-BE',
    sp: {
      advanced: { domestic: 0.017, eea: 0.017, intl: 0.032, amex: 0.032, fixed: 0.25 },
      plus:     { domestic: 0.015, eea: 0.015, intl: 0.030, amex: 0.030, fixed: 0.25 },
    },
  },
  ch: {
    label: 'Switzerland', advanced: 399, plus_fixed_1yr: 2250, plus_fixed_3yr: 2100, currency: 'CHF', symbol: 'CHF', locale: 'de-CH',
    sp: {
      advanced: { domestic: 0.0255, eea: 0.0255, intl: 0.0285, amex: 0.0285, fixed: 0.30 },
      plus:     { domestic: 0.023, eea: 0.023, intl: 0.026, amex: 0.026, fixed: 0.30 },
    },
  },
  se: {
    label: 'Sweden', advanced: 4590, plus_fixed_1yr: 25900, plus_fixed_3yr: 24200, currency: 'SEK', symbol: 'kr', locale: 'sv-SE',
    sp: {
      advanced: { domestic: 0.014, eea: 0.014, intl: 0.029, amex: 0.029, fixed: 0.25 },
      plus:     { domestic: 0.013, eea: 0.013, intl: 0.028, amex: 0.028, fixed: 0.25 },
    },
  },
  dk: {
    label: 'Denmark', advanced: 2979, plus_fixed_1yr: 16790, plus_fixed_3yr: 15670, currency: 'DKK', symbol: 'kr', locale: 'da-DK',
    sp: {
      advanced: { domestic: 0.016, eea: 0.016, intl: 0.026, amex: 0.026, fixed: 0.25 },
      plus:     { domestic: 0.014, eea: 0.014, intl: 0.025, amex: 0.025, fixed: 0.25 },
    },
  },
  no: {
    label: 'Norway', advanced: 4710, plus_fixed_1yr: 26550, plus_fixed_3yr: 24780, currency: 'NOK', symbol: 'kr', locale: 'nb-NO',
    sp: {
      advanced: { domestic: 0.018, eea: 0.018, intl: 0.028, amex: 0.028, fixed: 0.25 },
      plus:     { domestic: 0.016, eea: 0.016, intl: 0.026, amex: 0.026, fixed: 0.25 },
    },
  },
  pl: {
    label: 'Poland', advanced: 1630, plus_fixed_1yr: 9680, plus_fixed_3yr: 9030, currency: 'PLN', symbol: 'zł', locale: 'pl-PL',
    sp: {
      advanced: { domestic: 0.0165, eea: 0.0165, intl: 0.029, amex: 0.029, fixed: 0.25 },
      plus:     { domestic: 0.0145, eea: 0.0145, intl: 0.027, amex: 0.027, fixed: 0.25 },
    },
  },
  gb: {
    label: 'United Kingdom', advanced: 344, plus_fixed_1yr: 2100, plus_fixed_3yr: 1950, currency: 'GBP', symbol: '£', locale: 'en-GB',
    sp: {
      advanced: { domestic: 0.015, eea: 0.025, intl: 0.025, amex: 0.025, fixed: 0.25 },
      plus:     { domestic: 0.013, eea: 0.023, intl: 0.023, amex: 0.023, fixed: 0.25 },
    },
  },
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
  usd: 89,
  eur: 79,
  gbp: 69,
  pln: 339,
  chf: 69,
  sek: 979,
  dkk: 649,
  nok: 979,
};

export const LOCATIONS = {
  advanced: { max: 'Limited' },
  plus:     { max: 200 },
};

export const KEY_DIFFERENTIATORS = [
  {
    title: 'Checkout Extensibility',
    description: 'Full control over the checkout experience with UI Extensions, Functions, and Branding API. The single most impactful differentiator for merchants needing custom checkout flows.',
  },
  {
    title: 'B2B on Shopify',
    description: 'Native wholesale channel with company accounts, custom price lists, payment terms, and quantity rules — no third-party app needed.',
  },
  {
    title: 'Shopify Audiences',
    description: 'Leverage Shopify network data for high-intent retargeting and lookalike audiences. Proven to lower customer acquisition costs.',
  },
  {
    title: 'Expansion Stores',
    description: 'Launch up to 9 additional storefronts for multi-brand or multi-region strategies under one organization.',
  },
  {
    title: 'Bot Protection',
    description: 'Checkout-level bot protection that stops automated purchasing during flash sales and product drops.',
  },
  {
    title: 'Launchpad',
    description: 'Schedule and automate product launches, flash sales, and theme changes — essential for high-volume campaign operations.',
  },
  {
    title: 'Exclusive APIs',
    description: 'Access to Checkout, Functions, Fulfillment, User, Gift Cards, and Multipass APIs for SSO, loyalty, and headless commerce.',
  },
  {
    title: 'Custom Payment Gateways',
    description: 'Eligibility for custom payment gateway app integrations — Plus-only access for merchants with specialized payment needs.',
  },
];

export const KEY_BENEFITS = [
  {
    icon: 'trending-down',
    title: 'Lower Total Cost of Ownership at Scale',
    description: 'Reduced transaction fees (0.15-0.30% vs 0.5%), included POS Pro, and lower SP rates mean Plus pays for itself at the right GMV.',
  },
  {
    icon: 'zap',
    title: '10x API Capacity',
    description: '400 requests/second vs 40 — critical for merchants with complex integrations, high catalog volumes, or headless architectures.',
  },
  {
    icon: 'store',
    title: 'POS Pro Included',
    description: 'Save $89/location/month. For merchants with 5+ retail locations, POS Pro alone can justify the upgrade.',
  },
  {
    icon: 'shopping-cart',
    title: 'Own the Checkout Experience',
    description: 'Checkout UI Extensions and Functions let merchants customize payment, delivery, and branding — impossible on Advanced.',
  },
  {
    icon: 'users',
    title: 'Unlimited Staff Accounts',
    description: 'No more hitting the 15-account ceiling. Scale your team without worrying about seat limits.',
  },
  {
    icon: 'shield',
    title: 'Dedicated Success Manager',
    description: 'Priority 24/7 support with a dedicated Merchant Success Manager who knows your business.',
  },
];

export const REGIONS = {
  na:   { label: 'North America', currency: 'USD', symbol: '$' },
  emea: { label: 'EMEA', currency: 'EUR', symbol: '€' },
  apac: { label: 'APAC', currency: 'AUD', symbol: 'A$' },
  uk:   { label: 'UK', currency: 'GBP', symbol: '£' },
};

export const FEATURE_CATEGORIES = [
  {
    id: 'functional',
    label: 'Functional',
    features: [
      { name: 'Checkout UI Extensions', advanced: false, plus: true },
      { name: 'Checkout Functions', advanced: false, plus: true },
      { name: 'Checkout Branding API', advanced: false, plus: true },
      { name: 'B2B on Shopify', advanced: false, plus: true },
      { name: 'Company accounts', advanced: false, plus: true },
      { name: 'Custom price lists', advanced: false, plus: true },
      { name: 'Payment terms (Net 30/60)', advanced: false, plus: true },
      { name: 'Quantity rules & volume pricing', advanced: false, plus: true },
      { name: 'Shopify Audiences', advanced: false, plus: true },
      { name: 'Expansion Stores', advanced: false, plus: true },
      { name: 'Bot Protection (checkout)', advanced: false, plus: true },
      { name: 'Launchpad', advanced: false, plus: true },
      { name: 'Organization-level analytics', advanced: false, plus: true },
    ]
  },
  {
    id: 'technical',
    label: 'Technical',
    features: [
      { name: 'API rate limit', advanced: '40 req/s', plus: '400 req/s' },
      { name: 'Custom gateway apps', advanced: false, plus: true },
      { name: 'Checkout API access', advanced: false, plus: true },
      { name: 'Functions API', advanced: false, plus: true },
      { name: 'Fulfillment Orders API', advanced: 'Limited', plus: 'Full' },
      { name: 'Custom pixel tracking', advanced: 'Limited', plus: 'Full' },
    ]
  },
  {
    id: 'commercial',
    label: 'Commercial',
    features: [
      { name: 'Monthly price', advanced: '$399/mo ($299 annual)', plus: '$2,300/mo ($1,850 annual)' },
      { name: 'Transaction fee (Shopify Payments)', advanced: '0.5%', plus: '0.15–0.30%' },
      { name: '3rd-party transaction fee (SP enabled)', advanced: '0.5–0.6%', plus: '0%' },
      { name: 'POS Pro per location', advanced: '$89/mo', plus: 'Included' },
      { name: 'Variable Platform Fee (VPF)', advanced: 'N/A', plus: '0.18–0.40% (channel-dependent)' },
    ]
  },
  {
    id: 'operational',
    label: 'Operational',
    features: [
      { name: 'Staff accounts', advanced: '15', plus: 'Unlimited' },
      { name: 'Locations', advanced: 'Limited', plus: 'Up to 200' },
      { name: 'Payment customizations', advanced: false, plus: true },
      { name: 'Delivery customizations', advanced: false, plus: true },
    ]
  },
  {
    id: 'personal',
    label: 'Personal',
    features: [
      { name: 'Support tier', advanced: 'Standard 24/7', plus: 'Priority 24/7' },
      { name: 'Merchant Success Manager', advanced: false, plus: true },
      { name: 'Negotiable rates', advanced: false, plus: true },
      { name: 'Plus Trial eligibility', advanced: false, plus: true },
      { name: 'Launch support', advanced: false, plus: true },
    ]
  },
];

/** Placeholder — replace with actual public URLs. */
export const PUBLIC_SOURCES = [
  { label: 'Shopify Plus Homepage', url: 'https://www.shopify.com/plus', description: 'Official Plus feature overview and positioning' },
  { label: 'Shopify Plus Pricing', url: 'https://www.shopify.com/plus/pricing', description: 'Public pricing page with plan comparison' },
  { label: 'Shopify Editions (Changelog)', url: 'https://www.shopify.com/editions', description: 'Latest platform updates and new Plus features' },
  { label: 'Shopify Help Center — Plan Features', url: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features', description: 'Detailed feature comparison across all plans' },
  { label: 'Shopify Plus Academy', url: 'https://academy.shopify.com', description: 'Training resources for Plus merchants and partners' },
];

/** Placeholder — replace with real merchant stories and quantified benefits. */
export const SUCCESS_STORIES = [
  {
    merchant: 'Example Merchant A',
    scenario: 'Upgraded from Advanced to Plus',
    benefit: 'Saved $28K+/year from lower processing fees and included POS Pro across 12 locations.',
    quote: 'The numbers made it obvious — Plus paid for itself within 3 months.',
  },
  {
    merchant: 'Example Merchant B',
    scenario: 'Moved to Plus for B2B',
    benefit: 'Launched wholesale channel natively, replacing $2K/month in third-party app costs.',
    quote: 'B2B on Shopify replaced three separate tools we were stitching together.',
  },
  {
    merchant: 'Example Merchant C',
    scenario: 'Upgraded for Checkout Extensibility',
    benefit: 'Custom checkout increased conversion rate by 4.2% within first quarter.',
    quote: 'We finally had full control over the checkout — that was the tipping point.',
  },
  {
    merchant: 'Example Merchant D',
    scenario: 'Scaled to Plus for API limits',
    benefit: '10x API capacity eliminated rate-limiting issues during peak traffic, supporting 50K+ SKU catalog sync.',
    quote: 'We were constantly hitting the 40 req/s wall. Plus removed that bottleneck overnight.',
  },
];
