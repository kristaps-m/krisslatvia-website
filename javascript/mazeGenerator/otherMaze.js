// https://healeycodes.com/generating-mazes
// https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm

let otherMazeAlg = true;
let unvisitedCells = [];
let visited = [];

for (let y = 0; y < ROWS; y++) {
  let temp = [];
  for (let x = 0; x < COLS; x++) {
    temp.push(new Cell(x, y));
  }
  unvisitedCells.push(temp);
}

const startCell = unvisitedCells[0][0];
startCell.inMaze = true;
visited.push(startCell);
unvisitedCells[0].splice(0, 1);
// console.log(unvisitedCells);
// const startCell = unvisitedCells[ROWS-1][COLS-1];
// startCell.inMaze = true;
// visited.push(startCell);
// unvisitedCells[ROWS-1].splice(COLS-1, 1);

function mazeLoop(){
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  if( otherMazeAlg ){
    while (unvisitedCells.length > 0) {
      let path = [];
      // let currentCell = getRandomNeighbor(unvisitedCells);
      // let currentCell = unvisitedCells[ROWS-1][COLS-1];
      let currentCell = getRandomUnvisitedCell();

      // Perform a random walk until we reach a cell that is already in the maze
      while (visited.indexOf(currentCell) === -1) {
        path.push(currentCell);
        let next = getRandomNeighbor(currentCell);

        // If a loop is formed, erase that section of the path
        const loopIndex = path.indexOf(next);
        if (loopIndex !== -1) {
          path = path.slice(0, loopIndex + 1);
        } else {
          path.push(next);
        }
        currentCell.draw();
        currentCell = next;
      }

      // Add the path to the maze by carving walls and marking cells as visited
      for (let i = 0; i < path.length - 1; i++) {
        console.log("Here");
        removeWalls2(path[i], path[i + 1]);
        visited.push(path[i]);
        const indexX = path[i].x;
        const indexY = path[i].y;
        unvisitedCells[indexY].splice(indexX, 1);
      }
    }
  }
  requestAnimationFrame(mazeLoop);
}

mazeLoop();

function removeWalls2(a, b) {
  console.log("remove wals");
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  if (dx === 1) { a.walls[3] = false; b.walls[1] = false; }
  if (dx === -1) { a.walls[1] = false; b.walls[3] = false; }
  if (dy === 1) { a.walls[0] = false; b.walls[2] = false; }
  if (dy === -1) { a.walls[2] = false; b.walls[0] = false; }
}

function getRandomUnvisitedCell() {
  const flatUnvisited = unvisitedCells.flat();
  const randomIndex = Math.floor(Math.random() * flatUnvisited.length);
  return flatUnvisited[randomIndex];
}

function getRandomNeighbor(current){
  console.log(current);
  const neighbors = [];
  const top = unvisitedCells[index2dimensions(current.x, current.y - 1).y][index2dimensions(current.x, current.y - 1).x];
  const right = unvisitedCells[index2dimensions(current.x + 1, current.y).y][index2dimensions(current.x + 1, current.y).x];
  const bottom = unvisitedCells[index2dimensions(current.x, current.y + 1).y][index2dimensions(current.x, current.y + 1).x];
  const left = unvisitedCells[index2dimensions(current.x - 1, current.y).y][index2dimensions(current.x - 1, current.y).x];

  if (top && !top.visited) neighbors.push(top);
  if (right && !right.visited) neighbors.push(right);
  if (bottom && !bottom.visited) neighbors.push(bottom);
  if (left && !left.visited) neighbors.push(left);

  if (neighbors.length > 0) {
    console.log("IF IF IF ---------------------------- !!");
    const next = neighbors[Math.floor(Math.random() * neighbors.length)];
    return next;
  } else {
    console.log("---------------------------- !!");
    return null;
  }
}
// // ---------- Maze Setup ----------
// const grid2 = [];
// for (let y = 0; y < ROWS; y++) {
//   let temp = [];
//   for (let x = 0; x < COLS; x++) {
//     temp.push(new Cell(x, y));
//   }
//   grid2.push(temp);
// }

// const DIRECTIONS = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

// // ---------- Step 1 - Initialize Walk ----------
// let walk = [];
// let walkDirections = [];
// let current2 = grid2[0][0];
// current2.visited = true;
// walk.push(current2);

// // let stack2 = [];
// /*
// WHILE there exists at least one cell NOT inMaze
//     walkStart = random cell where cell.inMaze == false
//     performLoopErasedRandomWalk(walkStart)
// END WHILE
// */
// // Step 2 — Random walk until maze is reached
// while (current2.inMaze === false) {
//   const neighbors = [];
//   const top = grid2[index(current2.x, current2.y - 1)];
//   const right = grid2[index(current2.x + 1, current2.y)];
//   const bottom = grid2[index(current2.x, current2.y + 1)];
//   const left = grid2[index(current2.x - 1, current2.y)];
//   if (top && !top.visited) neighbors.push(top);
//   if (right && !right.visited) neighbors.push(right);
//   if (bottom && !bottom.visited) neighbors.push(bottom);
//   if (left && !left.visited) neighbors.push(left);
//   const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//   next.visited = true;
// }

// let endCell2 = grid2[grid2.length - 1];
// // endCell2.visited = true;
// // let neighbors = [];

// function mazeLoop(){
//     if( otherMazeAlg ){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (const cell of grid2) {
//             cell.draw();
//         }
//         current2.highlight();
//         const neighbors = [];
//         while (stack2[stack2.length - 1] !== endCell2) {
//           const top = grid2[index(current2.x, current2.y - 1)];
//           const right = grid2[index(current2.x + 1, current2.y)];
//           const bottom = grid2[index(current2.x, current2.y + 1)];
//           const left = grid2[index(current2.x - 1, current2.y)];
  
//           if (top && !top.visited) neighbors.push(top);
//           if (right && !right.visited) neighbors.push(right);
//           if (bottom && !bottom.visited) neighbors.push(bottom);
//           if (left && !left.visited) neighbors.push(left);

//           if (neighbors.length > 0) {
//             const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//             next.visited = true;
  
//             stack2.push(current2);
//             // removeWalls(current2, next);
//             current2 = next;
//             if (isPathCreatingLoop(stack2, current2)) {
//               stack2 = [];
//               console.log("LOOP?");
//             }
//           }else if (stack2.length > 0) {
//               // console.log(stack);
//               // console.log(current2);
//               // console.log(neighbors.length, neighbors);
//             current2 = stack.pop();
//           }
//           // const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//           // next.visited = true;
//           // ctx.fillStyle = "red";
//           // ctx.fillRect(50, 50, 100, 100);            
//         }
//     }
//     requestAnimationFrame(mazeLoop);
// }

// mazeLoop();

// function isPathCreatingLoop(theNeigbhbors, nextCell) {
//   for (const neighbor of theNeigbhbors) {
//     if (neighbor.x === nextCell.x && neighbor.y === nextCell.y) {
//       return true;
//     }
//   }

//   return false;
// }