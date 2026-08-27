//from: Quote Poster 2 by Sicontis
//https://codepen.io/Sicontis/pen/gOBXENX
//adapted for smartboard by Mr L

//added to remove old video background
ClearBackground();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let _WIDTH = (canvas.width = vmin(80));
let _HEIGHT = (canvas.height = vmin(98));

//added from original's css
ctx.filter = "blur(50px)";
canvas.style = "background-color: #092636; display: inline;";//have to turn on display, smart board app has off by default

const numOfBokehs = 25;
let bokehArray = [];

class Bokeh {
  constructor() {
    this.size = Math.random() * 180 + 50;//made bigger
    this.x = Math.random() * (canvas.width - this.size);
    this.y = Math.random() * (canvas.height - this.size);
    this.H = Math.floor(Math.random() * 70 + 235);//changed for colors, orig 240
    this.S = Math.floor(Math.random() * 90 + 120);
    this.L = Math.floor(Math.random() * 50 + 12);
    this.angleX = Math.random() * 4 - 2;
    this.angleY = Math.random() * 4 - 2;
  }
  update() {
    this.x += Math.cos(this.angleX);
    this.y += Math.sin(this.angleY);
    if (this.x >= canvas.height - this.size || this.x <= this.size) {
      this.x -= Math.cos(this.angleX);
    }
    if (this.y >= canvas.height - this.size || this.y <= this.size) {
      this.y -= Math.sin(this.angleX);
    }
    this.angleX += 0.002;
    this.angleY += 0.002;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${this.H},${this.S}%,${this.L}%)`;
    ctx.fill();
  }
}

for (let i = 0; i < numOfBokehs; i++) {
  bokehArray.push(new Bokeh());
}

function vmin(vpPercent) {
  vpPercent = vpPercent / 100;
  let vpMinSize = Math.min(window.innerWidth, window.innerHeight);
  return vpPercent * vpMinSize;
}

function animate() {
  ctx.clearRect(0, 0, _WIDTH, _HEIGHT);
  bokehArray.forEach((bok) => {
    bok.draw();
    bok.update();
  });
  requestAnimationFrame(animate);
}

animate();
