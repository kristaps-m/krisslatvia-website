const c = document.getElementById("myCanvas5");
const ctx = c.getContext("2d");
const W = 500;
const H = 500;
const R_MULTIPLIER = 2;
c.width = W;
c.height = H;
let mouseX = 10;
let mouseY = 10;
// console.log(getDist(0,3,0,4));

// // Draw the ellipse
// ctx.beginPath();
// ctx.ellipse(W / 2, H / 2, 50 * R_MULTIPLIER, 75 * R_MULTIPLIER, Math.PI / 2, 0, 2 * Math.PI);
// ctx.stroke();

function circle(ctx, w, h, xCenter = 0, yCenter = 0, r = 3) {
  ctx.beginPath();
  ctx.arc(xCenter, yCenter, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "#663300";
  ctx.fillStyle = "red";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
}

function drawLine(ctx, w, h, mouseX, mouseY, startX = 150, startY = h / 2, lineWidth = 3, color = "brown") {
    ctx.beginPath();
    ctx.moveTo(startX, startY); // x1; y1
    ctx.lineTo(mouseX, mouseY); // x2; y2
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

window.addEventListener("mousemove", (event) => {
    const rect = c.getBoundingClientRect();
    // Before zoom fix:
    // var x = event.pageX - elemLeft,
    //     y = event.pageY - elemTop - 74;
    // After ZOOM fix:
    let mouseX = (event.clientX - rect.left) * (W / rect.width); // Normalize x
    let mouseY = (event.clientY - rect.top) * (H / rect.height)// Normalize y

    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 1;
    // So distance from center to right or left side of ellipse is 75 * R_MULTIPLIER (150)
    ctx.ellipse(W / 2, H / 2, 50 * R_MULTIPLIER, 75 * R_MULTIPLIER, Math.PI / 2, 0, 2 * Math.PI);
    ctx.stroke();
    // draw x and y axis
    drawLine(ctx, W, H, 0, H/2, W, H/2, 1);
    drawLine(ctx, W, H, W/2, 0, W/2, H, 1);
    // cirle on top side of ellipse 
    ctx.beginPath();
    ctx.arc(W/2, H/2 - 50*R_MULTIPLIER, 75*R_MULTIPLIER, 0, Math.PI);
    ctx.strokeStyle = "#663300";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // draw focal points
    const lenFromCenterToFocalP = Math.sqrt((75*R_MULTIPLIER)**2 - (50*R_MULTIPLIER)**2);
    const twoFP = {x1: W / 2 - lenFromCenterToFocalP, y1: H / 2, x2: W / 2 + lenFromCenterToFocalP, y2: H / 2};
    circle(ctx, W, H,  twoFP.x1, twoFP.y1);
    circle(ctx, W, H, twoFP.x2, twoFP.y2);
    // circle(ctx, W, H, 150, H / 2);

    /*
        startX,
        startY,
        endX,
        endY,
    */
    const points = getLineEllipseIntersections(
        150,
        H / 2,
        mouseX,
        mouseY,
        W / 2,
        H / 2,
        50 * R_MULTIPLIER,
        75 * R_MULTIPLIER,
        Math.PI / 2
    );

    points.forEach(p => {
        // console.log(p.x, p.y);
        // Draw line from Focal point 1 to elipse according to mouseX and mouseY
        drawLine(ctx,W, H, p.x, p.y, twoFP.x1, twoFP.y1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    });

    // draw reflection?
    points.forEach(p => {
        drawLine(ctx, W, H, twoFP.x2, twoFP.y2, p.x, p.y);

        // const d = getDist(W/2, p.x, H/2, p.y);
        const fromF1toEllipseD = getDist(twoFP.x1, p.x, twoFP.y1, p.y);
        const fromEllipseToF2 = getDist(p.x, twoFP.x2, p.y, twoFP.y2);
        ctx.font = `italic bold 25px Comic Sans MS`;
        ctx.fillText(`d: ${Math.round(fromF1toEllipseD)}`,30, 30);
        ctx.fillText(`d: ${Math.round(fromEllipseToF2)}`,W-100, 30);
        ctx.fillText(`total D: ${Math.round(fromF1toEllipseD+fromEllipseToF2)}`,W-222, H - 30);

        // Draw tangent line (blue) and perpendicular to tangent (gray)
        const tangent = getTangentDirection(p.x, p.y, W / 2, H / 2, 50 * R_MULTIPLIER, 75 * R_MULTIPLIER, Math.PI / 2);
        drawLine(ctx, W, H, p.x + tangent.dx * 40, p.y + tangent.dy * 40, p.x - tangent.dx * 40, p.y - tangent.dy * 40, 2, "blue");
        // Perpendicular to tangent (gray)
        const perp = { dx: -tangent.dy, dy: tangent.dx };
        drawLine(ctx, W, H, p.x + perp.dx * 30, p.y + perp.dy * 30, p.x - perp.dx * 30, p.y - perp.dy * 30, 2, "gray");

        // ctx.fillText(`d: ${Math.round(d)}`,30, 30);
    })

    // const point = getRotatedEllipseIntersectionIfLineStartsInCenter(
    //     W / 2,
    //     H / 2 - 50 * R_MULTIPLIER,
    //     75 * R_MULTIPLIER,
    //     75 * R_MULTIPLIER,
    //     Math.PI / 2,
    //     mouseX,
    //     H / 2
    // );
    // console.log(lenFromCenterToFocalP);

    // circle(ctx, W, H, 150, H / 2);

    // console.log(point.x, point.y);

    // circle(ctx, W, H, Math.round(point.x), Math.round(point.y));
})



function getLineEllipseIntersections(
    x1, y1,
    x2, y2,
    cx, cy,
    rx, ry,
    rotation = 0
) {
    // Translate so ellipse center becomes (0,0)
    let dx1 = x1 - cx;
    let dy1 = y1 - cy;
    let dx2 = x2 - cx;
    let dy2 = y2 - cy;

    // Rotate line into ellipse's local coordinates
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);

    const p1x = dx1 * cos - dy1 * sin;
    const p1y = dx1 * sin + dy1 * cos;

    const p2x = dx2 * cos - dy2 * sin;
    const p2y = dx2 * sin + dy2 * cos;

    // Line direction
    const vx = p2x - p1x;
    const vy = p2y - p1y;

    // Quadratic coefficients
    const A =
        (vx * vx) / (rx * rx) +
        (vy * vy) / (ry * ry);

    const B =
        2 * (
            (p1x * vx) / (rx * rx) +
            (p1y * vy) / (ry * ry)
        );

    const C =
        (p1x * p1x) / (rx * rx) +
        (p1y * p1y) / (ry * ry) -
        1;

    const discriminant = B * B - 4 * A * C;

    if (discriminant < 0)
        return [];

    const sqrt = Math.sqrt(discriminant);

    const t1 = (-B - sqrt) / (2 * A);
    const t2 = (-B + sqrt) / (2 * A);

    const points = [];

    [t1, t2].forEach(t => {

        // Keep only intersections on the line segment
        if (t < 0 || t > 1)
            return;

        const lx = p1x + vx * t;
        const ly = p1y + vy * t;

        // Rotate back
        const cos2 = Math.cos(rotation);
        const sin2 = Math.sin(rotation);

        const worldX = cx + lx * cos2 - ly * sin2;
        const worldY = cy + lx * sin2 + ly * cos2;

        points.push({
            x: worldX,
            y: worldY
        });
    });

    return points;
}


function getRotatedEllipseIntersectionIfLineStartsInCenter(
    cx,
    cy,
    rx,
    ry,
    rotation,
    targetX,
    targetY
) {
    const dx = targetX - cx;
    const dy = targetY - cy;

    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);

    // Rotate line into ellipse's local coordinate system
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    const t = 1 / Math.sqrt(
        (localX * localX) / (rx * rx) +
        (localY * localY) / (ry * ry)
    );

    const ix = localX * t;
    const iy = localY * t;

    // Rotate back
    const cos2 = Math.cos(rotation);
    const sin2 = Math.sin(rotation);

    return {
        x: cx + ix * cos2 - iy * sin2,
        y: cy + ix * sin2 + iy * cos2
    };
}

function getDist(x1, x2, y1, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

// Get tangent direction vector at a point on the rotated ellipse
function getTangentDirection(px, py, cx, cy, rx, ry, rotation) {
    // Translate point to ellipse center
    let dx = px - cx;
    let dy = py - cy;

    // Rotate into ellipse's local (unrotated) coordinate system
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Normal vector in local space: gradient of (x²/rx² + y²/ry²)
    let nx = (2 * localX) / (rx * rx);
    let ny = (2 * localY) / (ry * ry);

    // Normalize normal
    const nLen = Math.hypot(nx, ny);
    nx /= nLen;
    ny /= nLen;

    // Tangent is perpendicular to normal in local space
    let tx = -ny;
    let ty = nx;

    // Rotate tangent back to world coordinates
    const cos2 = Math.cos(rotation);
    const sin2 = Math.sin(rotation);
    const worldTx = tx * cos2 - ty * sin2;
    const worldTy = tx * sin2 + ty * cos2;

    return { dx: worldTx, dy: worldTy };
}