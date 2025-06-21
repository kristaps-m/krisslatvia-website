function GamesMinesHandler() {
  this.addMinesToField = function (howManyMines, theGameField, rowCantBeM = 0, colCantBeM = 0) {
    let howManyMinesAdded = this.countAllMinesInsideGameField(theGameField);
    let c = 1000000;

    while (howManyMines !== howManyMinesAdded) {
      let randRow = this.getRandomInt(theGameField.length);
      let randCol = this.getRandomInt(theGameField[0].length);
      while (randRow === rowCantBeM && randCol === colCantBeM) {
        randRow = this.getRandomInt(theGameField.length);
        randCol = this.getRandomInt(theGameField[0].length);
      }

      if (theGameField[randRow][randCol].isMine === false) {
        theGameField[randRow][randCol].isMine = true;
        howManyMinesAdded++;
      }
      if (c < 0) {
        break;
      }
      c--;
    }

    return theGameField;
  };

  this.countAllMinesInsideGameField = function (theGameField) {
    let howManyMinesAdded = 0;
    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField[0].length; col++) {
        if (theGameField[row][col].isMine) {
          howManyMinesAdded++;
        }
      }
    }

    return howManyMinesAdded;
  };

  // Count add mines in each cell
  this.countMinesAroundOneCell = function (realRow, realCol, theGameField) {
    let minesAroundTheCell = 0;
    // (5,5) OR // (3,3)0,0
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (
          row + realRow >= 0 &&
          row + realRow < theGameField.length &&
          col + realCol >= 0 &&
          col + realCol < theGameField[0].length
        ) {
          if (theGameField[row + realRow][col + realCol].isMine) {
            minesAroundTheCell++;
          }
        }
      }
    }

    return minesAroundTheCell;
  };

  this.addMineCountNumbers = function (theGameField) {
    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField[0].length; col++) {
        if (theGameField[row][col].isMine === false) {
          theGameField[row][col].minesAround = this.countMinesAroundOneCell(row, col, theGameField);
        }
      }
    }

    return theGameField;
  };

  this.minesFlagedOnField = function (theGameField) {
    let minesFlaged = 0;

    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField[0].length; col++) {
        if (theGameField[row][col].isFlaged === true) {
          minesFlaged++;
        }
      }
    }

    return minesFlaged;
  };

  // this.supCheat = function (theGameField, cheatColor = "#ff64e2") {
  //   if (isCheatEnabled) {
  //     for (let row = 0; row < theGameField.length; row++) {
  //       for (let col = 0; col < theGameField[0].length; col++) {
  //         const c = theGameField[row][col];
  //         const textX = c.squareRender.left;
  //         const textY = c.squareRender.top;
  //         if (c.isMine === true) {
  //           CTX.fillStyle = cheatColor;
  //           CTX.fillRect(textX + 2, textY + 2, 6, 6);
  //         }
  //       }
  //     }
  //   } else {
  //     for (let row = 0; row < theGameField.length; row++) {
  //       for (let col = 0; col < theGameField[0].length; col++) {
  //         const c = theGameField[row][col];
  //         const textX = c.squareRender.left;
  //         const textY = c.squareRender.top;
  //         if (c.isMine === true && !c.isFlaged) {
  //           CTX.fillStyle = "pink";
  //           CTX.fillRect(textX + 1, textY + 1, 8, 8);
  //         } else if (c.isMine === true && c.isFlaged === true) {
  //           CTX.fillStyle = "pink";
  //           CTX.fillRect(textX + 1, textY + 1, 8, 8);
  //           CTX.font = "bold 15px Comic Sans MS";
  //           CTX.textAlign = "center";
  //           CTX.fillStyle = "green";
  //           const tX = textX + c.squareRender.width / 2;
  //           const tY = textY + c.squareRender.height / 2 + CELL_OFF_SET * 3;
  //           CTX.fillText("🚩", tX, tY);
  //         }
  //       }
  //     }
  //   }
  // };

  this.getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };
}
