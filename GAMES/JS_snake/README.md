### Is this snake?

### My Google seaches:

- JS time sleep
- js on press key
- javascript press arrow key

### My Chat GPT questions:

- what is the most best / efficient way to display large grid, Lets say Height 20 width 30?
- Hi. How can I add arrow key presses in JS? if arowDown {do something?}

### Some code:

````switch (event.key) {
            case "ArrowLeft":
                // Left pressed
                break;
            case "ArrowRight":
                // Right pressed
                break;
            case "ArrowUp":
                // Up pressed
                break;
            case "ArrowDown":
                // Down pressed
                console.log("Down Arrow", snakeHeadCords[0], snakeHeadCords[1]);
                break;
        }```
````

````document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        console.log("Up Arrow");
    }
    else if (e.keyCode == '40') {
        // down arrow
        let row, col = [...snakeHeadCords];
        console.log("BEFORE", row, col);
        // col--;
        row--;
        snakeHeadCords = [row,col];
        console.log("Down Arrow", row, col);
    }
    else if (e.keyCode == '37') {
       // left arrow
        console.log("Left Arrow");
    }
    else if (e.keyCode == '39') {
       // right arrow
        console.log("Right Arrow");
    }

}```
````
