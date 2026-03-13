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
    url: 'https://shopify.dev/docs/api/checkout-ui-extensions',
  },
  {
    title: 'B2B on Shopify',
    description: 'Native wholesale channel with company accounts, custom price lists, payment terms, and quantity rules — no third-party app needed.',
    url: 'https://help.shopify.com/en/manual/b2b',
  },
  {
    title: 'Shopify Audiences',
    description: 'Leverage Shopify network data for high-intent retargeting and lookalike audiences. Proven to lower customer acquisition costs by up to 50%.',
    url: 'https://www.shopify.com/ca/enterprise/blog/shopify-audiences',
  },
  {
    title: 'Expansion Stores',
    description: 'Launch up to 9 additional storefronts for multi-brand or multi-region strategies under one organization.',
    url: 'https://help.shopify.com/en/manual/organization-settings/stores',
  },
  {
    title: 'Bot Protection',
    description: 'Checkout-level bot protection that stops automated purchasing during flash sales and product drops.',
    url: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan',
  },
  {
    title: 'Launchpad',
    description: 'Schedule and automate product launches, flash sales, and theme changes — essential for high-volume campaign operations.',
    url: 'https://help.shopify.com/en/manual/promoting-marketing/create-marketing/launchpad',
  },
  {
    title: 'Exclusive APIs',
    description: 'Access to Checkout, Functions, Fulfillment, User, Gift Cards, and Multipass APIs for SSO, loyalty, and headless commerce.',
    url: 'https://shopify.dev/docs/api',
  },
  {
    title: 'Custom Payment Gateways',
    description: 'Eligibility for custom payment gateway app integrations — Plus-only access for merchants with specialized payment needs.',
    url: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan',
  },
];

