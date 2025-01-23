import { Snake } from "./snake.js";
import { Food } from "./Food.js";
import { Cell } from "./cell.js";

const maxAndMinGameSpeedHelper = (n) => n > 20 ? 20 : n < 1 ? 1 : n;
const canvas = document.getElementById("snake_canvas");
const ctx = canvas.getContext("2d");
let oneSquareSize = parseInt(document.getElementById("squareSize").value);
// Game speed is from 1 to 20. If player enters 20 he draws snake very fast
// meaning his speed is max....
let gameSpeedDivider = 21 - maxAndMinGameSpeedHelper(parseInt(document.getElementById("gameSpeedDivider").value));
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let isGameOver = false;
let isPaused = false;
let gameIsStarted = false;
let theGameFrameCount = 0;
let gameFieldFullNumber =
  (canvasWidth / oneSquareSize) * (canvasHeight / oneSquareSize);
let snake = new Snake(oneSquareSize, canvasWidth, canvasHeight);
let food = new Food(oneSquareSize, gameFieldFullNumber);
let isGridON = false;
let isAutoSnakePlayON = false;
const girdLineWidth = 1;
let snakeIsMoved = false;
let userTypingInPause = [];

function theSnakeGameLoop() {
  if (theGameFrameCount % gameSpeedDivider === 0) {
    if (isPaused) {
      displayText("    PAUSE    ");
    }
    if (gameFieldFullNumber - 1 === snake.tail.length) {
      var variableDisplay = document.getElementById("scoreDisplay").textContent;
      displayText("YOU WON!" + ` score: ${variableDisplay}`);
      isGameOver = true;
    }
    if (
      snake.isSnakeHeadCrashedInTail() &&
      snake.tail.length > 4 &&
      snakeIsMoved
    ) {
      var variableDisplay = document.getElementById("scoreDisplay").textContent;
      displayText("GAME OVER!" + ` score: ${variableDisplay}`);
      isGameOver = true;
    }
    if(isAutoSnakePlayON && !isGameOver && !isPaused){
      snake.automaticalyMoveSnakeToCollectFood(food);
    }
    if (!isGameOver && !isPaused) {
      the_draw();
    }
    snake.canChangeDirection = true;
  }
  requestAnimationFrame(theSnakeGameLoop);
  theGameFrameCount++;
  if (theGameFrameCount > Math.pow(10, 6)) {
    theGameFrameCount = 0;
  }
}

theSnakeGameLoop();

function the_draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  if(!gameIsStarted){
    ctx.fillStyle = "green"
    ctx.fillRect(0,0,(snake.tail.length) * oneSquareSize,oneSquareSize);
  }
  snake.update();
  food.draw(ctx, "black");
  snake.drawTail(ctx, "green");
  snake.drawSnakeHead(ctx, "red");
  if (isGridON) {
    displayGrid({
      ctx: ctx,
      strokeStyle: "white",
      girdLineWidth: girdLineWidth,
      canvasHeight: canvasHeight,
      canvasWidth: canvasWidth,
      oneSquareSize: oneSquareSize,
    });
  }

  if (food.isFoodEaten(snake.xLocation, snake.yLocation)) {
    food.createNewFood(ctx, "black", canvasWidth, canvasHeight, snake.tail);
    snake.updateTail();
    var variableDisplay = document.getElementById("scoreDisplay");
    variableDisplay.textContent = parseInt(variableDisplay.textContent) + 1;
  }
  if(isAutoSnakePlayON){
    ctx.font = "italic bold 20px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(141, 231, 141)";
    ctx.fillText("AUTO PLAY ON!", 100, 20);
  }
  snake.removeFirstElementFromTail();
}

document.addEventListener("keydown", function (event) {
  let theKeyPressed = event.key.replace("Arrow", "");
  if (theKeyPressed === "p" || theKeyPressed === " ") {
    isPaused = !isPaused;
  }
    // TESTING --------------------------
    if (theKeyPressed === "o") {
      console.log(gameSpeedDivider);
      console.log(`w-${canvasWidth}, h-${canvasHeight} w.cubes-${canvasWidth / oneSquareSize} h.cubes-${canvasHeight / oneSquareSize}`);
      console.log(snake.listOfSnakeMoves);
      console.log(snake.tail, snake.xLocation, snake.yLocation);
      console.log("Food", food.x, food.y);
    }
    if(theKeyPressed === "x"){
      snake.tail.push(new Cell(snake.xLocation, snake.yLocation));
    }
  if (isPaused) {
    userTypingInPause.push(theKeyPressed);
    console.log(userTypingInPause);
  }
  if (userTypingInPause.join("").includes("iamchuck")) {
    var variableDisplay = document.getElementById("scoreDisplay");
    variableDisplay.textContent = parseInt(variableDisplay.textContent) + 10000;
    userTypingInPause = [];
  } else if (userTypingInPause.length > 50) {
    userTypingInPause = [];
  }
  snake.changeDirection(theKeyPressed);
  // setTimeout(function () {
  // }, 10);
  snakeIsMoved = true;
  if(!gameIsStarted){
    gameIsStarted = true;
  }
});

function displayText(theText) {
  ctx.font = "italic bold 30px Comic Sans MS";
  ctx.textAlign = "center";
  // IF you want to display Rect under displayText you can do it :)
  // ctx.fillStyle = 'white';
  // ctx.fillRect(canvasWidth * 0.1, canvasHeight /2 - 50, canvasWidth * 0.9, 50);
  ctx.fillStyle = "blue";
  ctx.fillText(theText, canvasWidth / 2, canvasHeight / 2);
}

document.getElementById("togglePauseGame").onclick = function () {
  isPaused = !isPaused;
};

document.getElementById("newGame").onclick = function () {
  const doYouWantToStartNewGame = confirm("ARE YOU SURE???");
  if(doYouWantToStartNewGame){
    isGameOver = false;
    isPaused = false;
    snakeIsMoved = false;
    gameIsStarted = false;
    var variableDisplay = document.getElementById("scoreDisplay");
    variableDisplay.textContent = 4;
    oneSquareSize = parseInt(document.getElementById("squareSize").value);
    gameSpeedDivider = 21 - maxAndMinGameSpeedHelper(parseInt(document.getElementById("gameSpeedDivider").value));
    if (oneSquareSize < 10) {
      oneSquareSize = 10;
      document.getElementById("squareSize").value = 10;
    } else if (oneSquareSize > 100) {
      oneSquareSize = 100;
      document.getElementById("squareSize").value = 100;
    }
    gameFieldFullNumber =
      (canvasWidth / oneSquareSize) * (canvasHeight / oneSquareSize);
    snake = new Snake(oneSquareSize, canvasWidth, canvasHeight);
    food = new Food(oneSquareSize, gameFieldFullNumber);
    isGridON = false;
    console.log("Starting new game...", "oneSquareSize=", oneSquareSize);
  }
};


document.getElementById("toggleGirdOnOff").onclick = function () {
  isGridON = !isGridON;
};

document.getElementById("toggleAutoSnakePlayOnOff").onclick = function () {
  updateVariableDisplay();
  isAutoSnakePlayON = !isAutoSnakePlayON;
};

function updateVariableDisplay() {
    var variableDisplay = document.getElementById('toggleAutoSnakePlayOnOff');
    variableDisplay.className = isAutoSnakePlayON ? "autoPlayON" : "autoPlayOFF";
    variableDisplay.textContent = !isAutoSnakePlayON ? "AutoPlay Enabled!" : "Enable AutoPlay?";
}