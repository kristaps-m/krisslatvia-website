function getRndInteger(min, max) {
  // random number between min and max (both included):
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
