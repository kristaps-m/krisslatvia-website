const CANVAS = document.getElementById('minesweeper');
const CTX = CANVAS.getContext('2d');
const CANVAS_TIMER = document.getElementById('theTimer');
const CTX_TIMER = CANVAS_TIMER.getContext('2d');
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;
const CELL_OFF_SET = 1; // line around each drawn square
let isGameOver = false;
let isPaused = true;
let withFirstClickYouCanHitMine = false;
let difficulty = document.getElementById("difficulty").value.split(" ");
let gameFieldHeight = parseInt(document.getElementById("theHeight").value = difficulty[0]);
let gameFieldWidth = parseInt(document.getElementById("theWidth").value = difficulty[1]);
let minesInDaGame = parseInt(document.getElementById("minesCount").value = difficulty[2]);
document.getElementById('minesLeft').textContent = minesInDaGame;
// let elemLeft = CANVAS.offsetLeft;
// let elemTop = CANVAS.offsetTop;
let minesweeperCells = [];
let MS_Reveal_Cells = [];
let gameFieldForLogic = [];
let msHandler;
let gameTimer = 1;
let cheat = [], isCheatEnabled = false;
function setGameSettingsFromDropDownMenu(){
  difficulty = document.getElementById("difficulty").value.split(" ");
  document.getElementById("theHeight").value = difficulty[0];
  document.getElementById("theWidth").value = difficulty[1];
  document.getElementById("minesCount").value = difficulty[2];
}

msHandler = new MineSweeperCellsHander();
gameMinesHandler = new GamesMinesHandler();
msHandler.createMinesSweeperClickableCellsAddObjectToGameLogicArr();
if(withFirstClickYouCanHitMine){ // defaul = false (so first click will never be mine!)
  // if false, mines will be generated randomly
  let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
  let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
  gameFieldForLogic = [...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rRow, rCol)];
  gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
}

function newGame(){
  CTX.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  CTX_TIMER.clearRect(0,0,100,30);
  minesweeperCells = [];
  MS_Reveal_Cells = [];
  gameFieldForLogic = [];
  cheat = []
  gameTimer = 1;
  isGameOver = false;isCheatEnabled = false;
  isPaused = true;
  gameFieldHeight = parseInt(document.getElementById("theHeight").value);
  gameFieldWidth = parseInt(document.getElementById("theWidth").value);
  minesInDaGame = parseInt(document.getElementById("minesCount").value);
  document.getElementById('minesLeft').textContent = minesInDaGame;
  msHandler.createMinesSweeperClickableCellsAddObjectToGameLogicArr();
  if(withFirstClickYouCanHitMine){ // defaul = false (so first click will never be mine!)
    // if false, mines will be generated randomly
    let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
    let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
    gameFieldForLogic = [...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rRow, rCol)];
    gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
  }
  renderCellsFunction(transformArray(minesweeperCells));
}

document.addEventListener("keyup", (e) => {
  if(!isPaused){
    cheat.push(e.key);
    if(cheatIfCheatEntered()){
      isCheatEnabled = !isCheatEnabled;
      console.log(`CHEAT ${isCheatEnabled ? 'EN' : 'DIS'}ABLED`)
      gameMinesHandler.supCheat(gameFieldForLogic);
      cheat = [];
    }
  }
})

