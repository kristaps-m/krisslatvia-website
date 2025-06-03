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
// let ca

function setup() {
  // myObj = new MyObject(20, 20, 20, 20);
  gameField = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 2, 1, 0, 0, 0, 0],
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
        fill("red");
        rect(r * oneSqSize, c * oneSqSize, oneSqSize, oneSqSize);
      } else if (e == 2) {
        fill("blue");
        rect(r * oneSqSize, c * oneSqSize, oneSqSize, oneSqSize);
      }
    });
  });
  // myObj.update();
  // myObj.draw();
  // drawGrid();
  // select("#score").html(score);
  // console.log(x);
}

function mouseClicked() {
  // Code to run.
  toggleCurrentColorMove();
  console.log(mouseX, mouseY);
  const theC = Math.floor(mouseX / oneSqSize);
  const theR = Math.floor(mouseY / oneSqSize);
  // gameField[theR][theC] = currentColor;
  putPieceToBottom(theC);
  console.log(theR, theC, currentColor);
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
  console.log(currentColorMove);
  // console.log(currentColorMove.textContent);
  if (currentColorMove.textContent == "RED") {
    currentColor = 2;
    currentColorMove.textContent = "BLUE";
  } else if (currentColorMove.textContent == "BLUE") {
    currentColor = 1;
    currentColorMove.textContent = "RED";
  }
}
