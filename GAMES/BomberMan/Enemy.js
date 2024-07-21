class Enemy extends Position{
  constructor({x,y,size, enemyMovement = "", start = 1, end = Math.min(W,H),speed = 3}) {
    super(x,y);
    this.size = size;
    this.enemyMovement = enemyMovement;
    this.speed = speed;
    this.horDir = this.speed;
    this.vertDir = this.speed;
    this.start = start;
    this.end = end;
  }
  draw() {
    CTX.fillStyle = "red";
    CTX.fillRect(this.x, this.y, this.size, this.size);
  }

  update(){
    if(this.enemyMovement === "h"){
      if(this.x + this.size > this.end){
        this.horDir = -this.speed;
      }else if(this.x < this.start){
        this.horDir = this.speed;
      }
      this.x += this.horDir;

    }else if(this.enemyMovement ===  "v"){
      if(this.y + this.size > this.end){
        this.vertDir = -3;
      }else if(this.y < this.start){
        this.vertDir = 3;
      }

      this.y += this.vertDir;
    }
  }
}
