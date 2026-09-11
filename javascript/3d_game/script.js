// ==================== CONFIGURATION ====================
const canvas = document.getElementById("gameLike3d");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const W = canvas.width;
const H = canvas.height;
const VPX = W / 2; // vanishing point x (center)
const VPY = H / 2; // vanishing point y (center)

// ==================== 3D MATH HELPERS ====================
class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function project(point) {
    const nearPlane = 0.5;
    const scale = nearPlane / (point.z + nearPlane);
    return {
        x: VPX + point.x * W * scale,
        y: VPY - point.y * H * scale
    };
}

// ==================== CORRIDOR DRAWING ====================
const NEAR = 0.5;
const FAR = 12; // distance to far wall
const HW = 1.5; // half-width of corridor (world units)
const HH = 1.5; // half-height of corridor

function drawCorridor() {
    // Draw all surfaces from near plane to far end
    drawLeftWall();
    drawRightWall();
    drawCeiling();
    drawFloor();
    drawFarWall();
    drawPerspectiveLines();
}

// ==================== LEFT WALL - CHECKERBOARD PATTERN ====================
function drawLeftWall() {
    const numDepthTiles = 20; // number of tiles along depth (z-axis)
    const tileLength = (FAR - NEAR) / numDepthTiles;

    for (let i = 0; i < numDepthTiles; i++) {
        let z1 = NEAR + i * tileLength;
        let z2 = z1 + tileLength;

        // Checkerboard: alternate based on which row we're in along the wall
        const isBlack = (i % 2 === 0) ? '#1a1a1a' : '#d8d8d8';

        ctx.fillStyle = isBlack;

        // Left wall trapezoid for this tile segment
        const pTopLeft = project(new Vec3(-HW, HH, z1));      // top of left wall (positive y)
        const pBotLeft = project(new Vec3(-HW, -HH, z1));     // bottom of left wall (negative y)
        const pBotRight = project(new Vec3(-HW, -HH, z2));    // bottom at next depth
        const pTopRight = project(new Vec3(-HW, HH, z2));     // top at next depth

        ctx.beginPath();
        ctx.moveTo(pTopLeft.x, pTopLeft.y);
        ctx.lineTo(pBotLeft.x, pBotLeft.y);
        ctx.lineTo(pBotRight.x, pBotRight.y);
        ctx.lineTo(pTopRight.x, pTopRight.y);
        ctx.closePath();
        ctx.fill();

        // Add tile edge lines for checkerboard effect on wall
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        // Horizontal line at this depth (around the middle of wall)
        const pLeft = project(new Vec3(-HW, -HH * 0.8, z1));
        const pRight = project(new Vec3(-HW, HH * 0.8, z1));
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.stroke();

        // Vertical line down the center of left wall (at x=0 on wall)
        const pTop = project(new Vec3(-HW, HH, z1));
        const pBot = project(new Vec3(-HW, -HH, z2));
        ctx.beginPath();
        ctx.moveTo(pTop.x, pTop.y);
        ctx.lineTo(pBot.x, pBot.y);
        ctx.stroke();
    }

    // Draw horizontal divider line on left wall (middle height)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    const midLeftNear = project(new Vec3(-HW, 0, NEAR));
    const midLeftFar = project(new Vec3(-HW, 0, FAR));
    ctx.beginPath();
    ctx.moveTo(midLeftNear.x, midLeftNear.y);
    ctx.lineTo(midLeftFar.x, midLeftFar.y);
    ctx.stroke();
}

