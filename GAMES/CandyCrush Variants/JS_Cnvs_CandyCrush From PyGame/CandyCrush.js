const CANVAS = document.getElementById('candyGame');
const CTX = CANVAS.getContext('2d');
CANVAS.width = WINDOWWIDTH; CANVAS.height = WINDOWHEIGHT;

let FPSCLOCK, DISPLAYSURF, GEMIMAGES, GAMESOUNDS, BASICFONT, BOARDRECTS;

function drawBoard(board) {
    for (let x = 0; x < BOARDWIDTH; x++) {
        for (let y = 0; y < BOARDHEIGHT; y++) {
            const gemToDraw = board[x][y];
            const xPos = x * GEMIMAGESIZE + XMARGIN;
            const yPos = y * GEMIMAGESIZE + YMARGIN;
            
            // Draw grid square
            CTX.strokeStyle = GRIDCOLOR;
            CTX.lineWidth = 1;
            CTX.strokeRect(xPos, yPos, GEMIMAGESIZE, GEMIMAGESIZE);

            // Draw gem if it's not an empty space
            if (gemToDraw !== EMPTY_SPACE) {
                const gemImage = GEMIMAGES[gemToDraw];
                CTX.drawImage(gemImage, xPos, yPos);
            }
        }
    }
}

// initalize the board
gameBoard = getBlankBoard()
fillBoardAndAnimate(gameBoard, [], score) // Drop the initial gems.

drawBoard(gameBoard);

function getBlankBoard() {
    // Create and return a blank board data structure.
    const board = [];
    for (let x = 0; x < BOARDWIDTH; x++) {
        board.push(Array(BOARDHEIGHT).fill(EMPTY_SPACE));
    }
    return board;
}

function fillBoardAndAnimate(board, points, score) {
    let dropSlots = getDropSlots(board);

    while (!isEmptyDropSlots(dropSlots)) {
        // Do the dropping animation as long as there are more gems to drop
        let movingGems = getDroppingGems(board);

        for (let x = 0; x < dropSlots.length; x++) {
            if (dropSlots[x].length !== 0) {
                // Cause the lowest gem in each slot to begin moving in the DOWN direction
                movingGems.push({'imageNum': dropSlots[x][0], 'x': x, 'y': ROWABOVEBOARD, 'direction': DOWN});
            }
        }

        const boardCopy = getBoardCopyMinusGems(board, movingGems);
        animateMovingGems(boardCopy, movingGems, points, score);
        moveGems(board, movingGems);

        // Make the next row of gems from the drop slots
        // the lowest by deleting the previous lowest gems.
        for (let x = 0; x < dropSlots.length; x++) {
            if (dropSlots[x].length === 0) {
                continue;
            }
            board[x][0] = dropSlots[x][0];
            dropSlots[x].shift();
        }
    }
}

function getDropSlots(board) {
    // Creates a "drop slot" for each column and fills the slot with a
    // number of gems that that column is lacking. This function assumes
    // that the gems have been gravity dropped already.
    const boardCopy = JSON.parse(JSON.stringify(board)); // Deep copy of the board
    pullDownAllGems(boardCopy);

    const dropSlots = [];
    for (let i = 0; i < BOARDWIDTH; i++) {
        dropSlots.push([]);
    }

    // Count the number of empty spaces in each column on the board
    for (let x = 0; x < BOARDWIDTH; x++) {
        for (let y = BOARDHEIGHT - 1; y >= 0; y--) { // Start from bottom, going up
            if (boardCopy[x][y] === EMPTY_SPACE) {
                const possibleGems = Array.from({length: NUMGEMIMAGES}, (_, i) => i);
                const neighbors = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // Define neighbor offsets

                for (const [offsetX, offsetY] of neighbors) {
                    // Narrow down the possible gems we should put in the
                    // blank space so we don't end up putting two of
                    // the same gems next to each other when they drop.
                    const neighborGem = getGemAt(boardCopy, x + offsetX, y + offsetY);
                    const index = possibleGems.indexOf(neighborGem);
                    if (neighborGem !== null && index !== -1) {
                        possibleGems.splice(index, 1);
                    }
                }

                const newGem = possibleGems[Math.floor(Math.random() * possibleGems.length)];
                boardCopy[x][y] = newGem;
                dropSlots[x].push(newGem);
            }
        }
    }
    return dropSlots;
}
