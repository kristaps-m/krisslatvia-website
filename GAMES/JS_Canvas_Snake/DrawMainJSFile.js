import { Snake } from "./snake.js";
import { Food } from "./Food.js";

const maxAndMinGameSpeedHelper = (n) => (n > 20 ? 20 : n < 1 ? 1 : n);
const canvas = document.getElementById("snake_canvas");
const ctx = canvas.getContext("2d");
let oneSquareSize = parseInt(document.getElementById("squareSize").value);
// Game speed is from 1 to 20. If player enters 20 he draws snake very fast
// meaning his speed is max....
let gameSpeedDivider =
  21 -
  maxAndMinGameSpeedHelper(
    parseInt(document.getElementById("gameSpeedDivider").value)
  );
let canvasWidth;
let canvasHeight;

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchStartedInsideCanvas = false; // Flag to check where touch started

const sc_Width = window.screen.width;
// const sc_Height = window.screen.height;
if (sc_Width <= 600) {
  canvasWidth = setWidthToBeDivisibleBy100(sc_Width);
  canvasHeight = setWidthToBeDivisibleBy100(sc_Width);
} else {
  canvasWidth = 500;
  canvasHeight = 400;
}
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const girdLineWidth = 1;
let isGodModeON = false;
let isGameOver = false;
let isPaused = false;
let isSnakeFoodAhead = false;
let gameIsStarted = isGodModeON ? true : false;
let theGameFrameCount = 0;
let gameFieldFullNumber =
  (canvasWidth / oneSquareSize) * (canvasHeight / oneSquareSize);
let snake = new Snake(
  ctx,
  oneSquareSize,
  canvasWidth,
  canvasHeight,
  oneSquareSize * 3,
  0,
  "right",
  isGodModeON
);
let food = new Food(
  oneSquareSize,
  gameFieldFullNumber,
  canvasWidth,
  canvasHeight,
  {
      sx: snake.xLocation,
      sy: snake.yLocation,
      sd: snake.snakeMoveDir,
  },
  isGodModeON
);
let variableScoreDisplay = document.getElementById("scoreDisplay");
variableScoreDisplay.textContent = snake.tail.length;
let isGridON = false;
let isAutoSnakePlayON = false;
let snakeIsMoved = false;
let userTypingInPause = [];

