const { match } = require("assert");
var fs = require("fs");

const puzzle = fs.readFileSync("day4.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);

let scCount = Array(input.length).fill(1);
let cardCount = 0;
for (c in input) {
  while (scCount[Number(c)] > 0) {
    cardCount += 1;
    let myNumbers = input[c].substring(8, input[c].indexOf("|")).match(/\d+/g);
    let winningNumbers = input[c]
      .substring(input[c].indexOf("|"))
      .match(/\d+/g);
    let matches = myNumbers.reduce((a, c) => a + winningNumbers.includes(c), 0);
    for (let i = 1; i <= matches; i++) {
      if (Number(c) + i < scCount.length) scCount[Number(c) + i] += 1;
    }
    scCount[Number(c)] -= 1;
  }
}

console.log(cardCount);
// 9997537
