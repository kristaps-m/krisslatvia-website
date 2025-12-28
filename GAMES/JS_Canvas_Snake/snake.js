import { Cell } from "./cell.js";
import { SnakeDrawHelper } from "./snakeDrawHelper.js";

export class Snake {
  constructor(
    ctx,
    squareSize,
    canvasWidth,
    canvasHeight,
    xLocation,
    yLocation,
    snakeMoveDir,
    isGodModeEnabled = false
  ) {
    this.ctx = ctx;
    this.squareSize = squareSize;
    this.xLocation = xLocation; // location of head - movement speed
    this.yLocation = yLocation;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.isGodModeEnabled = isGodModeEnabled;
    this.xSpeed = this.isGodModeEnabled ? this.squareSize : 0;
    this.ySpeed = 0;
    this.snakeMoveDir = snakeMoveDir;
    this.tail = !this.isGodModeEnabled
      ? [
          new Cell(0, 0, this.snakeMoveDir),
          new Cell(this.squareSize, 0, this.snakeMoveDir),
          new Cell(this.squareSize * 2, 0, this.snakeMoveDir),
        ]
      : this.amazingGodMode();
    this.canChangeDirection = false; // DEFAULT = false
    this.snakeOuterBodyLinesColor = "black";
    this.snakeDrawHelper = new SnakeDrawHelper(
      this.ctx,
      this.squareSize,
      this.snakeOuterBodyLinesColor
    );
  }

  update() {
    this.xLocation += this.xSpeed;
    this.yLocation += this.ySpeed;
  }

  drawSnakeHead(context, color) {
    context.fillStyle = color;
    if (this.xLocation + this.squareSize > this.canvasWidth) {
      this.xLocation = 0;
    } else if (this.xLocation < 0) {
      this.xLocation = this.canvasWidth - this.squareSize;
    } else if (this.yLocation < 0) {
      this.yLocation = this.canvasHeight - this.squareSize;
    } else if (this.yLocation + this.squareSize > this.canvasHeight) {
      this.yLocation = 0;
    }
    context.fillRect(
      this.xLocation,
      this.yLocation,
      this.squareSize,
      this.squareSize
    );
    this.snakeDrawHelper.drawSnakeEyes(
      context,
      this.xLocation,
      this.yLocation,
      this.snakeMoveDir
    );
    this.tail.push(new Cell(this.xLocation, this.yLocation, this.snakeMoveDir));
  }

  drawTail(ctx, color) {
    this.tail.forEach((cell, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(cell.x, cell.y, this.squareSize, this.squareSize);
      if (cell.isColorAsFoodEaten) {
        ctx.fillStyle = "blue";
        const efos = this.squareSize / 6; // Eaten Food of set
        ctx.fillRect(
          cell.x + efos,
          cell.y + efos,
          this.squareSize - efos * 2,
          this.squareSize - efos * 2
        );
      }
      if (this.squareSize >= 25) {
        // TOP CORNERS
        if (cell.isCornerPiece && cell.isTopRightCorner) {
          this.snakeDrawHelper.drawCornerLinesTopRight(ctx, cell);
        } else if (cell.isCornerPiece && cell.isTopLeftCorner) {
          this.snakeDrawHelper.drawCornerLinesTopLeft(ctx, cell);
        }
        // BOTTOM CORNERS
        else if (cell.isCornerPiece && cell.isBottomRightCorner) {
          this.snakeDrawHelper.drawCornerLinesBottomRight(ctx, cell);
        } else if (cell.isCornerPiece && cell.isBottomLeftCorner) {
          this.snakeDrawHelper.drawCornerLinesBottomLeft(ctx, cell);
        }
        // VERTICAL OR HERIZONTAL lines
        else if (
          (cell.moveDirection === "down" || cell.moveDirection === "up") &&
          !cell.isCornerPiece
        ) {
          this.snakeDrawHelper.drawVerticalLines(ctx, cell);
        } else if (
          (cell.moveDirection === "right" || cell.moveDirection === "left") &&
          !cell.isCornerPiece
        ) {
          this.snakeDrawHelper.drawHorizontalLines(ctx, cell);
        }
        //this.drawLinesAroundCell(ctx, cell);
      }
    });
  }

  updateTail() {
    // Add element at BEGINNING
    this.tail.unshift(new Cell(this.tail[0].x, this.tail[0].y));
    // // Add element at the END?!?!?
    // Do not use this. This couses equal elements to be in tail (if tail size increased artificialy)
    // (example = [{x:10,y:10},{x:10,y:10}])
    // this.tail.push(new Cell(this.xLocation, this.yLocation));
  }

  removeFirstElementFromTail() {
    this.tail.shift();
  }

  isSnakeHeadCrashedInTail(add_X = 0, add_Y = 0) {
    for (let index = 0; index < this.tail.slice(0, -2).length; index++) {
      const element = this.tail[index];
      if (
        element.x === this.xLocation + add_X &&
        element.y === this.yLocation + add_Y
      ) {
        return true;
      }
      if (
        element.y === 0 &&
        this.yLocation + add_Y === this.canvasHeight &&
        element.x === this.xLocation
      ) {
        return true;
      }
    }

    return false;
  }