// ==================== RIGHT WALL - CHECKERBOARD PATTERN ====================
function drawRightWall() {
    const numDepthTiles = 20; // number of tiles along depth (z-axis)
    const tileLength = (FAR - NEAR) / numDepthTiles;

    for (let i = 0; i < numDepthTiles; i++) {
        let z1 = NEAR + i * tileLength;
        let z2 = z1 + tileLength;

        // Checkerboard: alternate based on which row we're in along the wall
        const isBlack = (i % 2 === 0) ? '#1a1a1a' : '#d8d8d8';

        ctx.fillStyle = isBlack;

        // Right wall trapezoid for this tile segment
        const pTopLeft = project(new Vec3(HW, HH, z1));       // top of right wall (positive y)
        const pBotLeft = project(new Vec3(HW, -HH, z1));      // bottom of right wall (negative y)
        const pBotRight = project(new Vec3(HW, -HH, z2));     // bottom at next depth
        const pTopRight = project(new Vec3(HW, HH, z2));      // top at next depth

        ctx.beginPath();
        ctx.moveTo(pTopLeft.x, pTopLeft.y);
        ctx.lineTo(pBotLeft.x, pBotLeft.y);
        ctx.lineTo(pBotRight.x, pBotRight.y);
        ctx.lineTo(pTopRight.x, pTopRight.y);
        ctx.closePath();
        ctx.fill();

        // Add tile edge lines for checkerboard effect on wall
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        // Horizontal line at this depth (around the middle of wall)
        const pLeft = project(new Vec3(HW, -HH * 0.8, z1));
        const pRight = project(new Vec3(HW, HH * 0.8, z1));
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.stroke();

        // Vertical line down the center of right wall (at x=0 on wall)
        const pTop = project(new Vec3(HW, HH, z1));
        const pBot = project(new Vec3(HW, -HH, z2));
        ctx.beginPath();
        ctx.moveTo(pTop.x, pTop.y);
        ctx.lineTo(pBot.x, pBot.y);
        ctx.stroke();
    }

    // Draw horizontal divider line on right wall (middle height)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    const midRightNear = project(new Vec3(HW, 0, NEAR));
    const midRightFar = project(new Vec3(HW, 0, FAR));
    ctx.beginPath();
    ctx.moveTo(midRightNear.x, midRightNear.y);
    ctx.lineTo(midRightFar.x, midRightFar.y);
    ctx.stroke();
}

