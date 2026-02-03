/*
OneLoneCoder.com - Recursive Backtracker Maze Algorithm
"Get lost..." - @Javidx9

License
~~~~~~~
Copyright (C) 2018  Javidx9
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it
under certain conditions; See license for details. 
Original works located at:
https://www.github.com/onelonecoder
https://www.onelonecoder.com
https://www.youtube.com/javidx9

GNU GPLv3
https://github.com/OneLoneCoder/videos/blob/master/LICENSE

From Javidx9 :)
~~~~~~~~~~~~~~~
Hello! Ultimately I don't care what you use this for. It's intended to be 
educational, and perhaps to the oddly minded - a little bit of fun. 
Please hack this, change it and use it in any way you see fit. You acknowledge 
that I am not responsible for anything bad that happens as a result of 
your actions. However this code is protected by GNU GPLv3, see the license in the
github repo. This means you must attribute me if you use it. You can view this
license here: https://github.com/OneLoneCoder/videos/blob/master/LICENSE
Cheers!

Background
~~~~~~~~~~
I really like perfect algorithms. This one shows how to generate a maze that guarantees
all cells can reach all other cells, it just may take some time to get there. I introduce
stacks, and show how the algorithm generates the maze visually.

Author
~~~~~~
Twitter: @javidx9
Blog: www.onelonecoder.com

Video:
~~~~~~
https://youtu.be/Y37-gB83HKE

Last Updated: 10/07/2017
*/
// Original code by Javidx9 using C++
// This is a JavaScript adaptation. Translated by ChatGPT and edited by krisslatvia

const canvas = document.getElementById("mazeGenCanvas");
const ctx = canvas.getContext("2d");

// let COLS = parseInt(document.getElementById("mazeWidth")) && 10;
// let ROWS = parseInt(document.getElementById("mazeHeight")) && 10;
// console.log(COLS, ROWS);
let COLS = 10;
let ROWS = 10;
let CELL_SIZE = parseInt(document.getElementById("cellSize").value);

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;
let isRecursiveBacktrackerSelected = true;
// ------ Maze generator draw speed control ------
let lastTime = 0;
let delay = 1; // ms between steps (increase = slower)
let stepsPerFrame = 10; // increase to speed up generation
// ------ Solution path drawing ------
let solutionPath = null;
let mazeFinished = false;

// ---------- Cell ----------
class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;
    // Wilson's algorithm
    this.inMaze = false;
    // Solver-related
    this.parent = null;
    this.solved = false;
    this.cellSize = cellSize;
  }

  draw() {
    const x = this.x * this.cellSize;
    const y = this.y * this.cellSize;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    if (this.walls[0]) line(x, y, x + this.cellSize, y);
    if (this.walls[1])
      line(x + this.cellSize, y, x + this.cellSize, y + this.cellSize);
    if (this.walls[2])
      line(x + this.cellSize, y + this.cellSize, x, y + this.cellSize);
    if (this.walls[3]) line(x, y + this.cellSize, x, y);

    if (!this.visited) {
      ctx.fillStyle = "lightgray";
      ctx.fillRect(x + 4, y + 4, this.cellSize - 8, this.cellSize - 8);
    }
  }

  highlight() {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x * this.cellSize + 4,
      this.y * this.cellSize + 4,
      this.cellSize - 8,
      this.cellSize - 8,
    );
  }
}

// ---------- Helpers ----------
function mazeDrawSpeed() {
  const s = document.getElementById("mazeDrawSpeed").value;
  stepsPerFrame = s;
  document.getElementById("mazeDrawSpeedLabel").textContent =
    `Maze draw speed: ${s}`;
}

function line(x1, y1, x2, y2) {
  ctx.fill;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function index(x, y, rows = 10, cols = 10) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
  return x + y * cols;
}

function index2dimensions(x, y, rows = 10, cols = 10) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
  return { x: x, y: y };
}