CANVAS.addEventListener('click', function(event) {
  // Get the bounding rectangle of the canvas
  const rect = CANVAS.getBoundingClientRect();

  isPaused = false;
  // let xHor = event.pageX - elemLeft; // Horizontal Canvas Axis
  // let yVert = event.pageY - elemTop  - 74; // Vertical Canvas Axis
  // Calculate the click position relative to the canvas
  let xHor = (event.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
  let yVert = (event.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
  console.log(xHor,yVert);
  let rowIndxClick = Math.floor(yVert / (CANVAS_WIDTH / gameFieldHeight));
  let colIndxClick = Math.floor(xHor / (CANVAS_HEIGHT / gameFieldWidth));
  console.log(rowIndxClick, colIndxClick);
  if(withFirstClickYouCanHitMine){ // defaul = false (so first click will never be mine!)
    // if false, mines will be generated randomly
    let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
    let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
    gameFieldForLogic = [...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rRow, rCol)];
    gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
  }else{
    // row & col you clicked on field will NEVER be mine. So you always win if H=10, W=10, mines=99;
    gameFieldForLogic = [...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rowIndxClick, colIndxClick)];
    gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
  }
  if(!isGameOver){

  minesweeperCells.forEach(function(cell) {
    if(yVert > cell.top && yVert < cell.top + cell.height && xHor > cell.left && xHor < cell.left + cell.width){
      // yVert in line below is fliped with xHor else do not work.
      let CELL_CLICKED = gameFieldForLogic[Math.floor(yVert / (CANVAS_WIDTH / gameFieldHeight) )][Math.floor(xHor / (CANVAS_HEIGHT / gameFieldWidth))]
      // Cell reaveal ...
      if(!CELL_CLICKED.isFlaged && CELL_CLICKED.isMine){
        gameOverAllMinesReveal(gameFieldForLogic);
        CTX.fillStyle = 'darkred';
        CTX.fillRect(cell.left, cell.top, cell.width, cell.height);
        isGameOver = true;
        isPaused = true;
        alert("GAME OVER");
      }else{
        const TEMP_MINE_FIELD = [...gameFieldForLogic];
        const QUEUE = [{...CELL_CLICKED}];

        while (QUEUE.length > 0){
          const CURRENT_CELL = QUEUE.pop();

          if(CURRENT_CELL){
            const {row, col} = CURRENT_CELL;
            if(!TEMP_MINE_FIELD[row][col].isOpen && !TEMP_MINE_FIELD[row][col].isFlaged){
              TEMP_MINE_FIELD[row][col] = {
                ...TEMP_MINE_FIELD[row][col],
                isOpen: true,
              };
              MS_Reveal_Cells.push({...TEMP_MINE_FIELD[row][col], squareRender:{...TEMP_MINE_FIELD[row][col].squareRender, colour: 'gray'}});
              // If the neighboring mines count is 0, add adjacent cells to the queue
              if (TEMP_MINE_FIELD[row][col].minesAround === 0 && !TEMP_MINE_FIELD[row][col].isFlaged){
                // Define adjacent positions
                const DIRECTIONS = [
                  { row: -1, col: 0 },
                  { row: 1, col: 0 },
                  { row: 0, col: -1 },
                  { row: 0, col: 1 },
                  // Define Corner positions
                  { row: -1, col: -1 },
                  { row: 1, col: 1 },
                  { row: -1, col: 1 },
                  { row: 1, col: -1 },
                ];

                  // Add adjacent cells to the queue
                  for (const direction of DIRECTIONS) {
                    const NEW_ROW = row + direction.row;
                    const NEW_COL = col + direction.col;

                    if (
                      NEW_ROW >= 0 &&
                      NEW_ROW < TEMP_MINE_FIELD.length &&
                      NEW_COL >= 0 &&
                      NEW_COL < TEMP_MINE_FIELD[0].length
                    ) {
                      QUEUE.push({ row: NEW_ROW, col: NEW_COL });
                    }
                  }
              }
            }
          }
        }
      }
    }
  })
  }

  renderCellsFunction(MS_Reveal_Cells);
  MS_Reveal_Cells = []
  if(msHandler.checkIfGameWon(gameFieldForLogic, minesInDaGame)){
    isGameOver= true;
    isPaused = true;
    alert("YOU WON!");
  }

},false);

