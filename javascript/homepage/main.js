const canvas = document.getElementById('homepage_canvas');
const ctx = canvas.getContext('2d');
const WIDTH = 550;
const HEIGHT = 400;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const rayCount = 100;
const boundry = new Boundary(300, 100, 333, 333);
const ray = new Ray(100,200);
let framesCounter = 0;

function animate() {
  if(framesCounter % 30 === 0){
    // const pos = getMousePos();
    // console.log(pos.x, pos.y);
    getMousePos();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    boundry.draw(ctx);
    ray.drawRay();
    // ray.lookAt(pos.x, pos.y);
    thePoint = ray.intersect(boundry);
    console.log(thePoint);
    requestAnimationFrame(animate);
  }
  if(framesCounter = 1000000){framesCounter = 0}
}

animate();

function getMousePos() {
  let x;
  let y;
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    console.log(x,y);
    ray.lookAt(x, y);

  });
  // return {x: x, y: y};
}
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