function removeWalls(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  if (dx === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  if (dx === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (dy === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  if (dy === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function getReachableNeighbors(cell, rows, cols) {
  const neighbors = [];
  const { x, y } = cell;

  // top
  if (!cell.walls[0]) neighbors.push(grid[index(x, y - 1, rows, cols)]);
  // right
  if (!cell.walls[1]) neighbors.push(grid[index(x + 1, y, rows, cols)]);
  // bottom
  if (!cell.walls[2]) neighbors.push(grid[index(x, y + 1, rows, cols)]);
  // left
  if (!cell.walls[3]) neighbors.push(grid[index(x - 1, y, rows, cols)]);

  return neighbors.filter(Boolean);
}

// ---------- Maze Solver (BFS) ----------
function solveMaze(rows, cols) {
  const start = grid[0];
  const end = grid[index(cols - 1, rows - 1, rows, cols)];

  // Reset solver state
  for (const cell of grid) {
    cell.solved = false;
    cell.parent = null;
  }

  const queue = [];
  start.solved = true;
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === end) break;

    for (const neighbor of getReachableNeighbors(current, rows, cols)) {
      if (!neighbor.solved) {
        neighbor.solved = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  // Reconstruct path
  const path = [];
  let cur = end;
  while (cur) {
    path.push(cur);
    cur = cur.parent;
  }

  return path.reverse();
}

// ---------- Maze Setup ----------
let grid = [];
function setUpMaze(r = 10, c = 10, cs) {
  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      grid.push(new Cell(x, y, cs));
    }
  }
}

setUpMaze(ROWS, COLS, CELL_SIZE);

let current = grid[0];
current.visited = true;
let stack = [];

// ---------- Draw Path ----------
function drawPath(path, cellSize = 20) {
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 3;
  ctx.beginPath();

  for (let i = 0; i < path.length; i++) {
    const c = path[i];
    const cx = c.x * cellSize + cellSize / 2;
    const cy = c.y * cellSize + cellSize / 2;

    if (i === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  }

  ctx.stroke();
}

// ---------- Maze Step ----------
function step(time, rows, cols, cellSize) {
  // console.log(time, rows, cols, cellSize);
  // for some reason they become undefined. So lets get them from browser;
  rows = parseInt(document.getElementById("mazeHeight").value);
  cols = parseInt(document.getElementById("mazeWidth").value);
  if (isRecursiveBacktrackerSelected) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw grid
    for (const cell of grid) {
      cell.draw();
    }
    current.highlight();

    if (time - lastTime > delay) {
      for (let i = 0; i < stepsPerFrame; i++) {
        // generateMazeStep();
        // Get unvisited neighbors
        const neighbors = [];
        const top = grid[index(current.x, current.y - 1, rows, cols)];
        const right = grid[index(current.x + 1, current.y, rows, cols)];
        const bottom = grid[index(current.x, current.y + 1, rows, cols)];
        const left = grid[index(current.x - 1, current.y, rows, cols)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
          const next = neighbors[Math.floor(Math.random() * neighbors.length)];
          next.visited = true;

          stack.push(current);
          removeWalls(current, next);
          current = next;
        } else if (stack.length > 0) {
          current = stack.pop();
        }
        lastTime = time;
      }
    }

    if (!mazeFinished && stack.length === 0) {
      mazeFinished = true;
    }
    if (solutionPath) {
      let cellSize = parseInt(document.getElementById("cellSize").value);

      drawPath(solutionPath, cellSize);
    }
  }
  requestAnimationFrame(step);
}

step();

function newRecursiveMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ROWS = parseInt(document.getElementById("mazeHeight").value);
  COLS = parseInt(document.getElementById("mazeWidth").value);
  let cellSize = parseInt(document.getElementById("cellSize").value);
  canvas.width = COLS * cellSize;
  canvas.height = ROWS * cellSize;
  solutionPath = null;
  grid = [];
  stack = [];
  setUpMaze(ROWS, COLS, cellSize);
  current = grid[0];
  current.visited = true;
  step(0, ROWS, COLS, cellSize);
  openDoors(ROWS, COLS);
}

function openDoors(rows, cols) {
  // ---------- Open Entrance and Exit ----------
  const entranceCell = grid[0];
  entranceCell.walls[3] = false; // open entrence wall

  const exitCell = grid[index(cols - 1, rows - 1, rows, cols)];
  exitCell.walls[1] = false; // open bottom wall
}

openDoors(ROWS, COLS);
document.getElementById("solveBtnRecursive_1").addEventListener("click", () => {
  if (!mazeFinished) return;

  let cellSize = parseInt(document.getElementById("cellSize").value);
  ROWS = parseInt(document.getElementById("mazeHeight").value);
  COLS = parseInt(document.getElementById("mazeWidth").value);
  solutionPath = solveMaze(ROWS, COLS);

  const path = solveMaze(ROWS, COLS);
  // console.log(path);
  drawPath(path, cellSize);
});
