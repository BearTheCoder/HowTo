function setup () {
  createCanvas(400, 400);
  background(0);
}

function draw () {
  background(0);
  const returnedRadians = determineAngle();
  const angleInRadians = getTotalRadians(returnedRadians);
  drawAngleArc(angleInRadians);
  drawCenterLine();
  drawLineToMouse();
  drawCenterPoint();
}

function determineAngle () {
  //θ = aCos[(a · b) / (|a| |b|) ];
  const dotProduct = calculateDotProduct();
  const aMagnitude = calculateMagnitude(200, 0);
  const bMagnitude = calculateMagnitude(mouseX - 200, mouseY - 200);
  const magnitudeProduct = aMagnitude * bMagnitude;
  const angleInRadians = Math.acos(dotProduct / magnitudeProduct);
  const angleInDegrees = convertRadiansToDegrees(angleInRadians);
  document.getElementById("angleHeader").innerText = `Angle between both vectors: ${angleInDegrees}`;
  return angleInRadians;
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

function calculateMagnitude (x, y) {
  //|v| =√(x2 + y2)
  return Math.sqrt((x ** 2) + (y ** 2));
}

function convertRadiansToDegrees (angleInRadians) {
  let radiansTotal = angleInRadians;
  if (mouseY > 200) {
    radiansTotal = Math.PI + (Math.PI - angleInRadians);
  }
  return radiansTotal * 57.2958;
}

function getTotalRadians (angleInRadians) {
  let radiansTotal = angleInRadians;
  if (mouseY < 200) {
    radiansTotal = Math.PI + (Math.PI - angleInRadians);
  }
  return radiansTotal;
}

function drawAngleArc (angleInRadians) {
  push();
  noFill();
  stroke(color(0, 255, 0));
  strokeWeight(.5);
  arc(200, 200, 30, 30, angleInRadians, 0);
  pop();
}

function drawCenterLine () {
  push();
  stroke(color(255, 0, 0));
  strokeWeight(.5);
  line(200, 200, 400, 200);
  pop();
}

function drawLineToMouse () {
  push();
  stroke(255);
  strokeWeight(.7);
  line(200, 200, mouseX, mouseY);
  pop();
}

function drawCenterPoint () {
  push();
  fill(color(255, 0, 0));
  noStroke();
  circle(200, 200, 10);
  pop();
}