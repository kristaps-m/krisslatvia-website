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

// check cheat
function cheatIfCheatEntered() {
  if (cheat.join("").includes("kivi apelsins")) {
    return true;
  }

  return false;
}

function toggleIsFirstClickMine() {
  withFirstClickYouCanHitMine = !withFirstClickYouCanHitMine;
  let firstClick = document.getElementById("isFirstClickMine");
  firstClick.textContent = `${withFirstClickYouCanHitMine}`;
}

function toggleDigforminesOrFlag() {
  doesClickDigs = !doesClickDigs;
  let digOrFlag = document.getElementById("digOrFlag");
  digOrFlag.style.color = doesClickDigs ? "black" : "red";
  digOrFlag.style.backgroundColor = doesClickDigs
    ? "lightsalmon"
    : "lightgreen";
  digOrFlag.textContent = doesClickDigs ? `DIG` : `FLAG 🚩`;
}

function setGameSettingsFromDropDownMenu() {
  difficulty = document.getElementById("difficulty").value.split(" ");
  document.getElementById("theHeight").value = difficulty[0];
  document.getElementById("theWidth").value = difficulty[1];
  document.getElementById("minesCount").value = difficulty[2];
}