// ==================== CEILING - CHECKERBOARD PATTERN ====================
function drawCeiling() {
    const numDepthTiles = 20; // number of tiles along the ceiling (depth)
    const tileLength = (FAR - NEAR) / numDepthTiles;

    for (let i = 0; i < numDepthTiles; i++) {
        let z1 = NEAR + i * tileLength;
        let z2 = z1 + tileLength;

        // Checkerboard: alternate based on which row we're in along the ceiling
        const isBlack = (i % 2 === 0) ? '#1a1a1a' : '#d8d8d8';

        ctx.fillStyle = isBlack;

        // Ceiling trapezoid for this tile segment
        const pLeftNear = project(new Vec3(-HW, HH, z1));     // top-left of ceiling (positive y)
        const pRightNear = project(new Vec3(HW, HH, z1));     // top-right of ceiling (positive y)
        const pRightFar = project(new Vec3(HW, HH, z2));      // top-right at next depth
        const pLeftFar = project(new Vec3(-HW, HH, z2));      // top-left at next depth

        ctx.beginPath();
        ctx.moveTo(pLeftNear.x, pLeftNear.y);
        ctx.lineTo(pRightNear.x, pRightNear.y);
        ctx.lineTo(pRightFar.x, pRightFar.y);
        ctx.lineTo(pLeftFar.x, pLeftFar.y);
        ctx.closePath();
        ctx.fill();

        // Add tile edge lines for checkerboard effect on ceiling
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        // Vertical line down the center of ceiling (at x=0)
        const pCenterNear = project(new Vec3(0, HH, z1));
        const pCenterFar = project(new Vec3(0, HH, z2));
        ctx.beginPath();
        ctx.moveTo(pCenterNear.x, pCenterNear.y);
        ctx.lineTo(pCenterFar.x, pCenterFar.y);
        ctx.stroke();

        // Vertical lines on left and right halves of ceiling
        const quarterW = -HW * 0.5;
        const threeQuarterW = HW * 0.5;

        ctx.beginPath();
        ctx.moveTo(project(new Vec3(quarterW, HH, z1)).x, project(new Vec3(quarterW, HH, z1)).y);
        ctx.lineTo(project(new Vec3(quarterW, HH, z2)).x, project(new Vec3(quarterW, HH, z2)).y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(project(new Vec3(threeQuarterW, HH, z1)).x, project(new Vec3(threeQuarterW, HH, z1)).y);
        ctx.lineTo(project(new Vec3(threeQuarterW, HH, z2)).x, project(new Vec3(threeQuarterW, HH, z2)).y);
        ctx.stroke();

        // Horizontal line at this depth (around the middle of ceiling)
        const pLeft = project(new Vec3(-HW * 0.8, HH, z1));
        const pRight = project(new Vec3(HW * 0.8, HH, z1));
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.stroke();
    }

    // Draw horizontal divider line on ceiling (middle width)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    const midCeilNear = project(new Vec3(0, HH, NEAR));
    const midCeilFar = project(new Vec3(0, HH, FAR));
    ctx.beginPath();
    ctx.moveTo(midCeilNear.x, midCeilNear.y);
    ctx.lineTo(midCeilFar.x, midCeilFar.y);
    ctx.stroke();
}

// ==================== FLOOR - CHECKERBOARD PATTERN ====================
function drawFloor() {
    const numDepthTiles = 20; // number of tiles along the floor (depth)
    const tileLength = (FAR - NEAR) / numDepthTiles;

    for (let i = 0; i < numDepthTiles; i++) {
        let z1 = NEAR + i * tileLength;
        let z2 = z1 + tileLength;

        // Checkerboard: alternate based on which row we're in along the floor
        const isBlack = (i % 2 === 0) ? '#1a1a1a' : '#d8d8d8';

        ctx.fillStyle = isBlack;

        // Floor trapezoid for this tile segment
        const pLeftNear = project(new Vec3(-HW, -HH, z1));    // bottom-left of floor (negative y)
        const pRightNear = project(new Vec3(HW, -HH, z1));    // bottom-right of floor (negative y)
        const pRightFar = project(new Vec3(HW, -HH, z2));     // bottom-right at next depth
        const pLeftFar = project(new Vec3(-HW, -HH, z2));     // bottom-left at next depth

        ctx.beginPath();
        ctx.moveTo(pLeftNear.x, pLeftNear.y);
        ctx.lineTo(pRightNear.x, pRightNear.y);
        ctx.lineTo(pRightFar.x, pRightFar.y);
        ctx.lineTo(pLeftFar.x, pLeftFar.y);
        ctx.closePath();
        ctx.fill();

        // Add tile edge lines for checkerboard effect on floor
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        // Vertical line down the center of floor (at x=0)
        const pCenterNear = project(new Vec3(0, -HH, z1));
        const pCenterFar = project(new Vec3(0, -HH, z2));
        ctx.beginPath();
        ctx.moveTo(pCenterNear.x, pCenterNear.y);
        ctx.lineTo(pCenterFar.x, pCenterFar.y);
        ctx.stroke();

        // Vertical lines on left and right halves of floor
        const quarterW = -HW * 0.5;
        const threeQuarterW = HW * 0.5;

        ctx.beginPath();
        ctx.moveTo(project(new Vec3(quarterW, -HH, z1)).x, project(new Vec3(quarterW, -HH, z1)).y);
        ctx.lineTo(project(new Vec3(quarterW, -HH, z2)).x, project(new Vec3(quarterW, -HH, z2)).y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(project(new Vec3(threeQuarterW, -HH, z1)).x, project(new Vec3(threeQuarterW, -HH, z1)).y);
        ctx.lineTo(project(new Vec3(threeQuarterW, -HH, z2)).x, project(new Vec3(threeQuarterW, -HH, z2)).y);
        ctx.stroke();

        // Horizontal line at this depth (around the middle of floor)
        const pLeft = project(new Vec3(-HW * 0.8, -HH, z1));
        const pRight = project(new Vec3(HW * 0.8, -HH, z1));
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.stroke();
    }

    // Draw horizontal divider line on floor (middle width)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    const midFloorNear = project(new Vec3(0, -HH, NEAR));
    const midFloorFar = project(new Vec3(0, -HH, FAR));
    ctx.beginPath();
    ctx.moveTo(midFloorNear.x, midFloorNear.y);
    ctx.lineTo(midFloorFar.x, midFloorFar.y);
    ctx.stroke();
}

// ==================== FAR WALL (END OF CORRIDOR) ====================
function drawFarWall() {
    const farScale = NEAR / (FAR + NEAR);
    const farW = HW * farScale;
    const farH = HH * farScale;

    // Draw the far wall with a grid pattern (3x3 or more)
    const gridSize = 3; // 3 rows x 3 columns
    const cellW = (farW * 2) / gridSize;
    const cellH = (farH * 2) / gridSize;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            // Checkerboard pattern on far wall
            const isBlack = ((row + col) % 2 === 0);
            ctx.fillStyle = isBlack ? '#1a1a1a' : '#d8d8d8';

            const x = VPX - farW + col * cellW;
            const y = VPY - farH + row * cellH;

            // Draw each cell as a small rectangle on the far wall
            ctx.fillRect(x, y, cellW, cellH);
        }
    }

    // Add bright light glow at center of far wall (where cubes spawn)
    const lightGrad = ctx.createRadialGradient(VPX, VPY, 0, VPX, VPY, Math.max(farW, farH) * 1.5);
    lightGrad.addColorStop(0, 'rgba(255, 255, 240, 0.8)');
    lightGrad.addColorStop(0.5, 'rgba(200, 200, 180, 0.3)');
    lightGrad.addColorStop(1, 'rgba(80, 80, 70, 0)');

    ctx.fillStyle = lightGrad;
    ctx.fillRect(VPX - farW * 1.5, VPY - farH * 1.5, farW * 3, farH * 3);
}

