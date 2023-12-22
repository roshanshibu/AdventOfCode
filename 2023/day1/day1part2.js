var fs = require("fs");

const parseNumber = (c) => {
  let parsed = parseInt(c);
  let digitLookup = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  if (isNaN(parsed)) {
    return digitLookup[c];
  } else return parsed;
};

const puzzle = fs.readFileSync("day1.txt", { encoding: "utf8" });

let input = puzzle.split(/\r?\n/);
console.log(input);

let totalSum = 0;

for (line of input) {
  let gluedNumbers = {
    oneight: "oneeight",
    twone: "twoone",
    eightwo: "eighttwo",
  };
  for (key in gluedNumbers) {
    if (line.includes(key)) {
      let resolvedLine = line.replace(key, gluedNumbers[key]);

      console.log(line, resolvedLine);
      line = resolvedLine;
    }
  }
  let numbersInLine = line.match(
    /(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g
  );
  let firstNumber = parseNumber(numbersInLine[0]);
  let lastNumber = parseNumber(numbersInLine.slice(-1)[0]);
  let computedNumber = parseInt(`${firstNumber}${lastNumber}`);
  let debugData = `${line}, [${numbersInLine}], firstNumber: ${firstNumber}, lastNumber:${lastNumber} computedNumber:${computedNumber} \n`;

  console.log(debugData);
  fs.appendFile("day1part2debug.txt", debugData, function (err) {
    if (err) throw err;
  });

  totalSum += computedNumber;
}

console.log(totalSum);
// 54277
