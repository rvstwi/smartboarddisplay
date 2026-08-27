//original 1337 Matrix by Pavitra Golcha
//https://codepen.io/pavi2410/pen/oNjGVgM
//adapted for smartboard by Mr L


// Configuration state for the Matrix effect
const state = {
  fps: 20,              // Frames per second - def 30
  bgOpacity: 0.06,       // Background fade opacity (creates trail effect) - def 0.05
  color: "rgb(47, 255, 0)",        // Text color (Matrix green) - def #0f0
  charset: "0123456789abcdefghijkmpqrstuvwxyzchლჸႬႡ",        // Characters to display - def 01
  size: 15              // Font size in pixels - def 20
};

//added to remove old video background
var oldvideo = document.getElementById('backgroundvid');
oldvideo.pause();
oldvideo.style = "display: none;"

// Get canvas and drawing context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Canvas dimensions and column positions
let w, h, colYPos;

// Resize canvas to fit window and reinitialize column positions
const resize = () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  
  // Create array to track y-position of each column
  // Each column starts at y = 0 (top of screen)
  const numCols = Math.ceil(w / state.size);
  colYPos = Array(numCols).fill(0);
};

// Listen for window resize
window.addEventListener("resize", resize);

// Initial setup
resize();

// Helper function to pick random item from array
const random = (items) => items[Math.floor(Math.random() * items.length)];
const randomRange = (start, end) => start + end * Math.random();

// Draw one frame of the Matrix effect
const draw = () => {
  // Draw semi-transparent black rectangle to create fading trail effect
  ctx.fillStyle = `rgba(0,0,0,${state.bgOpacity})`;
  ctx.fillRect(0, 0, w, h);
  
  // Set text style
  ctx.fillStyle = state.color;
  ctx.font = state.size + "px monospace";
  
 // console.log({h})
  
  // Draw and update each column
  for (let i = 0; i < colYPos.length; i++) {
    const yPos = colYPos[i];
    
    // Calculate x position for this column
    const xPos = i * state.size;
    
    // Draw random character at current position
    ctx.fillText(random(state.charset), xPos, yPos);
    
    // Update position for next frame
    // Reset to top if: reached bottom OR random chance (creates varying trail lengths)
    const reachedBottom = yPos >= h;
    const randomReset = yPos >= randomRange(100, 5000);
    
    if (reachedBottom || randomReset) {
      colYPos[i] = 0; // Reset to top
    } else {
      colYPos[i] = yPos + state.size; // Move down
    }
  }
};

// Animation loop with FPS control using setInterval
let intervalId = setInterval(draw, 1000 / state.fps);
