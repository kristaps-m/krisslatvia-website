function candyCrush(board) {
  let numRows = board.length;
  let numCols = board[0].length;
  let foundCrushableCandies = true;

  // Continue the process as long as we find crushable candies
  while (foundCrushableCandies) {
    foundCrushableCandies = false;

    // Mark the crushable candies in rows by making their values negative
    for (let row = 0; row < numRows; ++row) {
      for (let col = 0; col < numCols - 2; ++col) {
        let candyValue = Math.abs(board[row][col].randomInteger);
        if (
          candyValue !== 0 &&
          candyValue === Math.abs(board[row][col + 1].randomInteger) &&
          candyValue === Math.abs(board[row][col + 2].randomInteger)
        ) {
          foundCrushableCandies = true;
          board[row][col].randomInteger =
            board[row][col + 1].randomInteger =
            board[row][col + 2].randomInteger =
              -candyValue;
        }
      }
    }

    // Mark the crushable candies in columns by making their values negative
    for (let col = 0; col < numCols; ++col) {
      for (let row = 0; row < numRows - 2; ++row) {
        let candyValue = Math.abs(board[row][col].randomInteger);
        if (
          candyValue !== 0 &&
          candyValue === Math.abs(board[row + 1][col].randomInteger) &&
          candyValue === Math.abs(board[row + 2][col].randomInteger)
        ) {
          foundCrushableCandies = true;
          board[row][col].randomInteger =
            board[row + 1][col].randomInteger =
            board[row + 2][col].randomInteger =
              -candyValue;
        }
      }
    }

    // Crush the marked candies and let the candies fall down to fill the empty spaces
    if (foundCrushableCandies) {
      for (let col = 0; col < numCols; ++col) {
        let fillPosition = numRows - 1;

        // Move non-crushable candies down
        for (let row = numRows - 1; row >= 0; --row) {
          if (board[row][col].randomInteger > 0) {
            board[fillPosition][col].randomInteger =
              board[row][col].randomInteger;
            fillPosition--;
          }
        }

        // Fill the remaining spaces with 0s
        for (let fill = fillPosition; fill >= 0; fill--) {
          board[fill][col].randomInteger = getRndInteger(
            1,
            NUMBER_OF_COLORS_USED
          );
        }
      }
    }
  }

  return board;
}
