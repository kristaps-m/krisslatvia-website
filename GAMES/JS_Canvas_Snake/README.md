## Step by step:

- create 3 files .html .css .js
- add canvas tag inside html
- add border to canvas in css
- https://www.w3schools.com/html/html5_canvas.asp How to get started with canvas in js file.
- how to draw square on canvas?
- got red square on cavnas.
- forsed square to move +x direction;
- forse snake (square) move by its size each time tick
- create Food class;
- and create functionality for eating and generating new food if eaten;
- food is not generated inside tail
- if your move to right you can't move backwards to left (if up can't down)
- teleport snake if snake goes out of Canvas;

### My Google seaches:

- html js self call function with settimeout.

  - answer: https://stackoverflow.com/questions/24803494/settimeout-with-self-executing-function
    - ```
          (function cycle(i){
          console.log("tick, ID: " + i);
          setTimeout(cycle, 2000, i+1);
          })(0);
      ```

- Uncaught SyntaxError: Cannot use import statement outside a module (at draw.js:1:1)
  - Solution <script type="module" src="draw.js"></script> add type: "module"
- clear canvas after drawing
  - Solution: https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
  - Do this before drawing: ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
- js switch statement with OR
  - https://stackoverflow.com/questions/6513585/test-for-multiple-cases-in-a-switch-like-an-or
- JS all ways to add to array
- JS canvas display text

### My Chat GPT questions:

- Can I use onclick function with html button if functions is inside script with type=module?
- Hello I need your help. I have `<canvas id="snake_canvas" width="500" height="400"></canvas>` I want to draw vertical and horizontal lines every `const oneSquareSize = 10;` pixels. How can I do that most efisently.
