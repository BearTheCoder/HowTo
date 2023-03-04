function setup () {
  createCanvas(400, 400);
  background(0);
}

function draw () {
  background(0);
  drawCenterLine();
  drawLineToMouse();
  drawCenterPoint();
  const dotProduct = calculateDotProduct();
  document.getElementById("dotProductHeader").innerText = `Dot Product: ${dotProduct}`;
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

function calculateDotProduct () {
  // a · b = ax × bx + ay × by
  const vectorOriginX = 200;
  const vectorOriginY = 200;
  const horizonVectorX = 400;
  const horizonVectorY = 200;
  const xProduct = (horizonVectorX - vectorOriginX) * (mouseX - vectorOriginX);
  const yProduct = (horizonVectorY - vectorOriginY) * (mouseY - vectorOriginY);
  return xProduct + yProduct;
}