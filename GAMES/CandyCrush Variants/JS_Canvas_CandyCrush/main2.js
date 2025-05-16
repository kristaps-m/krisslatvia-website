// import getRndInteger(min, max) inclusive
const CANVAS = document.getElementById("mainStage");
const CTX = CANVAS.getContext("2d");
const W = 500,
  H = 500;
(CANVAS.width = W), (CANVAS.height = H);
// ROW = how much elements horizontaly, COL = how much e.. verticaly.
const CANDIES_IN_ROW = 8,
  CANDIES_IN_COL = 8;
// const CANDIES_IN_ROW = 4, CANDIES_IN_COL = 4;
const SQUARE_OFF_SET = 2; // space between each element
// const ELEM_LEFT = CANVAS.offsetLeft, ELEM_TOP = CANVAS.offsetTop;
const DEFAULT_GRAY = "#8c8382";
const GAME_COLORS = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "brown",
  "pink",
  "lightblue",
  "lightgreen",
];
const NUMBER_OF_COLORS_USED = 2;
let canClick = true;
let userClickedTwoNumbers = [];
let theGameField = generateDifferentCadiesForGame();
theGameField = candyCrush(theGameField);
console.log(theGameField);
displayNumbersOnCanvas();

CANVAS.addEventListener(
  "click",
  function (e) {
    // Get the bounding rectangle of the canvas
    const rect = CANVAS.getBoundingClientRect();
    let X = (e.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
    let Y = (e.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
    console.log(X, Y);

    theGameField.forEach((row) => {
      row.forEach((elem) => {
        if (
          X + SQUARE_OFF_SET > elem.left &&
          X < elem.left + elem.width &&
          Y + SQUARE_OFF_SET > elem.top &&
          Y < elem.top + elem.height
        ) {
          CTX.fillStyle = "black";
          const mom = 10;
          CTX.fillRect(
            elem.left + mom,
            elem.top + mom,
            elem.width - mom * 2,
            elem.height - mom * 2
          );
          console.log(elem);
          if (userClickedTwoNumbers.length <= 2) {
            userClickedTwoNumbers.push(elem);
          }
          if (userClickedTwoNumbers.length == 2) {
            //   // amazingList = swapObjectsInAmazingList(amazingList, userClickedTwoNumbers);
            //   // amazingList = [...candyCrush(amazingList)];
            const click1 = userClickedTwoNumbers[0];
            const click2 = userClickedTwoNumbers[1];
            theGameField = [
              ...swapElements(theGameField, click1.row, click1.col, click2.row, click2.col),
            ];
            theGameField = [...candyCrush(theGameField)];
            // console.log(click1.row, click1.col, click2.row, click2.col);
            setTimeout(function () {
              displayNumbersOnCanvas();
            }, 250);
            userClickedTwoNumbers = [];
          }
        }
      });
    });
  },
  false
);

function displayNumbersOnCanvas() {
  CTX.clearRect(0, 0, W, H);
  displayGrid({
    ctx: CTX,
    strokeStyle: "red",
    // girdLineWidth: (girdLineWidth = 1),
    oneSquareSize: W / CANDIES_IN_ROW,
    canvasHeight: H,
    canvasWidth: W,
  });
  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      const dx = W / CANDIES_IN_ROW;
      const dy = H / CANDIES_IN_COL;
      const x = col * dy; // + dy / 4;
      const y = row * dx; // + dx / 1.5;
      // const randomInteger = theGameField[row][col];
      // {dx:dx, dy:dy, x:x, y:y, randomInteger:randomInteger}
      if (row === 0 && col === 0) {
        console.log(theGameField[row][col]);
      }
      CTX.fillStyle = GAME_COLORS[theGameField[row][col].randomInteger - 1];
      CTX.fillRect(x, y, dx, dy);
      displayText(theGameField[row][col].randomInteger, x + dy / 4, y + dx / 1.5);
      // displayText(randomInteger, x, y);
    }
  }
}

function displayText(theText, x, y) {
  let fSize = 30;
  CTX.font = `italic bold ${fSize}px Comic Sans MS`;
  // CTX.textAlign = "center";
  CTX.fillStyle = "black";
  CTX.fillText(theText, x, y);
}

