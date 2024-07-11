class ListOfBombs {
  constructor() {
    this.ListOfBombs = [];
  }

  checkBombsTime() {
    /**
     * So after 4 (4000 ms) seconds we need to delete bomb from list
     * Bomb placed 01.01.01 11:00 .. + 4
     * if Date now >= 01.01.01 11:10
     * delete Bomb;
     */
    let dateNow = new Date();
    for (let i = 0; i < this.ListOfBombs.length; i++) {
      const b = this.ListOfBombs[i];
      if (Date.parse(b.bombPlacedTime) + 4000 <= Date.parse(dateNow)) {
        // draw exposion:
        CTX.fillStyle = "pink";
        for (let row = 0; row < bombExlosion_2.length; row++) {
          for (let col = 0; col < bombExlosion_2[0].length; col++) {
            const fieldSquare = bombExlosion_2[row][col];
            const squareX = b.x + bManRadius * row;
            const squareY = b.y + bManRadius * col;
            if (fieldSquare === 1) {
              // Black square
              CTX.fillRect(
                squareX - bManRadius * 2,
                squareY - bManRadius * 2,
                bManRadius,
                bManRadius
              );
              console.log("---------------");
              // CTX.fillText(`${col}-${row}`, squareX, squareY);
            }
          }
        }
        this.ListOfBombs.splice(i, 1);
        console.log("DELETE??");
      }
    }
  }

  drawBombs() {
    this.checkBombsTime();
    this.ListOfBombs.forEach((b) => {
      b.drawOneBomb();
    });
  }
}
