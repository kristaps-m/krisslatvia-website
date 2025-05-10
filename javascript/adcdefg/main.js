// MY Canvas2 Cordinates
var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
var w = 800;
var h = 800;

// Y axis
ctx.beginPath();
ctx.strokeStyle = "#000000";
ctx.lineWidth = "1";
ctx.moveTo(w / 2, 0);
ctx.lineTo(w / 2, w);
ctx.stroke();

// X axis
ctx.beginPath();
ctx.strokeStyle = "#000000";
ctx.lineWidth = "1";
ctx.moveTo(0, h / 2);
ctx.lineTo(w, h / 2);
ctx.stroke();
ctx.closePath();

// ctx.fillStyle = "red";
// ctx.fillRect(20, 20, 20, 20);

// drawCircle(11, 11, 11);

/*
line?
x = y
for i in range -100 ... 100
*/
// for (let i = Math.min(w, h) * -1; i < Math.min(w, h); i += 10) {
//   drawCircle(i, i, 3);
// }

// Parabola? y = x^2
const xValuesList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, -1, -2,
  -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -16, -18, -20, -22, -24, -27, -30, -33, -36,
  -39,
];
// const newXPluss = xValuesList.map((x) => x * 10);
// const yValuesList = xValuesList.map((x) => Math.pow(x, 2));
const yValuesList = xValuesList.map((x) => (1 / 9) * Math.pow(x + 5, 2) + 5);

// for (let i = 0; i < xValuesList.length; i++) {
//   const x = newXPluss[i];
//   const y = yValuesList[i];
//   drawCircle(x + 400, (y - 400) * -1, 1);
//   ctx.font = "bold 10px Comic Sans MS";
//   // ctx.textAlign = "center";
//   ctx.fillText(`*${x} ${y}`, x + 400, (y - 400) * -1);
// }

const step = 10;
const s = (n) => Math.floor(n / 10);
const firstLineStartPoints = [];
ctx.beginPath();
ctx.moveTo(firstLineStartPoints[0], firstLineStartPoints[1]);
for (let i = 0; i < w; i += step) {
  for (let j = 0; j < h; j += step) {
    ctx.font = "bold 12px Comic Sans MS";
    // ctx.textAlign = "center";
    ctx.fillStyle = "red";
    const x = s(i - 400);
    const y = s(j - 400) * -1;
    // ctx.fillText(`*${x} ${y}`, i, j);
    for (let index = 0; index < xValuesList.length; index++) {
      if (
        (xValuesList[index] === x && yValuesList[index] === y) ||
        (Math.floor(xValuesList[index]) === x && Math.floor(yValuesList[index]) === y)
      ) {
        // ctx.fillText(`*${x} ${y}`, i, j);
        // ctx.fillText(` ${xValuesList[index]}  ${yValuesList[index]}`, i, j);
        // drawCircle(i, j, 3);
        if (firstLineStartPoints.length === 0) {
          firstLineStartPoints.push(i);
          firstLineStartPoints.push(j);
        }
        // Draw Line?!
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "1";
        ctx.lineTo(i, j);
      }
    }
  }
}
ctx.stroke();
ctx.closePath();

// for (let i = -30; i < 30; i += 0.1) {
//   drawCircle(i + 400, Math.pow(i, 2) + 400, 3);
// }

/*
// Y axis
ctx3.beginPath();
ctx3.strokeStyle = "#000000";
ctx3.lineWidth = "1";
ctx3.moveTo(w / 2, 0);
ctx3.lineTo(w / 2, w);
ctx3.stroke();
// X axis
ctx3.beginPath();
ctx3.strokeStyle = "#000000";
ctx3.lineWidth = "1";
ctx3.moveTo(0, h / 2);
ctx3.lineTo(w, h / 2);
ctx3.stroke();
ctx3.closePath();

//----
var canvas = document.getElementById("myCanvas3");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000000";
ctx.lineWidth = "2";

var startX = 0;
var startY = 0;
var endX = 50;
var endY = 50;
var $startX = document.getElementById("sx");
var $startY = document.getElementById("sy");
var $endX = document.getElementById("ex");
var $endY = document.getElementById("ey");

$startX.value = startX;
$startY.value = startY;
$endX.value = endX;
$endY.value = endY;

draw();
draw2();

$startX.addEventListener(
  "keyup",
  function () {
    startX = this.value;
    draw();
    draw2();
  },
  false
);

$startY.addEventListener(
  "keyup",
  function () {
    startY = this.value;
    draw();
    draw2();
  },
  false
);

$endX.addEventListener(
  "keyup",
  function () {
    endX = this.value;
    draw();
    draw2();
  },
  false
);

$endY.addEventListener(
  "keyup",
  function () {
    endY = this.value;
    draw();
    draw2();
  },
  false
);
//-----------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
}

function draw2() {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  // ctx.lineTo(endX+startX, endY+startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  console.log(startX, startY, endX, endY);
}
*/

function drawCircle(x, y, r) {
  // Circle
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "#663300";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#663300";
  ctx.fill();
  ctx.stroke();
}
