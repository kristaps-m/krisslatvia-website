class RayTrigger extends Position {
  constructor(x,y,w=10, h=10) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = "green";
    this.questionMarkColor = "white";
  }

  drawRayTrigger() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.fillText("?", this.x, this.y);
    this.displayText("?", this.x, this.y, this.questionMarkColor);
  }

  doesSingleRayHitRayTrigger(ray, walls) {
    const edges = [
        new Boundary(this.x, this.y, this.x + this.w, this.y), // Top 0,0 - 10,0
        new Boundary(this.x, this.y, this.x, this.y + this.h), // Left 0,0 - 0,10
        new Boundary(this.x + this.w, this.y, this.x + this.w, this.y + this.h), // Right 10,0 - 10,10
        new Boundary(this.x, this.y + this.h, this.x + this.w, this.y + this.h)  // Bottom 0,10 - 10,10
    ];

    const oneRay = new Ray(new Position(ray.pos.x, ray.pos.y), degreesToRads(ray.angleInDegrees), ray.angleInDegrees);

    let closestHit = null;
    let closestDistance = Infinity;
    let hitObject = null;

    // Check for intersections with rectangle
    for (let edge of edges) {
        const hitPoint = oneRay.intersect(edge);
        if (hitPoint) {
            const distance = distanceBetween2Points(ray.pos.x, ray.pos.y, hitPoint.x, hitPoint.y);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestHit = hitPoint;
                hitObject = "rectangle"; // Mark that we hit the rectangle
            }
        }
    }

    // Check for intersections with walls/boundries
    for (let wall of walls) {
        const hitPoint = oneRay.intersect(wall);
        if (hitPoint) {
            const distance = distanceBetween2Points(ray.pos.x, ray.pos.y, hitPoint.x, hitPoint.y);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestHit = hitPoint;
                hitObject = "wall"; // Mark that we hit a wall first
            }
        }
    }

    // Only return true if the rectangle was the closest hit
    return hitObject === "rectangle";
  }

  displayText(theText, x, y, color = "white") {
    let fSize = 25;
    ctx.font = `bold ${fSize}px Comic Sans MS`;
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(
      theText,
      x + this.w / 2,
      y + (this.h * 2) / 2.5
    );
  }
}