class Particle {
  constructor(x = 50, y = 50) {
    this.pos = new Position(x, y);
    this.rays = [];
    for (let a = 0; a < 360; a+=2) {
      this.rays.push(new Ray(this.pos, degreesToRads(a), a));
    }
  }

  update(x,y) {
    this.pos.x = x;
    this.pos.y = y;
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

  look(boundries, testObject) {
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
      // const getLineFromTestObject = new Boundary(testObject.x, testObject.y+testObject.h, testObject.x+testObject.w, testObject.y+testObject.h);
      // const pt_TO = ray.intersect(getLineFromTestObject);
      // if(pt_TO){
      //   const distance_TO = distanceBetween2Points(this.pos.x, this.pos.y, pt_TO.x, pt_TO.y);
      //   if (distance_TO < record_TO) {
      //     closest_TO = pt_TO; record_TO = distance_TO;
      //   };
      //   record_TO = Math.min(record_TO, distance_TO);
      // }
      // if(this.doesSingleRayHit_testObject({x:ray.pos.x, y:ray.pos.y}, testObject, ray.test)){
      //   isTestObject_1_hit = true;
      //   const distance = distanceBetween2Points(this.pos.x, this.pos.y, testObject.x, testObject.y);
      //   console.log("HIT", distance);
      // }else{
      //   isTestObject_1_hit = false;
      // }
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
        // if(this.doesSingleRayHit_testObject({x:ray.x, y:ray.y}, testObject, ray.test)){
        //   isTestObject_1_hit = true;
        // }else{
        //   isTestObject_1_hit = false;
        // }

        // ray.x pos.
      }
      // if(closest_TO){
      //   isTestObject_1_hit = true;
      // }else{
      //   isTestObject_1_hit = false;
      // }
      // else{
      //   if(this.doesSingleRayHit_testObject({x:ray.pos.x, y:ray.pos.y}, testObject, ray.test)){
      //     // isTestObject_1_hit = true;
      //     console.log("HIT");
      //   }else{
      //     isTestObject_1_hit = false;
      //   }
      // }
      // if (this.doesSingleRayHit_testObject(this.pos, testObject, ray.test)) {
      //     console.log("Hit detected!");
      // }
      // console.log(this.pos, testObject, boundries, ray.test);
      // console.log(this.pos);
      // console.log(testObject);
      // console.log(boundries.length);
      // console.log(ray.test);
      // const x = this.doesSingleRayHit_testObject(this.pos, testObject, boundries, ray.test);
      // console.log(x);
      // if (this.doesSingleRayHit_testObject(this.pos, testObject, boundries, ray.test)) {
      //   console.log("Rectangle hit and not blocked by walls!");
      // }
    }
    // console.log("isTestObject_1_hit",isTestObject_1_hit);
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