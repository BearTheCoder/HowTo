function setup () {
  createCanvas(400, 400);
  background(0);
  // randomPixelValues(); //p5js random()
  coordinateDependantRandom(); //
}

function randomPixelValues () {
  for (let x = 0; x < 400; x++) {
    for (let y = 0; y < 400; y++) {
      //Generate Random Number between 0-255
      const randNum = random(0, 255);
      push();
      noStroke();
      fill(randNum);
      square(x, y, 1);
      pop();
    }
  }
}

function coordinateDependantRandom () {
  for (let x = 0; x < 400; x++) {
    for (let y = 0; y < 400; y++) {
      //Generate Random Number between 0-255
      const randNum = getRandomAngle(x, y);
      push();
      noStroke();
      fill(randNum);
      square(x, y, 1);
      pop();
    }
  }
}

function getRandomAngle (x, y) {
  x += 100;
  y += 100;
  const h = 7140275233 + x * 374761393 + y * 668265263;
  const c = x * 374761393;
  const seedXn = ((x * 12) + 7140275233) % y;
  const m = 1012313;
  const result = ((h * seedXn) + c) % m;
  const normalizedNumber = result / m;
  return normalizedNumber * 255;
}