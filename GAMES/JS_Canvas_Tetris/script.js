const canvas = document.getElementById("tetris_canvas");
const ctx = canvas.getContext("2d");

// ctx.fillRect(10, 10, 10, 10);

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

const size = 20;
class PuzzlePiece {
  constructor(sp, pieceArr) {
    this.sp = sp; // {x,y}
    this.arr = pieceArr; // int[][][];
    this.activeArrIndex = 0;
    this.activeArr = this.arr[this.activeArrIndex];
  }

  draw() {
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

  rotate() {
    // 00, 01, 02, 03   30, 20, 10, 00
    // 10, 11, 12, 13   31, 21, 11, 01
    // 20, 21, 22, 23   32, 22, 12, 02
    // 30, 31, 32, 33   33, 23, 13, 03
    // for (let r = 0; r < this.arr.length; r++) {
    //   for (let c = 0; c < this.arr[0].length; c++) {
    //     // const e = array[r][c];
    //     this.arr[r][c] = this.arr[3 - c][r];
    //   }
    // }
    this.activeArrIndex++;
    if (this.activeArrIndex >= 4) {
      this.activeArrIndex = 0;
    }
  }
}

const pps = new PuzzlePiece({ x: 10, y: 10 }, square);
const ppl = new PuzzlePiece({ x: 80, y: 80 }, long);
const pph = new PuzzlePiece({ x: 120, y: 10 }, house);

window.addEventListener("keypress", (e) => {
  pph.rotate();
  //   pph.activeArrIndex++;
  pph.activeArr = pph.arr[pph.activeArrIndex];
  console.log(e.key);
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   pps.draw();
  pph.draw();
  //   if (Math.random() > 0.95) {
  //     pph.rotate();
  //     console.log(pph.activeArrIndex);
  //   }
  //   ppl.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
