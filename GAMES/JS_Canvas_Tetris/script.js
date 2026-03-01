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
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 0],
];

const size = 20;
class PuzzlePiece {
  constructor(sp, pieceArr) {
    this.sp = sp; // {x,y}
    this.arr = pieceArr;
  }

  draw() {
    this.arr.forEach((row, ri) => {
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
}

const pps = new PuzzlePiece({ x: 10, y: 10 }, square);
const ppl = new PuzzlePiece({ x: 80, y: 80 }, long);
const pph = new PuzzlePiece({ x: 120, y: 10 }, house);

function gameLoop() {
  pps.draw();
  ppl.draw();
  pph.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
