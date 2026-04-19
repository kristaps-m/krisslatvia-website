/**
 * Wilson's Maze Generation Algorithm Implementation
 *
 * References:
 * - https://healeycodes.com/generating-mazes
 * - https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm
 *
 * Algorithm Overview:
 * 1. Start with an empty maze and pick a random cell as the starting point
 * 2. Pick a random unvisited cell and perform a random walk
 * 3. Continue the random walk until reaching a cell already in the maze
 * 4. If the walk forms a loop, erase that section (loop-erased random walk)
 * 5. Add the path to the maze by carving walls between cells
 * 6. Repeat until all cells are visited
 */

// ========== Wilson's Algorithm Variables ==========
let otherMazeAlg = false;
let wilsonsGridCells = [];
let wilsonsVisited = [];
let wilsonsCurrentWalk = [];
let wilsonsStepCounter = 0;
let wilsonsGenerationComplete = false;

// ========== Wilson's Algorithm Timing & Solution Variables ==========
let wilsonsLastTime = 0;
let wilsonsDelay = 1; // ms between steps (increase = slower)
let wilsonsSolutionPath = null;
let wilsonsMazeFinished = false;

/**
 * Initialize Wilson's algorithm maze generation
 * Sets up the grid and starts the algorithm
 */
function initializeWilsonsMaze() {
  // Reset variables
  wilsonsGridCells = [];
  wilsonsVisited = [];
  wilsonsCurrentWalk = [];
  wilsonsStepCounter = 0;
  wilsonsGenerationComplete = false;
  let CELL_SIZE = parseInt(document.getElementById("cellSize").value);

  // Create grid of cells
  for (let y = 0; y < ROWS; y++) {
    let row = [];
    for (let x = 0; x < COLS; x++) {
      row.push(new Cell(x, y, CELL_SIZE));
    }
    wilsonsGridCells.push(row);
  }

  // Start with a random cell in the maze
  const startCell = wilsonsGridCells[0][0];
  startCell.visited = true;
  wilsonsVisited.push(startCell);
}

/**
 * Perform one step of Wilson's maze generation algorithm
 * Called repeatedly from wilsonMazeLoop()
 */
function wilsonsGenerationStep() {
  // If all cells are visited, maze generation is complete
  if (wilsonsVisited.length === ROWS * COLS) {
    wilsonsGenerationComplete = true;
    return;
  }

  // If no current walk, start a new one from a random unvisited cell
  if (wilsonsCurrentWalk.length === 0) {
    let randomUnvisited = getRandomUnvisitedCellWilsons();
    if (!randomUnvisited) {
      // No more unvisited cells found
      wilsonsGenerationComplete = true;
      return;
    }
    wilsonsCurrentWalk.push(randomUnvisited);
    return; // Start fresh next step
  }

  // Continue random walk until we reach a visited cell or connect to maze
  const currentCell = wilsonsCurrentWalk[wilsonsCurrentWalk.length - 1];

  // Get all valid neighbors (unvisited + in bounds)
  const allNeighbors = [];
  const directions = [
    { x: 0, y: -1 }, // top
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // bottom
    { x: -1, y: 0 }, // left
  ];

  for (const dir of directions) {
    const newX = currentCell.x + dir.x;
    const newY = currentCell.y + dir.y;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
      allNeighbors.push(wilsonsGridCells[newY][newX]);
    }
  }

  // Pick a random neighbor
  if (allNeighbors.length > 0) {
    const nextCell = allNeighbors[Math.floor(Math.random() * allNeighbors.length)];

    // Check if nextCell is already in the maze (visited)
    const isInMaze = wilsonsVisited.some((cell) => cell.x === nextCell.x && cell.y === nextCell.y);

    if (isInMaze) {
      // We've reached the maze! Add the entire walk to the maze
      for (let i = 0; i < wilsonsCurrentWalk.length; i++) {
        const walkCell = wilsonsCurrentWalk[i];
        // Mark as visited
        walkCell.visited = true;
        wilsonsVisited.push(walkCell);

        // Carve wall to next cell in walk
        if (i < wilsonsCurrentWalk.length - 1) {
          removeWalls(walkCell, wilsonsCurrentWalk[i + 1]);
        }
      }

      // Carve wall from last walk cell to the maze cell we connected to
      removeWalls(wilsonsCurrentWalk[wilsonsCurrentWalk.length - 1], nextCell);

      // Reset walk for next iteration
      wilsonsCurrentWalk = [];
    } else {
      // Check if nextCell is already in current walk (loop detection)
      const loopIndex = wilsonsCurrentWalk.findIndex(
        (cell) => cell.x === nextCell.x && cell.y === nextCell.y,
      );

      if (loopIndex !== -1) {
        // Loop detected: erase the loop by keeping only up to the loop point
        wilsonsCurrentWalk = wilsonsCurrentWalk.slice(0, loopIndex + 1);
      } else {
        // Continue the walk
        wilsonsCurrentWalk.push(nextCell);
      }
    }
  }
}

/**
 * Get a random unvisited cell from the grid
 * @returns {Cell} A random unvisited cell, or null if all cells are visited
 */
