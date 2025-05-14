var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
var w = 800;
var h = 800;
let theYchange = 0;
let theXchange = 0;
let theWidthAdjusterChange = 1;
let theSignBeforeFormula = 1;
// WARNING! Do not pass `true, true` inside drawBothVersionsOfGraph()
let showDots = true;
const showLines = true;
const step = 4;
const s = (n) => Math.floor(n / step);
const rnd = (n) => Math.round(n * 100) / 100;

function toggleShowDots() {
  showDots = !showDots;
  drawBothVersionsOfGraph();
}

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
const xValuesList = [];

for (let i = -100; i < 100; i += 2) {
  xValuesList.push(i);
}
// const newXPluss = xValuesList.map((x) => x * 10);
// const yValuesList = xValuesList.map((x) => Math.pow(x, 2));
ctx.clearRect(0, 0, w, h);
drawTheGraph(showLines, false);
drawTheGraph(false, showDots);

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

function selectElementAndChangeValue(getThisID) {
  const getGraphElement = document.getElementById(getThisID).value;
  let howFormulaLooks = document.getElementById("howFormulaLooks");

  switch (getThisID) {
    case "leftOrRight":
      theXchange = parseInt(getGraphElement);
      break;
    case "upOrDown":
      theYchange = parseInt(getGraphElement);
      break;
    case "theWidthAdjuster":
      theWidthAdjusterChange = parseFloat(getGraphElement);
      break;
    case "signBeforeFormula":
      theSignBeforeFormula = theSignBeforeFormula * -1;
      let x = document.getElementById("signBeforeFormula");
      x.textContent = `${theSignBeforeFormula}`;
      break;
    default:
      break;
  }
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^2 + ${theYchange})`;
}

function drawBothVersionsOfGraph() {
  ctx.clearRect(0, 0, w, h);
  drawTheGraph(showLines, false);
  drawTheGraph(false, showDots);
}

function drawTheGraph(drawLines = true, drawDots = false) {
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
          if (drawDots) {
            ctx.fillText(` ${rnd(xValuesList[index])} ${rnd(yValuesList[index])}`, i, j);
            drawCircle(i, j, 3);
          }
          if (drawLines) {
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
  }
  ctx.stroke();
  ctx.closePath();
}

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
