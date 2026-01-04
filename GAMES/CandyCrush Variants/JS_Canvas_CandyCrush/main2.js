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
const FALL_SPEED = 10;
let NUMBER_OF_COLORS_USED = 5;
// idle | resolving | falling
let gameState = "idle";
let userClickedTwoNumbers = [];
let theGameField = generateDifferentCadiesForGame();
// theGameField = candyCrush(theGameField);
gameState = "resolving";
startResolve();
// gameState = "falling";
// setupFallingAnimation();
// gameState = "idle";
// console.log(theGameField);
// displayNumbersOnCanvas();
gameLoop();

function gameLoop() {
  update();
  displayNumbersOnCanvas();
  requestAnimationFrame(gameLoop);
}

// CANVAS.addEventListener(
//   "click",
//   function (e) {
//     // if (gameState !== "idle") return;
//     // Get the bounding rectangle of the canvas
//     const rect = CANVAS.getBoundingClientRect();
//     const size = W / CANDIES_IN_COL;
//     e.preventDefault(); // Prevent the default context menu from appearing
//     // let X = (e.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
//     // let Y = (e.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
//     let X = (e.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
//     let Y = (e.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
//     const col = Math.floor(X / size);
//     const row = Math.floor(Y / size);
//     if (row < 0 || row >= CANDIES_IN_ROW || col < 0 || col >= CANDIES_IN_COL) {
//       return;
//     }
//     console.log(X, Y, col, row, userClickedTwoNumbers.length, "userClickLen");
//     if (userClickedTwoNumbers.length < 2) {
//       // theGameField.forEach((row) => {
//       //   row.forEach((elem) => {
//           // if (
//           //   X + SQUARE_OFF_SET > elem.x &&
//           //   X < elem.y + size &&
//           //   Y + SQUARE_OFF_SET > elem.y &&
//           //   Y < elem.y + size
//           // ) {
//           if (row >= 0 && row < CANDIES_IN_ROW &&
//             col >= 0 && col < CANDIES_IN_COL) {
//             const cell = theGameField[row][col];
//             if (userClickedTwoNumbers.length === 1 &&
//                 userClickedTwoNumbers[0] === cell) {
//               return;
//             }
//             // userClickedTwoNumbers.push(cell);
//             CTX.fillStyle = "black";
//             const mom = 10;
//             CTX.fillRect(
//               cell.x + mom,
//               cell.y + mom,
//               size - mom * 2,
//               size - mom * 2
//             );
//             if (userClickedTwoNumbers.length < 2) {
//               userClickedTwoNumbers.push(cell);
//             }
//             console.log(userClickedTwoNumbers);
//             if (userClickedTwoNumbers.length == 2) {
//               const click1 = userClickedTwoNumbers[0];
//               const click2 = userClickedTwoNumbers[1];
//               theGameField = [
//                 ...swapElements(theGameField, click1.row, click1.col, click2.row, click2.col),
//               ];
//               // theGameField = [...candyCrush(theGameField)];
//               gameState = "resolving";
//               startResolve(); // replace with this chatGPT says
//               setTimeout(function () {
//                 displayNumbersOnCanvas();
//                 userClickedTwoNumbers = [];
//               }, 500);
//             }
//           }
//         // });
//       // });
//       // console.log(userClickedTwoNumbers.length, "userClickLen");
//     }
//   },
//   false
// );
CANVAS.addEventListener("click", function (e) {
  console.log(gameState);
  if (gameState !== "idle") return;

  const rect = CANVAS.getBoundingClientRect();
  const size = W / CANDIES_IN_COL;

  const X = (e.clientX - rect.left) * (CANVAS.width / rect.width);
  const Y = (e.clientY - rect.top) * (CANVAS.height / rect.height);

  const col = Math.floor(X / size);
  const row = Math.floor(Y / size);

  if (row < 0 || row >= CANDIES_IN_ROW || col < 0 || col >= CANDIES_IN_COL) {
    return;
  }

  if (userClickedTwoNumbers.length >= 2) return;

  const cell = theGameField[row][col];

  if (userClickedTwoNumbers.length === 1 && userClickedTwoNumbers[0] === cell) {
    return;
  }

  userClickedTwoNumbers.push(cell);

  // visual feedback
  CTX.fillStyle = "black";
  const pad = 10;
  CTX.fillRect(cell.x + pad, cell.y + pad, size - pad * 2, size - pad * 2);

  if (userClickedTwoNumbers.length === 2) {
    const [a, b] = userClickedTwoNumbers;

    // swapElements(theGameField, a.row, a.col, b.row, b.col);

    // userClickedTwoNumbers = [];
    // gameState = "resolving";
    // startResolve();
    swapElements(theGameField, a.row, a.col, b.row, b.col);

    const matches = findMatches(theGameField);

    if (matches.length === 0) {
      // ❌ invalid move → swap back
      setTimeout(() => {
        swapElements(theGameField, a.row, a.col, b.row, b.col);
      }, 150);
    } else {
      // ✅ valid move
      gameState = "resolving";
      startResolve();
    }

    userClickedTwoNumbers = [];
  }
});

