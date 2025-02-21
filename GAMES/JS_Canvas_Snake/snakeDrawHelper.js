export class SnakeDrawHelper{
  constructor(ctx, squareSize, snakeOuterBodyLinesColor){
    this.ctx = ctx;
    this.squareSize = squareSize;
    this.snakeOuterBodyLinesColor = snakeOuterBodyLinesColor;
    this.snakeBodyLineWidth = 5;
    if(this.squareSize <= 10){
      this.snakeBodyLineWidth = 2;
    } else if (this.squareSize <= 5){
      this.snakeBodyLineWidth = 1;
    }
  }
  drawCornerLinesBottomRight(ctx, theCell){
    ctx.beginPath();
    ctx.moveTo(theCell.x + this.squareSize, theCell.y); // B
    ctx.lineTo(theCell.x + this.squareSize, theCell.y + this.squareSize); // C
    ctx.lineTo(theCell.x, theCell.y + this.squareSize); // D
    ctx.lineWidth = this.snakeBodyLineWidth;
    ctx.strokeStyle = this.snakeOuterBodyLinesColor;
    ctx.stroke();
  }

  drawCornerLinesBottomLeft(ctx, theCell){
    ctx.beginPath();
    ctx.moveTo(theCell.x, theCell.y); // A
    ctx.lineTo(theCell.x, theCell.y + this.squareSize); // D
    ctx.lineTo(theCell.x + this.squareSize, theCell.y + this.squareSize); // C
    ctx.lineWidth = this.snakeBodyLineWidth;
    ctx.strokeStyle = this.snakeOuterBodyLinesColor;
    ctx.stroke();
  }

  drawCornerLinesTopRight(ctx, theCell){
    ctx.beginPath();
    ctx.moveTo(theCell.x, theCell.y); // A
    ctx.lineTo(theCell.x + this.squareSize, theCell.y); // B
    ctx.lineTo(theCell.x + this.squareSize, theCell.y + this.squareSize); // C
    ctx.lineWidth = this.snakeBodyLineWidth;
    ctx.strokeStyle = this.snakeOuterBodyLinesColor;
    ctx.stroke();
  }

  drawCornerLinesTopLeft(ctx, theCell){
    ctx.beginPath();
    ctx.moveTo(theCell.x, theCell.y + this.squareSize); // D
    ctx.lineTo(theCell.x, theCell.y); // A
    ctx.lineTo(theCell.x + this.squareSize, theCell.y); // B
    ctx.lineWidth = this.snakeBodyLineWidth;
    ctx.strokeStyle = this.snakeOuterBodyLinesColor;
    ctx.stroke();
  }

  drawHorizontalLines(ctx, theCell){
    ctx.beginPath();
    ctx.moveTo(theCell.x, theCell.y); // A
    ctx.lineTo(theCell.x + this.squareSize, theCell.y); // B
    ctx.moveTo(theCell.x + this.squareSize, theCell.y + this.squareSize);
    ctx.lineTo(theCell.x + this.squareSize, theCell.y + this.squareSize); // C
    ctx.lineTo(theCell.x, theCell.y + this.squareSize);  // D
    ctx.lineWidth = this.snakeBodyLineWidth;
    ctx.strokeStyle = this.snakeOuterBodyLinesColor;
    ctx.stroke();
  }

  drawVerticalLines(ctx, theCell){
    ctx.beginPath();
    ctx.moveTo(theCell.x, theCell.y); // A
    ctx.lineTo(theCell.x, theCell.y + this.squareSize);  // D
    ctx.moveTo(theCell.x + this.squareSize, theCell.y);
    ctx.lineTo(theCell.x + this.squareSize, theCell.y); // B
    ctx.lineTo(theCell.x + this.squareSize, theCell.y + this.squareSize); // C
    ctx.lineWidth = this.snakeBodyLineWidth;
    ctx.strokeStyle = this.snakeOuterBodyLinesColor;
    ctx.stroke();
  }

  drawSnakeEyes(context, xLocation, yLocation, snakeMoveDir) {
    context.fillStyle = "white";
    const eyeSize = this.squareSize / 5;
    if (snakeMoveDir === "right") {
      const leftEyeLoc = {
        x: xLocation + eyeSize * 3,
        y: yLocation + eyeSize,
      };
      const rightEyeLoc = {
        x: xLocation + eyeSize * 3,
        y: yLocation + eyeSize * 3,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    } else if (snakeMoveDir === "left") {
      const leftEyeLoc = {
        x: xLocation + eyeSize,
        y: yLocation + eyeSize,
      };
      const rightEyeLoc = {
        x: xLocation + eyeSize,
        y: yLocation + eyeSize * 3,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    } else if (snakeMoveDir === "up") {
      const leftEyeLoc = {
        x: xLocation + eyeSize,
        y: yLocation + eyeSize,
      };
      const rightEyeLoc = {
        x: xLocation + eyeSize * 3,
        y: yLocation + eyeSize,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    } else if (snakeMoveDir === "down") {
      const leftEyeLoc = {
        x: xLocation + eyeSize,
        y: yLocation + eyeSize * 3,
      };
      const rightEyeLoc = {
        x: xLocation + eyeSize * 3,
        y: yLocation + eyeSize * 3,
      };
      this.drawEyesHelper(context, leftEyeLoc, rightEyeLoc, eyeSize);
    }
  }

  drawEyesHelper(context, leftEye, rightEye, size) {
    context.fillRect(leftEye.x, leftEye.y, size, size);
    context.fillRect(rightEye.x, rightEye.y, size, size);
  }
}