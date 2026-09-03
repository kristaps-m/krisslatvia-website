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

function drawCenterGrid() {
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

function drawHelpers2() {
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    // Draw vertical grid lines
    let daBottomHelper = W / 3;
    let leftSideHelper = H / 3;
    for (let x = theDepthMakerDist + squareInDistanceW / 3; x < theDepthMakerDist + squareInDistanceW; x += squareInDistanceW / 3) {
        if (daBottomHelper > W) {
            break;
        }
        ctx.beginPath();
        ctx.moveTo(x, theDepthMakerDist + squareInDistanceH);
        ctx.lineTo(daBottomHelper, H);
        ctx.stroke();
        daBottomHelper += daBottomHelper;
    }

    // Draw horizontal grid lines
    for (let y = theDepthMakerDist + squareInDistanceH / 3; y <= theDepthMakerDist + squareInDistanceH; y += squareInDistanceW / 3) {
        if (leftSideHelper > H) {
            break;
        }
        ctx.beginPath();
        ctx.moveTo(0, leftSideHelper);
        ctx.lineTo(theDepthMakerDist, y);
        ctx.stroke();
        leftSideHelper += leftSideHelper;
    }
}

class OneLittleSquare extends Position{
    constructor(x,y) {
        super(x,y);
        this.w = squareInDistanceW / 3;
        this.h = squareInDistanceH / 3;      
    }

    draw(){
        ctx.fillStyle = "rgba(255,0,0, 0.8)";
        // ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(){
        this.x-=3;
        this.y++;
        this.w += 2;
        this.h += 2;
        if (this.x < 10) {
            this.x = theDepthMakerDist;
            this.y = theDepthMakerDist + 68;
            this.w = squareInDistanceW / 3;
            this.h = squareInDistanceH / 3;
        }
    }
}

const oneSquareSize = new OneLittleSquare(theDepthMakerDist, theDepthMakerDist + 68);

let frameCount = 0;

function animate() {
    if (frameCount % 5 === 0) {
        ctx.clearRect(0,0,W,H);
        drawScreen();
        drawCenterGrid();
        drawHelpers2();
        oneSquareSize.update();
        oneSquareSize.draw();
    }
    if (frameCount >= 100000) {
        frameCount = 0;
    }
    requestAnimationFrame(animate);
    frameCount++;
}

animate();