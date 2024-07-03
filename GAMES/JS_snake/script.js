const gameHeight = 20;
const gameWidth = 30;
let snakeField = [];
// let test = [...snakeHeadCords];
let snakeBodyCords = [[0,0], [0,1],[0,2],[0,3]]
let snakeHeadCords = snakeBodyCords[snakeBodyCords.length - 1];
var sleepSetTimeout_ctrl = 300;
let safety = Math.pow(gameHeight * gameHeight, 2);
let snakeMovementDirection = {up: 0, down:0, left:0, right:1};
let foodOnField = 0;
// let isKeyPressed = false;

// function sleep(ms) {
//     clearInterval(sleepSetTimeout_ctrl);
//     return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
// }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeColorTest() {
    for (let row = 0; row < gameWidth; row++) {
        const cellId = `cell-id-${0}-${row}`
        console.log(cellId);
        var cell = document.getElementById(cellId);
        cell.className = "snake-head";
        await sleep(sleepSetTimeout_ctrl);
        cell.className = "grid-item";
    }
}

function updateContent(cellId){
    var cell = document.getElementById(cellId);
    cell.className = "snake-head";
}

function updateVariableDisplay() {
    var variableDisplay = document.getElementById('variableDisplay');
    variableDisplay.textContent = snakeBodyCords.length;
}

document.addEventListener('DOMContentLoaded', function () {
    // Create a new paragraph element
    var newParagraph = document.createElement('div');

    newParagraph.className = "grid-container";

    for (let row = 0; row < gameHeight; row++) {
        let tempRow = []
        for (let col = 0; col < gameWidth; col++) {
            var newDiv = document.createElement('div');
            newDiv.className = 'grid-item'
            let cellId = `cell-id-${row}-${col}`
            newDiv.id = cellId;
            newDiv.textContent = "";
            // newDiv.onclick = function() {updateContent(`${cellId}`); }
            // newDiv.onclick = function() {updateContent(`${cellId}`); }
            newParagraph.appendChild(newDiv);
            tempRow.push("");
        }
        snakeField.push(tempRow);
    }


    // Append the new paragraph to the body of the document
    document.body.appendChild(newParagraph);

    snakeBodyCords.forEach(element => {
        let cellId = `cell-id-${element[0]}-${element[1]}`
        var cell = document.getElementById(cellId);
        cell.className = "snake-head";
    });
});

function reset3Directions() {
    return ":)";
}

document.addEventListener('keydown', function (event) {

        console.log(snakeBodyCords,`HC = ${snakeHeadCords}`, snakeBodyCords.length);

    switch (event.key) {
            case "ArrowLeft":
                snakeMovementDirection.up = 0;
                snakeMovementDirection.down = 0;
                snakeMovementDirection.right = 0;
                snakeMovementDirection.left = 1;
                break;
            case "ArrowRight":
                snakeMovementDirection.up = 0;
                snakeMovementDirection.down = 0;
                snakeMovementDirection.left = 0;
                snakeMovementDirection.right = 1;
                break;
            case "ArrowUp":
                snakeMovementDirection.left = 0;
                snakeMovementDirection.right = 0;
                snakeMovementDirection.down = 0;
                snakeMovementDirection.up = 1;
                break;
                case "ArrowDown":
                snakeMovementDirection.up = 0;
                snakeMovementDirection.left = 0;
                snakeMovementDirection.right = 0;
                snakeMovementDirection.down = 1;
                break;
        }
    // Add additional conditions for other arrow keys if needed
});
function movePlayerDown() {
    // Your logic for moving the player down goes here
    // For example, update player's position or trigger some action
}

function createSnakeFood() {
    let isFoodInsideSnake = true;
    let r; let c;
    while (isFoodInsideSnake){
        let randRow = Math.floor(Math.random() * gameHeight);
        let randCol = Math.floor(Math.random() * gameWidth);

        snakeBodyCords.forEach(element => {
            if(element[0] !== randRow && element[1] !== randCol){
                isFoodInsideSnake = false;
                r = randRow; c = randCol;
            }
        });
    }

    return !isFoodInsideSnake && [r,c];
}

async function startTheGame() {
    while (safety > 0) {
        let foodCords = createSnakeFood();
        if(foodOnField === 0){
            const foodCellId = `cell-id-${foodCords[0]}-${foodCords[1]}`;
            var foodCell = document.getElementById(foodCellId);
            foodCell.className = "snake-head";
            foodOnField = 1;
        }
        snakeHeadCords[0] -= snakeMovementDirection.up;
        snakeHeadCords[0] += snakeMovementDirection.down; // if u press down arrow
        snakeHeadCords[1] -= snakeMovementDirection.left;
        snakeHeadCords[1] += snakeMovementDirection.right;
            // let snakeHeadCords = [0,3]; after pressing -> it should be [0,4]
        let theTest = [snakeHeadCords[0], snakeHeadCords[1]];
        const cellHeadId = `cell-id-${snakeHeadCords[0]}-${snakeHeadCords[1]}`
        var cell = document.getElementById(cellHeadId);
        cell.className = "snake-head";
        // console.log(snakeHeadCords);
        snakeBodyCords.push(theTest);

        const lastSnakeElement = snakeBodyCords.shift();
        const cellLastId = `cell-id-${lastSnakeElement[0]}-${lastSnakeElement[1]}`;
        var cellLast = document.getElementById(cellLastId);
        cellLast.className = "grid-item";
        //console.log(snakeHeadCords, `random r & c${createSnakeFood()}`);
        await sleep(sleepSetTimeout_ctrl);

        //console.log(foodCords[0] === snakeHeadCords[0] && foodCords[1] === snakeHeadCords[1], foodCords, snakeHeadCords);
        if(foodCords[0] === snakeHeadCords[0] && foodCords[1] === snakeHeadCords[1]){
            const foodCellId = `cell-id-${foodCords[0]}-${foodCords[1]}`;
            var foodCell = document.getElementById(foodCellId);
            foodCell.className = "grid-item";
            snakeBodyCords.push(foodCords);
            foodOnField = 0;
        }

        updateVariableDisplay();
    }
}
