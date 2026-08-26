//Author: Mr L (2026)

//Uses google fonts

//google fonts
let link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&display=swap";
link.rel = "stylesheet";
$('head').append(link);
let link2 = document.createElement('link');
link2.href = "https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap";
link2.rel = "stylesheet";
$('head').append(link2);

let clockcolor = "#b9d0e8";
let clockfont = "Verdana, Geneva, Tahoma, sans-serif";

let outer = CreateNewObj();
let menu = CreateDefaultContextMenu(outer);
$(outer).css({
    "display": "flex",
    "width": "28vw",
});

//clock elements
let hours = document.createElement('h');
outer.appendChild(hours);
SetClockStyle(hours);
let colon = document.createElement('h');
SetClockStyle(colon);
outer.appendChild(colon);
let minutes = document.createElement('h');
SetClockStyle(minutes);
outer.appendChild(minutes);
let period = document.createElement('h');
SetClockStyle(period);
outer.appendChild(period);

//element sizing
hours.style.width = "30%";
colon.style.width = "5%";
colon.textContent = ":";
minutes.style.width = "31%";
period.style.width = "34%";

//color changing
let clcolorinput = document.createElement("input");
clcolorinput.type = "color";
clcolorinput.value = clockcolor;
clcolorinput.style.display = "none";
document.body.appendChild(clcolorinput);
clcolorinput.addEventListener("change",watchclColorPicker);

//add color entry to top of menu
let li = AddContextItem(menu,"color",`<span class="material-symbols-outlined">colors</span>Change color`,true);
li.addEventListener('click', function() { $(".context").hide(100); clcolorinput.click(); });

//add font entry to top of menu
let cfonts = document.createElement("p");
let cfontinput = document.createElement("select");
cfontinput.innerHTML = `
<option value="df">Default font</option>
<option value="bg">Bitcount Grid Single</option>
<option value="if">Indie Flower</option>
<option value="bh">Bungee Hairline</option>
`;
cfonts.appendChild(cfontinput);
cfontinput.addEventListener("change",watchFontPicker);
menu.insertBefore(cfonts,menu.children[0]);

function watchclColorPicker (event) {
    clockcolor = event.target.value;
    hours.style.color = clockcolor;
    colon.style.color = clockcolor;
    minutes.style.color = clockcolor;
    period.style.color = clockcolor;
}

function watchFontPicker (event) {
    let fa = "6vw";
    switch ( event.target.value ) {
        case "df":
            clockfont = "Verdana, Geneva, Tahoma, sans-serif";
            break;
        case "bg":
            clockfont = `"Bitcount Grid Single", system-ui`;
            break;
        case "if":
            clockfont = `"Indie Flower", cursive`;
            fa = "7.7vw";
            break;
        case "bh":
            clockfont = `"Bungee Hairline", sans-serif`;
            break;
    }
    $(hours).css({
        "font-family": clockfont,
        "font-size": fa,
    });
    $(colon).css({
        "font-family": clockfont,
        "font-size": fa,
    });
    $(minutes).css({
        "font-family": clockfont,
        "font-size": fa,
    });
    $(period).css({
        "font-family": clockfont,
        "font-size": fa,
    });
    $(".context").hide(100);
}

function SetClockStyle(elem) {
    $(elem).css({
        "font-family": clockfont,
        "font-size": "6vw",
        "text-shadow": `0.3vh 0.3vh 0.5vh #0000003e`,
        "text-align": "right",
        "color": clockcolor,
        "user-select": "none",
        "cursor": "default",
        "padding": "0",
    });
}

function UpdateTime() {
    let Timer = new Date();
    let h = Timer.getHours();
    let m = Timer.getMinutes();
    let p = "PM";
    if ( h > 12 ) { h -= 12; }
    else if ( h < 12 ) { p = "AM"; }
    if ( h == 0 ) { h = 12; }
    m = ( m < 10 ) ? "0" + m : m;
    hours.textContent = h;
    minutes.textContent = m;
    period.textContent = p;
    setTimeout(UpdateTime, 1000);
}

UpdateTime();