// ==================== PERSPECTIVE LINES ====================
function drawPerspectiveLines() {
    const nearScale = NEAR / (NEAR + NEAR);
    const farScale = NEAR / (FAR + NEAR);

    // Near plane corners
    const nearTL = project(new Vec3(-HW, HH, NEAR));       // top-left of near opening
    const nearTR = project(new Vec3(HW, HH, NEAR));        // top-right of near opening
    const nearBR = project(new Vec3(HW, -HH, NEAR));       // bottom-right of near opening
    const nearBL = project(new Vec3(-HW, -HH, NEAR));      // bottom-left of near opening

    // Far plane corners (very small)
    const farTL = project(new Vec3(-HW * farScale / nearScale, HH * farScale / nearScale, FAR));
    const farTR = project(new Vec3(HW * farScale / nearScale, HH * farScale / nearScale, FAR));
    const farBR = project(new Vec3(HW * farScale / nearScale, -HH * farScale / nearScale, FAR));
    const farBL = project(new Vec3(-HW * farScale / nearScale, -HH * farScale / nearScale, FAR));

    // Draw strong white lines for corridor frame
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    // Near rectangle (brightest)
    ctx.beginPath();
    ctx.moveTo(nearTL.x, nearTL.y);
    ctx.lineTo(nearTR.x, nearTR.y);
    ctx.lineTo(nearBR.x, nearBR.y);
    ctx.lineTo(nearBL.x, nearBL.y);
    ctx.closePath();
    ctx.stroke();

    // Perspective lines connecting near to far
    const lines = [
        [nearTL, farTL], [nearTR, farTR],
        [nearBR, farBR], [nearBL, farBL]
    ];

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    lines.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    });

    // Far rectangle (faint)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(farTL.x, farTL.y);
    ctx.lineTo(farTR.x, farTR.y);
    ctx.lineTo(farBR.x, farBR.y);
    ctx.lineTo(farBL.x, farBL.y);
    ctx.closePath();
    ctx.stroke();
}

