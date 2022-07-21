var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var W = 200
var H = 200
// Circle
ctx.beginPath();
ctx.arc(W/2, H/2, 50, 0, 2 * Math.PI);
ctx.strokeStyle='#663300'
ctx.lineWidth = 3
ctx.stroke();

// rectangle 
var c = document.getElementById("myCanvas2");
var ctx = c.getContext("2d");
var RW = 150;
var RH = 100;
ctx.beginPath();
ctx.rect((W-RW)/2,(H-RH)/2, RW, RH);
ctx.strokeStyle='#ff00ff'
ctx.lineWidth = 3
ctx.stroke();

// Triangle
var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20, H-20);
// ctx.lineTo(20, 20);
ctx.lineTo(W-20, H-20); // coment this out and turn on previus :)
ctx.lineTo(W-20, 20);
ctx.fillStyle = "#aa28a3"
ctx.fill();

// Elipse
var c = document.getElementById("myCanvas4");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.ellipse(W/2, H/2, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
ctx.fillStyle = "#cc28a9"
ctx.fill()
ctx.stroke();

// Pentagon
var canvas=document.getElementById("myCanvas5");
var cxt=canvas.getContext("2d");
// hexagon
var numberOfSides = 5,
    size = 60, // 100
    Xcenter = 100,
    Ycenter = 100,
    step  = 2 * Math.PI / numberOfSides,//Precalculate step value
    shift = (Math.PI / 180.0) * -18;//Quick fix ;)
cxt.beginPath();
// cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));  
for (var i = 0; i <= numberOfSides;i++) {
  var curStep = i * step + shift;
    cxt.lineTo (Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
}
cxt.strokeStyle = "#00cc00";
cxt.lineWidth = 2;
cxt.stroke();
  