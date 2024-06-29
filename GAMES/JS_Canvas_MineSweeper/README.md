```
CANVAS.addEventListener('click', function(event) {
  let xHor = event.pageX - elemLeft; // Horizontal Convas Axis
  let yVert = event.pageY - elemTop; // Vertical Canvas Axis
  console.log(xHor,yVert);

  minesweeperCells.forEach(function(cell) {
    if(yVert > cell.top && yVert < cell.top + cell.height && xHor > cell.left && xHor < cell.left + cell.width){
      // console.log(cell);
      let CELL_CLICKED = gameFieldForLogic[Math.floor(xHor / (CANVAS_WIDTH / gameFieldSize) )][Math.floor(yVert / (CANVAS_WIDTH / gameFieldSize))]
      // Cell reaveal ...
      if(CELL_CLICKED.isMine){
        // if(CURRENT_CELL.isMine){
          CTX.fillStyle = 'red';
          CTX.fillRect(cell.left, cell.top, cell.width, cell.height);
        // }
        alert("GAME OVER");
        // setIsGameOVer(true);
        // setHavePlayerWon(false);
      }else{
        const TEMP_MINE_FIELD = [...gameFieldForLogic];
        const QUEUE = [{...CELL_CLICKED}];

        while (QUEUE.length > 0){
          const CURRENT_CELL = QUEUE.pop();

          if(CURRENT_CELL){
            const {row, col} = CURRENT_CELL;
            // const x = CURRENT_CELL.x;
            // const y = CURRENT_CELL.y;
            // console.log(CURRENT_CELL)
            // console.log(CURRENT_CELL.squareRender, cell, x, y, "THis is test");
            // minesweeperCells
            // cell.colour = 'gray';
            // CTX.fillStyle = 'gray';
            // CTX.fillRect(CURRENT_CELL.squareRender.left,
            //   CURRENT_CELL.squareRender.top,
            //   CURRENT_CELL.squareRender.width,
            //   CURRENT_CELL.squareRender.height);
            // revelTest(CTX,cell, gameFieldForLogic)
            // Check if the cell is already revealed
            if(!TEMP_MINE_FIELD[row][col].isOpen && !TEMP_MINE_FIELD[row][col].isFlaged){
              TEMP_MINE_FIELD[row][col] = {
                ...TEMP_MINE_FIELD[row][col],
                isOpen: true,
              };
                  const activeCell = {...TEMP_MINE_FIELD[row][col]}; // .squareRender
                  console.log(activeCell)
                  if(activeCell.isOpen){
                    CTX.fillStyle = 'gray';
                    CTX.fillRect(activeCell.squareRender.left,
                      activeCell.squareRender.top,
                      activeCell.squareRender.width,
                      activeCell.squareRender.height);
                    if(activeCell.minesAround > 0){
                    CTX.font = "bold 15px Comic Sans MS";
                    CTX.textAlign = "center"; CTX.fillStyle = "black";
                    const textX = activeCell.squareRender.left + activeCell.squareRender.width / 2;
                    const textY = activeCell.squareRender.top + activeCell.squareRender.height / 2 + CELL_OFF_SET * 3;//CELL_CLICKED.y * cell.height + cell.height / 2;
                    // CTX.fillText(CELL_CLICKED.minesAround, Math.floor(cell.left+CANVAS_WIDTH/gameFieldSize), Math.floor(cell.top+CANVAS_HEIGHT/gameFieldSize));
                    CTX.fillText(activeCell.minesAround, textX, textY);
                    }
                  }

                  // if(activeCell.minesAround > 0 && activeCell.isOpen){
                    // CTX.font = "bold 15px Comic Sans MS";
                    // CTX.textAlign = "center"; CTX.fillStyle = "black";
                    // const textX = activeCell.squareRender.left + activeCell.squareRender.width / 2; //CELL_CLICKED.x * cell.width + cell.width / 2;
                    // const textY = activeCell.squareRender.top + activeCell.squareRender.height / 2 + CELL_OFF_SET * 3;//CELL_CLICKED.y * cell.height + cell.height / 2;
                    // // CTX.fillText(CELL_CLICKED.minesAround, Math.floor(cell.left+CANVAS_WIDTH/gameFieldSize), Math.floor(cell.top+CANVAS_HEIGHT/gameFieldSize));
                    // CTX.fillText(activeCell.minesAround, textX, textY);
                  // }

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
```
