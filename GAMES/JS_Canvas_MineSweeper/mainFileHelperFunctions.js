function transformArray(theArray) {
  let newArray = [];
  theArray.forEach((c) => {
    newArray.push({ squareRender: { ...c } });
  });

  return newArray;
}

// GAME TIMER
function updateGameTimer() {
  CTX_TIMER.font = "bold 25px Comic Sans MS";
  CTX_TIMER.textAlign = "center";
  CTX_TIMER.fillStyle = "red";
  const textX = 50;
  const textY = 25;
  CTX_TIMER.fillText(gameTimer, textX, textY);
}
setInterval(() => {
  if (!isPaused) {
    CTX_TIMER.clearRect(0, 0, 100, 30);
    updateGameTimer();
    gameTimer++;
    if (gameTimer % 20 === 0) {
      cheat = [];
    }
  }
}, 1000);

// check cheat
function cheatIfCheatEntered() {
  if (cheat.join("").includes("kivi apelsins")) {
    return true;
  }

  return false;
}

function toggleIsFirstClickMine() {
  const areYouSure = confirm("This will start new game! Sure??");
  if (areYouSure) {
    withFirstClickYouCanHitMine = !withFirstClickYouCanHitMine;
    let firstClick = document.getElementById("isFirstClickMine");
    firstClick.textContent = `${withFirstClickYouCanHitMine}`;
    newGame();
  }
}

function toggleDigforminesOrFlag() {
  doesClickDigs = !doesClickDigs;
  let digOrFlag = document.getElementById("digOrFlag");
  digOrFlag.style.color = doesClickDigs ? "black" : "red";
  digOrFlag.style.backgroundColor = doesClickDigs ? "lightsalmon" : "lightgreen";
  digOrFlag.textContent = doesClickDigs ? `DIG` : `FLAG 🚩`;
}

function setGameSettingsFromDropDownMenu() {
  difficulty = document.getElementById("difficulty").value.split(" ");
  document.getElementById("theHeight").value = difficulty[0];
  document.getElementById("theWidth").value = difficulty[1];
  document.getElementById("minesCount").value = difficulty[2];
}
function gameOverAllMinesReveal(cellsToDraw) {
  for (let row = 0; row < cellsToDraw.length; row++) {
    for (let col = 0; col < cellsToDraw[0].length; col++) {
      const CELL = cellsToDraw[row][col];
      if (CELL.isMine) {
        CTX.fillStyle = "red";
        CTX.fillRect(
          CELL.squareRender.left,
          CELL.squareRender.top,
          CELL.squareRender.width,
          CELL.squareRender.height
        );
      }
    }
  }
}

function isCellsInsideMinesRevealSquare(a, mx, my) {
  a.forEach((r) => {
    r.forEach((c) => {
      const cs = c.squareRender;
      if (
        cs.left > mx &&
        cs.top > my &&
        cs.left + cs.width < mx + cheatSquareSidePx - cheatSquareOffSet &&
        cs.top + cs.height < my + cheatSquareSidePx - cheatSquareOffSet
      ) {
        CTX.strokeStyle = "red";
        CTX.lineWidth = 3;
        CTX.beginPath();
        CTX.rect(cs.left, cs.top, cs.width, cs.height);
        CTX.stroke();
        // -----------
        if (c.minesAround > 0 && !c.isMine) {
          CTX.font = "bold 15px Comic Sans MS";
          CTX.textAlign = "center";
          CTX.fillStyle = "black";
          const textX = c.squareRender.left + c.squareRender.width / 2;
          const textY = c.squareRender.top + c.squareRender.height / 2 + CELL_OFF_SET * 3;
          CTX.fillText(c.minesAround, textX, textY);
        } else if (c.isMine) {
          CTX.fillStyle = "darkblue";
          const bSqOffS = 5;
          CTX.fillRect(
            cs.left + bSqOffS,
            cs.top + bSqOffS,
            cs.width - bSqOffS * 2,
            cs.height - bSqOffS * 2
          );
        }
      }
    });
  });
}
