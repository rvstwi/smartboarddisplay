//ADAPTED FROM:
//Analog Clock by Aida Hashemi
//codepen.io/Aida-Hashemi/pen/VYLrqQJ

let style = document.createElement('style');
let csscontent = `
.clock {
    position: relative;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: bottom center;
    transform: rotate(0deg);
    border-radius: 6px;
}

.hour {
    width: 6px;
    height: 70px;
    background: #333;
    z-index: 3;
}

.minute {
    width: 4px;
    height: 100px;
    background: #444;
    z-index: 2;
}

.second {
    width: 2px;
    height: 120px;
    background: crimson;
    z-index: 1;
}

.center-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 14px;
    background: #111;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
}

.mark {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #222;
    border-radius: 50%;
    opacity: 0.6;
}

.mark12 {
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
}

.mark3 {
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
}

.mark6 {
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
}

.mark9 {
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
}`;
style.textContent = csscontent;
$('head').append(style);

//create the clock HTML structure
let outer = CreateNewObj();
outer.innerHTML = `
<div class="clock" id="analogclock">
<div class="hand hour" id="hour"></div>
<div class="hand minute" id="minute"></div>
<div class="hand second" id="second"></div>
<div class="center-dot"></div>
<div class="mark mark12"></div>
<div class="mark mark3"></div>
<div class="mark mark6"></div>
<div class="mark mark9"></div>
</div>
`;
let menu = CreateDefaultContextMenu(outer);
let transinput = document.createElement("input");
transinput.type = "range";
transinput.id = "clocktrans";
transinput.value = "10";
transinput.min = "0";
transinput.max = "100";
let li = AddContextItem(menu,"transparent", "", true);
li.appendChild(transinput);
transinput.addEventListener("change",watchTransInput);

function watchTransInput(event) {
    let s = event.target.value / 100;
    document.getElementById("analogclock").style.background = `rgba(255, 255, 255, ${s})`;
}

function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    document.getElementById("second").style.transform = `rotate(${secondDeg}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById("hour").style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();
