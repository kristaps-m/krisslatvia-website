const CANVAS = document.getElementById("theCanvas");
const CTX = CANVAS.getContext("2d");
// field = 23 * 23
const W = 575,
  H = 575;
const bManMovementSpeed = 2;
CANVAS.width = W;
CANVAS.height = H;

const bManRadius = 25; //25;
const explosionAnimationTime = 1000; // MS
const bombExlpoldesDelayTIme = 2000; // MS
const bomberMan = new BomberMan({
  x: 0 + 1,
  y: 0 + 1,
  size: bManRadius - 4,
});
let randomXandYforLevelexit = {};

let listOfBombs = new ListOfBombs();
let listOfExplosions = new ListOfExplosions();
let listOfEnemies = [
  new Enemy({x:bManRadius * 12 + 2, y:bManRadius * 12 + 2, size:bManRadius - 5, enemyMovement:"v"}),
  new Enemy({x:bManRadius * 6 + 2, y: bManRadius * 16 + 2, size: bManRadius - 5, enemyMovement: "h"}),
  new Enemy({x:bManRadius * 3 + 2, y:bManRadius * 22 + 2, size:bManRadius - 5, enemyMovement:"h", start:bManRadius * 3, end:bManRadius * 12}),
  new Enemy({x:bManRadius * 22 + 2, y:bManRadius * 5 + 2, size:bManRadius - 5, enemyMovement:"v", start:bManRadius * 5, end:bManRadius * 17}),
  new Enemy({x: bManRadius * 22 + 2, y: bManRadius * 22 + 2, size: bManRadius - 5}),
  // SUPER ENEMY ?! :)
  new Enemy({x:bManRadius * 6 + 2, y:bManRadius * 8 + 2, size:bManRadius - 5, enemyMovement:"h", speed:10}),
];

// firstTestGameField add random walls :)
addRandomWallsToMainGameField();
// console.log(randomXandYforLevelexit);
// adds LevelExit (green square) behind random wall;
const levelExit = new LevelExit(bManRadius * randomXandYforLevelexit.y, bManRadius * randomXandYforLevelexit.x);
// countWalls();

let isGameOver = false;
let vxl = 0; // velocity x left
let vxr = 0; // velocity x right
let vyu = 0; // v y up
let vyd = 0; // v y down

let theGameField = new GameField(firstTestGameField);
// console.log(firstTestGameField.length, firstTestGameField[0].length, "len' s");
let theGameFrame = 0;
let isBombPlaced = false;
function BMgameLoop() {
  CTX.clearRect(0, 0, W, H);
  levelExit.draw();
  theGameField.draw();
  bomberMan.update();
  bomberMan.draw();
  listOfEnemies.forEach((badMan) => {
    badMan.update();
    badMan.draw();
    if (
      bomberMan.x + bomberMan.size > badMan.x &&
      bomberMan.y + bomberMan.size > badMan.y &&
      bomberMan.y < badMan.y + badMan.size &&
      bomberMan.x < badMan.x + badMan.size
    ) {
      console.log("GAME OVER?!?!?!");
      isGameOver = true;
    }
  });
  listOfBombs.drawBombs();
  listOfExplosions.drawExplosions();

  if(!isGameOver && listOfEnemies.length === 0 && isPlayerInLevelexit(bomberMan, levelExit)){
    let fSize = 65;
    CTX.font = `italic bold ${fSize}px Comic Sans MS`;
    CTX.fillStyle = "#25B420";
    CTX.fillText("VICTORY", 50, H / 2);
    CTX.fillText("Teleporting to....", 50, H / 2 + 75);
    CTX.fillText("Next level", 50, H / 2 + 150);
  }

  if (!isGameOver) {
    requestAnimationFrame(BMgameLoop);
  } else {
    let fSize = 55;
    CTX.font = `italic bold ${fSize}px Comic Sans MS`;
    CTX.fillStyle = "#25B420";
    CTX.fillText("GAME OVER", W / 4, H / 2);
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
