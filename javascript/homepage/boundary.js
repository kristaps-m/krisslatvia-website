// class Line {
//   constructor(x1, y1, x2, y2) {
//     this.x1 = x1;
//     this.y1 = y1;
//     this.x2 = x2;
//     this.y2 = y2;
//   }
// }

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = new Position(x1, y1);
    this.b = new Position(x2, y2);
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }
}