# Wilson's Algorithm - Visual Flow & Diagrams

## Algorithm Flowchart

```
┌─────────────────────────────────────────┐
│ START: Initialize Maze                  │
│ - Create grid of cells                  │
│ - Mark first cell as visited (BLUE)    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ All cells visited?                      │
│ (Count visited = ROWS × COLS)          │
└────────┬───────────────────────┬────────┘
         │ YES                   │ NO
         │                       ▼
         │         ┌─────────────────────────────────┐
         │         │ Pick random UNVISITED cell      │
         │         │ Start new WALK (Yellow)         │
         │         └────────────┬────────────────────┘
         │                      │
         │                      ▼
         │         ┌─────────────────────────────────┐
         │         │ Current walk has UNVISITED      │
         │         │ neighbors?                      │
         │         └────────┬───────────────┬────────┘
         │                  │ YES           │ NO
         │                  ▼               ▼
         │      ┌──────────────────┐    ┌────────────────────────┐
         │      │ Pick random      │    │ Walk has VISITED       │
         │      │ neighbor         │    │ neighbors? (Blue)      │
         │      │                  │    └────┬───────────┬───────┘
         │      │ Create loop?     │        │ YES       │ NO
         │      └──┬────────────┬──┘        │           │
         │         │ YES    │ NO        ▼           ▼
         │         │        │    ┌──────────┐  ┌─────────┐
         │         ▼        │    │ Carve    │  │ No path │
         │      ┌──────┐    │    │ maze &   │  │ found   │
         │      │ Erase│    │    │ mark as  │  │ (skip)  │
         │      │ loop │    │    │ visited  │  └─────────┘
         │      └──────┘    │    │ (Blue)   │
         │         │        │    │ Connect  │
         │         │        └────│ to maze  │
         │         │             └────┬────┘
         │         └──────┬───────────┘
         │                ▼
         │      ┌──────────────────┐
         │      │ Reset walk for   │
         │      │ next iteration   │
         │      └────────┬─────────┘
         │               │
         └───────────────┴──────────────────────────┘
                         │
                         ▼
                    ┌────────────┐
                    │ COMPLETE   │
                    │ Perfect    │
                    │ Maze!      │
                    └────────────┘
```

## Grid State Progression

### Step 1: Initialization

```
Initial 5×5 grid (█ = visited, · = unvisited)

█ · · · ·
· · · · ·
· · · · ·
· · · · ·
· · · · ·
```

### Step 2-5: First Random Walk

```
█ ▪ ▪ ▪ ·     Walk path in yellow (▪)
· · · ▪ ·     Moving randomly through unvisited cells
· · ▪ ▪ ·
· · · · ·
· · · · ·
```

### Step 6: Walk Reaches Visited Cell

```
█ . . . ·     Walk path carved (·)
. . . . ·     Walls removed between cells
. . . . ·
. . . . ·
· · · · ·
```

### Step 7-10: Continue with New Walks

```
█ . . . ·
. . . . ·
. . █ ▪ ·     New random walk in progress
. ▪ ▪ ▪ ·
· · · · ·
```

### Final: Complete Maze

```
█—·—·—·—·
|·|·|·|·|
·—·—█—·—·
·|·|·|·|·
·—·—·—·—·
```

Where:

- `█` = Starting point (entrance)
- `—` = Horizontal wall
- `|` = Vertical wall
- `·` = Open passage
- Space = Cell interior

## Color Coding in Visualization

```
┌─────────────────────────────────────────┐
│         Maze Visualization              │
├─────────────────────────────────────────┤
│                                         │
│  Light Blue Box: ███  = Visited cells   │
│                                         │
│  Yellow Box:     ███  = Current walk    │
│                                         │
│  Black Lines:    ─── = Walls            │
│                                         │
│  Gray Box:       ███  = Unvisited       │
│                                         │
└─────────────────────────────────────────┘
```

## Loop Erasure Example

### Scenario: Random Walk Creates Loop

```
Step A: Build walk
┌─┬─┬─┐
│ │A│ │
├─┼─┼─┤
│C│B│ │   Walk: A → B → C → D → E → F → B
│ └─┘ │   (F points to B, creating loop!)
├─┬─┬─┤
│E│F│D│
└─┴─┴─┘

Current walk array: [A, B, C, D, E, F, B, G, H, ...]
                                    ↑ duplicate B found!
```

### Loop Detection

```javascript
// Find index of duplicate cell
const loopIndex = walk.findIndex((cell) => cell.x === nextCell.x && cell.y === nextCell.y);
// loopIndex = 1 (position of B)
```

### Loop Erasure

```
Step B: Erase loop
┌─┬─┬─┐
│ │A│ │
├─┼─┼─┤
│ │ │ │   Walk after loop erasure: [A, B]
│ │ │ │
├─┬─┬─┤
│ │ │ │
└─┴─┴─┘

// Execute: walk = walk.slice(0, loopIndex + 1)
// walk = [A, B]  (keep everything up to and including first B)
```

