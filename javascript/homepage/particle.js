class Particle {
  constructor(x = 50, y = 50) {
    this.pos = new Position(x, y);
    this.rays = [];
    for (let a = 0; a < 360; a+=2) {
      this.rays.push(new Ray(this.pos, degreesToRads(a), a));
    }
    this.rightAngleRaysColor = "rgba(255, 238, 0, 0.4)"
  }

  update(x,y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  lookForTestObjects(boundries) {
    // first loop goes through all rays
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      // second loop goes through all boundries and checks if ray intersects with each boundary
      for (let oldB of boundries){
        const b = new Boundary(oldB.x, oldB.y+oldB.h, oldB.x+oldB.w, oldB.y+oldB.h);
        const pt = ray.intersect(b);
        if(pt){
          const distance = distanceBetween2Points(this.pos.x, this.pos.y, pt.x, pt.y);
          if (distance < record) {
            closest = pt; record = distance;
          };
          record = Math.min(record, distance);

        }
      }

      if(closest){
        // console.log(closest);
        // if angle is straight (0, 90, 180, 270) then COLOR #FF8C00!
        ctx.strokeStyle = ray.angleInDegrees % 90 === 0 ? this.rightAngleRaysColor : "rgba(249, 255, 0, 0.6)";
        // ctx.strokeStyle = "rgba(255, 240, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();

      }

    }
  }

  look(boundries, testObjectList) {
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
          // record = Math.min(record, distance);

        }
      }
      if(closest){
        // if angle is straight (0, 90, 180, 270) then COLOR #FF8C00!
        ctx.strokeStyle = ray.angleInDegrees % 90 === 0 ? "rgba(255, 238, 0, 0.4)" : "rgba(249, 255, 0, 0.6)";
        // ctx.strokeStyle = "rgba(255, 240, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();

      }
      /* --------------------------------------------------------- */
      // second loop goes through all boundries and checks if ray intersects with each boundary
      let closest_TO = {pt:null, testObj:null};
      let record_TO = Infinity;
      for (let oldB of testObjectList){
        const b = new Boundary(oldB.x, oldB.y+oldB.h, oldB.x+oldB.w, oldB.y+oldB.h);
        const pt = ray.intersect(b);
        let hit = false; // Reset hit tracking for each test object
        for (let ray of this.rays) {
          if (oldB.doesSingleRayHit_testObject(ray, boundries)) {
            hit = true; // If at least one ray hits, mark as hit
            break; // No need to check more rays for this object
          }
        }
        // if(pt){
        //   const distance = distanceBetween2Points(this.pos.x, this.pos.y, pt.x, pt.y);
        //   if (distance < record_TO) {
        //     closest_TO = {pt:pt, testObj:oldB}; record_TO = distance;
        //   } else{
        //   }
        //   record_TO = Math.min(record_TO, distance);

        // }
        // Update color based on final hit status
        oldB.color = hit ? "red" : "green";
      }
      // if(closest_TO.pt){
      //   // console.log(closest_TO);
      //   // if angle is straight (0, 90, 180, 270) then COLOR #FF8C00!
      //   // ctx.strokeStyle = ray.angleInDegrees % 90 === 0 ? "rgba(255, 238, 0, 0.4)" : "rgba(249, 255, 0, 0.6)";
      //   ctx.strokeStyle = "red";//"rgba(255, 240, 0, 0.3)";
      //   ctx.lineWidth = 1;
      //   ctx.beginPath();
      //   ctx.moveTo(this.pos.x, this.pos.y);
      //   // ctx.lineTo(closest_TO.x, closest_TO.y);
      //   ctx.lineTo(closest_TO.testObj.x, closest_TO.testObj.y);
      //   ctx.stroke();
      //   /**
      //    NOW it draws red lines from particle x & y to closest wall intersection
      //    if red line hits a rectangle bottom wall, then
      //    if red line distance is smaller than distance to rectangle hit point then
      //    rectangle is not hit by ray
      //    */
      //   // const distToRectWallHitPoint = distanceBetween2Points(this.pos.x, this.pos.y, closest_TO.x, closest_TO.y);
      //   // const distToWallHit = distanceBetween2Points(this.pos.x, this.pos.y, closest.x, closest.y);
      //   // if(distToWallHit < distToRectWallHitPoint){
      //   //   // console.log("distToWallHit < distToRectWallHitPoint");
      //   //   thisIsMyTestObject.color = "green";
      //   // }else{
      //   //   // console.log("HIT?!");
      //   //   thisIsMyTestObject.color = "red";
      //   // }
      // }
    }
  }

  draw(){
    for (let ray of this.rays) {
      if(ray.angleInDegrees % 90 === 0){
        ray.drawRay("darkblue");
      }else{
        ray.drawRay();
      }
    }
  }
};