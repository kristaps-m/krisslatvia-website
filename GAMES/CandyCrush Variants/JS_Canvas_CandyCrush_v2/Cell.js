class Cell{
    constructor(x,y,width,height, cellColor, arrayROW, arraYCOL,
        // isItOneOrZero = 0, updateCounter = 0,
        randomColorNumber = -10){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cellColor = cellColor;
        this.arrayROW= arrayROW;
        this.arrayCOL = arraYCOL
        // this.isItOneOrZero = isItOneOrZero;
        // this.updateCounter = updateCounter;
        this.randomColorNumber = randomColorNumber;
        this.run = false;
        // this.LAEC = lineAroundEachCell;
    }

    draw(){
        CTX.fillStyle = this.cellColor;
        CTX.fillRect(this.x+lineAroundEachCell, this.y+lineAroundEachCell, this.width-lineAroundEachCell*2, this.height-lineAroundEachCell*2);
    }

    updateBySomeAmount(someParamether){
        if(this.updateCounter < someParamether){ // this.y+lineAroundEachCell <= this.y+lineAroundEachCell + this.height
            this.y+=1;
            this.updateCounter+=1
            // this.y+=2;
        }
    }
    update(){
        // this.draw();
        if(this.y+lineAroundEachCell <= H - this.height){
            this.y+=0.2;
            // this.y+=2;
        }
    }
    // update(){
    //     // this.draw();
    //     if(this.updateCounter <= this.height){ // this.y+lineAroundEachCell <= this.y+lineAroundEachCell + this.height
    //         this.y+=0.2;
    //         this.updateCounter+=0.2
    //         // this.y+=2;
    //     }
    // }
}

// drag cell down only IF there is 0 cell under it.