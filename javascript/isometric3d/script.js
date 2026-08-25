c.width = W;
c.height = H;
let isometric3dAction = document.getElementById("isometric3dAction").value;

const r = (n) => Math.round(n * 100) / 100;

let theGrid = [];

function addCellsToTheGrid() {
    for (let col = 0; col < ARRAY_H; col++) {
        const t = [];
        for (let row = 0; row < ARRAY_W; row++) {
            t.push(new Cell(row, col));
        }
        theGrid.push(t);
    }
}
addCellsToTheGrid();

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
                cell.isActive
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
            if (!cell.isActive) {
                drawFlatenedDiamond(
                    projX - startX - startXhelp,
                    projY + startY - startYhelp,
                    cell.isActive
                );
            }
            if (cell.isActive) {
                drawIsometricCube(projX - startX - startXhelp, projY + startY - startYhelp, cell.isActive);
            }
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

// function drawHexagon(x, y, fillColor, strokeColor = "black") {
//     ctx.beginPath();
    
//     for (let i = 0; i <= 4; i++) {
//         const angle = (Math.PI / 180) * (i * 90); // Rotated hexagon
//         const px = x + HEX_SIZE * Math.cos(angle);
//         const py = y + HEX_SIZE * Math.sin(angle);
        
//         if (i === 0) {
//             ctx.moveTo(px, py);
//         } else {
//             ctx.lineTo(px, py);
//         }
//     }
    
//     ctx.closePath();
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = strokeColor;
    
//     if (fillColor) {
//         ctx.fillStyle = fillColor;
//         ctx.fill();
//     }
//     ctx.stroke();
// }

function drawFlatenedDiamond(row, col, isActive, color = "#d9d9d9") {
    ctx.beginPath();
    ctx.moveTo(row + RECT_EDGE_SIZE, col);
    ctx.lineTo(row + RECT_EDGE_SIZE * 2, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col + RECT_EDGE_SIZE);
    ctx.lineTo(row, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col);
    if (isActive) {
        ctx.fillStyle = color === "red" ? "red" : color;
        ctx.fill();
    }
    ctx.stroke();
}

function drawLeftSide(row, col, isActive) {
    ctx.beginPath();
    ctx.moveTo(row , col);
    ctx.lineTo(row + RECT_EDGE_SIZE, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col + RECT_EDGE_SIZE);
    ctx.lineTo(row, col + HALF_E_SIZE);
    ctx.lineTo(row , col);
    if (isActive) {
        ctx.fillStyle = "#7c7d7c"; // red
        ctx.fill();
    }
    ctx.stroke();
}

function drawRightSide(row, col, isActive) {
    ctx.beginPath();
    ctx.moveTo(row + RECT_EDGE_SIZE * 2, col);
    ctx.lineTo(row + RECT_EDGE_SIZE * 2, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col + RECT_EDGE_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE, col + HALF_E_SIZE);
    ctx.lineTo(row + RECT_EDGE_SIZE * 2, col);
    if (isActive) {
        ctx.fillStyle = "#ababab"; // red
        ctx.fill();
    }
    ctx.stroke();
}

function drawIsometricCube(row, col, isActive) {
    const top = drawFlatenedDiamond(row, col - HALF_E_SIZE, isActive);
    const left = drawLeftSide(row, col, isActive);
    const right = drawRightSide(row, col, isActive);
}

drawGrid();
drawIsometricProjection();

window.addEventListener("click", (e) => {
    const rect = c.getBoundingClientRect();
    // Calculate the click position relative to the canvas
    let theX = (event.clientX - rect.left) * (c.width / rect.width); // Normalize x
    let theY = (event.clientY - rect.top) * (c.height / rect.height); // Normalize y
   
    // === 1. Check regular square grid click ===
    let rowIndxClick = Math.floor((theY - GRID_OFF_SET_TO_CENTRE) / RECT_EDGE_SIZE);
    let colIndxClick = Math.floor((theX - GRID_OFF_SET_TO_CENTRE) / RECT_EDGE_SIZE);

    if (rowIndxClick >= 0 && colIndxClick >= 0 && rowIndxClick < ARRAY_H && colIndxClick < ARRAY_W) {
        theGrid[rowIndxClick][colIndxClick].isActive = true;
        console.log("Clicked regular square:", rowIndxClick, colIndxClick);
    }
   
    // === 2. Check isometric projection cell click ===
    for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            const cell = theGrid[col][row];
            const vertices = getIsometricCellVertices(cell);
            
            if (isPointInIsometric(theX, theY, vertices)) {
                console.log("Clicked isometric cell:", cell);
                cell.isActive = true;
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
 * Get isometric cell (rhombus/diamond) vertices for point-in-polygon hit detection
 * Matches the shape drawn by drawTheThing()
 */
function getIsometricCellVertices(cell) {
    const cx = cell.canvasX + RECT_EDGE_SIZE; // center X
    const cy = cell.canvasY + HALF_E_SIZE;     // center Y
    
    return [
        { x: cx, y: cy - HALF_E_SIZE },           // Top point (row + 30, col)
        { x: cx + RECT_EDGE_SIZE, y: cy },        // Right point (row + 60, col + 15)
        { x: cx, y: cy + HALF_E_SIZE },            // Bottom point (row + 30, col + 30)
        { x: cx - RECT_EDGE_SIZE, y: cy }          // Left point (row, col + 15)
    ];
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

// let animateIndexForFun = 0;
function newGame() {
    ctx.clearRect(0,0,W,H);
    theGrid = [];
    addCellsToTheGrid();
    
    let isometric3dAction = document.getElementById("isometric3dAction").value;
    
    if (isometric3dAction === "snake"){
        ISOMETRIC_ACTION.snake = true;
        ISOMETRIC_ACTION.casual = false;
        
        // for (let col = 0; col < ARRAY_H; col++) {
        //     const t = [];
        //     for (let row = 0; row < ARRAY_W; row++) {
        //         t.push(new SnakeCell(row, col));
        //     }
        //     theGrid.push(t);
        // }
        
        tail = [[1,1], [1,2], [1,3], [1,4], [1,5]];
        // theGrid[1,1].isActive = true;
        // theGrid[1,2].isActive = true;
        // theGrid[1,3].isActive = true;
        // theGrid[1,4].isActive = true;
        // theGrid[1,5].isActive = true;
        // theGrid[1,6].isActive = true;
        
        head = tail[tail.length -1];
        
        drawGrid();
        drawIsometricProjection();
    }
}

function animationLoop() {
    // ctx.clearRect(0,0,W,H);
    drawGrid();
    drawIsometricProjection();
    // theGrid[animateIndexForFun][0].isActive = true;
    // animateIndexForFun++;
    // if (animateIndexForFun >= ARRAY_H){
    //     animateIndexForFun = 0
    // }

    /** Da Snake */
    // console.log(ISOMETRIC_ACTION.snake);
    if (ISOMETRIC_ACTION.snake) {
        if (!isGameOver) {
            if (coutFrames % 25 == 0) {
                ctx.clearRect(0,0,W,H);
                tail.shift();
                head = tail[tail.length - 1];
                // console.log(head);
                head.update(ctx);
                tail.push(new SnakeCell(head.x, head.y));
                
                drawGame();
                head.draw(ctx, "black", "lightgray");
                
                if (head.x === food.x && head.y === food.y) {
                    food = gerateFood();
                    tail.push(new SnakeCell(head.x, head.y));
                }
    
                runInSelfCheck();
            }
        }
        
        coutFrames++;
        if (coutFrames >= 10000){
            coutFrames = 0;
        }
    }

    requestAnimationFrame(animationLoop);
}

animationLoop();