// ==================== CELL CLASS ====================
class HexCell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.minesAround = 0;
        this.isOpen = false;
        this.isFlagged = false;
    }
}