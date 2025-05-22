const CANVAS = document.getElementById("puzzleField");
const CTX = CANVAS.getContext("2d");
const sc_Width = window.screen.width;
const sc_Height = window.screen.height;
let W;
let H;
if (sc_Width <= 600) {
  W = sc_Width - 10;
  H = sc_Width - 10;
} else {
  W = 500;
  H = 500;
}
const SQUARE_OFF_SET = 10;
CANVAS.width = W;
CANVAS.height = H;
const GAME_COLORS = ["red", "blue", "yellow", "green", "purple"],
  colorResizer = 10;

let game_side_size = 4; // change game size from 3 to 5
let gameField;
let finishedGF;
initGameFieldWithSizedArray(game_side_size); // set gameField & finishedGF
gameField = shuffle(gameField);
// const elemLeft = CANVAS.offsetLeft;
// const elemTop = CANVAS.offsetTop;
let gameFieldElements = [];
let userClickedTwoNumbers = [];
const DEFAULT_GRAY = "#8c8382";

function newGame() {
  gameFieldElements = [];
  userClickedTwoNumbers = [];
  game_side_size = document.getElementById("fieldSize")?.value;
  gameField = [];
  finishedGF = [];
  initGameFieldWithSizedArray(parseInt(game_side_size));
  gameField = shuffle(gameField);
  create15PuzzleClickableElements();
  // Render elements.
  renderElements();
}

window.addEventListener("keydown", (event) => {
  const k = event.key; // wasd.
  const emptyNumber = game_side_size * game_side_size;
  const indexOfEmptyNumber = gameField.indexOf(emptyNumber);
  let twoSwapingNumbers = [
    emptyNumber,
    gameField[indexOfEmptyNumber + GetAdjusterForSecondNumberToSwap(k)],
  ];
  gameField = swapNumbers(gameField, twoSwapingNumbers);
  renderElements();
  if (compareTwoLists(gameField, finishedGF)) {
    displayText("--- YOU WON! ---", W / 2, H / 2);
    alert("YOU WON");
  }
});

function GetAdjusterForSecondNumberToSwap(userPress) {
  let result = 0;

  switch (userPress) {
    case "a":
      result = 1;
      break;
    case "w":
      result = 1 * game_side_size;
      break;
    case "s":
      result = -1 * game_side_size;
      break;
    case "d":
      result = -1;
      break;
    default:
      break;
  }

  return result;
}

// Add event listener for `click` events.
CANVAS.addEventListener(
  "click",
  function (event) {
    // Get the bounding rectangle of the canvas
    const rect = CANVAS.getBoundingClientRect();

    // var x = event.pageX - elemLeft,
    //   y = event.pageY - elemTop - 74;
    // Calculate the click position relative to the canvas
    let x = (event.clientX - rect.left) * (CANVAS.width / rect.width); // Normalize x
    let y = (event.clientY - rect.top) * (CANVAS.height / rect.height); // Normalize y

    gameFieldElements.forEach(function (element) {
      if (
        y > element.top &&
        y < element.top + element.height &&
        x > element.left &&
        x < element.left + element.width
      ) {
        CTX.fillStyle = "black";
        CTX.fillRect(
          element.left + colorResizer,
          element.top + colorResizer,
          element.width - colorResizer * 2,
          element.height - colorResizer * 2
        );
        const textX = element.left + element.width / 2;
        const textY = element.top + element.height / 2 + 2 * 3;
        displayText(gameField[element.puzzleN], textX, textY);

        if (userClickedTwoNumbers.length <= 2) {
          userClickedTwoNumbers.push(gameField[element.puzzleN]);
        }
        if (
          userClickedTwoNumbers.length == 2 &&
          userClickedTwoNumbers.includes(game_side_size * game_side_size)
        ) {
          gameField = swapNumbers(gameField, userClickedTwoNumbers);
          console.log(userClickedTwoNumbers);
          setTimeout(function () {
            renderElements();
          }, 150);
          userClickedTwoNumbers = [];
        } else if (
          userClickedTwoNumbers.length == 2 &&
          !userClickedTwoNumbers.includes(game_side_size * game_side_size)
        ) {
          userClickedTwoNumbers = [];
          setTimeout(function () {
            renderElements();
          }, 150);
        }
      }
    });
    if (compareTwoLists(gameField, finishedGF)) {
      displayText("--- YOU WON! ---", W / 2, H / 2);
      alert("YOU WON");
    }
  },
  false
);

