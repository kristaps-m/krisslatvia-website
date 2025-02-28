class Particle {
  constructor(x = 50, y = 50) {
    this.pos = new Position(x, y);
    this.rays = [];
    for (let a = 0; a < 360; a+=1) {
      this.rays.push(new Ray(this.pos, degreesToRads(a), a));
    }
    this.rightAngleRaysColor = "rgba(255, 238, 0, 0.4)";
    this.startingAngle = 0;
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

  look(boundries, angleSize) {
    this.startingAngle+=5;
    if(this.startingAngle >= 360){
      this.startingAngle=0;
    }
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
        this.thisIsMyPuppy(closest, ray, angleSize);
      }
    }
  }

  thisIsMyPuppy(closest, ray, angleSize){
    // optimised Radar effect by chatgpt.com
    // mine was to much nested coditionals (if statements)
    let endAngle = (this.startingAngle + angleSize) % 360;

    let withinRange = false;
    if (this.startingAngle <= endAngle) {
        withinRange = ray.angleInDegrees >= this.startingAngle && ray.angleInDegrees <= endAngle;
    } else { // Case when it wraps around 360
        withinRange = ray.angleInDegrees >= this.startingAngle || ray.angleInDegrees <= endAngle;
    }

    if (withinRange) {
        ctx.strokeStyle = "rgba(251, 255, 0, 0.4)";
    } else {
        ctx.strokeStyle = ray.angleInDegrees % 90 === 0 ? this.rightAngleRaysColor : "rgba(249, 255, 0, 0.6)";
    }

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(closest.x, closest.y);
    ctx.stroke();
  }
};