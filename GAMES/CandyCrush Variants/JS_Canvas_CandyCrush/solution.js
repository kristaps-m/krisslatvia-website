
function findMatches(board) {
  const matches = new Set();

  const rows = board.length;
  const cols = board[0].length;

  // rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 2; c++) {
      const v = board[r][c].randomInteger;
      if (
        v &&
        v === board[r][c + 1].randomInteger &&
        v === board[r][c + 2].randomInteger
      ) {
        matches.add(`${r},${c}`);
        matches.add(`${r},${c + 1}`);
        matches.add(`${r},${c + 2}`);
      }
    }
  }

  // columns
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 2; r++) {
      const v = board[r][c].randomInteger;
      if (
        v &&
        v === board[r + 1][c].randomInteger &&
        v === board[r + 2][c].randomInteger
      ) {
        matches.add(`${r},${c}`);
        matches.add(`${r + 1},${c}`);
        matches.add(`${r + 2},${c}`);
      }
    }
  }

  return [...matches].map(s => s.split(",").map(Number));
}

function removeMatches(board, matches) {
  matches.forEach(([r, c]) => {
    const cell = board[r][c];
    cell.isCrushing = true;
  });
}

function prepareFalling(board) {
  const rows = board.length;
  const cols = board[0].length;

  for (let c = 0; c < cols; c++) {
    let writeRow = rows - 1;

    for (let r = rows - 1; r >= 0; r--) {
      if (board[r][c].randomInteger !== 0) {
        if (r !== writeRow) {
          board[writeRow][c].randomInteger = board[r][c].randomInteger;
          board[r][c].randomInteger = 0;
        }
        writeRow--;
      }
    }

    // spawn new candies
    for (let r = writeRow; r >= 0; r--) {
      board[r][c].randomInteger = getRndInteger(1, NUMBER_OF_COLORS_USED);
    }
  }
}

