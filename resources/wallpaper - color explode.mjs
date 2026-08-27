//Color Changin' by Alex Zaworski
//https://codepen.io/alexzaworski/pen/mEZvrG
//adapted for smartboard by Mr L

var c = document.getElementById("back-canvas");
var ctx = c.getContext("2d");
var cH;
var cW;
var animations = [];
var circles = [];

//create the color pickers inside a draggable div
let color1 = "#d08eff";
let color2 = "#2cffc0";
let color3 = "#31c3e7";
let color4 = "#24003e";
var bgColor = color1;
let autoclick = true;
let outer = CreateNewUI();
let colorinput = document.createElement("input");
colorinput.type = "color";
colorinput.value = color1;
outer.appendChild(colorinput);
colorinput.addEventListener("change",watchColorPicker);
let colorinput2 = document.createElement("input");
colorinput2.type = "color";
colorinput2.value = color2;
outer.appendChild(colorinput2);
colorinput2.addEventListener("change",watchColorPicker2);
let br = document.createElement("br");
outer.appendChild(br);
let colorinput3 = document.createElement("input");
colorinput3.type = "color";
colorinput3.value = color3;
outer.appendChild(colorinput3);
colorinput3.addEventListener("change",watchColorPicker3);
let colorinput4 = document.createElement("input");
colorinput4.type = "color";
colorinput4.value = color4;
outer.appendChild(colorinput4);
colorinput4.addEventListener("change",watchColorPicker4);
let br2 = document.createElement("br");
outer.appendChild(br2);
let autoinput = document.createElement("input");
autoinput.type = "checkbox";
autoinput.id = "autoclick";
autoinput.checked = autoclick;
outer.appendChild(autoinput);
autoinput.addEventListener("change",watchAutoInput);
let autoinlabel = document.createElement("label");
autoinlabel.textContent = "Auto";
autoinlabel.htmlFor = "autoclick";
outer.appendChild(autoinlabel);
let br1 = document.createElement("br");outer.appendChild(br2);

//opacity slider
let opacinput = document.createElement("input");opacinput.type = "range";opacinput.id = "opacity";opacinput.value = "100";opacinput.min = "0";opacinput.max = "100";outer.appendChild(opacinput);
opacinput.addEventListener("change",watchOpacInput);
let opacinlabel = document.createElement("label");opacinlabel.textContent = "Opacity";opacinlabel.htmlFor = "opacity";outer.appendChild(opacinlabel);
let br4 = document.createElement("br");outer.appendChild(br4);

//blend mode dropdown
let blendinput = document.createElement("select");
blendinput.innerHTML = `
<option value="normal">Normal</option>
<option value="multiply">Multiply</option>
<option value="screen">Screen</option>
<option value="overlay">Overlay</option>
<option value="darken">Darken</option>
<option value="lighten">Lighten</option>
<option value="color-dodge">Color dodge</option>
<option value="color-burn">Color burn</option>
<option value="hard-light">Hard light</option>
<option value="soft-light">Soft light</option>
<option value="difference">Difference</option>
<option value="exclusion">Exclusion</option>
<option value="hue">Hue</option>
<option value="saturation">Saturation</option>
<option value="color">Color</option>
<option value="luminosity">Luminosity</option>
`;
outer.appendChild(blendinput);
blendinput.addEventListener("change",watchBlendPicker);


let mymenu = CreateDefaultContextMenu(outer);

function watchBlendPicker (event) {
  $(c).css('mixBlendMode', event.target.value );
}

function watchOpacInput (event) {
  let i = 0.01 * event.target.value;
  $(c).css('opacity', `${i}`);
}

function watchAutoInput (event) {
  autoclick = !autoclick;
}

function watchColorPicker (event) {
    color1 = event.target.value;
}

function watchColorPicker2 (event) {
    color2 = event.target.value;
}

function watchColorPicker3 (event) {
    color3 = event.target.value;
}

function watchColorPicker4 (event) {
    color4 = event.target.value;
}

var colorPicker = (function() {
  var colors = [color1, color2, color3, color4];
  var index = 0;
  function next() {
    colors = [color1, color2, color3, color4];//update in case picker changed
    index = index++ < colors.length-1 ? index : 0;
    return colors[index];
  }
  function current() {
    return colors[index]
  }
  return {
    next: next,
    current: current
  }
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
  document.addEventListener("touchstart", handleEvent);
  document.addEventListener("mousedown", handleEvent);
};

function handleEvent(e) {
    if (e.touches) { 
      e.preventDefault();
      e = e.touches[0];
    }
    var currentColor = colorPicker.current();
    var nextColor = colorPicker.next();
    var targetR = calcPageFillRadius(e.pageX, e.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;
    
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
    });
    
    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor
      },
      opacity: 1
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
    });
    
    var particles = [];
    for (var i=0; i<32; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

var animate = anime({
  duration: Infinity,
  update: function() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

var resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
  }
  window.addEventListener("resize", resizeCanvas);
  addClickListeners();
//  if (!!window.location.pathname.match(/fullcpgrid/)) {
    startFauxClicking();
//  }
  handleInactiveUser();
})();

function handleInactiveUser() {
  var inactive = setTimeout(function(){
    fauxClick(cW/2, cH/2);
  }, 2000);
  
  function clearInactiveTimeout() {
    clearTimeout(inactive);
    document.removeEventListener("mousedown", clearInactiveTimeout);
    document.removeEventListener("touchstart", clearInactiveTimeout);
  }
  
  document.addEventListener("mousedown", clearInactiveTimeout);
  document.addEventListener("touchstart", clearInactiveTimeout);
}

function startFauxClicking() {
  setTimeout(function(){
    if ( autoclick ) {
      fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
    }
    startFauxClicking();
  }, anime.random(1400, 2600));
}

function fauxClick(x, y) {
  var fauxClick = new Event("mousedown");
  fauxClick.pageX = x;
  fauxClick.pageY = y;
  document.dispatchEvent(fauxClick);
}