// function displayNumbersOnCanvas() {
//   CTX.clearRect(0, 0, W, H);

//   for (let row = 0; row < CANDIES_IN_ROW; row++) {
//     for (let col = 0; col < CANDIES_IN_COL; col++) {
//       const dx = W / CANDIES_IN_ROW;
//       const dy = H / CANDIES_IN_COL;
//       const x = col * dy; // + dy / 4;
//       const y = row * dx; // + dx / 1.5;

//       CTX.fillStyle = GAME_COLORS[theGameField[row][col].randomInteger - 1];
//       CTX.fillRect(x, y, dx, dy);
//       displayText(theGameField[row][col].randomInteger, x + dy / 4, y + dx / 1.5);
//     }
//   }
//   displayGrid({
//     ctx: CTX,
//     strokeStyle: "black",
//     girdLineWidth: (girdLineWidth = 3),
//     oneSquareSize: W / CANDIES_IN_ROW,
//     canvasHeight: H,
//     canvasWidth: W,
//   });
// }

function displayNumbersOnCanvas() {
  CTX.clearRect(0, 0, W, H);
  const size = H / CANDIES_IN_ROW;

  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      const cell = theGameField[row][col];

      // EMPTY CELL → skip drawing
      if (cell.randomInteger === 0) continue;

      CTX.fillStyle = GAME_COLORS[cell.randomInteger - 1];

      // CTX.fillRect(
      //   cell.x,
      //   cell.y,
      //   W / CANDIES_IN_COL,
      //   H / CANDIES_IN_ROW
      // );
      // CTX.save();
      // CTX.translate(cell.x + size / 2, cell.y + size / 2);
      // CTX.scale(cell.scale, cell.scale);
      // CTX.translate(-size / 2, -size / 2);
      // CTX.fillRect(0, 0, size, size);
      // CTX.restore();
      CTX.save();
      CTX.translate(cell.x + size / 2, cell.y + size / 2);
      CTX.scale(cell.scale, cell.scale);
      CTX.translate(-size / 2, -size / 2);
      CTX.fillRect(0, 0, size, size);
      CTX.restore();
    }
  }

  displayGrid({
    ctx: CTX,
    strokeStyle: "black",
    girdLineWidth: 3,
    oneSquareSize: W / CANDIES_IN_ROW,
    canvasHeight: H,
    canvasWidth: W,
  });
}

function displayText(theText, x, y) {
  let fSize = 30;
  CTX.font = `italic bold ${fSize}px Comic Sans MS`;
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
  // theGameField = candyCrush(theGameField);
  gameState = "resolving";
  startResolve();
  displayNumbersOnCanvas();
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

// function swapElements(arr, n1r, n1c, n2r, n2c, testMode = false) {
//   function performSwap(arr, n1r, n1c, n2r, n2c) {
//     const obj1 = arr[n1r][n1c];
//     const obj2 = arr[n2r][n2c];

//     // Make shallow copies of each
//     const temp1 = { ...obj1 };
//     const temp2 = { ...obj2 };

//     // Clear original objects
//     for (let key in obj1) delete obj1[key];
//     for (let key in obj2) delete obj2[key];

//     // Copy values from temp2 to obj1
//     for (let key in temp2) obj1[key] = temp2[key];
//     // Copy values from temp1 to obj2
//     for (let key in temp1) obj2[key] = temp1[key];

//     return arr;
//   }
//   if (testMode) {
//     return performSwap(arr, n1r, n1c, n2r, n2c);
//   }
//   if (isItPossibleToSwapNumbers(arr, n1r, n1c, n2r, n2c)) {
//     return performSwap(arr, n1r, n1c, n2r, n2c);
//   } else {
//     return arr;
//   }
// }

function swapElements(board, r1, c1, r2, c2) {
  if (!isItPossibleToSwapNumbers(board, r1, c1, r2, c2)) {
    return board;
  }

  const temp = board[r1][c1].randomInteger;
  board[r1][c1].randomInteger = board[r2][c2].randomInteger;
  board[r2][c2].randomInteger = temp;

  return board;
}

// function generateDifferentCadiesForGame() {
//   console.log("I AM TRIGERED!", NUMBER_OF_COLORS_USED);
//   let result = [];
//   let elemH = H / CANDIES_IN_ROW - SQUARE_OFF_SET * 2;
//   let elemW = W / CANDIES_IN_COL - SQUARE_OFF_SET * 2;

//   for (let row = 0; row < CANDIES_IN_ROW; row++) {
//     let tempList = [];
//     for (let col = 0; col < CANDIES_IN_COL; col++) {
//       const dx = W / CANDIES_IN_ROW;
//       const dy = H / CANDIES_IN_COL;
//       const x = col * dy + dy / 4;
//       const y = row * dx + dx / 1.5;
//       const randomInteger = getRndInteger(1, NUMBER_OF_COLORS_USED);
//       //  dx: dx, dy: dy,
//       const oneObject = {
//         randomInteger: randomInteger,
//         width: elemW,
//         height: elemH,
//         // top: dx * row + SQUARE_OFF_SET,
//         // left: dy * col + SQUARE_OFF_SET,
//         row: row,
//         col: col,
//         x: x,
//         y: y,
//         targetY: y,
//         isFalling: false,
//         scale: 1,
//         isCrushing: false
//       };
//       tempList.push(oneObject);
//       // tempList.push(randomInteger);
//     }
//     result.push(tempList);
//   }

//   return result;
// }

function generateDifferentCadiesForGame() {
  const result = [];
  const size = W / CANDIES_IN_COL;

  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    const temp = [];
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      temp.push({
        randomInteger: getRndInteger(1, NUMBER_OF_COLORS_USED),

        row,
        col,

        x: col * size,
        y: row * size,
        targetY: row * size,

        isFalling: false,
        scale: 1,
        isCrushing: false,
      });
    }
    result.push(temp);
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
  // theGameField = candyCrush(theGameField);
  gameState = "resolving";
  startResolve();
  displayNumbersOnCanvas();
  console.log(n);
}