function getRandomUnvisitedCellWilsons() {
  // Check if there are any unvisited cells remaining
  if (wilsonsVisited.length >= ROWS * COLS) {
    return null; // All cells have been visited
  }

  let randomCell;
  let attempts = 0;
  const maxAttempts = ROWS * COLS * 2; // Prevent infinite loops

  do {
    const randomY = Math.floor(Math.random() * ROWS);
    const randomX = Math.floor(Math.random() * COLS);
    randomCell = wilsonsGridCells[randomY][randomX];
    attempts++;

    // Check if this cell is unvisited
    const isUnvisited = !wilsonsVisited.some(
      (cell) => cell.x === randomCell.x && cell.y === randomCell.y,
    );
    if (isUnvisited) {
      return randomCell; // Found an unvisited cell
    }
  } while (attempts < maxAttempts);

  // Fallback: scan grid directly for unvisited cell
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = wilsonsGridCells[y][x];
      if (!wilsonsVisited.some((c) => c.x === cell.x && c.y === cell.y)) {
        return cell;
      }
    }
  }

  return null; // No unvisited cells found
}

/**
 * Draw the solution path on the maze
 * @param {Array<Cell>} path - Array of cells representing the solution path
 * @param {number} cellSize - Size of each cell in pixels
 */
function drawWilsonPath(path, cellSize = 20) {
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 3;
  ctx.beginPath();

  for (let i = 0; i < path.length; i++) {
    const cell = path[i];
    const cx = cell.x * cellSize + cellSize / 2;
    const cy = cell.y * cellSize + cellSize / 2;

    if (i === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  }

  ctx.stroke();
}

/**
 * Get all reachable neighbors of a cell (through open passages)
 * @param {Cell} cell - The cell to get neighbors for
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Array<Cell>} Array of reachable neighbor cells
 */
function getWilsonsReachableNeighbors(cell, rows, cols) {
  const neighbors = [];
  const { x, y } = cell;

  // top - check if wall is open
  if (!cell.walls[0] && y > 0) neighbors.push(wilsonsGridCells[y - 1][x]);
  // right - check if wall is open
  if (!cell.walls[1] && x < cols - 1) neighbors.push(wilsonsGridCells[y][x + 1]);
  // bottom - check if wall is open
  if (!cell.walls[2] && y < rows - 1) neighbors.push(wilsonsGridCells[y + 1][x]);
  // left - check if wall is open
  if (!cell.walls[3] && x > 0) neighbors.push(wilsonsGridCells[y][x - 1]);

  return neighbors.filter(Boolean);
}

/**
 * Solve the Wilson's maze using Breadth-First Search (BFS)
 * Finds the shortest path from top-left (0,0) to bottom-right (COLS-1, ROWS-1)
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Array<Cell>} Path from start to end, or empty array if no solution
 */
function solveWilsonsMaze(rows, cols) {
  const start = wilsonsGridCells[0][0];
  const end = wilsonsGridCells[rows - 1][cols - 1];

  // Reset solver state
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      wilsonsGridCells[y][x].solved = false;
      wilsonsGridCells[y][x].parent = null;
    }
  }

  const queue = [];
  start.solved = true;
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === end) break;

    // Get neighbors through open passages
    for (const neighbor of getWilsonsReachableNeighbors(current, rows, cols)) {
      if (!neighbor.solved) {
        neighbor.solved = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  // Reconstruct path from end to start
  const path = [];
  let cur = end;
  while (cur) {
    path.push(cur);
    cur = cur.parent;
  }

  return path.reverse();
}

/**
 * Main animation loop for Wilson's maze generation
 * Handles drawing and stepping through the algorithm with timing control
 */
function wilsonMazeLoop(time = 0) {
  // Only run if Wilson's algorithm is selected AND grid has been initialized
  if (otherMazeAlg && wilsonsGridCells.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Use timing control to limit generation speed (similar to Recursive Backtracker)
    if (time - wilsonsLastTime > wilsonsDelay) {
      const stepsPerFrame = parseInt(document.getElementById("mazeDrawSpeed").value) || 1;
      for (let i = 0; i < stepsPerFrame && !wilsonsGenerationComplete; i++) {
        wilsonsGenerationStep();
      }
      wilsonsLastTime = time;

      // Check if maze generation is complete
      if (!wilsonsMazeFinished && wilsonsGenerationComplete) {
        wilsonsMazeFinished = true;
      }
    }

    // Draw all cells with their walls (similar to Recursive Backtracker style)
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        wilsonsGridCells[y][x].draw();
      }
    }

    // Draw solution path if one exists
    if (wilsonsSolutionPath) {
      let cellSize = parseInt(document.getElementById("cellSize").value);
      drawWilsonPath(wilsonsSolutionPath, cellSize);
    }
  }

  requestAnimationFrame(wilsonMazeLoop);
}

/**
 * Initialize Wilson's maze generation when algorithm is selected
 */
function newWilsonsMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ROWS = parseInt(document.getElementById("mazeHeight").value);
  COLS = parseInt(document.getElementById("mazeWidth").value);
  let cellSize = parseInt(document.getElementById("cellSize").value);
  canvas.width = COLS * cellSize;
  canvas.height = ROWS * cellSize;
  initializeWilsonsMaze();
  // Open entrance and exit
  wilsonsGridCells[0][0].walls[3] = false; // open entrance
  wilsonsGridCells[ROWS - 1][COLS - 1].walls[1] = false; // open exit
}

// Start the animation loop - this will continuously run and check if Wilson's algorithm is active
wilsonMazeLoop();
