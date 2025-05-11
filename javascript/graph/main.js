// MY Canvas2 Cordinates
var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
var w = 800;
var h = 800;
const step = 10;
const s = (n) => Math.floor(n / 10);
let theYchange = 0;
let theXchange = 0;
let theWidthAdjusterChange = 1;
let theSignBeforeFormula = 1;

function drawXandYaxis() {
  // Y axis
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = "2";
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, w);
  ctx.stroke();

  // X axis
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = "2";
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  ctx.closePath();
}

// Parabola? y = x^2
const xValuesList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, -1, -2,
  -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -16, -18, -20, -22, -24, -27, -30, -33, -36,
  -39,
];
// const newXPluss = xValuesList.map((x) => x * 10);
// const yValuesList = xValuesList.map((x) => Math.pow(x, 2));
drawXandYaxis();
drawTheGraph();
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

function resetGraph() {
  theYchange = 0;
  theXchange = 0;
  theWidthAdjusterChange = 1;
  theSignBeforeFormula = 1;
  let howFormulaLooks = document.getElementById("howFormulaLooks");
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^2 + ${theYchange})`;

  document.getElementById("upOrDown").value = theYchange;
  document.getElementById("leftOrRight").value = theXchange;
  document.getElementById("theWidthAdjuster").value = theWidthAdjusterChange;
  document.getElementById("signBeforeFormula").value = theSignBeforeFormula;
}

function selectUpOrDown() {
  theYchange = parseInt(document.getElementById("upOrDown").value);
  let howFormulaLooks = document.getElementById("howFormulaLooks");
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^2 + ${theYchange})`;
}

function selectLeftOrRight() {
  theXchange = parseInt(document.getElementById("leftOrRight").value);
  let howFormulaLooks = document.getElementById("howFormulaLooks");
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^2 + ${theYchange})`;
}

function selectTheWidthAdjuster() {
  theWidthAdjusterChange = parseFloat(document.getElementById("theWidthAdjuster").value);
  let howFormulaLooks = document.getElementById("howFormulaLooks");
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^2 + ${theYchange})`;
}

function changeSignBeforeFormula() {
  theSignBeforeFormula = theSignBeforeFormula * -1;
  let x = document.getElementById("signBeforeFormula");
  x.textContent = `${theSignBeforeFormula}`;
  let howFormulaLooks = document.getElementById("howFormulaLooks");
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^2 + ${theYchange})`;
}

function drawTheGraph() {
  ctx.clearRect(0, 0, w, h);
  const firstLineStartPoints = [];
  drawXandYaxis();
  // THE FORMULA .........................
  // from y = x^2
  // to....
  // y = theSignBeforeFormula * ((1 / theWidthAdjusterChange) * (x - theXchange)^2 + theYchange)
  const yValuesList = xValuesList.map(
    (x) =>
      theSignBeforeFormula *
      ((1 / theWidthAdjusterChange) * Math.pow(x - theXchange, 2) + theYchange)
  );
  //----------------------------------------------------------------------------

  // let howFormulaLooks = document.getElementById("howFormulaLooks");
  // console.log(howFormulaLooks);

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
}

// for (let i = 0; i < xValuesList.length; i++) {
//   const x = newXPluss[i];
//   const y = yValuesList[i];
//   drawCircle(x + 400, (y - 400) * -1, 1);
//   ctx.font = "bold 10px Comic Sans MS";
//   // ctx.textAlign = "center";
//   ctx.fillText(`*${x} ${y}`, x + 400, (y - 400) * -1);
// }

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
