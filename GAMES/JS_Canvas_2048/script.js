const CANVAS = document.getElementById("mainStage");
CTX = CANVAS.getContext("2d");
const cnvsSettings = {
  width: 400,
  height: 400,
  gameSize: 4,
  lineW: 2,
  generatedNumsEachMove: 1,
};
const movementHandler = new Movement();
let isGameOver = false;
let game2DArray;
let storeDirectionPressedAndPointsForGameOverHandling = [];

function gameSizeHandler() {
  if (cnvsSettings.gameSize === 2) {
    cnvsSettings.width = 200;
    cnvsSettings.height = 200;
    game2DArray = [
      [0, 0],
      [0, 0],
    ];
  } else if (cnvsSettings.gameSize === 3) {
    cnvsSettings.width = 300;
    cnvsSettings.height = 300;
    game2DArray = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  } else if (cnvsSettings.gameSize === 4) {
    cnvsSettings.width = 400;
    cnvsSettings.height = 400;
    game2DArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    // game2DArray = [ // TEST array !
    //   [0, 0, 64, 64],
    //   [4, 2, 0, 0],
    //   [8, 2, 0, 0],
    //   [16, 8, 4, 2],
    // ];
  } else if (cnvsSettings.gameSize === 5) {
    cnvsSettings.width = 400;
    cnvsSettings.height = 400;
    game2DArray = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
  } else if (cnvsSettings.gameSize === 6) {
    cnvsSettings.width = 500;
    cnvsSettings.height = 500;
    game2DArray = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
  } else if (cnvsSettings.gameSize === 7) {
    cnvsSettings.width = 700;
    cnvsSettings.height = 700;
    game2DArray = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  }
}
gameSizeHandler();

CANVAS.width = cnvsSettings.width;
CANVAS.height = cnvsSettings.height;
let INTERVAL = cnvsSettings.width / cnvsSettings.gameSize;
createAndDrawGirdOnCanvas();
drawGameFieldOnCanvas(true);

window.addEventListener("keyup", function (event) {
  if (!isGameOver) {
    doSomethingWhenKeyup(event.key);
  } else {
    CTX.fillStyle = "white";
    CTX.fillRect(
      cnvsSettings.width / 2 - INTERVAL,
      cnvsSettings.height / 2 - INTERVAL / 2,
      INTERVAL * 2,
      INTERVAL
    );
    var isWon = document.getElementById("haveYouReached2048");
    isWon.style = "background-color: red;";
    isWon.textContent = "GAME OVER!!!";
    displayText(
      "GAME OVER!!!!",
      cnvsSettings.width / 2,
      cnvsSettings.height / 2
    );
  }
});

function doSomethingWhenKeyup(keyUP) {
  switch (keyUP) {
    case "r":
      doubleEachNumberInGame();
      drawGameFieldOnCanvas(false);
      break;
    case "v":
      game2DArray = sort2DArray(game2DArray);
      drawGameFieldOnCanvas(false);
      break;
    case "ArrowUp":
    case "w":
      const generateNewNumberOrNot_w = movementHandler.moveAllNumbersUp();
      drawGameFieldOnCanvas(generateNewNumberOrNot_w);
      gameOverHandlerWhenDirectionButtonPressed("up");
      break;
    case "ArrowDown":
    case "s":
      const generateNewNumberOrNot_s = movementHandler.moveAllNumbersDown();
      drawGameFieldOnCanvas(generateNewNumberOrNot_s);
      gameOverHandlerWhenDirectionButtonPressed("down");
      break;
    case "ArrowLeft":
    case "a":
      const generateNewNumberOrNot_a = movementHandler.moveAllNumbersLeft();
      drawGameFieldOnCanvas(generateNewNumberOrNot_a);
      gameOverHandlerWhenDirectionButtonPressed("left");
      break;
    case "ArrowRight":
    case "d":
      const generateNewNumberOrNot_d = movementHandler.moveAllNumbersRight();
      drawGameFieldOnCanvas(generateNewNumberOrNot_d);
      gameOverHandlerWhenDirectionButtonPressed("right");
      break;
    default:
      console.log(`You Pressed ${keyUP}`);
      break;
  }
}

