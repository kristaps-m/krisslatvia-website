class ListOfExplosions {
  constructor() {
    this.ListOfExplosions = [];
  }

  checkExplosionTime() {
    // CODE FROM ListOfBombs:
    //  listOfExplosions.ListOfExplosions.push({x:b.x,y:b.y,s:b.size,d:new Date()});
    let dateNow = new Date();
    for (let i = 0; i < this.ListOfExplosions.length; i++) {
      const e = this.ListOfExplosions[i];
      if (Date.parse(e.d) + explosionAnimationTime <= Date.parse(dateNow)) {
        this.ListOfExplosions.splice(i, 1);
        console.log("DELETE?? Exp");
      }
    }
  }

  drawExplosions() {
    this.checkExplosionTime();
    CTX.fillStyle = "pink";
    this.ListOfExplosions.forEach((e) => {
      // draw exposion/s:
      // console.log(e);

      for (let row = 0; row < bombExlosion_2.length; row++) {
        for (let col = 0; col < bombExlosion_2[0].length; col++) {
          const explFieldSquare = bombExlosion_2[row][col];
          const squareX = e.x + bManRadius * row - bManRadius * 2;
          const squareY = e.y + bManRadius * col - bManRadius * 2;
          if (explFieldSquare === 1) {
            // Black square
            CTX.fillRect(squareX, squareY, bManRadius, bManRadius);
            // list of enemies? if in explosion then delete?
            listOfEnemies.forEach((oneEnemy, i) => {
              /**
               * -5 is taken to get enemy inside explosion area
               */
              if (
                oneEnemy.x > squareX - 5 &&
                oneEnemy.y > squareY - 5 &&
                oneEnemy.x + bManRadius - 5 <= squareX + bManRadius &&
                oneEnemy.y + bManRadius - 5 <= squareY + bManRadius
              ) {
                console.log("enemy Inside Explosion!");
                listOfEnemies.splice(i, 1);
              }
              /**
               * Lets try destroy walls
               */
              for (let row = 0; row < firstTestGameField.length; row++) {
                for (let col = 0; col < firstTestGameField[0].length; col++) {
                  const fieldSquare = firstTestGameField[col][row];
                  if (fieldSquare === 5) {
                    const wallx = row * bManRadius;
                    const wally = col * bManRadius;
                    if (
                      wallx > squareX - 5 &&
                      wally > squareY - 5 &&
                      wallx + bManRadius - 5 <= squareX + bManRadius &&
                      wally + bManRadius - 5 <= squareY + bManRadius
                    ) {
                      console.log("Wall inside explosion!!!");
                      firstTestGameField[col][row] = 0;
                    }
                  }
                }
              }
            });

            // console.log(e);
          }
        }
      }
    });
  }
}
