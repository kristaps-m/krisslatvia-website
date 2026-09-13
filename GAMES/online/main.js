var canvas = document.getElementById("fps_online");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const MAP_SPEED = 5;
let rayLineLength = 100;
let playerAngle = Math.PI / 3;
let playerMoveAngle = 0;
// let playerMoveSpeed = 10;
let playerMoveX = 0;
let playerMoveY = 0;

class P {
  constructor(x, y) {
    // super();
    this.x = x;
    this.y = y;
    this.lineToX = 0;
    this.lineToY = 0;
  }

  draw() {
    ctx.fillStyle = "white";
    // ctx.fillRect(this.x, this.y, 20, 20);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "#663300";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  }

  drawLine() {
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.lineToX = this.x + Math.sin(playerAngle) * rayLineLength;
    this.lineToY = this.y + Math.cos(playerAngle) * rayLineLength;
    ctx.lineTo(this.lineToX, this.lineToY);
    // ctx.lineTo(this.lineToX, this.lineToY);
    ctx.stroke();
  }
}

const pl = new P(width / 2, height / 2);

function animate() {
  ctx.clearRect(0, 0, width, height);
  /** UPDATE PLAYER POS */
  if (playerMoveAngle) {
    playerAngle += 0.05 * playerMoveAngle;
  } // 0.05 was = to 0.3 it turns fast
  let playerOffSetX = Math.sin(playerAngle) * MAP_SPEED;
  let playerOffSetY = Math.cos(playerAngle) * MAP_SPEED;
  if (playerMoveX !== 0) {
    pl.x += playerOffSetX * playerMoveX;
  }
  if (playerMoveY !== 0) {
    pl.y += playerOffSetY * playerMoveY;
  }
  pl.draw();
  pl.drawLine();
  ctx.fillText(`${dist(pl.x, pl.lineToX, pl.y, pl.lineToY)}`, 100, 30);
  requestAnimationFrame(animate);
}

animate();

// Rotate a vector (x, y) by angle in radians
function rotateVector(x, y, angle) {
  let cos = Math.cos(angle);
  let sin = Math.sin(angle);
  let nx = x * cos - y * sin;
  let ny = x * sin + y * cos;
  return { x: nx, y: ny };
}

window.addEventListener("keydown", (e) => {
  const k = e.key;
  switch (k) {
    case "a":
      playerMoveAngle = 1;
      break;
    case "d":
      playerMoveAngle = -1;
      break;
    case "s":
      playerMoveX = -1;
      playerMoveY = -1;
      break;
    case "w":
      playerMoveX = 1;
      playerMoveY = 1;
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (e) => {
  const k = e.key;
  switch (k) {
    case "a":
      playerMoveAngle = 0;
      break;
    case "d":
      playerMoveAngle = 0;
      break;
    case "w":
    case "s":
      playerMoveX = 0;
      playerMoveY = 0;
      break;
    default:
      break;
  }
});

function dist(x1, x2, y1, y2) {
  return Math.sqrt(
    Math.abs(Math.pow(x2 - x1, 2)) + Math.abs(Math.pow(y2 - y1, 2)),
  );
  // return Math.hypot(x1 - x2, y1 - y2);
}
