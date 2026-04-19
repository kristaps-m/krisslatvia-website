# Wilson's Maze Generation Algorithm - Implementation Summary

## Overview

Successfully added **Wilson's Maze Generation Algorithm** to the maze generator project with improved UI and algorithm switching capabilities.

## What Was Added

### 1. Core Algorithm Implementation (`otherMaze.js`)

Implemented Wilson's Loop-Erased Random Walk (LERW) algorithm with the following features:

#### Algorithm Steps:

1. **Initialization**: Creates a grid of cells with one random starting cell marked as visited
2. **Random Walk**: Picks an unvisited cell and performs a random walk
3. **Loop Detection**: When the walk intersects itself, the loop is erased (key feature of Wilson's algorithm)
4. **Maze Integration**: Once the walk reaches a visited cell, the path is carved into the maze
5. **Repetition**: Process continues until all cells are visited

#### Key Functions:

- `initializeWilsonsMaze()` - Sets up grid and resets algorithm state
- `wilsonsGenerationStep()` - Performs one step of the algorithm
- `getRandomUnvisitedCellWilsons()` - Selects random unvisited starting cell
- `getUnvisitedNeighborsWilsons(cell)` - Gets unvisited adjacent cells (not in current walk)
- `getVisitedNeighborsWilsons(cell)` - Gets visited adjacent cells (for path connection)
- `wilsonMazeLoop()` - Main animation loop with visualization
- `newWilsonsMaze()` - Initializes new maze generation

#### Visualization:

- **Light Blue**: Cells already in the maze (visited)
- **Yellow**: Cells currently being explored in the random walk
- **Black Lines**: Maze walls

### 2. UI Improvements (`mazeG.html`)

#### Enhanced Controls:

- **Algorithm Selector**: Dropdown to switch between "Recursive Backtracker" and "Wilson's Algorithm"
- **Shared Parameters**:
  - Cell size (slider for control precision)
  - Maze width (number of cells horizontally)
  - Maze height (number of cells vertically)
  - Draw speed (affects generation animation speed)

#### UI Elements Added:

```html
<!-- Improved dropdown with clearer naming -->
<select id="selectMaze" onchange="selectMazeAlgorithm()">
  <option value="recursive_1">Recursive Backtracker</option>
  <option value="wilsons">Wilson's Algorithm</option>
</select>

<!-- Wilson's Algorithm Button -->
<button id="newMazeBtnWilsons" onclick="newWilsonsMaze()">New Maze</button>
```

### 3. Algorithm Switching Logic (`main.js`)

Enhanced `selectMazeAlgorithm()` function to:

- Hide/show appropriate controls based on selected algorithm
- Toggle `isRecursiveBacktrackerSelected` flag
- Toggle `otherMazeAlg` flag for Wilson's algorithm
- Manage button visibility for algorithm-specific features

```javascript
switch (selectMaze.value) {
  case "recursive_1":
    isRecursiveBacktrackerSelected = true;
    otherMazeAlg = false;
    // Show Recursive Backtracker controls
    break;
  case "wilsons":
    isRecursiveBacktrackerSelected = false;
    otherMazeAlg = true;
    // Show Wilson's Algorithm controls
    break;
}
```

## How to Use

### Generate a Wilson's Maze:

1. Open `mazeG.html` in a browser
2. Adjust parameters:
   - **Cell Size**: Size of individual cells (default: 20px)
   - **Width/Height**: Dimensions of the maze in cells (default: 10x10)
   - **Draw Speed**: Animation speed (higher = faster generation)
3. Select "Wilson's Algorithm" from dropdown
4. Click "New Maze" button
5. Watch the algorithm generate the maze with visualization

### Parameter Adjustment:

- **Larger mazes**: Increase Width/Height (note: very large mazes may lag)
- **Faster generation**: Increase Draw Speed slider
- **Cell visibility**: Adjust Cell Size

## Technical Details

### Reused Code:

- `Cell` class from `mazeGenMain.js` (with cellSize parameter)
- `removeWalls(a, b)` function for wall carving
- Canvas and context variables (`ctx`, `canvas`)
- Global maze dimensions (`ROWS`, `COLS`, `CELL_SIZE`)

### Algorithm Characteristics:

- **Time Complexity**: O(n²) where n is number of cells
- **Space Complexity**: O(n) for grid storage
- **Unique Property**: Produces truly random mazes with uniform distribution
- **Visual Difference**: Creates mazes with more varied paths compared to Recursive Backtracking

### Key Variables in `otherMaze.js`:

```javascript
let otherMazeAlg = false; // Flag to enable Wilson's algorithm
let wilsonsGridCells = []; // 2D grid of cells
let wilsonsVisited = []; // Array of cells already in maze
let wilsonsCurrentWalk = []; // Current random walk path
let wilsonsGenerationComplete = false; // Completion status
```

## Browser Compatibility

- Works on modern browsers with Canvas support
- Tested with standard JavaScript ES6 features
- No external dependencies required

## Performance Notes

- **Recommended Sizes**: 10x10 to 30x30 cells for smooth animation
- **Performance Impact**: Draw speed affects CPU usage
- **Optimization**: Can be improved by limiting animation FPS if needed

## Future Enhancements

Possible improvements:

- Add maze solving algorithm for Wilson's mazes
- Add preset difficulty levels
- Display generation statistics (time, cells processed)
- Export maze as image/SVG
- Multiple simultaneous random walks for faster generation

## Files Modified

1. `otherMaze.js` - Complete rewrite with Wilson's algorithm
2. `main.js` - Enhanced algorithm selection logic
3. `mazeG.html` - Improved UI with Wilson's option

## References

- https://healeycodes.com/generating-mazes
- https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm
- https://en.wikipedia.org/wiki/Maze_generation_algorithm#Wilsons_algorithm
