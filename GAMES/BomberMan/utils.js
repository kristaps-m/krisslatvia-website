// 23 * 23
let firstTestGameField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let bombExlosion_2 = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

let noWalls = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 16

function addRandomWallsToMainGameField() {
  // field 23 * 23, lets make n walls?
  let randomWallsCount = 200;
  let howManyWallsAdded = 1;

  while (howManyWallsAdded <= randomWallsCount) {
    const randRow = Math.floor(Math.random() * 23);
    const randCol = Math.floor(Math.random() * 23);
    // const fieldElem = firstTestGameField[row][col];
    if (
      firstTestGameField[randRow][randCol] !== 1 &&
      randRow >= 1 &&
      randCol >= 1 &&
      randRow !== 16 &&
      randCol !== 12
    ) {
      randomXandYforLevelexit = {x:randRow, y:randCol};
      firstTestGameField[randRow][randCol] = 5;
      howManyWallsAdded++;
    }
  }
}

function countWalls() {
  let result = 0;
  for (let row = 0; row < firstTestGameField.length; row++) {
    for (let col = 0; col < firstTestGameField[0].length; col++) {
      if (firstTestGameField[row][col] === 5) {
        result++;
      }
    }
  }

  console.log(result);
}

function isPlayerInLevelexit(player, lExit){
  if(player.x > lExit.x &&
    player.x + bManRadius - 5 <= lExit.x + bManRadius &&
    player.y > lExit.y &&
    player.y + bManRadius - 5 <= lExit.y + bManRadius
  ){
    return true;
  }

  return false;
}

function randomLevelexitPosition(){
  // let xP = Math.floor(Math.random() * 20);
  // let yP = Math.floor(Math.random() * 20);
  let randRow = Math.floor(Math.random() * 23);
  let randCol = Math.floor(Math.random() * 23);
  console.log("1",randRow,randCol);
  while (firstTestGameField[randRow][randCol] === 1){ // xP % 2 !== 0 && yP % 2 !== 0 &&
    randRow = Math.floor(Math.random() * 23);
    randCol = Math.floor(Math.random() * 23);
  console.log("2",randRow,randCol);

  }
  if(firstTestGameField[randRow][randCol] !== 1){
    return {x:randRow,y:randCol};

  }

  // console.log("3",xP,yP);
  // let result  = {x:0, y:0};
  // firstTestGameField.forEach((row, rI) => {
  //   row.forEach((elem, cI) =>{
  //     let xP = Math.floor(Math.random() * 22);
  //     let yP = Math.floor(Math.random() * 22);
  //     if(elem !== 1){
  //       console.log(elem);
  //       if(rI < xP && cI < yP){
  //         result = {x:rI, y:cI};
  //         return;
  //       }
  //     }
  //   })
  // })

  // return result;
}
