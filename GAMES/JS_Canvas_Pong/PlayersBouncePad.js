export class PlayersBouncePad{
  constructor(x,y, pw,ph, w,h, ctx, padMoveSpeed, playerNr){
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.W = w;
    this.H = h;
    this.color = "green";
    this.padWidth = pw;
    this.padHeight = ph;
    this.padMoveSpeed = padMoveSpeed;
    this.playerNr = playerNr;
  }

  draw(){
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.padWidth,this.padHeight);
  }

  move(eventKey){
    if(this.playerNr === 1){
      this.movementHandler(eventKey, "w", "s");
    }else if(this.playerNr === 2){
      this.movementHandler(eventKey, "ArrowUp", "ArrowDown");
    }
    if(this.y < this.padHeight / 3){
      this.y = 0;
    }else if(this.y + this.padHeight >  this.H - this.padHeight / 3){
      this.y =  this.H - this.padHeight
    }
  }

  movementHandler(eventKey, upKey, downKey) {
    switch (eventKey) {
    case downKey:
        this.y += this.padMoveSpeed;
        break;
    case upKey:
        this.y -= this.padMoveSpeed;
        break;
    }
  }
  // -------------- End of Class --------------
}