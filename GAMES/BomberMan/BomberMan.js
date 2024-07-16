class BomberMan {
  constructor({ x, y, size }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = "pink";
    this.moveDir = "";
  }

  isNotZero(n) {
    return n !== 0 ? bManMovementSpeed + 2 : n;
  }

  update() {
    // this.x += vxl;
    // this.x += vxr;
    // this.y += vyu;
    // this.y += vyd;
    if (this.x < 1) {
      this.x = 1;
    } else if (this.x >= W - this.size) {
      this.x = W - this.size - 1;
    } else if (this.y < 1) {
      this.y = 1;
    } else if (this.y >= H - this.size) {
      this.y = H - this.size - 1;
    }

    if (
      !this.checkCollision(
        this.x + this.isNotZero(vxl) + this.isNotZero(vxr),
        this.y + this.isNotZero(vyu) + this.isNotZero(vyd),
        firstTestGameField
      )
    ) {
      // this.x = newX;
      // this.y = newY;
      this.x += vxl;
      this.x += vxr;
      this.y += vyu;
      this.y += vyd;
    } else {
      if (
        this.checkCollision(
          this.x + this.isNotZero(vxl) + this.isNotZero(vxr),
          this.y + this.isNotZero(vyu) + this.isNotZero(vyd),
          firstTestGameField
        )
      ) {
        /** If collision is detected
         * and BomberMan is past middle point of square
         * code below helps him move where he wants to.
         *
         * with out code below BomberMan will be forsed to move
         * pixel perfect between squares.
         */
        const currentSquareMoveForX = Math.floor(this.x / bManRadius);
        const c_S_M_F_Y = Math.floor(this.y / bManRadius);
        // console.log(this.x, currentSquareMoveForX);
        if (
          (vyd > 0 || vyu < 0) &&
          currentSquareMoveForX % 2 !== 0 &&
          this.x > currentSquareMoveForX * bManRadius + 8
        ) {
          this.x += bManMovementSpeed;
        } else if (
          (vyd > 0 || vyu < 0) &&
          currentSquareMoveForX % 2 !== 1 &&
          this.x < currentSquareMoveForX * bManRadius + (8 + bManRadius)
        ) {
          this.x -= bManMovementSpeed;
        }
        // FOR Y MOVEMENT
        else if (
          (vxr > 0 || vxl < 0) &&
          c_S_M_F_Y % 2 !== 0 &&
          this.y > c_S_M_F_Y * bManRadius + 8
        ) {
          this.y += bManMovementSpeed;
        } else if (
          (vxr > 0 || vxl < 0) &&
          c_S_M_F_Y % 2 !== 1 &&
          this.y < c_S_M_F_Y * bManRadius + (8 + bManRadius)
        ) {
          this.y -= bManMovementSpeed;
        }
      }
      // console.log(
      //   "Collision detected. Movement blocked." + ` ${this.x}-${this.y}`
      // );
    }
  }

  draw() {
    CTX.fillStyle = "gray";
    CTX.fillRect(this.x, this.y, this.size, this.size);
  }

  checkCollision(newX, newY, gameField) {
    const bomberManSize = this.size;

    for (let row = 0; row < Math.floor(W / bManRadius) - 1; row++) {
      for (let col = 0; col < Math.floor(H / bManRadius) - 1; col++) {
        const fieldSquare = gameField[col][row];
        if (fieldSquare === 1) {
          // Black square
          const squareX = row * bManRadius;
          const squareY = col * bManRadius;
          const squareSize = bManRadius;

          // Check if the new position collides with a black square
          if (
            newX < squareX + squareSize &&
            newX + bomberManSize > squareX &&
            newY < squareY + squareSize &&
            newY + bomberManSize > squareY
          ) {
            return true; // Collision detected
          }
        }
      }
    }

    return false; // No collision
  }

  moveKeyDown(direction) {
    switch (direction) {
      case "ArrowUp":
      case "w":
        vyu = -bManMovementSpeed;
        this.moveDir = "up";
        break;
      case "ArrowDown":
      case "s":
        vyd = bManMovementSpeed;
        this.moveDir = "down";
        break;
      case "ArrowLeft":
      case "a":
        vxl = -bManMovementSpeed;
        this.moveDir = "left";
        break;
      case "d":
      case "ArrowRight":
        vxr = bManMovementSpeed;
        this.moveDir = "right";
        break;
      case "v":
        console.log(`x-${this.x},y-${this.y} ${this.x + bManRadius / 2} ${this.y + bManRadius / 2}`);
        break;
      case "f":
        /**
         * So we need to put bomb precisely in crossection of row and colums
         */
        const preciseBomb_X_Position = Math.floor((this.x + bManRadius / 2) / bManRadius) * bManRadius;
        const preciseBomb_Y_Position = Math.floor((this.y + bManRadius / 2) / bManRadius) * bManRadius;
        listOfBombs.ListOfBombs.push(new Bomb(preciseBomb_X_Position, preciseBomb_Y_Position, bManRadius));
        console.log(listOfBombs.ListOfBombs);
        break;
      default:
        console.log("NOT direction", direction);
        break;
    }
  }

  moveKeyUp(direction) {
    switch (direction) {
      case "ArrowUp":
      case "w":
        vyu = 0;
        this.moveDir = "";
        break;
      case "ArrowDown":
      case "s":
        vyd = 0;
        this.moveDir = "";
        break;
      case "ArrowLeft":
      case "a":
        vxl = 0;
        this.moveDir = "";
        break;
      case "d":
      case "ArrowRight":
        vxr = 0;
        this.moveDir = "";
        break;
    }
  }
}
