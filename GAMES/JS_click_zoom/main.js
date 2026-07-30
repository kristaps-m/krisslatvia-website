// Delta-time based animation loop for consistent speed across all computers
var lastTime = performance.now();
const CANVAS = document.getElementById('mainStage');
const CTX = CANVAS.getContext('2d');
const W = 500, H = 500;
CANVAS.width = W, CANVAS.height = H;
let x = 0;
let elemLeft = CANVAS.offsetLeft;
let elemTop = CANVAS.offsetTop;

// Text styling
CTX.font = "bold 15px Comic Sans MS";
CTX.textAlign = "center"; CTX.fillStyle = "green";

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

    // Add text inside Canvas
    CTX.fillText("* x-5; y-5",45,20);
    CTX.fillText(`x-${W}; y-5 *`,W-60,20);
    CTX.fillText(`x-${W}; y-${H} *`,W-60,H-15);
    CTX.fillText(`* x-5; y-${H}`,50,H-15);

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

CANVAS.addEventListener('click', function(event) {
  // Get the bounding rectangle of the canvas
  const rect = CANVAS.getBoundingClientRect();

  // // before Chat GPT help:
  // let xHor = event.pageX - elemLeft; // Horizontal Canvas Axis
  // let yVert = event.pageY - elemTop  - 74; // Vertical Canvas Axis

  // after help
  // Calculate the click position relative to the canvas
  let xHor = (event.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
  let yVert = (event.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y
  console.log("x=", xHor, "y=", yVert);
});