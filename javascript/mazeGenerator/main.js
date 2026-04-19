/**
 * Handle maze algorithm selection from dropdown
 * Shows/hides appropriate controls for each algorithm
 */
function selectMazeAlgorithm() {
  const selectMaze = document.getElementById("selectMaze");
  const solveBtnRecursive_1 = document.getElementById("solveBtnRecursive_1");
  const newMazeBtnRecursive_1 = document.getElementById("newMazeBtnRecursive_1");
  const wilsonsControls = document.getElementById("wilsonsControls");
  const newMazeBtnWilsons = document.getElementById("newMazeBtnWilsons");
  const solveWilsonsMazeBtn = document.getElementById("solveWilsonsMazeBtn");
  const referenceToOLC = document.getElementById("referenceToOLC");

  switch (selectMaze.value) {
    case "recursive_1":
      // Recursive Backtracker Maze Algorithm
      isRecursiveBacktrackerSelected = true;
      otherMazeAlg = false;
      solveBtnRecursive_1.style.display = "inline-block";
      newMazeBtnRecursive_1.style.display = "inline-block";
      referenceToOLC.style.display = "inline-block";
      if (wilsonsControls) wilsonsControls.style.display = "none";
      if (newMazeBtnWilsons) newMazeBtnWilsons.style.display = "none";
      if (solveWilsonsMazeBtn) solveWilsonsMazeBtn.style.display = "none";
      break;
    case "wilsons":
      // Wilson's Maze Algorithm
      isRecursiveBacktrackerSelected = false;
      otherMazeAlg = true;
      solveBtnRecursive_1.style.display = "none";
      newMazeBtnRecursive_1.style.display = "none";
      referenceToOLC.style.display = "none";
      if (wilsonsControls) wilsonsControls.style.display = "inline";
      if (newMazeBtnWilsons) newMazeBtnWilsons.style.display = "inline-block";
      if (solveWilsonsMazeBtn) solveWilsonsMazeBtn.style.display = "inline-block";
      break;
    default:
      break;
  }
}

/**
 * Solve the Wilson's maze by finding the shortest path from start to end
 * Display the solution as a lime-colored line on the canvas
 */
function solveWilsonsMazeHandler() {
  if (!wilsonsMazeFinished) {
    alert("Please generate a maze first!");
    return;
  }

  const path = solveWilsonsMaze(ROWS, COLS);
  wilsonsSolutionPath = path;
}