function getNumbersForSpawing() {
  const n1r = parseInt(document.getElementById("n1r").value);
  const n1c = parseInt(document.getElementById("n1c").value);
  const n2r = parseInt(document.getElementById("n2r").value);
  const n2c = parseInt(document.getElementById("n2c").value);

  console.log(n1r, n1c, n2r, n2c);

  result = { n1r: n1r, n1c: n1c, n2r: n2r, n2c: n2c };

  return result;
}

function swapButton() {
  const getN = getNumbersForSpawing();

  theGameField = swapElements(theGameField, getN.n1r, getN.n1c, getN.n2r, getN.n2c);
  theGameField = candyCrush(theGameField);
  displayNumbersOnCanvas();
  console.log(theGameField);
}

function swapElements(arr, n1r, n1c, n2r, n2c) {
  console.log(n1r, n1c, n2r, n2c);
  /**
   *         randomInteger: randomInteger,
        width: elemW,
        height: elemH,
        top: row + SQUARE_OFF_SET,
        left: col + SQUARE_OFF_SET,
        x: x,
        y: y,
   */
  // // Step 1
  // let temp = arr[n1r][n1c];
  // // Step 2
  // arr[n1r][n1c] = arr[n2r][n2c];
  // // Step 3
  // arr[n2r][n2c] = temp;

  const obj1 = arr[n1r][n1c];
  const obj2 = arr[n2r][n2c];

  // Make shallow copies of each
  const temp1 = { ...obj1 };
  const temp2 = { ...obj2 };

  // Clear original objects
  for (let key in obj1) delete obj1[key];
  for (let key in obj2) delete obj2[key];

  // Copy values from temp2 to obj1
  for (let key in temp2) obj1[key] = temp2[key];
  // Copy values from temp1 to obj2
  for (let key in temp1) obj2[key] = temp1[key];

  return arr;
}

function generateDifferentCadiesForGame() {
  let result = [];
  let elemH = H / CANDIES_IN_ROW - SQUARE_OFF_SET * 2;
  let elemW = W / CANDIES_IN_COL - SQUARE_OFF_SET * 2;

  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    let tempList = [];
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      const dx = W / CANDIES_IN_ROW;
      const dy = H / CANDIES_IN_COL;
      const x = col * dy + dy / 4;
      const y = row * dx + dx / 1.5;
      const randomInteger = getRndInteger(1, NUMBER_OF_COLORS_USED);
      //  dx: dx, dy: dy,
      const oneObject = {
        randomInteger: randomInteger,
        width: elemW,
        height: elemH,
        top: dx * row + SQUARE_OFF_SET,
        left: dy * col + SQUARE_OFF_SET,
        row: row,
        col: col,
        x: x,
        y: y,
      };
      tempList.push(oneObject);
      // tempList.push(randomInteger);
    }
    result.push(tempList);
  }

  return result;
}

// function createCandyCrushClickableElements() {
//   let elemH = H / CANDIES_IN_ROW - SQUARE_OFF_SET * 2;
//   let elemW = W / CANDIES_IN_COL - SQUARE_OFF_SET * 2;
//   // let elemColor = DEFAULT_GRAY;
//   let puzzleNrIndex = 0;
//   let x = 0,
//     y = 0;
//   for (let row = 0; row < W; row += W / CANDIES_IN_ROW) {
//     // let tempRow = [];
//     y = 0;
//     for (let col = 0; col < H; col += H / CANDIES_IN_COL) {
//       // const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
//       const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
//       const oneElement = {
//         colour: randomColor,
//         width: elemW,
//         height: elemH,
//         top: row + SQUARE_OFF_SET,
//         left: col + SQUARE_OFF_SET,
//         puzzleN: puzzleNrIndex,
//         row: x,
//         col: y,
//       };
//       gameClickableElements.push(oneElement);
//       // const pWorkO = {puzzleN:puzzleNrIndex, colour:randomColor};
//       // gameField.push(pWorkO);
//       // tempRow.push('');
//       puzzleNrIndex++;
//       y++;
//     }
//     x++;
//   }
// }
