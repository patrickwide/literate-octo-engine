function calculateNetSalary(basicSalary, benefits) {
  const taxSlabs = [
    { limit: 24000, rate: 10 },
    { limit: 32333, rate: 25 },
    { limit: Infinity, rate: 30 },
  ];

  const personalRelief = 2400;
  const nhifRates = [
    { limit: 5999, deduction: 150 },
    { limit: 7999, deduction: 300 },
    { limit: 11999, deduction: 400 },
    { limit: 14999, deduction: 500 },
    { limit: 19999, deduction: 600 },
    { limit: 24999, deduction: 750 },
    { limit: 29999, deduction: 850 },
    { limit: 34999, deduction: 900 },
    { limit: 39999, deduction: 950 },
    { limit: 44999, deduction: 1000 },
    { limit: 49999, deduction: 1100 },
    { limit: 59999, deduction: 1200 },
    { limit: 69999, deduction: 1300 },
    { limit: 79999, deduction: 1400 },
    { limit: 89999, deduction: 1500 },
    { limit: 99999, deduction: 1600 },
    { limit: Infinity, deduction: 1700 },
  ];

  const nssfLimitTier1 = 6000;
  const nssfLimitTier2 = 18000;
  const nssfRate = 0.06;

  const taxableSalary = basicSalary + benefits - personalRelief;

  let taxAmount = 0;
  let taxableAmount = taxableSalary;
  let nssfAmount = 0;

  for (const slab of taxSlabs) {
    const taxableInSlab = Math.min(slab.limit, taxableAmount);
    taxAmount += (taxableInSlab * slab.rate) / 100;
    taxableAmount -= taxableInSlab;
    if (taxableAmount <= 0) break;
  }

  const nhifDeduction = nhifRates.find(
    (rate) => taxableSalary <= rate.limit
  ).deduction;
  const nssfTier1Contribution =
    Math.min(nssfLimitTier1, taxableSalary) * nssfRate;
  const nssfTier2Contribution =
    Math.min(nssfLimitTier2 - nssfLimitTier1, taxableSalary - nssfLimitTier1) *
    nssfRate;
  nssfAmount = nssfTier1Contribution + nssfTier2Contribution;

  const totalDeductions = taxAmount + nhifDeduction + nssfAmount;
  const netSalary = basicSalary + benefits - totalDeductions;

  return {
    taxAmount: taxAmount.toFixed(2),
    nhifDeduction: nhifDeduction.toFixed(2),
    nssfAmount: nssfAmount.toFixed(2),
    totalDeductions: totalDeductions.toFixed(2),
    netSalary: netSalary.toFixed(2),
  };
}

module.exports = calculateNetSalary;
