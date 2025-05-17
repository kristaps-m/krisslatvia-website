// // Find and crush the crushable candies, then return the updated board
// // number[][]
// function candyCrush(board) {
//   board = [...fromOneDimensionToTwo(board)];
//   console.log(board);
//   let numRows = board.length;
//   let numCols = board[0].length;
//   let foundCrushableCandies = true;

//   // Continue the process as long as we find crushable candies
//   while (foundCrushableCandies) {
//     foundCrushableCandies = false;

//     // Mark the crushable candies in rows by making their values negative
//     for (let row = 0; row < numRows; ++row) {
//       for (let col = 0; col < numCols - 2; ++col) {
//         let candyValue = Math.abs(board[row][col].cV);
//         if (
//           candyValue !== 0 &&
//           candyValue === Math.abs(board[row][col + 1].cV) &&
//           candyValue === Math.abs(board[row][col + 2].cV)
//         ) {
//           foundCrushableCandies = true;
//           board[row][col].cV = board[row][col + 1].cV = board[row][col + 2].cV = -candyValue;
//         }
//       }
//     }

//     // Mark the crushable candies in columns by making their values negative
//     for (let col = 0; col < numCols; ++col) {
//       for (let row = 0; row < numRows - 2; ++row) {
//         let candyValue = Math.abs(board[row][col].cV);
//         if (
//           candyValue !== 0 &&
//           candyValue === Math.abs(board[row + 1][col].cV) &&
//           candyValue === Math.abs(board[row + 2][col].cV)
//         ) {
//           foundCrushableCandies = true;
//           board[row][col].cV = board[row + 1][col].cV = board[row + 2][col].cV = -candyValue;
//         }
//       }
//     }

//     // Crush the marked candies and let the candies fall down to fill the empty spaces
//     if (foundCrushableCandies) {
//       for (let col = 0; col < numCols; ++col) {
//         let fillPosition = numRows - 1;

//         // Move non-crushable candies down
//         for (let row = numRows - 1; row >= 0; --row) {
//           if (board[row][col].cV > 0) {
//             board[fillPosition][col] = board[row][col];
//             fillPosition--;
//           }
//         }

//         // Fill the remaining spaces with 0s
//         for (let fill = fillPosition; fill >= 0; fill--) {
//           const r = getRndInteger(0, GAME_COLORS.length - 1);
//           board[fill][col].cV = r + 1;
//           board[fill][col].c = GAME_COLORS[r];
//         }
//       }
//     }
//   }
//   console.log(board);

//   let result = [];
//   for (var i = 0; i < board.length; i++) {
//     result = result.concat(board[i]);
//   }

//   return result;
// }

// function fromOneDimensionToTwo(theBoard) {
//   const finalList = [];
//   let c = 0;

//   for (let col = 0; col < CANDIES_IN_COL; col++) {
//     const tempList = [];
//     for (let row = 0; row < CANDIES_IN_ROW; row++) {
//       tempList.push(theBoard[c]);
//       c++;
//     }

//     finalList.push(tempList);
//   }

//   return finalList;
// }

// function getRndInteger(min, max) {
//   // random number between min and max (both included):
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Find and crush the crushable candies, then return the updated board
// function candyCrush(board) {
//   let numRows = board.length;
//   let numCols = board[0].length;
//   let foundCrushableCandies = true;

//   // Continue the process as long as we find crushable candies
//   while (foundCrushableCandies) {
//     foundCrushableCandies = false;

//     // Mark the crushable candies in rows by making their values negative
//     for (let row = 0; row < numRows; ++row) {
//       for (let col = 0; col < numCols - 2; ++col) {
//         let candyValue = Math.abs(board[row][col]);
//         if (
//           candyValue !== 0 &&
//           candyValue === Math.abs(board[row][col + 1]) &&
//           candyValue === Math.abs(board[row][col + 2])
//         ) {
//           foundCrushableCandies = true;
//           board[row][col] = board[row][col + 1] = board[row][col + 2] = -candyValue;
//         }
//       }
//     }

//     // Mark the crushable candies in columns by making their values negative
//     for (let col = 0; col < numCols; ++col) {
//       for (let row = 0; row < numRows - 2; ++row) {
//         let candyValue = Math.abs(board[row][col]);
//         if (
//           candyValue !== 0 &&
//           candyValue === Math.abs(board[row + 1][col]) &&
//           candyValue === Math.abs(board[row + 2][col])
//         ) {
//           foundCrushableCandies = true;
//           board[row][col] = board[row + 1][col] = board[row + 2][col] = -candyValue;
//         }
//       }
//     }

//     // Crush the marked candies and let the candies fall down to fill the empty spaces
//     if (foundCrushableCandies) {
//       for (let col = 0; col < numCols; ++col) {
//         let fillPosition = numRows - 1;

//         // Move non-crushable candies down
//         for (let row = numRows - 1; row >= 0; --row) {
//           if (board[row][col] > 0) {
//             board[fillPosition][col] = board[row][col];
//             fillPosition--;
//           }
//         }

//         // Fill the remaining spaces with 0s
//         for (let fill = fillPosition; fill >= 0; fill--) {
//           board[fill][col] = getRndInteger(1, NUMBER_OF_COLORS_USED);
//         }
//       }
//     }
//   }

//   return board;
// }

function candyCrush(board) {
  console.log("I AM TRIGERED!");
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
