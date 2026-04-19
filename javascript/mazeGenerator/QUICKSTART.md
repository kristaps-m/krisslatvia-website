# Quick Start Guide - Wilson's Maze Generator

## Getting Started

### 1. Open the Application

Open `mazeG.html` in any modern web browser

### 2. Select Wilson's Algorithm

1. Find the "Select Maze Algorithm:" dropdown menu
2. Choose "Wilson's Algorithm" from the options
3. Notice the UI updates to show Wilson's controls

### 3. Adjust Maze Parameters

#### Cell Size

- **Label**: "cell size"
- **Range**: Adjustable input box
- **Default**: 20 pixels
- **Effect**: Larger values = bigger individual cells, easier to see maze details
- **Tip**: Use 10-20 for screen display, 5-10 for printing

#### Maze Dimensions

- **Width** (labeled "w"): Number of cells horizontally
- **Height** (labeled "h"): Number of cells vertically
- **Default**: 10x10 cells
- **Recommended**: Start with 10x10, try up to 30x30
- **Warning**: Very large mazes (50x50+) may cause lag

#### Draw Speed

- **Type**: Range slider
- **Range**: 10 to 10,000
- **Default**: 10
- **Effect**:
  - Lower values = slower, smoother animation (watch the algorithm work)
  - Higher values = faster generation
  - Useful for understanding the algorithm at slow speeds

### 4. Generate a Maze

Click the "New Maze" button to start generation

### 5. Watch the Algorithm

Observe the visualization:

- **Light Blue areas**: Cells already incorporated into the maze
- **Yellow path**: Current random walk being explored
- **Black lines**: Maze walls
- **Animation shows**: How the algorithm grows the maze organically

### 6. Generate Another

Click "New Maze" again to create a different maze with same settings

## Understanding the Algorithm

### What Makes Wilson's Different?

Unlike simple algorithms that dig from one corner, Wilson's algorithm:

1. **Explores randomly**: Picks any unvisited cell to start from
2. **Takes random walks**: Wanders through unvisited areas
3. **Erases loops**: If a walk crosses itself, that loop is removed
4. **Connects carefully**: Only adds paths when they reach the existing maze
5. **Repeats until done**: Continues until every cell is included

**Result**: Every maze generated is guaranteed to be "perfect" (all cells connected, one solution path)

### Visualization Explained

**Light Blue (Visited Cells)**

- These cells are now part of the final maze
- Walls are carved between them and their neighbors
- The maze grows organically from these regions

**Yellow (Current Walk)**

- Shows the random walk currently in progress
- Watch how it winds through unvisited areas
- If it loops back, that loop gets erased
- Once it touches a blue cell, that path becomes permanent

**Black (Maze Walls)**

- Solid walls separate unvisited from visited areas
- Gaps in walls are passages through the maze
- Start has an opening on the left side (entrance)
- Goal has an opening on the right side (exit)

## Tips & Tricks

### For Animation Study

- Set Size to **10x10**
- Set Draw Speed to **100-500** (slow enough to follow the logic)
- Generate maze and watch the algorithm step through

### For Complex Mazes

- Set Size to **20x20 or 30x30**
- Set Cell Size to **10-15**
- Set Draw Speed to **5000-10000** (fast generation)
- Creates challenging mazes to solve

### For Printing

- Set Cell Size to **8-10**
- Set Size to **15x20**
- Generate maze
- Print directly from browser (use "Print to PDF" or physical printer)
- You now have a custom maze to solve!

### For Performance

- If maze generation stutters/lags:
  - Decrease maze size (reduce Width/Height)
  - Increase Cell Size (fewer cells to draw)
  - Set Draw Speed higher (fewer animation frames)

## Frequently Asked Questions

**Q: Why is Wilson's algorithm different from Recursive Backtracking?**
A: Wilson's uses random walks instead of depth-first search, creating different maze characteristics and visually interesting patterns.

**Q: Can I print the mazes?**
A: Yes! Generate a maze, then use your browser's print function (Ctrl+P or Cmd+P). The canvas will print as an image.

**Q: Why do some mazes take longer than others?**
A: Each maze is randomly generated, so generation time varies. Unlucky random walks might take longer to connect. This is normal!

**Q: What's the maximum size maze?**
A: Technically unlimited, but very large mazes (100x100+) may freeze your browser. Start with 30x30 as a practical limit.

**Q: Can I solve the mazes?**
A: The current version doesn't have a solver for Wilson's algorithm. You can solve them manually or use the Recursive Backtracker's solver feature.

**Q: Why does the maze always have an open entrance and exit?**
A: These are automatically added so the maze is solvable. They're located at the top-left entrance and bottom-right exit.

## Troubleshooting

**Issue**: Maze generation is very slow

- **Solution**: Reduce maze size or increase draw speed

**Issue**: Maze looks all gray (not generating)

- **Solution**: Make sure "Wilson's Algorithm" is selected in dropdown

**Issue**: Can't see individual cells clearly

- **Solution**: Increase Cell Size value

**Issue**: Animation is too fast to follow

- **Solution**: Reduce Draw Speed value (try 100-500)

## Algorithm Parameters Explained

| Parameter  | What It Controls        | Best For                |
| ---------- | ----------------------- | ----------------------- |
| Cell Size  | Pixel size of each cell | Visibility and printing |
| Width      | Horizontal cell count   | Maze complexity         |
| Height     | Vertical cell count     | Maze complexity         |
| Draw Speed | Animation speed         | Study vs speed          |

## Next Steps

1. Try different sizes and speeds
2. Compare Wilson's algorithm with Recursive Backtracker
3. Study the patterns in generated mazes
4. Print and solve some manually!
5. Experiment with the visualization settings

## Keyboard Shortcuts (In Development)

Currently, no keyboard shortcuts. All control via mouse/buttons.

## Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE (not recommended)

Works best on modern browsers with Canvas 2D support.

---

**Have fun exploring mazes! 🎯**
