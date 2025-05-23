const CANVAS = document.getElementById("minesweeper");
const CTX = CANVAS.getContext("2d");
const CANVAS_TIMER = document.getElementById("theTimer");
const CTX_TIMER = CANVAS_TIMER.getContext("2d");
let difficulty = document.getElementById("difficulty").value.split(" ");
const isInsaneDifficulty = difficulty.join(",") === "30,30,150"; // vlues from html file
const defaultWandH = 500;
let CANVAS_WIDTH = defaultWandH;
let CANVAS_HEIGHT = defaultWandH;
CANVAS.width = !isInsaneDifficulty ? CANVAS_WIDTH : 800;
CANVAS.height = !isInsaneDifficulty ? CANVAS_HEIGHT : 800;
const CELL_OFF_SET = 1; // line around each drawn square
let isGameOver = false;
let isPaused = true;
let withFirstClickYouCanHitMine = false;
let doesClickDigs = true;
let gameFieldHeight = parseInt(
  (document.getElementById("theHeight").value = difficulty[0])
);
let gameFieldWidth = parseInt(
  (document.getElementById("theWidth").value = difficulty[1])
);
let minesInDaGame = parseInt(
  (document.getElementById("minesCount").value = difficulty[2])
);
document.getElementById("minesLeft").textContent = minesInDaGame;
// let elemLeft = CANVAS.offsetLeft;
// let elemTop = CANVAS.offsetTop;
let minesweeperCells = [];
let MS_Reveal_Cells = [];
let gameFieldForLogic = [];
let msHandler;
let gameTimer = 1;
let cheat = [],
  isCheatEnabled = false;

msHandler = new MineSweeperCellsHander();
gameMinesHandler = new GamesMinesHandler();
msHandler.createMinesSweeperClickableCellsAddObjectToGameLogicArr();

if (withFirstClickYouCanHitMine) {
  // defaul = false (so first click will never be mine!)
  // if false, mines will be generated randomly
  let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
  let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
  gameFieldForLogic = [
    ...gameMinesHandler.addMinesToField(
      minesInDaGame,
      gameFieldForLogic,
      rRow,
      rCol
    ),
  ];
  gameFieldForLogic = [
    ...gameMinesHandler.addMineCountNumbers(gameFieldForLogic),
  ];
}

function newGame() {
  gameFieldHeight = parseInt(document.getElementById("theHeight").value);
  gameFieldWidth = parseInt(document.getElementById("theWidth").value);
  minesInDaGame = parseInt(document.getElementById("minesCount").value);
  const isInsaneDifficulty =
    `${gameFieldHeight},${gameFieldWidth},${minesInDaGame}` === "30,30,150";
  CANVAS_WIDTH = !isInsaneDifficulty ? defaultWandH : 800;
  CANVAS_HEIGHT = !isInsaneDifficulty ? defaultWandH : 800;
  CANVAS.width = CANVAS_WIDTH;
  CANVAS.height = CANVAS_HEIGHT;
  CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  CTX_TIMER.clearRect(0, 0, 100, 30);
  minesweeperCells = [];
  MS_Reveal_Cells = [];
  gameFieldForLogic = [];
  cheat = [];
  gameTimer = 1;
  isGameOver = false;
  isCheatEnabled = false;
  isPaused = true;
  document.getElementById("minesLeft").textContent = minesInDaGame;
  msHandler.createMinesSweeperClickableCellsAddObjectToGameLogicArr();
  if (withFirstClickYouCanHitMine) {
    // defaul = false (so first click will never be mine!)
    // if false, mines will be generated randomly
    let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
    let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
    gameFieldForLogic = [
      ...gameMinesHandler.addMinesToField(
        minesInDaGame,
        gameFieldForLogic,
        rRow,
        rCol
      ),
    ];
    gameFieldForLogic = [
      ...gameMinesHandler.addMineCountNumbers(gameFieldForLogic),
    ];
  }
  renderCellsFunction(transformArray(minesweeperCells));
}

document.addEventListener("keyup", (e) => {
  if (!isPaused) {
    cheat.push(e.key);
    if (cheatIfCheatEntered()) {
      isCheatEnabled = !isCheatEnabled;
      console.log(`CHEAT ${isCheatEnabled ? "EN" : "DIS"}ABLED`);
      gameMinesHandler.supCheat(gameFieldForLogic);
      cheat = [];
    }
  }
});

CANVAS.addEventListener(
  "click",
  function (event) {
    if (!isGameOver) {
      isPaused = false;
    }

    if (doesClickDigs) {
      mainLeftClick(event);
    } else if (!doesClickDigs) {
      putFlagInCell(event);
    }
  },
  false
);

CANVAS.addEventListener("contextmenu", function (event) {
  putFlagInCell(event);
});

// render cells
function renderCellsFunction(cellsToDraw) {
  cellsToDraw.forEach(function (cell) {
    CTX.fillStyle = cell.squareRender.colour;
    CTX.fillRect(
      cell.squareRender.left,
      cell.squareRender.top,
      cell.squareRender.width,
      cell.squareRender.height
    );
    if (cell.minesAround > 0) {
      CTX.font = "bold 15px Comic Sans MS";
      CTX.textAlign = "center";
      CTX.fillStyle = "black";
      const textX = cell.squareRender.left + cell.squareRender.width / 2;
      const textY =
        cell.squareRender.top + cell.squareRender.height / 2 + CELL_OFF_SET * 3;
      CTX.fillText(cell.minesAround, textX, textY);
    }
  });
}
function gameOverAllMinesReveal(cellsToDraw) {
  for (let row = 0; row < cellsToDraw.length; row++) {
    for (let col = 0; col < cellsToDraw[0].length; col++) {
      const CELL = cellsToDraw[row][col];
      if (CELL.isMine) {
        CTX.fillStyle = "red";
        CTX.fillRect(
          CELL.squareRender.left,
          CELL.squareRender.top,
          CELL.squareRender.width,
          CELL.squareRender.height
        );
      }
    }
  }
}

renderCellsFunction(transformArray(minesweeperCells));

setInterval(() => {
  if (!isPaused) {
    CTX_TIMER.clearRect(0, 0, 100, 30);
    updateGameTimer();
    gameTimer++;
    if (gameTimer % 20 === 0) {
      cheat = [];
    }
  }
}, 1000);
