const CANVAS = document.getElementById("mainStage");
const CTX = CANVAS.getContext("2d");
const W = 500,  H = 500;
CANVAS.width = W, CANVAS.height = H;
// ROW = how much elements horizontaly, COL = how much e.. verticaly.
const CANDIES_IN_ROW = 8, CANDIES_IN_COL = 8;
// const CANDIES_IN_ROW = 4, CANDIES_IN_COL = 4;
const SQUARE_OFF_SET = 2; // space between each element
const ELEM_LEFT = CANVAS.offsetLeft, ELEM_TOP = CANVAS.offsetTop;
const DEFAULT_GRAY = '#8c8382';
const GAME_COLORS = ["red", "blue", "yellow", "green","purple","brown","pink","lightblue","lightgreen"];

let gameField;
let gameColors;
let amazingList = [];
initGameFieldWithSizedArray(CANDIES_IN_ROW); // set gameField & finishedGF
let gameClickableElements = [];
let userClickedTwoNumbers = [];

CANVAS.addEventListener("click", function(e) {
    const X = e.pageX - ELEM_LEFT, Y = e.pageY - ELEM_TOP - 74;
    // console.log(X,Y);

    gameClickableElements.forEach((elem) =>{
        if(X+SQUARE_OFF_SET > elem.left && X < elem.left + elem.width &&
            Y+SQUARE_OFF_SET > elem.top && Y < elem.top + elem.height){
            CTX.fillStyle = "black";
            const mom = 10;
            CTX.fillRect(elem.left+mom, elem.top+mom, elem.width-mom*2, elem.height-mom*2);
            const textX = elem.left + elem.width / 2;
            const textY = elem.top + elem.height / 2 + 2 * 3;
            // displayText(amazingList[elem.puzzleN].n, textX, textY);
            if(userClickedTwoNumbers.length <= 2){
                userClickedTwoNumbers.push(elem.puzzleN);
                // userClickedTwoNumbers.push(gameField[elem.puzzleN]);
            }
            if(userClickedTwoNumbers.length == 2){
                // gameField = swapNumbers(gameField, userClickedTwoNumbers);
                // console.log(amazingList);
                // console.log(gameField);
                // console.log(elem.puzzleN);
                // amazingList = swapObjectsInListUsingSwapedNumsInGameField(amazingList,gameField,userClickedTwoNumbers);
                amazingList = swapObjectsInAmazingList(amazingList,userClickedTwoNumbers);
                // console.log(amazingList);
                // console.log(gameField);
                // gameClickableElements = swapNumbers(gameClickableElements, userClickedTwoNumbers);
                checkHorizontalThreeInRow(amazingList);
                // console.log(gameField);
                setTimeout(function() {
                    renderElements();
                }, 500);
                userClickedTwoNumbers = [];
            }
        }
    })
},false)

createCandyCrushClickableElements();
// Render elements.
renderElements();
function renderElements(){
        // CTX.clearRect(0,0,W,H);
    gameClickableElements.forEach(function(element, i) {
        // since just numbers swaping works. I swap numbers and access color (and num FOR NOW)
        // CTX.fillStyle = amazingList[gameField[i]-1].c; // {n:1,c:red}
        CTX.fillStyle = amazingList[i].c; // {n:1,c:red}
        CTX.fillRect(element.left, element.top, element.width, element.height);
        const textX = element.left + element.width / 2;
        const textY = element.top + element.height / 2 + 2 * 3;
        // displayText(amazingList[gameField[i]-1].n, textX, textY);
        // displayText(amazingList[i].n, textX, textY);
    });
}

function createCandyCrushClickableElements() {
    let elemH = H / CANDIES_IN_ROW - SQUARE_OFF_SET*2;
    let elemW = W / CANDIES_IN_COL - SQUARE_OFF_SET*2;
    // let elemColor = DEFAULT_GRAY;
    let puzzleNrIndex = 0;
    let x = 0, y = 0;
    for (let row = 0; row < W; row+=W/CANDIES_IN_ROW) {
        // let tempRow = [];
        y=0;
        for (let col = 0; col < H; col+=H/CANDIES_IN_COL) {
            const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
            const oneElement = {colour: randomColor, width: elemW, height: elemH, top: row+SQUARE_OFF_SET, left: col+SQUARE_OFF_SET, puzzleN: puzzleNrIndex, row:x, col:y}
            gameClickableElements.push(oneElement);
            // const pWorkO = {puzzleN:puzzleNrIndex, colour:randomColor};
            // gameField.push(pWorkO);
            // tempRow.push('');
            puzzleNrIndex++;
            y++;
        }
        x++;
    }
}

