//by Mr L
//do what you want with it, just give credit

let controls = CreateNewUI();
let menu = CreateDefaultContextMenu(controls);
let grid = CreateForegroundLayer();

let gsize = 40;
let gdivide = 5;
let gtransp = 40;
let gcolor = "#ffffff";

//create controls

//color input
let gcolorinput = document.createElement("input");
gcolorinput.type = "color";
gcolorinput.value = gcolor;
controls.appendChild(gcolorinput);
gcolorinput.addEventListener("change",watchColorPicker);
let br2 = document.createElement("br");controls.appendChild(br2);

//size slider
let gsizeinput = document.createElement("input");
gsizeinput.type = "range";
gsizeinput.id = "size";
gsizeinput.value = gsize;
gsizeinput.min = "10";
gsizeinput.max = "100";
controls.appendChild(gsizeinput);
gsizeinput.addEventListener("change",watchSizeInput);
let gsizeinlabel = document.createElement("label");
gsizeinlabel.textContent = "Size";
gsizeinlabel.htmlFor = "size";
controls.appendChild(gsizeinlabel);
let br = document.createElement("br");controls.appendChild(br);

//divide slider
let gdivideinput = document.createElement("input");
gdivideinput.type = "range";
gdivideinput.id = "divide";
gdivideinput.value = gdivide;
gdivideinput.min = "3";
gdivideinput.max = "10";
controls.appendChild(gdivideinput);
gdivideinput.addEventListener("change",watchDivideInput);
let gdivideinlabel = document.createElement("label");
gdivideinlabel.textContent = "Divisions";
gdivideinlabel.htmlFor = "divide";
controls.appendChild(gdivideinlabel);
let br1 = document.createElement("br");controls.appendChild(br1);

//transparency slider
let gtranspinput = document.createElement("input");
gtranspinput.type = "range";
gtranspinput.id = "transp";
gtranspinput.value = gtransp;
gtranspinput.min = "0";
gtranspinput.max = "100";
controls.appendChild(gtranspinput);
gtranspinput.addEventListener("change",watchTranspInput);
let gtranspinlabel = document.createElement("label");
gtranspinlabel.textContent = "Transparency";
gtranspinlabel.htmlFor = "transp";
controls.appendChild(gtranspinlabel);

SetBackground();

function watchColorPicker (event) {
    gcolor = event.target.value;
    SetBackground();
}

function watchSizeInput (event) {
    gsize = event.target.value;
    SetBackground();
}

function watchDivideInput (event) {
    gdivide = event.target.value;
    SetBackground();
}

function watchTranspInput (event) {
    gtransp = event.target.value;
    SetBackground();
}

function SetBackground() {
    let c = hexToRgb(gcolor);
    let i = gtransp / 2;
    let s = c.r + ", " + c.g + ", " + c.b + ", " + i + "%";
    let t = c.r + ", " + c.g + ", " + c.b + ", " + gtransp + "%";
    let p = `
        repeating-linear-gradient(90deg, rgba(${s}) 0px, rgba(${s}) 1px, transparent 1px, transparent ${gsize / gdivide}px), 
        repeating-linear-gradient(0deg, rgba(${s}) 0px, rgba(${s}) 1px, transparent 1px, transparent ${gsize / gdivide}px),
        repeating-linear-gradient(90deg, rgba(${t}) 0px, rgba(${t}) 1px, transparent 1px, transparent ${gsize}px), 
        repeating-linear-gradient(0deg, rgba(${t}) 0px, rgba(${t}) 1px, transparent 1px, transparent ${gsize}px)
    `;
    $(grid).css('background-image', p);
}

//UTILITY
// Source - https://stackoverflow.com/a/5624139
// Posted by Tim Down, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-31, License - CC BY-SA 4.0
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
