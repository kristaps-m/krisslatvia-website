var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
var w = 800;
var h = 800;
let theYchange = 0;
let theXchange = 0;
let theWidthAdjusterChange = 1;
let theSignBeforeFormula = 1;
let theExponentValue = 2;
// WARNING! Do not pass `true, true` inside drawBothVersionsOfGraph()
let showDots = true;
const showLines = true;
const step = 4;
const theScale = 20;
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
  ctx.lineWidth = "0.5";
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, w);
  ctx.stroke();

  // X axis
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = "0.5";
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  ctx.closePath();

  ctx.font = "bold 20px Comic Sans MS";
  ctx.fillStyle = "blue";
  ctx.fillText("X ➨", 6, h / 2 + 20);
  ctx.fillText("Y 🠱", w / 2 + 5, h - 6);
}

// Parabola? y = x^2
const xValuesList = [];

for (let i = -51; i < 51; i += 0.25) {
  xValuesList.push(i);
}

ctx.clearRect(0, 0, w, h);
drawTheGraph(showLines, false);
drawTheGraph(false, showDots);

function resetGraph() {
  theYchange = 0;
  theXchange = 0;
  theWidthAdjusterChange = 1;
  theSignBeforeFormula = 1;
  theExponentValue = 2;
  let howFormulaLooks = document.getElementById("howFormulaLooks");
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^${theExponentValue} + ${theYchange})`;

  document.getElementById("upOrDown").value = theYchange;
  document.getElementById("leftOrRight").value = theXchange;
  document.getElementById("theWidthAdjuster").value = theWidthAdjusterChange;
  document.getElementById("signBeforeFormula").value = theSignBeforeFormula;
  document.getElementById("theExponentValue").value = theExponentValue;
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
    case "theExponentValue":
      theExponentValue = parseFloat(getGraphElement);
      break;
    case "signBeforeFormula":
      theSignBeforeFormula = theSignBeforeFormula * -1;
      let x = document.getElementById("signBeforeFormula");
      x.textContent = `${theSignBeforeFormula}`;
      break;
    default:
      break;
  }
  howFormulaLooks.textContent = `y = ${theSignBeforeFormula} * ((1 / ${theWidthAdjusterChange}) * (x - ${theXchange})^${theExponentValue} + ${theYchange})`;
}

function drawBothVersionsOfGraph() {
  ctx.clearRect(0, 0, w, h);
  drawTheGraph(showLines, false);
  drawTheGraph(false, showDots);
}

c.addEventListener("click", (e) => {
  const rect = c.getBoundingClientRect();
  let xHor = rnd((e.clientX - rect.left) * (c.width / rect.width));
  let yVert = rnd((e.clientY - rect.top) * (c.height / rect.height));
  // console.log(xHor, yVert);
  const realX = rnd((xHor - w / 2) / theScale);
  const realY = rnd(-((yVert - h / 2) / theScale));
  // console.log(realX, realY);
  drawBothVersionsOfGraph();
  drawCircle(xHor, yVert, 6, "lightblue");
  let showXandYvalues = document.getElementById("showValuesOnClick");
  showXandYvalues.textContent = `(${realX}, ${realY}) (${xHor}, ${yVert})`;
});

function drawTheGraph(drawLines = true, drawDots = false) {
  drawXandYaxis();
  const yValuesList = xValuesList.map(
    (x) =>
      theSignBeforeFormula *
      ((1 / theWidthAdjusterChange) * Math.pow(x - theXchange, theExponentValue) + theYchange)
  );

  ctx.beginPath();
  ctx.strokeStyle = "darkgreen";
  ctx.lineWidth = 2;

  for (let i = 0; i < xValuesList.length; i++) {
    const x = xValuesList[i];
    const y = yValuesList[i];
    const [canvasX, canvasY] = mapToCanvas(x, y, theScale);

    if (drawLines) {
      if (i === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }

    if (drawDots) {
      drawCircle(canvasX, canvasY, 3);
      ctx.font = "bold 10px Comic Sans MS";
      ctx.fillStyle = "red";
      if (x >= 0) {
        ctx.fillText(`${rnd(x)}, ${rnd(y)}`, canvasX + 9, canvasY - 5);
      } else {
        ctx.fillText(`${rnd(x)}, ${rnd(y)}`, canvasX - 75, canvasY - 5);
      }
    }
  }

  if (drawLines) {
    ctx.stroke();
  }
  ctx.closePath();
}

function mapToCanvas(x, y, scale) {
  const canvasX = w / 2 + x * scale;
  const canvasY = h / 2 - y * scale;
  return [canvasX, canvasY];
}

function drawCircle(x, y, r, color = "#663300") {
  // Circle
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}
