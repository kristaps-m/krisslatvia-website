function p5JSdisplayGrid({
  canvasHeight: h,
  canvasWidth: w,
  oneSquareSize: oneSquareSize,
  strokeStyle: strokeStyle,
  girdLineWidth: girdLineWidth = 1,
}) {
  // Draw vertical grid lines
  stroke(strokeStyle);
  strokeWeight(girdLineWidth);
  for (let x = 0; x <= w; x += oneSquareSize) {
    line(x, 0, x, h);
  }

  // Draw horizontal grid lines
  for (let y = 0; y <= h; y += oneSquareSize) {
    line(0, y, w, y);
  }
}
