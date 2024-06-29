export class Ball{
  constructor(x,y, radius, w,h, ctx, playerOne, playerTwo){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "orange";
    this.ctx = ctx;
    this.W = w;
    this.H = h
    this.speed = 5; // Adjust speed as needed
    this.angle = 20; // Starting angle
    this.xDir = Math.cos(this.angle * Math.PI / 180);
    this.yDir = Math.sin(this.angle * Math.PI / 180);
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.p1score = 0;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(){
    // Update ball position
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    this.isPointAdded();
    // Left wall ball bounce from PAD
    if(this.x < this.playerOne.x+this.playerOne.padWidth+this.radius && this.y < this.playerOne.y+this.playerOne.padHeight && this.y > this.playerOne.y){
      this.xDir *= -1;
    }
    // Right wall ball bounce from PAD
    if(this.x > this.W-this.playerTwo.padWidth-this.radius && this.y < this.playerTwo.y+this.playerTwo.padHeight && this.y > this.playerTwo.y){
      this.xDir *= -1;
    }
    // Top and Bottom wall bounce!
    if (this.y + this.radius >= this.H || this.y - this.radius <= 0) {
      this.yDir *= -1;
    }
    // console.log(this.x, this.xDir, xAdd, this.y, this.yDir, yAdd);
  }

  isPointAdded(){
    if(this.x < -5){
      var p1score = document.getElementById('p2Score');
      p1score.textContent = parseInt(p1score.textContent) + 1;
      this.x = this.W / 2;
      this.y = this.H / 2;
      this.xDir *= -1;
    }
    if(this.x > this.W + 5){
      var p1score = document.getElementById('p1Score');
      p1score.textContent = parseInt(p1score.textContent) + 1;
      this.x = this.W / 2;
      this.y = this.H / 2;
      this.xDir *= -1;
    }
  }
  // -------------- End of Class --------------
}