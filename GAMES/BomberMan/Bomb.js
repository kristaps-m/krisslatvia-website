class Bomb {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.bombPlacedTime = new Date();
    this.bombSize; // 2
  }

  drawOneBomb() {
    CTX.fillStyle = "orange";
    CTX.fillRect(this.x, this.y, this.size, this.size);
  }

  draw() {
    for (let row = 0; row < bombExlosion_2.length; row++) {
      for (let col = 0; col < bombExlosion_2[0].length; col++) {
        // console.log(row,col);
        const fieldSquare = bombExlosion_2[col][row];
        if (fieldSquare === 1) {
          // Black square
          const squareX = row * bManRadius + this.x;
          const squareY = col * bManRadius + this.y;
          CTX.fillStyle = "yellow";
          CTX.fillRect(squareX, squareY, bManRadius, bManRadius);
          // CTX.fillText(`${col}-${row}`, squareX, squareY);
        }
      }
    }
  }
}
