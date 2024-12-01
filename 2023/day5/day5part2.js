console.log("start", new Date());
// ---------------------------------------------
var fs = require("fs");

const puzzle = fs.readFileSync("day5-test.txt", { encoding: "utf8" });
// const puzzle = fs.readFileSync("day5.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);

// get initial seed list
let seedInfo = input[0]
  .substring(5)
  .match(/\d+/g)
  .map((e) => parseInt(e));

// create an object of maps
let maps = {};
let currentMap = [];
let currentMapName = "";
for (row in input) {
  if (input[row].indexOf("map:") > 0) {
    maps[currentMapName] = currentMap;
    currentMap = [];
    currentMapName = input[row];
  } else if (input[row] !== "") {
    currentMap.push(input[row]);
  }
}
maps[currentMapName] = currentMap;

const getDestinationRanges = (sourceStart, sourceRange, mapName) => {
  //get correct map from mapName
  let map = [];
  for (key of Object.keys(maps)) {
    if (key.indexOf(mapName) !== -1) {
      map = maps[key];
      break;
    }
  }

  // the source numbers will start with sourceStart and end at (sourceStart + sourceRange)
  // we need to find every possible destination maps between these two numbers
  // lets get a sorted array of all sourceStarts from the map for this purpose
  let sourceStarts = [];
  for (row of map) {
    sourceStarts.push(row.match(/\d+/g).map((e) => parseInt(e))[1]);
  }
  sourceStarts.sort((a, b) => a - b);
  //
};

getDestinationRanges(seedInfo[0], seedInfo[1], "seed-to-soil");
// ---------------------------------------------
console.log("end", new Date());
