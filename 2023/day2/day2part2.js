var fs = require("fs");

const puzzle = fs.readFileSync("day2.txt", { encoding: "utf8" });

let input = puzzle.split(/\r?\n/);
console.log(input);

let powerSum = 0;

for (game of input) {
  console.log(game);
  let gameId = parseInt(game.substring(4, game.indexOf(":")));
  subsets = game.substring(game.indexOf(":") + 2).split("; ");

  let debugData = `${game}\n\tgameId: ${gameId}\n${subsets.map(
    (s) => "\t\t[" + s + "]\n"
  )}`;

  let minBoxes = { red: 0, green: 0, blue: 0 };
  for (subset of subsets) {
    let boxes = subset.split(", ");
    for (box of boxes) {
      let color = box.replace(/\d/g, "").trim();
      let number = parseInt(box.match(/\d/g).join(""), 10);
      //   console.log(`${box}|${color}|${number}`);
      if (number > minBoxes[color]) {
        minBoxes[color] = number;
      }
    }
  }
  let gamePower = minBoxes.red * minBoxes.green * minBoxes.blue;
  powerSum += gamePower;
  debugData += `\n\t${JSON.stringify(minBoxes)}\n\tpower: ${gamePower}\n\n`;
  fs.appendFile("day2part1debug.txt", debugData, function (err) {
    if (err) throw err;
  });
  console.log(debugData);
}

console.log(powerSum);
//69929
