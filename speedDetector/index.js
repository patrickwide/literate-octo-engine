const readline = require("readline");
const checkSpeed = require("./checkSpeed");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the car's speed: ", (speed) => {
  console.log(checkSpeed(speed));
  rl.close();
});
