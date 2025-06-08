function draw() {
  background(255);
  gameField.forEach((row, c) => {
    row.forEach((e, r) => {
      if (e == 1) {
        stroke("black");
        fill("red");
        strokeWeight(1);
        rect(r * oneSqSize, c * oneSqSize, oneSqSize, oneSqSize);
      } else if (e == 2) {
        fill("blue");
        strokeWeight(1);
        rect(r * oneSqSize, c * oneSqSize, oneSqSize, oneSqSize);
      }
      // noStroke();
      // strokeWeight(1);
      // stroke("black");
      // fill("black");
      // text(`${c - 1}, ${r}`, r * oneSqSize + 10, c * oneSqSize - 70);
    });
  });
  p5JSdisplayGrid({
    canvasHeight: H,
    canvasWidth: W,
    oneSquareSize: oneSqSize,
    strokeStyle: "rgb(80,80,80)",
    girdLineWidth: 6,
  });
  rectHoverWhenMouseOver(mouseX, mouseX);
  // cnv.mouseMoved(rectHoverWhenMouseOver());
  if (isGameWon.isWon) {
    // Style the line.
    stroke("green");
    strokeWeight(7);
    let addX = 0;
    let addY = 0;
    addX = oneSqSize / 2;
    addY = -oneSqSize / 2;
    line(
      drawWiningLine[0][0] * oneSqSize + addX,
      drawWiningLine[0][1] * oneSqSize + oneSqSize + addY,
      drawWiningLine[drawWiningLine.length - 1][0] * oneSqSize + addX,
      drawWiningLine[drawWiningLine.length - 1][1] * oneSqSize + oneSqSize + addY
    );
  }
}

function rectHoverWhenMouseOver(x = 0, y = 0) {
  // mouseX;
  // mouseY;
  const xValueForHoveringInBoundriesOfColumn = Math.floor(mouseX / oneSqSize);
  fill("rgba(102, 103, 102, 0.4)");
  strokeWeight(1);
  rect(xValueForHoveringInBoundriesOfColumn * oneSqSize, oneSqSize, oneSqSize, H - 10);

  fill(currentColor != 1 ? "rgba(255, 0, 0, 0.4)" : "rgba(0, 0, 255, 0.4)");
  strokeWeight(1);
  rect(xValueForHoveringInBoundriesOfColumn * oneSqSize, 0, oneSqSize, oneSqSize);
}