export const KEY_BENEFITS = [
  {
    icon: 'trending-down',
    title: 'Lower Total Cost of Ownership at Scale',
    description: 'Reduced transaction fees (0.15-0.30% vs 0.5%), included POS Pro, and lower SP rates mean Plus pays for itself at the right GMV.',
    source: 'Shopify Plus Plan',
    sourceUrl: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan',
  },
  {
    icon: 'zap',
    title: '10x API Capacity',
    description: '400 requests/second vs 40 — critical for merchants with complex integrations, high catalog volumes, or headless architectures.',
    source: 'Shopify Dev Changelog',
    sourceUrl: 'https://shopify.dev/changelog/increased-admin-api-rate-limits-for-shopify-plus',
  },
  {
    icon: 'store',
    title: 'POS Pro Included',
    description: 'Save $89/location/month. For merchants with 5+ retail locations, POS Pro alone can justify the upgrade.',
    source: 'Shopify Plus Plan',
    sourceUrl: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan',
  },
  {
    icon: 'shopping-cart',
    title: 'Own the Checkout Experience',
    description: 'Checkout UI Extensions and Functions let merchants customize payment, delivery, and branding — impossible on Advanced.',
    source: 'Checkout UI Extensions Docs',
    sourceUrl: 'https://shopify.dev/docs/api/checkout-ui-extensions',
  },
  {
    icon: 'users',
    title: 'Unlimited Staff Accounts',
    description: 'No more hitting the 15-account ceiling. Scale your team without worrying about seat limits.',
    source: 'Shopify Plus Plan',
    sourceUrl: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan',
  },
  {
    icon: 'shield',
    title: 'Dedicated Success Manager',
    description: 'Priority 24/7 support with a dedicated Merchant Success Manager who knows your business.',
    source: 'Shopify Plus Plan',
    sourceUrl: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan',
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

export const PUBLIC_SOURCES = [
  { label: 'Shopify Plus Plan — Help Center', url: 'https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan', description: 'Official feature list, pricing, and plan details' },
  { label: 'Shopify Plus Homepage', url: 'https://www.shopify.com/plus', description: 'Public positioning, enterprise features, and merchant stories' },
  { label: 'Checkout UI Extensions — Dev Docs', url: 'https://shopify.dev/docs/api/checkout-ui-extensions', description: 'Developer documentation for checkout customization (Plus-only)' },
  { label: 'API Rate Limits — Dev Docs', url: 'https://shopify.dev/docs/api/usage/rate-limits', description: 'Rate limit details: Plus gets 10x standard limits' },
  { label: 'Shopify Editions (Changelog)', url: 'https://www.shopify.com/editions', description: 'Latest platform updates and new Plus features' },
  { label: 'B2B on Shopify — Help Center', url: 'https://help.shopify.com/en/manual/b2b', description: 'B2B features: company accounts, price lists, payment terms' },
  { label: 'Launchpad — Help Center', url: 'https://help.shopify.com/en/manual/promoting-marketing/create-marketing/launchpad', description: 'Scheduled events, flash sales, and automation' },
  { label: 'Shopify Plus Case Studies', url: 'https://www.shopify.com/plus/customers', description: 'Public success stories from Plus merchants worldwide' },
];

/**
 * Real public case studies from shopify.com/case-studies.
 * Each entry links to the full story.
 */
export const SUCCESS_STORIES = [
  {
    merchant: 'Peepers',
    scenario: 'Checkout Extensibility',
    benefit: '30% increase in conversions with custom checkout features including a free shipping motivator.',
    quote: 'Custom checkout let us remove friction and drive higher conversion at the moment that matters most.',
    url: 'https://www.shopify.com/uk/case-studies/peepers',
  },
  {
    merchant: 'Beard & Blade',
    scenario: 'B2B on Shopify',
    benefit: 'Doubled wholesale revenue after migrating from Adobe Commerce. Wholesale AOV of $296 (5x retail AOV).',
    quote: 'The self-serve wholesale portal eliminated manual order processing entirely.',
    url: 'https://www.shopify.com/case-studies/beard-and-blade',
  },
  {
    merchant: 'Happy Hippo',
    scenario: 'Shopify Audiences',
    benefit: '72% lower customer acquisition costs, 4.7x ROAS, and 86% new-to-brand customer rate.',
    quote: 'Shopify Audiences gave us targeting precision we couldn\'t get anywhere else.',
    url: 'https://www.shopify.com/uk/case-studies/happy-hippo',
  },
  {
    merchant: 'Schleich',
    scenario: 'Migrated to Plus',
    benefit: '31% reduction in checkout abandonment after migrating to Shopify Plus.',
    quote: 'The checkout experience became seamless — abandonment dropped almost immediately.',
    url: 'https://www.shopify.com/case-studies/schleich',
  },
  {
    merchant: 'SWATI',
    scenario: 'Migrated to Plus (EMEA)',
    benefit: '40% conversion boost, 45% revenue increase in key markets, 30% lower CAC.',
    quote: 'Employee onboarding went 10x faster and we saw immediate results across every metric.',
    url: 'https://www.shopify.com/uk/case-studies/swati',
  },
  {
    merchant: 'Kowtow',
    scenario: 'POS Pro & Omnichannel',
    benefit: '30% year-on-year revenue growth across retail stores with unified customer data.',
    quote: 'Unified online and in-store data transformed how we personalize the customer experience.',
    url: 'https://www.shopify.com/retail/kowtow',
  },
];

export const OUTCOME_MAP = {
  'lower-tco': {
    label: 'Lower Total Cost at Scale',
    icon: 'trending-down',
    description: 'Reduce transaction fees, unlock included POS Pro, and lower SP rates as GMV grows.',
    differentiators: ['Custom Payment Gateways'],
    benefits: ['Lower Total Cost of Ownership at Scale', 'POS Pro Included'],
    stories: ['Schleich', 'SWATI'],
    proofPoints: [
      'Plus transaction fees drop to 0.15-0.30% vs 0.5% on Advanced',
      'POS Pro included saves $89/location/month',
      '0% 3rd-party transaction fee when SP enabled (vs 0.5-0.6% on Advanced)',
    ],
  },
  'own-checkout': {
    label: 'Own the Checkout Experience',
    icon: 'shopping-cart',
    description: 'Customize payments, delivery, branding, and post-purchase with UI Extensions and Functions.',
    differentiators: ['Checkout Extensibility', 'Exclusive APIs'],
    benefits: ['Own the Checkout Experience'],
    stories: ['Peepers', 'Schleich'],
    proofPoints: [
      'Peepers saw 30% conversion increase with custom checkout',
      'Schleich reduced checkout abandonment by 31%',
      'Checkout UI Extensions, Functions, and Branding API are Plus-only',
    ],
  },
  'go-b2b': {
    label: 'Launch B2B / Wholesale',
    icon: 'building',
    description: 'Native wholesale with company accounts, custom price lists, and payment terms — no app needed.',
    differentiators: ['B2B on Shopify'],
    benefits: [],
    stories: ['Beard & Blade'],
    proofPoints: [
      'Beard & Blade doubled wholesale revenue after migrating to Plus',
      'Wholesale AOV of $296 (5x retail AOV)',
      'Company accounts, Net 30/60 payment terms, quantity rules — all native',
    ],
  },
  'expand-intl': {
    label: 'Expand Internationally',
    icon: 'globe',
    description: 'Launch up to 9 expansion stores for multi-brand or multi-region strategies under one org.',
    differentiators: ['Expansion Stores'],
    benefits: [],
    stories: ['SWATI'],
    proofPoints: [
      'Up to 9 expansion stores per organization',
      'SWATI saw 45% revenue increase in key markets after Plus migration',
      'Manage all storefronts from a single admin with organization-level analytics',
    ],
  },
  'acquire-cheaper': {
    label: 'Lower Customer Acquisition Cost',
    icon: 'target',
    description: 'Leverage Shopify network data for high-intent retargeting and lookalike audiences.',
    differentiators: ['Shopify Audiences'],
    benefits: [],
    stories: ['Happy Hippo'],
    proofPoints: [
      'Happy Hippo achieved 72% lower CAC with Shopify Audiences',
      '4.7x ROAS and 86% new-to-brand customer rate',
      'Proven to lower acquisition costs by up to 50%',
    ],
  },
  'scale-retail': {
    label: 'Scale Retail / POS Operations',
    icon: 'store',
    description: 'POS Pro included at every location, unified inventory, and omnichannel customer data.',
    differentiators: [],
    benefits: ['POS Pro Included'],
    stories: ['Kowtow'],
    proofPoints: [
      'POS Pro included (saves $89/location/month)',
      'Kowtow saw 30% YoY revenue growth with unified omnichannel data',
      'Up to 200 locations with unified inventory management',
    ],
  },
  'automate-ops': {
    label: 'Automate Campaigns & Operations',
    icon: 'zap',
    description: 'Schedule product launches, flash sales, and theme changes. Protect drops with bot protection.',
    differentiators: ['Launchpad', 'Bot Protection'],
    benefits: [],
    stories: [],
    proofPoints: [
      'Launchpad automates product drops, flash sales, and theme rollouts',
      'Bot protection blocks automated purchasing during high-demand events',
      'Unlimited staff accounts eliminate seat-limit bottlenecks for growing teams',
    ],
  },
  'unlock-integrations': {
    label: 'Unlock Advanced Integrations',
    icon: 'plug',
    description: '10x API rate limits, exclusive APIs, and custom gateway support for headless and complex stacks.',
    differentiators: ['Exclusive APIs', 'Custom Payment Gateways'],
    benefits: ['10x API Capacity'],
    stories: [],
    proofPoints: [
      '400 req/s vs 40 req/s API rate limits',
      'Checkout, Functions, Fulfillment, User, Gift Cards, and Multipass APIs',
      'Custom payment gateway app eligibility (Plus-only)',
    ],
  },
};

export const VERTICAL_PROFILES = {
  fashion: {
    label: 'Fashion & Apparel',
    commonOutcomes: ['own-checkout', 'acquire-cheaper', 'expand-intl', 'scale-retail'],
    talkingAngle: 'Brand experience, international expansion, and omnichannel retail are top priorities.',
  },
  'food-bev': {
    label: 'Food & Beverage',
    commonOutcomes: ['lower-tco', 'automate-ops', 'scale-retail'],
    talkingAngle: 'Subscription, flash sales, and multi-location retail drive growth.',
  },
  beauty: {
    label: 'Beauty & Cosmetics',
    commonOutcomes: ['own-checkout', 'acquire-cheaper', 'expand-intl'],
    talkingAngle: 'Checkout personalization, audience targeting, and international DTC expansion.',
  },
  electronics: {
    label: 'Electronics & Tech',
    commonOutcomes: ['lower-tco', 'unlock-integrations', 'automate-ops'],
    talkingAngle: 'Complex integrations, high-volume catalog management, and cost efficiency at scale.',
  },
  'home-garden': {
    label: 'Home & Garden',
    commonOutcomes: ['scale-retail', 'lower-tco', 'own-checkout'],
    talkingAngle: 'Omnichannel retail, cost savings at scale, and checkout optimization.',
  },
  sports: {
    label: 'Sports & Outdoors',
    commonOutcomes: ['automate-ops', 'acquire-cheaper', 'own-checkout'],
    talkingAngle: 'Product drops, audience building, and checkout conversion.',
  },
  'b2b-wholesale': {
    label: 'B2B / Wholesale',
    commonOutcomes: ['go-b2b', 'unlock-integrations', 'lower-tco'],
    talkingAngle: 'Native B2B capabilities, ERP integrations, and volume-based cost savings.',
  },
  other: {
    label: 'Other',
    commonOutcomes: ['lower-tco', 'own-checkout'],
    talkingAngle: 'Cost optimization and checkout customization as universal value drivers.',
  },
};

export const GMV_RANGES = [
  { value: 'under-1m', label: '< $1M' },
  { value: '1m-5m', label: '$1M – $5M' },
  { value: '5m-10m', label: '$5M – $10M' },
  { value: '10m-25m', label: '$10M – $25M' },
  { value: '25m-plus', label: '$25M+' },
];
