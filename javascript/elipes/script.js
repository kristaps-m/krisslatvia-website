const c = document.getElementById("myCanvas5");
const ctx = c.getContext("2d");
const W = 500;
const H = 500;

// ─── Ellipse dimensions (in pixels) ──────────────────────────────
let ellipseWidth = 100; // Half-width (rx), range: 30–200
let ellipseHeight = 150; // Half-height (ry), range: 30–240

c.width = W;
c.height = H;

/**
 * Draw a filled circle on the canvas.
 */
function drawCircle({ ctx, xCenter = 0, yCenter = 0, radius = 3 }) {
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#663300";
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
}

/**
 * Draw a line between two points.
 */
function drawLine({ ctx, fromX, fromY, toX, toY, lineWidth = 3, color = "brown" }) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

/**
 * Calculate distance between two points.
 */
function getDistance({ x1, y1, x2, y2 }) {
    return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * Compute the tangent direction vector at a point on a rotated ellipse.
 * Returns { dx, dy } — a normalized direction along the tangent line.
 */
function getTangentDirection({ point, ellipseCenter, ellipseRadii, rotation = 0 }) {
    const { x: px, y: py } = point;
    const { x: cx, y: cy } = ellipseCenter;

    // Translate point to ellipse center
    let dx = px - cx;
    let dy = py - cy;

    // Rotate into ellipse's local (unrotated) coordinate system
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Normal vector in local space: gradient of (x²/rx² + y²/ry²)
    let nx = (2 * localX) / (ellipseRadii.rx * ellipseRadii.rx);
    let ny = (2 * localY) / (ellipseRadii.ry * ellipseRadii.ry);

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

/**
 * Find intersections between a line segment and an ellipse.
 * Returns array of intersection points { x, y }.
 */
function getLineEllipseIntersections({
    lineStart,
    lineEnd,
    ellipseCenter,
    ellipseRadii,
    rotation = 0
}) {
    const { x: x1, y: y1 } = lineStart;
    const { x: x2, y: y2 } = lineEnd;
    const { x: cx, y: cy } = ellipseCenter;

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

    // Line direction in local space
    const vx = p2x - p1x;
    const vy = p2y - p1y;

    // Quadratic coefficients for ellipse intersection
    const A = (vx * vx) / (ellipseRadii.rx * ellipseRadii.rx) + (vy * vy) / (ellipseRadii.ry * ellipseRadii.ry);
    const B = 2 * ((p1x * vx) / (ellipseRadii.rx * ellipseRadii.rx) + (p1y * vy) / (ellipseRadii.ry * ellipseRadii.ry));
    const C = (p1x * p1x) / (ellipseRadii.rx * ellipseRadii.rx) + (p1y * p1y) / (ellipseRadii.ry * ellipseRadii.ry) - 1;

    const discriminant = B * B - 4 * A * C;
    if (discriminant < 0) return [];

    const sqrt = Math.sqrt(discriminant);
    const t1 = (-B - sqrt) / (2 * A);
    const t2 = (-B + sqrt) / (2 * A);

    const points = [];
    [t1, t2].forEach(t => {
        // Keep only intersections on the line segment
        if (t < 0 || t > 1) return;

        const lx = p1x + vx * t;
        const ly = p1y + vy * t;

        // Rotate back to world coordinates
        const cos2 = Math.cos(rotation);
        const sin2 = Math.sin(rotation);
        const worldX = cx + lx * cos2 - ly * sin2;
        const worldY = cy + lx * sin2 + ly * cos2;

        points.push({ x: worldX, y: worldY });
    });

    return points;
}

/**
 * Find the intersection of a ray starting from ellipse center with the ellipse boundary.
 */
function getEllipseIntersectionFromCenter({ ellipseCenter, ellipseRadii, rotation, targetPoint }) {
    const { x: cx, y: cy } = ellipseCenter;
    const dx = targetPoint.x - cx;
    const dy = targetPoint.y - cy;

    // Rotate direction into ellipse's local coordinate system
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Scale to reach the ellipse boundary
    const t = 1 / Math.sqrt((localX * localX) / (ellipseRadii.rx * ellipseRadii.rx) + (localY * localY) / (ellipseRadii.ry * ellipseRadii.ry));
    const ix = localX * t;
    const iy = localY * t;

    // Rotate back to world coordinates
    const cos2 = Math.cos(rotation);
    const sin2 = Math.sin(rotation);
    return { x: cx + ix * cos2 - iy * sin2, y: cy + ix * sin2 + iy * cos2 };
}

// ─── Scene drawing function (called on load and mousemove) ──────

function drawScene({ mouseX = 0, mouseY = 0 }) {
    const ellipseCenter = { x: W / 2, y: H / 2 };
    const ellipseRadii = { rx: ellipseWidth, ry: ellipseHeight };

    ctx.clearRect(0, 0, W, H);

    // ── Draw ellipse ────────────────────────────────────────────────
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(ellipseCenter.x, ellipseCenter.y, ellipseRadii.rx, ellipseRadii.ry, Math.PI / 2, 0, 2 * Math.PI);
    ctx.stroke();

    // ── Draw axes ───────────────────────────────────────────────────
    drawLine({ ctx, fromX: 0, fromY: H / 2, toX: W, toY: H / 2, lineWidth: 1 });
    drawLine({ ctx, fromX: W / 2, fromY: 0, toX: W / 2, toY: H, lineWidth: 1 });

    // ── Draw arc on top half of ellipse ─────────────────────────────
    ctx.beginPath();
    ctx.arc(ellipseCenter.x, ellipseCenter.y - ellipseRadii.rx, ellipseRadii.ry, 0, Math.PI);
    ctx.strokeStyle = "#663300";
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Compute and draw focal points ───────────────────────────────
    const lenFromCenterToFocal = Math.sqrt(ellipseRadii.ry ** 2 - ellipseRadii.rx ** 2);
    const focalPoints = {
        x1: ellipseCenter.x - lenFromCenterToFocal,
        y1: ellipseCenter.y,
        x2: ellipseCenter.x + lenFromCenterToFocal,
        y2: ellipseCenter.y
    };

    drawCircle({ ctx, xCenter: focalPoints.x1, yCenter: focalPoints.y1 });
    drawCircle({ ctx, xCenter: focalPoints.x2, yCenter: focalPoints.y2 });

    // ── Find line–ellipse intersections (from fixed point to mouse) ─
    const lineStart = { x: 150, y: H / 2 };
    const lineEnd = { x: mouseX, y: mouseY };

    const points = getLineEllipseIntersections({
        lineStart,
        lineEnd,
        ellipseCenter,
        ellipseRadii,
        rotation: Math.PI / 2
    });

    // ── Draw lines from Focal Point 1 to intersection points ────────
    points.forEach(p => {
        drawLine({ ctx, fromX: focalPoints.x1, fromY: focalPoints.y1, toX: p.x, toY: p.y });

        // Mark intersection point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    });

    // ── Draw reflection lines + distance labels ─────────────────────
    points.forEach(p => {
        drawLine({ ctx, fromX: focalPoints.x2, fromY: focalPoints.y2, toX: p.x, toY: p.y });

        const distF1toEllipse = getDistance({ x1: focalPoints.x1, y1: focalPoints.y1, x2: p.x, y2: p.y });
        const distEllipseToF2 = getDistance({ x1: p.x, y1: p.y, x2: focalPoints.x2, y2: focalPoints.y2 });

        ctx.font = `italic bold 25px Comic Sans MS`;
        ctx.fillText(`d: ${Math.round(distF1toEllipse)}`, 30, 30);
        ctx.fillText(`d: ${Math.round(distEllipseToF2)}`, W - 100, 30);
        ctx.fillText(`total D: ${Math.round(distF1toEllipse + distEllipseToF2)}`, W - 222, H - 30);

        // ── Draw tangent (blue) and perpendicular (gray) at intersection ─
        const tangent = getTangentDirection({
            point: p,
            ellipseCenter,
            ellipseRadii,
            rotation: Math.PI / 2
        });

        drawLine({ ctx, fromX: p.x + tangent.dx * 60, fromY: p.y + tangent.dy * 60, toX: p.x - tangent.dx * 60, toY: p.y - tangent.dy * 60, lineWidth: 2, color: "blue" });

        // Perpendicular to tangent (gray)
        const perp = { dx: -tangent.dy, dy: tangent.dx };
        drawLine({ ctx, fromX: p.x + perp.dx * 30, fromY: p.y + perp.dy * 30, toX: p.x - perp.dx * 30, toY: p.y - perp.dy * 30, lineWidth: 2, color: "gray" });
    });
}

// ─── Event listeners ──────────────────────────────────────────────

window.addEventListener("mousemove", (event) => {
    const rect = c.getBoundingClientRect();
    let mouseX = (event.clientX - rect.left) * (W / rect.width);  // Normalize x
    let mouseY = (event.clientY - rect.top) * (H / rect.height);  // Normalize y

    drawScene({ mouseX, mouseY });
});

window.addEventListener("load", () => {
    drawScene(); // Draw initial scene on page load
});

// ─── Slider event listeners for ellipse dimensions ────────────────

function updateEllipseWidth(value) {
    ellipseWidth = parseInt(value);
    drawScene({ mouseX: 0, mouseY: 0 });
}

function updateEllipseHeight(value) {
    ellipseHeight = parseInt(value);
    drawScene({ mouseX: 0, mouseY: 0 });
}
