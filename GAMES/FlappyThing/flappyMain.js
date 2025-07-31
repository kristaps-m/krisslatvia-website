const CANVAS = document.getElementById("flappyCanvas");
const CTX = CANVAS.getContext("2d");

const W = 500;
const H = 500;
const PIPE_GAP = 160;
CANVAS.width = W;
CANVAS.height = H;

const newFlappy = new Flappy(10, 10, 20, 20);
let h1 = getRndInteger(0, H - PIPE_GAP);
let h2 = getRndInteger(0, H - PIPE_GAP);
let isGameOver = false;
const arrayOfPipes = [
  // pipe 1
  new Pipe(W / 2, 0, 15, h1),
  // pipe 2
  new Pipe(W - 20, 0, 15, h2),
];

function gameLoop() {
  if (!isGameOver) {
    CTX.clearRect(0, 0, W, H);

    newFlappy.update();
    newFlappy.draw();
    arrayOfPipes.forEach((p) => {
      p.update();
    });

    if (newFlappy.detectIfHitPipe(arrayOfPipes)) {
      console.log("GAME OVER");
      isGameOver = true;
    }
    arrayOfPipes.forEach((p) => {
      p.draw();
    });
    // if (newFlappy.y > H - 100) {
    //   newFlappy.jumpUp();
    // }
    // CTX.font = "italic bold 30px Comic Sans MS";
    // CTX.fillText(`${newFlappy.start}`, W - 80, 50);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("keyup", (e) => {
  const k = e.key;
  if (k === " ") {
    newFlappy.jumpUp();
  } else {
    newFlappy.jumpUp();
  }
});

window.addEventListener("click", (e) => {
  newFlappy.jumpUp();
});
