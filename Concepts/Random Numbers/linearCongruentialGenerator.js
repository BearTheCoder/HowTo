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
    result = ((a * seedXn) + c) % m;
  }
  else {
    results.push(result);
    result = ((a * result) + c) % m;
  }
}

console.log(`Array length: ${results.length}`);
