/**
    const WIDTH = 400;
    const HEIGHT = 400;
    const RECT_EDGE_SIZE = 20;
 */
let direction = 'right';
let isGameOver = false;
// tail = [new SnakeCell(RECT_EDGE_SIZE, RECT_EDGE_SIZE),new SnakeCell(RECT_EDGE_SIZE * 2, RECT_EDGE_SIZE), new SnakeCell(RECT_EDGE_SIZE*3,RECT_EDGE_SIZE),
//     new SnakeCell(RECT_EDGE_SIZE*4,RECT_EDGE_SIZE), new SnakeCell(RECT_EDGE_SIZE*5,RECT_EDGE_SIZE), new SnakeCell(RECT_EDGE_SIZE*6,RECT_EDGE_SIZE),
// ];
let head = new SnakeCell(tail[tail.length -1].x, tail[tail.length -1].y);
let food = gerateFood();
let coutFrames = 0;

function drawGame() {
    for (let index = 0; index < tail.length; index++) {
        const element = tail[index];
        element.draw(ctx);
    } 

    food.draw(ctx, "darkgreen", "lightgreen");
}

function gerateFood() {
    let food;
    let isInTail = true;
    while (isInTail) {
        const x = randInt(0, Math.floor(W / RECT_EDGE_SIZE));
        const y = randInt(0, Math.floor(H / RECT_EDGE_SIZE));
        food = new SnakeCell(x * RECT_EDGE_SIZE, y * RECT_EDGE_SIZE);
        tail.forEach((e) => {
            if (food.x != x && food.y != y) {
                isInTail = false;
            }
        })              
    }

    return food;
}

function randInt(min, max) {
    return Math.floor(Math.random() * max + min) + min;
}

function runInSelfCheck() {
    for (let i = 0; i < tail.length - 3; i++) {
        const e = tail[i];
        if (head.x == e.x && head.y == e.y) {
            isGameOver = true; document.getElementById("theTitle").textContent = "Da Snake - GAME OVER! - run in tail.";                    
        }             
    }
}

window.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k === "d" && direction != 'left'){
        direction = 'right';
    } else if (k === "s" && direction != 'up') {
        direction = 'down';
    } else if (k === "a" && direction != 'right') {
        direction = 'left';
    } else if (k === "w" && direction != 'down') {
        direction = 'up';
    }
    if (k === "x") {
        tail.push(new SnakeCell(head.x, head.y));
    }
    if(k === "p"){
        isGameOver = !isGameOver; 
        document.getElementById("theTitle").textContent = `Da Snake${isGameOver ? " - PAUSE !" : ""}`;
    }
})