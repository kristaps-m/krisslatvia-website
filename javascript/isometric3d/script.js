const c = document.getElementById("myCanvas5");
const ctx = c.getContext("2d");
const W = 800;
const H = 800;
const ARRAY_W = 15;
const ARRAY_H = 10;
const RECT_EDGE_SIZE = 20;
const HEX_SIZE = 20;
const GRID_OFF_SET_TO_CENTRE = 100;

c.width = W;
c.height = H;

class Cell {
    constructor(row,col){
        this.row = row;
        this.col = col;
    }
}

// let theGrid = new Array(10).fill(new Array(10).fill(0));
let theGrid = [];
for (let col = 0; col < ARRAY_H; col++) {
    const t = [];
    for (let row = 0; row < ARRAY_W; row++) {
        t.push(new Cell(row, col));
    }
    theGrid.push(t);
}
console.log(theGrid);

function drawRect(x,y,w,h) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(x,y,w,h);
    ctx.lineWidth = 2;
    ctx.stroke(); 
}

function drawGrid() {
   for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            const cell = theGrid[col][row];
            drawRect(
                cell.row * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
                cell.col * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
                RECT_EDGE_SIZE,
                RECT_EDGE_SIZE);
        }
    } 
}

function drawIsometricProjection() {
   for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            const cell = theGrid[col][row];
            drawHexagon(
                cell.row * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE * 3,
                cell.col * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE * 5,
            );
        }
    } 
}

function drawHexagon(x, y, fillColor, strokeColor = "black") {
    ctx.beginPath();
    
    for (let i = 0; i <= 4; i++) {
        const angle = (Math.PI / 180) * (i * 90); // Rotated hexagon
        const px = x + HEX_SIZE * Math.cos(angle);
        const py = y + HEX_SIZE * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeColor;
    
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.stroke();
}

drawGrid();
drawIsometricProjection();

window.addEventListener("mousemove", (e) => {
    ctx.clearRect(0,0,W,H);
    const rect = c.getBoundingClientRect();
    // Calculate the click position relative to the canvas
    let theX = (event.clientX - rect.left) * (c.width / rect.width); // Normalize x
    let theY = (event.clientY - rect.top) * (c.height / rect.height); // Normalize y
    let rowIndxClick = Math.floor((theY - GRID_OFF_SET_TO_CENTRE) / RECT_EDGE_SIZE);
    let colIndxClick = Math.floor((theX - GRID_OFF_SET_TO_CENTRE)/ RECT_EDGE_SIZE); //
    // console.log(theX, theY, rowIndxClick, colIndxClick);
    // if (theX > rowIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE &&
    //     theX < rowIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE &&
    //     theY > colIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE &&
    //     theY < colIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE 
    // ) {
        ctx.fillStyle = "blue";
        ctx.fillRect(
            colIndxClick * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
            rowIndxClick * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
            RECT_EDGE_SIZE,
            RECT_EDGE_SIZE
        );
    // }
})

function animationLoop() {
    drawGrid();
    drawIsometricProjection();
    requestAnimationFrame(animationLoop);
}

animationLoop();