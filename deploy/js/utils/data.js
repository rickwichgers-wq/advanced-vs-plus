export const PLAN_PRICING = {
  advanced: { monthly_usd: 399, annual_usd: 299, transaction_fee: 0.005 },
  plus:     { monthly_usd: 2300, annual_usd: 1850, transaction_fee_min: 0.0015, transaction_fee_max: 0.003 },
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
  advanced: { per_location_monthly: 89 },
  plus:     { per_location_monthly: 0, note: 'Included' },
};

export const LOCATIONS = {
  advanced: { max: 'Limited' },
  plus:     { max: 200 },
};

export const HARD_DIFFERENTIATORS = [
  'Checkout extensibility (Checkout UI Extensions, Functions, Branding API)',
  'B2B on Shopify (company accounts, price lists, payment terms)',
  'Shopify Audiences (customer acquisition)',
  'Expansion Stores (multi-brand / multi-region)',
  'Bot Protection (Checkout)',
  'Launchpad (scheduled sales events)',
  'Exclusive APIs (Checkout, Functions, Fulfillment)',
  'Custom payment gateway apps',
];

export const REGIONS = {
  na:   { label: 'North America', currency: 'USD', symbol: '$' },
  emea: { label: 'EMEA', currency: 'EUR', symbol: '€' },
  apac: { label: 'APAC', currency: 'AUD', symbol: 'A$' },
  uk:   { label: 'UK', currency: 'GBP', symbol: '£' },
};

export const FEATURE_CATEGORIES = [
  {
    id: 'overview',
    label: 'Overview',
    features: [
      { name: 'Monthly price', advanced: '$399/mo ($299 annual)', plus: '$2,300/mo ($1,850 annual)' },
      { name: 'Transaction fee (Shopify Payments)', advanced: '0.5%', plus: '0.15–0.30%' },
      { name: 'Staff accounts', advanced: '15', plus: 'Unlimited' },
      { name: 'Locations', advanced: 'Limited', plus: 'Up to 200' },
      { name: 'API rate limit', advanced: '40 req/s', plus: '400 req/s' },
    ]
  },
  {
    id: 'checkout',
    label: 'Checkout & Extensibility',
    features: [
      { name: 'Checkout UI Extensions', advanced: false, plus: true },
      { name: 'Checkout Functions', advanced: false, plus: true },
      { name: 'Checkout Branding API', advanced: false, plus: true },
      { name: 'Payment customizations', advanced: false, plus: true },
      { name: 'Delivery customizations', advanced: false, plus: true },
      { name: 'Custom pixel tracking', advanced: 'Limited', plus: 'Full' },
    ]
  },
  {
    id: 'b2b',
    label: 'B2B',
    features: [
      { name: 'B2B on Shopify', advanced: false, plus: true },
      { name: 'Company accounts', advanced: false, plus: true },
      { name: 'Custom price lists', advanced: false, plus: true },
      { name: 'Payment terms (Net 30/60)', advanced: false, plus: true },
      { name: 'Quantity rules & volume pricing', advanced: false, plus: true },
    ]
  },
  {
    id: 'api',
    label: 'API & Developer',
    features: [
      { name: 'API rate limit', advanced: '40 req/s', plus: '400 req/s' },
      { name: 'Custom gateway apps', advanced: false, plus: true },
      { name: 'Checkout API access', advanced: false, plus: true },
      { name: 'Functions API', advanced: false, plus: true },
      { name: 'Fulfillment Orders API', advanced: 'Limited', plus: 'Full' },
    ]
  },
  {
    id: 'support',
    label: 'Support & Operations',
    features: [
      { name: 'Staff accounts', advanced: '15', plus: 'Unlimited' },
      { name: 'Support tier', advanced: 'Standard', plus: 'Priority (Merchant Success Manager)' },
      { name: 'Locations', advanced: 'Limited', plus: 'Up to 200' },
      { name: 'POS Pro per location', advanced: '$89/mo', plus: 'Included' },
    ]
  },
  {
    id: 'commerce',
    label: 'Commerce Features',
    features: [
      { name: 'Shopify Audiences', advanced: false, plus: true },
      { name: 'Launchpad', advanced: false, plus: true },
      { name: 'Expansion Stores', advanced: false, plus: true },
      { name: 'Bot Protection (checkout)', advanced: false, plus: true },
      { name: 'Organization-level analytics', advanced: false, plus: true },
    ]
  },
];
