export class Square {
    constructor(game, width, height, top, left){
        this.game = game;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.squareColor = '#8c8382';
    }

    update(){

    }

    draw(context){
        context.fillStyle = this.squareColor;
        context.fillRect(this.top, this.left, this.width, this.height);
    }
}