function startResolve() {
  const matches = findMatches(theGameField);
  if (matches.length === 0) {
    gameState = "idle";
    return;
  }

  removeMatches(theGameField, matches);
  // gameState stays "resolving" to animate crushing first
}

// function setupFallingAnimation() {
//   for (let col = 0; col < CANDIES_IN_COL; col++) {
//     for (let row = CANDIES_IN_ROW - 1; row >= 0; row--) {
//       const cell = theGameField[row][col];

//       if (cell.randomInteger === 0) continue;

//       const targetY = row * (H / CANDIES_IN_ROW);
//       if (cell.y !== targetY) {
//         cell.targetY = targetY;
//         cell.isFalling = true;
//       }
//     }
//   }
// }
function setupFallingAnimation() {
  const cellSize = H / CANDIES_IN_ROW;

  for (let col = 0; col < CANDIES_IN_COL; col++) {
    let emptyCount = 0;

    for (let row = CANDIES_IN_ROW - 1; row >= 0; row--) {
      const cell = theGameField[row][col];

      if (cell.randomInteger === 0) {
        emptyCount++;
      } else if (emptyCount > 0) {
        // const targetRow = row + emptyCount;
        // cell.targetY = targetRow * cellSize;
        // cell.isFalling = true;

        // theGameField[targetRow][col].randomInteger = cell.randomInteger;
        // cell.randomInteger = 0;
        const targetRow = row + emptyCount;
        const targetCell = theGameField[targetRow][col];

        targetCell.randomInteger = cell.randomInteger;
        targetCell.y = row * cellSize; // 👈 CRITICAL
        targetCell.targetY = targetRow * cellSize;
        targetCell.isFalling = true;

        cell.randomInteger = 0;
      }
    }

    // spawn new candies above
    for (let i = 0; i < emptyCount; i++) {
      const cell = theGameField[i][col];
      cell.randomInteger = getRndInteger(1, NUMBER_OF_COLORS_USED);
      cell.y = -cellSize * (emptyCount - i);
      cell.targetY = i * cellSize;
      cell.isFalling = true;
    }
  }
}

// function update() {
//   if (gameState === "falling") {
//     let done = true;

//     for (let row of theGameField) {
//       for (let cell of row) {
//         if (cell.isFalling) {
//           cell.y += FALL_SPEED;
//           if (cell.y < cell.targetY) {
//             done = false;
//           } else {
//             cell.y = cell.targetY;
//             cell.isFalling = false;
//           }
//         }
//       }
//     }

//     if (done) {
//       prepareFalling(theGameField);
//       startResolve();
//     }
//   }
// }
function update() {
  if (gameState === "resolving") {
    // Animate crushing
    let allCrushed = true;

    for (let row of theGameField) {
      for (let cell of row) {
        if (cell.isCrushing) {
          cell.scale -= 0.05;
          if (cell.scale <= 0) {
            cell.scale = 1;
            cell.isCrushing = false;
            cell.randomInteger = 0;
          } else {
            allCrushed = false;
          }
        }
      }
    }

    if (allCrushed) {
      // All candies crushed → prepare falling
      setupFallingAnimation();
      gameState = "falling";
    }
  } else if (gameState === "falling") {
    // Animate falling
    let stillFalling = false;

    for (let row of theGameField) {
      for (let cell of row) {
        if (cell.isFalling) {
          cell.y += FALL_SPEED;

          if (cell.y >= cell.targetY) {
            cell.y = cell.targetY;
            cell.isFalling = false;
          } else {
            stillFalling = true;
          }
        }
      }
    }

    if (!stillFalling) {
      // All candies landed → check for new matches
      gameState = "resolving";
      startResolve();
    }
  }
}
