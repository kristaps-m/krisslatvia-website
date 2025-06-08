class MyObject {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "white";
    this.isEmpty = true;
  }

  draw() {
    if (!this.isEmpty) {
      fill(this.color);
    }
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.x += 2;
    if (this.x >= W) {
      this.x = 0;
    }
  }
}
