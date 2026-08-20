// ==================== CONFIGURATION ====================
const canvas = document.getElementById("hexMinesCanvas");
const ctx = canvas.getContext("2d");
const W = 600;
const H = 600;
const FIELD_SIZE = 10; // rows x cols
const NUM_OF_MINES = 14;
canvas.width = W;
canvas.height = H;

// ==================== GAME STATE ====================
let gameField = []; // 2D array of HexP objects
let isGameOver = false;
let isGameWon = false;
let minesPlaced = false;

// ==================== HEXAGON CONSTANTS ====================
const HEX_SIZE = 32;
const HEX_SPACING_X = 53; // row spacing
const HEX_SPACING_Y = 53; // col spacing (odd rows offset by ~25)

// Hexagon neighbor offsets based on even/odd row parity
const HEX_NEIGHBORS_EVEN_ROW = [
    [0, -1],   // top-left
    [1, -1],   // top-right  
    [1, 0],    // right
    [0, 1],    // bottom-right
    [-1, 0],   // bottom-left
    [-1, -1],  // left
];

const HEX_NEIGHBORS_ODD_ROW = [
    [0, -1],   // top-left
    [1, 0],    // top-right
    [1, 1],    // right
    [0, 1],    // bottom-right
    [-1, 1],   // bottom-left
    [-1, 0],   // left
];

// ==================== CELL CLASS ====================
class HexP {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.minesAround = 0;
        this.isOpen = false;
        this.isFlagged = false;
    }
}

// ==================== HELPER FUNCTIONS ====================
function isInBounds(row, col) {
    return row >= 0 && row < FIELD_SIZE && col >= 0 && col < FIELD_SIZE;
}

function getHexNeighbors(row, col) {
    const neighbors = [];
    const offsets = (row % 2 === 0) ? HEX_NEIGHBORS_EVEN_ROW : HEX_NEIGHBORS_ODD_ROW;
    
    for (const [dr, dc] of offsets) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (isInBounds(newRow, newCol)) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }
    return neighbors;
}

function getHexagonPosition(row, col) {
    const x = row * HEX_SPACING_X + 50;
    let y = col * HEX_SPACING_Y + 50;
    if (row % 2 === 1) {
        y += 25;
    }
    return { x, y };
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}

// ==================== LAYER 1: CLICK DETECTION ====================
function getCellFromClick(event) {
    const rect = canvas.getBoundingClientRect();
    
    // Normalize click coordinates to canvas space
    let xHor = (event.clientX - event.offsetX);
    let yVert = (event.clientY - event.offsetY);
    
    // Calculate which cell was clicked
    let rowClicked = Math.floor(xHor / HEX_SPACING_X);
    let colClicked = Math.floor(yVert / HEX_SPACING_Y);
    
    return { row: rowClicked, col: colClicked };
}

// ==================== LAYER 2: GAME LOGIC ====================

/**
 * Initialize the game field with empty cells
 */
function initGameField() {
    gameField = [];
    for (let row = 0; row < FIELD_SIZE; row++) {
        const rowArr = [];
        for (let col = 0; col < FIELD_SIZE; col++) {
            rowArr.push(new HexP(row, col));
        }
        gameField.push(rowArr);
    }
}

/**
 * Place mines randomly on the field
 */
function placeMines() {
    let positions = [];
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            positions.push({ row, col });
        }
    }
    
    shuffle(positions);
    const minesToPlace = Math.min(NUM_OF_MINES, positions.length);
    
    for (let i = 0; i < minesToPlace; i++) {
        gameField[positions[i].row][positions[i].col].isMine = true;
    }
}

/**
 * Count adjacent mines for each cell
 */
function countAdjacentMines() {
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            if (!gameField[row][col].isMine) {
                const neighbors = getHexNeighbors(row, col);
                let count = 0;
                
                for (const { row: nr, col: nc } of neighbors) {
                    if (gameField[nr][nc].isMine) {
                        count++;
                    }
                }
                
                gameField[row][col].minesAround = count;
            }
        }
    }
}

/**
 * Open a cell and all connected empty cells using BFS (non-recursive!)
 * This is the key algorithm - uses a queue instead of recursion to avoid stack overflow
 */
