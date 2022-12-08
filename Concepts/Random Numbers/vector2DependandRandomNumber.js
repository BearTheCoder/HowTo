// https://en.wikipedia.org/wiki/Linear_congruential_generator
// Equation Xnp1 = ((a * Xn) + c) mod m

let results = [];
let result = null;

const a = 312344;
const c = 51223121;
const seedXn = 7123123;
const m = 1012313;

while (!results.includes(result)) { //6
  if (result === null) {
    result = (((a * seedXn) + c) % m);
  }
  else {
    results.push(result);
    result = ((a * result) + c) % m;
  }
}

console.log(`Array length: ${results.length}`);

let gridX = 100;
let gridY = 100;
let grid = [];

for (let i = 0; i < gridX; i++) {
  grid[i] = [];
}

let newResults = [];
for (let x = 0, i = 0; x < gridX; x++) {
  for (let y = 0; y < gridY; y++, i++) {
    let result2 = ((results[i] % (x + y)) * y);
    if (!newResults.includes(result2)) {
      grid[x][y] = result2;
    }
    else {
      console.log('Duplicate value!');
      grid[x][y] = result2;
    }
    newResults.push(result2);
  }
}