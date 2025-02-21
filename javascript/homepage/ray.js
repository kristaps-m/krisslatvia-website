class Ray {
  // constructor(x, y) {
  constructor(pos, angle,t) {
    this.pos = pos;//new Position(x, y); // position
    this.test = t;
    this.direction = vectorFromAngle(angle);//new Position(1, 0);
  }

  lookAt(x, y) {
    this.direction = new Position(x - this.pos.x, y - this.pos.y).normalizeVector();
    // console.log(this.direction);
    // this.direction.x = x;
    // this.direction.y = y;
    // this.direction.normalize();
  }

  drawRay(color = "yellow") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    // ctx.translate(this.pos.x, this.pos.y);
    // ctx.moveTo(0, 0);
    ctx.moveTo(this.pos.x, this.pos.y);
    // ctx.lineTo(this.direction.x * 10, this.direction.y * 10);
    ctx.lineTo(this.pos.x + this.direction.x * 10, this.pos.y + this.direction.y * 10);
    ctx.stroke();
    // console.log(this.x, this.y, this.direction.x, this.direction.y);
  }

  intersect(b) {
    // boundry
    const x1 = b.a.x,
      y1 = b.a.y;
    const x2 = b.b.x,
      y2 = b.b.y;

    const x3 = this.pos.x,
      y3 = this.pos.y;
    const x4 = this.pos.x + this.direction.x,
      y4 = this.pos.y + this.direction.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) return;

    const theta = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if (theta > 0 && theta < 1 && u > 0) {
      const pt = new Position(x1 + theta * (x2 - x1), y1 + theta * (y2 - y1));
      return pt;
      // return true;
    } else {
      return;
    }
  }
}