### Result

```javascript
// Continue from the loop point (B)
// Instead of: A → B → C → D → E → F → B → ...
// Now: A → B → [new random neighbor of B]
```

**Why this matters:**

- Prevents wasting time going in circles
- Ensures progress through the maze
- Creates the "uniform distribution" property

## Neighbor Finding Logic

### Unvisited Neighbors (for walk exploration)

```
Given cell at (2, 2):

  (2,1)
    ↑ TOP
    |
(1,2)←(2,2)→(3,2)  LEFT / CENTER / RIGHT
    |
    ↓ BOTTOM
  (2,3)

Filter:
- Must be within grid bounds (0 ≤ x < COLS, 0 ≤ y < ROWS)
- Must NOT be in current walk
- May or may not be visited
- Result: Cells to explore next
```

### Visited Neighbors (for maze connection)

```
Given cell at (2, 2):

Same 4-directional check:
- Must be within grid bounds
- Must NOT be in current walk
- Must be VISITED (already in maze)
- Result: Valid connection points
```

## Performance: Growth Over Time

```
Cells Processed vs Time
│
│    ╱╱
│   ╱╱╱
│  ╱╱╱╱
│ ╱╱╱╱╱
│╱╱╱╱╱╱
│
└──────────────────────────→ Time

Note: Not linear - random walks mean variable generation time
      Each new walk takes longer as fewer unvisited cells remain
```

## Space Complexity Visualization

For a 5×5 grid (25 cells):

```
Data Structures Storage:

Grid Cells:           [████████████████████░░]  25 Cell objects
Visited Array:        [████░░░░░░░░░░░░░░░░░░]  ~25 Cell references
Current Walk:         [████░░░░░░░░░░░░░░░░░░]  ~5-20 Cell references

Total: O(n) where n = ROWS × COLS
Typical for 10×10: ~100 cells + pointers
```

## Comparison: Algorithm Characteristics

### Recursive Backtracking

```
Depth-First with Stack:

Start: A
├─ B (visited)
│  ├─ C (visited)
│  │  ├─ D (visited)
│  │  └─ E (visited)
│  └─ F (visited)
└─ G (visited)

Result: Deep, narrow corridors
```

### Wilson's Algorithm

```
Random Walks with Reconnection:

Start: A
├─ Random walk 1: B → C → D → E → (connects to A)
├─ Random walk 2: F → G → (connects to D)
└─ Random walk 3: H → I → J → (connects to F)

Result: More organic, varied paths
```

## Animation Frame Sequence

```
Frame 1:
┌─────────────┐
│ █           │  Initialize
│             │
└─────────────┘

Frame 5:
┌─────────────┐
│ █ ░ ░       │  Walk in progress
│   ░         │  (yellow cells)
└─────────────┘

Frame 10:
┌─────────────┐
│ █ · · ░ ░   │  Some connected,
│   · ░ ░     │  new walk starting
└─────────────┘

Frame 15:
┌─────────────┐
│ █ · · · · · │  Most cells visited,
│ · · · · · · │  maze nearly complete
└─────────────┘

Frame 20:
┌─────────────┐
│ █ ─ ─ ─ ─ · │  COMPLETE!
│ | | | | | · │  Perfect maze
└─────────────┘
```

## Parameters Impact Visualization

### Cell Size Effect

```
Cell Size = 5     Cell Size = 20
┌─┬─┬─┬─┬─┐     ┌───────────────────┐
├─┼─┼─┼─┼─┤     │                   │
├─┼─┼─┼─┼─┤     │    Fewer but      │
├─┼─┼─┼─┼─┤     │    bigger cells   │
├─┼─┼─┼─┼─┤     │                   │
└─┴─┴─┴─┴─┘     └───────────────────┘
More detail      Easier to see
```

### Draw Speed Effect

```
Speed = 10        Speed = 1000
Generate slow     Generate fast
Watch algorithm   See result immediately
Understand logic  Maze appears instantly
```

## Decision Tree: Algorithm Selection

```
START: User opens page
│
├─ Select Algorithm
│  ├─ "Recursive Backtracker" → Show solver button
│  └─ "Wilson's Algorithm" → Hide solver button
│
├─ Set Parameters
│  ├─ Cell Size (all algorithms)
│  ├─ Maze Width (all algorithms)
│  ├─ Maze Height (all algorithms)
│  └─ Draw Speed (all algorithms)
│
├─ Generate
│  ├─ Recursive: Use stack-based DFS
│  └─ Wilson's: Use random walk with loop erasure
│
└─ Display
   ├─ Draw cells on canvas
   ├─ Show walls
   └─ Animate generation process
```

---

This visualization suite helps understand both the theoretical algorithm and its practical implementation in the maze generator!