// ==================== MOVING CUBES (from far wall toward viewer) ====================
class MovingCube {
    constructor(gridX, gridY) {
        // gridX: 0-2 (left to right on far wall)
        // gridY: 0-2 (top to bottom on far wall)
        this.gridX = gridX;
        this.gridY = gridY;

        // Calculate starting position on the far wall
        const gridSize = 3;
        const cellW = (HW * NEAR / (FAR + NEAR)) * 2 / gridSize;
        const cellH = (HH * NEAR / (FAR + NEAR)) * 2 / gridSize;

        // World position at far wall
        this.x = -HW + (gridX + 0.5) * (2 * HW / gridSize);
        this.y = HH - (gridY + 0.5) * (2 * HH / gridSize);
        this.z = FAR; // starts at far end

        this.size = 0.4; // cube size in world units
        this.speedZ = -0.03; // moves toward camera (negative z direction)

        // For drawing: calculate projected positions as it approaches
        this.alive = true;
    }

    update() {
        this.z += this.speedZ;

        // Remove cube when it passes the viewer
        if (this.z < NEAR - 1) {
            this.alive = false;
        }
    }

    draw() {
        const scale = NEAR / (this.z + NEAR);
        const screenX = VPX + this.x * W * scale;
        const screenY = VPY - this.y * H * scale;
        const screenSize = this.size * W * scale;

        // Draw cube as a simple rectangle (no rotation, just moving toward viewer)
        ctx.fillStyle = 'rgba(255, 100, 100, 0.9)';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        const x = screenX - screenSize / 2;
        const y = screenY - screenSize / 2;

        // Draw front face (the one facing us as it approaches)
        ctx.fillRect(x, y, screenSize, screenSize);
        ctx.strokeRect(x, y, screenSize, screenSize);

        // Add glow effect when close to camera
        if (this.z < 4) {
            const glowIntensity = (4 - this.z) / 4;
            const glowGrad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, screenSize * 3);
            glowGrad.addColorStop(0, `rgba(255, 100, 100, ${glowIntensity * 0.4})`);
            glowGrad.addColorStop(1, 'rgba(255, 100, 100, 0)');

            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(screenX, screenY, screenSize * 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// ==================== CUBE SPAWNER ====================
const cubes = []; // array of active cubes
let spawnTimer = 0;
const spawnInterval = 60; // frames between spawns (adjust for speed)

function spawnCube() {
    // Pick a random grid position on the far wall
    const gridSize = 3; // 3x3 grid
    const gridX = Math.floor(Math.random() * gridSize);
    const gridY = Math.floor(Math.random() * gridSize);

    cubes.push(new MovingCube(gridX, gridY));
}

function updateCubes() {
    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
        spawnCube();
        spawnTimer = 0;
    }

    // Update and remove dead cubes
    for (let i = cubes.length - 1; i >= 0; i--) {
        cubes[i].update();
        if (!cubes[i].alive) {
            cubes.splice(i, 1);
        }
    }
}

function drawCubes() {
    // Sort by z-depth for proper rendering (far to near)
    const sorted = [...cubes].sort((a, b) => b.z - a.z);
    sorted.forEach(cube => cube.draw());
}

// ==================== ANIMATION LOOP ====================
let frameCount = 0;

function animate() {
    // Clear canvas with dark background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, W, H);

    // Draw the corridor
    drawCorridor();

    // Update and draw cubes
    updateCubes();
    drawCubes();

    frameCount++;
    requestAnimationFrame(animate);
}

// Start animation
animate();
