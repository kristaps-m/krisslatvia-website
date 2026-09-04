// ==================== CONFIGURATION ====================
const canvas = document.getElementById("gameLike3d");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const W = canvas.width;
const H = canvas.height;
const VPX = W / 2; // vanishing point x
const VPY = H / 2; // vanishing point y

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
const FAR = 12;
const HW = 1.5; // half-width of corridor
const HH = 1.5; // half-height of corridor

function drawCorridor() {
    const numSlices = 30;
    const sliceDepth = (FAR - NEAR) / numSlices;

    for (let i = 0; i < numSlices; i++) {
        let z1 = NEAR + i * sliceDepth;
        let z2 = z1 + sliceDepth;

        // Calculate scale at this depth
        const s1 = NEAR / (z1 + NEAR);
        const s2 = NEAR / (z2 + NEAR);

        // Floor
        drawFloorSlice(z1, z2, s1, s2);

        // Left wall
        drawWallSlice(z1, z2, s1, s2, -1);

        // Right wall
        drawWallSlice(z1, z2, s1, s2, 1);
    }

    // Ceiling (dark gradient)
    const ceilGrad = ctx.createLinearGradient(0, 0, 0, H * 0.35);
    ceilGrad.addColorStop(0, '#0a0a0a');
    ceilGrad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = ceilGrad;
    ctx.fillRect(0, 0, W, H * 0.35);

    // Far end light glow
    const farScale = NEAR / (FAR + NEAR);
    const farW = HW * W * farScale * 0.8;
    const farH = HH * H * farScale * 0.5;

    const lightGrad = ctx.createRadialGradient(VPX, VPY, 0, VPX, VPY, Math.max(farW, farH) * 3);
    lightGrad.addColorStop(0, 'rgba(255, 255, 240, 1.0)');
    lightGrad.addColorStop(0.3, 'rgba(200, 200, 180, 0.6)');
    lightGrad.addColorStop(1, 'rgba(80, 80, 70, 0)');

    ctx.fillStyle = lightGrad;
    ctx.fillRect(VPX - farW * 3, VPY - farH * 3, farW * 6, farH * 6);

    // Draw strong perspective lines (corridor frame)
    drawPerspectiveLines();

    // Draw grid lines on surfaces for more depth illusion
    drawGridLines(numSlices, sliceDepth);
}

function drawFloorSlice(z1, z2, s1, s2) {
    const hw1 = HW * W * s1 * 0.8;
    const hh1 = HH * H * s1 * 0.5;
    const hw2 = HW * W * s2 * 0.8;
    const hh2 = HH * H * s2 * 0.5;

    // Checkerboard pattern based on position and depth
    const checkerSize = 0.4;
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

    // Right half of floor
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

    // Add subtle marble-like texture overlay (lighter lines)
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
    const checkerSize = 0.4;
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

    // Add marble-like texture lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
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

// ==================== MOVING 3D CUBE ====================
class Cube {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = FAR; // starts far away
        this.size = 0.6;
        this.rotationX = 0;
        this.rotationY = 0;
        this.speedZ = -0.04; // moves toward camera
        this.wobbleX = Math.random() * 2 - 1; // slight horizontal movement
        this.wobbleY = Math.random() * 2 - 1;
    }

    update() {
        this.z += this.speedZ;
        this.rotationX += 0.025;
        this.rotationY += 0.035;

        // Add slight wobble for more interesting movement
        this.x = Math.sin(Date.now() * 0.001) * 0.3 * this.wobbleX;
        this.y = Math.cos(Date.now() * 0.0013) * 0.2 * this.wobbleY;

        // Reset when cube passes the screen
        if (this.z < NEAR - 1) {
            this.z = FAR;
            this.x = (Math.random() - 0.5) * 1.5;
            this.y = (Math.random() - 0.5) * 1.5;
            this.wobbleX = Math.random() * 2 - 1;
            this.wobbleY = Math.random() * 2 - 1;
        }
    }

    getCorners() {
        const s = this.size;
        const cosX = Math.cos(this.rotationX);
        const sinX = Math.sin(this.rotationX);
        const cosY = Math.cos(this.rotationY);
        const sinY = Math.sin(this.rotationY);

        // Original cube corners (before rotation)
        const corners = [
            new Vec3(-s, -s, -s), new Vec3(s, -s, -s),
            new Vec3(s, s, -s),   new Vec3(-s, s, -s),
            new Vec3(-s, -s, s),  new Vec3(s, -s, s),
            new Vec3(s, s, s),    new Vec3(-s, s, s)
        ];

        // Apply rotation and translation
        return corners.map(c => {
            let x = c.x * cosY + c.z * sinY;
            let z = -c.x * sinY + c.z * cosY;
            let y = c.y * cosX - z * sinX;
            z = c.y * sinX + z * cosX;

            return new Vec3(
                this.x + x,
                this.y + y,
                this.z + z
            );
        });
    }

    draw() {
        const corners = this.getCorners();
        const projected = corners.map(c => project(c));

        // Define cube faces with indices and colors
        const faces = [
            { indices: [0, 1, 2, 3], color: 'rgba(255, 80, 80, 0.75)' },   // front - red
            { indices: [4, 5, 6, 7], color: 'rgba(80, 255, 80, 0.75)' },    // back - green
            { indices: [0, 1, 5, 4], color: 'rgba(80, 80, 255, 0.75)' },   // bottom - blue
            { indices: [3, 2, 6, 7], color: 'rgba(255, 255, 80, 0.75)' },  // top - yellow
            { indices: [0, 3, 7, 4], color: 'rgba(255, 150, 200, 0.75)' }, // left - pink
            { indices: [1, 2, 6, 5], color: 'rgba(150, 200, 255, 0.75)' }  // right - cyan
        ];

        // Sort faces by depth (painters algorithm)
        const sortedFaces = faces.map(f => {
            const avgZ = f.indices.reduce((sum, idx) => sum + corners[idx].z, 0) / 4;
            return { ...f, avgZ };
        }).sort((a, b) => b.avgZ - a.avgZ); // far to near

        sortedFaces.forEach(face => {
            ctx.fillStyle = face.color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();

            const p0 = projected[face.indices[0]];
            const p1 = projected[face.indices[1]];
            const p2 = projected[face.indices[2]];
            const p3 = projected[face.indices[3]];

            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });

        // Draw edges for extra 3D definition
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // front face
            [4, 5], [5, 6], [6, 7], [7, 4], // back face
            [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
        ];

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 1;
        edges.forEach(([a, b]) => {
            const pa = projected[a];
            const pb = projected[b];
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
        });

        // Add a glow effect when cube is close to camera
        if (this.z < 3) {
            const glowScale = (3 - this.z) / 3;
            const center = project(new Vec3(this.x, this.y, this.z));
            const radius = this.size * W * (NEAR / (this.z + NEAR)) * 0.8 * glowScale;

            const glowGrad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius * 2);
            glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// ==================== ANIMATION LOOP ====================
const cube = new Cube();

function animate() {
    // Clear canvas with dark background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, W, H);

    // Draw the corridor
    drawCorridor();

    // Update and draw cube
    cube.update();
    cube.draw();

    requestAnimationFrame(animate);
}

// Start animation
animate();
