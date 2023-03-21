function calculateTaxableSalary(basicSalary, benefits) {
  return basicSalary + benefits;
}

function calculateTaxAmount(taxableSalary) {
  const taxSlabs = [
    { limit: 24000, rate: 10 },
    { limit: 32333, rate: 25 },
    { limit: Infinity, rate: 30 },
  ];

  let taxRate;
  let prevLimit = 0;
  for (let i = 0; i < taxSlabs.length; i++) {
    const slab = taxSlabs[i];
    if (taxableSalary >= prevLimit && taxableSalary <= slab.limit) {
      taxRate = slab.rate;
    } else {
      prevLimit = slab.limit + 1;
    }
  }

  return taxableSalary * (taxRate / 100);
}

function calculateNHIFDeduction(taxableSalary) {
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

  let prevLimit = 0;
  for (let i = 0; i < nhifRates.length; i++) {
    const slab = nhifRates[i];
    if (taxableSalary >= prevLimit && taxableSalary <= slab.limit) {
      return slab.deduction;
    } else {
      prevLimit = slab.limit + 1;
    }
  }
}

function calculateNSSFContribution(taxableSalary) {
  const nssfMaxLimit = 18000;
  const nssfRate = 0.06;
  if (taxableSalary >= nssfMaxLimit) {
    return nssfMaxLimit * nssfRate;
  } else {
    return taxableSalary * nssfRate;
  }
}

function calculateNetSalary(basicSalary, benefits) {
  const taxableSalary = calculateTaxableSalary(basicSalary, benefits);
  const taxAmount = calculateTaxAmount(taxableSalary);
  const nhifDeduction = calculateNHIFDeduction(taxableSalary);
  const nssfAmount = calculateNSSFContribution(taxableSalary);

  const totalDeductions = taxAmount + nhifDeduction + nssfAmount;
  const netSalary = taxableSalary - totalDeductions;

  return {
    taxAmount: taxAmount.toFixed(2),
    nhifDeduction: nhifDeduction.toFixed(2),
    nssfAmount: nssfAmount.toFixed(2),
    totalDeductions: totalDeductions.toFixed(2),
    netSalary: netSalary.toFixed(2),
  };
}

module.exports = calculateNetSalary;
