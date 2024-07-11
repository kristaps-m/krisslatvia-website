var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var W = 200;
var H = 200;
// Circle
ctx.beginPath();
ctx.arc(W / 2, H / 2, 50, 0, 2 * Math.PI);
ctx.strokeStyle = "#663300";
ctx.lineWidth = 3;
ctx.stroke();

// rectangle
var c = document.getElementById("myCanvas2");
var ctx = c.getContext("2d");
var RW = 150;
var RH = 100;
ctx.beginPath();
ctx.fillStyle = "#ff00ff";
ctx.rect((W - RW) / 3, (H - RH) / 3, RW / 2, RH / 2);
ctx.lineWidth = 3;
ctx.stroke();

// fillRect
ctx.fillStyle = "blue";
ctx.fillRect(W - RW, H - RH, RW / 2, RH / 2);

// Rounded rectangle
var c = document.getElementById("myCanvas2a");
var ctx = c.getContext("2d");
var RW = 150;
var RH = 100;
ctx.beginPath();
ctx.fillStyle = "black";
ctx.roundRect((W - RW) / 2, (H - RH) / 2, RW, RH, [20]);
ctx.strokeStyle = "#ff00ff";
ctx.lineWidth = 3;
ctx.stroke();
ctx.fillStyle = "#ff00ff";
ctx.fill();

// Triangle
var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20, H - 20);
// ctx.lineTo(20, 20);
ctx.lineTo(W - 20, H - 20); // coment this out and turn on previus :)
ctx.lineTo(W - 20, 20);
ctx.fillStyle = "#aa28a3";
ctx.fill();

// Elipse
var c = document.getElementById("myCanvas4");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.ellipse(W / 2, H / 2, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
ctx.fillStyle = "#cc28a9";
ctx.fill();
ctx.stroke();

const changeNumberOfSidesInNGon = () => {
  // Pentagon
  var canvas = document.getElementById("myCanvas5");
  var cxt = canvas.getContext("2d");
  // It can be anyGon :D
  var numberOfSides = parseInt(document.getElementById("myRange")?.value),
    size = 80, // 100
    Xcenter = 100,
    Ycenter = 100,
    step = (2 * Math.PI) / numberOfSides, //Precalculate step value
    shift = (Math.PI / 180.0) * -18; //Quick fix ;)
  console.log(numberOfSides, typeof numberOfSides, canvas.width, canvas.height);
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  cxt.beginPath();
  // cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
  for (var i = 0; i <= numberOfSides; i++) {
    var curStep = i * step + shift;
    cxt.lineTo(
      Xcenter + size * Math.cos(curStep),
      Ycenter + size * Math.sin(curStep)
    );
  }
  cxt.strokeStyle = "#00cc00";
  cxt.lineWidth = 2;
  cxt.stroke();

  // change number in <p>
  let n = document.getElementById("rangeValue");
  n.textContent = numberOfSides;
};
changeNumberOfSidesInNGon();
