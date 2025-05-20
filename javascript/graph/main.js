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

function drawTheGraph(drawLines = true, drawDots = false) {
  drawXandYaxis();
  console.log(drawLines, "drawLines");

  const yValuesList = xValuesList.map(
    (x) =>
      theSignBeforeFormula *
      ((1 / theWidthAdjusterChange) * Math.pow(x - theXchange, theExponentValue) + theYchange)
  );

  // Compute max absolute x and y for scaling
  const maxX = Math.max(...xValuesList.map(Math.abs));
  const maxY = Math.max(...yValuesList.map(Math.abs));

  // Determine scaling factor to fit graph within canvas
  // const margin = 60000; // pixels padding
  // const scaleX = Math.abs(w / 2 - margin) / maxX;
  // const scaleY = Math.abs(h / 2 - margin) / maxY;
  // const scale = Math.min(scaleX, scaleY); // uniform scale
  // console.log(scale);
  ctx.beginPath();
  ctx.strokeStyle = "darkgreen";
  ctx.lineWidth = 2;

  for (let i = 0; i < xValuesList.length; i++) {
    const x = xValuesList[i];
    const y = yValuesList[i];
    const [canvasX, canvasY] = mapToCanvas(x, y, 20);

    if (drawLines) {
      if (i === 0) {
        ctx.moveTo(canvasX, canvasY);
        // console.log("MOVE TO AVTIVATED!");
      } else {
        ctx.lineTo(canvasX, canvasY);
        // console.log(`Line point ${i}: (${canvasX}, ${canvasY})`);
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

// function drawTheGraph(drawLines = true, drawDots = false) {
//   const firstLineStartPoints = [];
//   drawXandYaxis();
//   // THE FORMULA .........................
//   // from y = x^2
//   // to....
//   // y = theSignBeforeFormula * ((1 / theWidthAdjusterChange) * (x - theXchange)^theExponentValue + theYchange)
//   const yValuesList = xValuesList.map(
//     (x) =>
//       theSignBeforeFormula *
//       ((1 / theWidthAdjusterChange) * Math.pow(x - theXchange, theExponentValue) + theYchange)
//   );
//   //----------------------------------------------------------------------------

//   ctx.beginPath();
//   ctx.moveTo(firstLineStartPoints[0], firstLineStartPoints[1]);
//   for (let i = 0; i < w; i += step) {
//     for (let j = 0; j < h; j += step) {
//       ctx.font = "bold 12px Comic Sans MS";
//       // ctx.textAlign = "center";
//       ctx.fillStyle = "red";
//       const m = 1;
//       const x = s(i - 400 * m);
//       const y = s(j - 400 * m) * -1;

//       for (let index = 0; index < xValuesList.length; index++) {
//         if (
//           (xValuesList[index] === x && yValuesList[index] === y) ||
//           (Math.floor(xValuesList[index]) === x && Math.floor(yValuesList[index]) === y)
//         ) {
//           if (drawDots) {
//             ctx.fillText(` ${rnd(xValuesList[index])} ${rnd(yValuesList[index])}`, i, j);
//             drawCircle(i, j, 3);
//           }
//           if (drawLines) {
//             if (firstLineStartPoints.length === 0) {
//               firstLineStartPoints.push(i);
//               firstLineStartPoints.push(j);
//             }
//             // Draw Line?!
//             ctx.strokeStyle = "darkgreen";
//             ctx.lineWidth = "5";
//             // ctx.lineTo(x, y);
//             ctx.lineTo(i, j);
//             // how to from i and j to x and y?
//             // , 2, 4, 6, 8, 10,
//             // , 16, 256, 1296, 4096, 10000, 2073
//             console.log(xValuesList.length, yValuesList.length, i, j, x, y);
//           }
//         }
//       }
//     }
//   }
//   ctx.stroke();
//   ctx.closePath();
//   console.log(xValuesList);
//   console.log(yValuesList);
// }

// function drawTheGraph(drawLines = true, drawDots = false) {
//   ctx.clearRect(0, 0, w, h);
//   drawXandYaxis();

//   // Compute y values from the current formula
//   const yValuesList = xValuesList.map(
//     (x) =>
//       theSignBeforeFormula *
//       ((1 / theWidthAdjusterChange) * Math.pow(x - theXchange, theExponentValue) + theYchange)
//   );

//   // Compute min/max values for scaling
//   const xMin = Math.min(...xValuesList);
//   const xMax = Math.max(...xValuesList);
//   const yMin = Math.min(...yValuesList);
//   const yMax = Math.max(...yValuesList);

//   ctx.beginPath();
//   ctx.strokeStyle = "darkgreen";
//   ctx.lineWidth = 2;

//   for (let i = 0; i < xValuesList.length; i++) {
//     const x = xValuesList[i];
//     const y = yValuesList[i];

//     // Convert graph values to canvas coordinates
//     const [canvasX, canvasY] = mapToCanvas(x, y, xMin, xMax, yMin, yMax, w, h);

//     if (drawLines) {
//       if (i === 0) {
//         ctx.moveTo(canvasX, canvasY);
//       } else {
//         ctx.lineTo(canvasX, canvasY);
//       }
//     }

//     if (drawDots) {
//       drawCircle(canvasX, canvasY, 3);
//       ctx.font = "bold 12px Comic Sans MS";
//       ctx.fillStyle = "red";
//       ctx.fillText(`(${rnd(x)}, ${rnd(y)})`, canvasX + 5, canvasY - 5);
//     }
//   }

//   if (drawLines) ctx.stroke();
//   ctx.closePath();
// }

// function mapToCanvas(x, y, xMin, xMax, yMin, yMax, canvasWidth, canvasHeight) {
//   const canvasX = ((x - xMin) / (xMax - xMin)) * canvasWidth;
//   const canvasY = canvasHeight - ((y - yMin) / (yMax - yMin)) * canvasHeight;
//   return [canvasX, canvasY];
// }