class DirectionAndScore {
  constructor(buttonPressed, score) {
    this.buttonPressed = buttonPressed;
    this.score = parseInt(score);
  }
}

function gameOverHandlerWhenDirectionButtonPressed(_buttonPressed) {
  var scoreToDisplay = document.getElementById("scoreDisplay");
  let directionAndScore = new DirectionAndScore(
    _buttonPressed,
    scoreToDisplay.textContent
  );
  if (countZerosInField() === 0) {
    storeDirectionPressedAndPointsForGameOverHandling.push(directionAndScore);
  } else {
    storeDirectionPressedAndPointsForGameOverHandling = [];
  }
  if (
    movementHandler.countAllDirectionsPressedForGameOverHandling(
      storeDirectionPressedAndPointsForGameOverHandling,
      parseInt(scoreToDisplay.textContent)
    )
  ) {
    console.log("GAME OVER");
    isGameOver = true;
  }
}

function getRndInteger(min, max) {
  // random number between min and max (both included):
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function countZerosInField() {
  let zerosCounter = 0;
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      let n = game2DArray[row][col];
      if (n === 0) {
        zerosCounter++;
      }
    }
  }

  return zerosCounter;
}

function generateTwoOrFourAfterMovement() {
  let countGeneratedNumbers = 0;
  let listOfZerosInField = [];
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      let n = game2DArray[row][col];
      if (n === 0) {
        listOfZerosInField.push({ row: row, col: col });
      }
    }
  }
  if (listOfZerosInField.length !== 0) {
    while (countGeneratedNumbers !== cnvsSettings.generatedNumsEachMove) {
      let row = getRndInteger(0, cnvsSettings.gameSize - 1);
      let col = getRndInteger(0, cnvsSettings.gameSize - 1);
      for (let index = 0; index < listOfZerosInField.length; index++) {
        const element = listOfZerosInField[index];
        if (element.row === row && element.col === col) {
          // if n in [9,10] return 4 else 2 (80% it's 2; 20% it's 4)
          game2DArray[row][col] = getRndInteger(1, 10) > 8 ? 4 : 2;
          countGeneratedNumbers++;
        }
      }
    }
  }
}

function calculateSumOfNumbersOrScore() {
  let totalScore = 0;
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      let n = game2DArray[row][col];
      totalScore += n;
    }
  }

  return totalScore;
}

function drawGameFieldOnCanvas(generateNumbBool) {
  CTX.clearRect(0, 0, cnvsSettings.width, cnvsSettings.height);
  if (generateNumbBool) {
    generateTwoOrFourAfterMovement();
  }
  createAndDrawGirdOnCanvas();
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      let n = game2DArray[row][col];
      moveSquareInSpecificPosition(n, col * INTERVAL, row * INTERVAL);
    }
  }
  var scoreToDisplay = document.getElementById("scoreDisplay");
  scoreToDisplay.textContent = calculateSumOfNumbersOrScore();
  var isWon = document.getElementById("haveYouReached2048");
  isWon.style = haveYouReached2048() ? "background-color: green;" : "";
  isWon.textContent = haveYouReached2048() ? "YOU HAVE WON" : ":)";
}

function haveYouReached2048() {
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      if (game2DArray[row][col] >= 2048) {
        return true;
      }
    }
  }
  return false;
}

function moveSquareInSpecificPosition(theNumber, x, y) {
  let nColor;
  if (theNumber === 0) {
    nColor = "gray";
  } else if (theNumber <= 10 && theNumber > 0) {
    nColor = "TURQUOISE";
  } else if (theNumber <= 50 && theNumber > 10) {
    nColor = "#b3257c";
  } else if (theNumber <= 100 && theNumber > 50) {
    nColor = "#820954";
  } else if (theNumber <= 1000 && theNumber > 100) {
    nColor = "YELLOW";
  } else if (theNumber <= 4000 && theNumber > 1000) {
    nColor = "LIME";
  } else if (theNumber <= 10000 && theNumber > 4000) {
    nColor = "MAGENTA";
  } else if (theNumber <= 50000 && theNumber > 10000) {
    nColor = "CYAN";
  } else if (theNumber <= 100000 && theNumber > 50000) {
    nColor = "NAVY";
  } else {
    nColor = "#00ff33";
  }
  CTX.fillStyle = nColor;
  const offSet = 5;
  const w = cnvsSettings.width / cnvsSettings.gameSize - offSet * 2;
  const h = cnvsSettings.height / cnvsSettings.gameSize - offSet * 2;
  CTX.fillRect(x + offSet, y + offSet, w, h);
  displayText(theNumber, x + INTERVAL / 2, y + INTERVAL * (2 / 3));
}

