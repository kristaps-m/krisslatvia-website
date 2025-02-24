const canvas = document.getElementById("homepage_canvas");
const ctx = canvas.getContext("2d");
let WIDTH;// = 550;
let HEIGHT;// = 400;
const sc_Width = window.screen.width;
if (sc_Width <= 600){
  WIDTH = sc_Width - 20;
  HEIGHT = sc_Width + 20;
} else{ WIDTH = 550; HEIGHT = 400}
canvas.width = WIDTH;
canvas.height = HEIGHT;
const rayCount = 100;
let boundries = [];
multipleBoundries(); // add random boundries and outer walls;
const partilce = new Particle(WIDTH / 2, HEIGHT / 2);
const ray = new Ray(100, 200);
const testObject_1 = new TestObject(WIDTH - 60, 60, 30, 30);
const testObject_2 = new TestObject(60, HEIGHT - 60, 30, 30);
let testObjectList = [];
testObjectList.push(testObject_1);
testObjectList.push(testObject_2);
let isTestObject_1_hit = false;
let framesCounter = 0;
let mouseX = 0;
let mouseY = 0;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchStartedInsideCanvas = false; // Flag to check where touch started

function animate() {
  if (framesCounter % 3 === 0) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let b of boundries){
      b.draw(ctx);
    }
    if(sc_Width > 600){
      partilce.update(mouseX, mouseY);
    }
    partilce.look(boundries);
    partilce.checkHitTestObject(testObjectList, boundries);
    for (let testObject of testObjectList){
      testObject.drawTestObject();
    }
    if (testObject_1.color === "red") {
      updateHTML("gitHub", "GitHub: github.com/kristaps-m");
    } else {
      updateHTML("gitHub", "GitHub: ?");
    }
  }
  if (framesCounter === 1000000) {
    framesCounter = 0;
  }
  requestAnimationFrame(animate);
  framesCounter++;
}

animate();

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect(); // Get canvas position
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function getTouchPos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top
  };
}

document.addEventListener("touchstart", function (event) {
  if (canvas.contains(event.target)) {
    touchStartedInsideCanvas = true;

    const touchPos = getTouchPos(event);
    touchStartX = touchPos.x;
    touchStartY = touchPos.y;

    partilce.update(touchStartX, touchStartY);
  } else {
      touchStartedInsideCanvas = false;
  }
});


document.addEventListener("touchmove", function (event) {
  if (!touchStartedInsideCanvas) return;

  const touchPos = getTouchPos(event);
  touchEndX = touchPos.x;
  touchEndY = touchPos.y;

  partilce.update(touchEndX, touchEndY);
});

function updateHTML(elementId = "", newText = "") {
  const htmlTextToGet = document.getElementById(elementId);
  if(htmlTextToGet) {htmlTextToGet.textContent = newText;}
}

function multipleBoundries() {
  for (let i = 0; i < 8; i++) {
    const x1 = Math.random() * WIDTH;
    const x2 = Math.random() * WIDTH;
    const y1 = Math.random() * HEIGHT;
    const y2 = Math.random() * HEIGHT;
    boundries.push(new Boundary(x1, y1, x2, y2));
  }

  // ADD outer walls;
  boundries.push(new Boundary(0, 0, WIDTH, 0));
  boundries.push(new Boundary(0, 0, 0, HEIGHT));
  boundries.push(new Boundary(WIDTH, 0, WIDTH, HEIGHT));
  boundries.push(new Boundary(0, HEIGHT, WIDTH, HEIGHT));
}