CANVAS.addEventListener('contextmenu', function(event) {
    // Get the bounding rectangle of the canvas
    const rect = CANVAS.getBoundingClientRect();

    event.preventDefault(); // Prevent the default context menu from appearing
    // let x = event.pageX - elemLeft;
    // let y = event.pageY - elemTop   - 74;
    // Calculate the click position relative to the canvas
    let x = (event.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
    let y = (event.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y

    if(!isPaused){
      // Determine the cell clicked based on coordinates
      minesweeperCells.forEach(function(cell) {
          if(y > cell.top && y < cell.top + cell.height && x > cell.left && x < cell.left + cell.width){
              // yVert in line below is fliped with xHor else do not work.
              let CELL_CLICKED = gameFieldForLogic[Math.floor(y / (CANVAS_WIDTH / gameFieldHeight) )][Math.floor(x / (CANVAS_HEIGHT / gameFieldWidth))]
              // Flag the cell
              if (!CELL_CLICKED.isOpen && !CELL_CLICKED.isFlaged) {
                  gameFieldForLogic[CELL_CLICKED.row][CELL_CLICKED.col] = {...CELL_CLICKED, isFlaged: true}; // Toggle the flagged state
                  CTX.font = "bold 15px Comic Sans MS";
                  CTX.textAlign = "center"; CTX.fillStyle = "green";
                  const textX = cell.left + cell.width / 2;
                  const textY = cell.top + cell.height / 2 + CELL_OFF_SET * 3;
                  CTX.fillText("F", textX, textY);
              }else if(!CELL_CLICKED.isOpen && CELL_CLICKED.isFlaged){
                  gameFieldForLogic[CELL_CLICKED.row][CELL_CLICKED.col] = {...CELL_CLICKED, isFlaged: false}; // Toggle the flagged state
                  CTX.fillStyle = 'pink';
                  CTX.fillRect(CELL_CLICKED.squareRender.left, CELL_CLICKED.squareRender.top, CELL_CLICKED.squareRender.width, CELL_CLICKED.squareRender.height);
              }
              return; // Exit the loop after flagging the cell
          }
      });
    }

    // In two lines be low we set new value to Mines left every time we right click field :)
    let minesFlaged = gameMinesHandler.minesFlagedOnField(gameFieldForLogic);
    document.getElementById('minesLeft').textContent = minesInDaGame - minesFlaged;
});


// render cells
function renderCellsFunction(cellsToDraw){
  cellsToDraw.forEach(function(cell) {
    CTX.fillStyle = cell.squareRender.colour;
    CTX.fillRect(
      cell.squareRender.left,
      cell.squareRender.top,
      cell.squareRender.width,
      cell.squareRender.height);
    if(cell.minesAround > 0){
      CTX.font = "bold 15px Comic Sans MS";
      CTX.textAlign = "center"; CTX.fillStyle = "black";
      const textX = cell.squareRender.left + cell.squareRender.width / 2;
      const textY = cell.squareRender.top + cell.squareRender.height / 2 + CELL_OFF_SET * 3;
      CTX.fillText(cell.minesAround, textX, textY);
    }
  })
}
function gameOverAllMinesReveal(cellsToDraw){
  for (let row = 0; row < cellsToDraw.length; row++) {
    for (let col = 0; col < cellsToDraw[0].length; col++) {
      const CELL = cellsToDraw[row][col];
      if(CELL.isMine){
        CTX.fillStyle = 'red';
        CTX.fillRect(CELL.squareRender.left, CELL.squareRender.top, CELL.squareRender.width, CELL.squareRender.height);
      }
    }
  }
}

renderCellsFunction(transformArray(minesweeperCells));

function transformArray(theArray){
  let newArray = []
  theArray.forEach((c) => {
    newArray.push({squareRender: {...c}});
  })

  return newArray;
}

setInterval(() => {
  if(!isPaused){
    CTX_TIMER.clearRect(0,0,100,30);
    updateGameTimer()
    gameTimer++;
    if(gameTimer % 20 === 0){cheat = []}
  }
}, 1000);

// GAME TIMER
function updateGameTimer(){
  CTX_TIMER.font = "bold 25px Comic Sans MS";
  CTX_TIMER.textAlign = "center"; CTX_TIMER.fillStyle = "red";
  const textX = 50;
  const textY = 25;
  CTX_TIMER.fillText(gameTimer, textX, textY);
}

// check cheat
function cheatIfCheatEntered(){
  if(cheat.join("").includes("kivi apelsins")){
    return true;
  }

  return false;
}

function toggleIsFirstClickMine(){
  withFirstClickYouCanHitMine = !withFirstClickYouCanHitMine;
  var firstClick = document.getElementById('isFirstClickMine');
  firstClick.textContent = `${withFirstClickYouCanHitMine}`;
}