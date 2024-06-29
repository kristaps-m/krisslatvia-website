class CandyCrushGame{
    // constructor(listOfCells){
    //     this.listOfCells = listOfCells;
    // }
    /** this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cellColor = cellColor;
        this.arrayROW= arrayROW;
        this.arrayCOL = arraYCOL
        this.isItOneOrZero = isItOneOrZero;
        this.updateCounter = 0; */

    checkIfInRowVerticaly(){
        // console.log(mainGeneratedListOfCells);
        for (let colIndex = 0; colIndex < mainGeneratedListOfCells.length; colIndex++) {
            // console.log(colIndex);
            // if(Math.max(this.checkIfIsInRowInArray(mainGeneratedListOfCells[colIndex])) >= 1){
                console.log(`colIndex ${colIndex}`,this.checkIfIsInRowInArray(mainGeneratedListOfCells[colIndex]));
            // }
            // console.log(listOfCells.listOfCells[colIndex]);
            // for (let rowIndex = 0; rowIndex < listOfCells[0].length; rowIndex++) {
            // }
        }
    }

    checkIfIsInRowInArray(theArray){
        // let currentColor = "";
        // let nextColor = "";
        let colorCounter = 1;
        let listOf3inRow = [1];
        let testList = []; // {colorCounter:colorCounter}
        // let equalColorArray = [];
        for (let index = 0; index < theArray.length-1; index++) {
            const element = theArray[index];
            const nextEl = theArray[index+1];
            // nextColor = theArray[index+1].cellColor;
            // CC = 3;
            if(element.cellColor === nextEl.cellColor){ // next is same color CC = 3
                // currentColor = element.cellColor;
                // nextColor = 
                colorCounter++; // CC = 4
                // 3, 4, '5', '3'
                // if(listOf3inRow[listOf3inRow.length - 1] < colorCounter){ // is 4 > 4 .. no
                    testList.push({...element, colorCounter:colorCounter}); // so no push!
                // }
                listOf3inRow.push(colorCounter); // push 4
                // equalColorArray.push(element);
            }else {
                // console.log("TEST!!!--------");
                // colorCounter++;
                testList.push({...element, colorCounter:colorCounter});
                colorCounter = 1;
            }
        }
    
        return [listOf3inRow.filter(n => n >= 3), testList.filter(element => element.colorCounter >= 3)];
    }
}