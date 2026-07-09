const c = document.getElementById("myCanvas5");
const ctx = c.getContext("2d");
const W = 500;
const H = 500;
const R_MULTIPLIER = 2;
c.width = W;
c.height = H;
let mouseX = 10;
let mouseY = 10;

// Draw the ellipse
ctx.beginPath();
ctx.ellipse(W / 2, H / 2, 50 * R_MULTIPLIER, 75 * R_MULTIPLIER, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();

circle(ctx, W, H);
// drawLine(ctx,W, H, 111, mouseX, mouseY);

function circle(ctx, w, h, xCenter = 0, yCenter = 0) {
  ctx.beginPath();
  ctx.arc(xCenter, yCenter, 4, 0, 2 * Math.PI);
  ctx.strokeStyle = "#663300";
  ctx.fillStyle = "red";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
}

function drawLine(ctx, w, h, mouseX, mouseY) {
    ctx.beginPath();
    ctx.moveTo(150, h / 2); // x1; y1
    ctx.lineTo(mouseX, mouseY); // x2; y2
    ctx.lineWidth = 3;
    ctx.strokeStyle = "brown";
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
    ctx.ellipse(W / 2, H / 2, 50 * R_MULTIPLIER, 75 * R_MULTIPLIER, Math.PI / 2, 0, 2 * Math.PI);
    ctx.stroke();
    drawLine(ctx,W, H, mouseX, mouseY);
    circle(ctx, W, H, 150, H / 2);

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

        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    });


    // const point = getRotatedEllipseIntersectionIfLineStartsInCenter(
    //     W / 2,
    //     H / 2,
    //     50 * R_MULTIPLIER,
    //     75 * R_MULTIPLIER,
    //     Math.PI / 2,
    //     mouseX,
    //     mouseY
    // );

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