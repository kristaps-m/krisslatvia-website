import {Ball} from "./Ball.js";
import {PlayersBouncePad} from "./PlayersBouncePad.js";

const CANVAS = document.getElementById("pongCanvas");
const CTX = CANVAS.getContext("2d");
const W = 800; const H = 500;
CANVAS.width = W;
CANVAS.height = H;
// pad Settings
const padS = {w: 10, h:120, speed:50};
let playerOne = new PlayersBouncePad(0,H-padS.h, padS.w,padS.h, W, H, CTX, padS.speed, 1);
let playerTwo = new PlayersBouncePad(W-padS.w,H-padS.h, padS.w,padS.h, W, H, CTX, padS.speed, 2);
let theBall = new Ball(20, 20, 20, W, H, CTX, playerOne, playerTwo);

function getRndInteger(min, max) { // random number between min and max (both included):
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

document.addEventListener("keydown", (e)=>{
    // console.log(e);
    playerOne.move(e.key);
    playerTwo.move(e.key);
})

function gameLoop() {
    CTX.clearRect(0, 0, W, H);
    theBall.draw();
    theBall.update();
    playerOne.draw();
    playerTwo.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
