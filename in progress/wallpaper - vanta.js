//by Mr L 2026
//do what you want with it, just give credit

//uses the Vanta.js library
//https://www.vantajs.com

//load scripts
let script2 = document.createElement('script');
script2.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.cells.min.js";
$('head').append(script2);
let script3 = document.createElement('script');
script3.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.clouds.min.js";
$('head').append(script3);
let script4 = document.createElement('script');
script4.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.fog.min.js";
$('head').append(script4);
let script6 = document.createElement('script');
script6.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js";
$('head').append(script6);
let script7 = document.createElement('script');
script7.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js";
$('head').append(script7);

//create the container
let csscontent = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
`;
let container = document.createElement('div');
container.style.cssText = csscontent;
document.body.appendChild(container);

//THE CONTROLS AND DEFAULTS
//create one per item then hide all as needed

//the container
let controls;
const AllControls = [];
const WaveControls = [];
const FogControls = [];
const CloudControls = [];
const NetControls = [];
const CellControls = [];

let currentVANTA = "wa";

//waves
let wa_color = 0x22427e;
let wa_shininess = 40.00;
let wa_waveHeight = 14.00;
let wa_waveSpeed = 0.90;
let wa_zoom = 1.10;
//fog
let fo_highlightColor = 0xffbb00;
let fo_midtoneColor = 0xff1c00;
let fo_lowlightColor = 0x2a00ff;
let fo_baseColor = 0xffe9e9;
let fo_blurFactor = 0.65;
let fo_speed = 1.40;
let fo_zoom = 1.20;
//clouds
let cl_backgroundColor = 0xfafafa;
let cl_skyColor = 0x65b8d9;
let cl_cloudColor = 0xa1b6d7;
let cl_cloudShadowColor = 0x1a344d;
let cl_sunColor = 0xff9d29;
let cl_sunGlareColor = 0xf55724;
let cl_sunlightColor = 0xff9c3a;
let cl_speed = 0.70;
//net
let ne_color = 0xff3377;
let ne_backgroundColor = 0x201239;
let ne_points = 12.00;
let ne_maxDistance = 21.00;
let ne_spacing = 16.00;
let ne_alpha = 1.0;
//cells
let ce_color1 = 0x189890;
let ce_color2 = 0xf2e73a;
let ce_size = 1.70;
let ce_speed = 1.30;

//don't start code until the scripts are loaded
const delay = ms => new Promise(res => setTimeout(res, ms));

//waits until we have a reference to VANTA js
const Start = async () => {
    while ( typeof VANTA == "undefined" ) {
        await delay(1000);
    }
    controls = CreateControls();
    SetVANTA(currentVANTA);
};

Start();

//creates the initial panel
function CreateControls() {
    let outer = CreateNewUI();
    //style dropdown
    let styleinput = document.createElement("select");
    styleinput.innerHTML = `
        <option value="wa">Waves</option>
        <option value="fo">Fog</option>
        <option value="cl">Clouds</option>
        <option value="ne">Net</option>
        <option value="ce">Cells</option>
    `;
    outer.appendChild(styleinput);
    styleinput.addEventListener("change",watchStylePicker);
    let br = document.createElement("br");outer.appendChild(br);
    //color selectors
    let wa_color_in = document.createElement("input");
    wa_color_in.type = "color";wa_color_in.value = "#" + wa_color.toString(16);
    wa_color_in.addEventListener("change",watchColorPicker);outer.appendChild(wa_color_in);
    AllControls[AllControls.length] = wa_color_in;WaveControls[WaveControls.length] = wa_color_in;
    let fo_highlightColor_in = document.createElement("input");
    fo_highlightColor_in.type = "color";fo_highlightColor_in.value = "#" + fo_highlightColor.toString(16);
    fo_highlightColor_in.addEventListener("change",watchColorPicker);outer.appendChild(fo_highlightColor_in);
    AllControls[AllControls.length] = fo_highlightColor_in;FogControls[FogControls.length] = fo_highlightColor_in;
    let fo_midtoneColor_in = document.createElement("input");
    fo_midtoneColor_in.type = "color";fo_midtoneColor_in.value = "#" + fo_midtoneColor.toString(16);
    fo_midtoneColor_in.addEventListener("change",watchColorPicker);outer.appendChild(fo_midtoneColor_in);
    AllControls[AllControls.length] = fo_midtoneColor_in;FogControls[FogControls.length] = fo_midtoneColor_in;
    let fo_lowlightColor_in = document.createElement("input");
    fo_lowlightColor_in.type = "color";fo_lowlightColor_in.value = "#" + fo_lowlightColor.toString(16);
    fo_lowlightColor_in.addEventListener("change",watchColorPicker);outer.appendChild(fo_lowlightColor_in);
    AllControls[AllControls.length] = fo_lowlightColor_in;FogControls[FogControls.length] = fo_lowlightColor_in;
    let fo_baseColor_in = document.createElement("input");
    fo_baseColor_in.type = "color";fo_baseColor_in.value = "#" + fo_baseColor.toString(16);
    fo_baseColor_in.addEventListener("change",watchColorPicker);outer.appendChild(fo_baseColor_in);
    AllControls[AllControls.length] = fo_baseColor_in;FogControls[FogControls.length] = fo_baseColor_in;
    let cl_backgroundColor_in = document.createElement("input");
    cl_backgroundColor_in.type = "color";cl_backgroundColor_in.value = "#" + cl_backgroundColor.toString(16);
    cl_backgroundColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_backgroundColor_in);
    AllControls[AllControls.length] = cl_backgroundColor_in;CloudControls[CloudControls.length] = cl_backgroundColor_in;
    let cl_skyColor_in = document.createElement("input");
    cl_skyColor_in.type = "color";cl_skyColor_in.value = "#" + cl_skyColor.toString(16);
    cl_skyColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_skyColor_in);
    AllControls[AllControls.length] = cl_skyColor_in;CloudControls[CloudControls.length] = cl_skyColor_in;
    let cl_cloudColor_in = document.createElement("input");
    cl_cloudColor_in.type = "color";cl_cloudColor_in.value = "#" + cl_cloudColor.toString(16);
    cl_cloudColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_cloudColor_in);
    AllControls[AllControls.length] = cl_cloudColor_in;CloudControls[CloudControls.length] = cl_cloudColor_in;
    let cl_cloudShadowColor_in = document.createElement("input");
    cl_cloudShadowColor_in.type = "color";cl_cloudShadowColor_in.value = "#" + cl_cloudShadowColor.toString(16);
    cl_cloudShadowColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_cloudShadowColor_in);
    AllControls[AllControls.length] = cl_cloudShadowColor_in;CloudControls[CloudControls.length] = cl_cloudShadowColor_in;
    let cl_sunColor_in = document.createElement("input");
    cl_sunColor_in.type = "color";cl_sunColor_in.value = "#" + cl_sunColor.toString(16);
    cl_sunColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_sunColor_in);
    AllControls[AllControls.length] = cl_sunColor_in;CloudControls[CloudControls.length] = cl_sunColor_in;
    let cl_sunGlareColor_in = document.createElement("input");
    cl_sunGlareColor_in.type = "color";cl_sunGlareColor_in.value = "#" + cl_sunGlareColor.toString(16);
    cl_sunGlareColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_sunGlareColor_in);
    AllControls[AllControls.length] = cl_sunGlareColor_in;CloudControls[CloudControls.length] = cl_sunGlareColor_in;
    let cl_sunlightColor_in = document.createElement("input");
    cl_sunlightColor_in.type = "color";cl_sunlightColor_in.value = "#" + cl_sunlightColor.toString(16);
    cl_sunlightColor_in.addEventListener("change",watchColorPicker);outer.appendChild(cl_sunlightColor_in);
    AllControls[AllControls.length] = cl_sunlightColor_in;CloudControls[CloudControls.length] = cl_sunlightColor_in;
    let ne_color_in = document.createElement("input");
    ne_color_in.type = "color";ne_color_in.value = "#" + ne_color.toString(16);
    ne_color_in.addEventListener("change",watchColorPicker);outer.appendChild(ne_color_in);
    AllControls[AllControls.length] = ne_color_in;NetControls[NetControls.length] = ne_color_in;
    let ne_backgroundColor_in = document.createElement("input");
    ne_backgroundColor_in.type = "color";ne_backgroundColor_in.value = "#" + ne_backgroundColor.toString(16);
    ne_backgroundColor_in.addEventListener("change",watchColorPicker);outer.appendChild(ne_backgroundColor_in);
    AllControls[AllControls.length] = ne_backgroundColor_in;NetControls[NetControls.length] = ne_backgroundColor_in
    let ce_color1_in = document.createElement("input");
    ce_color1_in.type = "color";ce_color1_in.value = "#" + ce_color1.toString(16);
    ce_color1_in.addEventListener("change",watchColorPicker);outer.appendChild(ce_color1_in);
    AllControls[AllControls.length] = ce_color1_in;CellControls[CellControls.length] = ce_color1_in;
    let ce_color2_in = document.createElement("input");
    ce_color2_in.type = "color";ce_color2_in.value = "#" + ce_color2.toString(16);
    ce_color2_in.addEventListener("change",watchColorPicker);outer.appendChild(ce_color2_in);
    AllControls[AllControls.length] = ce_color2_in;CellControls[CellControls.length] = ce_color2_in;
    let br2 = document.createElement("br");outer.appendChild(br2);

    return outer;
}

function AdjustControlVisibility() {
    for ( let i = 0; i < AllControls.length; i++ ) {
        if ( $(AllControls[i]).css("display") != "none" ) {
            $(AllControls[i]).toggle();
        }
    }
    switch ( currentVANTA ) {
        case "wa":
            for ( let i = 0; i < WaveControls.length; i++ ) {
                $(WaveControls[i]).toggle();
            }
            break;
        case "fo":
            for ( let i = 0; i < FogControls.length; i++ ) {
                $(FogControls[i]).toggle();
            }
            break;
        case "cl":
            for ( let i = 0; i < CloudControls.length; i++ ) {
                $(CloudControls[i]).toggle();
            }
            break;
        case "ne":
            for ( let i = 0; i < NetControls.length; i++ ) {
                $(NetControls[i]).toggle();
            }
            break;
        case "ce":
            for ( let i = 0; i < CellControls.length; i++ ) {
                $(CellControls[i]).toggle();
            }
            break;
    }
}

function watchColorPicker() {

}

function watchStylePicker(event) {
    SetVANTA(event.target.value);
}

function SetVANTA(s) {
    currentVANTA = s;
    AdjustControlVisibility();
    switch ( s ) {
        case "wa":
            VANTA.WAVES({
                el: container,
                color: wa_color,
                shininess: wa_shininess,
                waveHeight: wa_waveHeight,
                waveSpeed: wa_waveSpeed,
                zoom: wa_zoom,
            });
            break;
        case "fo":
            VANTA.FOG({
                el: container,
                highlightColor: fo_highlightColor,
                midtoneColor: fo_midtoneColor,
                lowlightColor: fo_lowlightColor,
                baseColor: fo_baseColor,
                blurFactor: fo_blurFactor,
                speed: fo_speed,
                zoom: fo_zoom,
            });
            break;
        case "cl":
            VANTA.CLOUDS({
                el: container,
                backgroundColor: cl_backgroundColor,
                skyColor: cl_skyColor,
                cloudColor: cl_cloudColor,
                cloudShadowColor: cl_cloudShadowColor,
                sunColor: cl_sunColor,
                sunGlareColor: cl_sunGlareColor,
                sunlightColor: cl_sunlightColor,
                speed: cl_speed,
            });
            break;
        case "ne":
            VANTA.NET({
                el: container,
                color: ne_color,
                backgroundColor: ne_backgroundColor,
                points: ne_points,
                maxDistance: ne_maxDistance,
                spacing: ne_spacing,
                backgroundAlpha: ne_alpha,
            });
            break;
        case "ce":
            VANTA.CELLS({
                el: container,
                color1: ce_color1,
                color2: ce_color2,
                size: ce_size,
                speed: ce_speed,
            });
            break;
    }
}