function swapNumbers(the_list, swap_numbers){
    const x = swap_numbers[0] // the numbers to swap like 15 and 16
    const y = swap_numbers[1]
    const x_index = the_list.indexOf(swap_numbers[0])
    const y_index = the_list.indexOf(swap_numbers[1])
    let new_array = [...the_list];

    if (Math.abs(x_index-y_index) == 1 || Math.abs(x_index-y_index) == CANDIES_IN_ROW){
        console.log("It is okay to swap")
        // now swap?
        new_array[x_index] = y
        new_array[y_index] = x
    }else{
        console.log("IT IS NOT POSSIBLE TO SWAP")
    }

    return new_array;
}

// function swapObjectsInListUsingSwapedNumsInGameField(AM,GL,UC){ // amazingList[], gameField[], userClicked[1,2(0,1)]
//     let newAmazingList = [...AM];
//     // for (let i = 0; i < 2; i++) {
//     //     // @ index i comes new object from current amazingList what has been changed in gameField
//     //     newAmazingList[i] = AM[GL[i]-1];
//     //     // if(){

//     //     // }
//     // }
//     // [1,2]
//     newAmazingList[UC[0]-1] = AM[UC[1]-1];
//     newAmazingList[UC[1]-1] = AM[UC[0]-1];

//     return newAmazingList;
// }

function swapObjectsInAmazingList(theList, swapNumbers) {
    const index_1 = swapNumbers[0]; // Object index 1
    const index_2 = swapNumbers[1]; // Object index 2
    let newArray = [...theList];
    // Find the objects to swap
    const objectOne = theList[index_1];
    const objectTwo = theList[index_2];
    // Check if both objects exist
    if (!objectOne || !objectTwo) {
        console.log("One or both objects not found.");
        return theList; // Return the original list unchanged
    }
    // Perform the swap if conditions are met
    if (Math.abs(index_1 - index_2) == 1 || Math.abs(index_1 - index_2) == CANDIES_IN_ROW) {
        console.log("It is okay to swap");
        // Create a new array with swapped objects
        newArray[index_1] = objectTwo;
        newArray[index_2] = objectOne;

        return newArray;
    } else {
        console.log("It is not possible to swap");
        return theList; // Return the original list unchanged
    }
}

