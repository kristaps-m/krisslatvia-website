const c = document.getElementById("myCanvas4");
const ctx = c.getContext("2d");
const W = 300;
const H = 300;
const circleR = 100;
c.width = W;
c.height = H;

ctx.fillStyle = "red";
ctx.fillRect(10, 10, 10, 10);

function circle(ctx, w, h) {
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, circleR, 0, 2 * Math.PI);
  ctx.strokeStyle = "#663300";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawCenter() {
  // Circle
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 4, 0, 2 * Math.PI);
  // ctx.strokeStyle = "pink";
  // ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "darkpink";
  ctx.fill();
}

function notFullCircle(ctx, w, h, x, r) {
  ctx.beginPath();
  ctx.arc(x, h / 2, r, 0.5 * Math.PI, 1.5 * Math.PI);
  ctx.strokeStyle = "#026600";
  ctx.lineWidth = 2;
  ctx.stroke();
}

class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.l = null;
  }

  draw(ctx, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(w / 2 + r, h / 2); // x1; y1
    ctx.lineTo(this.x, this.y); // x2; y2
    // ctx.lineTo(w / 2, h / 2);
    // ctx.strokeStyle =
    ctx.stroke();

    // l = Math.sqrt((x1 - x2)^2 - (y1 - y2)^2)
    this.l = round(distanceBetween2Points(w / 2 + r, h / 2, this.x, this.y));
  }

  showLineLen(ctx) {
    ctx.font = `italic bold 15px Comic Sans MS`;
    ctx.fillStyle = "red";
    ctx.fillText(`r: ${this.l}`, this.x + 3, this.y - 3);
  }
}

function round(n) {
  return Math.round(n * 100) / 100;
}
const l = new Line();

function animation() {
  ctx.clearRect(0, 0, W, H);
  l.draw(ctx, W, H, circleR);
  circle(ctx, W, H);
  // const
  notFullCircle(ctx, W, H, l.x + l.l, l.l);
  drawCenter();
  l.showLineLen(ctx);
  SolutionByCalculatingLensArea(ctx, W, H, l.x + l.l, H / 2, l.l, circleR); // (ctx, w, h, x2, y2, r, R = 100)
  halfCircleArea(ctx, circleR);
  requestAnimationFrame(animation);
}

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  const k = e.key;
  if (k === "ArrowLeft") {
    l.x -= 0.1;
  } else if (k === "ArrowRight") {
    l.x += 0.1;
  }
});

animation();

window.addEventListener("mousemove", (e) => {
  const rect = c.getBoundingClientRect();

  // let xHor = event.pageX - elemLeft; // Horizontal Canvas Axis
  // let yVert = event.pageY - elemTop  - 74; // Vertical Canvas Axis
  // Calculate the click position relative to the canvas
  let mX = (e.clientX - rect.left) * (c.width / rect.width); // Normalize x
  let mY = (e.clientY - rect.top) * (c.height / rect.height); // Normalize y

  // const mX = e.movementX;
  // const mY = e.movementY;
  l.x = mX;
  l.y = mY;
});

function distanceBetween2Points(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function SolutionByCalculatingLensArea(ctx, w, h, x2, y2, r, R = 100) {
  /*
  The area A of a lens with two circles of radii R,r and distance between centers d
 is...
  */
  const d = round(distanceBetween2Points(w / 2, h / 2, x2, y2));
  // const R = R;
  // const r = r;
  const ac1result = (d * d + r * r - R * R) / (2 * d * r);
  const ac2result = (d * d - r * r + R * R) / (2 * d * R);
  const sencondPart =
    0.5 * Math.sqrt((d + r - R) * (d - r + R) * (-d + r + R) * (d + r + R));
  const A =
    Math.pow(r, 2) * Math.acos(ac1result) +
    R * R * Math.acos(ac2result) -
    sencondPart;
  // console.log(W, H, x2, y2, r, R);
  ctx.font = `italic bold 15px Comic Sans MS`;
  ctx.fillStyle = "blue";
  ctx.fillText(`Goat ate: ${round(A)}`, 5, 15);
}

function halfCircleArea(ctx, R) {
  const A = (Math.PI * R * R) / 2;

  ctx.font = `italic bold 15px Comic Sans MS`;
  ctx.fillStyle = "black";
  ctx.fillText(`1/2 A = ${round(A)}`, 5, 30);
}
