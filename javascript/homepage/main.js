const canvas = document.getElementById("homepage_canvas");
const ctx = canvas.getContext("2d");
let WIDTH;// = 550;
let HEIGHT;// = 400;


const sc_Width = window.screen.width;
// const sc_Height = window.screen.height;
if (sc_Width <= 600){
  WIDTH = sc_Width - 10;
  HEIGHT = sc_Width;
} else{ WIDTH = 550; HEIGHT = 400}
canvas.width = WIDTH;
canvas.height = HEIGHT;


// canvas.width = WIDTH;
// canvas.height = HEIGHT;
const rayCount = 100;
// const boundry = new Boundary(100, 100, 200, 200);
let boundries = [];
multipleBoundries(); // add random boundries and outer walls;
const partilce = new Particle(WIDTH / 2, HEIGHT / 2);
const ray = new Ray(100, 200);
let framesCounter = 0;
let mouseX = 0;
let mouseY = 0;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchStartedInsideCanvas = false; // Flag to check where touch started

function animate() {
  if (framesCounter % 3 === 0) {
    // const pos = getMousePos();
    // console.log(pos.x, pos.y);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // boundry.draw(ctx);
    for (let b of boundries){
      b.draw(ctx);
    }
    // if(WIDTH > 600){
    //   console.log(WIDTH, HEIGHT);
    //   partilce.update(mouseX, mouseY);
    // }
    // const sc_Width = window.screen.width;
    // if (sc_Width <= 600){
      // partilce.update(touchStartX, touchStartY);
    // } else {
      partilce.update(mouseX, mouseY);
    // }
    // partilce.update(touchEndX, touchEndY);
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

function getTouchPos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top
  };
}

document.addEventListener("touchstart", function (event) {
  if (canvas.contains(event.target)) {
    touchStartedInsideCanvas = true;

    const touchPos = getTouchPos(event);
    touchStartX = touchPos.x;
    touchStartY = touchPos.y;

    partilce.update(touchStartX, touchStartY);
    // console.log("touchstart", partilce.pos.x, partilce.pos.y);
  } else {
      touchStartedInsideCanvas = false;
  }
});


document.addEventListener("touchmove", function (event) {
  event.preventDefault(); // Prevent scrolling
  if (!touchStartedInsideCanvas) return;

  const touchPos = getTouchPos(event);
  touchEndX = touchPos.x;
  touchEndY = touchPos.y;

  partilce.update(touchEndX, touchEndY);
  // console.log(partilce.pos.x, partilce.pos.y);
},{ passive: false });

// Function using mouse position
function drawCircleAtMouse(lineHitX=0, lineHitY=0) {
  ctx.beginPath();
  ctx.arc(lineHitX, lineHitY, 7, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function multipleBoundries() {
  for (let i = 0; i < 8; i++) {
    const x1 = Math.random() * WIDTH;
    const x2 = Math.random() * WIDTH;
    const y1 = Math.random() * HEIGHT;
    const y2 = Math.random() * HEIGHT;
    boundries.push(new Boundary(x1, y1, x2, y2));
  }

  // ADD outer walls;
  boundries.push(new Boundary(0, 0, WIDTH, 0));
  boundries.push(new Boundary(0, 0, 0, HEIGHT));
  boundries.push(new Boundary(WIDTH, 0, WIDTH, HEIGHT));
  boundries.push(new Boundary(0, HEIGHT, WIDTH, HEIGHT));
}