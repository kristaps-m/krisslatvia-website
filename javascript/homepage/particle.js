class Particle {
  constructor(x = 50, y = 50) {
    this.pos = new Position(x, y);
    this.rays = [];
    for (let a = 0; a < 360; a+=1) {
      this.rays.push(new Ray(this.pos, degreesToRads(a), a));
    }
    this.rightAngleRaysColor = "rgba(255, 238, 0, 0.4)"
  }

  update(x,y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  checkHitRayTrigger(rayTriggerList, boundries){
    for (let theObject of rayTriggerList){
      let hit = false; // Reset hit tracking for each test object
      for (let ray of this.rays) {
        if (theObject.doesSingleRayHitRayTrigger(ray, boundries)) {
          hit = true; // If at least one ray hits, mark as hit
          break; // No need to check more rays for this object
        }
      }
      theObject.color = hit ? "red" : "green";
      theObject.questionMarkColor = hit ? "yellow" : "white";
    }
  }

  look(boundries) {
    // first loop goes through all rays
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      // second loop goes through all boundries and checks if ray intersects with each boundary
      for (let b of boundries){
        const pt = ray.intersect(b);
        if(pt){
          const distance = distanceBetween2Points(this.pos.x, this.pos.y, pt.x, pt.y);
          if (distance < record) {
            closest = pt; record = distance;
          };
        }
      }
      if(closest){
        // TODO - create more colorful efects for rays!
        this.thisIsMyPuppy(closest);
      }
    }
  }

  thisIsMyPuppy(closest, theAngle = null){
    ctx.strokeStyle = ray.angleInDegrees % 90 === 0 ? this.rightAngleRaysColor : "rgba(249, 255, 0, 0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(closest.x, closest.y);
    ctx.stroke();
  }
};