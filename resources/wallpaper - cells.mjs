//VANTA Cells wallpaper
//created by Mr L 2026
//uses VANTA.js library
//vantajs.com

//load library
let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.cells.min.js";
$('head').append(script);

let cell;//reference to vanta effect

//create the display layer
let container = CreateBackgroundLayer();

//create the controls
let controls = CreateNewUI();

//create the context menu for right click
let menu = CreateDefaultContextMenu(controls);

//config variables
let ce_color1 = 0x189890;
let ce_color2 = 0xf2e73a;
let ce_size = 1.70;
let ce_speed = 1.30;

//color buttons
let ce_color1_in = document.createElement("input");
ce_color1_in.type = "color";ce_color1_in.value = "#" + ce_color1.toString(16);
ce_color1_in.addEventListener("change",watchCColorPicker);controls.appendChild(ce_color1_in);
let ce_color2_in = document.createElement("input");
ce_color2_in.type = "color";ce_color2_in.value = "#" + ce_color2.toString(16);
ce_color2_in.addEventListener("change",watchCColorPicker);controls.appendChild(ce_color2_in);
let br5 = document.createElement("br");controls.appendChild(br5);

//size slider
let sizeinput = document.createElement("input");sizeinput.type = "range";sizeinput.id = "cellsize";sizeinput.value = "15";sizeinput.min = "2";sizeinput.max = "50";controls.appendChild(sizeinput);
sizeinput.addEventListener("change",watchCSizeInput);
let sizeinlabel = document.createElement("label");sizeinlabel.textContent = "Size";sizeinlabel.htmlFor = "cellsize";controls.appendChild(sizeinlabel);
let br3 = document.createElement("br");controls.appendChild(br3);

//speed slider
let speedinput = document.createElement("input");speedinput.type = "range";speedinput.id = "cellspeed";speedinput.value = "10";speedinput.min = "1";speedinput.max = "50";controls.appendChild(speedinput);
speedinput.addEventListener("change",watchCSpeedInput);
let speedinlabel = document.createElement("label");speedinlabel.textContent = "Speed";speedinlabel.htmlFor = "cellspeed";controls.appendChild(speedinlabel);
let br4 = document.createElement("br");controls.appendChild(br4);

//opacity slider
let opacinput = document.createElement("input");opacinput.type = "range";opacinput.id = "opacity";opacinput.value = "100";opacinput.min = "0";opacinput.max = "100";controls.appendChild(opacinput);
opacinput.addEventListener("change",watchCOpacInput);
let opacinlabel = document.createElement("label");opacinlabel.textContent = "Opacity";opacinlabel.htmlFor = "opacity";controls.appendChild(opacinlabel);
let br2 = document.createElement("br");controls.appendChild(br2);

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
controls.appendChild(blendinput);
blendinput.addEventListener("change",watchCBlendPicker);

//don't start code until the scripts are loaded
const delay = ms => new Promise(res => setTimeout(res, ms));

function watchCBlendPicker (event) {
    $(container).css('mixBlendMode', event.target.value );
}

function watchCSizeInput (event) {
    ce_size = event.target.value / 10;
    cell.setOptions({
        size: ce_size,
    });
}

function watchCSpeedInput (event) {
    ce_speed = event.target.value / 10;
    cell.setOptions({
        speed: ce_speed,
    });
}

function watchCOpacInput (event) {
    let i = 0.01 * event.target.value;
    $(container).css('opacity', `${i}`);
}

function watchCColorPicker (event) {
    let c1 = hexToRgb(ce_color1_in.value);
    let c2 = hexToRgb(ce_color2_in.value);
    let s1 = `rgb(${c1.r}, ${c1.g}, ${c1.b})`;
    let s2 = `rgb(${c2.r}, ${c2.g}, ${c2.b})`;
    cell.setOptions({
        color1: s1,
        color2: s2,
    });
}

//from Tim Down at https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//waits until we have a reference to VANTA js
const Start = async () => {
    while ( typeof VANTA == "undefined" ) {
        await delay(1000);
    }
    cell = VANTA.CELLS({
        el: container,
        color1: ce_color1,
        color2: ce_color2,
        size: ce_size,
        speed: ce_speed,
    });
};

Start();
