class Pipe extends Position {
  constructor(x, y, w, h) {
    super(x, y);
    this.w = w;
    this.h = h; // random from flappyMain.js
    this.y2 = this.h + PIPE_GAP;
    this.h2 = H;
  }
  draw() {
    CTX.fillStyle = "red";
    CTX.fillRect(this.x, this.y, this.w, this.h);
    CTX.fillRect(this.x, this.y2, this.w, this.h2);
  }

  update() {
    this.x -= 2;
    if (this.x < 0) {
      this.x = W - 20;
      this.h = getRndInteger(0, H - PIPE_GAP);
      this.y2 = this.h + PIPE_GAP;
    }
  }
}
