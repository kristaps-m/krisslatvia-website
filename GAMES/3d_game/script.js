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
        x: VPX + point.x * W * scale * 0.8,
        y: VPY - point.y * H * scale * 0.5
    };
}

// ==================== CORRIDOR DRAWING ====================
const NEAR = 0.5;
const FAR = 12; // distance to far wall
const HW = 1.8; // half-width of corridor (in world units)
const HH = 1.8; // half-height of corridor

function drawCorridor() {
    const numSlices = 40;
    const sliceDepth = (FAR - NEAR) / numSlices;

    for (let i = 0; i < numSlices; i++) {
        let z1 = NEAR + i * sliceDepth;
        let z2 = z1 + sliceDepth;

        // Calculate scale at this depth
        const s1 = NEAR / (z1 + NEAR);
        const s2 = NEAR / (z2 + NEAR);

        // Draw floor, walls, and ceiling slices with checkerboard pattern
        drawFloorSlice(z1, z2, s1, s2);
        drawWallSlice(z1, z2, s1, s2, -1);  // left wall
        drawWallSlice(z1, z2, s1, s2, 1);   // right wall
    }

    // Draw the far wall (end of corridor)
    drawFarWall();

    // Draw perspective frame lines
    drawPerspectiveLines();

    // Draw grid lines for depth illusion
    drawGridLines(numSlices, sliceDepth);
}

function drawFloorSlice(z1, z2, s1, s2) {
    const hw1 = HW * W * s1 * 0.8;
    const hh1 = HH * H * s1 * 0.5;
    const hw2 = HW * W * s2 * 0.8;
    const hh2 = HH * H * s2 * 0.5;

    // Checkerboard pattern based on position and depth
    const checkerSize = 0.35;
    const gridZ1 = Math.floor(z1 / checkerSize);
    const gridZ2 = Math.floor(z2 / checkerSize);

    // Left half of floor
    let colorL = ((gridZ1 + gridZ2) % 2 === 0) ? '#1a1a1a' : '#d8d8d8';
    ctx.fillStyle = colorL;
    ctx.beginPath();
    const p1 = project(new Vec3(-hw1, -HH * H * 0.5, z1));
    const p2 = project(new Vec3(0, -HH * H * 0.5, z1));
    const p3 = project(new Vec3(0, -HH * H * 0.5, z2));
    const p4 = project(new Vec3(-hw2, -HH * H * 0.5, z2));
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();

    // Right half of floor (opposite color)
    colorL = ((gridZ1 + gridZ2) % 2 === 0) ? '#d8d8d8' : '#1a1a1a';
    ctx.fillStyle = colorL;
    ctx.beginPath();
    const p5 = project(new Vec3(0, -HH * H * 0.5, z1));
    const p6 = project(new Vec3(hw1, -HH * H * 0.5, z1));
    const p7 = project(new Vec3(hw2, -HH * H * 0.5, z2));
    const p8 = project(new Vec3(0, -HH * H * 0.5, z2));
    ctx.moveTo(p5.x, p5.y);
    ctx.lineTo(p6.x, p6.y);
    ctx.lineTo(p7.x, p7.y);
    ctx.lineTo(p8.x, p8.y);
    ctx.closePath();
    ctx.fill();

    // Floor edge line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const pLeft = project(new Vec3(-hw1, -HH * H * 0.5, z1));
    const pRight = project(new Vec3(hw1, -HH * H * 0.5, z1));
    ctx.beginPath();
    ctx.moveTo(pLeft.x, pLeft.y);
    ctx.lineTo(pRight.x, pRight.y);
    ctx.stroke();
}

function drawWallSlice(z1, z2, s1, s2, side) {
    const hh1 = HH * H * s1 * 0.5;
    const hh2 = HH * H * s2 * 0.5;

    // Checkerboard pattern for walls
    const checkerSize = 0.35;
    const gridZ1 = Math.floor(z1 / checkerSize);
    const gridZ2 = Math.floor(z2 / checkerSize);
    const isBlack = ((gridZ1 + gridZ2) % 2 === 0);

    ctx.fillStyle = isBlack ? '#1a1a1a' : '#d8d8d8';
    ctx.beginPath();

    if (side === -1) {
        // Left wall
        const p1 = project(new Vec3(-HW * W * s1 * 0.8, -hh1, z1));
        const p2 = project(new Vec3(-HW * W * s1 * 0.8, hh1, z1));
        const p3 = project(new Vec3(-HW * W * s2 * 0.8, hh2, z2));
        const p4 = project(new Vec3(-HW * W * s2 * 0.8, -hh2, z2));

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
    } else {
        // Right wall
        const p1 = project(new Vec3(HW * W * s1 * 0.8, -hh1, z1));
        const p2 = project(new Vec3(HW * W * s1 * 0.8, hh1, z1));
        const p3 = project(new Vec3(HW * W * s2 * 0.8, hh2, z2));
        const p4 = project(new Vec3(HW * W * s2 * 0.8, -hh2, z2));

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
    }
    ctx.closePath();
    ctx.fill();

    // Marble-like texture lines on walls
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
}

