var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var W = 400
var H = 200
// Diagonal lines
ctx.moveTo(0, 0);
ctx.lineTo(W, H);
ctx.moveTo(0,H)
ctx.lineTo(W,0)
ctx.strokeStyle='#663300'
ctx.lineWidth = 3
ctx.stroke();

// Circle
ctx.beginPath();
ctx.arc(W/2, H/2, (H/2-10), 0, 2 * Math.PI);
ctx.strokeStyle='#ff0000'
ctx.lineWidth = 5
ctx.stroke();

// Canvas NR 2 !
var c = document.getElementById("myCanvas2");
var ctx = c.getContext("2d");
var W = 400
var H = 200
// Diagonal lines
ctx.moveTo(0, 0);
ctx.lineTo(W, H);
ctx.moveTo(0,H)
ctx.lineTo(W,0)
ctx.strokeStyle='#663300'
ctx.lineWidth = 3
ctx.stroke();

// Circle
ctx.beginPath();
ctx.rect(50, 50, 50, 50)
ctx.rect(100, 100, 50, 50)

ctx.strokeStyle='#ff0000'
ctx.lineWidth = 5
ctx.stroke();

// Draw the ellipse
ctx.beginPath();
ctx.ellipse(250, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
ctx.fillStyle = "#cc28a9"
ctx.fill()
ctx.stroke();

// Canvas NR 2 !
var c = document.getElementById("myCanvas3");
var ctx = c.getContext("2d");
var W = 400
var H = 200