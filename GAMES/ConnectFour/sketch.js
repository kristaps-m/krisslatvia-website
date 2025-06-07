/*
  TODO - Do you use getElementById in p5.js?
*/
const W = 700;
const H = 600;
const gameRows = 6;
const gameCols = 7;
const oneSqSize = 100;
let myObj;
let gameField = [];
let currentColor;
let drawWiningLine = [];
let isGameWon = { isWon: false, h: false, v: false, d1: false, d2: false };

function setup() {
  // myObj = new MyObject(20, 20, 20, 20);
  // gameField = [
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 0],
  //   [1, 0, 0, 0, 0, 2, 1],
  //   [1, 1, 1, 0, 2, 1, 2],
  //   [1, 2, 1, 2, 1, 2, 1],
  // ];
  gameField = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  currentColor = 1;
  cnv = createCanvas(W, H);
  let newCanvasX = (windowWidth - W) / 2;
  let newCanvasY = (windowHeight - H) / 2 + 100;
  cnv.position(newCanvasX, newCanvasY);

  // frameRate(200);
  // noLoop();
}

function mouseClicked() {
  // Code to run.
  if (!isGameWon.isWon) {
    // // console.log(mouseX, mouseY);
    const theC = Math.floor(mouseX / oneSqSize);
    const theR = Math.floor(mouseY / oneSqSize);
    putPieceToBottom(theC);
    isWiner();
  }
}

function putPieceToBottom(c) {
  let emptyRowIndex = getEmptyRowIndex(c);
  if (emptyRowIndex >= 0) {
    toggleCurrentColorMove();
    gameField[emptyRowIndex][c] = currentColor;
  }
}

function getEmptyRowIndex(c) {
  for (let row = gameField.length - 1; row >= 0; row--) {
    for (let col = gameField[0].length - 1; col >= 0; col--) {
      if (col == c && gameField[row][col] == 0 && row >= 0) {
        return row;
      }
    }
  }
}

function toggleCurrentColorMove() {
  let currentColorMove = document.getElementById("currentColorMove");
  if (currentColor == 1) {
    currentColor = 2;
    currentColorMove.textContent = "RED";
  } else if (currentColor == 2) {
    currentColor = 1;
    currentColorMove.textContent = "BLUE";
  }
}

function isWiner() {
  if (isHorizontal()) {
    // console.log("Horizontal", currentColor == 1 ? "RED" : "BLUE");
  } else if (isVertical()) {
    // console.log("Vertical", currentColor == 1 ? "RED" : "BLUE");
  } else if (isDiagonal_1()) {
    // console.log("isDiagonal_1", currentColor == 1 ? "RED" : "BLUE");
  } else if (isDiagonal_2()) {
    // console.log("isDiagonal_2", currentColor == 1 ? "RED" : "BLUE");
  }
}

function isHorizontal() {
  let equalColorsArrayIndexes = [];
  for (let row = 0; row < gameField.length; row++) {
    let equalInRow = 1;
    for (let col = 0; col < gameField[0].length - 1; col++) {
      if (
        gameField[row][col] == gameField[row][col + 1] &&
        gameField[row][col] != 0
      ) {
        equalColorsArrayIndexes.push([col, row]);
        equalInRow++;
      } else {
        equalInRow = 1;
        equalColorsArrayIndexes = [];
      }
      if (equalInRow == 4) {
        equalColorsArrayIndexes.push([col + 1, row]);
        isGameWon.isWon = true;
        isGameWon.h = true;
        drawWiningLine = [...equalColorsArrayIndexes];
        return true;
      }
    }
  }

  return false;
}

function isVertical() {
  let equalColorsArrayIndexes = [];
  for (let row = 0; row < gameField[0].length; row++) {
    let equalInCol = 1;
    for (let col = 0; col < gameField.length - 1; col++) {
      if (
        gameField[col][row] == gameField[col + 1][row] &&
        gameField[col][row] != 0
      ) {
        equalColorsArrayIndexes.push([row, col]);
        equalInCol++;
      } else {
        equalInCol = 1;
        equalColorsArrayIndexes = [];
      }
      if (equalInCol == 4) {
        equalColorsArrayIndexes.push([row, col + 1]);
        isGameWon.isWon = true;
        isGameWon.v = true;
        drawWiningLine = [...equalColorsArrayIndexes];
        return true;
      }
    }
  }

  return false;
}

function isDiagonal_1() {
  // from (0,0) to (widht, height)
  for (let row = 0; row < gameField.length; row++) {
    if (helper(row)) {
      return true;
    } else {
      for (let i = 2; i > 0; i--) {
        if (helper(row, i)) {
          return true;
        }
      }
    }
  }

  return false;
}

function helper(r, theX = 0) {
  let equalColorsArrayIndexes = [];
  let equalInDiag_1 = 1;
  for (let col = 0; col < gameField[0].length - 1; col++) {
    if (col < gameRows && col + 1 + theX < gameRows) {
      if (
        gameField[col + theX][col + r] ==
          gameField[col + 1 + theX][col + 1 + r] &&
        gameField[col + theX][col + r] != 0 &&
        gameField[col + theX][col + r]
      ) {
        equalColorsArrayIndexes.push([col + r, col + theX]);
        equalInDiag_1++;
      } else {
        equalInDiag_1 = 1;
        equalColorsArrayIndexes = [];
      }
      if (equalInDiag_1 == 4) {
        equalColorsArrayIndexes.push([col + r + 1, (col + theX + 1) * 1]);
        isGameWon.isWon = true;
        isGameWon.d1 = true;
        drawWiningLine = [...equalColorsArrayIndexes];
        return true;
      }
    }
  }

  return false;
}

function helper2(c = 0, index = 0) {
  let equalColorsArrayIndexes = [];
  let equalInDiag_2 = 1;
  for (let j = 0; j < gameCols; j++) {
    if (gameCols - j - 2 + index >= 0 && j + 1 + c < gameRows) {
      if (
        gameField[j + c][gameCols - j - 1 + index] ==
          gameField[j + 1 + c][gameCols - j - 2 + index] &&
        gameField[j + c][gameCols - j - 1 + index] != 0 &&
        gameField[j + c][gameCols - j - 1 + index]
      ) {
        equalColorsArrayIndexes.push([gameCols - j - 1 + index, j + c]);
        equalInDiag_2++;
      } else {
        equalInDiag_2 = 1;
        equalColorsArrayIndexes = [];
      }
      if (equalInDiag_2 == 4) {
        equalColorsArrayIndexes.push([gameCols - j - 2 + index, j + 1 + c]);
        isGameWon.isWon = true;
        isGameWon.d2 = true;
        drawWiningLine = [...equalColorsArrayIndexes];
        return true;
      }
    }
  }
}

function isDiagonal_2() {
  // from (0,width) to (0, height)
  for (let index = 0; index <= 2; index++) {
    if (helper2(index)) {
      return true;
    } else {
      for (let i = -1; i >= -3; i--) {
        if (helper2(0, i)) {
          return true;
        }
      }
    }
  }

  return false;
}
