import { PLAN_PRICING, POS_PRO, REGIONS } from '../utils/data.js';

export function calculateFeeSavings({ gmv, region = 'na', billingCycle = 'annual' }) {
  const r = REGIONS[region] || REGIONS.na;
  const advFee = PLAN_PRICING.advanced.transaction_fee;
  const plusFeeAvg = (PLAN_PRICING.plus.transaction_fee_min + PLAN_PRICING.plus.transaction_fee_max) / 2;

  const advFeeTotal = gmv * advFee;
  const plusFeeTotal = gmv * plusFeeAvg;
  const feeSavings = advFeeTotal - plusFeeTotal;

  const advPlan = billingCycle === 'annual' ? PLAN_PRICING.advanced.annual_usd : PLAN_PRICING.advanced.monthly_usd;
  const plusPlan = billingCycle === 'annual' ? PLAN_PRICING.plus.annual_usd : PLAN_PRICING.plus.monthly_usd;
  const planDelta = (plusPlan - advPlan) * 12;

  const netSavings = (feeSavings * 12) - planDelta;

  return {
    region: r,
    gmv,
    advFeeAnnual: advFeeTotal * 12,
    plusFeeAnnual: plusFeeTotal * 12,
    feeSavingsAnnual: feeSavings * 12,
    planCostDelta: planDelta,
    netAnnualSavings: netSavings,
    breakEvenGMV: planDelta / ((advFee - plusFeeAvg) * 12),
  };
}

export function calculateTCO({ gmv, locations = 1, appsMonthly = 0, region = 'na', billingCycle = 'annual' }) {
  const advPlan = billingCycle === 'annual' ? PLAN_PRICING.advanced.annual_usd : PLAN_PRICING.advanced.monthly_usd;
  const plusPlan = billingCycle === 'annual' ? PLAN_PRICING.plus.annual_usd : PLAN_PRICING.plus.monthly_usd;

  const advFees = gmv * PLAN_PRICING.advanced.transaction_fee * 12;
  const plusFees = gmv * ((PLAN_PRICING.plus.transaction_fee_min + PLAN_PRICING.plus.transaction_fee_max) / 2) * 12;

  const advPOS = locations * POS_PRO.advanced.per_location_monthly * 12;
  const plusPOS = 0;

  const advTCO = (advPlan * 12) + advFees + advPOS + (appsMonthly * 12);
  const plusTCO = (plusPlan * 12) + plusFees + plusPOS + (appsMonthly * 12);

  return {
    advanced: { plan: advPlan * 12, fees: advFees, pos: advPOS, apps: appsMonthly * 12, total: advTCO },
    plus:     { plan: plusPlan * 12, fees: plusFees, pos: plusPOS, apps: appsMonthly * 12, total: plusTCO },
    delta: advTCO - plusTCO,
    plusCheaper: plusTCO < advTCO,
  };
}

export function calculatePOSSavings({ locations, region = 'na' }) {
  const monthlySavings = locations * POS_PRO.advanced.per_location_monthly;
  const annualSavings = monthlySavings * 12;

  const plusPremium = (PLAN_PRICING.plus.annual_usd - PLAN_PRICING.advanced.annual_usd) * 12;
  const netSavings = annualSavings - plusPremium;
  const breakEvenLocations = Math.ceil(plusPremium / (POS_PRO.advanced.per_location_monthly * 12));

  return {
    locations,
    monthlySavings,
    annualSavings,
    plusPremium,
    netSavings,
    breakEvenLocations,
    worthIt: netSavings > 0,
  };
}

export function calculateROI({ gmv, locations = 0, appsReplacedMonthly = 0, region = 'na' }) {
  const feeSavingsAnnual = gmv * (PLAN_PRICING.advanced.transaction_fee - ((PLAN_PRICING.plus.transaction_fee_min + PLAN_PRICING.plus.transaction_fee_max) / 2)) * 12;
  const posSavingsAnnual = locations * POS_PRO.advanced.per_location_monthly * 12;
  const appSavingsAnnual = appsReplacedMonthly * 12;
  const totalSavings = feeSavingsAnnual + posSavingsAnnual + appSavingsAnnual;

  const plusPremium = (PLAN_PRICING.plus.annual_usd - PLAN_PRICING.advanced.annual_usd) * 12;
  const roi = plusPremium > 0 ? ((totalSavings - plusPremium) / plusPremium) * 100 : 0;
  const paybackMonths = totalSavings > 0 ? Math.ceil((plusPremium / totalSavings) * 12) : Infinity;

  return {
    feeSavingsAnnual,
    posSavingsAnnual,
    appSavingsAnnual,
    totalSavings,
    plusPremium,
    roi,
    paybackMonths,
    positive: totalSavings > plusPremium,
  };
}

export function formatCurrency(amount, region = 'na') {
  const r = REGIONS[region] || REGIONS.na;
  return `${r.symbol}${Math.round(amount).toLocaleString()}`;
}
