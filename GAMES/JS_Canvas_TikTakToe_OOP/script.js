var c = document.getElementById("myCanvas");
var width = c.width;
var height = c.height;
const squareOffSet = 10;
const p1Color = 'red';
const p2Color = 'blue';
let currentPlayerColor = p1Color;
let gameField = [];
var ctx = c.getContext("2d");
var elem = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];

// TikTakToe gird?
// Vertical
ctx.moveTo(width/3, 0);
ctx.lineTo(width/3, height);
ctx.moveTo(width*2/3, 0);
ctx.lineTo(width*2/3, height);
// Horizontal
ctx.moveTo(0, height/3);
ctx.lineTo(width, height/3);
ctx.moveTo(0, height*2/3);
ctx.lineTo(width, height*2/3);

ctx.stroke();



// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop - 74;
    console.log(x, y);
    let gameResultState = checkWiner(gameField);
    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            // alert('clicked an element');
            // element.colour = 'red';
            console.log(element, currentPlayerColor);
            gameField[Math.floor(y / (width / 3))][Math.floor(x / (height / 3))] = currentPlayerColor;
            context.fillStyle = currentPlayerColor;
            context.fillRect(element.left, element.top, element.width, element.height);
            console.log(gameField);
            updateVariableDisplay();
            currentPlayerColor = currentPlayerColor === p2Color ? p1Color : p2Color;
            if(gameResultState !== false){
                context.fillStyle = '#8c8382';
                currentPlayerColor = '#8c8382';
            }
            // if(checkWiner(gameField) !== false){
            //     alert(`Winner ${currentPlayerColor}`);
            // }
        }
    });

}, false);

createTikTakToeClickableElements();
// Render elements.
elements.forEach(function(element) {
    context.fillStyle = element.colour;
    context.fillRect(element.left, element.top, element.width, element.height);
});

function createTikTakToeClickableElements() {
    let elemH = height / 3 - squareOffSet*2;
    let elemW = width / 3 - squareOffSet*2;
    let elemColor = '#8c8382';
    // top left 0,0 0,100 0,200 // THIS IS NOT QUITE RIGHT :(
    // 100,0 100,100 100,200
    // 200,0 200,100 200,200
    for (let row = 0; row < width; row+=width/3) {
        let tempRow = [];
        for (let col = 0; col < height; col+=height/3) {
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
    console.log(gameResult, "gameResult Check WInner")
    if(countFullCells === Math.pow(gameFLength, 2) && gameResult === ''){
        alert(`checkWineer WINNER TIE`);
        return "TIE"
    } else if(gameResult.length > 0){
        alert(`checkWineer WINNER ${gameResult}`);
        return gameResult;
    }

    return false;
}

function updateVariableDisplay() {
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.className = currentPlayerColor === p1Color ? 'p2Color' : 'p1Color'
    variableDisplay.textContent = currentPlayerColor === p1Color ? p2Color : p1Color;
}
