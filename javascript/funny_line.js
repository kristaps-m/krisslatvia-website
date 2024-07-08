// MY Canvas2 Cordinates
var c = document.getElementById("myCanvas2");
var ctx3 = c.getContext("2d");
var w = 800;
var h = 800;
// Y axis
ctx3.beginPath();
ctx3.strokeStyle ="#000000";
ctx3.lineWidth = "1";
ctx3.moveTo(w/2,0);
ctx3.lineTo(w/2,w);
ctx3.stroke();
// X axis
ctx3.beginPath();
ctx3.strokeStyle ="#000000";
ctx3.lineWidth = "1";
ctx3.moveTo(0,h/2);
ctx3.lineTo(w,h/2);
ctx3.stroke();
ctx3.closePath();

//----
var canvas=document.getElementById("myCanvas2");
var ctx=canvas.getContext("2d");
ctx.strokeStyle ="#000000";
ctx.lineWidth = "2";

var startX=0;
var startY=0;
var endX=50;
var endY=50;
var $startX=document.getElementById('sx');
var $startY=document.getElementById('sy');
var $endX=document.getElementById('ex');
var $endY=document.getElementById('ey');

$startX.value=startX;
$startY.value=startY;
$endX.value=endX;
$endY.value=endY;

draw();
draw2()

$startX.addEventListener("keyup", function(){
    startX=this.value;
    draw();
    draw2()
}, false);

$startY.addEventListener("keyup", function(){
    startY=this.value;
    draw();
    draw2()
}, false);

$endX.addEventListener("keyup", function(){
    endX=this.value;
    draw();
    draw2()
}, false);

$endY.addEventListener("keyup", function(){
    endY=this.value;
    draw();
    draw2()
}, false);
//-----------------
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(startX,startY,Math.abs(endX-startX),Math.abs(endY-startY));
}

function draw2(){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    // ctx.lineTo(endX+startX, endY+startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle ="#ffffff"
    ctx.stroke();
    console.log(startX, startY, endX, endY);
}