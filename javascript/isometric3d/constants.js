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


class Cell {
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.isActive = false;
        this.canvasX = 0;
        this.canvasY = 0;
    }
}

class SnakeCell extends Cell{
    constructor(x,y, row, col) {
        super(row,col);
        this.x = x;
        this.y = y;
    }

    draw(thisCtx, c1 = 'darkgray', c2 = "gray"){
        thisCtx.fillStyle = c1;
        thisCtx.fillRect(this.x, this.y, RECT_EDGE_SIZE, RECT_EDGE_SIZE)
        thisCtx.fillStyle = c2;
        thisCtx.fillRect(this.x+2, this.y+2, RECT_EDGE_SIZE-2*2, RECT_EDGE_SIZE-2*2);
    }

    update(thisCtx){
        switch (direction) {
            case 'right':
                this.x += RECT_EDGE_SIZE;                        
                break;
            case 'left':
                this.x -= RECT_EDGE_SIZE;
                break;
            case 'down':
                this.y += RECT_EDGE_SIZE;                        
                break;
            case 'up':
                this.y -= RECT_EDGE_SIZE;                        
                break;                
            default:
                break;
        }

        if (this.x < 0 - RECT_EDGE_SIZE || this.x > W - RECT_EDGE_SIZE || this.y < 0 || this.y > H - RECT_EDGE_SIZE) {
            isGameOver = true; document.getElementById("theTitle").textContent = "Da Snake - GAME OVER! - run in wall.";                    
        }
    }
}

let tail = [];