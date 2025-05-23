class Ray {
  constructor(pos, angleInRads, angleInDegrees) {
    this.pos = pos;//new Position(x, y);
    this.angleInDegrees = angleInDegrees;
    this.direction = vectorFromAngle(angleInRads);
  }

  intersect(b) {
    // b = boundry
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
    } else {
      return;
    }
  }
}
