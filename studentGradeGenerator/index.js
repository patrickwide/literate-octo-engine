const readline = require("readline");
const getGrade = require("./getGrade");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the student's mark (between 0 and 100): ", (mark) => {
  console.log(getGrade(mark));
  rl.close();
});