create15PuzzleClickableElements();
// Render elements.
renderElements();
function renderElements() {
  CTX.clearRect(0, 0, W, H);
  gameFieldElements.forEach(function (element) {
    CTX.fillStyle = element.colour;
    CTX.fillRect(element.left, element.top, element.width, element.height);
    const textX = element.left + element.width / 2;
    const textY = element.top + (element.height * 2) / 3;
    displayText(gameField[element.puzzleN], textX, textY);
  });
}

function create15PuzzleClickableElements() {
  let elemH = H / game_side_size - SQUARE_OFF_SET * 2;
  let elemW = W / game_side_size - SQUARE_OFF_SET * 2;
  let puzzleNrIndex = 0;
  for (let row = 0; row < W; row += W / game_side_size) {
    let tempRow = [];
    for (let col = 0; col < H; col += H / game_side_size) {
      let elemColor = DEFAULT_GRAY; //GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];//
      const oneElement = {
        colour: elemColor,
        width: elemW,
        height: elemH,
        top: row + SQUARE_OFF_SET,
        left: col + SQUARE_OFF_SET,
        puzzleN: puzzleNrIndex,
      };
      gameFieldElements.push(oneElement);
      tempRow.push("");
      puzzleNrIndex++;
    }
  }
}

function swapNumbers(the_list, swap_numbers) {
  const x = swap_numbers[0]; // the numbers to swap like 15 and 16
  const y = swap_numbers[1];
  const x_index = the_list.indexOf(swap_numbers[0]);
  const y_index = the_list.indexOf(swap_numbers[1]);
  let new_array = [...the_list];

  if (
    Math.abs((x_index % game_side_size) - (y_index % game_side_size)) === 1 ||
    Math.abs((x_index % game_side_size) - (y_index % game_side_size)) === 0
  ) {
    // console.log("IT IS POSSIBLE TO SWAP By % % ");
    if (Math.abs(x_index - y_index) == 1 || Math.abs(x_index - y_index) == game_side_size) {
      // console.log("It is okay to swap");
      // now swap?
      new_array[x_index] = y;
      new_array[y_index] = x;
    }
    // else {
    //   console.log(
    //     "IT IS ---NOT--- POSSIBLE TO SWAP by Math.abs(x_index - y_index) == 1 || Math.abs(x_index - y_index) == game_side_size"
    //   );
    // }
  } else {
    console.log("IT IS NOT POSSIBLE TO SWAP");
  }

  return new_array;
}

function compareTwoLists(listOne, listTwo) {
  for (let i = 0; i < listOne.length; i++) {
    if (listOne[i] !== listTwo[i]) {
      return false;
    }
  }

  return true;
}

// shuffle function from: https://chatgpt.com/ /* -- functions -- */
/* -------------------------------------------------- */
function isSolvable(puzzle) {
  let inversions = 0;
  let size = Math.sqrt(puzzle.length);
  let emptyRow = 0;

  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i] === game_side_size * game_side_size) {
      emptyRow = Math.floor(i / size) + 1; // Find row of the empty space (game_side_size*game_side_size)
      continue;
    }
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[j] !== game_side_size * game_side_size && puzzle[i] > puzzle[j]) {
        inversions++;
      }
    }
  }

  if (size % 2 !== 0) {
    // Odd grid (4x4): solvable if inversions are even
    return inversions % 2 === 0;
  } else {
    // Even grid (4x4): depends on empty space row
    return (inversions + emptyRow) % 2 === 0;
  }
}

function shuffle() {
  // shuffleSolvable
  let numbers = gameField; //[...Array(15).keys()].map(n => n + 1).concat(16); // 1 to 16
  do {
    numbers = numbers.sort(() => Math.random() - 0.5);
  } while (!isSolvable(numbers));

  return numbers;
}
/* -------------------------------------------------- */

function displayText(theText, x, y) {
  let fSize = 55;
  CTX.font = `italic bold ${fSize}px Comic Sans MS`;
  CTX.textAlign = "center";
  CTX.fillStyle = "white";
  CTX.fillText(theText === game_side_size * game_side_size ? "" : theText, x, y);
}

function initGameFieldWithSizedArray(gameSize) {
  if (gameSize === 3) {
    gameField = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    finishedGF = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  } else if (gameSize === 4) {
    gameField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    finishedGF = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  } else if (gameSize === 5) {
    gameField = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    ];
    finishedGF = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    ];
  }

  return;
}

function getRndInteger(min, max) {
  // random number between min and max (both included):
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