function theSnakeGameLoop() {
  if (theGameFrameCount % gameSpeedDivider === 0) {
    // if (gameIsStarted) {
    if (isPaused) {
      displayText("    PAUSE    ");
    }
    if (gameFieldFullNumber - 2 === snake.tail.length) {
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
    if (isAutoSnakePlayON && !isGameOver && !isPaused) {
      snake.automaticalyMoveSnakeToCollectFood(food);
    }
    if (!isGameOver && !isPaused) {
      the_draw();
    }
    snake.canChangeDirection = true;
    // }
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
  if (!gameIsStarted) {
    if (!isGodModeON) {
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, snake.tail.length * oneSquareSize, oneSquareSize);
    }
  }
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
  snake.update();
  food.snakeData = {
      sx: snake.xLocation,
      sy: snake.yLocation,
      sd: snake.snakeMoveDir,
  }
  food.draw(ctx, "black");
  snake.drawTail(ctx, "green");
  snake.drawSnakeHead(ctx, "red");

  if (food.isFoodEaten(snake.xLocation, snake.yLocation)) {
    snake.setTheFoodCellEaten(food.x, food.y);
    food.createNewFood(ctx, "black", canvasWidth, canvasHeight, snake.tail, isSnakeFoodAhead);
    snake.updateTail();
    let variableDisplay = document.getElementById("scoreDisplay");
    variableDisplay.textContent = parseInt(variableDisplay.textContent) + 1;
  }
  if (isAutoSnakePlayON) {
    ctx.font = "italic bold 20px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(141, 231, 141)";
    ctx.fillText("AUTO PLAY ON!", 100, 20);
  }
  snake.removeFirstElementFromTail();
}

document.addEventListener("keydown", function (event) {
  // if (!gameIsStarted) {
  //   gameIsStarted = true;
  //   snake.changeDirection("d");
  // }
  let theKeyPressed = event.key.replace("Arrow", "");
  if (theKeyPressed === "p" || theKeyPressed === " ") {
    isPaused = !isPaused;
  }
  if (isPaused) {
    userTypingInPause.push(theKeyPressed);
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
  if (!gameIsStarted) {
    gameIsStarted = true;
  }
});

document.addEventListener(
  "touchstart",
  function (event) {
    if (canvas.contains(event.target)) {
      event.preventDefault(); // Stops the swipe from triggering page refresh
      touchStartedInsideCanvas = true; // Allow swipes only if touch starts inside canvas
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    } else {
      touchStartedInsideCanvas = false; // Ignore touches outside canvas
    }
  },
  { passive: false }
);

document.addEventListener("touchend", function (event) {
  if (!touchStartedInsideCanvas) return; // Ignore touchend if touch didn't start inside the canvas

  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;

  handleSwipe();
});

function handleSwipe() {
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;
  snakeIsMoved = true;
  if (!gameIsStarted) {
    gameIsStarted = true;
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0) {
      snake.changeDirection("Right");
    } else {
      snake.changeDirection("Left");
    }
  } else {
    // Vertical swipe
    if (deltaY > 0) {
      snake.changeDirection("Down");
    } else {
      snake.changeDirection("Up");
    }
  }
}

function displayText(theText) {
  ctx.font = "italic bold 30px Comic Sans MS";
  ctx.textAlign = "center";
  // IF you want to display Rect under displayText you can do it :)
  // ctx.fillStyle = 'white';
  // ctx.fillRect(canvasWidth * 0.1, canvasHeight /2 - 50, canvasWidth * 0.9, 50);
  ctx.fillStyle = "red";
  ctx.fillText(theText, canvasWidth / 2, canvasHeight / 2);
}

document.getElementById("togglePauseGame").onclick = function () {
  isPaused = !isPaused;
};

document.getElementById("newGame").onclick = function () {
  const doYouWantToStartNewGame = confirm("ARE YOU SURE???");
  if (doYouWantToStartNewGame) {
    isGameOver = false;
    isPaused = false;
    snakeIsMoved = false;
    gameIsStarted = false;
    isGodModeON = isPasswordEntered('"I LOVE U I LOVE U I LOVE U"');
    var variableDisplay = document.getElementById("scoreDisplay");
    variableDisplay.textContent = 4;
    oneSquareSize = parseInt(document.getElementById("squareSize").value);
    gameSpeedDivider =
      21 -
      maxAndMinGameSpeedHelper(
        parseInt(document.getElementById("gameSpeedDivider").value)
      );
    if (oneSquareSize < 5) {
      oneSquareSize = 5;
      document.getElementById("squareSize").value = 5;
    } else if (oneSquareSize > 100) {
      oneSquareSize = 100;
      document.getElementById("squareSize").value = 100;
    }
    gameFieldFullNumber =
      (canvasWidth / oneSquareSize) * (canvasHeight / oneSquareSize);
    snake = new Snake(
      ctx,
      oneSquareSize,
      canvasWidth,
      canvasHeight,
      oneSquareSize * 3,
      0,
      "right",
      isGodModeON
    );
    food = new Food(
      oneSquareSize,
      gameFieldFullNumber,
      canvasWidth,
      canvasHeight,
      {
          sx: snake.xLocation,
          sy: snake.yLocation,
          sd: snake.snakeMoveDir,
      },
      isGodModeON
    );
    let variableScoreDisplay = document.getElementById("scoreDisplay");
    variableScoreDisplay.textContent = snake.tail.length;
    isGridON = false;
    console.log("Starting new game...", "oneSquareSize=", oneSquareSize);
  }
};

document.getElementById("toggleGirdOnOff").onclick = function () {
  isGridON = !isGridON;
};

document.getElementById("toggleAutoSnakePlayOnOff").onclick = function () {
  if (isPasswordEntered()) {
    updateVariableDisplay();
    isAutoSnakePlayON = !isAutoSnakePlayON;
  }
};

document.getElementById("isSnakeFoodAhead").onclick = function () {
  if (isPasswordEntered('"God Mode!"')) {
    isSnakeFoodAhead = !isSnakeFoodAhead;
    const x = document.getElementById("helloSnakeh1");
    if(isSnakeFoodAhead){
      x.textContent = "--Hello, Snake!--";
    } else {
      x.textContent = "Hello, Snake!";
    }
  }
};


function setWidthToBeDivisibleBy100(n) {
  const reminder = n % 100;
  return n - reminder;
}

function updateVariableDisplay() {
  let variableDisplay = document.getElementById("toggleAutoSnakePlayOnOff");
  variableDisplay.className = isAutoSnakePlayON ? "autoPlayON" : "autoPlayOFF";
  variableDisplay.textContent = !isAutoSnakePlayON
    ? "AutoPlay Enabled!"
    : "Enable AutoPlay?";
}

function isPasswordEntered(passwordToCheck = '"Secret Password!!"') {
  let enteredCheatElement = document.getElementById("enteredCheat").value;

  return enteredCheatElement === passwordToCheck;
}
