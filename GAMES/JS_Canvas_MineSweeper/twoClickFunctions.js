const DIRECTIONS = [
  // Define adjacent positions
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

// Main mouse1 (left click), for opening cells
function mainLeftClick(event) {
  // Get the bounding rectangle of the canvas
  const rect = CANVAS.getBoundingClientRect();

  // let xHor = event.pageX - elemLeft; // Horizontal Canvas Axis
  // let yVert = event.pageY - elemTop  - 74; // Vertical Canvas Axis
  // Calculate the click position relative to the canvas
  let xHor = (event.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
  let yVert = (event.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
  let rowIndxClick = Math.floor(yVert / (CANVAS_WIDTH / gameFieldHeight));
  let colIndxClick = Math.floor(xHor / (CANVAS_HEIGHT / gameFieldWidth));

  if (withFirstClickYouCanHitMine) {
    // defaul = false (so first click will never be mine!)
    // if false, mines will be generated randomly
    let rRow = gameMinesHandler.getRandomInt(gameFieldForLogic.length);
    let rCol = gameMinesHandler.getRandomInt(gameFieldForLogic[0].length);
    gameFieldForLogic = [
      ...gameMinesHandler.addMinesToField(minesInDaGame, gameFieldForLogic, rRow, rCol),
    ];
    gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
  } else {
    // row & col you clicked on field will NEVER be mine. So you always win if H=10, W=10, mines=99;
    gameFieldForLogic = [
      ...gameMinesHandler.addMinesToField(
        minesInDaGame,
        gameFieldForLogic,
        rowIndxClick,
        colIndxClick
      ),
    ];
    gameFieldForLogic = [...gameMinesHandler.addMineCountNumbers(gameFieldForLogic)];
  }
  if (!isGameOver && !isPaused) {
    gameFieldForLogic.flat().forEach(function (cell) {
      if (
        yVert > cell.squareRender.top &&
        yVert < cell.squareRender.top + cell.squareRender.height &&
        xHor > cell.squareRender.left &&
        xHor < cell.squareRender.left + cell.squareRender.width
      ) {
        // yVert in line below is fliped with xHor else do not work.
        let CELL_CLICKED =
          gameFieldForLogic[Math.floor(yVert / (CANVAS_WIDTH / gameFieldHeight))][
            Math.floor(xHor / (CANVAS_HEIGHT / gameFieldWidth))
          ];
        // Cell reaveal ...
        if (!CELL_CLICKED.isFlaged && CELL_CLICKED.isMine) {
          gameOverAllMinesReveal(gameFieldForLogic);
          CTX.fillStyle = "darkred";
          CTX.fillRect(
            cell.squareRender.left,
            cell.squareRender.top,
            cell.squareRender.width,
            cell.squareRender.height
          );
          isGameOver = true;
          isPaused = true;
          alert("GAME OVER");
        } else {
          const TEMP_MINE_FIELD = [...gameFieldForLogic];
          const QUEUE = [{ ...CELL_CLICKED }];

          while (QUEUE.length > 0) {
            const CURRENT_CELL = QUEUE.pop();

            if (CURRENT_CELL) {
              const { row, col } = CURRENT_CELL;
              if (!TEMP_MINE_FIELD[row][col].isOpen && !TEMP_MINE_FIELD[row][col].isFlaged) {
                TEMP_MINE_FIELD[row][col] = {
                  ...TEMP_MINE_FIELD[row][col],
                  isOpen: true,
                };
                MS_Reveal_Cells.push({
                  ...TEMP_MINE_FIELD[row][col],
                  squareRender: {
                    ...TEMP_MINE_FIELD[row][col].squareRender,
                    colour: "gray",
                  },
                });
                // If the neighboring mines count is 0, add adjacent cells to the queue
                if (
                  TEMP_MINE_FIELD[row][col].minesAround === 0 &&
                  !TEMP_MINE_FIELD[row][col].isFlaged
                ) {
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
    });
  }

  renderCellsFunction([MS_Reveal_Cells]);
  MS_Reveal_Cells = [];
  if (msHandler.checkIfGameWon(gameFieldForLogic, minesInDaGame)) {
    isGameOver = true;
    isPaused = true;
    alert("YOU WON!");
  }
}

// function resposible for putting flag in cell! ( 🚩 )
function putFlagInCell(event) {
  // Get the bounding rectangle of the canvas
  const rect = CANVAS.getBoundingClientRect();

  event.preventDefault(); // Prevent the default context menu from appearing
  // let x = event.pageX - elemLeft;
  // let y = event.pageY - elemTop   - 74;
  // Calculate the click position relative to the canvas
  let x = (event.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
  let y = (event.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y

  if (!isPaused) {
    // Determine the cell clicked based on coordinates
    gameFieldForLogic.flat().forEach(function (cell) {
      if (
        y > cell.squareRender.top &&
        y < cell.squareRender.top + cell.squareRender.height &&
        x > cell.squareRender.left &&
        x < cell.squareRender.left + cell.squareRender.width
      ) {
        // yVert in line below is fliped with xHor else do not work.
        let CELL_CLICKED =
          gameFieldForLogic[Math.floor(y / (CANVAS_WIDTH / gameFieldHeight))][
            Math.floor(x / (CANVAS_HEIGHT / gameFieldWidth))
          ];
        // Flag the cell
        if (!CELL_CLICKED.isOpen && !CELL_CLICKED.isFlaged) {
          gameFieldForLogic[CELL_CLICKED.row][CELL_CLICKED.col] = {
            ...CELL_CLICKED,
            isFlaged: true,
          }; // Toggle the flagged state
        } else if (!CELL_CLICKED.isOpen && CELL_CLICKED.isFlaged) {
          gameFieldForLogic[CELL_CLICKED.row][CELL_CLICKED.col] = {
            ...CELL_CLICKED,
            isFlaged: false,
          }; // Toggle the flagged state
        }
        return; // Exit the loop after flagging the cell
      }
    });
  }
  renderCellsFunction(gameFieldForLogic);

  // In two lines below we set new value to Mines left every time we right click field :)
  let minesFlaged = gameMinesHandler.minesFlagedOnField(gameFieldForLogic);
  document.getElementById("minesLeft").textContent = minesInDaGame - minesFlaged;
}
