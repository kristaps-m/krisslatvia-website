class Position{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  normalizeVector() {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    if (magnitude === 0) return { x: 0, y: 0 }; // Avoid division by zero
    return { x: this.x / magnitude, y: this.y / magnitude };
  }
}
