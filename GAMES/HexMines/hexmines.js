const canvas = document.getElementById("hexMinesCanvas");
const ctx = canvas.getContext("2d");
const W = 600;
const H = 600;
const FIELD_W_AND_H = 10;
const NUM_OF_MINES = 14;
canvas.width = W;
canvas.height = H;

const game2Dfield = [];

class HexP {
    constructor(x,y, isMine = false, minesAround = 0){
        this.x = x;
        this.y = y;
        this.isMine = isMine;
        this.minesAround = minesAround;
        this.isOpen = false;
        this.isFlaged = false;
        this.text = `${this.x}-${this.y}`;
    }
}

window.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();

  // let xHor = event.pageX - elemLeft; // Horizontal Canvas Axis
  // let yVert = event.pageY - elemTop  - 74; // Vertical Canvas Axis
  // Calculate the click position relative to the canvas
  let xHor = (event.clientX - 0 - rect.left) * (W / rect.width); // Normalize x // Add 20 cuz hexagon does not start right from top
  let yVert = (event.clientY - 0 - rect.top) * (H / rect.height); // Normalize y
  let rowIndxClick = Math.floor(xHor / (W / FIELD_W_AND_H));
  let colIndxClick = Math.floor(yVert / (H / FIELD_W_AND_H));

//   console.log(xHor, yVert, rowIndxClick, colIndxClick);

    for (let row = 0; row < game2Dfield.length; row++) {

        for (let col = 0; col < game2Dfield[row].length; col++) {

            const hex = game2Dfield[row][col];
            // console.log(hex);

            let hexX = hex.x * 53 + 50;
            let hexY = hex.y * 53 + 50;

            if (hex.x % 2 === 1) {
                hexY += 25;
            }

            const vertices = getHexagonVertices(
                hexX,
                hexY
            );

            if (isPointInHexagon(xHor, yVert, vertices)) {

                hex.isOpen = true;

                console.log(
                    `Clicked hexagon: ${hex.x}-${hex.y}`
                );

                // console.log(game2Dfield);
                return;
            }
        }
    }
})

/**
 * Generate 2D grid with 2D array and HexP as each point.
 */
for (let row = 0; row < FIELD_W_AND_H; row++) {
    const t = [];
    for (let col = 0; col < FIELD_W_AND_H; col++) {
        t.push(new HexP(row, col, false));
        // t.push(`${col}-${row}`);
    }
    game2Dfield.push(t);
}

function generateRandomMineCordinates() {
    let randomCorinates = [];

    for (let row = 0; row < FIELD_W_AND_H; row++) {
        for (let col = 0; col < FIELD_W_AND_H; col++) {
            randomCorinates.push({'row': row, 'col': col});
        }
    }

    randomCorinates = shuffle(randomCorinates);
    randomCorinates = randomCorinates.slice(0, NUM_OF_MINES);

    return randomCorinates;
}

function addMinesInRandomPlaces() {
    const arr = generateRandomMineCordinates();

    arr.forEach((v) => {
        game2Dfield[v.row][v.col].isMine = true;
    })
}


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

function isInBoundriesOfOuterWalls(x,y) {
    return x >= 0 && x < FIELD_W_AND_H && y >= 0 && y < FIELD_W_AND_H;
}

