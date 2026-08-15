const canvas = document.getElementById("hexMinesCanvas");
const ctx = canvas.getContext("2d");
const W = 600;
const H = 600;
canvas.width = W;
canvas.height = H;

const game2Dfield = [];

for (let row = 0; row < 10; row++) {
    const t = [];
    for (let col = 0; col < 10; col++) {
        t.push(`${col}-${row}`);
    }
    game2Dfield.push(t);
}

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        // if (row === 5 && col === 5) {
        //     ctx.fillStyle = "red";
        //     ctx.fillRect(row * 50, col * 50, 50, 50);
        // }
        // COL acts as row
        // ROW acts as col 
        // do not ask why
        ctx.font = "bold 18px Comic Sans MS";
        ctx.fillStyle = "white";
        if (row % 2 === 0) {
            drawHegagon(row * 53 + 50, col * 53 + 50);
            ctx.fillText(game2Dfield[row][col], row * 53 + 34, col * 53 + 55);
        }
        if (row % 2 === 1) {
            drawHegagon(row * 53 + 50, col * 53 + 75);
            ctx.fillText(game2Dfield[row][col], row * 53 + 34, col * 53 + 80);
        }
        // ctx.textAlign = "center";
        // ctx.fillStyle = "white";
        // ctx.fillText(game2Dfield[row][col], row * 53 + 34, col * 53 + 55);
    }
}

// displayGrid({ctx:ctx, strokeStyle: "white", girdLineWidth: 1,
//   oneSquareSize: 50, canvasHeight: H, canvasWidth: W
// }) 

function drawHegagon(x,y){
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
  ctx.stroke();
};
// drawHegagon(40, 40);