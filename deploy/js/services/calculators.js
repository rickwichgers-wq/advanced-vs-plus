import { POS_PRO, EMEA_COUNTRIES, THIRD_PARTY_TRANSACTION_FEES, PLUS_VPF } from '../utils/data.js';

function getCountry(code) {
  return EMEA_COUNTRIES[code] || EMEA_COUNTRIES.de;
}

function posProCost(country) {
  const cur = country.currency.toLowerCase();
  return POS_PRO[cur] ?? POS_PRO.eur;
}

export function calculateUnified({
  country = 'de',
  spVolume = 0,
  thirdPartyVolume = 0,
  paypalVolume = 0,
  posVolume = 0,
  posLocations = 0,
  plusTerm = '1yr',
  intlPct = 0,
  b2bVolume = 0,
  numStores = 1,
  isNewMerchant = false,
  spEnabled = true,
  appSavingsMonthly = 0,
  customAdvSpRate = null,
  customPlusSpRate = null,
}) {
  const c = getCountry(country);
  const sp = c.sp;
  const posProPerLoc = posProCost(c);

  // --- SP rates: blend domestic / international ---
  const domesticPct = 1 - (intlPct / 100);
  const advSpRate = customAdvSpRate ?? (sp.advanced.domestic * domesticPct + sp.advanced.intl * (intlPct / 100));
  const plusSpRate = customPlusSpRate ?? (sp.plus.domestic * domesticPct + sp.plus.intl * (intlPct / 100));

  // --- 3P transaction fees ---
  const tpfTier = isNewMerchant ? THIRD_PARTY_TRANSACTION_FEES.new_2024 : THIRD_PARTY_TRANSACTION_FEES.existing;
  const advTpRate = spEnabled ? tpfTier.advanced.sp_enabled : tpfTier.advanced.sp_disabled;
  const plusTpRate = spEnabled ? tpfTier.plus.sp_enabled : tpfTier.plus.sp_disabled;
  const advPaypalRate = tpfTier.advanced.paypal;
  const plusPaypalRate = tpfTier.plus.paypal;

  // --- Plan costs ---
  const advPlanMonthly = c.advanced;
  const plusFixedMonthly = plusTerm === '3yr' ? c.plus_fixed_3yr : c.plus_fixed_1yr;

  const advStoreCost = numStores * advPlanMonthly;
  const plusExtraStores = Math.max(0, numStores - 10);
  const plusExtraStoreCost = plusExtraStores * plusFixedMonthly;

  // --- Volume for VPF ---
  const d2cVolume = spVolume + thirdPartyVolume + paypalVolume;
  const totalGMV = d2cVolume + posVolume + b2bVolume;

  const vpfConfig = plusTerm === '3yr' ? PLUS_VPF.term_3yr : PLUS_VPF.term_1yr;
  const vpfMonthly =
    ((d2cVolume / 12) * vpfConfig.d2c) +
    ((posVolume / 12) * vpfConfig.retail) +
    ((b2bVolume / 12) * vpfConfig.b2b);
  const plusPlanMonthly = Math.max(plusFixedMonthly, vpfMonthly);
  const vpfActive = vpfMonthly > plusFixedMonthly;

  // --- Annual plan costs ---
  const advPlanAnnual = advStoreCost * 12;
  const plusPlanAnnual = (plusPlanMonthly + plusExtraStoreCost) * 12;
  const planDelta = plusPlanAnnual - advPlanAnnual;

  // --- Expansion store savings ---
  const extraStores = Math.max(0, numStores - 1);
  const advExtraStoreCostAnnual = extraStores * advPlanMonthly * 12;
  const plusExtraStoreCostAnnual = plusExtraStores * plusFixedMonthly * 12;
  const storeSavings = advExtraStoreCostAnnual - plusExtraStoreCostAnnual;

  // --- SP processing fees ---
  const advSpFees = spVolume * advSpRate;
  const plusSpFees = spVolume * plusSpRate;
  const spSavings = advSpFees - plusSpFees;

  // --- 3P transaction fees (non-PayPal) ---
  const advTpFees = thirdPartyVolume * advTpRate;
  const plusTpFees = thirdPartyVolume * plusTpRate;
  const tpSavings = advTpFees - plusTpFees;

  // --- PayPal fees ---
  const advPaypalFees = paypalVolume * advPaypalRate;
  const plusPaypalFees = paypalVolume * plusPaypalRate;
  const paypalSavings = advPaypalFees - plusPaypalFees;

  // --- POS Pro ---
  const advPosCost = posLocations * posProPerLoc * 12;
  const plusPosCost = 0;
  const posSavings = advPosCost;

  // --- App savings ---
  const appSavingsAnnual = appSavingsMonthly * 12;

  // --- Total Cost of Ownership ---
  const advTCO = advPlanAnnual + advSpFees + advTpFees + advPaypalFees + advPosCost;
  const plusTCO = plusPlanAnnual + plusSpFees + plusTpFees + plusPaypalFees + plusPosCost;
  const netSavings = (advTCO - plusTCO) + appSavingsAnnual;

  // --- ROI & payback ---
  const totalSavings = spSavings + tpSavings + paypalSavings + posSavings + storeSavings + appSavingsAnnual;
  const safePlanDelta = Math.max(planDelta, 0);
  const paybackMonths = totalSavings > 0 && safePlanDelta > 0
    ? Math.ceil((safePlanDelta / totalSavings) * 12)
    : totalSavings > safePlanDelta ? 0 : Infinity;

  const vpfThresholdAnnual = (plusFixedMonthly / vpfConfig.d2c) * 12;

  return {
    country: c,
    totalGMV,
    posProPerLoc,

    advPlanAnnual,
    plusPlanAnnual,
    planDelta,
    vpfActive,
    vpfThresholdAnnual,

    advSpFees, plusSpFees, spSavings, advSpRate, plusSpRate,
    advTpFees, plusTpFees, tpSavings, advTpRate, plusTpRate,
    advPaypalFees, plusPaypalFees, paypalSavings, advPaypalRate, plusPaypalRate,
    advPosCost, plusPosCost, posSavings,
    storeSavings, numStores, advExtraStoreCostAnnual, plusExtraStoreCostAnnual,
    appSavingsAnnual,

    advTCO, plusTCO, netSavings,
    totalSavings,
    roi: plusPlanAnnual > 0 ? (netSavings / plusPlanAnnual) * 100 : 0,
    paybackMonths,
  };
}

export function fmtCurrency(amount, countryCode = 'de') {
  const c = getCountry(countryCode);
  return new Intl.NumberFormat(c.locale || 'en-US', {
    style: 'currency',
    currency: c.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function fmtPercent(rate) {
  return (rate * 100).toFixed(2) + '%';
}