function countMines(x,y) {
    let n = 0;

    for (let index = 0; index < 6; index++) {
        if (x % 2 === 0) {
            const v = cordinatesAroundEachHexPointEvenRow[index];
            const realX = x + v[0];
            const realY = y + v[1];
            if (isInBoundriesOfOuterWalls(realX, realY)){
                if (game2Dfield[realX][realY].isMine){
                    n++;
                }
            }
        } else {
            const v = cordinatesAroundEachHexPointOddRow[index];
            const realX = x + v[0];
            const realY = y + v[1];
            if (isInBoundriesOfOuterWalls(realX, realY)){
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

addMinesInRandomPlaces();
addNumberToEachHex();

/**
 * DRAW Hexagon grid
 */
for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        // COL acts as row
        // ROW acts as col 
        // do not ask why
        // or not this time some times I need to switch them.
        const hex = game2Dfield[row][col];
        const position = getHexagonPosition(row, col);
        ctx.font = "bold 12px Comic Sans MS";
        drawHegagon(position.x, position.y);

        if (hex.isMine) {
            ctx.fillRect(
                position.x - 5,
                position.y + 10,
                10,
                10
            );
        }
        // ctx.fillStyle = "white";
        // ctx.fillText(
        //     hex.text,
        //     position.x - 12,
        //     position.y
        // );

        if (hex.minesAround > 0) {
            ctx.font = "bold 18px Comic Sans MS";
            ctx.fillStyle = "red";

            ctx.fillText(
                hex.minesAround,
                position.x - 6,
                position.y + 20
            );
        }
        // if (row % 2 === 0) {
        //     ctx.fillStyle = "white";
        //     drawHegagon(row * 53 + 50, col * 53 + 50);
        //     // ctx.beginPath();
        //     // ctx.rect(row  * 53 + 25, col * 53 + 25, 40, 40);
        //     // ctx.stroke();
        //     if (game2Dfield[row][col].isMine) {
        //         ctx.fillRect(row * 53 + 45, col * 53 + 60, 10, 10);
        //     }
        //     ctx.fillText(game2Dfield[row][col].text, row * 53 + 38, col * 53 + 50);
        //     if (game2Dfield[row][col].minesAround > 0) {
        //         ctx.font = "bold 18px Comic Sans MS";
        //         ctx.fillStyle = "red";
        //         ctx.fillText(game2Dfield[row][col].minesAround, row * 53 + 44, col * 53 + 70);
        //     }
        // }
        // if (row % 2 === 1) {
        //     ctx.fillStyle = "white";
        //     drawHegagon(row * 53 + 50, col * 53 + 75);
        //     // DRAW MINE AS SQUARE
        //     if (game2Dfield[row][col].isMine) {
        //         ctx.fillRect(row * 53 + 45, col * 53 + 85, 10, 10);
        //     }
        //     ctx.fillText(game2Dfield[row][col].text, row * 53 + 39, col * 53 + 75);
        //     if (game2Dfield[row][col].minesAround > 0) {
        //         ctx.font = "bold 18px Comic Sans MS";
        //         ctx.fillStyle = "red";
        //         ctx.fillText(game2Dfield[row][col].minesAround, row * 53 + 44, col * 53 + 95);
        //     }
        // }
    }
}

function drawHegagon(x,y, isFill = false, fillColor = "red"){
  // Hexagon
  var numberOfSides = 6,
    size = 32,
    Xcenter = x,
    Ycenter = y,
    step = (2 * Math.PI) / numberOfSides, //Precalculate step value
    shift = 0; //Quick fix ;)
    // shift = (Math.PI / 180.0); //Quick fix ;)
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

// Source - https://stackoverflow.com/a/2450976
// Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-16, License - CC BY-SA 4.0

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// https://chatgpt.com/c/6a81dd10-751c-83ed-97a1-abfd11551d87
function getHexagonVertices(centerX, centerY) {

    const numberOfSides = 6;
    const size = 32;
    const step = (2 * Math.PI) / numberOfSides;
    const shift = Math.PI / 180.0;

    const vertices = [];

    for (let i = 0; i < numberOfSides; i++) {

        const curStep = i * step + shift;

        vertices.push({
            x: centerX + size * Math.cos(curStep),
            y: centerY + size * Math.sin(curStep)
        });
    }

    return vertices;
}

// https://chatgpt.com/c/6a81dd10-751c-83ed-97a1-abfd11551d87
function isPointInHexagon(pointX, pointY, vertices) {

    let inside = false;

    for (let i = 0, j = vertices.length - 1;
         i < vertices.length;
         j = i++) {

        const xi = vertices[i].x;
        const yi = vertices[i].y;

        const xj = vertices[j].x;
        const yj = vertices[j].y;

        const intersects =
            ((yi > pointY) !== (yj > pointY)) &&
            (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);

        if (intersects) {
            inside = !inside;
        }
    }

    return inside;
}

// https://chatgpt.com/c/6a81dd10-751c-83ed-97a1-abfd11551d87
function getHexagonPosition(row, col) {

    const x = row * 53 + 50;

    let y = col * 53 + 50;

    if (row % 2 === 1) {
        y += 25;
    }

    return {
        x: x,
        y: y
    };
}