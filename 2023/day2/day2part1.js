var fs = require("fs");

const puzzle = fs.readFileSync("day2.txt", { encoding: "utf8" });

let input = puzzle.split(/\r?\n/);
console.log(input);

let maxBoxes = { red: 12, green: 13, blue: 14 };
let possibleIdSum = 0;

for (game of input) {
  console.log(game);
  let gameId = parseInt(game.substring(4, game.indexOf(":")));
  subsets = game.substring(game.indexOf(":") + 2).split("; ");
  let isImpossible = false;

  let debugData = `${game}\n\tgameId: ${gameId}\n${subsets.map(
    (s) => "\t\t[" + s + "]\n"
  )}`;

  for (subset of subsets) {
    let boxes = subset.split(", ");
    for (box of boxes) {
      let color = box.replace(/\d/g, "").trim();
      let number = parseInt(box.match(/\d/g).join(""), 10);
      //   console.log(`${box}|${color}|${number}`);
      if (number > maxBoxes[color]) {
        isImpossible = true;
        debugData += `******\tGame ${gameId} is impossible - ${number} ${color} boxes\t******\n`;
      }
    }
  }
  fs.appendFile("day2part1debug.txt", debugData, function (err) {
    if (err) throw err;
  });
  console.log(debugData);
  if (!isImpossible) {
    possibleIdSum += gameId;
  }
}

console.log(possibleIdSum);
//2164
