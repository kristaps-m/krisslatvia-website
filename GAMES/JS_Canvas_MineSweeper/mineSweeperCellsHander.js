function MineSweeperCellsHander(){
  this.createMinesSweeperClickableCellsAddObjectToGameLogicArr = function(){
    let cellHeight = CANVAS_HEIGHT / gameFieldHeight - CELL_OFF_SET*2;
    let cellWidth = CANVAS_WIDTH / gameFieldWidth - CELL_OFF_SET*2;
    let rowIndex = 0, colIndex = 0;
    let cellColor = 'pink';

    for (let row = 0; row < CANVAS_WIDTH; row+= CANVAS_WIDTH / gameFieldHeight) {
      let tempRow = [];
      colIndex = 0;
      if(rowIndex >= gameFieldHeight){
        break;
      }
      for (let col = 0; col < CANVAS_HEIGHT; col+= CANVAS_HEIGHT / gameFieldWidth) {
        if(colIndex >= gameFieldWidth){
          break;
        }
        const ONE_CELL = {colour: cellColor,
          width: cellWidth,
          height: cellHeight,
          top: row+CELL_OFF_SET,
          left: col+CELL_OFF_SET,};

        minesweeperCells.push(ONE_CELL);
        tempRow.push({
          isMine:false,
          isFlaged:false,
          isOpen:false,
          minesAround:0,
          row:rowIndex,
          col:colIndex,
          squareRender: {...ONE_CELL},
        },
          );
        colIndex++;
      }
      rowIndex++;
      gameFieldForLogic.push(tempRow);
    }
  }

  this.checkIfGameWon = function(theGameField, minesInGame){
    let gameCellsRevealed = 0;

    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField[0].length; col++) {
        if (theGameField[row][col].isOpen) {
          gameCellsRevealed++;
        }
      }
    }

    return (
      theGameField[0].length * theGameField.length - gameCellsRevealed ===
      minesInGame
    );
  }
}