function openCell(row, col) {
    // Bounds check
    if (!isInBounds(row, col)) return;
    
    const cell = gameField[row][col];
    
    // Don't open already opened or flagged cells
    if (cell.isOpen || cell.isFlagged) return;
    
    // BFS queue for opening connected empty cells
    const queue = [{ row, col }];
    const visited = new Set();
    visited.add(`${row},${col}`);
    
    while (queue.length > 0) {
        const current = queue.shift();
        const cellToOpen = gameField[current.row][current.col];
        
        // Mark as open
        cellToOpen.isOpen = true;
        
        // If this cell has 0 adjacent mines, add all neighbors to the queue
        if (cellToOpen.minesAround === 0) {
            const neighbors = getHexNeighbors(current.row, current.col);
            
            for (const neighbor of neighbors) {
                const key = `${neighbor.row},${neighbor.col}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push(neighbor);
                }
            }
        }
    }
}

/**
 * Handle left click on a cell
 */
function handleLeftClick(row, col) {
    // Bounds check
    if (!isInBounds(row, col)) return;
    
    const cell = gameField[row][col];
    
    // Ignore already opened or flagged cells
    if (cell.isOpen || cell.isFlagged) return;
    
    // Game over check
    if (isGameOver || isGameWon) return;
    
    // First click - place mines ensuring clicked cell is safe
    if (!minesPlaced) {
        // Temporarily mark the clicked cell and its neighbors as non-mines
        const safeCells = new Set();
        safeCells.add(`${row},${col}`);
        
        // Also protect neighbors from being mines (for better gameplay)
        const neighbors = getHexNeighbors(row, col);
        for (const { row: nr, col: nc } of neighbors) {
            safeCells.add(`${nr},${nc}`);
        }
        
        placeMines();
        
        // Ensure clicked cell and neighbors are not mines
        gameField[row][col].isMine = false;
        for (const { row: nr, col: nc } of neighbors) {
            gameField[nr][nc].isMine = false;
        }
        
        countAdjacentMines();
        minesPlaced = true;
    }
    
    // Check if clicked cell is a mine
    if (cell.isMine) {
        cell.isOpen = true;
        isGameOver = true;
        revealAllMines();
        alert("Game Over! You hit a mine!");
        drawGrid();
        return;
    }
    
    // Open the clicked cell and connected empty cells
    openCell(row, col);
    
    // Draw updated grid
    drawGrid();
    
    // Check win condition
    checkWinCondition();
}

/**
 * Handle right click to place/remove flags
 */
function handleRightClick(event, row, col) {
    event.preventDefault();
    
    if (!isInBounds(row, col)) return;
    if (isGameOver || isGameWon) return;
    
    const cell = gameField[row][col];
    
    // Only toggle flag on unopened cells
    if (!cell.isOpen) {
        cell.isFlagged = !cell.isFlagged;
        drawGrid();
    }
}

/**
 * Reveal all mines when game is over
 */
function revealAllMines() {
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            if (gameField[row][col].isMine) {
                gameField[row][col].isOpen = true;
            }
        }
    }
}

/**
 * Check if all non-mine cells are opened
 */
function checkWinCondition() {
    let totalCells = FIELD_SIZE * FIELD_SIZE;
    let mineCount = 0;
    
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            if (gameField[row][col].isMine) {
                mineCount++;
            } else if (!gameField[row][col].isOpen) {
                return; // Not all safe cells are opened yet
            }
        }
    }
    
    // All non-mine cells are open - WIN!
    isGameWon = true;
    alert("You won! Congratulations!");
}

// ==================== LAYER 3: RENDERING ====================

/**
 * Draw a single hexagon cell
 */
function drawHexagon(x, y, fillColor, strokeColor = "black") {
    ctx.beginPath();
    
    for (let i = 0; i <= 6; i++) {
        const angle = (Math.PI / 180) * (i * 60); // Rotated hexagon
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

/**
 * Draw the entire game grid - only redraws what's needed
 */
function drawGrid() {
    // Clear canvas once at start of drawing
    ctx.clearRect(0, 0, W, H);
    
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            const cell = gameField[row][col];
            const pos = getHexagonPosition(row, col);
            
            let fillColor = "gray"; // Default closed state
            
            if (cell.isOpen && !cell.isMine) {
                fillColor = "lightgray";
            } else if (cell.isOpen && cell.isMine) {
                fillColor = "red";
            } else if (cell.isFlagged) {
                fillColor = "yellow";
            }
            
            // 1. Draw hexagon fill FIRST
            drawHexagon(pos.x, pos.y, fillColor);
            
            // 2. Draw numbers/text ON TOP of the filled hexagon
            
            // DEBUG: Show coordinate labels (row-col) on ALL cells for debugging
            if (!cell.isOpen && !cell.isFlagged) {
                ctx.font = "bold 10px Comic Sans MS";
                ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; // Semi-transparent white
                ctx.textAlign = "center";
                ctx.fillText(
                    `${cell.row}-${cell.col}`,
                    pos.x,
                    pos.y - 10
                );
            }
            
            if (cell.isOpen && !cell.isMine && cell.minesAround > 0) {
                ctx.font = "bold 18px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText(
                    cell.minesAround,
                    pos.x - 6,
                    pos.y + 20
                );
            } else if (cell.isOpen && cell.isMine) {
                // Show bomb emoji on revealed mines
                ctx.font = "bold 18px Comic Sans MS";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("💣", pos.x, pos.y + 6);
            } else if (cell.isFlagged) {
                // Show flag emoji on flagged cells
                ctx.font = "bold 18px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText("🚩", pos.x, pos.y + 6);
            }
        }
    }
}

// ==================== EVENT LISTENERS ====================

canvas.addEventListener("click", (event) => {
    if (isGameOver || isGameWon) return;
    
    const { row, col } = getCellFromClick(event);
    
    // DEBUG: Log which cell was clicked
    console.log(`Clicked hexagon: ${row}-${col}`);
    
    handleLeftClick(row, col);
});

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Prevent default context menu
    
    if (isGameOver || isGameWon) return;
    
    const rect = canvas.getBoundingClientRect();
    let xHor = (event.clientX - event.offsetX);
    let yVert = (event.clientY - event.offsetY);
    
    let rowClicked = Math.floor(xHor / HEX_SPACING_X);
    let colClicked = Math.floor(yVert / HEX_SPACING_Y);
    
    // DEBUG: Log which cell was right-clicked
    console.log(`Right-clicked hexagon: ${rowClicked}-${colClicked}`);
    
    handleRightClick(event, rowClicked, colClicked);
});

// ==================== INITIALIZATION ====================
initGameField();
drawGrid();
