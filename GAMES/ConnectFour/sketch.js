const W = 700;
const H = 600;
const gameRows = 6;
const gameCols = 7;
let myObj;
let gameField = [];

function setup() {
  myObj = new MyObject(20, 20, 20, 20);
  gameField = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 2, 0, 0, 0],
    [0, 1, 2, 1, 0, 0, 0],
    [1, 2, 2, 1, 2, 0, 0],
  ];
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
  gameField.forEach((row, c) => {
    row.forEach((e, r) => {
      /*
      00, 01, 02.. 06
      60, 61
      */
      if (e == 1) {
        fill("red");
        rect(r * 100, c * 100, 100, 100);
      } else if (e == 2) {
        fill("blue");
        rect(r * 100, c * 100, 100, 100);
      }
    });
  });
  // myObj.update();
  // myObj.draw();
  // drawGrid();
  // select("#score").html(score);
  // console.log(x);
}

// function drawGrid() {
// }
