function Movement() {
  this.moveAllNumbersLeft =  function(){
      for (let row = 0; row < cnvsSettings.gameSize; row++) {
          for (let col = 0; col < cnvsSettings.gameSize; col++) {
              let element = game2DArray[row][col];
              if(element !== 0){
                  let colIndx = 0;
                  for (let i = col; i > 0; i--) {
                      let nextCol = game2DArray[row][i-1];
                      if(nextCol !== 0){
                          colIndx = i;
                          if(element === nextCol){
                            element *= 2;
                            colIndx--;
                          }
                          break;
                      }
                  }
                  game2DArray[row][col] = 0;
                  game2DArray[row][colIndx] = element;
              }
          }
      }
  }

  this.moveAllNumbersRight = function(){
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
                        }
                        break;
                    }
                }
                game2DArray[row][col] = 0;
                game2DArray[row][colIndx] = element;
            }
        }
    }
  }

  this.moveAllNumbersUp = function(){
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
                        }
                          break;
                      }
                  }
                  game2DArray[row][col] = 0;
                  game2DArray[rowIndex][col] = element;
              }
          }
      }
  }

  this.moveAllNumbersDown = function(){
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
                        }
                        break;
                    }
                }
                game2DArray[row][col] = 0;
                game2DArray[rowIndex][col] = element;
            }
        }
    }
    return game2DArray;
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