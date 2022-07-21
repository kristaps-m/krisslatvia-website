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

function ch_color(){
  ctx.strokeStyle='#0000ff'
  ctx.lineWidth = 6
  ctx.stroke();
}

function ch_color2(){
  ctx.strokeStyle="#d6dada"
  ctx.lineWidth = 7
  ctx.stroke();
  ctx.strokeStyle='#663300'
  ctx.lineWidth = 3
  ctx.stroke();
}


// Pentagon
function make_pentagon(){
  var canvas=document.getElementById("myCanvas");
  var cxt2=canvas.getContext("2d");
  // hexagon
  var numberOfSides = 5,
      size = 60, // 100
      Xcenter = 300,
      Ycenter = 100,
      step  = 2 * Math.PI / numberOfSides,//Precalculate step value
      shift = (Math.PI / 180.0) * -18;//Quick fix ;)
  cxt2.closePath();
  cxt2.beginPath();
  // cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));  
  for (var i = 0; i <= numberOfSides;i++) {
    var curStep = i * step + shift;
      cxt2.lineTo (Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
  }
  cxt2.strokeStyle = "#00cc00";
  cxt2.lineWidth = 2;
  cxt2.stroke();
}

// Color all?
function color_all(){
  // cxt2.strokeStyle = "#ff0000";
  // cxt2.stroke();
  ctx.strokeStyle='#ff0000';  
  ctx.stroke();

}