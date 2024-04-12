const width = 1920;
const height = 1080;
const noiseScale = .005;
const noiseAmplifier = 200;
const noiseResolution = 10;
const offsetSpeed = 0.001;
const layers = 10;
let basePoint = 800;
let offset = 1;

let yVal = 0;
let priorVal = 0;

let randNumArray = [];

function setup() {
    createCanvas(width, height);
    frameRate(60);
    for (let index = 0; index < layers; index++) {
        randNumArray.push(Math.random() * 10000000);
    }
}

function draw() {
    background(255);
    drawSun();
    for (let i = 1; i < layers + 1; i++) {
        drawMountains(randNumArray[i - 1], 24 / (i * i), 2 / (i - 0.5), 225 / i);
    }

}

function drawSun() {
    push();
    noStroke();
    fill(color(255, 0, 0));
    circle(width / 3, height / 3, 100);
    pop();
}

function drawMountains(randomStartPoint, parallaxEffect, disctanceAmplifier, contrast) {
    for (let i = 0; i < width; i += noiseResolution, offset += offsetSpeed) {
        let xOff = ((offset + randomStartPoint) / parallaxEffect);
        yVal = noise((i + xOff) * noiseScale, basePoint * noiseScale) * noiseAmplifier * disctanceAmplifier;
        push();
        strokeWeight(noiseResolution * 2);
        stroke(contrast);
        if (i === 0) {
            line(i, basePoint - yVal, i + noiseResolution, basePoint - yVal);
            line(i, basePoint - yVal, i, height);
        }
        else {
            line(i, priorVal, i + noiseResolution, basePoint - yVal);
            line(i, priorVal, i, height);
        }
        priorVal = basePoint - yVal;
        pop();
    }
}