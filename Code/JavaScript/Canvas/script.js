var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function setCanvasSize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4; //Hack to prevent scroll bar
}


function redCanvas () {

    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = "rgb(0, 0, 200, 0.5)"; // transparencey
    context.fillRect(30, 30, 50, 50);

    // Smiley Face
    context.beginPath();
    context.arc(175, 60, 50, 0, Math.PI * 2, true); // Outer circle
    context.fillStyle = "rgb(255, 255, 0)";
    context.fill();
    context.moveTo(210, 60);
    context.arc(175, 60, 35, 0, Math.PI, false); // Mouth (clockwise)
    context.moveTo(165, 50);
    context.arc(160, 50, 5, 0, Math.PI * 2, true); // Left eye
    context.moveTo(195, 50);
    context.arc(190, 50, 5, 0, Math.PI * 2, true); // Right eye
    context.stroke();

    // Filled triangle
    context.beginPath();
    context.moveTo(125, 125);
    context.lineTo(205, 125);
    context.lineTo(125, 205);
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // Stroked triangle
    context.beginPath();
    context.moveTo(225, 225);
    context.lineTo(225, 145);
    context.lineTo(145, 225);
    context.closePath();
    context.stroke();

    //Red Square - Circle
    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(300, 300, 50, 50);
    context.beginPath();
    context.arc(300, 300, 50, 0, Math.PI * 2, true);
    context.stroke();

    // 12 circles
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            context.beginPath();
            const x = 700 + j * 50; // x coordinate
            const y = 100 + i * 50; // y coordinate
            const radius = 20; // Arc radius
            const startAngle = 0; // Starting point on circle
            const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
            const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise

            context.arc(x, y, radius, startAngle, endAngle, counterclockwise);

            if (i > 1) {
                context.fill();
            } else {
                context.stroke();
            }
        }
    }

    // Grid
    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            if (i % 100 > 49 || j % 100 > 49) {
                context.fillStyle = "rgba(0, 0, 0, .25)";
            }
            else {
                context.fillStyle = "rgba(255, 255, 255, .25)";
            }
            context.fillRect(i, j, 1, 1);
        }
    }
}

setCanvasSize();
redCanvas();
