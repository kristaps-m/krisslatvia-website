# Wilson's Algorithm - Detailed Code Documentation

## Algorithm Overview

Wilson's algorithm generates perfect mazes using a Loop-Erased Random Walk (LERW). Unlike Recursive Backtracking which builds the maze by carving from one starting point, Wilson's algorithm:

1. Starts with all cells unvisited (except one seed cell)
2. Picks a random unvisited cell
3. Performs a random walk until hitting a visited cell
4. If the walk loops back on itself, that loop is erased
5. The resulting path is carved into the maze
6. Repeats until all cells are visited

## Key Features

### Variable Initialization

```javascript
// Main algorithm state variables
let otherMazeAlg = false; // Toggle for Wilson's algorithm
let wilsonsGridCells = []; // 2D array of Cell objects
let wilsonsVisited = []; // List of cells already in maze
let wilsonsCurrentWalk = []; // Current random walk path
let wilsonsStepCounter = 0; // Counter for generation steps
let wilsonsGenerationComplete = false; // Flag for completion
```

### Core Functions Explained

#### 1. `initializeWilsonsMaze()`

Prepares the grid for maze generation by:

- Resetting all state variables
- Creating a 2D grid of Cell objects with proper sizing
- Adding the first cell to the visited list
- Reusing the existing `Cell` class from mazeGenMain.js

**Why**: Ensures clean state for each new maze generation

#### 2. `wilsonsGenerationStep()`

Executes one iteration of the algorithm:

**Logic Flow**:

```
1. If all cells visited → generation complete
2. If no current walk → start new walk from random unvisited cell
3. If walk has unvisited neighbors:
   - Pick random neighbor
   - Check if it creates loop
   - If loop found → erase loop section
   - Otherwise → add to walk
4. If no unvisited neighbors:
   - Find visited neighbors
   - Connect walk to maze
   - Add all walk cells to visited list
   - Reset walk for next iteration
```

**Key Insight**: The loop-erased part ensures the walk doesn't trap itself

#### 3. `getRandomUnvisitedCellWilsons()`

Selects random cell not yet in the maze

**Implementation**:

- Uses do-while loop to ensure unvisited cell is found
- Checks against `wilsonsVisited` array
- Simple linear search acceptable for reasonable maze sizes

#### 4. `getUnvisitedNeighborsWilsons(cell)`

Returns all valid unvisited neighbors of a cell

**Considerations**:

- Only includes cells NOT already in current walk
- Respects grid boundaries
- Uses 4-directional adjacency (no diagonals)

#### 5. `getVisitedNeighborsWilsons(cell)`

Returns all valid visited neighbors (cells already in maze)

**Purpose**: Finds connection point for walk to join maze

#### 6. `wilsonMazeLoop()`

Main animation loop called via requestAnimationFrame

**Functionality**:

- Only runs when `otherMazeAlg` is true
- Clears canvas each frame
- Performs multiple steps per frame (based on draw speed)
- Draws all cells with current state
- Highlights:
  - Current walk in yellow
  - Visited cells in light blue
  - Maze walls in black

**Performance**: Uses `stepsPerFrame` from draw speed control to balance animation smoothness vs generation speed

#### 7. `newWilsonsMaze()`

Initializes a new maze generation session

**Steps**:

1. Clears canvas
2. Reads current settings from HTML inputs
3. Adjusts canvas size accordingly
4. Calls `initializeWilsonsMaze()`
5. Opens entrance (top-left, left wall)
6. Opens exit (bottom-right, right wall)

## Comparison with Recursive Backtracking

| Aspect            | Wilson's Algorithm                 | Recursive Backtracking               |
| ----------------- | ---------------------------------- | ------------------------------------ |
| Starting Point    | One seed cell                      | One cell                             |
| Generation Method | Random walk with loop erasure      | Depth-first search with backtracking |
| Memory Usage      | O(n) for visits + walk             | O(n) for call stack                  |
| Distribution      | Uniform (all mazes equally likely) | Biased (prefers longer corridors)    |
| Visual Style      | More varied paths                  | Tends to create longer dead ends     |
| Speed             | Generally faster for animation     | Slightly faster for completion       |

## Code Reuse Strategy

### From `mazeGenMain.js`:

- **Cell class**: Exact same implementation with cellSize parameter
- **removeWalls()**: Function to carve passages between cells
- **Canvas/Context**: Global `canvas` and `ctx` variables
- **Grid dimensions**: `ROWS`, `COLS`, `CELL_SIZE` globals

### From `main.js`:

- **Algorithm switching framework**: Extended existing switch statement
- **UI control patterns**: Hidden/shown based on algorithm selection

### From HTML:

- **Existing controls**: Shared maze dimensions and draw speed
- **Canvas element**: Single canvas handles both algorithms
- **Button system**: New button follows existing pattern

## Potential Optimizations

### Current Implementation:

- Linear search for unvisited cells
- Single random walk per step
- Full grid redraw each frame

### Possible Improvements:

1. **Cell Tracking**: Keep array of unvisited cells instead of searching
2. **Parallel Walks**: Multiple simultaneous walks for faster generation
3. **Partial Redraws**: Only redraw changed cells
4. **WebWorker**: Offload computation to separate thread
5. **Bitfield**: Use bitfield for visited tracking (reduce memory)

## Boundary Handling

```javascript
// All neighbor functions check bounds before accessing grid
if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
  // Safe to access wilsonsGridCells[newY][newX]
}
```

This prevents index out of bounds errors and naturally creates maze boundaries.

## Loop Erasure Mechanism

**Why loops are erased**:

- Random walk without loop erasure could spend infinite time in one area
- Erasing loops ensures progress toward unvisited cells
- Creates the "uniform distribution" property

**How it works**:

```javascript
const loopIndex = wilsonsCurrentWalk.findIndex(
  (cell) => cell.x === nextCell.x && cell.y === nextCell.y,
);
if (loopIndex !== -1) {
  // Loop detected - erase everything after the loop point
  wilsonsCurrentWalk = wilsonsCurrentWalk.slice(0, loopIndex + 1);
}
```

## Visualization Colors

- **Light Blue Background**: Cells in the maze (visited)
- **Yellow Cells**: Current random walk path
- **Gray Background**: Unvisited cells (default Cell.draw() color)
- **Black Walls**: Passages and walls

The visualization helps users understand the algorithm's behavior in real-time.

## Performance Characteristics

For a `n x n` grid:

- **Cells**: O(n²)
- **Random walks**: Average O(n) steps per cell
- **Total complexity**: O(n³) worst case, typically O(n²·log n)

## Testing Considerations

1. **Edge cases**:
   - 1x1 grid (single cell)
   - Very long thin mazes (1xN or Nx1)
   - Large mazes (performance impact)

2. **Verification**:
   - All cells should be visited
   - All cells should be reachable from start
   - No isolated regions

3. **Visual validation**:
   - Yellow highlighting shows walk progression
   - Blue highlighting shows maze growth
   - Entrance and exit should be open
