class Particle {
  constructor(x = 50, y = 50) {
    this.pos = new Position(x, y);
    this.rays = [];
    for (let a = 0; a < 360; a+=1) {
      this.rays.push(new Ray(this.pos, degreesToRads(a), a));
    }
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
        ctx.strokeStyle = ray.test % 90 === 0 ? "rgba(255, 238, 0, 0.4)" : "rgba(249, 255, 0, 0.6)";
        // ctx.strokeStyle = "rgba(255, 240, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();

      }

    }
  }

  doesSingleRayHit_testObject(rayStartPoint, testObject, walls, angle = 0) {
    console.log(rayStartPoint, testObject, walls, angle = 0);
    const edges = [
        new Boundary(testObject.x, testObject.y, testObject.x + testObject.w, testObject.y), // Top
        new Boundary(testObject.x, testObject.y, testObject.x, testObject.y + testObject.h), // Left
        new Boundary(testObject.x + testObject.w, testObject.y, testObject.x + testObject.w, testObject.y + testObject.h), // Right
        new Boundary(testObject.x, testObject.y + testObject.h, testObject.x + testObject.w, testObject.y + testObject.h)  // Bottom
    ];

    const oneRay = new Ray(new Position(rayStartPoint.pos.x, rayStartPoint.pos.y), degreesToRads(angle), angle);

    let closestHit = null;
    let closestDistance = Infinity;
    let hitObject = null;

    // Check for intersections with rectangle
    for (let edge of edges) {
        const hitPoint = oneRay.intersect(edge);
        if (hitPoint) {
            const distance = distanceBetween2Points(rayStartPoint.pos.x, rayStartPoint.pos.y, hitPoint.x, hitPoint.y);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestHit = hitPoint;
                hitObject = "rectangle"; // Mark that we hit the rectangle
            }
        }
    }

    // Check for intersections with walls
    for (let wall of walls) {
        const hitPoint = oneRay.intersect(wall);
        if (hitPoint) {
            const distance = distanceBetween2Points(rayStartPoint.pos.x, rayStartPoint.pos.y, hitPoint.x, hitPoint.y);
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


  // doesSingleRayHit_testObject(rayStartPoint, testObject, angle = 0) {
  //   // Define all four edges of the rectangle
  //   const edges = [
  //       new Boundary(testObject.x, testObject.y, testObject.x + testObject.w, testObject.y), // Top
  //       new Boundary(testObject.x, testObject.y, testObject.x, testObject.y + testObject.h), // Left
  //       new Boundary(testObject.x + testObject.w, testObject.y, testObject.x + testObject.w, testObject.y + testObject.h), // Right
  //       new Boundary(testObject.x, testObject.y + testObject.h, testObject.x + testObject.w, testObject.y + testObject.h)  // Bottom
  //   ];

  //   // Create a ray
  //   const oneRay = new Ray(new Position(rayStartPoint.x, rayStartPoint.y), degreesToRads(angle), angle);

  //   // Check intersection with each edge
  //   for (let edge of edges) {
  //       if (oneRay.intersect(edge)) {
  //           return true; // Return true if the ray hits any edge
  //       }
  //   }
  //   return false; // Return false if no edges were hit
  // }


  doesSingleRayHit_testObject(rayStartPoint, testObject, angle=0) { //  testObject
    // const oneRay = this.rays[269]; // ray that shoots straight up?!
    // let hitCounter = 0;
    const getLineFromTestObject = new Boundary(testObject.x, testObject.y+testObject.h, testObject.x+testObject.w, testObject.y+testObject.h);

    // for (let oneRay of this.rays){
    // console.log("before",this.rays[269]);
    // const oneRay = new Ray(
    //   new Position(this.rays[269].pos.x, this.rays[269].pos.y),
    //   degreesToRads(this.rays[269].test),
    //   this.rays[269].test
    // );
    // const oneRay = new Ray(
    //   new Position(this.rays[269].pos.x, this.rays[269].pos.y),
    //   degreesToRads(this.rays[269].test),
    //   this.rays[269].test
    // );
    // console.log("after",oneRay);
    // console.log(rayStartPoint);
    const oneRay = new Ray(new Position(rayStartPoint.x, rayStartPoint.y), degreesToRads(angle), angle);
    // const oneRay = new Ray(new Position(rayHitPoint.x, rayHitPoint.y), degreesToRads(angle), angle);
    const didItHit = oneRay.intersect(getLineFromTestObject);
    // console.log(didItHit);
    //   if(didItHit){
    //     // return didItHit;
    //     hitCounter++;
    //   }
    //   // console.log(oneRay);
    //   // console.log(getLineFromTestObject);
    //   // bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
    //   // console.log(didItHit);
    // }

    // return hitCounter > 0;
    return didItHit;
  }

  look(boundries, testObjectList) {
    // first loop goes through all rays
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      // let closest_TO = null;
      // let record_TO = Infinity;
      // second loop goes through all boundries and checks if ray intersects with each boundary
      for (let b of boundries){
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
        ctx.strokeStyle = ray.test % 90 === 0 ? "rgba(255, 238, 0, 0.4)" : "rgba(249, 255, 0, 0.6)";
        // ctx.strokeStyle = "rgba(255, 240, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();

      }
      /* --------------------------------------------------------- */
      let closest_TO = null;
      let record_TO = Infinity;
      let thisIsMyTestObject = null;
      // second loop goes through all boundries and checks if ray intersects with each boundary
      for (let oldB of testObjectList){
        const b = new Boundary(oldB.x, oldB.y+oldB.h, oldB.x+oldB.w, oldB.y+oldB.h);
        const pt = ray.intersect(b);
        if(pt){
          const distance = distanceBetween2Points(this.pos.x, this.pos.y, pt.x, pt.y);
          if (distance < record_TO) {
            closest_TO = pt; record_TO = distance;
          };
          record_TO = Math.min(record_TO, distance);

        }
        if(closest_TO){
          thisIsMyTestObject = oldB
        }
      }
      if(closest_TO){
        // console.log(closest_TO);
        // if angle is straight (0, 90, 180, 270) then COLOR #FF8C00!
        // ctx.strokeStyle = ray.test % 90 === 0 ? "rgba(255, 238, 0, 0.4)" : "rgba(249, 255, 0, 0.6)";
        ctx.strokeStyle = "red";//"rgba(255, 240, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        // ctx.lineTo(closest_TO.x, closest_TO.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();
        /**
         NOW it draws red lines from particle x & y to closest wall intersection
         if red line hits a rectangle bottom wall, then
         if red line distance is smaller than distance to rectangle hit point then
         rectangle is not hit by ray
         */
        const distToRectWallHitPoint = distanceBetween2Points(this.pos.x, this.pos.y, closest_TO.x, closest_TO.y);
        const distToWallHit = distanceBetween2Points(this.pos.x, this.pos.y, closest.x, closest.y);
        if(distToWallHit < distToRectWallHitPoint){
          // console.log("distToWallHit < distToRectWallHitPoint");
          thisIsMyTestObject.color = "green";
        }else{
          // console.log("HIT?!");
          thisIsMyTestObject.color = "red";
        }
      }
    }
  }

  draw(){
    for (let ray of this.rays) {
      if(ray.test % 90 === 0){
        ray.drawRay("darkblue");
      }else{
        ray.drawRay();
      }
    }
  }
};