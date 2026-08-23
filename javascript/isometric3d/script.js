const c = document.getElementById("myCanvas5");
const ctx = c.getContext("2d");
const W = 800;
const H = 800;
const ARRAY_W = 15;
const ARRAY_H = 10;
const RECT_EDGE_SIZE = 30;
const HALF_E_SIZE = RECT_EDGE_SIZE / 2;
const HEX_SIZE = 20;
const GRID_OFF_SET_TO_CENTRE = 100;
const ISOMETRIC_ARRAY_OF_SET = {x:3, y:4};

c.width = W;
c.height = H;

const r = (n) => Math.round(n * 100) / 100;

class Cell {
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.isAcive = false;
        this.canvasX = 0;
        this.canvasY = 0;
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

function drawRect(x,y,w,h, isActive) {
    ctx.beginPath();
    // ctx.fillStyle = "red";
    ctx.rect(x,y,w,h);
    ctx.lineWidth = 2;
    if (isActive) {
        ctx.fillStyle = "blue";
        ctx.fill();
    }
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
                RECT_EDGE_SIZE,
                cell.isAcive
            );
        }
    } 
}




function drawIsometricProjection() {
    let startX = 0;
    let startY = 0;
    let startXhelp = 0;
    let startYhelp = 0;
    for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            const cell = theGrid[col][row];
            // drawHexagon(
            //     cell.row * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE * 3,
            //     cell.col * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE * 5,
            // );
            const projX = cell.row * RECT_EDGE_SIZE * 2 + GRID_OFF_SET_TO_CENTRE * ISOMETRIC_ARRAY_OF_SET.x;
            const projY = cell.col * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE * ISOMETRIC_ARRAY_OF_SET.y;
            drawTheThing(
                projX - startX - startXhelp,
                projY + startY - startYhelp,
                cell.isAcive
            );
            // ctx.fillRect(projX, projY, 5, 5);
            cell.canvasX = projX - startX - startXhelp;
            cell.canvasY = projY + startY - startYhelp;
            /**
             * DEBUG info
             */
            // ctx.font = `12px Comic Sans MS`;
            // ctx.fillStyle = "red";
            // ctx.fillText(`${cell.canvasX}-${cell.canvasY}`, cell.canvasX, cell.canvasY);
            startX += RECT_EDGE_SIZE;
            startY += HALF_E_SIZE;
        }
        startX = 0;
        startY = 0;
        startXhelp += RECT_EDGE_SIZE;
        startYhelp += HALF_E_SIZE;
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

function drawTheThing(row, col, isActive) {
    ctx.beginPath();
    ctx.moveTo(row + RECT_EDGE_SIZE, col);
    ctx.lineTo(row + RECT_EDGE_SIZE * 2, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col + RECT_EDGE_SIZE);
    ctx.lineTo(row, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col);
    if (isActive) {
        ctx.fillStyle = "red";
        ctx.fill();
    }
    ctx.stroke();
}

drawGrid();
drawIsometricProjection();

