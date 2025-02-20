class Circle{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isDragging = false;
  }


  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  isMouseInside(mx, my) {
    const distance = Math.sqrt((mx - this.x) ** 2 + (my - this.y) ** 2);
    return distance < this.radius;
  }
};

const canvas = document.getElementById('homepage_canvas');
const ctx = canvas.getContext('2d');
const WIDTH = 400;
const HEIGHT = 400;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const circle = new Circle(20,20,20,'blue');
// circle.draw();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circle.draw();
  requestAnimationFrame(animate);
}

animate();
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (circle.isMouseInside(mouseX, mouseY)) {
    circle.isDragging = true;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (circle.isDragging) {
    const rect = canvas.getBoundingClientRect();
    circle.x = e.clientX - rect.left;
    circle.y = e.clientY - rect.top;
  }
});

canvas.addEventListener('mouseup', () => {
  circle.isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
  circle.isDragging = false;
});
