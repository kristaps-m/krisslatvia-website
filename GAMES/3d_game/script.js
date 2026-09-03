// ==================== CONFIGURATION ====================
const canvas = document.getElementById("gameLike3d");
const ctx = canvas.getContext("2d");
const W = 600;
const H = 600;
// let FIELD_SIZE; // rows x cols
// let NUM_OF_MINES;
// FIELD_SIZE =  parseInt(document.getElementById("theHeight").value, 10);
// NUM_OF_MINES = parseInt(document.getElementById("minesCount").value, 10);
canvas.width = W;
canvas.height = H;
const theDepthMakerDist = 250;
const squareInDistanceW = W - theDepthMakerDist * 2;
const squareInDistanceH = H - theDepthMakerDist * 2;

function drawScreen() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(theDepthMakerDist, theDepthMakerDist);
    ctx.lineTo(W - theDepthMakerDist, theDepthMakerDist);
    ctx.lineTo(W - theDepthMakerDist, H - theDepthMakerDist);
    ctx.lineTo(theDepthMakerDist, H - theDepthMakerDist);
    ctx.lineTo(theDepthMakerDist, theDepthMakerDist);
    ctx.lineTo(0, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W - theDepthMakerDist, theDepthMakerDist);
    ctx.lineTo(W - theDepthMakerDist, H - theDepthMakerDist);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.lineTo(theDepthMakerDist, H - theDepthMakerDist);
    ctx.stroke();
}

function drawHelpers() {
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    // Draw vertical grid lines
    for (let x = theDepthMakerDist; x <= theDepthMakerDist + squareInDistanceW; x += squareInDistanceW / 3) {
        ctx.beginPath();
        ctx.moveTo(x, theDepthMakerDist);
        ctx.lineTo(x, theDepthMakerDist + squareInDistanceW);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = theDepthMakerDist; y <= theDepthMakerDist + squareInDistanceH; y += squareInDistanceW / 3) {
        ctx.beginPath();
        ctx.moveTo(theDepthMakerDist, y);
        ctx.lineTo(theDepthMakerDist + squareInDistanceW, y);
        ctx.stroke();
    }
}

// drawScreen();

function animate() {
    drawScreen();
    drawHelpers();
    requestAnimationFrame(animate);
}

animate();