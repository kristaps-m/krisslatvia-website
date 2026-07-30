// Delta-time based animation loop for consistent speed across all computers
var lastTime = performance.now();
const CANVAS = document.getElementById('mainStage');
const CTX = CANVAS.getContext('2d');
const W = 500, H = 500;
CANVAS.width = W, CANVAS.height = H;
let x = 0;

function animate(time) {
    var deltaTime = (time - lastTime) / 1000; // seconds since last frame
    lastTime = time;
    
    requestAnimationFrame(animate);
    draw(deltaTime);
}
requestAnimationFrame(animate);

function draw(deltaTime) {  
    // Clear the canvas
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
    // Draw the rectangle
    CTX.fillStyle = 'red';
    CTX.fillRect(x, 50, 50, 50);
  
    // Delta-time based movement for consistent speed across all computers (100 pixels per second)
    var moveSpeed = 100; // pixels per second
    x += moveSpeed * deltaTime;
    if(x >= H - 10){
        x = 0;
    }
}