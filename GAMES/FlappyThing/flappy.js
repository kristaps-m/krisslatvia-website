class Flappy extends Position {
  constructor(x, y, w, h) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.gravity = 0.08;
    this.start = 2;
  }

  draw() {
    CTX.fillStyle = "black";
    CTX.fillRect(this.x, this.y, 20, 20);
  }

  update() {
    if (this.y + this.h + 8 <= H) {
      this.y += this.start;
    }
    this.start += this.gravity;
  }

  jumpUp() {
    this.y -= 60;
    if (this.y < 0) {
      this.y = 1;
    }
    this.start = 2;
  }

  detectIfHitPipe(pipes) {
    for (let i = 0; i < pipes.length; i++) {
      const elem = pipes[i];
      if (
        // TOP PIPE
        (this.x + this.w >= elem.x &&
          this.y >= elem.y &&
          this.y <= elem.y + elem.h) ||
        // BOTTOM PIPE
        (this.x + this.w >= elem.x &&
          this.y + this.h >= elem.y2 &&
          this.y + this.h <= elem.h2)
      ) {
        return true;
      }
    }

    return false;
  }
}
