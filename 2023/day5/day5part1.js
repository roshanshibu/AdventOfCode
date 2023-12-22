var fs = require("fs");

const puzzle = fs.readFileSync("day5.txt", { encoding: "utf8" });
let input = puzzle.split(/\r?\n/);

// console.log(input)

// get inital seed list
let seeds = input[0]
  .substring(5)
  .match(/\d+/g)
  .map((e) => parseInt(e));
console.log("seeds:", seeds);

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
const getDestinationValue = (sourceInput, mapName, debug = false) => {
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
    sourceStarts.push(row.match(/\d+/g).map((e) => parseInt(e))[1]);
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
    if (numberRow[1] === useSourceStart) {
      if (debug) console.log("matched:", numberRow);
      let destinationValue = null;
      //let us check here if the caller's sourceInput has any valid mappings
      if (
        sourceInput < useSourceStart ||
        sourceInput > numberRow[1] + numberRow[2]
      ) {
        destinationValue = sourceInput;
      } else {
        let difference = sourceInput - numberRow[1];
        destinationValue = numberRow[0] + difference;
      }
      return destinationValue;
    }
  }
};
let locationList = [];

for (seed of seeds) {
  let soil = getDestinationValue(seed, "seed-to-soil");
  let fertilizer = getDestinationValue(soil, "soil-to-fertilizer");
  let water = getDestinationValue(fertilizer, "fertilizer-to-water");
  let light = getDestinationValue(water, "water-to-light");
  let temperature = getDestinationValue(light, "light-to-temperature");
  let humidity = getDestinationValue(temperature, "temperature-to-humidity");
  let location = getDestinationValue(humidity, "humidity-to-location");
  locationList.push(location);
  console.log(
    `seed ${seed} -> soil ${soil} -> fertilizer ${fertilizer} -> water ${water} -> light ${light} -> temperature ${temperature} -> humidity ${humidity} -> location ${location}`
  );
}

locationList.sort((a, b) => a - b);
console.log(locationList[0]);
//331445006
