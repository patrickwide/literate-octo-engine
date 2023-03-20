const readline = require('readline');
const calculateNetSalary = require("./calculateNetSalary");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your basic salary: ", (basicSalary) => {
  rl.question("Enter your benefits: ", (benefits) => {
    const netSalary = calculateNetSalary(Number(basicSalary), Number(benefits));
    console.log(`
    Tax Amount: ${netSalary.taxAmount}
    NHIF Deduction: ${netSalary.nhifDeduction}
    NSSF Amount: ${netSalary.nssfAmount}
    Total Deductions: ${netSalary.totalDeductions}
    Net Salary: ${netSalary.netSalary}
    `);
    rl.close();
  });
});
