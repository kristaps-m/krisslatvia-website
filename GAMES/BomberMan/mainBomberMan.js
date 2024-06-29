const CANVAS = document.getElementById("theCanvas");
const CTX = CANVAS.getContext("2d");
// field = 23 * 23
const W = 575,
  H = 575;
const bManMovementSpeed = 3;
CANVAS.width = W;
CANVAS.height = H;

const bManRadius = 25; //25;
const bomberMan = new BomberMan({
  x: 0 + 1,
  y: 0 + 1,
  size: bManRadius - 2,
});

const enemy = new Enemy(
  bManRadius * 12 + 2,
  bManRadius * 12 + 2,
  bManRadius - 5
);

let isGameOver = false;
let vxl = 0; // velocity x left
let vxr = 0; // velocity x right
let vyu = 0; // v y up
let vyd = 0; // v y down

let theGameField = new GameField(firstTestGameField);
console.log(firstTestGameField.length, firstTestGameField[0].length, "len' s");
let theGameFrame = 0;
let isBombPlaced = false;
function BMgameLoop() {
  CTX.clearRect(0, 0, W, H);
  theGameField.draw();
  bomberMan.update();
  bomberMan.draw();
  enemy.draw();
   if(isBombPlaced){
    if(theGameFrame > 400){
      for (let i = 0; i < firstTestGameField.length; i++) {
        for (let j = 0; j < firstTestGameField[0].length; j++) {
          if(firstTestGameField[i][j] === 3){
            firstTestGameField[i][j] = 0
          }
        }

      }
      theGameFrame = 0;
      isBombPlaced = false;
    }
  }
  if (
    bomberMan.x + bomberMan.size > enemy.x &&
    bomberMan.y + bomberMan.size > enemy.y &&
    bomberMan.y < enemy.y + enemy.size &&
    bomberMan.x < enemy.x + enemy.size
  ) {
    console.log("GAME OVER?!?!?!");
  }
  if (!isGameOver) {
    requestAnimationFrame(BMgameLoop);
  } else {
    let fSize = 55;
    CTX.font = `italic bold ${fSize}px Comic Sans MS`;
    CTX.fillText("GAME OVER", W / 2, H / 2);
  }
  // console.log(theGameFrame);
  theGameFrame++;
}

BMgameLoop();

document.addEventListener("keydown", function (e) {
  const direction = e.key;
  bomberMan.moveKeyDown(direction);
});

document.addEventListener("keyup", function (e) {
  const direction = e.key;
  bomberMan.moveKeyUp(direction);
});
