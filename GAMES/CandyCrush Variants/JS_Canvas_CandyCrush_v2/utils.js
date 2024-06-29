const GAME_COLORS = ["red", "blue", "yellow", "green"];//,"purple"];//,"brown","pink","lightblue","lightgreen"];

function getRndInteger(min, max) { // random number between min and max (both included):
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayText(theText, x, y){
    let fSize = 13;
    CTX.font = `italic bold ${fSize}px Comic Sans MS`;
    CTX.textAlign = "center";
    CTX.fillStyle = 'black';
    CTX.fillText(theText, x, y); 
}

function getRowAndColMinMaxForHorizAndVert(theArray){
    let rowMin, rowMax, colMin, colMax;
    rowMin = theArray[0].x;
    rowMax = theArray[theArray.length -1].x
    colMin = theArray[0].y;
    colMax = theArray[theArray.length -1].y;

    return {rowMin:rowMin,rowMax:rowMax, colMin:colMin, colMax:colMax};
}