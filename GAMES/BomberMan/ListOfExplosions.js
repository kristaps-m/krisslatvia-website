class ListOfExplosions{
  constructor(){
    this.ListOfExplosions = [];
  }

  checkExplosionTime(){
    // CODE FROM ListOfBombs:
    //  listOfExplosions.ListOfExplosions.push({x:b.x,y:b.y,s:b.size,d:new Date()});
    let dateNow = new Date();
    for (let i = 0; i < this.ListOfExplosions.length; i++) {
      const e = this.ListOfExplosions[i];
      if (Date.parse(e.d) + 2000 <= Date.parse(dateNow)) {
        this.ListOfExplosions.splice(i, 1);
        console.log("DELETE?? Exp");
      }
    }

  }

  drawExplosions(){
    this.checkExplosionTime();
    CTX.fillStyle = "pink";
    this.ListOfExplosions.forEach((e) => {
      // draw exposion/s:
      for (let row = 0; row < bombExlosion_2.length; row++) {
        for (let col = 0; col < bombExlosion_2[0].length; col++) {
          const fieldSquare = bombExlosion_2[row][col];
          const squareX = e.x + bManRadius * row;
          const squareY = e.y + bManRadius * col;
          if (fieldSquare === 1) {
            // Black square
            CTX.fillRect(
              squareX - bManRadius * 2,
              squareY - bManRadius * 2,
              bManRadius,
              bManRadius
            );
            listOfEnemies.forEach((e,i) => {
              if(e.x < squareX && e.y < squareY){
                console.log("enemy Inside Explosion!");
                listOfEnemies.splice(i,1);
              }
            });
          }
        }
      }
    })
  }
}