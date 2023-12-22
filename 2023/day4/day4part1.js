var fs = require("fs");

const puzzle = fs.readFileSync("day4.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);

let pointsSum = 0;

for (card of input) {
  let myNumbers = card.substring(8, card.indexOf("|")).match(/\d+/g);
  let winningNumbers = card.substring(card.indexOf("|")).match(/\d+/g);
  let matches = myNumbers.reduce((a, c) => a + winningNumbers.includes(c), 0);
  let points = 0;
  if (matches > 0) points = Math.pow(2, matches - 1);
  pointsSum += points;
}

console.log(pointsSum);
// 26218
