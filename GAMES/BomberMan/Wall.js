class Wall{
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
  }
  draw() {
    CTX.fillStyle = "brown";
    CTX.fillRect(this.x, this.y, this.size, this.size);
  }
}