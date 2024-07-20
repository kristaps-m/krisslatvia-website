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
      if (
        Date.parse(b.bombPlacedTime) + bombExlpoldesDelayTIme <=
        Date.parse(dateNow)
      ) {
        listOfExplosions.ListOfExplosions.push({
          x: b.x,
          y: b.y,
          s: b.size,
          d: new Date(),
        });
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
