var fs = require("fs");

const puzzle = fs.readFileSync("day3.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);
let gearRatioSum = 0;

for (line in input) {
  let currentLine = input[line];
  for (c in currentLine) {
    if (currentLine[c] === "*") {
      console.log("---------------");
      console.log(`gear found in line ${line} at ${c}`);
      let numbersNearby = [];
      // 1. get row above
      if (line != 0) {
        let rowAbove = input[line - 1];
        let numbersInAboveRow = rowAbove.match(/\d+/g);
        console.log(`numbers in the row above: ${numbersInAboveRow}`);
        if (numbersInAboveRow) {
          for (number of numbersInAboveRow) {
            let startIndex = rowAbove.indexOf(number);
            let endIndex = startIndex + number.length - 1;
            if (startIndex != 0) startIndex -= 1;
            if (endIndex != rowAbove.length - 1) endIndex += 1;
            console.log(
              `${number} starts at ${startIndex} and ends at ${endIndex}`
            );
            if (startIndex <= c && endIndex >= c) {
              console.log(`${number} is adjacent to the gear!`);
              numbersNearby.push(number);
            }
            rowAbove = rowAbove.replace(number, ".".repeat(number.length));
          }
        }
      }

      // 2. on the same row
      let sameRow = input[line];
      numbersInSameRow = sameRow.match(/(\d+)\*(\d+)|(\d+)\*|(\*)\d+/g);
      console.log(`numbers in same row as gear:`, numbersInSameRow);
      if (numbersInSameRow) {
        for (match of numbersInSameRow) {
          let startIndex = sameRow.indexOf(match);
          let endIndex = startIndex + match.length - 1;
          if (startIndex <= c && endIndex >= c) {
            console.log(`${match} contains this gear!`);
            let numbersInMatch = match.match(/\d+/g);
            numbersNearby = numbersNearby.concat(numbersInMatch);
            sameRow = sameRow.replace(match, ".".repeat(match.length));
          }
        }
      }

      // 3. get row below
      if (line != input.length - 1) {
        let rowBelow = input[parseInt(line) + 1];
        let numbersInAboveBelow = rowBelow.match(/\d+/g);
        console.log(`numbers in the row below: ${numbersInAboveBelow}`);
        if (numbersInAboveBelow) {
          for (number of numbersInAboveBelow) {
            let startIndex = rowBelow.indexOf(number);
            let endIndex = startIndex + number.length - 1;
            if (startIndex != 0) startIndex -= 1;
            if (endIndex != rowBelow.length - 1) endIndex += 1;
            console.log(
              `${number} starts at ${startIndex} and ends at ${endIndex}`
            );
            if (startIndex <= c && endIndex >= c) {
              console.log(`${number} is adjacent to the gear!`);
              numbersNearby.push(number);
            }
            rowBelow = rowBelow.replace(number, ".".repeat(number.length));
          }
        }
      }

      console.log(`numbers adjacent to gear:`, numbersNearby);
      if (numbersNearby.length === 2) {
        console.log(
          `${parseInt(numbersNearby[0])}  and ${parseInt(
            numbersNearby[1]
          )} are nearby. Multiply and add to sum`
        );
        let gearRatio = parseInt(numbersNearby[0]) * parseInt(numbersNearby[1]);
        gearRatioSum += gearRatio;
      }
    }
  }
}

console.log(gearRatioSum);
// 82818007
