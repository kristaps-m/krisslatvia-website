function selectMazeAlgorithm() {
  const selectMaze = document.getElementById("selectMaze");
  const solveBtnRecursive_1 = document.getElementById("solveBtnRecursive_1");
  const newMazeBtnRecursive_1 = document.getElementById(
    "newMazeBtnRecursive_1",
  );
  console.log(selectMaze.value);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch (selectMaze.value) {
    case "recursive_1":
      // Recursive Backtracker Maze Algorithm
      isRecursiveBacktrackerSelected = true;
      otherMazeAlg = false;
      solveBtnRecursive_1.style.display = "inline-block";
      newMazeBtnRecursive_1.style.display = "inline-block";
      break;
    case "otherAlg":
      // Recursive Backtracker Maze Algorithm
      isRecursiveBacktrackerSelected = false;
      otherMazeAlg = true;
      solveBtnRecursive_1.style.display = "none";
      newMazeBtnRecursive_1.style.display = "none";
      break;
    default:
      break;
  }
}
