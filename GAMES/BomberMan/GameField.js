class GameField {
  constructor(field) {
    this.field = field; // 1d array of 1 or 0
  }

  draw() {
    for (let row = 0; row < Math.floor(W / bManRadius) - 1; row++) {
      for (let col = 0; col < Math.floor(H / bManRadius) - 1; col++) {
        const fieldSquare = firstTestGameField[col][row];
        const squareX = row * bManRadius;
        const squareY = col * bManRadius;
        if (fieldSquare === 1) {
          // Black square
          CTX.fillStyle = "black";
          CTX.fillRect(squareX, squareY, bManRadius, bManRadius);
          // CTX.fillText(`${col}-${row}`, squareX, squareY);
        }else if(fieldSquare === 3){
          CTX.fillStyle = "yellow";
          CTX.fillRect(squareX, squareY, bManRadius, bManRadius);
        }
      }
    }
  }
}
