//VANTA fog wallpaper
//created by Mr L 2026
//uses VANTA.js library
//vantajs.com

//load library
let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.fog.min.js";
$('head').append(script);

let fog;//reference to vanta effect

//create the display layer
let container = CreateBackgroundLayer();

//create the controls
let controls = CreateNewUI();

//create the context menu for right click
let menu = CreateDefaultContextMenu(controls);

//config variables
let fo_highlightColor = 0xffbb00;
let fo_midtoneColor = 0xff1c00;
let fo_lowlightColor = 0x2a00ff;
let fo_baseColor = 0xffe9e9;
let fo_blurFactor = 0.65;
let fo_speed = 1.40;
let fo_zoom = 1.20;


//color buttons
let fo_color1_in = document.createElement("input");
fo_color1_in.type = "color";
fo_color1_in.value = "#" + fo_highlightColor.toString(16);
fo_color1_in.addEventListener("change",watchFColorPicker);
controls.appendChild(fo_color1_in);
let fo_color2_in = document.createElement("input");
fo_color2_in.type = "color";
fo_color2_in.value = "#" + fo_midtoneColor.toString(16);
fo_color2_in.addEventListener("change",watchFColorPicker);
controls.appendChild(fo_color2_in);
let br1 = document.createElement("br");controls.appendChild(br1);
let fo_color3_in = document.createElement("input");
fo_color3_in.type = "color";
fo_color3_in.value = "#" + fo_lowlightColor.toString(16);
fo_color3_in.addEventListener("change",watchFColorPicker);
controls.appendChild(fo_color3_in);
let fo_color4_in = document.createElement("input");
fo_color4_in.type = "color";
fo_color4_in.value = "#" + fo_baseColor.toString(16);
fo_color4_in.addEventListener("change",watchFColorPicker);
controls.appendChild(fo_color4_in);
let br2 = document.createElement("br");controls.appendChild(br2);

//random color scheme generator
let fbutrand = document.createElement("button");
fbutrand.type = "button";
fbutrand.innerHTML = `<span class="material-symbols-outlined">wand_stars</span>`;
controls.appendChild(fbutrand);
fbutrand.addEventListener("click",watchRandBut);
let br5 = document.createElement("br");controls.appendChild(br5);

//sliders
let blurinput = document.createElement("input");
blurinput.type = "range";
blurinput.id = "fogblur";
blurinput.value = "65";
blurinput.min = "10";
blurinput.max = "90";
controls.appendChild(blurinput);
blurinput.addEventListener("change",watchFBlurInput);
let blurinlabel = document.createElement("label");
blurinlabel.textContent = "Blur";
blurinlabel.htmlFor = "fogblur";
controls.appendChild(blurinlabel);
let br3 = document.createElement("br");controls.appendChild(br3);
let zoominput = document.createElement("input");
zoominput.type = "range";
zoominput.id = "fogzoom";
zoominput.value = "12";
zoominput.min = "10";
zoominput.max = "50";
controls.appendChild(zoominput);
zoominput.addEventListener("change",watchFZoomInput);
let zoominlabel = document.createElement("label");
zoominlabel.textContent = "Zoom";
zoominlabel.htmlFor = "fogzoom";
controls.appendChild(zoominlabel);
let br4 = document.createElement("br");controls.appendChild(br4);
let speedinput = document.createElement("input");
speedinput.type = "range";
speedinput.id = "fogspeed";
speedinput.value = "10";
speedinput.min = "1";
speedinput.max = "50";
controls.appendChild(speedinput);
speedinput.addEventListener("change",watchFSpeedInput);
let speedinlabel = document.createElement("label");
speedinlabel.textContent = "Speed";
speedinlabel.htmlFor = "fogspeed";
controls.appendChild(speedinlabel);
let br6 = document.createElement("br");controls.appendChild(br6);

//opacity slider
let opacinput = document.createElement("input");
opacinput.type = "range";
opacinput.id = "opacity";
opacinput.value = "100";
opacinput.min = "0";
opacinput.max = "100";
controls.appendChild(opacinput);
opacinput.addEventListener("change",watchFOpacInput);
let opacinlabel = document.createElement("label");
opacinlabel.textContent = "Opacity";
opacinlabel.htmlFor = "opacity";
controls.appendChild(opacinlabel);
let br7 = document.createElement("br");controls.appendChild(br7);

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
blendinput.addEventListener("change",watchFBlendPicker);

