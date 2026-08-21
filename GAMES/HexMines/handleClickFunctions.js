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