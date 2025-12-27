export class Food extends Position {
  constructor(
    squareSize,
    gameFieldFullNumber,
    canvasWidth,
    canvasHeight,
    isGodModeEnabled = false,
    x = 200,
    y = 200
  ) {
    super(x, y); // default x = 200, y = 200
    this.squareSize = squareSize;
    this.gameFieldFullNumber = gameFieldFullNumber;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.isGodModeEnabled = isGodModeEnabled;
    if (this.isGodModeEnabled) {
      this.x = canvasWidth - squareSize;
      this.y = canvasHeight - squareSize;
    }
  }

  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize);
  }

  isFoodEaten(snakeHeadX, snakeHeadY) {
    if (snakeHeadX === this.x && snakeHeadY === this.y) {
      return true;
    }

    return false;
  }

  createNewFood(ctx, color, w, h, tail, snakeData) {
    let isNewFoodInsideTail = true;
    let newX;
    let newY;
    while (isNewFoodInsideTail) {
      // newX =
      //   (Math.floor(Math.random() * (w / this.squareSize) - 1) + 1) *
      //   this.squareSize;
      // newY =
      //   (Math.floor(Math.random() * (h / this.squareSize) - 1) + 1) *
      //   this.squareSize;

      const isSnakeFoodAhead = true;
      if (isSnakeFoodAhead) {
        if (
          snakeData.sx + this.squareSize * 3 < w - this.squareSize * 2 &&
          snakeData.sd == "right"
        ) {
          newX = snakeData.sx + this.squareSize * 2;
          newY = snakeData.sy;
        } else if (
          snakeData.sx - this.squareSize * 3 > this.squareSize * 2 &&
          snakeData.sd == "left"
        ) {
          newX = snakeData.sx - this.squareSize * 2;
          newY = snakeData.sy;
        } else {
          newX =
            (Math.floor(Math.random() * (w / this.squareSize) - 1) + 1) *
            this.squareSize;
          newY =
            (Math.floor(Math.random() * (h / this.squareSize) - 1) + 1) *
            this.squareSize;
        }
        // newY = snakeData.sy;
      }

      if (!this.isInside(tail, newX, newY)) {
        isNewFoodInsideTail = false;
        this.x = newX;
        this.y = newY;
        this.draw(ctx, color);
      }
      if (this.gameFieldFullNumber === tail.length) {
        break;
      }
    }
  }

  isInside(theTail, x, y) {
    let theCount = 0;
    theTail.forEach((element) => {
      if (element.x === x && element.y === y) {
        theCount++;
      }
    });

    return theCount > 0 ? true : false;
  }
}
