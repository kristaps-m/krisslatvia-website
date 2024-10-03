function Movement() {
  this.moveAllNumbersLeft =  function(){
    let areNumbersMovedOrAndSummed = false;
    let countHowManyThingsHaveBeenMoved = 0; // if it is 0 @ end, nothing moved don't gen new N.
    for (let row = 0; row < cnvsSettings.gameSize; row++) {
        for (let col = 0; col < cnvsSettings.gameSize; col++) {
            let element = game2DArray[row][col];
            if(element !== 0){
              let colIndx = 0;
              for (let i = col; i > 0; i--) {
                let nextCol = game2DArray[row][i-1];
                /** If one cell to left from n > 0 is not equal to 0 then it stays in its position */
                if(nextCol !== 0){
                    colIndx = i;
                    /** if cell to the left is not 0 and it is equal... */
                    if(element === nextCol){
                      element *= 2;
                      colIndx--;
                      areNumbersMovedOrAndSummed = true;
                    }
                    break;
                  }else {
                    countHowManyThingsHaveBeenMoved++;
                    // break; // I am not sure if this is needed ?!
                    // After little testing seams like DO NOT PUT `break;` here
                  }
                }
              game2DArray[row][col] = 0;
              game2DArray[row][colIndx] = element;
              //console.log("Did I just moved LEFT ?!", countHowManyThingsHaveBeenMoved);
            }
        }
    }

    // So if numbers are summed or numbers are moved we generate new number on board = return true;
    // else we return false;
    return areNumbersMovedOrAndSummed || countHowManyThingsHaveBeenMoved > 0;
  }

this.moveAllNumbersRight = function(){
  let areNumbersMovedOrAndSummed = false;
  let countHowManyThingsHaveBeenMoved = 0;
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = cnvsSettings.gameSize-1; col >= 0; col--) {
      let element = game2DArray[row][col];
      if(element !== 0){
          let colIndx = cnvsSettings.gameSize-1;
          for (let i = col; i < cnvsSettings.gameSize-1; i++) {
              let nextCol = game2DArray[row][i+1];
              if(nextCol !== 0){
                  colIndx = i;
                  if(element === nextCol){
                      element *= 2;
                      colIndx++;
                      areNumbersMovedOrAndSummed = true;
                  }
                  break;
              }else {
                countHowManyThingsHaveBeenMoved++;
              }
          }
          game2DArray[row][col] = 0;
          game2DArray[row][colIndx] = element;
      }
    }
  }

  return areNumbersMovedOrAndSummed || countHowManyThingsHaveBeenMoved > 0;
}

this.moveAllNumbersUp = function(){
  let areNumbersMovedOrAndSummed = false;
  let countHowManyThingsHaveBeenMoved = 0;
  for (let row = 1; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      let element = game2DArray[row][col];
      if(element !== 0){
          let rowIndex = 0;
          for (let i = row; i > 0; i--) {
              let upperRow = game2DArray[i-1][col];
              if(upperRow !== 0){
                rowIndex = i;
                if(element === upperRow){
                    element *= 2;
                    rowIndex--;
                    areNumbersMovedOrAndSummed = true;
                }
                break;
              }else {
                countHowManyThingsHaveBeenMoved++;
              }
          }
          game2DArray[row][col] = 0;
          game2DArray[rowIndex][col] = element;
      }
    }
  }

  return areNumbersMovedOrAndSummed || countHowManyThingsHaveBeenMoved > 0;
}

this.moveAllNumbersDown = function(){
  let areNumbersMovedOrAndSummed = false;
  let countHowManyThingsHaveBeenMoved = 0;
  for (let row = cnvsSettings.gameSize-1; row >= 0; row--) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      let element = game2DArray[row][col];
      if(element !== 0){
          let rowIndex = cnvsSettings.gameSize-1;
          for (let i = row; i < cnvsSettings.gameSize-1; i++) {
              let nextRow = game2DArray[i+1][col];
              if(nextRow !== 0){
                  rowIndex = i;
                  if(element === nextRow){
                      element *= 2;
                      rowIndex++;
                      areNumbersMovedOrAndSummed = true;
                  }
                  break;
              }else {
                countHowManyThingsHaveBeenMoved++;
              }
          }
          game2DArray[row][col] = 0;
          game2DArray[rowIndex][col] = element;
      }
    }
  }

  return areNumbersMovedOrAndSummed || countHowManyThingsHaveBeenMoved > 0;
}

this.countAllDirectionsPressedForGameOverHandling = function(array, n){
  var cUp = 0;
  var cDown = 0;
  var cLeft = 0;
  var cRight = 0;
  for(var i = 0; i < array.length; ++i){
    // array[i] = {buttonPressed: 'right', score: 14}
    if(array[i].buttonPressed === 'up' && array[i].score === n){cUp++}
    if(array[i].buttonPressed === 'down' && array[i].score === n){cDown++}
    if(array[i].buttonPressed === 'left' && array[i].score === n){cLeft++}
    if(array[i].buttonPressed === 'right' && array[i].score === n){cRight++}
  }
  return cDown > 0 && cUp > 0 && cLeft > 0 && cRight > 0;
  }
}