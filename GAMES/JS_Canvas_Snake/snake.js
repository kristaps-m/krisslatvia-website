import { Cell } from "./cell.js";
import { Food } from "./Food.js";

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
    // add is AUTO PLAY ON LOL :D
    if(this.isSnakeHeadCrashedInTail(0, this.ySpeed) === true){
      if(this.xLocation === this.canvasWidth - this.squareSize){
        this.changeDirection("a");
      } else if (this.xLocation === 0){
        this.changeDirection("d");
      }
    }else{
      this.yLocation += this.ySpeed;
    }
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
    // // Add element at BEGINNING
    // this.tail.unshift(new Cell(this.tail[0].x, this.tail[0].y));
    // Add element at the END?!?!?
    this.tail.push(new Cell(this.xLocation, this.yLocation));
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
      ){ // element.y = 0 === 350 + 50
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
      // this.tail[this.tail.length - 1].x === this.canvasWidth - this.squareSize &&
      // this.tail[this.tail.length - 2].x === this.canvasWidth - this.squareSize*2 &&
      // this.tail[this.tail.length - 3].x === this.canvasWidth - this.squareSize*3 &&
      this.snakeMoveDir === "right"
    ){
      console.log(theFood.x, theFood.y);
      this.changeDirection("s");
    }
    if(this.xLocation === this.canvasWidth - this.squareSize &&
      // this.tail[this.tail.length - 1].x === this.canvasWidth - this.squareSize &&
      // this.tail[this.tail.length - 2].x === this.canvasWidth - this.squareSize &&
      // this.tail[this.tail.length - 3].x === this.canvasWidth - this.squareSize*2 &&
      this.snakeMoveDir === "down"
      // ||
      && theFood.y === this.yLocation
      // && !this.checkIsItSafeToTurnLeftOrRightForFood(theFood)
      && this.checkIfItSafeToTurnLeft()
    ){
      console.log(theFood.x, theFood.y);
      this.changeDirection("a");
    }
    if(this.xLocation === 0 &&
      // this.tail[this.tail.length - 1].x === 0 &&
      // this.tail[this.tail.length - 2].x === this.squareSize &&
      // this.tail[this.tail.length - 3].x === this.squareSize*2 &&
      this.snakeMoveDir === "left"
    ){
      console.log(theFood.x, theFood.y);
      this.changeDirection("s");
    }
    if(this.xLocation === 0 &&
      // this.tail[this.tail.length - 1].x === 0 &&
      // this.tail[this.tail.length - 2].x === 0 &&
      // this.tail[this.tail.length - 3].x === this.squareSize &&
      this.snakeMoveDir === "down"
      // ||
      && theFood.y === this.yLocation
      // && Distance to food < left over tail length?
      // && !this.checkIsItSafeToTurnLeftOrRightForFood(theFood)
      && this.checkIfItSafeToTurnRight()
    ){
      console.log(theFood.x, theFood.y);
      this.changeDirection("d");
    }
  }

  checkIsItSafeToTurnLeftOrRightForFood(theFood) {
    const distFromHeadToFood = Math.abs(this.xLocation - theFood.x) / this.squareSize;
    let distFromTailHitTilEnd = 0;
    for (let index = 0; index < this.tail.length; index++) {
      const element = this.tail[index];
      if(element.y === theFood.y){
        distFromTailHitTilEnd = index+1;
        break;
      }
    }

    return distFromHeadToFood < distFromTailHitTilEnd;
  }

  checkIfItSafeToTurnRight(){
    const distFromLeftToRight = this.canvasWidth / this.squareSize + 3;
    let distFromTailHitTilEnd = 0;
    for (let index = 0; index < this.tail.length; index++) {
      const tailCell = this.tail[index];
      if(tailCell.y === this.yLocation && tailCell.x === this.canvasWidth - this.squareSize){
        distFromTailHitTilEnd = index;
      }
    }

    // distFromLtoR < the left over tail
    return distFromLeftToRight < distFromTailHitTilEnd;
  }

  checkIfItSafeToTurnLeft(){
    const distFromRightToLeft = this.canvasWidth / this.squareSize + 3;
    let distFromTailHitTilEnd = 0;
    for (let index = 0; index < this.tail.length; index++) {
      const tailCell = this.tail[index];
      if(tailCell.y === this.yLocation && tailCell.x === 0){
        distFromTailHitTilEnd = index;
      }
    }

    // distFromLtoR < the left over tail
    return distFromRightToLeft < distFromTailHitTilEnd;
  }
}
