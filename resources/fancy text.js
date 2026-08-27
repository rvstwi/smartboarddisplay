//Author: Mr L (2026)

//Uses google fonts

//contains code adapted from Rainbow Text by Riley Shaw
//https://codepen.io/rileyjshaw/pen/vExWpe

//LOAD FONTS FIRST

//google font archivo black
let link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap";
link.rel = "stylesheet";
$('head').append(link);
//google font permanent marker
let link1 = document.createElement('link');
link1.href = "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap";
link1.rel = "stylesheet";
$('head').append(link1);
//google font google sans
let link2 = document.createElement('link');
link2.href = "https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap";
link2.rel = "stylesheet";
$('head').append(link2);
//google font dancing script
let link3 = document.createElement('link');
link3.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap";
link3.rel = "stylesheet";
$('head').append(link3);
//google font noto serif
let link4 = document.createElement('link');
link4.href = "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap";
link4.rel = "stylesheet";
$('head').append(link4);
//google font pacifico
let link5 = document.createElement('link');
link5.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
link5.rel = "stylesheet";
$('head').append(link5);

//variable set up
let color1 = "#64ade5";
let bRainbow = false;
let bUpdate = false;

//draggable text setup
let mydiv = CreateNewObj();
//text goes in h
let h = document.createElement("h");
mydiv.appendChild(h);
//set text font styles
h.style.fontFamily = "Archivo Black";
h.style.fontSize = "7vh";
h.style.fontWeight = "400";
h.style.textShadow = "0.3vh 0.3vh 0.5vh #0000003e";
h.style.userSelect = "none";
h.style.cursor = "default";
h.style.color = color1;

//popup asks for what to change the text to
h.textContent = SetUpText(h);

//right click controls
let menu = CreateDefaultContextMenu(mydiv);
//add edit entry to top of menu
let lie = AddContextItem(menu,"edit",`<span class="material-symbols-outlined">edit</span>Edit text`,true);
lie.addEventListener('click', function() { $(".context").hide(100); h.textContent = SetUpText(h); bUpdate = true;});
//add rainbow option
let lir = AddContextItem(menu,"edit",`<span class="material-symbols-outlined">looks</span>Toggle rainbow`,true);
lir.addEventListener('click', function() { $(".context").hide(100); bRainbow = !bRainbow;});
//add color entry to top of menu
let lic = AddContextItem(menu,"color",`<span class="material-symbols-outlined">colors</span>Change color`,true);
lic.addEventListener('click', function() { $(".context").hide(100); cflcolorinput.click(); });
//color changing
let cflcolorinput = document.createElement("input");
cflcolorinput.type = "color";
cflcolorinput.value = color1;
cflcolorinput.style.display = "none";
document.body.appendChild(cflcolorinput);
cflcolorinput.addEventListener("change",watchColorPicker);
//add font entry to top of menu
let cffonts = document.createElement("p");
let cffontinput = document.createElement("select");
cffontinput.innerHTML = `
<option value="ab">Archivo Black</option>
<option value="pm">Permanent Marker</option>
<option value="gs">Google Sans</option>
<option value="ds">Dancing Script</option>
<option value="ns">Noto Serif</option>
<option value="pc">Pacifico</option>
`;
cffonts.appendChild(cffontinput);
cffontinput.addEventListener("change",watchFontPicker);
menu.insertBefore(cffonts,menu.children[0]);

AnimateColor();

//handle colors
//features code from Rainbow Text
function AnimateColor() {
    let angle = 0;
    let text = h.textContent.split('');
    let len = text.length;
    let phaseJump = 360 / len;
    let spans;

    h.innerHTML = text.map(function (char) {
        return '<span>' + char + '</span>';
    }).join('');
    spans = h.children;

    (function wheee () {
        //need to update text again
        if ( bUpdate ) {
            angle = 0;
            text = h.textContent.split('');
            len = text.length;
            phaseJump = 360 / len;
            h.innerHTML = text.map(function (char) {
                return '<span>' + char + '</span>';
            }).join('');
            spans = h.children;
            bUpdate = false;
        }
        for ( let i = 0; i < len; i++ ) {
            if ( bRainbow ) {
                spans[i].style.color = 'hsl(' + (angle + Math.floor(-i * phaseJump)) + ', 70%, 70%)';
            } else {
                spans[i].style.color = color1;
            }
        }
        angle++;
        requestAnimationFrame(wheee);
    })();
}

//prompts for input text
//breaks into an array of characters
//and sets as the content of the text item
function SetUpText(textitem) {
    let w = "Welcome";
    if ( textitem.textContent != "" ) {
        w = textitem.textContent;
    }
    let s = prompt("Enter your text",w);
    return s;
}

function watchColorPicker (event) {
    color1 = event.target.value;
    h.style.color = color1;
}

function watchFontPicker (event) {
    switch ( event.target.value ) {
        case "ab":
            h.style.fontFamily = "Archivo Black";
            break;
        case "pm":
            h.style.fontFamily = "Permanent Marker";
            break;
        case "gs":
            h.style.fontFamily = "Google Sans";
            break;
        case "ds":
            h.style.fontFamily = "Dancing Script";
            break;
        case "ns":
            h.style.fontFamily = "Noto Serif";
            break;
        case "pc":
            h.style.fontFamily = "Pacifico";
            break;
    }
    $(".context").hide(100);
}
