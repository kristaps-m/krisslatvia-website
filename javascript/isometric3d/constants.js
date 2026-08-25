const c = document.getElementById("myCanvas5");
const ctx = c.getContext("2d");
const W = 800;
const H = 800;
const ARRAY_W = 15;
const ARRAY_H = 10;
const RECT_EDGE_SIZE = 25;
const HALF_E_SIZE = RECT_EDGE_SIZE / 2;
// const HEX_SIZE = 20;
const GRID_OFF_SET_TO_CENTRE = 100;
const ISOMETRIC_ARRAY_OF_SET = {x:3, y:4};
const ISOMETRIC_ACTION = {"casual": true, "snake": false};


// Cell class for grid-based isActive system
// Snake game uses [row, col] coordinates instead of pixel coordinates
class Cell {
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.isActive = false;
        this.isFood = false;  // Used to visually distinguish food from snake body
        this.canvasX = 0;
        this.canvasY = 0;
    }
}