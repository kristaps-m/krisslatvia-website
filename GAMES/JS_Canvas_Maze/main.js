const CANVAS = document.getElementById("mainStage");
const CTX = CANVAS.getContext("2d");
const W = 500;
const H = 500;
CANVAS.width = W;
CANVAS.height = H;

// Some bit fields for convenience
let cellEnum = {
  CELL_PATH_N: 0x01,
  CELL_PATH_E: 0x02,
  CELL_PATH_S: 0x04,
  CELL_PATH_W: 0x08,
  CELL_VISITED: 0x10,
};

class Maze {
  constructor() {
    // Algorithm variables
    let m_nVisitedCells;
    let m_stack = []; // (x, y) coordinate pairs // int,int
    let m_nPathWidth;

    // Maze parameters
    this.m_nMazeWidth = 40;
    this.m_nMazeHeight = 25;
  }
}

/**

let x = 0;
// let mouseX = 0;
// let mouseY = 0;
let elemLeft = CANVAS.offsetLeft;
let elemTop = CANVAS.offsetTop;
let frameCounter = 0;

function animate() {
    // draw();
    if(frameCounter % 50 === 0){
        t();
    }
    if(frameCounter = 1000000){frameCounter = 0}
    frameCounter++;
    requestAnimationFrame(animate);
}
animate();

// function drawSomethingWithWhereIsMouse(e) {
//     console.log("mouse location:", e.clientX, e.clientY)
// }

function t() {
    CANVAS.addEventListener("mousemove", (e) => {
        const mX = e.pageX - elemLeft, mY = e.pageY - elemTop - 74;
        // console.log(mX, mY);
        // CTX.fillStyle = 'red';
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        CTX.fillStyle = `rgb(${r},${g},${b})`;
        CTX.fillRect(mX - 10, mY - 10, 10, 10);
    });
}

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

 */
