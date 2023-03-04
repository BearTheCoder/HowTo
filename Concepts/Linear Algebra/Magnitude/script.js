function setup () {
  createCanvas(400, 400);
  background(0);
}

function draw () {
  background(0);
  drawCenterLine();
  drawLineToMouse();
  drawCenterPoint();
  calculateMagnitude(mouseX - 200, mouseY - 200);
}

function drawCenterLine () {
  push();
  stroke(color(255, 0, 0));
  strokeWeight(.5);
  line(0, 200, 400, 200);
  pop();
}

function drawCenterPoint () {
  push();
  fill(color(255, 0, 0));
  noStroke();
  circle(200, 200, 20);
  pop();
}

function drawLineToMouse () {
  push();
  stroke(255);
  strokeWeight(.7);
  line(200, 200, mouseX, mouseY);
  pop();
}

function calculateMagnitude (x, y) {
  //|v| =√(x2 + y2)
  const magnitude = Math.sqrt((x ** 2) + (y ** 2));
  document.getElementById("magnitudeHeader").innerText = `Magnitude of white vector: ${magnitude}`;
}