let maxDP = 0;
resolution = 10;

function setup () {
  createCanvas(400, 400);

}

function draw () {
  maxDP = calculateMaxDP();
  for (let x = 0; x < 400; x += resolution) {
    for (let y = 0; y < 400; y += resolution) {
      const normalizedDP = calculateDotProduct(x, y, maxDP);
      drawPixel(normalizedDP, x, y);
    }
  }
  drawLineToMouse();
  drawCenterPoint();
}

function drawCenterPoint () {
  push();
  fill(color(255, 0, 0));
  noStroke();
  circle(200, 200, 10);
  pop();
}

function drawLineToMouse () {
  push();
  stroke(color(0, 255, 0));
  strokeWeight(.7);
  line(200, 200, mouseX, mouseY);
  pop();
}

function calculateMaxDP () {
  const vectorOriginX = 200;
  const vectorOriginY = 200;
  const xProduct = (mouseX - vectorOriginX) * (mouseX - vectorOriginX);
  const yProduct = (mouseY - vectorOriginY) * (mouseY - vectorOriginY);
  return xProduct + yProduct;
}

function calculateDotProduct (x, y, maxDP) {
  // a · b = ax × bx + ay × by
  const vectorOriginX = 200;
  const vectorOriginY = 200;
  const xProduct = (x - vectorOriginX) * (mouseX - vectorOriginX);
  const yProduct = (y - vectorOriginY) * (mouseY - vectorOriginY);
  return (xProduct + yProduct) / maxDP;
}

function drawPixel (normalizedDP, x, y) {
  const normalVal = ((normalizedDP + 1) / 2) * 255;
  push();
  fill(normalVal);
  noStroke();
  square(x, y, resolution);
  pop();
}