function watchFOpacInput (event) {
    let i = 0.01 * event.target.value;
    $(container).css('opacity', `${i}`);
}

function watchFBlendPicker (event) {
    $(container).css('mixBlendMode', event.target.value );
}

function watchRandBut () {
    let basehue = randInt(360);//any hue from 0 - 360
    let hue;//0-360
    let sat;//0-100
    let lum;//0-100
    //fo_highlightColor - mid sat high lum
    hue = basehue + randInt(100) - 50 % 360;
    sat = 65 - randInt(30);
    lum = 90 - randInt(30);
    let b1 = hslToHex(hue, sat, lum);
    let c1 = hexToRgb(b1);
    //fo_midtoneColor - high sat mid lum
    hue = basehue + randInt(60) - 30 % 360;
    sat = 100 - randInt(20);
    lum = 75 - randInt(20);
    let b2 = hslToHex(hue, sat, lum);
    let c2 = hexToRgb(b2);
    //fo_lowlightColor - mid sat midlow lum, greater difference from basehue
    hue = basehue + randInt(160) - 80 % 360;
    sat = 65 - randInt(30);
    lum = 60 - randInt(25);
    let b3 = hslToHex(hue, sat, lum);
    let c3 = hexToRgb(b3);
    //fo_baseColor - midlow sat low lum
    hue = basehue + randInt(60) - 30 % 360;
    sat = 55 - randInt(30);
    lum = 35 - randInt(25);
    let b4 = hslToHex(hue, sat, lum);
    let c4 = hexToRgb(b4);
    let s1 = `rgb(${c1.r}, ${c1.g}, ${c1.b})`;
    let s2 = `rgb(${c2.r}, ${c2.g}, ${c2.b})`;
    let s3 = `rgb(${c3.r}, ${c3.g}, ${c3.b})`;
    let s4 = `rgb(${c4.r}, ${c4.g}, ${c4.b})`;
    fo_color1_in.value = b1;
    fo_color2_in.value = b2;
    fo_color3_in.value = b3;
    fo_color4_in.value = b4;
    fog.setOptions({
        highlightColor: s1,
        midtoneColor: s2,
        lowlightColor: s3,
        baseColor: s4,
    });
}

function randInt (max) {
  return Math.floor(Math.random() * max);
}

// Source - https://stackoverflow.com/a/44134328
// Posted by Juraj, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-01, License - CC BY-SA 4.0
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function watchFSpeedInput (event) {
    fo_speed = event.target.value / 10;
    fog.setOptions({
        speed: fo_speed,
    });
}

function watchFBlurInput (event) {
    fo_blurFactor = event.target.value / 100;
     fog.setOptions({
        blurFactor: fo_blurFactor,
    });
}

function watchFZoomInput (event) {
    fo_zoom = event.target.value / 10;
     fog.setOptions({
        zoom: fo_zoom,
    });
}

function watchFColorPicker (event) {
    let c1 = hexToRgb(fo_color1_in.value);
    let c2 = hexToRgb(fo_color2_in.value);
    let c3 = hexToRgb(fo_color3_in.value);
    let c4 = hexToRgb(fo_color4_in.value);
    let s1 = `rgb(${c1.r}, ${c1.g}, ${c1.b})`;
    let s2 = `rgb(${c2.r}, ${c2.g}, ${c2.b})`;
    let s3 = `rgb(${c3.r}, ${c3.g}, ${c3.b})`;
    let s4 = `rgb(${c4.r}, ${c4.g}, ${c4.b})`;
    fog.setOptions({
        highlightColor: s1,
        midtoneColor: s2,
        lowlightColor: s3,
        baseColor: s4,
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

//don't start code until the scripts are loaded
const delay = ms => new Promise(res => setTimeout(res, ms));

//waits until we have a reference to VANTA js
const Start = async () => {
    while ( typeof VANTA == "undefined" ) {
        await delay(1000);
    }
    fog = VANTA.FOG({
        el: container,
        highlightColor: fo_highlightColor,
        midtoneColor: fo_midtoneColor,
        lowlightColor: fo_lowlightColor,
        baseColor: fo_baseColor,
        blurFactor: fo_blurFactor,
        speed: fo_speed,
        zoom: fo_zoom,
    });
};

Start();
