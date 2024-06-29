let currentPlayer = 'X';
const gameSideLenght = 3;
let gameField = [];
let AIautoMove = false;

function updateContent(cellId) {
    let gameResult = checkWineer(gameField);
    var cell = document.getElementById(cellId);
    let didComputerWin;

    if(gameResult === false){
        if (cell.innerHTML === '') {
                    updateVariableDisplay();
                    cell.innerHTML = currentPlayer;
                    let clickedCellId = cell.id.split('-');
                    let row = parseInt(clickedCellId[2]);
                    let col = parseInt(clickedCellId[3]);
                    gameField[row][col] = currentPlayer;
                    if(currentPlayer === 'O'){
                        // cell.innerHTML = currentPlayer;
                        currentPlayer = 'X';
                    } else if (currentPlayer === 'X'){
                        // cell.innerHTML = currentPlayer;
                        currentPlayer = 'O';
                    }
                    //let gameResult = checkWineer(gameField); // BUG this is not win alert is not triggered!
                    if(AIautoMove) {didComputerWin = AIMakesMove(gameResult);} // If This is win alert is still not triggered :(
                    if(!AIautoMove){
                        if(gameResult !== false){
                            var variableDisplay = document.getElementById('theGameWinner');
                            variableDisplay.textContent = `Game Winner Is ${gameResult}`;
                        }
                    }
            }
    }

    if(!didComputerWin){
        checkWineer(gameField);
    }
}

function AIautomaticalyMakesMove() {
    AIautoMove = !AIautoMove;
    var auto_ai = document.getElementById('auto_ai');
    auto_ai.textContent = `${AIautoMove}`;
}

function AIMakesMove(whatIsCurrentGameResult) {
    let safty = 0;
    while (true && !whatIsCurrentGameResult) {
        let row = Math.floor(Math.random() * gameSideLenght);
        let col = Math.floor(Math.random() * gameSideLenght);
        if(gameField[row][col] === ""){
            gameField[row][col] = currentPlayer;
            let cellId = `cell-id-${row}-${col}`;
            var cell = document.getElementById(cellId);
            cell.innerHTML = currentPlayer;
            updateVariableDisplay();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            console.log(row, col, "<-- random row, col")
            break;
        }
        safty++;
        if(safty > gameField.length * gameField.length){
            break;
        }
    }

    let didComputerWin = checkWineer(gameField);
    return didComputerWin;
}

function newGame() {
    currentPlayer = 'X';
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.textContent = currentPlayer;
    var variableDisplay = document.getElementById('theGameWinner');
    variableDisplay.textContent = null;
    gameField = [];
    for (let row = 0; row < gameSideLenght; row++) {
        let tempRow = []
        for (let col = 0; col < gameSideLenght; col++) {
            tempRow.push("");
        }
        gameField.push(tempRow);
    }
    for (let row = 0; row < gameSideLenght; row++) {
        for (let col = 0; col < gameSideLenght; col++) {
            let cellId = `cell-id-${row}-${col}`
            var variableDisplay = document.getElementById(cellId);
            variableDisplay.textContent = "";
        }
    }
}

function updateVariableDisplay() {
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.textContent = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWineer(theGameField) {
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
            if (theGameField[row][col] === 'X'){
                cXwinByRows++;
            } else if (theGameField[row][col] === 'O'){
                cOwinByRows++;
            }
            // Adds increment to COLS count
            if (theGameField[col][row] === 'X'){
                cXwinByCols++;
            }else if (theGameField[col][row] === 'O'){
                cOwinByCols++;
            }
            // Adds increment to DIAGS count
            if(theGameField[col][col] === 'X'){
                cXwinByDiag++;
            } else if(theGameField[col][col] === 'O'){
                cOwinByDiag++;
            }
            if(theGameField[col][theGoDownNumber] === 'X'){
                cXwinByDiag_2++;
            } else if(theGameField[col][theGoDownNumber] === 'O'){
                cOwinByDiag_2++;
            }
            // ----------------------------------------
            console.log(cXwinByRows, cOwinByRows);
            if(cXwinByRows === gameFLength || cXwinByCols === gameFLength || cXwinByDiag === gameFLength || cXwinByDiag_2 === gameFLength){
                gameResult = 'X';
                break;
            }else if(cOwinByRows === gameFLength || cOwinByCols === gameFLength || cOwinByDiag === gameFLength || cOwinByDiag_2 === gameFLength){
                gameResult = 'O';
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
        //return gameResult.length < 1 ? false : gameResult;
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    // Create a new paragraph element
    var newParagraph = document.createElement('div');
    newParagraph.className = "grid-container";
    // var sheet = document.createElement('style');
    // sheet.innerHTML = "{grid-template-columns: auto auto auto auto;}";
    // document.body.appendChild(sheet);
    // newParagraph.div.appendChild(sheet);
    // // var bg = document.getElementsByClassName("grid-container");
    // bg.style.gr = imgWidth + "px";
    // bg.style.height = imgHeight + "px";

    // Set the text content of the paragraph
    // newParagraph.textContent = 'This paragraph was created dynamically with JavaScript!';
    for (let row = 0; row < gameSideLenght; row++) {
        let tempRow = []
        for (let col = 0; col < gameSideLenght; col++) {
            var newDiv = document.createElement('div');
            newDiv.className = 'grid-item'
            let cellId = `cell-id-${row}-${col}`
            newDiv.id = cellId;
            newDiv.textContent = "";
            newDiv.onclick = function() {updateContent(`${cellId}`); }
            newParagraph.appendChild(newDiv);
            tempRow.push("");
        }
        gameField.push(tempRow);
    }

    // Append the new paragraph to the body of the document
    document.body.appendChild(newParagraph);
    // Display current player
    // updateVariableDisplay();
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.textContent = currentPlayer;
    auto_ai.textContent = `${AIautoMove}`;
});
