import { Player } from "./player.js";
import { Square } from "./square.js";
// https://www.youtube.com/watch?v=c-1dBd1_G8A&ab_channel=Frankslaboratory
// @ 11:30
window.addEventListener('load', function(){
    const canvas = document.getElementById("myCanvas");
    const elemLeft = canvas.offsetLeft;
    const elemTop = canvas.offsetTop;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            //this.player = new Player(this);
            this.gameField = [];
            this.squareOffSet = 10;
            this.gameSize = 3;
            this.elements = [];
        }

        createGamefield(){
            for (let row = 0; row < this.gameSize; row++) {
                let tempRow = [];
                for (let col = 0; col < this.gameSize; col++) {
                    tempRow.push('');
                }
                this.gameField.push(tempRow);
            }
        }
        update(){

        }

        draw(context){
            //this.player.draw(context);
            let elemH = this.height / 3 - this.squareOffSet*2;
            let elemW = this.width / 3 - this.squareOffSet*2;
            for (let row = 0; row < this.width; row+=this.width/3) {
                for (let col = 0; col < this.height; col+=this.height/3) {
                    // const oneElement = {colour: elemColor, width: elemW, height: elemH, top: row+squareOffSet, left: col+squareOffSet}
                    // elements.push(oneElement);
                    let square = new Square(row+this.squareOffSet, col+this.squareOffSet, elemW, elemH);
                    this.elements.push(square);
                    square.draw(context);//, row+this.squareOffSet, col+this.squareOffSet, elemW, elemH);
                }
            }
        }
    }

    canvas.addEventListener('click', function(event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop - 74;
        console.log(x, y);
        // let gameResultState = checkWiner(gameField);
        elements.forEach(function(element) {
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                // alert('clicked an element');
                // element.colour = 'red';
                console.log(element, currentPlayerColor);
                gameField[Math.floor(y / (width / 3))][Math.floor(x / (height / 3))] = currentPlayerColor;
                context.fillStyle = currentPlayerColor;
                context.fillRect(element.left, element.top, element.width, element.height);
                console.log(gameField);
                updateVariableDisplay();
                currentPlayerColor = currentPlayerColor === p2Color ? p1Color : p2Color;
                if(gameResultState !== false){
                    context.fillStyle = '#8c8382';
                    currentPlayerColor = '#8c8382';
                }
                // if(checkWiner(gameField) !== false){
                //     alert(`Winner ${currentPlayerColor}`);
                // }
            }
        });

    }, false);

    const game = new Game(canvas.width, canvas.height);
    game.createGamefield();
    console.log(game);

    function animate() {
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();
})