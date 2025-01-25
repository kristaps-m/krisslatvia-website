import { Cell } from "./cell.js";

export class Snake {
  constructor(squareSize, canvasWidth, canvasHeight) {
    this.squareSize = squareSize;
    this.xLocation = this.squareSize * 3; // location of head - movement speed
    this.yLocation = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.tail = [
      new Cell(0, 0),
      new Cell(this.squareSize, 0),
      new Cell(this.squareSize * 2, 0),
    ];
    this.snakeMoveDir = "right";
    this.canChangeDirection = false; // DEFAULT = false
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
    this.drawSnakeEyes(context);
    this.tail.push(new Cell(this.xLocation, this.yLocation));
  }

  drawTail(ctx, color) {
    this.tail.forEach((cEll) => {
      ctx.fillStyle = color;
      ctx.fillRect(cEll.x, cEll.y, this.squareSize, this.squareSize);
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
      if (element.x === this.xLocation + add_X && element.y === this.yLocation + add_Y ) {
        return true;
      }
      if(element.y === 0 && this.yLocation + add_Y === this.canvasHeight
        && element.x === this.xLocation
      ){
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
          this.snakeMoveDir = "up";
          this.canChangeDirection = false; // Direction change happened
        }
        break;
      case "Down":
      case "s":
        if (this.ySpeed !== this.squareSize * -1) {
          this.xSpeed = 0;
          this.ySpeed = this.squareSize * 1;
          this.snakeMoveDir = "down";
          this.canChangeDirection = false;
        }
        break;
      case "Left":
      case "a":
        if (this.xSpeed !== this.squareSize * 1) {
          this.ySpeed = 0;
          this.xSpeed = this.squareSize * -1;
          this.snakeMoveDir = "left";
          this.canChangeDirection = false;
        }
        break;
      case "Right":
      case "d":
        if (this.xSpeed !== this.squareSize * -1) {
          this.ySpeed = 0;
          this.xSpeed = this.squareSize * 1;
          this.snakeMoveDir = "right";
          this.canChangeDirection = false;
        }
        break;
      case "x":
        this.tail.unshift(new Cell(this.tail[0].x, this.tail[0].y));
      default:
        break;
    }
  }

  drawSnakeEyes(context) {
    context.fillStyle = "white";
    const eyeSize = this.squareSize / 5;
    if (this.snakeMoveDir === "right") {
      const leftEyeLoc = {
        x: this.xLocation + eyeSize * 3,
        y: this.yLocation + eyeSize,
      };
      const rightEyeLoc = {
        x: this.xLocation + eyeSize * 3,
        y: this.yLocation + eyeSize * 3,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    } else if (this.snakeMoveDir === "left") {
      const leftEyeLoc = {
        x: this.xLocation + eyeSize,
        y: this.yLocation + eyeSize,
      };
      const rightEyeLoc = {
        x: this.xLocation + eyeSize,
        y: this.yLocation + eyeSize * 3,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    } else if (this.snakeMoveDir === "up") {
      const leftEyeLoc = {
        x: this.xLocation + eyeSize,
        y: this.yLocation + eyeSize,
      };
      const rightEyeLoc = {
        x: this.xLocation + eyeSize * 3,
        y: this.yLocation + eyeSize,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    } else if (this.snakeMoveDir === "down") {
      const leftEyeLoc = {
        x: this.xLocation + eyeSize,
        y: this.yLocation + eyeSize * 3,
      };
      const rightEyeLoc = {
        x: this.xLocation + eyeSize * 3,
        y: this.yLocation + eyeSize * 3,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    }
  }

  drawEyesHelper(context, leftEye, rightEye, size) {
    context.fillRect(leftEye.x, leftEye.y, size, size);
    context.fillRect(rightEye.x, rightEye.y, size, size);
  }

  // if in theSnakeGameLoop this function is activated snake
  // automaticaly moves down in row to collect all food and WIN :) <3
  automaticalyMoveSnakeToCollectFood(theFood){
    if(this.xLocation === this.canvasWidth - this.squareSize &&
      this.snakeMoveDir === "right"
    ){
      this.changeDirection("s");
    }
    if((this.ifDistanceFromHeadToTailEndShortMove()
      && this.snakeMoveDir === "down"
      && this.xLocation === this.canvasWidth - this.squareSize) ||
      (this.xLocation === this.canvasWidth - this.squareSize &&
      this.snakeMoveDir === "down"
      && theFood.y === this.yLocation)
    ){
      this.changeDirection("a");
    }
    if(this.xLocation === 0 &&
      this.snakeMoveDir === "left"
    ){
      this.changeDirection("s");
    }
    if((this.ifDistanceFromHeadToTailEndShortMove()
      && this.xLocation === 0
      && this.snakeMoveDir === "down")
      || (this.xLocation === 0 && this.snakeMoveDir === "down" && theFood.y === this.yLocation)
    ){
      this.changeDirection("d");
    }
  }

  ifDistanceFromHeadToTailEndShortMove(){
    const distance = this.ifTailMinusHeadIsNegative() / this.squareSize;

    return distance <= 4; // if d = 3 ... return true it forses snake to move 'right' or 'left';
  }

  ifTailMinusHeadIsNegative(){
    let distanceInPixels = 0;
    if(this.tail[0].y - this.yLocation < 0){
      distanceInPixels = (this.canvasHeight - this.yLocation) + this.tail[0].y;
    }else{
      distanceInPixels = this.tail[0].y - this.yLocation;
    }

    return Math.floor(distanceInPixels);
  }
}
