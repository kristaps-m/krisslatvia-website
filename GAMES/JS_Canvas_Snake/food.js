export class Food extends Position {
  constructor(
    squareSize,
    gameFieldFullNumber,
    canvasWidth,
    canvasHeight,
    snakeData,
    isGodModeEnabled = false,
    x = 200,
    y = 200
  ) {
    super(x, y); // default x = 200, y = 200
    this.squareSize = squareSize;
    this.gameFieldFullNumber = gameFieldFullNumber;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.snakeData = snakeData;
    this.isGodModeEnabled = isGodModeEnabled;
    if (this.isGodModeEnabled) {
      this.x = canvasWidth - squareSize;
      this.y = canvasHeight - squareSize;
    }
  }

  getRatioDependingOnGameSize(){
    /*
    oneSquareSize gameFieldFullNumber
    5	8000
    10	2000
    20	500
    25	320
    50	80
    100	20
    */
    switch (this.gameFieldFullNumber) {
      case 8000:        
        return 0.99;
      case 2000:
        return 0.978;
      case 500:
        return 0.95;
      case 320:
        return 0.94
      case 80:
        return 0.83
      case 20:
        return 0.7
      default:
        return 0.68
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

  avoidCreatingFoodOutOfField(snakeY, h){
    if (snakeY + this.squareSize < h) {
      return snakeY + this.squareSize;
    } else {
      return 0;
    }
  }

  createNewFood(ctx, color, w, h, tail, isSnakeFoodAhead) {
    let isNewFoodInsideTail = true;
    let newX;
    let newY;
    while (isNewFoodInsideTail) {
      // const isSnakeFoodAhead = true;
      // if snake tail lenght is longer that 70 % (for example)of total posible snake lenght turn of auto food in face mode
      // bigger gamefield and smaller oneSquareSize the bigger the ratio can be.
      if (isSnakeFoodAhead && tail.length / this.gameFieldFullNumber < this.getRatioDependingOnGameSize()) {
        if (
          this.snakeData.sx + this.squareSize * 3 < w - this.squareSize * 2 &&
          this.snakeData.sd == "right"
        ) {
          newX = this.snakeData.sx + this.squareSize * getRndInteger(1, 2);
          newY = this.snakeData.sy;
            if(this.isInside(tail, newX, newY)){
              newX = getRndInteger(1, w / this.squareSize) * this.squareSize - this.squareSize;
              newY = getRndInteger(1, h / this.squareSize) * this.squareSize - this.squareSize;
            }
        } else if (
          this.snakeData.sx - this.squareSize * 3 > this.squareSize * 2 &&
          this.snakeData.sd == "left"
        ) {
          newX = this.snakeData.sx - this.squareSize * getRndInteger(1, 2);
          newY = this.snakeData.sy;
            if(this.isInside(tail, newX, newY)){
              newX = getRndInteger(1, w / this.squareSize) * this.squareSize - this.squareSize;
              newY = getRndInteger(1, h / this.squareSize) * this.squareSize - this.squareSize;
            }
        } else if (this.snakeData.sx > w / 1.9) {
            newX = w - this.squareSize * 2;
            newY = this.avoidCreatingFoodOutOfField(this.snakeData.sy, h, tail);
            if(this.isInside(tail, newX, newY)){
              newX = getRndInteger(1, w / this.squareSize) * this.squareSize - this.squareSize;
              newY = getRndInteger(1, h / this.squareSize) * this.squareSize - this.squareSize;
            }
        } else if (this.snakeData.sx < w / 2.1) {
            newX = this.squareSize * 2;
            newY = this.avoidCreatingFoodOutOfField(this.snakeData.sy, h, tail);
            if(this.isInside(tail, newX, newY)){
              newX = getRndInteger(1, w / this.squareSize) * this.squareSize - this.squareSize;
              newY = getRndInteger(1, h / this.squareSize) * this.squareSize - this.squareSize;
            }
        }
      } else {
          newX = getRndInteger(1, w / this.squareSize) * this.squareSize - this.squareSize;
          newY = getRndInteger(1, h / this.squareSize) * this.squareSize - this.squareSize;
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
    let count = 0;
    theTail.forEach((element) => {
      if (element.x === x && element.y === y) {
        count++;
      }
    });

    return count > 0 ? true : false;
  }
}
