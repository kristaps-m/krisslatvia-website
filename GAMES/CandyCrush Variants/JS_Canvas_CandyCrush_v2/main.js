const CANVAS = document.getElementById("mainStage");
const CTX = CANVAS.getContext("2d");
const W = 400, H = 400;
CANVAS.width = W; CANVAS.height = H;
let possibleCellHW = 50;
const soColLenIs = H / possibleCellHW;
const lineAroundEachCell = 0;
// let removableCellsIndexes = [0,1,2];
let cellsToBeUpdated = [];
let mainGeneratedListOfCells = generateListOfCells();
let listOfCells = new ListOfCells(mainGeneratedListOfCells);
let CANDY_CRUSH_GAME = new CandyCrushGame();
function gameLoop() {
    // if(Math.floor(Date.now() / 1000) % 10 === 0){
    //     // console.log("SUP");
    //     console.log(listOfCells);
    // }
    CTX.clearRect(0,0,W,H);
    // CANDY_CRUSH_GAME.checkIfInRowVerticaly();
    /*
        ---------------------------------------------------------------------
        just like in snake game! ...
        EACH LOOP GAME SHOULD CHECK IF SMETHING IS -3- IN ROW;
        IF -3- IN ROW
            UPDATE,
            REMOVE FROM 2D ARRAY
            ADD SOMETHING IN BEGGINING OF ARRAY
            DRAW
    */
    // listOfCells.updateEachCell();
    listOfCells.drawList();
    requestAnimationFrame(gameLoop);
}
// console.log(listOfCells);
gameLoop();

CANVAS.addEventListener("click", function(){
    console.log("SUP LADIES");
    CANDY_CRUSH_GAME.checkIfInRowVerticaly();
})

function generateListOfCells(){
    let generatedList = [];
    let arraYCOL = 0;
    
    for (let row = 0; row < W; row+=possibleCellHW) {
        let tempList = [];
        let arraYROW = 0;
        // GENERATE one dimensional array to display verticaly
        for (let col = 0; col < H; col+=possibleCellHW) { // 0,1,2,3,4,5,6,7,8.. *(8/10)
            // console.log(row,col);            
            const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
            const newCell = new Cell(
                arraYCOL * possibleCellHW,
                arraYROW * possibleCellHW,
                possibleCellHW-lineAroundEachCell*2,
                possibleCellHW-lineAroundEachCell*2,
                randomColor,
                arraYROW,
                arraYCOL
                );
                tempList.push(newCell);
                arraYROW++;
        }
        generatedList.push(tempList);
        arraYCOL++;
    }
    return generatedList;//.slice(0,-4);
}

function popFromListTest(){
    for (let i = 0; i< mainGeneratedListOfCells.length; i++){
        // months.splice(0, 0, '');
        // const oldCell = mainGeneratedListOfCells[3][i];
        // const newCell = new Cell(
        //     oldCell.x+lineAroundEachCell,
        //     oldCell.y+lineAroundEachCell,
        //     oldCell.width-lineAroundEachCell*2,
        //     oldCell.height-lineAroundEachCell*2,
        //     "black",
        //     oldCell.arrayROW,
        //     oldCell.arrayROW
        //     );
        let lastItem = mainGeneratedListOfCells[i].pop();//splice(i,1, newCell); // Let's not just remove 3 items but replace them with empty ''
        lastItem.y = mainGeneratedListOfCells[i][0].y - lastItem.height*2;
        mainGeneratedListOfCells[i].unshift(lastItem);// .splice(0,1,lastItem);
        mainGeneratedListOfCells[i].unshift(lastItem);// .splice(0,1,lastItem);
    }
    // setTimeout(function() {
    //     listOfCells.moveDownIfSomethingIsMissing();
    // }, 300);
}

function popFromListTest2(){
    for (let i = 4; i< 8;i++){
        const oldCell = mainGeneratedListOfCells[4][i];
        const newCell = new Cell(
            oldCell.x+lineAroundEachCell,
            oldCell.y+lineAroundEachCell,
            oldCell.width-lineAroundEachCell*2,
            oldCell.height-lineAroundEachCell*2,
            "black",
            oldCell.arrayROW,
            oldCell.arrayROW
            );
        mainGeneratedListOfCells[3].splice(i,1, newCell); 
    }
}

function popFromListTest3(){
    for (let i = 1; i< 3;i++){
        const oldCell = mainGeneratedListOfCells[i+1][1];
        const newCell = new Cell(
            oldCell.x+lineAroundEachCell,
            oldCell.y+lineAroundEachCell,
            oldCell.width-lineAroundEachCell*2,
            oldCell.height-lineAroundEachCell*2,
            "black",
            oldCell.arrayROW,
            oldCell.arrayROW
            );
        mainGeneratedListOfCells[i].splice(0,1, ""); 
    }
}

function ultimatePOP(){
    mainGeneratedListOfCells[mainGeneratedListOfCells.length -1].pop()//.splice(1,3);

}

function printList(){
    console.log(mainGeneratedListOfCells);
    console.log(listOfCells.listOfCells);
    console.log(cellsToBeUpdated);
    console.log(CANDY_CRUSH_GAME.checkIfInRowVerticaly());
}

function addSometingToListOfTests(){
    const r = 2;
    cellsToBeUpdated.push([new Test(r,3),new Test(r,4),new Test(r,5), new Test(r,6)]);
}