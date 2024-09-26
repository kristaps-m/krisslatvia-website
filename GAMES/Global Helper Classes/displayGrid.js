function displayGrid({ctx:ctx, strokeStyle:strokeStyle, girdLineWidth:girdLineWidth = 1,
  oneSquareSize:oneSquareSize, canvasHeight:h, canvasWidth:w
}) {
    // Draw vertical grid lines
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = girdLineWidth;
    for (let x = 0; x <= w; x += oneSquareSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= h; y += oneSquareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
}