function displayText(theText, x, y) {
  let fSize;
  if (theText < 100) {
    fSize = 60;
  } else if (theText < 1000) {
    fSize = 45;
  } else if (theText < 10000) {
    fSize = 35;
  } else if (theText < 100000) {
    fSize = 25;
  } else {
    fSize = 20;
  }
  CTX.font = `italic bold ${fSize}px Comic Sans MS`;
  CTX.textAlign = "center";
  CTX.fillStyle = "black";
  CTX.fillText(theText === 0 ? "" : theText, x, y);
}

// get random number, this is not used in actual game, but can become usefull
function getRandomNumberInRange(n, interval) {
  const randomInteger = Math.floor(Math.random() * (n / interval + 1));
  const randomNumber = randomInteger * interval;
  return Math.min(randomNumber, n);
}

// create grid lines (horizontal and vertical)
function createAndDrawGirdOnCanvas() {
  // Start a new Path
  CTX.lineWidth = cnvsSettings.lineW;
  CTX.strokeStyle = "green";
  CTX.beginPath();
  for (
    let x = 0;
    x < cnvsSettings.width;
    x += cnvsSettings.width / cnvsSettings.gameSize
  ) {
    // Start a new Path
    CTX.moveTo(0, 0);
    CTX.lineTo(0, x);
    CTX.moveTo(0, x);
    CTX.lineTo(cnvsSettings.width, x);
  }

  for (
    let y = 0;
    y < cnvsSettings.height;
    y += cnvsSettings.width / cnvsSettings.gameSize
  ) {
    // Start a new Path
    CTX.moveTo(0, 0);
    CTX.lineTo(y, 0);
    CTX.moveTo(y, 0);
    CTX.lineTo(y, cnvsSettings.height);
  }

  // Draw the Path
  CTX.stroke();
}

function doubleEachNumberInGame() {
  for (let row = 0; row < cnvsSettings.gameSize; row++) {
    for (let col = 0; col < cnvsSettings.gameSize; col++) {
      game2DArray[row][col] *= 2;
    }
  }
}

function sort2DArray(array) {
  // Step 1: Flatten the 2D array
  const flattenedArray = array.flat();

  // Step 2: Sort the flattened array in ascending order
  flattenedArray.sort((a, b) => a - b);

  // Step 3: Rearrange the sorted elements back into a 2D array
  const sortedArray = [];
  let index = 0;
  for (let i = 0; i < array.length; i++) {
    const row = [];
    if (i % 2 === 0) {
      // Right to left
      for (let j = array[i].length - 1; j >= 0; j--) {
        row.push(flattenedArray[index]);
        index++;
      }
    } else {
      // Left to right
      for (let j = 0; j < array[i].length; j++) {
        row.push(flattenedArray[index]);
        index++;
      }
    }
    sortedArray.push(i % 2 === 0 ? row : row.reverse());
  }

  return sortedArray;
}

function createNewGame() {
  var newGameSize = document.getElementById("fieldSize").value;
  cnvsSettings.gameSize = parseInt(newGameSize);
  isGameOver = false;
  gameSizeHandler();
  CANVAS.width = cnvsSettings.width;
  CANVAS.height = cnvsSettings.height;
  INTERVAL = cnvsSettings.width / cnvsSettings.gameSize;
  createAndDrawGirdOnCanvas();
  drawGameFieldOnCanvas(true);
  //   console.log(newGameSize)
  //   console.log("NEW GAME");
  //   console.log(cnvsSettings)
  //   console.log(game2DArray)
}
