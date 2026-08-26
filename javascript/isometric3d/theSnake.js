/**
 * Snake game adapted for grid-based isActive system
 * Snake body stored as [row, col] coordinates matching theGrid structure
 */
let direction = 'right';
let isGameOver = false;
let snakeTail = []; // Array of [row, col]
let foodCell = null; // { row, col }
let coutFrames = 0;

/**
 * Initialize snake game - place snake and food on grid
 */
function initSnakeGame() {
    // Start with 5 segments in the middle area of the grid
    const startRow = 1;//Math.floor(ARRAY_H / 2);
    const startCol = 0;//Math.floor(ARRAY_W / 2);
    
    snakeTail = [
        [startRow, startCol],
        [startRow, startCol + 1],
        [startRow, startCol + 2],
        [startRow, startCol + 3],
        [startRow, startCol + 4]
    ];
    
    placeFood();
}

/**
 * Place food on a random inactive cell (not occupied by snake)
 */
function placeFood() {
    let attempts = 0;
    do {
        const row = Math.floor(Math.random() * ARRAY_H);
        const col = Math.floor(Math.random() * ARRAY_W);
        
        // Check if this cell is not occupied by snake
        const onSnake = snakeTail.some(([r, c]) => r === row && c === col);
        
        if (!onSnake) {
            foodCell = { row, col };
            return;
        }
        
        attempts++;
    } while (attempts < 100); // Prevent infinite loop
}

/**
 * Update snake position - move head in current direction
 */
function updateSnake() {
    const head = snakeTail[snakeTail.length - 1];
    let newHeadRow = head[0];
    let newHeadCol = head[1];
    
    switch (direction) {
        case 'right': newHeadCol += 1; break;
        case 'left': newHeadCol -= 1; break;
        case 'down': newHeadRow += 1; break;
        case 'up': newHeadRow -= 1; break;
    }
    
    // Check wall collision
    if (newHeadRow < 0 || newHeadRow >= ARRAY_H || newHeadCol < 0 || newHeadCol >= ARRAY_W) {
        isGameOver = true;
        document.getElementById("theTitle").textContent = "Da Snake - GAME OVER! - hit wall.";
        return;
    }
    
    // Check self collision (before removing tail)
    for (let i = 0; i < snakeTail.length - 1; i++) {
        const [r, c] = snakeTail[i];
        if (newHeadRow === r && newHeadCol === c) {
            isGameOver = true;
            document.getElementById("theTitle").textContent = "Da Snake - GAME OVER! - ran into tail.";
            return;
        }
    }
    
    // Add new head
    snakeTail.push([newHeadRow, newHeadCol]);
    
    // Check if food eaten
    if (foodCell && newHeadRow === foodCell.row && newHeadCol === foodCell.col) {
        placeFood();
        // Don't remove tail - snake grows!
    } else {
        // Remove oldest segment (tail)
        snakeTail.shift();
    }
}

/**
 * Set theGrid cell isActive based on snake position and food
 * Call this at start of each frame to clear all, then mark active cells
 */
function updateGridFromSnake() {
    // Clear ALL properties first (isActive, isFood)
    for (let col = 0; col < ARRAY_H; col++) {
        for (let row = 0; row < ARRAY_W; row++) {
            theGrid[col][row].isActive = false;
            theGrid[col][row].isFood = false;
        }
    }
    
    // Mark snake body as active
    for (const [r, c] of snakeTail) {
        if (r >= 0 && r < ARRAY_H && c >= 0 && c < ARRAY_W) {
            theGrid[r][c].isActive = true;
        }
    }
    
    // Mark food as active and set isFood flag
    if (foodCell) {
        const r = foodCell.row;
        const c = foodCell.col;
        if (r >= 0 && r < ARRAY_H && c >= 0 && c < ARRAY_W) {
            theGrid[r][c].isActive = true;
            theGrid[r][c].isFood = true; // Only this cell is green
        }
    }
}

window.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k === "d" && direction !== 'left'){
        direction = 'right';
    } else if (k === "s" && direction !== 'up') {
        direction = 'down';
    } else if (k === "a" && direction !== 'right') {
        direction = 'left';
    } else if (k === "w" && direction !== 'down') {
        direction = 'up';
    }
    if(k === "p"){
        isGameOver = !isGameOver; 
        document.getElementById("theTitle").textContent = `Da Snake${isGameOver ? " - PAUSE !" : ""}`;
    }
});