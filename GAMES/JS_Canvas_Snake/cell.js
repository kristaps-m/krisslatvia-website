export class Cell extends Position {
  constructor(x,y, moveDirection = ""){
    super(x,y);
    this.moveDirection = moveDirection;
    this.isCornerPiece = false;
    this.isTopRightCorner = false;
    this.isTopLeftCorner = false;
    this.isBottomRightCorner = false;
    this.isBottomLeftCorner = false;
  }
}