class TestObject extends Position {
  constructor(x,y,w=10, h=10) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color;// = "green";
  }

  drawTestObject(color="green") {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  // objectIsHitByRay(ray) {
  //   console.log("-----GOT HIT!!!!");
  // }
}