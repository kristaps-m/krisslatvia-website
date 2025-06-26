class GameCell {
  constructor({
    isMine: isMine,
    isFlaged: isFlaged,
    isOpen: isOpen,
    minesAround: minesAround,
    row: row,
    col: col,
    squareRender: squareRender,
  }) {
    this.isMine = isMine;
    this.isFlaged = isFlaged;
    this.isOpen = isOpen;
    this.minesAround = minesAround;
    this.row = row;
    this.col = col;
    this.squareRender = squareRender;
  }
}
