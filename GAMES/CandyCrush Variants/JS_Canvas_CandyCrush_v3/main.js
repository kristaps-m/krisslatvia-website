const CANVAS = document.getElementById('mainStage');
const CTX = CANVAS.getContext('2d');
const W = 400, H = 600;
CANVAS.width = W, CANVAS.height = H;
// let x = 0;
// Define variables
let selectedCandy = null;
// Define constants
const ROWS = 8;
const COLS = 8;
const CANDY_SIZE = 50;
const COLORS = ['red', 'blue', 'green', 'yellow', 'orange']; // Add more colors as needed

// Generate a random candy color
function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

const board = [];
// Generate the game board
function generateBoard() {
    for (let row = 0; row < ROWS; row++) {
        const newRow = [];
        for (let col = 0; col < COLS; col++) {
            newRow.push({
                x: col * CANDY_SIZE,
                y: row * CANDY_SIZE,
                color: getRandomColor()
            });
        }
        board.push(newRow);
    }
    return board;
}

// Draw the game board
function drawBoard(board) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const candy = board[row][col];
            CTX.fillStyle = candy.color;
            CTX.fillRect(candy.x, candy.y, CANDY_SIZE, CANDY_SIZE);
        }
    }
}

// Initialize the game
function init() {
    const board = generateBoard();
    drawBoard(board);
}

// Start the game
init();

// Add event listener for mouse clicks
CANVAS.addEventListener('mousedown', handleMouseDown);

// Function to handle mouse down event
function handleMouseDown(event) {
    const mouseX = event.clientX - CANVAS.getBoundingClientRect().left;
    const mouseY = event.clientY - CANVAS.getBoundingClientRect().top;

    // Find the candy that was clicked
    selectedCandy = findClickedCandy(mouseX, mouseY);

    // Redraw the board
    drawBoard(board);
}

// Function to find the candy that was clicked
function findClickedCandy(mouseX, mouseY) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const candy = board[row][col];
            if (mouseX >= candy.x && mouseX < candy.x + CANDY_SIZE &&
                mouseY >= candy.y && mouseY < candy.y + CANDY_SIZE) {
                return { row, col };
            }
        }
    }
    return null; // No candy clicked
}

// Add event listener for mouse up
CANVAS.addEventListener('mouseup', handleMouseUp);

// Function to handle mouse up event
function handleMouseUp(event) {
    const mouseX = event.clientX - CANVAS.getBoundingClientRect().left;
    const mouseY = event.clientY - CANVAS.getBoundingClientRect().top;

    // Find the candy that was released
    const releasedCandy = findClickedCandy(mouseX, mouseY);

    // If both candies are valid and adjacent, swap them
    if (selectedCandy && releasedCandy &&
        (Math.abs(selectedCandy.row - releasedCandy.row) === 1 && selectedCandy.col === releasedCandy.col ||
            Math.abs(selectedCandy.col - releasedCandy.col) === 1 && selectedCandy.row === releasedCandy.row)) {
        swapCandies(selectedCandy, releasedCandy);

        // Check for matches and handle cascading
        handleMatches();
    }

    // Reset selected candy
    selectedCandy = null;

    // Redraw the board
    drawBoard(board);
}

// Function to swap candies
function swapCandies(candy1, candy2) {
    const tempColor = board[candy1.row][candy1.col].color;
    board[candy1.row][candy1.col].color = board[candy2.row][candy2.col].color;
    board[candy2.row][candy2.col].color = tempColor;
}

// Fantastic! In step 4, we'll implement the logic to check for matching candies. 
// Function to check for matches
function checkForMatches() {
    const matches = [];

    // Check for horizontal matches
    for (let row = 0; row < ROWS; row++) {
        let startCol = 0;
        while (startCol < COLS - 2) {
            const color = board[row][startCol].color;
            if (color !== null &&
                board[row][startCol + 1].color === color &&
                board[row][startCol + 2].color === color) {
                let endCol = startCol + 2;
                while (endCol < COLS && board[row][endCol].color === color) {
                    matches.push({ row, col: endCol });
                    endCol++;
                }
                startCol = endCol;
            } else {
                startCol++;
            }
        }
    }

    // Check for vertical matches
    for (let col = 0; col < COLS; col++) {
        let startRow = 0;
        while (startRow < ROWS - 2) {
            const color = board[startRow][col].color;
            if (color !== null &&
                board[startRow + 1][col].color === color &&
                board[startRow + 2][col].color === color) {
                let endRow = startRow + 2;
                while (endRow < ROWS && board[endRow][col].color === color) {
                    matches.push({ row: endRow, col });
                    endRow++;
                }
                startRow = endRow;
            } else {
                startRow++;
            }
        }
    }

    return matches;
}

// Function to clear matched candies
function clearMatches(matches) {
    matches.forEach(match => {
        board[match.row][match.col].color = null;
    });
}

// Function to handle matches and cascading
function handleMatches() {
    const matches = checkForMatches();
    console.log(matches);
    if (matches.length > 0) {
        clearMatches(matches);
        drawBoard(board);
        setTimeout(() => {
            handleCascading();
        }, 300); // Adjust delay as needed
    }
}

// Function to handle cascading
function handleCascading() {
    for (let col = 0; col < COLS; col++) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col].color === null) {
                let aboveRow = row - 1;
                while (aboveRow >= 0 && board[aboveRow][col].color === null) {
                    aboveRow--;
                }
                if (aboveRow >= 0) {
                    board[row][col].color = board[aboveRow][col].color;
                    board[aboveRow][col].color = null;
                }
            }
        }
    }
    drawBoard(board);
    setTimeout(() => {
        handleMatches();
    }, 300); // Adjust delay as needed
}

//-----------------------------------------------------------------------------
// function animate() {
//     requestAnimationFrame(animate);
//     draw();
// }
// animate();

// function draw() {  
//     // Clear the canvas
//     CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
//     // Draw the rectangle
//     CTX.fillStyle = 'red';
//     CTX.fillRect(x, 50, 50, 50);
  
//     // Update the rectangle's position
//     x += 5;
//     if(x >= H - 10){
//         x = 0;
//     }
// }