function drawFarWall() {
    const farScale = NEAR / (FAR + NEAR);
    const farW = HW * W * farScale * 0.8;
    const farH = HH * H * farScale * 0.5;

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

function drawPerspectiveLines() {
    const nearScale = NEAR / (NEAR + NEAR);
    const farScale = NEAR / (FAR + NEAR);

    // Near plane corners
    const nearTL = project(new Vec3(-HW * W * 0.8, -HH * H * 0.5, NEAR));
    const nearTR = project(new Vec3(HW * W * 0.8, -HH * H * 0.5, NEAR));
    const nearBR = project(new Vec3(HW * W * 0.8, HH * H * 0.5, NEAR));
    const nearBL = project(new Vec3(-HW * W * 0.8, HH * H * 0.5, NEAR));

    // Far plane corners (very small)
    const farTL = project(new Vec3(-HW * W * farScale * 0.8, -HH * H * farScale * 0.5, FAR));
    const farTR = project(new Vec3(HW * W * farScale * 0.8, -HH * H * farScale * 0.5, FAR));
    const farBR = project(new Vec3(HW * W * farScale * 0.8, HH * H * farScale * 0.5, FAR));
    const farBL = project(new Vec3(-HW * W * farScale * 0.8, HH * H * farScale * 0.5, FAR));

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

function drawGridLines(numSlices, sliceDepth) {
    // Horizontal lines on floor and walls at each depth slice
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= numSlices; i++) {
        let z = NEAR + i * sliceDepth;
        const scale = NEAR / (z + NEAR);
        const hw = HW * W * scale * 0.8;
        const hh = HH * H * scale * 0.5;

        // Floor horizontal line
        ctx.beginPath();
        const p1 = project(new Vec3(-hw, -HH * H * 0.5, z));
        const p2 = project(new Vec3(hw, -HH * H * 0.5, z));
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Left wall horizontal line (middle)
        ctx.beginPath();
        const l1 = project(new Vec3(-HW * W * scale * 0.8, 0, z));
        const l2 = project(new Vec3(-HW * W * scale * 0.8, -hh, z));
        ctx.moveTo(l1.x, l1.y);
        ctx.lineTo(l2.x, l2.y);
        ctx.stroke();

        // Right wall horizontal line (middle)
        ctx.beginPath();
        const r1 = project(new Vec3(HW * W * scale * 0.8, 0, z));
        const r2 = project(new Vec3(HW * W * scale * 0.8, -hh, z));
        ctx.moveTo(r1.x, r1.y);
        ctx.lineTo(r2.x, r2.y);
        ctx.stroke();
    }

    // Vertical lines on floor (running toward vanishing point)
    for (let i = -4; i <= 4; i++) {
        const xOff = i * HW * 0.35;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        const p1 = project(new Vec3(xOff, -HH * H * 0.5, NEAR));
        const p2 = project(new Vec3(xOff * 0.1, -HH * H * 0.5, FAR)); // converge toward center
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    // Vertical lines on walls (running toward vanishing point)
    for (let wall of [-1, 1]) {
        const xWall = wall * HW * W * 0.8;
        for (let i = -3; i <= 3; i++) {
            const yOff = i * HH * H * 0.25;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            const p1 = project(new Vec3(xWall, -yOff, NEAR));
            const p2 = project(new Vec3(wall * HW * W * 0.8 * 0.1, -yOff * 0.1, FAR)); // converge toward center
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
    }
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
        const cellW = (HW * W * NEAR / (FAR + NEAR) * 0.8 * 2) / gridSize;
        const cellH = (HH * H * NEAR / (FAR + NEAR) * 0.5 * 2) / gridSize;

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
        const screenX = VPX + this.x * W * scale * 0.8;
        const screenY = VPY - this.y * H * scale * 0.5;
        const screenSize = this.size * W * scale * 0.8;

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
