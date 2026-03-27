const canvas = document.getElementById("tetris_canvas");
const ctx = canvas.getContext("2d");
const size = 20;

// ctx.fillRect(10, 10, 10, 10);
const gw = canvas.width / size;
const gh = canvas.height / size;

const gameField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
]; // [][]

// for (let row = 0; row < gw; row++) {
//   const temp = [];
//   for (let col = 0; col < gh; col++) {
//     temp.push(0);
//   }
//   gameField.push(temp);
// }

// gameField.map((x, i) => ([]));
// gameField[gameField.length - 1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];
console.log(gameField);
const square = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
];

const long = [
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
];

const house = [
  [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
  ],
];

class PuzzlePiece {
  constructor(sp, pieceArr, gameField) {
    this.sp = sp; // {x,y}
    this.arr = pieceArr; // int[][][];
    this.activeArrIndex = 0;
    this.activeArr = this.arr[this.activeArrIndex];
    this.gameField = gameField;
    this.canBeRotated = true;
  }

  draw() {
    this.activeArr.forEach((row, ri) => {
      row.forEach((elem, ci) => {
        if (elem == 1) {
          ctx.fillStyle = "black";
          ctx.fillRect(
            ci * size + 1 + this.sp.x,
            ri * size + 1 + this.sp.y,
            size - 2,
            size - 2,
          );
          ctx.fillStyle = "red";
          ctx.fillText(
            `${Math.floor(this.sp.x / size)}, ${Math.floor(this.sp.y / size)}`,
            ci * size + 1 + this.sp.x,
            ri * size + 1 + this.sp.y,
          );
        }
      });
    });
  }

  updateDown() {
    // const y = Math.floor(this.sp.y / size);
    // console.log(y);
    this.sp.y += 0.4;
    this.didItTouch();
    if (this.sp.y > 260 - size) {
      this.sp.y = 260 - size;
    }
  }

  didItTouch() {
    const x = Math.floor(this.sp.x / size); // gw //ci * size + 1 + this.sp.x;
    const y = Math.floor((this.sp.y + 40) / size); //ri * size + 1 + this.sp.y;
    console.log(x, y);
    const square = this.gameField[x][y];
    if (square === 1) {
      console.log("WE HAVE A HIT");
    }
    // this.activeArr.forEach((row, ri) => {
    //   row.forEach((elem, ci) => {
    //     // 400 , 20, y = 156
    //     if (elem == 1) {
    //       //
    //     }
    //   });
    // });
  }

  rotateClockwise() {
    // 00, 01, 02, 03   30, 20, 10, 00
    // 10, 11, 12, 13   31, 21, 11, 01
    // 20, 21, 22, 23   32, 22, 12, 02
    // 30, 31, 32, 33   33, 23, 13, 03
    this.activeArrIndex++;
    if (this.activeArrIndex >= 4) {
      this.activeArrIndex = 0;
    }
  }

  rotateCounterClockwise() {
    this.activeArrIndex--;
    if (this.activeArrIndex < 0) {
      this.activeArrIndex = 3;
    }
  }
}

const pps = new PuzzlePiece({ x: 10, y: 10 }, square);
const ppl = new PuzzlePiece({ x: 80, y: 80 }, long);
const pph = new PuzzlePiece({ x: 120, y: 10 }, house, gameField);

window.addEventListener("keypress", (e) => {
  //   pph.activeArrIndex++;
  if (e.key == "d") {
    pph.rotateClockwise();
  } else if (e.key == "a") {
    pph.rotateCounterClockwise();
  }
  pph.activeArr = pph.arr[pph.activeArrIndex];
  // console.log(e.key);
});

function drawField() {
  for (let row = 0; row < gw; row++) {
    for (let col = 0; col < gh; col++) {
      if (gameField[col][row] == 1) {
        ctx.fillStyle = "lightgray";
        ctx.fillRect(row * size + 1, col * size + 1, size - 2, size - 2);
      }
      ctx.fillStyle = "blue";
      ctx.fillText(`.-${col}`, row * size + 1, col * size + 1);
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   pps.draw();
  drawField();
  pph.draw();
  pph.updateDown();
  //   if (Math.random() > 0.95) {
  //     pph.rotate();
  //     console.log(pph.activeArrIndex);
  //   }
  //   ppl.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
