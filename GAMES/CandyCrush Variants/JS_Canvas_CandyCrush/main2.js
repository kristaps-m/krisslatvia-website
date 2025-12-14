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
let NUMBER_OF_COLORS_USED = 5;
// let canClick = true;
let userClickedTwoNumbers = [];
let theGameField = generateDifferentCadiesForGame();
theGameField = candyCrush(theGameField);
// console.log(theGameField);
displayNumbersOnCanvas();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  // console.log(1);
  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      if (theGameField[row][col].randomInteger == 0) {
        const dx = W / CANDIES_IN_ROW;
        const dy = H / CANDIES_IN_COL;
        const x = col * dy; // + dy / 4;
        let y = row * dx; // + dx / 1.5;
        theGameField[row][col].randomInteger = getRndInteger(
          1,
          NUMBER_OF_COLORS_USED
        );
        CTX.fillStyle = GAME_COLORS[theGameField[row][col].randomInteger];
        CTX.fillRect(x, y, dx, dy);
        theGameField[row][col].top += 0.5;
        // console.log(y);
        // // CTX.fillStyle = GAME_COLORS[theGameField[row][col].randomInteger - 1];
        // CTX.fillStyle = "gray";
        // CTX.fillRect(x, y, dx, dy);
        displayText(
          theGameField[row][col].randomInteger,
          x + dy / 4,
          theGameField[row][col].top
        );
      }
    }
  }
  displayGrid({
    ctx: CTX,
    strokeStyle: "black",
    girdLineWidth: (girdLineWidth = 3),
    oneSquareSize: W / CANDIES_IN_ROW,
    canvasHeight: H,
    canvasWidth: W,
  });
}

gameLoop();

CANVAS.addEventListener(
  "click",
  function (e) {
    // Get the bounding rectangle of the canvas
    const rect = CANVAS.getBoundingClientRect();
    e.preventDefault(); // Prevent the default context menu from appearing
    let X = (e.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
    let Y = (e.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
    console.log(X, Y, userClickedTwoNumbers.length, "userClickLen");
    if (userClickedTwoNumbers != 2) {
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
            // console.log(elem);
            if (userClickedTwoNumbers.length <= 2) {
              userClickedTwoNumbers.push(elem);
            }
            if (userClickedTwoNumbers.length == 2) {
              //   // amazingList = swapObjectsInAmazingList(amazingList, userClickedTwoNumbers);
              //   // amazingList = [...candyCrush(amazingList)];
              const click1 = userClickedTwoNumbers[0];
              const click2 = userClickedTwoNumbers[1];
              theGameField = [
                ...swapElements(
                  theGameField,
                  click1.row,
                  click1.col,
                  click2.row,
                  click2.col
                ),
              ];
              theGameField = [...candyCrush(theGameField, true)];
              // console.log(click1.row, click1.col, click2.row, click2.col);
              setTimeout(function () {
                displayNumbersOnCanvas();
                userClickedTwoNumbers = [];
              }, 500);
            }
          }
        });
      });
      console.log(userClickedTwoNumbers.length, "userClickLen");
    }
  },
  false
);

function displayNumbersOnCanvas() {
  CTX.clearRect(0, 0, W, H);

  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      const dx = W / CANDIES_IN_ROW;
      const dy = H / CANDIES_IN_COL;
      const x = col * dy; // + dy / 4;
      const y = row * dx; // + dx / 1.5;
      // const randomInteger = theGameField[row][col];
      // {dx:dx, dy:dy, x:x, y:y, randomInteger:randomInteger}
      // if (row === 0 && col === 0) {
      //   console.log(theGameField[row][col]);
      // }
      CTX.fillStyle = GAME_COLORS[theGameField[row][col].randomInteger - 1];
      // CTX.fillRect(
      //   theGameField[row][col].left,
      //   theGameField[row][col].top,
      //   theGameField[row][col].width,
      //   theGameField[row][col].height
      // );
      CTX.fillRect(x, theGameField[row][col].top, dx, dy);
      displayText(
        theGameField[row][col].randomInteger,
        x + dy / 4,
        y + dx / 1.5
      );
      // displayText(randomInteger, x, y);
    }
  }
  displayGrid({
    ctx: CTX,
    strokeStyle: "black",
    girdLineWidth: (girdLineWidth = 3),
    oneSquareSize: W / CANDIES_IN_ROW,
    canvasHeight: H,
    canvasWidth: W,
  });
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

function swapButton(testMode = false) {
  const getN = getNumbersForSpawing();

  theGameField = swapElements(
    theGameField,
    getN.n1r,
    getN.n1c,
    getN.n2r,
    getN.n2c,
    testMode
  );
  theGameField = candyCrush(theGameField);
  displayNumbersOnCanvas();
  // console.log(theGameField);
}

function isItPossibleToSwapNumbers(theList, n1r, n1c, n2r, n2c) {
  // Find the objects to swap
  const objectOne = theList[n1r][n1c];
  const objectTwo = theList[n2r][n2c];
  // Check if both objects exist
  if (!objectOne || !objectTwo) {
    console.log("One or both objects not found.");
    return theList; // Return the original list unchanged
  }
  // Perform the swap if conditions are met
  if (
    (Math.abs(n1r - n2r) === 0 && Math.abs(n1c - n2c) == 1) ||
    (Math.abs(n1c - n2c) === 0 && Math.abs(n1r - n2r) === 1)
  ) {
    console.log("It is okay to swap");
    return true;
  } else {
    console.log("It is not possible to swap");
    return false;
  }
}

function swapElements(arr, n1r, n1c, n2r, n2c, testMode = false) {
  function performSwap(arr, n1r, n1c, n2r, n2c) {
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
  if (testMode) {
    return performSwap(arr, n1r, n1c, n2r, n2c);
  }
  if (isItPossibleToSwapNumbers(arr, n1r, n1c, n2r, n2c)) {
    return performSwap(arr, n1r, n1c, n2r, n2c);
  } else {
    return arr;
  }
}

function generateDifferentCadiesForGame() {
  console.log("I AM TRIGERED!", NUMBER_OF_COLORS_USED);
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

function userClickedNumberLog() {
  console.log(userClickedTwoNumbers.length, "<----");
}

function changeNumberOfSides() {
  var n = parseInt(document.getElementById("myRange")?.value);
  NUMBER_OF_COLORS_USED = n;
  userClickedTwoNumbers = [];
  theGameField = generateDifferentCadiesForGame();
  theGameField = candyCrush(theGameField);
  displayNumbersOnCanvas();
  console.log(n);
}
