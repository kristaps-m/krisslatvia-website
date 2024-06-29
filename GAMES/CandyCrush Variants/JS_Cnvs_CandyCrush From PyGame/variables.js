// Variables and constants
const FPS = 30; // frames per second to update the screen
const WINDOWWIDTH = 600; // width of the program's window, in pixels
const WINDOWHEIGHT = 600; // height in pixels

const BOARDWIDTH = 8; // how many columns in the board
const BOARDHEIGHT = 8; // how many rows in the board
const GEMIMAGESIZE = 64; // width & height of each space in pixels

// NUMGEMIMAGES is the number of gem types. You will need .png image
// files named gem0.png, gem1.png, etc. up to gem(N-1).png.
const NUMGEMIMAGES = 7;
if (NUMGEMIMAGES < 5) {
    console.error("Game needs at least 5 types of gems to work");
}

// NUMMATCHSOUNDS is the number of different sounds to choose from when
// a match is made. The .wav files are named match0.wav, match1.wav, etc.
const NUMMATCHSOUNDS = 6;

const MOVERATE = 25; // 1 to 100, larger num means faster animations
const DEDUCTSPEED = 0.8; // reduces score by 1 point every DEDUCTSPEED seconds.

//             R    G    B
const PURPLE = "rgb(255, 0, 255)";
const LIGHTBLUE = "rgb(170, 190, 255)";
const BLUE = "rgb(0, 0, 255)";
const RED = "rgb(255, 100, 100)";
const BLACK = "rgb(0, 0, 0)";
const BROWN = "rgb(85, 65, 0)";
const HIGHLIGHTCOLOR = PURPLE; // color of the selected gem's border
const BGCOLOR = LIGHTBLUE; // background color on the screen
const GRIDCOLOR = BLUE; // color of the game board
const GAMEOVERCOLOR = RED; // color of the "Game over" text.
const GAMEOVERBGCOLOR = BLACK; // background color of the "Game over" text.
const SCORECOLOR = BROWN; // color of the text for the player's score

// The amount of space to the sides of the board to the edge of the window
// is used several times, so calculate it once here and store in variables.
const XMARGIN = Math.floor((WINDOWWIDTH - GEMIMAGESIZE * BOARDWIDTH) / 2);
const YMARGIN = Math.floor((WINDOWHEIGHT - GEMIMAGESIZE * BOARDHEIGHT) / 2);

// constants for direction values
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

const EMPTY_SPACE = -1; // an arbitrary, nonpositive value
const ROWABOVEBOARD = 'row above board'; // an arbitrary, noninteger value
