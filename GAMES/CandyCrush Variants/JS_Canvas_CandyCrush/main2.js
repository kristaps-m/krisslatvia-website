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
let X = 0;
let Y = 0;
let NUMBER_OF_COLORS_USED = 5;
// idle | resolving | falling
let gameState = "idle";
let userClickedTwoNumbers = [];
let theGameField = generateDifferentCadiesForGame();
// theGameField = candyCrush(theGameField);
gameState = "resolving";
startResolve();
gameLoop();

function gameLoop() {
  update();
  displayNumbersOnCanvas();
  requestAnimationFrame(gameLoop);
}

CANVAS.addEventListener("click", function (e) {
  console.log(gameState);
  if (gameState !== "idle") return;

  const rect = CANVAS.getBoundingClientRect();
  const size = W / CANDIES_IN_COL;

  X = (e.clientX - rect.left) * (CANVAS.width / rect.width);
  Y = (e.clientY - rect.top) * (CANVAS.height / rect.height);

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

  if (userClickedTwoNumbers.length === 2) {
    const [a, b] = userClickedTwoNumbers;
    swapElements(theGameField, a.row, a.col, b.row, b.col);
    const matches = findMatches(theGameField);

    if (matches.length === 0) {
      // ❌ invalid move → swap back after delay
      gameState = "invalid_move";
      setTimeout(() => {
        swapElements(theGameField, a.row, a.col, b.row, b.col);
        userClickedTwoNumbers = [];
        gameState = "idle";
      }, 300);
    } else {
      // ✅ valid move
      gameState = "resolving";
      startResolve();
      // Don't clear userClickedTwoNumbers yet - clear when returning to idle
    }
  }
});

function displayNumbersOnCanvas() {
  CTX.clearRect(0, 0, W, H);
  const size = H / CANDIES_IN_ROW;

  for (let row = 0; row < CANDIES_IN_ROW; row++) {
    for (let col = 0; col < CANDIES_IN_COL; col++) {
      const cell = theGameField[row][col];

      // EMPTY CELL → skip drawing
      if (cell.randomInteger === 0) continue;

      CTX.fillStyle = GAME_COLORS[cell.randomInteger - 1];

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

  // Draw borders around clicked cells
  if (userClickedTwoNumbers.length > 0) {
    const borderWidth = 6;
    const borderPadding = 1;
    CTX.strokeStyle = "gold";
    CTX.lineWidth = borderWidth;

    userClickedTwoNumbers.forEach((cell) => {
      CTX.strokeRect(
        cell.x - borderPadding,
        cell.y - borderPadding,
        size + borderPadding * 2,
        size + borderPadding * 2
      );
      // CTX.fillStyle = "gold";
      // CTX.fillRect(X, Y, size/5, size/5);
      CTX.beginPath();
      CTX.arc(X, Y, size/8, 0, 2 * Math.PI);
      CTX.fillStyle = "gold";
      CTX.fill();
    });
  }
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

function swapElements(board, r1, c1, r2, c2) {
  if (!isItPossibleToSwapNumbers(board, r1, c1, r2, c2)) {
    return board;
  }

  const temp = board[r1][c1].randomInteger;
  board[r1][c1].randomInteger = board[r2][c2].randomInteger;
  board[r2][c2].randomInteger = temp;

  return board;
}

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

function changeNumberOfSides() {
  var n = parseInt(document.getElementById("myRange")?.value);
  NUMBER_OF_COLORS_USED = n;
  userClickedTwoNumbers = [];
  theGameField = generateDifferentCadiesForGame();
  gameState = "resolving";
  startResolve();
  displayNumbersOnCanvas();
  console.log(n);
}

function startResolve() {
  const matches = findMatches(theGameField);
  if (matches.length === 0) {
    gameState = "idle";
    userClickedTwoNumbers = [];
    return;
  }

  removeMatches(theGameField, matches);
  // gameState stays "resolving" to animate crushing first
}

function setupFallingAnimation() {
  const cellSize = H / CANDIES_IN_ROW;

  for (let col = 0; col < CANDIES_IN_COL; col++) {
    let emptyCount = 0;

    for (let row = CANDIES_IN_ROW - 1; row >= 0; row--) {
      const cell = theGameField[row][col];

      if (cell.randomInteger === 0) {
        emptyCount++;
      } else if (emptyCount > 0) {
        const targetRow = row + emptyCount;
        const targetCell = theGameField[targetRow][col];

        targetCell.randomInteger = cell.randomInteger;
        targetCell.y = row * cellSize; 
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
