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

function drawRect(x, y, w, h, isActive, isFood = false) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.lineWidth = 2;
    if (isActive) {
        // Food shows green, snake body shows blue
        ctx.fillStyle = isFood ? "#90ee90" : "blue";
        ctx.fill();
    }
    ctx.stroke(); 
}

/**
 * Toggle regular grid visibility (used by snake game)
 */
function toggleRegularGridVisibility() {
    ISOMETRIC_ACTION.showRegularGrid = !ISOMETRIC_ACTION.showRegularGrid;
    const btn = document.getElementById("toggleRegularGrid");
    btn.textContent = ISOMETRIC_ACTION.showRegularGrid ? "Hide Regular Grid" : "Show Regular Grid";
}

function drawGrid() {
    // Only draw if the flag is true (extensible for future features)
    if (!ISOMETRIC_ACTION.showRegularGrid) {
        return;
    }
    
   for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            const cell = theGrid[col][row];
            const isFood = cell.isFood || false;
            drawRect(
                cell.row * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
                cell.col * RECT_EDGE_SIZE + GRID_OFF_SET_TO_CENTRE,
                RECT_EDGE_SIZE,
                RECT_EDGE_SIZE,
                cell.isActive,
                isFood
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
            const isFood = cell.isFood || false;
            
            if (!cell.isActive) {
                drawFlatenedDiamond(
                    projX - startX - startXhelp,
                    projY + startY - startYhelp,
                    cell.isActive,
                    isFood
                );
            }
            if (cell.isActive) {
                drawIsometricCube(projX - startX - startXhelp, projY + startY - startYhelp, cell.isActive, isFood);
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

function drawFlatenedDiamond(cellX, cellY, isActive, isFood = false, color = "#d9d9d9") {
    ctx.beginPath();
    ctx.moveTo(cellX + RECT_EDGE_SIZE, cellY);
    ctx.lineTo(cellX + RECT_EDGE_SIZE * 2, cellY + HALF_E_SIZE);
    ctx.lineTo(cellX + RECT_EDGE_SIZE, cellY + RECT_EDGE_SIZE);
    ctx.lineTo(cellX, cellY + HALF_E_SIZE);
    ctx.lineTo(cellX + RECT_EDGE_SIZE, cellY);
    if (isActive) {
        // Food gets green tint, snake body gets blue tint
        ctx.fillStyle = isFood ? "#90ee90" : color;
        ctx.fill();
    }
    ctx.stroke();
}

function drawLeftSideCell(cellX, cellY, isActive, color = "#7c7d7c") {
    ctx.beginPath();
    ctx.moveTo(cellX , cellY);
    ctx.lineTo(cellX + RECT_EDGE_SIZE, cellY + HALF_E_SIZE);
    ctx.lineTo(cellX + RECT_EDGE_SIZE, cellY + RECT_EDGE_SIZE);
    ctx.lineTo(cellX, cellY + HALF_E_SIZE);
    ctx.lineTo(cellX , cellY);
    if (isActive) {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.stroke();
}

function drawRightSideCell(cellX, cellY, isActive, color = "#ababab") {
    ctx.beginPath();
    ctx.moveTo(cellX + RECT_EDGE_SIZE * 2, cellY);
    ctx.lineTo(cellX + RECT_EDGE_SIZE * 2, cellY + HALF_E_SIZE);
    ctx.lineTo(cellX + RECT_EDGE_SIZE, cellY + RECT_EDGE_SIZE);
    ctx.lineTo(cellX + RECT_EDGE_SIZE, cellY + HALF_E_SIZE);
    ctx.lineTo(cellX + RECT_EDGE_SIZE * 2, cellY);
    if (isActive) {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.stroke();
}

function drawIsometricCube(cellX, cellY, isActive, isFood = false) {
    const topColor = isFood ? "#90ee90" : "#d9d9d9";
    const leftColor = isFood ? "#7cdd7c" : "#7c7d7c";
    const rightColor = isFood ? "#a8e6a8" : "#ababab";
    
    drawFlatenedDiamond(cellX, cellY - HALF_E_SIZE, isActive, false, topColor);
    drawLeftSideCell(cellX, cellY, isActive, leftColor);
    drawRightSideCell(cellX, cellY, isActive, rightColor);
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
    ISOMETRIC_ACTION.snake = (isometric3dAction === "snake");
    ISOMETRIC_ACTION.casual = !ISOMETRIC_ACTION.snake;
    
    // Show/hide the toggle button based on action
    const toggleBtn = document.getElementById("toggleRegularGrid");
    if (ISOMETRIC_ACTION.snake) {
        toggleBtn.style.display = "inline-block";
        ISOMETRIC_ACTION.showRegularGrid = true;  // Reset to visible when starting snake game
        toggleBtn.textContent = "Hide Regular Grid";
    } else {
        toggleBtn.style.display = "none";
    }
    
    if (ISOMETRIC_ACTION.snake) {
        // Reset game state
        isGameOver = false;
        direction = 'right';
        coutFrames = 0;
        document.getElementById("theTitle").textContent = "Da Snake - Start!";
        
        // Initialize snake game with grid-based coordinates
        initSnakeGame();
    }
}

function animationLoop() {
    /** Da Snake */
    if (ISOMETRIC_ACTION.snake && !isGameOver) {
        // Update snake every 25 frames (~10 moves per second at 60fps)
        if (coutFrames % 25 === 0) {
            updateSnake();
        }
        
        coutFrames++;
        if (coutFrames >= 10000) {
            coutFrames = 0;
        }
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, W, H);
    
    // Update grid isActive based on snake position and food
    if (ISOMETRIC_ACTION.snake) {
        updateGridFromSnake();
    }
    
    // Draw both grids
    drawGrid();
    drawIsometricProjection();

    requestAnimationFrame(animationLoop);
}

animationLoop();