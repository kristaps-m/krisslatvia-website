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
  gameField = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 0, 2, 1, 2],
    [1, 2, 1, 2, 1, 2, 1],
  ];
  currentColor = 1;
  cnv = createCanvas(W, H);
  let newCanvasX = (windowWidth - W) / 2;
  let newCanvasY = (windowHeight - H) / 2;
  cnv.position(newCanvasX, newCanvasY);

  // frameRate(200);
  // noLoop();
  // updateCanvas();
}

function draw() {
  background(255);
  // change array something?!
  gameField.forEach((row, c) => {
    row.forEach((e, r) => {
      /*
      00, 01, 02.. 06
      60, 61
      */
      if (e == 1) {
        stroke("black");
        fill("red");
        strokeWeight(1);
        rect(r * oneSqSize, c * oneSqSize, oneSqSize, oneSqSize);
      } else if (e == 2) {
        fill("blue");
        strokeWeight(1);
        rect(r * oneSqSize, c * oneSqSize, oneSqSize, oneSqSize);
      }
      noStroke();
      strokeWeight(1);
      stroke("black");
      fill("black");
      text(`${c - 1}, ${r}`, r * oneSqSize + 10, c * oneSqSize - 70);
    });
  });
  if (isGameWon.isWon) {
    // Style the line.
    stroke("green");
    strokeWeight(7);
    let addX = 0;
    let addY = 0;
    if (isGameWon.v || isGameWon.h) {
      addX = oneSqSize / 2;
      addY = -oneSqSize / 2;
    } else if (isGameWon.d1 || isGameWon.d2) {
      addX = oneSqSize / 2;
      addY = -oneSqSize / 2;
    }
    line(
      drawWiningLine[0][0] * oneSqSize + addX,
      drawWiningLine[0][1] * oneSqSize + oneSqSize + addY,
      drawWiningLine[drawWiningLine.length - 1][0] * oneSqSize + addX,
      drawWiningLine[drawWiningLine.length - 1][1] * oneSqSize + oneSqSize + addY
    );
  }
}

function mouseClicked() {
  // Code to run.
  toggleCurrentColorMove();
  console.log(mouseX, mouseY);
  const theC = Math.floor(mouseX / oneSqSize);
  const theR = Math.floor(mouseY / oneSqSize);
  // gameField[theR][theC] = currentColor;
  putPieceToBottom(theC);
  isWiner();
  // console.log(theR, theC, currentColor);
}

function putPieceToBottom(c) {
  let emptyRowIndex = getEmptyRowIndex(c);
  gameField[emptyRowIndex][c] = currentColor;
  // for (let row = 0; row < gameField.length; row++) {
  //   for (let col = 0; col < gameField[0].length; col++) {
  //     if (col == c && gameField[row][col] == 0) {
  //       gameField[row][c] = currentColor;
  //       break;
  //     }
  //   }
  // }
}

function getEmptyRowIndex(c) {
  for (let row = gameField.length - 1; row >= 0; row--) {
    for (let col = gameField[0].length - 1; col >= 0; col--) {
      if (col == c && gameField[row][col] == 0) {
        return row;
        // gameField[row][c] = currentColor;
        // break;
      }
    }
  }
}

function toggleCurrentColorMove() {
  let currentColorMove = document.getElementById("currentColorMove");
  // console.log(currentColorMove);
  // console.log(currentColorMove.textContent);
  if (currentColor == 1) {
    // if (currentColorMove.textContent == "RED") {
    currentColor = 2;
    currentColorMove.textContent = "RED";
  } else if (currentColor == 2) {
    currentColor = 1;
    currentColorMove.textContent = "BLUE";
  }
}

function isWiner() {
  if (isHorizontal()) {
    console.log("Horizontal", currentColor == 1 ? "RED" : "BLUE");
  } else if (isVertical()) {
    console.log("Vertical", currentColor == 1 ? "RED" : "BLUE");
  } else if (isDiagonal_1()) {
    console.log("isDiagonal_1", currentColor == 1 ? "RED" : "BLUE");
  } else if (isDiagonal_2()) {
    console.log("isDiagonal_2", currentColor == 1 ? "RED" : "BLUE");
  }
}

function isHorizontal() {
  let debug = [];
  for (let row = 0; row < gameField.length; row++) {
    let equalInRow = 1;
    for (let col = 0; col < gameField[0].length - 1; col++) {
      if (gameField[row][col] == gameField[row][col + 1] && gameField[row][col] != 0) {
        debug.push([col, row]);
        equalInRow++;
      } else {
        equalInRow = 1;
        debug = [];
      }
      if (equalInRow == 4) {
        console.log("WE GOT 4: ", currentColor);
        debug.push([col + 1, row]);
        console.log(debug);
        isGameWon.isWon = true;
        isGameWon.h = true;
        drawWiningLine = [...debug];
        return true;
      }
    }
  }

  return false;
}

