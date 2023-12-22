var fs = require("fs");

const puzzle = fs.readFileSync("day1.txt", { encoding: "utf8" });

function isNumber(i) {
  return i >= "0" && i <= "9";
}

let input = puzzle.split(/\r?\n/);
console.log(input);

let totalSum = 0;

input.map((line) => {
  let firstNumber = 0;
  let lastNumber = 0;
  for (char in line) {
    let c = line[char];
    if (isNumber(c)) {
      if (firstNumber === 0) {
        firstNumber = lastNumber = parseInt(c);
      } else lastNumber = parseInt(c);
    }
  }
  console.log(line, firstNumber, lastNumber, `${firstNumber}${lastNumber}`);
  totalSum += parseInt(`${firstNumber}${lastNumber}`);
});

console.log(totalSum);
//54390
