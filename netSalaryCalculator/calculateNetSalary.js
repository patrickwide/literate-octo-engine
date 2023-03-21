// Calculates the taxable salary by adding basic salary and benefits
function calculateTaxableSalary(basicSalary, benefits) {
  return basicSalary + benefits;
}

// Calculates the tax amount based on the taxable salary using tax slabs
function calculateTaxAmount(taxableSalary) {
  // Define tax slabs as an array of objects, each with a limit and rate
  const taxSlabs = [
    { limit: 24000, rate: 10 },
    { limit: 32333, rate: 25 },
    { limit: Infinity, rate: 30 },
  ];

  let taxRate;
  let prevLimit = 0;

  // Loop through the tax slabs to find the applicable tax rate based on taxableSalary
  for (let i = 0; i < taxSlabs.length; i++) {
    const slab = taxSlabs[i];
    if (taxableSalary >= prevLimit && taxableSalary <= slab.limit) {
      taxRate = slab.rate;
    } else {
      prevLimit = slab.limit + 1;
    }
  }

  // Calculate the tax amount based on the tax rate and taxable salary
  return taxableSalary * (taxRate / 100);
}

// This function calculates the NHIF deduction based on the taxable salary
function calculateNHIFDeduction(taxableSalary) {
  // We define an array of objects containing the NHIF rates for different salary limits
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

  // We initialize the previous limit to 0
  let prevLimit = 0;

  // We loop through the NHIF rates array to find the correct slab for the taxable salary
  for (let i = 0; i < nhifRates.length; i++) {
    const slab = nhifRates[i];

    // If the taxable salary is between the previous limit and the current limit, we return the deduction for that slab
    if (taxableSalary >= prevLimit && taxableSalary <= slab.limit) {
      return slab.deduction;

      // Otherwise, we update the previous limit to the current limit plus 1
    } else {
      prevLimit = slab.limit + 1;
    }
  }
}

// This function calculates the NSSF contribution based on the taxable salary
function calculateNSSFContribution(taxableSalary) {
  // We define the maximum NSSF limit and the NSSF rate
  const nssfMaxLimit = 18000;
  const nssfRate = 0.06;

  // If the taxable salary is greater than or equal to the maximum NSSF limit, we return the maximum limit multiplied by the rate
  if (taxableSalary >= nssfMaxLimit) {
    return nssfMaxLimit * nssfRate;

    // Otherwise, we return the taxable salary multiplied by the rate
  } else {
    return taxableSalary * nssfRate;
  }
}

// This function calculates the net salary based on the basic salary and benefits
function calculateNetSalary(basicSalary, benefits) {
  // First, we calculate the taxable salary by adding the basic salary and benefits
  const taxableSalary = calculateTaxableSalary(basicSalary, benefits);

  // Then we calculate the tax amount based on the taxable salary
  const taxAmount = calculateTaxAmount(taxableSalary);

  // We also calculate the NHIF deduction based on the taxable salary
  const nhifDeduction = calculateNHIFDeduction(taxableSalary);

  // Finally, we calculate the NSSF contribution based on the taxable salary
  const nssfAmount = calculateNSSFContribution(taxableSalary);

  // We add up all the deductions to get the total deductions
  const totalDeductions = taxAmount + nhifDeduction + nssfAmount;

  // And we subtract the total deductions from the taxable salary to get the net salary
  const netSalary = taxableSalary - totalDeductions;

  // We return an object containing all the calculated values, with 2 decimal places
  return {
    taxAmount: taxAmount.toFixed(2),
    nhifDeduction: nhifDeduction.toFixed(2),
    nssfAmount: nssfAmount.toFixed(2),
    totalDeductions: totalDeductions.toFixed(2),
    netSalary: netSalary.toFixed(2),
  };
}

// We export the calculateNetSalary function to make it available for other modules to use
module.exports = calculateNetSalary;
