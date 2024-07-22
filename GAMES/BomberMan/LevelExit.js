class LevelExit extends Position{
  constructor(x,y){
    super(x,y);
  }

  draw(){
    CTX.fillStyle = "rgb(11,222,111)";
    CTX.fillRect(this.x, this.y,bManRadius,bManRadius);
  }
}