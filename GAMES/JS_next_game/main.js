const CANVAS = document.getElementById('mainStage');
const CTX = CANVAS.getContext('2d');
const W = 500, H = 500;
CANVAS.width = W, CANVAS.height = H;
let x = 0;

function animate() {
    requestAnimationFrame(animate);
    draw();
}
animate();

function draw() {  
    // Clear the canvas
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
    // Draw the rectangle
    CTX.fillStyle = 'red';
    CTX.fillRect(x, 50, 50, 50);
  
    // Update the rectangle's position
    x += 5;
    if(x >= H - 10){
        x = 0;
    }
}