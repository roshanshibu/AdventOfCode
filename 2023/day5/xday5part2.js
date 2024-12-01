console.log("start", new Date());
var fs = require("fs");

// const puzzle = fs.readFileSync("day5-test.txt", { encoding: "utf8" });
const puzzle = fs.readFileSync("day5.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);

// console.log(input)

// get inital seed list
let seedInfo = input[0]
  .substring(5)
  .match(/\d+/g)
  .map((e) => parseInt(e));

// create an object of maps
let maps = {};
let currentMap = [];
let currentMapName = "";
for (row in input) {
  //   console.log(input[row], input[row].indexOf("map:"));
  if (input[row].indexOf("map:") > 0) {
    maps[currentMapName] = currentMap;
    currentMap = [];
    currentMapName = input[row];
  } else if (input[row] !== "") {
    currentMap.push(input[row]);
  }
}
maps[currentMapName] = currentMap;

// console.log(maps);

const getSourceValueFromDestination = (sourceInput, mapName, debug = false) => {
  // given x as source, to compute its destination value,
  // we need to know which mapping to use. Provide this in the function
  let map = [];
  for (key of Object.keys(maps)) {
    if (key.indexOf(mapName) !== -1) {
      map = maps[key];
      break;
    }
  }
  // now in the mapping we need to find which one to use
  // to do this we must find the first source map that is greater than x
  // lets get an int array of all destination starts for this purpose
  let sourceStarts = [];
  for (row of map) {
    sourceStarts.push(row.match(/\d+/g).map((e) => parseInt(e))[0]);
  }
  sourceStarts.sort((a, b) => a - b);
  if (debug) console.log(sourceStarts);
  let useSourceStart = sourceStarts[0];

  for (el in sourceStarts) {
    dS = sourceStarts[el];
    if (sourceInput >= dS) {
      useSourceStart = dS;
      if (debug) console.log(useSourceStart, dS);
    } else break;
  }
  //   console.log("useSourceStart", useSourceStart);
  // now we can fetch the row from the map which uses our useSourceStart
  for (row of map) {
    numberRow = row.match(/\d+/g).map((e) => parseInt(e));
    if (numberRow[0] === useSourceStart) {
      if (debug) console.log("matched:", numberRow);
      let destinationValue = null;
      //let us check here if the caller's sourceInput has any valid mappings
      if (
        sourceInput < useSourceStart ||
        sourceInput > numberRow[0] + numberRow[2]
      ) {
        destinationValue = sourceInput;
      } else {
        let difference = sourceInput - numberRow[0];
        destinationValue = numberRow[1] + difference;
      }
      return destinationValue;
    }
  }
};

// there is a zero in the location mapping list
// this means that we should start at zero and count up till we find a seed that may be present in the seed list
let seedFound = false;
let searchLocation = 1000000;
let endSearch = 6472065;
while (!seedFound && searchLocation <= endSearch) {
  if (searchLocation % 100000 == 0) {
    console.log(new Date(), searchLocation);
  }
  let humidity = getSourceValueFromDestination(
    searchLocation,
    "humidity-to-location"
  );
  let temperature = getSourceValueFromDestination(
    humidity,
    "temperature-to-humidity"
  );
  let light = getSourceValueFromDestination(
    temperature,
    "light-to-temperature"
  );
  let water = getSourceValueFromDestination(light, "water-to-light");
  let fertilizer = getSourceValueFromDestination(water, "fertilizer-to-water");
  let soil = getSourceValueFromDestination(fertilizer, "soil-to-fertilizer");
  let seed = getSourceValueFromDestination(soil, "seed-to-soil");
  // console.log(
  //   `searchLocation ${searchLocation} -> humidity ${humidity} -> temperature ${temperature} -> light ${light} -> water ${water} -> fertilizer ${fertilizer} -> soil ${soil} -> seed ${seed}`
  // );

  //check if seed is a valid seed
  let seedStart;
  let range;
  for (i in seedInfo) {
    if (i % 2 == 0) {
      seedStart = seedInfo[i];
    } else {
      range = seedInfo[i];
      if (seed >= seedStart && seed <= seedStart + range - 1) {
        console.log(
          `${seed} is a valid seed. Location: ${searchLocation}. Start: ${seedStart}, Range: ${range}`
        );
        seedFound = true;
        break;
      }
    }
  }
  searchLocation += 1;
}

console.log("stop", new Date());
// 6472061 too high
// 1000000 too low
// 3000000
