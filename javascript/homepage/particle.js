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

  look(boundries) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
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