const CANVAS = document.getElementById("minesweeper");
const CTX = CANVAS.getContext("2d");
const CANVAS_TIMER = document.getElementById("theTimer");
const CTX_TIMER = CANVAS_TIMER.getContext("2d");
let difficulty = document.getElementById("difficulty").value.split(" ");
const isInsaneDifficulty = difficulty.join(",") === "30,30,150"; // values from html file
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
let gameFieldHeight = parseInt((document.getElementById("theHeight").value = difficulty[0]));
let gameFieldWidth = parseInt((document.getElementById("theWidth").value = difficulty[1]));
let minesInDaGame = parseInt((document.getElementById("minesCount").value = difficulty[2]));
document.getElementById("minesLeft").textContent = minesInDaGame;
// let elemLeft = CANVAS.offsetLeft;
// let elemTop = CANVAS.offsetTop;
// let minesweeperCells = []; // Why am using these two :@ #1
let MS_Reveal_Cells = [];
// seams like I have fixed fact that I had two lists for rendering cells
let gameFieldForLogic = []; // Why am using these two :@ #2
let msHandler;
let gameTimer = 1;
let cheat = [];
let isCheatEnabled = false;
const cheatSquareSidePx = 220;
const cheatSquareOffSet = 20;
let cheatKeyDown = false;

msHandler = new MineSweeperCellsHander();
gameMinesHandler = new GamesMinesHandler();
msHandler.createMinesSweeperClickableCellsAddObjectToGameLogicArr();

if (withFirstClickYouCanHitMine) {
  // defaul = false (so first click will never be mine!)
  // if false, mines will be generated randomly
  let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
  let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
  gameFieldForLogic = [
    ...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rRow, rCol),
  ];
  gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
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
      ...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rRow, rCol),
    ];
    gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
  }
  renderCellsFunction(gameFieldForLogic);
}

document.addEventListener("keyup", (e) => {
  if (!isPaused) {
    cheat.push(e.key);
    if (cheatIfCheatEntered()) {
      isCheatEnabled = !isCheatEnabled;
      console.log(`CHEAT ${isCheatEnabled ? "EN" : "DIS"}ABLED`);
      // gameMinesHandler.supCheat(gameFieldForLogic);
      renderCellsFunction(gameFieldForLogic);
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
  // CTX.fillStyle = "black";
  // CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  cellsToDraw.forEach((row) => {
    // console.log(row);
    row.forEach((cell) => {
      const textX = cell.squareRender.left + cell.squareRender.width / 2;
      const textY = cell.squareRender.top + cell.squareRender.height / 2 + CELL_OFF_SET * 3;
      CTX.fillStyle = "black";
      CTX.fillRect(
        cell.squareRender.left - 2,
        cell.squareRender.top - 2,
        cell.squareRender.width + 2,
        cell.squareRender.height + 2
      );
      CTX.fillStyle = cell.isOpen ? "gray" : "pink"; //cell.squareRender.colour;
      CTX.fillRect(
        cell.squareRender.left,
        cell.squareRender.top,
        cell.squareRender.width,
        cell.squareRender.height
      );
      if (isCheatEnabled) {
        CTX.fillStyle = "#ff64e2";
        if (cell.isMine === true) {
          CTX.fillRect(cell.squareRender.left + 2, cell.squareRender.top + 2, 6, 6);
        }
      }

      if (cell.minesAround > 0 && cell.isOpen) {
        CTX.font = "bold 15px Comic Sans MS";
        CTX.textAlign = "center";
        CTX.fillStyle = "black";
        CTX.fillText(cell.minesAround, textX, textY);
      }
      if (!cell.isOpen && cell.isFlaged) {
        CTX.fillText("🚩", textX, textY);
      }
    });
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

// renderCellsFunction(transformArray(minesweeperCells));
renderCellsFunction(gameFieldForLogic);

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

CANVAS.addEventListener("mousemove", (event) => {
  if (cheatKeyDown && !isGameOver) {
    renderCellsFunction(gameFieldForLogic);
    const rect = CANVAS.getBoundingClientRect();
    // Calculate the click position relative to the canvas
    let x = (event.clientX - rect.left) * (CANVAS.width / rect.width) - cheatSquareOffSet; // Normalize x
    let y = (event.clientY - rect.top) * (CANVAS.height / rect.height) - cheatSquareOffSet; // Normalize y
    CTX.strokeStyle = "black";
    CTX.lineWidth = 2;
    CTX.beginPath();
    CTX.rect(x, y, cheatSquareSidePx - cheatSquareOffSet, cheatSquareSidePx - cheatSquareOffSet);
    CTX.stroke();
    isCellsInsideSquare(gameFieldForLogic, x, y);
  } else if (!cheatKeyDown && !isGameOver) {
    renderCellsFunction(gameFieldForLogic);
    // gameMinesHandler.supCheat(gameFieldForLogic);
  }
});

function isCellsInsideSquare(a, mx, my) {
  a.forEach((r) => {
    r.forEach((c) => {
      const cs = c.squareRender;
      if (
        cs.left > mx &&
        cs.top > my &&
        cs.left + cs.width < mx + cheatSquareSidePx - cheatSquareOffSet &&
        cs.top + cs.height < my + cheatSquareSidePx - cheatSquareOffSet
      ) {
        CTX.strokeStyle = "red";
        CTX.lineWidth = 3;
        CTX.beginPath();
        CTX.rect(cs.left, cs.top, cs.width, cs.height);
        CTX.stroke();
        // -----------
        if (c.minesAround > 0 && !c.isMine) {
          CTX.font = "bold 15px Comic Sans MS";
          CTX.textAlign = "center";
          CTX.fillStyle = "black";
          const textX = c.squareRender.left + c.squareRender.width / 2;
          const textY = c.squareRender.top + c.squareRender.height / 2 + CELL_OFF_SET * 3;
          CTX.fillText(c.minesAround, textX, textY);
        } else if (c.isMine) {
          CTX.fillStyle = "darkblue";
          const bSqOffS = 5;
          CTX.fillRect(
            cs.left + bSqOffS,
            cs.top + bSqOffS,
            cs.width - bSqOffS * 2,
            cs.height - bSqOffS * 2
          );
        }
      }
    });
  });
}

const keysPressed = {};

window.addEventListener("keydown", (event) => {
  keysPressed[event.key.toLowerCase()] = true;

  if (keysPressed["q"] && keysPressed["t"]) {
    cheatKeyDown = true;
  }
});

window.addEventListener("keyup", (event) => {
  keysPressed[event.key.toLowerCase()] = false;
  cheatKeyDown = false;
});