function isVertical() {
  let debug = [];
  for (let row = 0; row < gameField[0].length; row++) {
    let equalInCol = 1;
    for (let col = 0; col < gameField.length - 1; col++) {
      if (gameField[col][row] == gameField[col + 1][row] && gameField[col][row] != 0) {
        debug.push([row, col]);
        equalInCol++;
      } else {
        equalInCol = 1;
        debug = [];
      }
      if (equalInCol == 4) {
        console.log("WE GOT 4: ", currentColor);
        debug.push([row, col + 1]);
        console.log(debug);
        isGameWon.isWon = true;
        isGameWon.v = true;
        drawWiningLine = [...debug];
        return true;
      }
    }
  }

  return false;
}

function isDiagonal_1() {
  /*
    20 -> 31 -> 42 -> 53
    10 -> 21 -> 32 -> 43
    --00 -> 11 -> 22 -> 33--
    01 -> 12 -> 23 -> 34
    02 -> 13 -> 24 -> 35
  */
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
  let debug = [];
  let equalInDiag_1 = 1;
  for (let col = 0; col < gameField[0].length - 1; col++) {
    // for (let col = 0; col < gameField[0].length - 1; col++) {
    // console.log(col + 1 + theX, col + 1 + r);
    if (col < gameRows && col + 1 + theX < gameRows) {
      // FROM gameRows - 1 to gameRows
      // console.log("inside", col + 1 + theX, col + 1 + r);

      // console.log(gameField[col + 1 + theX][col + 1 + r], col + 1 + theX, col + 1 + r);
      if (
        /*
          00, 01, 02, 03, 04
          10, 11, 12, 13, 14
        */
        gameField[col + theX][col + r] == gameField[col + 1 + theX][col + 1 + r] &&
        gameField[col + theX][col + r] != 0 &&
        gameField[col + theX][col + r]
      ) {
        debug.push([col + r, col + theX]);
        equalInDiag_1++;
      } else {
        equalInDiag_1 = 1;
        debug = [];
      }
      if (equalInDiag_1 == 4) {
        console.log("WE GOT 4: ", currentColor, `equalInDiag_1 ${equalInDiag_1} r: ${r} c: ${col}`);
        debug.push([col + r + 1, (col + theX + 1) * 1]);
        console.log(debug);
        isGameWon.isWon = true;
        isGameWon.d1 = true;
        drawWiningLine = [...debug];
        return true;
      }
    }
  }

  return false;
}

function helper3(c = 0, index = 0) {
  let debug = [];
  let equalInDiag_2 = 1;
  // for (let i = 0; i < gameCols; i++) {
  for (let j = 0; j < gameCols; j++) {
    // console.log(j, gameCols - j - 2, j + 1);
    if (gameCols - j - 2 + index >= 0 && j + 1 + c < gameRows) {
      if (
        /**
          c = 1
          16 25 34
         */
        gameField[j + c][gameCols - j - 1 + index] ==
          gameField[j + 1 + c][gameCols - j - 2 + index] &&
        gameField[j + c][gameCols - j - 1 + index] != 0 &&
        gameField[j + c][gameCols - j - 1 + index]
      ) {
        debug.push([gameCols - j - 1 + index, j + c]);
        equalInDiag_2++;
      } else {
        equalInDiag_2 = 1;
        debug = [];
      }
      if (equalInDiag_2 == 4) {
        console.log("WE GOT 4: ", currentColor, `equalInDiag_2 ${equalInDiag_2} r: {r} c: {col}`);
        debug.push([gameCols - j - 2 + index, j + 1 + c]);
        console.log(debug);
        isGameWon.isWon = true;
        isGameWon.d2 = true;
        drawWiningLine = [...debug];
        return true;
      }
    }
  }
}

function isDiagonal_2() {
  /*
    r: 6, c: 7
    03 -> 12 -> 21 -> 30
    04 -> 13 -> 22 -> 31
    05 -> 14 -> 23 -> 32
    --06 -> 15 -> 24 -> 33--
    16 -> 25 -> 34 -> 43
    26 -> 35 -> 44 -> 53
  */

  for (let index = 0; index <= 2; index++) {
    if (helper3(index)) {
      return true;
    } else {
      for (let i = -1; i >= -3; i--) {
        if (helper3(0, i)) {
          return true;
        }
      }
    }
  }

  return false;
}
