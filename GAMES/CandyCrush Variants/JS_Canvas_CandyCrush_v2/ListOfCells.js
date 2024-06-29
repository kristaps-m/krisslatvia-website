class ListOfCells{
    constructor(listOfCells){
        this.listOfCells = listOfCells;
        this.rowLength = listOfCells[0].length;
        this.gameRowCount = listOfCells.length;
    }

    testUpdateHoriziontaly(){
        for (let index = 0; index < this.listOfCells.length; index++) {
            for (let col = this.listOfCells[0].length; col >= 0; col--) {
                const element = this.listOfCells[index][col];
                try {
                    element.updateHorizontaly(element.height);
                } catch (error) {
                    
                }
            }
        }
    }

    drawList(){
        for (let index = 0; index < this.listOfCells.length; index++) {
            for (let col = 0; col < this.listOfCells[0].length; col++) {
                const element = this.listOfCells[index][col];
                try {
                    element.draw();
                    const textX = element.x + element.width / 2;
                    const textY = element.y + element.height * 2/3;
                    // console.log("TEST");
                    // if(element.y % 5 === 0){
                        displayText(Math.round(element.y), textX, textY-7);
                        displayText(`r-${element.arrayROW}:${element.arrayCOL}`, textX, textY+7);
                    // } 
                } catch (error) {
                    
                }
            }
        }
    }

    testSetEqualCellColor(theArray){
        let testResult = getRowAndColMinMaxForHorizAndVert(theArray);

        for (let index = 0; index <  this.listOfCells.length; index++) {
            for (let col = 0; col < this.listOfCells[0].length; col++) {
                let c = this.listOfCells[index][col];
                if(c.arrayROW === testResult.rowMin && c.arrayCOL >= testResult.colMin && c.arrayCOL <= testResult.colMax){
                    c.cellColor = "white";
                }
            }            
        }
    }

    updateEachCell(){
        // this.arrayROW
        // this.arrayCOL
        const r = 5;
        // let testListWhereThereIs3inOneRow = [new Test(r,3),new Test(r,4),new Test(r,5), new Test(r,6)]; // r and min max col
        // let testResult = getRowAndColMinMaxForHorizAndVert(testListWhereThereIs3inOneRow);
        const vertRdrow = 6;
        let testVerticalDropw = [new Test(vertRdrow-3,3),new Test(vertRdrow-2,3),new Test(vertRdrow-1,3),new Test(vertRdrow,3)]; //  new Test(5,3), new Test(6,3)
        let testResult = getRowAndColMinMaxForHorizAndVert(testVerticalDropw);
        // this.testSetEqualCellColor(testListWhereThereIs3inOneRow);
        // console.log(testListWhereThereIs3inOneRow);
        for (let index = 0; index < this.listOfCells.length; index++) {
            for (let col = this.listOfCells[0].length; col >= 0; col--) {
                const element = this.listOfCells[index][col];
                try {
                    // if(cellsToBeUpdated.length === 0){
                    //     element.draw();
                    //     const textX = element.x + element.width / 2;
                    //     const textY = element.y + element.height * 2/3;
                    //     displayText(`${element.arrayROW}-${element.arrayCOL}`, textX, textY);
                    // }
                    //  else 
                     if(false){ // Horizontal
                        // testResult = getRowAndColMinMaxForHorizontal(cellsToBeUpdated[0]);
                        if(element.arrayROW <= testResult.rowMin && element.arrayCOL >= testResult.colMin && element.arrayCOL <= testResult.colMax){
                            // element.update();
                            // element.cellColor = "white";
                            element.updateBySomeAmount(possibleCellHW);
                        }
                        cellsToBeUpdated.pop();
                    }else if(true){ // Verticaly
                        if(element.arrayROW <= testResult.rowMax && element.arrayCOL >= testResult.colMin && element.arrayCOL <= testResult.colMax){
                            // element.update();
                            // element.cellColor = "white";
                            element.updateBySomeAmount(possibleCellHW*(testResult.rowMax-testResult.rowMin+1));
                        }
                    }
                    // if(element.arrayROW <= testResult.row && element.arrayCOL >= testResult.colMin && element.arrayCOL <= testResult.colMax){
                    //     // element.update();
                    //     // element.cellColor = "white";
                    //     element.updateBySomeAmount(50*5);
                    // }
                    // if(element.arrayROW !== 4 && !(element.arrayCOL > 3 && element.arrayCOL < 7)){ // Update only if it is NOT part of three in row?
                    //     // it even posible to pass that value effeciently?
                    //     element.update();
                    // }
                } catch (error) {
                    
                }
            }
        }
    }    
    
    updateAllDown(){
        for (let row = 0; row < this.listOfCells.length-1; row++) {
            for (let col = 0; col < this.listOfCells[0].length; col++) {
                this.listOfCells[row][col].y += 0.5;
                // element.y+= 2;
            }
        }
    }

    moveDownIfSomethingIsMissing(){
        for (let row = this.listOfCells.length-1; row >= 0; row--) {
            for (let col = 0; col < 10; col++) {
                let element = this.listOfCells[row][col];
                if(element){ // from 2048 GAME if element is not 0 it can be moved down // element !== 0
                    // if element exist it can be moved down ?
                    let rowIndex = this.listOfCells.length-1;
                    for (let i = row; i < this.listOfCells.length-1; i++) {
                        let nextRow = this.listOfCells[i+1][col];
                        if(!nextRow){ // from 2046 GAME if element in next cell below is not 0 all can be moved down
                            rowIndex = i;
                            break;
                        }
                    }
                    let newElem;
                    try {
                        newElem = this.listOfCells[row-1][col];
                    } catch (error) {
                        
                    }
                    this.listOfCells[row][col] = newElem;//this.listOfCells[row-1][col];//0;
                    this.listOfCells[rowIndex][col] = element;
                }
            }
        }
        // return game2DArray;
    }
}