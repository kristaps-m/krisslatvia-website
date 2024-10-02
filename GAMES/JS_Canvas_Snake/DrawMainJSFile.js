import { Snake } from "./Snake.js";
import { Food } from "./Food.js";

const canvas = document.getElementById("snake_canvas");
const ctx = canvas.getContext("2d");
let oneSquareSize = parseInt(document.getElementById("squareSize").value);
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let isGameOver = false;
let isPaused = false;
let theGameFrameCount = 0;
let gameFieldFullNumber =
  (canvasWidth / oneSquareSize) * (canvasHeight / oneSquareSize);
let snake = new Snake(oneSquareSize, canvasWidth, canvasHeight);
let food = new Food(oneSquareSize, gameFieldFullNumber);
let isGridON = false;
const girdLineWidth = 1;
let snakeIsMoved = false;
let userTypingInPause = [];

function theSnakeGameLoop() {
  if (theGameFrameCount % 8 === 0) {
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
    if (!isGameOver && !isPaused) {
      the_draw();
    }
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
  snake.update();
  food.draw(ctx, "black");
  snake.drawTail(ctx, "green");
  snake.draw(ctx, "red");
  if (isGridON) {
    displayGrid({
      ctx: ctx,
      strokeStyle: "white",
      girdLineWidth: 1,
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
  snake.removeFirstElementFromTail();
}

document.addEventListener("keydown", function (event) {
  let theKeyPressed = event.key.replace("Arrow", "");
  if (theKeyPressed === "p" || theKeyPressed === " ") {
    isPaused = !isPaused;
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
  snakeIsMoved = true;
});

document.getElementById("toggleGirdOnOff").onclick = function () {
  isGridON = !isGridON;
};

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
  isGameOver = false;
  isPaused = false;
  var variableDisplay = document.getElementById("scoreDisplay");
  variableDisplay.textContent = 4;
  oneSquareSize = parseInt(document.getElementById("squareSize").value);
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
  console.log("Starting new game...", oneSquareSize);
};
