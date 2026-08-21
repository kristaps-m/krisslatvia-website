
// ==================== HELPER FUNCTIONS ====================
function isInBounds(row, col) {
    return row >= 0 && row < FIELD_SIZE && col >= 0 && col < FIELD_SIZE;
}

function getHexNeighbors(row, col) {
    const neighbors = [];
    const offsets = (row % 2 === 0) ? HEX_NEIGHBORS_EVEN_ROW : HEX_NEIGHBORS_ODD_ROW;
    
    for (const [dr, dc] of offsets) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (isInBounds(newRow, newCol)) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }
    return neighbors;
}

function getHexagonPosition(row, col) {
    const x = row * HEX_SPACING_X + 50;
    let y = col * HEX_SPACING_Y + 50;
    if (row % 2 === 1) {
        y += 25;
    }
    return { x, y };
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}

/**
 * Get hexagon vertices for point-in-polygon hit detection
 */
function getHexagonVertices(centerX, centerY) {
    const numberOfSides = 6;
    const size = HEX_SIZE;
    const step = (2 * Math.PI) / numberOfSides;
    const shift = Math.PI / 180.0; // Small rotation to align hexagon
    
    const vertices = [];
    for (let i = 0; i < numberOfSides; i++) {
        const curStep = i * step + shift;
        vertices.push({
            x: centerX + size * Math.cos(curStep),
            y: centerY + size * Math.sin(curStep)
        });
    }
    return vertices;
}

/**
 * Check if a point is inside a hexagon using ray casting algorithm
 */
function isPointInHexagon(pointX, pointY, vertices) {
    let inside = false;
    
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x;
        const yi = vertices[i].y;
        const xj = vertices[j].x;
        const yj = vertices[j].y;
        
        const intersects = ((yi > pointY) !== (yj > pointY)) &&
            (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
        
        if (intersects) {
            inside = !inside;
        }
    }
    return inside;
}

/***
 * If it is true then it draws game field again and show each cell info from 2D gameField array and prints clicked cell in console.
 */
function toggleShowDebugInfo() {
    showDebugInfo = !showDebugInfo;
    drawGrid();
}

function toggleWidthAndHeightChange(x) { 
    console.log(x, x.value, x.id);
    let fieldHeight =  document.getElementById("theHeight");
    let theWidth =  document.getElementById("theWidth");

    if (x.id === "theWidth"){
        fieldHeight.value = x.value;
    } else if (x.id === "theHeight") {
        theWidth.value = x.value;
    }
}