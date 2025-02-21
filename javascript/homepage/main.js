const canvas = document.getElementById("homepage_canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 550;
const HEIGHT = 400;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const rayCount = 100;
const boundry = new Boundary(300, 100, 333, 333);
const ray = new Ray(100, 200);
let framesCounter = 0;
let mouseX = 0;
let mouseY = 0;

function animate() {
  if (framesCounter % 7 === 0) {
    // const pos = getMousePos();
    // console.log(pos.x, pos.y);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    boundry.draw(ctx);
    ray.drawRay();
    // getMousePos();
    ray.lookAt(mouseX, mouseY);
    thePoint = ray.intersect(boundry);
    console.log(thePoint); // true if hit wall else undefined
    if(thePoint){
      drawCircleAtMouse(); // Pass mouseX and mouseY
    }
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

// function getMousePos() {
//   let x;
//   let y;
//   canvas.addEventListener("mousemove", (e) => {
//     const rect = canvas.getBoundingClientRect();
//     x = e.clientX - rect.left;
//     y = e.clientY - rect.top;
//     // console.log(x, y);
//     ray.lookAt(x, y);
//   });
//   // return {x: x, y: y};
// }
// function getMousePos(evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }

// if(thePoint){
//   // do something with the point
//   // ctx.fillRect(thePoint.x, thePoint.y, 5, 5);
// }

// Function using mouse position
function drawCircleAtMouse() {
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 7, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
}