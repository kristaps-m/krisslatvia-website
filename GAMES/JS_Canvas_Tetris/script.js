const canvas = document.getElementById("tetris_canvas");
const ctx = canvas.getContext("2d");
const size = 20;

// ctx.fillRect(10, 10, 10, 10);
const gw = canvas.width / size;
const gh = canvas.height / size;

const gameField = []; // [][]

for (let row = 0; row < gw; row++) {
  const temp = [];
  for (let col = 0; col < gh; col++) {
    temp.push(0);
  }
  gameField.push(temp);
}

// gameField.map((x, i) => ([]));
gameField[gameField.length - 1] = [1, 1, 1, 1, 1, 1, 1, 1];

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
  constructor(sp, pieceArr) {
    this.sp = sp; // {x,y}
    this.arr = pieceArr; // int[][][];
    this.activeArrIndex = 0;
    this.activeArr = this.arr[this.activeArrIndex];
  }

  draw() {
    ctx.fillStyle = "black";
    this.activeArr.forEach((row, ri) => {
      row.forEach((elem, ci) => {
        if (elem == 1) {
          ctx.fillRect(
            ci * size + 1 + this.sp.x,
            ri * size + 1 + this.sp.y,
            size - 2,
            size - 2,
          );
        }
      });
    });
  }

  updateDown() {
    this.sp.y += 1;
    if (this.sp.y > 260 - size) {
      this.sp.y = 260 - size;
    }
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
const pph = new PuzzlePiece({ x: 120, y: 10 }, house);

window.addEventListener("keypress", (e) => {
  //   pph.activeArrIndex++;
  if (e.key == "d") {
    pph.rotateClockwise();
  } else if (e.key == "a") {
    pph.rotateCounterClockwise();
  }
  pph.activeArr = pph.arr[pph.activeArrIndex];
  console.log(e.key);
});

function drawField() {
  ctx.fillStyle = "lightgray";
  for (let row = 0; row < gw; row++) {
    for (let col = 0; col < gh; col++) {
      if (gameField[col][row] == 1) {
        ctx.fillRect(row * size + 1, col * size + 1, size - 2, size - 2);
      }
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