window.addEventListener("click", (e) => {
    ctx.clearRect(0,0,W,H);
    const rect = c.getBoundingClientRect();
    // Calculate the click position relative to the canvas
    let theX = (event.clientX - rect.left) * (c.width / rect.width); // Normalize x
    let theY = (event.clientY - rect.top) * (c.height / rect.height); // Normalize y
    let rowIndxClick = Math.floor((theY - GRID_OFF_SET_TO_CENTRE) / RECT_EDGE_SIZE);
    let colIndxClick = Math.floor((theX - GRID_OFF_SET_TO_CENTRE)/ RECT_EDGE_SIZE); 

    // if (theX > rowIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE &&
    //     theX < rowIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE &&
    //     theY > colIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE &&
    //     theY < colIndxClick * RECT_EDGE_SIZE - GRID_OFF_SET_TO_CENTRE 
    // ) {
    if (rowIndxClick >= 0 && colIndxClick >= 0 && rowIndxClick < ARRAY_H && colIndxClick < ARRAY_W) {
        theGrid[rowIndxClick][colIndxClick].isAcive = true;
    }

    // get indexes for isemetric projection
    // let pRowInx = Math.floor((theY - GRID_OFF_SET_TO_CENTRE  - GRID_OFF_SET_TO_CENTRE * ISOMETRIC_ARRAY_OF_SET.x) / RECT_EDGE_SIZE);
    // let pColInx = Math.floor((theX - GRID_OFF_SET_TO_CENTRE * ISOMETRIC_ARRAY_OF_SET.y + GRID_OFF_SET_TO_CENTRE) / HALF_E_SIZE); 

    // if (pRowInx >= 0 && pColInx >= 0 && pRowInx < ARRAY_H && pColInx < ARRAY_W) {
    //     theGrid[pRowInx][pColInx].isAcive = true;
    // }
    // console.log(theX, theY, rowIndxClick, colIndxClick,"----", pRowInx, pColInx);
    //     ctx.fillStyle = "blue";
    //     ctx.fillRect(
    //         colIndxClick * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
    //         rowIndxClick * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
    //         RECT_EDGE_SIZE,
    //         RECT_EDGE_SIZE
    //     );
    // }
   for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            const cell = theGrid[col][row];
            // TODO - add code here
            if (isPointInIsometric(pointX, pointY, vertices)) {
                console.log(cell);
                cell.isAcive = true;
                drawRect(cell.canvasX, cell.canvasY, RECT_EDGE_SIZE * 2, RECT_EDGE_SIZE);
                break;
            }
            if (theX > cell.canvasX &&
                theY > cell.canvasY &&
                theX < cell.canvasX + RECT_EDGE_SIZE * 2 &&
                theY < cell.canvasY + RECT_EDGE_SIZE
            ) {
                console.log(cell);
                cell.isAcive = true;
                drawRect(cell.canvasX, cell.canvasY, RECT_EDGE_SIZE * 2, RECT_EDGE_SIZE);
                break;
            }
        }
    }
    /**
     * DEBUG info
     */
    // ctx.font = `italic bold 20px Comic Sans MS`;
    // ctx.fillStyle = "blue";
    // ctx.fillText(`${r(theX)}-${r(theY)}`, theX, theY);
    // console.log(theX, theY);
})

/**
 * Get hexagon vertices for point-in-polygon hit detection
 */
function getIsometricCellVertices(centerX, centerY) {
    const numberOfSides = 4;
    const size = RECT_EDGE_SIZE;
    const step = (2 * Math.PI) / numberOfSides;
    const shift = Math.PI / 180.0; // Small rotation to align hexagon
    
    const vertices = [];
    let curStep = 0 * step + shift;
    vertices.push({
        x: centerX + size * Math.cos(curStep),
        y: centerY + size * Math.sin(curStep)
    });
    curStep = 1 * step + shift;
    vertices.push({
        x: centerX + size * Math.cos(curStep),
        y: centerY + size * Math.sin(curStep)
    });
    curStep = 2 * step + shift;
    vertices.push({
        x: centerX + size * Math.cos(curStep),
        y: centerY + size * Math.sin(curStep)
    });
    curStep = 3 * step + shift;
    vertices.push({
        x: centerX + size * Math.cos(curStep),
        y: centerY + size * Math.sin(curStep)
    });

    for (let i = 0; i < numberOfSides; i++) {
        const curStep = i * step + shift;
        vertices.push({
            x: centerX + size * Math.cos(curStep),
            y: centerY + size * Math.sin(curStep)
        });
    }
    return vertices;
}

function isPointInIsometric(pointX, pointY, vertices) {
    let inside = false;
    
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x;
        const yi = vertices[i].y;
        const xj = vertices[j].x;
        const yj = vertices[j].y;
        
        const intersects = ((yi > pointY) !== (yj > pointY)) &&
            (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
        
        if (intersects) {
            inside = !inside;
        }
    }
    return inside;
}

function animationLoop() {
    drawGrid();
    drawIsometricProjection();
    // drawTheThing(20, 20);
    requestAnimationFrame(animationLoop);
}

animationLoop();