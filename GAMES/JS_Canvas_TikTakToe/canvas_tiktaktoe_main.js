const squareOffSet = 10;
const tikTakToeFieldSize = 3;
const p1Color = 'red';
const p2Color = 'blue';
let currentPlayerColor = p1Color;
let gameField = [];
var elem = document.getElementById('myCanvas'),
elemLeft = elem.offsetLeft,
elemTop = elem.offsetTop,
elements = [];
var CTX = elem.getContext("2d");
const width = elem.width;
const height = elem.height;

// TikTakToe gird
drawGrid();

// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop - 74;
    console.log(`x: ${x}, y: ${y}`);

    if(checkWiner(gameField) === false){
        elements.forEach(function(element) {
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                if(gameField[Math.floor(y / (width / tikTakToeFieldSize))][Math.floor(x / (height / tikTakToeFieldSize))] === ''){
                    gameField[Math.floor(y / (width / tikTakToeFieldSize))][Math.floor(x / (height / tikTakToeFieldSize))] = currentPlayerColor;
                    CTX.fillStyle = currentPlayerColor;
                    CTX.fillRect(element.left, element.top, element.width, element.height);
                    updateVariableDisplay();
                    currentPlayerColor = currentPlayerColor === p2Color ? p1Color : p2Color;
                };
            }
        });
    }
    checkWiner(gameField);

}, false);

createTikTakToeClickableElements();
// Render elements.
elements.forEach(function(element) {
    CTX.fillStyle = element.colour;
    CTX.fillRect(element.left, element.top, element.width, element.height);
});

function createTikTakToeClickableElements() {
    let elemH = height / tikTakToeFieldSize - squareOffSet*2;
    let elemW = width / tikTakToeFieldSize - squareOffSet*2;
    let elemColor = '#8c8382';
    for (let row = 0; row < width; row+=width/tikTakToeFieldSize) {
        let tempRow = [];
        for (let col = 0; col < height; col+=height/tikTakToeFieldSize) {
            const oneElement = {colour: elemColor, width: elemW, height: elemH, top: row+squareOffSet, left: col+squareOffSet}
            elements.push(oneElement);
            tempRow.push('');
        }
        gameField.push(tempRow);
    }
}

function checkWiner(theGameField) {
    let gameResult = '';
    let gameFLength = theGameField.length;
    let countFullCells = 0;
    for (let row = 0; row < gameFLength; row++) {
        let cXwinByRows = 0;
        let cOwinByRows = 0;
        let cXwinByCols = 0;
        let cOwinByCols = 0;
        let cXwinByDiag = 0;
        let cOwinByDiag = 0;
        let cXwinByDiag_2 = 0;
        let cOwinByDiag_2 = 0;
        let theGoDownNumber = gameFLength - 1;
        for (let col = 0; col < gameFLength; col++) {
            if(theGameField[row][col] !== ""){
                countFullCells++;
            }
            // Adds increment to ROWS count
            if (theGameField[row][col] === p1Color){
                cXwinByRows++;
            } else if (theGameField[row][col] === p2Color){
                cOwinByRows++;
            }
            // Adds increment to COLS count
            if (theGameField[col][row] === p1Color){
                cXwinByCols++;
            }else if (theGameField[col][row] === p2Color){
                cOwinByCols++;
            }
            // Adds increment to DIAGS count
            if(theGameField[col][col] === p1Color){
                cXwinByDiag++;
            } else if(theGameField[col][col] === p2Color){
                cOwinByDiag++;
            }
            if(theGameField[col][theGoDownNumber] === p1Color){
                cXwinByDiag_2++;
            } else if(theGameField[col][theGoDownNumber] === p2Color){
                cOwinByDiag_2++;
            }
            // ----------------------------------------
            if(cXwinByRows === gameFLength || cXwinByCols === gameFLength || cXwinByDiag === gameFLength || cXwinByDiag_2 === gameFLength){
                gameResult = p1Color;
                break;
            }else if(cOwinByRows === gameFLength || cOwinByCols === gameFLength || cOwinByDiag === gameFLength || cOwinByDiag_2 === gameFLength){
                gameResult = p2Color;
                break;
            }
            theGoDownNumber--;
        }
    }

    if(countFullCells === Math.pow(gameFLength, 2) && gameResult === ''){
        // alert(`checkWineer WINNER TIE`);
        displayText(`WINNER is TIE`);
        return "TIE"
    } else if(gameResult.length > 0){
        // alert(`checkWineer WINNER ${gameResult}`);
        displayText(`WINNER is ${gameResult}`);
        return gameResult;
    }

    return false;
}

function updateVariableDisplay() {
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.className = currentPlayerColor === p1Color ? 'p2Color' : 'p1Color'
    variableDisplay.textContent = currentPlayerColor === p1Color ? p2Color : p1Color;
}

function displayText(theText){
    CTX.font = "italic bold 30px Comic Sans MS";
    CTX.textAlign = "center";
    CTX.fillStyle = '#07f223'; // greenish
    CTX.fillText(theText, width / 2, height /2);
}

function drawGrid() {
    const oneSquareSize = width / tikTakToeFieldSize
    // Draw vertical grid lines
    CTX.strokeStyle = "white";
    for (let x = 0; x <= width; x += oneSquareSize) {
        CTX.beginPath();
        CTX.moveTo(x, 0);
        CTX.lineTo(x, height);
        CTX.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= width; y += oneSquareSize) {
        CTX.beginPath();
        CTX.moveTo(0, y);
        CTX.lineTo(width, y);
        CTX.stroke();
    }
}

// function for "New Game!"
function restartGame(){
    CTX.clearRect(0, 0, width, height);
    drawGrid();
    const newTikTakToeFieldSize = document.getElementById("tikTakToeFieldSize").value;
    let elemH = height / newTikTakToeFieldSize - squareOffSet*2;
    let elemW = width / newTikTakToeFieldSize - squareOffSet*2;
    let elemColor = '#8c8382';
    gameField=[];
    elements=[];
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.className = currentPlayerColor = 'p1Color';
    variableDisplay.textContent = currentPlayerColor = p1Color;
    for (let row = 0; row < width; row+=width/newTikTakToeFieldSize) {
        let tempRow = [];
        for (let col = 0; col < height; col+=height/newTikTakToeFieldSize) {
            const oneElement = {colour: elemColor, width: elemW, height: elemH, top: row+squareOffSet, left: col+squareOffSet}
            elements.push(oneElement);
            tempRow.push('');
        }
        gameField.push(tempRow);
    }

    elements.forEach(function(element) {
        CTX.fillStyle = element.colour;
        CTX.fillRect(element.left, element.top, element.width, element.height);
    });
}