function getRndInteger(min, max) { // random number between min and max (both included):
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initGameFieldWithSizedArray(gameSize){
    if(gameSize === 3){
        gameField = [1,2,3,4,5,6,7,8,9];
        finishedGF = [1,2,3,4,5,6,7,8,9];
    }else if (gameSize === 4){
        gameField = [];
        gameColors = [];
        for (let index = 0; index < gameSize*gameSize; index++) {
            const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
            gameField.push(index+1);
            amazingList.push({n:index+1, c:randomColor});
        }
    }else if(gameSize === 5){
        gameField = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
        gameColors = [];
        for (let index = 0; index < gameSize*gameSize; index++) {
            const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
            // gameColors.push(randomColor);
            amazingList.push({n:gameField[index], c:randomColor});
        }
    }else if (gameSize === 8){
        gameField = [];
        gameColors = [];
        for (let index = 0; index < gameSize*gameSize; index++) {
            const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
            gameField.push(index+1);
            amazingList.push({n:index+1, c:randomColor});
        }
    }

    return
}

function arrayInsert(index, item){
    amazingList.splice(index, 1, item);
}

// This function takes amazingList and creates subLists to check if horizontal subLists has 3+ in row.
function checkHorizontalThreeInRow(theList){
    let c = 0;
    for (let row = 0; row < CANDIES_IN_ROW; row++) {
        let tempHorizontalList = [];
        let tempVerticalList = [];
        let x = 0;
        let colWhereIs3InRow = 0;
        for (let col = 0; col < CANDIES_IN_COL; col++) {
            tempHorizontalList.push(theList[c]);
            tempVerticalList.push(theList[x+row]); // 0,4,8,12 // 1,5,9,13
            c++;
            x+=CANDIES_IN_ROW;
            // console.log(row,col, "col");
            if(threeInRowInArray(tempVerticalList).result){
                colWhereIs3InRow = col;
                console.log(threeInRowInArray(tempVerticalList).indexes, colWhereIs3InRow);
                break;
            }
        }
        // console.log(tempVerticalList, "tempVerticalList");
        if(threeInRowInArray(tempHorizontalList).result){
            // i = row index, if row == 3, and indexes == [0,1,3], we need aray of [12,13,14]
            generateNewObjectsAndRender(threeInRowInArray(tempHorizontalList).indexes, row, "hor");
            // console.log("THREE IN ROW :) HORIZONTAL");
        }
        if(threeInRowInArray(tempVerticalList).result){
            // col = index, if col == 3, and indexes == [0,4,8], we need aray of [3,7,11]
            // console.log(threeInRowInArray(tempVerticalList).indexes, row); // colWhereIs3InRow+1
            generateNewObjectsAndRender(threeInRowInArray(tempVerticalList).indexes, row, "ver");
            // console.log("THREE IN ROW :) VERTICAL");
        }
        // else if(threeInRowInArray(tempVerticalList).result){
        //     // col = index, if col == 3, and indexes == [0,4,8], we need aray of [3,7,11]
        //     generateNewObjectsAndRender(threeInRowInArray(tempHorizontalList).indexes, col, "ver");
        //     // console.log("THREE IN ROW :) VERTICAL");
        // }
        // else{
        //     console.log(tempHorizontalList);
        // }
        // let oneRow = theList.slice(i,CANDIES_IN_ROW);
        // console.log(tempList);
    }
}

function threeInRowInArray(a){ // This function searches three+ in row in one sub array.
    let c = 1;
    let arrOfIndexes = [];
    for (let i = 0; i < a.length - 2; i++) {
        if(a[i].c === a[i+1].c){
            c++
            arrOfIndexes.push(i);
            arrOfIndexes.push(i+1);
            if(a[i+1].c === a[i+2].c){
                c++;
                arrOfIndexes.push(i+2);
            }
            if(c >= 3){
                // Lets try return Object {result:bool, indexes: number[]}
                // console.log(arrOfIndexes);
                return {result:true,indexes:arrOfIndexes};
                // return true;
            }
        }
        if(a[i+1].c !== a[i+2].c){
            c=1;
            arrOfIndexes = []
        }
    }

    return {result:false, indexes:[]};//c >= 3 ? true : false;
}

// FOR TESTING AND DEVELOPING
function displayText(theText, x, y){
    let fSize = 40;
    CTX.font = `italic bold ${fSize}px Comic Sans MS`;
    CTX.textAlign = "center";
    CTX.fillStyle = 'white';
    CTX.fillText(theText, x, y);
}

function generateNewObjectsAndRender(arrOfIndexes, row_OR_col_index, hor_OR_ver){ // Where could pass array of indexes and just generate something new :)
    //amazingList.push({n:index+1, c:randomColor});
    // rowIndex * CANDIES_IN_COL = (3*4)=12; indexes = [0,1,2]=[12,13,14] // [1,2,3]=[13,14,15]
    // rowIndex * CANDIES_IN_COL = (7*8)=56; indexes = [0,1,2]=[56,57,58] // [5,6,7]=[61,62,63]
    // VERTICAL ... col = index, if col == 3, and indexes == [0,4,8], we need aray of [3,7,11]
    // [5,6,7] c=7 we need [47,55,63] 5*8=40+7, + 8 + 8
    const addToGetCorrectIndex = hor_OR_ver === "hor" ? row_OR_col_index * CANDIES_IN_COL : row_OR_col_index;
    for (let index = 0; index < arrOfIndexes.length; index++) {
        const randomColor = GAME_COLORS[getRndInteger(0, GAME_COLORS.length - 1)];
        if(hor_OR_ver === "hor"){
            const AM_OBJECT = {n:arrOfIndexes[index] + addToGetCorrectIndex+1, c:randomColor};
            arrayInsert(arrOfIndexes[index] + addToGetCorrectIndex, AM_OBJECT);
        }else if(hor_OR_ver === "ver"){
            const AM_OBJECT = {n:arrOfIndexes[index]*CANDIES_IN_COL + addToGetCorrectIndex+1, c:randomColor};
            arrayInsert(arrOfIndexes[index]*CANDIES_IN_COL + addToGetCorrectIndex, AM_OBJECT);
        }

    }
    renderElements();
}

function printAmazingList(){
    console.log(amazingList);
}