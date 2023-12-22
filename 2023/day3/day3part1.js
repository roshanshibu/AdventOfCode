var fs = require("fs");

const puzzle = fs.readFileSync("day3.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);

let validNumbers = [];

for (line in input) {
  let currentLine = input[line];
  console.log(`\n${currentLine}`);
  let numberMatches = currentLine.match(/\d+/g);
  console.log(numberMatches);
  //for each number in the currentLine...
  for (i in numberMatches) {
    console.log("---");
    let currentNumber = numberMatches[i];
    let startIndex = currentLine.indexOf(currentNumber);
    let endIndex = startIndex + currentNumber.length - 1;
    console.log(`startIndex: ${startIndex} endIndex: ${endIndex}`);

    // 1. check if there are symbols in the line above in a favorable position
    if (line != 0) {
      let previousLine = input[line - 1];
      let _startIndex = startIndex == 0 ? startIndex : startIndex - 1;
      let _endIndex =
        endIndex == currentLine.length - 1 ? endIndex + 1 : endIndex + 2;
      let testArea = previousLine.substring(_startIndex, _endIndex);
      console.log(
        `previous line focus ${currentNumber}`,
        testArea,
        `_startIndex: ${_startIndex} _endIndex: ${_endIndex}`
      );
      let isSymbolPresent = !!testArea.match(/[^\w\d.]/g);
      if (isSymbolPresent) {
        validNumbers.push(currentNumber);
        console.log(
          `${currentNumber} is a valid number because there is an adjacent symbol on the row before!`
        );
        currentLine = currentLine.replace(
          currentNumber,
          ".".repeat(currentNumber.length)
        );
        continue;
      }
    }

    // 2. check if there are symbols adjacent to the number on the same line
    if (startIndex != 0) {
      let charBefore = currentLine[startIndex - 1];
      console.log(`character before ${currentNumber}: [${charBefore}]`);
      if (charBefore !== ".") {
        validNumbers.push(currentNumber);
        console.log(
          `${currentNumber} is a valid number because there is a ${charBefore} before it`
        );
        currentLine = currentLine.replace(
          currentNumber,
          ".".repeat(currentNumber.length)
        );
        continue;
      }
    }
    if (endIndex != currentLine.length - 1) {
      let charAfter = currentLine[endIndex + 1];
      console.log(`character after ${currentNumber}: [${charAfter}]`);
      if (charAfter !== ".") {
        validNumbers.push(currentNumber);
        console.log(
          `${currentNumber} is a valid number because there is a ${charAfter} after it`
        );
        currentLine = currentLine.replace(
          currentNumber,
          ".".repeat(currentNumber.length)
        );
        continue;
      }
    }

    // 3. check if there are symbols in the line below in a favorable position
    if (line != input.length - 1) {
      let nextLine = input[parseInt(line) + 1];
      let _startIndex = startIndex == 0 ? startIndex : startIndex - 1;
      let _endIndex =
        endIndex == currentLine.length - 1 ? endIndex + 1 : endIndex + 2;
      let testArea = nextLine.substring(_startIndex, _endIndex);
      console.log(
        `next line focus ${currentNumber}`,
        testArea,
        `_startIndex: ${_startIndex} _endIndex: ${_endIndex}`
      );
      let isSymbolPresent = !!testArea.match(/[^\w\d.]/g);
      if (isSymbolPresent) {
        validNumbers.push(currentNumber);
        console.log(
          `${currentNumber} is a valid number because there is an adjacent symbol on the row below!`
        );
        currentLine = currentLine.replace(
          currentNumber,
          ".".repeat(currentNumber.length)
        );
        continue;
      }
    }
    console.log("------");
  }
}

console.log(validNumbers);
const sum = validNumbers.reduce(
  (partialSum, a) => parseInt(partialSum) + parseInt(a),
  0
);
console.log(sum);
// 539637
