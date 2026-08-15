const canvas = document.getElementById("hexMinesCanvas");
const ctx = canvas.getContext("2d");
const W = 600;
const H = 600;
const FIELD_W_AND_H = 10;
canvas.width = W;
canvas.height = H;

const game2Dfield = [];

class HexP {
    constructor(x,y, isMine = false, minesAround = 0){
        this.x = x;
        this.y = y;
        this.isMine = isMine;
        this.minesAround = minesAround;
        this.text = `${this.x}-${this.y}`;
    }
}

for (let row = 0; row < 10; row++) {
    const t = [];
    for (let col = 0; col < 10; col++) {
        t.push(new HexP(row, col, false));
        // t.push(`${col}-${row}`);
    }
    game2Dfield.push(t);
}

game2Dfield[3][6].isMine = true;
game2Dfield[7][7].isMine = true;
game2Dfield[5][6].isMine = true;
game2Dfield[4][5].isMine = true;

game2Dfield[2][2].isMine = true;
game2Dfield[3][7].isMine = true;
game2Dfield[4][2].isMine = true;
game2Dfield[4][7].isMine = true;
game2Dfield[7][3].isMine = true;

game2Dfield[8][0].isMine = true;
game2Dfield[9][0].isMine = true;
game2Dfield[9][1].isMine = true;
game2Dfield[8][2].isMine = true;
game2Dfield[7][1].isMine = true;
game2Dfield[7][0].isMine = true;

game2Dfield[0][8].isMine = true;
game2Dfield[1][8].isMine = true;
game2Dfield[1][9].isMine = true;


const cordinatesAroundEachHexPointEvenRow = [
    // col, row
    [0,-1], // x - y
    [1,-1],
    [1,0],
    [0,1],
    [-1,0],
    [-1,-1],
];

const cordinatesAroundEachHexPointOddRow = [
    // col, row
    [0,-1], // x - y
    [1,0],
    [1,1],
    [0,1],
    [-1,1],
    [-1,0],
];

function isInBoundries(x,y) {
    return x >= 0 && x < FIELD_W_AND_H && y >= 0 && y < FIELD_W_AND_H;
}

function countMines(x,y) {
    let n = 0;

    for (let index = 0; index < 6; index++) {
        if (x % 2 === 0) {
            const v = cordinatesAroundEachHexPointEvenRow[index];
            const realX = x + v[0];
            const realY = y + v[1];
            if (isInBoundries(realX, realY)){
                if (game2Dfield[realX][realY].isMine){
                    n++;
                }
            }
        } else {
            const v = cordinatesAroundEachHexPointOddRow[index];
            const realX = x + v[0];
            const realY = y + v[1];
            if (isInBoundries(realX, realY)){
                if (game2Dfield[realX][realY].isMine){
                    n++;
                }
            }
        }
    }

    return n;
}

function addNumberToEachHex() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (!game2Dfield[row][col].isMine) {
                // if (row > 1 && col > 1 && row < 9 && col < 9) {
                    // console.log(col, row);
                    game2Dfield[row][col].minesAround = countMines(row,col);
                // }
            }
        }
    }
}

addNumberToEachHex();

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        // COL acts as row
        // ROW acts as col 
        // do not ask why
        // or not this time some times I need to switch them.
        ctx.font = "bold 12px Comic Sans MS";
        if (row % 2 === 0) {
            ctx.fillStyle = "white";
            drawHegagon(row * 53 + 50, col * 53 + 50);
            if (game2Dfield[row][col].isMine) {
                ctx.fillRect(row * 53 + 45, col * 53 + 60, 10, 10);
            }
            // ctx.fillText(game2Dfield[row][col].text, row * 53 + 38, col * 53 + 50);
            if (game2Dfield[row][col].minesAround > 0) {
                ctx.font = "bold 18px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.fillText(game2Dfield[row][col].minesAround, row * 53 + 44, col * 53 + 70);
            }
        }
        if (row % 2 === 1) {
            ctx.fillStyle = "white";
            drawHegagon(row * 53 + 50, col * 53 + 75);
            if (game2Dfield[row][col].isMine) {
                ctx.fillRect(row * 53 + 45, col * 53 + 85, 10, 10);
            }
            // ctx.fillText(game2Dfield[row][col].text, row * 53 + 39, col * 53 + 75);
            if (game2Dfield[row][col].minesAround > 0) {
                ctx.font = "bold 18px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.fillText(game2Dfield[row][col].minesAround, row * 53 + 44, col * 53 + 95);
            }
        }
    }
}

// displayGrid({ctx:ctx, strokeStyle: "white", girdLineWidth: 1,
//   oneSquareSize: 50, canvasHeight: H, canvasWidth: W
// }) 
// drawHegagon(2 * 53 + 50, 2 * 53 + 50, true, "red");

function drawHegagon(x,y, isFill = false, fillColor = "red"){
  // Hexagon
  // It can be anyGon :D
  var numberOfSides = 6,
    size = 30,
    Xcenter = x,
    Ycenter = y,
    step = (2 * Math.PI) / numberOfSides, //Precalculate step value
    shift = (Math.PI / 180.0); //Quick fix ;)
  ctx.beginPath();
  // ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
  for (var i = 0; i <= numberOfSides; i++) {
    var curStep = i * step + shift;
    ctx.lineTo(
      Xcenter + size * Math.cos(curStep),
      Ycenter + size * Math.sin(curStep)
    );
  }
  ctx.strokeStyle = "#00cc00";
  ctx.lineWidth = 3;
  if (fillColor !== "red") {
      ctx.fillStyle = fillColor;
  }
  if (isFill) {
      ctx.fill();
  }
  ctx.stroke();
};
// drawHegagon(40, 40);

console.log(game2Dfield);