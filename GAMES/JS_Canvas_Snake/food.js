export class Food extends Position{
  constructor(squareSize, gameFieldFullNumber, x, y){
    super(x = 200, y = 200);
    this.squareSize = squareSize;
    this.gameFieldFullNumber = gameFieldFullNumber;
  }

  draw(ctx, color){
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize);
  }

  isFoodEaten(snakeHeadX, snakeHeadY){
    if(snakeHeadX === this.x && snakeHeadY === this.y){
      return true;
    }

    return false;
  }

  createNewFood(ctx, color, w, h, tail){
    let isNewFoodInsideTail = true;
    let newX; let newY;
    while (isNewFoodInsideTail){
      newX = (Math.floor(Math.random() * (w / this.squareSize)- 1) + 1) * this.squareSize;
      newY = (Math.floor(Math.random() * (h / this.squareSize)- 1) + 1) * this.squareSize;
      if (!this.isInside(tail, newX, newY)){
        isNewFoodInsideTail = false;
        this.x = newX;
        this.y = newY;
        this.draw(ctx, color);
      }
      if(this.gameFieldFullNumber === tail.length){
        break;
      }
    }
  }

  isInside(theTail, x, y){
    let theCount = 0;
    theTail.forEach(element => {
      if(element.x === x && element.y === y){
        theCount++;
      }
    });

    return theCount > 0 ? true : false;
  }
}

