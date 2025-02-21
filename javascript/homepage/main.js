const canvas = document.getElementById("homepage_canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 550;
const HEIGHT = 400;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const rayCount = 100;
// const boundry = new Boundary(100, 100, 200, 200);
let boundries = [];
multipleBoundries();
const partilce = new Particle();
const ray = new Ray(100, 200);
let framesCounter = 0;
let mouseX = 0;
let mouseY = 0;

function animate() {
  if (framesCounter % 3 === 0) {
    // const pos = getMousePos();
    // console.log(pos.x, pos.y);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // boundry.draw(ctx);
    for (let b of boundries){
      b.draw(ctx);
    }
    partilce.update(mouseX, mouseY);
    partilce.draw(ctx);
    // partilce.look(boundry);
    partilce.look(boundries);
    // ray.drawRay();
    // getMousePos();
    // ray.lookAt(mouseX, mouseY);
    // rayHitWallPoint = ray.intersect(boundry);
    // // console.log(rayHitWallPoint); // true if hit wall else undefined
    // if(rayHitWallPoint){
    //   drawCircleAtMouse(rayHitWallPoint.x, rayHitWallPoint.y); // Pass mouseX and mouseY
    // }
  }
  if (framesCounter === 1000000) {
    framesCounter = 0;
  }
  requestAnimationFrame(animate);
  framesCounter++;
}

animate();

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect(); // Get canvas position
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

// Function using mouse position
function drawCircleAtMouse(lineHitX=0, lineHitY=0) {
  ctx.beginPath();
  ctx.arc(lineHitX, lineHitY, 7, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function multipleBoundries() {
  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * WIDTH;
    const x2 = Math.random() * WIDTH;
    const y1 = Math.random() * HEIGHT;
    const y2 = Math.random() * HEIGHT;
    boundries.push(new Boundary(x1, y1, x2, y2));
  }
}