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

// const COLS = 40;
// const ROWS = 25;
const COLS = 10;
const ROWS = 10;
const CELL_SIZE = 20;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

// ---------- Cell ----------
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;
  }

  draw() {
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (this.walls[0]) line(x, y, x + CELL_SIZE, y);
    if (this.walls[1]) line(x + CELL_SIZE, y, x + CELL_SIZE, y + CELL_SIZE);
    if (this.walls[2]) line(x + CELL_SIZE, y + CELL_SIZE, x, y + CELL_SIZE);
    if (this.walls[3]) line(x, y + CELL_SIZE, x, y);
  }

  highlight() {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x * CELL_SIZE + 4,
      this.y * CELL_SIZE + 4,
      CELL_SIZE - 8,
      CELL_SIZE - 8
    );
  }
}

// ---------- Helpers ----------
function line(x1, y1, x2, y2) {
  ctx.fill
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function index(x, y) {
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return -1;
  return x + y * COLS;
}

function removeWalls(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  if (dx === 1) { a.walls[3] = false; b.walls[1] = false; }
  if (dx === -1) { a.walls[1] = false; b.walls[3] = false; }
  if (dy === 1) { a.walls[0] = false; b.walls[2] = false; }
  if (dy === -1) { a.walls[2] = false; b.walls[0] = false; }
}

// ---------- Maze Setup ----------
const grid = [];
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    grid.push(new Cell(x, y));
  }
}

let current = grid[0];
// let current = grid[Math.floor(Math.random() * grid.length)];
current.visited = true;
const stack = [];

// ---------- Maze Step ----------
function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  for (const cell of grid) {
    cell.draw();
  }

  current.highlight();

  // Get unvisited neighbors
  const neighbors = [];
  const top = grid[index(current.x, current.y - 1)];
  const right = grid[index(current.x + 1, current.y)];
  const bottom = grid[index(current.x, current.y + 1)];
  const left = grid[index(current.x - 1, current.y)];

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

  requestAnimationFrame(step);
}

step();

// ---------- Open Entrance and Exit ----------
const entranceCell = grid[0];
entranceCell.walls[3] = false; // open entrence wall

const exitCell = grid[index(COLS - 1, ROWS - 1)];
exitCell.walls[1] = false; // open bottom wall