  changeDirection(dirKey) {
    if (!this.canChangeDirection) return; // Prevent changing direction multiple times in one frame
    // keys = w, s, a, d OR Up, Down, Left, Right
    switch (dirKey) {
      case "Up":
      case "w":
        if (this.ySpeed !== this.squareSize * 1) {
          this.xSpeed = 0;
          this.ySpeed = this.squareSize * -1;
          this.canChangeDirection = false; // Direction change happened
          this.tail[this.tail.length - 1].isCornerPiece = true;
          if (this.snakeMoveDir === "left") {
            this.tail[this.tail.length - 1].isBottomLeftCorner = true;
          } else if (this.snakeMoveDir === "right") {
            this.tail[this.tail.length - 1].isBottomRightCorner = true;
          }
          this.snakeMoveDir = "up";
        }
        break;
      case "Down":
      case "s":
        if (this.ySpeed !== this.squareSize * -1) {
          this.xSpeed = 0;
          this.ySpeed = this.squareSize * 1;
          this.canChangeDirection = false;
          this.tail[this.tail.length - 1].isCornerPiece = true;
          if (this.snakeMoveDir === "left") {
            this.tail[this.tail.length - 1].isTopLeftCorner = true;
          } else if (this.snakeMoveDir === "right") {
            this.tail[this.tail.length - 1].isTopRightCorner = true;
          }
          this.snakeMoveDir = "down";
        }
        break;
      case "Left":
      case "a":
        if (this.xSpeed !== this.squareSize * 1) {
          this.ySpeed = 0;
          this.xSpeed = this.squareSize * -1;
          this.canChangeDirection = false;
          this.tail[this.tail.length - 1].isCornerPiece = true;
          if (this.snakeMoveDir === "up") {
            this.tail[this.tail.length - 1].isTopRightCorner = true;
          } else if (this.snakeMoveDir === "down") {
            this.tail[this.tail.length - 1].isBottomRightCorner = true;
          }
          this.snakeMoveDir = "left";
        }
        break;
      case "Right":
      case "d":
        if (this.xSpeed !== this.squareSize * -1) {
          this.ySpeed = 0;
          this.xSpeed = this.squareSize * 1;
          this.canChangeDirection = false;
          this.tail[this.tail.length - 1].isCornerPiece = true;
          if (this.snakeMoveDir === "up") {
            this.tail[this.tail.length - 1].isTopLeftCorner = true;
          } else if (this.snakeMoveDir === "down") {
            this.tail[this.tail.length - 1].isBottomLeftCorner = true;
          }
          this.snakeMoveDir = "right";
        }
        break;
      case "o":
        console.log(this.tail);
        console.log(this.xLocation, this.yLocation);
        break;
      default:
        break;
    }
  }

  // if in theSnakeGameLoop this function is activated snake
  // automaticaly moves down in row to collect all food and WIN :) <3
  automaticalyMoveSnakeToCollectFood(theFood) {
    if (
      this.xLocation === this.canvasWidth - this.squareSize &&
      this.snakeMoveDir === "right"
    ) {
      this.changeDirection("s");
    }
    if (
      (this.ifDistanceFromHeadToTailEndShortMove() &&
        this.snakeMoveDir === "down" &&
        this.xLocation === this.canvasWidth - this.squareSize) ||
      (this.xLocation === this.canvasWidth - this.squareSize &&
        this.snakeMoveDir === "down" &&
        theFood.y === this.yLocation)
    ) {
      this.changeDirection("a");
    }
    if (this.xLocation === 0 && this.snakeMoveDir === "left") {
      this.changeDirection("s");
    }
    if (
      (this.ifDistanceFromHeadToTailEndShortMove() &&
        this.xLocation === 0 &&
        this.snakeMoveDir === "down") ||
      (this.xLocation === 0 &&
        this.snakeMoveDir === "down" &&
        theFood.y === this.yLocation)
    ) {
      this.changeDirection("d");
    }
  }

  ifDistanceFromHeadToTailEndShortMove() {
    const distance = this.ifTailMinusHeadIsNegative() / this.squareSize;

    return distance <= 4; // if d = 3 ... return true it forses snake to move 'right' or 'left';
  }

  // This happends when head pos y = 350 and tail end pos y = 50
  // if so we sum distance till bottom of play screen
  // and from tail end till top of play screen
  ifTailMinusHeadIsNegative() {
    let distanceInPixels = 0;
    if (this.tail[0].y - this.yLocation < 0) {
      distanceInPixels = this.canvasHeight - this.yLocation + this.tail[0].y;
    } else {
      distanceInPixels = this.tail[0].y - this.yLocation;
    }

    return Math.floor(distanceInPixels);
  }

  amazingGodMode() {
    let newTail = [];
    let evenOrOddRow = 0;
    this.xLocation = 0;
    this.yLocation = this.canvasHeight - this.squareSize * 2;

    for (
      let y = 0;
      y < this.canvasHeight - this.squareSize * 2;
      y += this.squareSize
    ) {
      if (evenOrOddRow % 2 === 0) {
        // Moving RIGHT
        for (let x = 0; x < this.canvasWidth; x += this.squareSize) {
          newTail.push(new Cell(x, y, "right"));
        }
      } else {
        // Moving LEFT
        for (
          let x = this.canvasWidth - this.squareSize;
          x >= 0;
          x -= this.squareSize
        ) {
          newTail.push(new Cell(x, y, "left"));
        }
      }
      evenOrOddRow++;
    }

    // Add the head at the final position
    newTail.push(new Cell(this.xLocation, this.yLocation, "right"));

    return newTail;
  }

  setTheFoodCellEaten(x, y) {
    this.tail.forEach((c) => {
      if (c.x == x && c.y == y) {
        c.isColorAsFoodEaten = true;
      }
    });
  }
}
