//adapted from Teaching Clock Studies
//by Lucas Steuber
//codepen.io/editor/lukeslp/pen/019fc57a-5138-7c91-a2e8-701e1bb988f6

//adapted for Smart Board by Mr L

let style = document.createElement('style');
let csscontent = `
:root{
    --chalk:rgba(255, 255, 255, 0.5);
    --hour:#ffae57;
    --hour-ink:#a95018;
    --minute:#55d6c2;
    --minute-ink:#176f69;
    --answer:#ff667d;
    --ink:#183146;
    --muted:#6f8996;
    --display:"Fredoka",ui-rounded,"Arial Rounded MT Bold",sans-serif;
    --text:"Atkinson Hyperlegible",system-ui,sans-serif;
  }
  .clocks{width:min(35vw);grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1.25rem,3vw,2.4rem);align-items:start;color:var(--chalk);font-family:var(--text)}
  figure{display:grid;min-width:0;gap:.7rem;margin:0;justify-items:center}
  .dial{
    position:relative;width:min(100%,20rem);aspect-ratio:1;overflow:hidden;container-type:inline-size;
    border:.32rem solid rgba(255,247,221,.32);border-radius:50%;isolation:isolate;background:var(--chalk);color:var(--ink);
    backdrop-filter: var(--sb-blur);
    -webkit-backdrop-filter: var(--sb-blur);
  }
  .ticks{position:absolute;z-index:1;inset:3.8%;border-radius:50%;background:repeating-conic-gradient(from -1deg,var(--ink) 0 2deg,transparent 2deg 30deg);opacity:.38;mask:radial-gradient(circle,transparent 67%,#000 68% 72%,transparent 73%)}
  .orbit-line{position:absolute;z-index:2;border:1px dashed rgba(24,49,70,.18);border-radius:50%}
  .orbit-line.hour{inset:27%}
  .orbit-line.minute{inset:11%}
  .hand{
    position:absolute;z-index:4;bottom:50%;left:50%;width:.28rem;border-radius:999px 999px .1rem .1rem;
    transform:translateX(-50%) rotate(var(--angle));transform-origin:50% 100%;transition:transform .32s ease;
  }
  .hand.hour{height:28%;background:var(--hour-ink)}
  .hand.minute{height:40%;width:.2rem;background:var(--minute-ink)}
  .center-pin{position:absolute;z-index:9;left:50%;top:50%;width:5.2cqi;aspect-ratio:1;translate:-50% -50%;border:.18rem solid var(--chalk);border-radius:50%;background:var(--answer)}
  .rider,.word{
    position:absolute;z-index:7;left:50%;top:50%;transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(-1 * var(--radius))) rotate(calc(-1 * var(--angle)));
    transition:transform .32s ease,color .18s ease,background .18s ease;
  }
  .rider{
    display:grid;place-items:center;border:.16rem solid var(--chalk);border-radius:43%;color:var(--ink);
    font-family:var(--display);line-height:1;text-align:center;
  }
  .rider span{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.55cqi;line-height:.78}
  .rider.hour{--radius:28cqi;width:22cqi;aspect-ratio:1;background:var(--hour);font-size:10cqi;font-weight:700}
  .rider.minute{--radius:40cqi;width:17cqi;aspect-ratio:1;background:var(--minute);font-size:7cqi;font-weight:600}
  .rider small{display:block;margin:0;font:700 3.35cqi/.92 var(--text);letter-spacing:.055em;text-transform:lowercase}
  .current-face .rider{border:0;border-radius:0;background:transparent}
  .current-face .rider.hour{width:auto;color:var(--hour-ink);font-size:18cqi}
  .current-face .rider.minute{width:auto;color:var(--minute-ink);font-size:12cqi}
  .current-face .rider small{display:none}
  .game-face .rider{background:#d8e1dc;color:var(--muted)}
  .game-face .rider small{visibility:hidden}
  .game-face.is-revealed .rider.hour{background:var(--hour);color:var(--ink)}
  .game-face.is-revealed .rider.minute{background:var(--minute);color:var(--ink)}
  .game-face.is-revealed .rider small{visibility:visible}
  .word{max-width:46cqi;color:var(--ink);font-family:var(--display);line-height:1;text-align:center;white-space:nowrap}
  .word.hour{--radius:5cqi;color:var(--hour-ink);font-size:9.5cqi;font-weight:700}
  .word.minute{--radius:32cqi;color:var(--minute-ink);font-size:7.2cqi;font-weight:600}
  .game-actions,.global-actions{display:flex;min-height:2.75rem;align-items:center;justify-content:center;gap:1.25rem}
  .game-actions button,.global-actions button{
    min-width:2.75rem;border:0;border-bottom:1px solid rgba(255,247,221,.36);padding:.45rem .1rem;
    background:transparent;color:rgba(255,247,221,.74);cursor:pointer;font-size:.76rem;font-weight:700;
  }
  .game-actions button:hover,.global-actions button:hover{border-color:var(--chalk);color:var(--chalk)}
  .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  @media(max-width:680px){
    main{align-items:center;justify-content:flex-start}
    .clocks{width:min(100%,22rem);grid-template-columns:1fr;gap:3rem}
    .dial{width:min(88vw,20rem)}
  }
  @media(max-width:340px){
    main{padding-inline:.65rem}
    .dial{width:min(88vw,18rem)}
  }
  @media(prefers-reduced-motion:reduce){.hand,.rider,.word{transition:none}}
`;
style.textContent = csscontent;
$('head').append(style);

//draggable html structure
let outer = CreateNewObj();
outer.innerHTML = `
<figure>
    <div class="dial game-face" id="gameFace" role="img" aria-label="Guess the time from the hands.">
        <div class="ticks" aria-hidden="true"></div>
        <div class="orbit-line hour" aria-hidden="true"></div><div class="orbit-line minute" aria-hidden="true"></div>
        <div class="hand hour" id="gameHourHand" aria-hidden="true"></div><div class="hand minute" id="gameMinuteHand" aria-hidden="true"></div>
        <div class="rider hour" id="gameHour" aria-hidden="true"><span>?<small>hour</small></span></div>
        <div class="rider minute" id="gameMinute" aria-hidden="true"><span>?<small>min</small></span></div>
        <div class="center-pin" aria-hidden="true"></div>
    </div>
    <div class="game-actions"><button type="button" id="revealAnswer" aria-pressed="false">Show</button></div>
</figure>
`;
outer.classList.add('clocks');
let menu = CreateDefaultContextMenu(outer);

let transinput = document.createElement("input");
transinput.type = "range";
transinput.id = "clocktrans";
transinput.value = "50";
transinput.min = "0";
transinput.max = "100";
let li = AddContextItem(menu,"transparent", "", true);
li.appendChild(transinput);
transinput.addEventListener("change",watchTransInput);

function watchTransInput(event) {
    let s = event.target.value / 100;
    document.getElementById("gameFace").style.background = `rgba(255, 255, 255, ${s})`;
}


(function () {
  const $ = (selector) => document.querySelector(selector);
  const gameFace = $('#gameFace');
  const revealButton = $('#revealAnswer');
  const socialMode = document.documentElement.classList.contains('social');
  let studyMinutes = socialMode ? 195 : minutesNow();
  let followsNow = !socialMode;
  let revealed = false;
  let lastLiveMinute = -1;

  function minutesNow() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function parts(value) {
    const hour24 = Math.floor(value / 60) % 24;
    const minute = value % 60;
    return { hour24, hour: hour24 % 12 || 12, minute };
  }

  function format(value) {
    const current = parts(value);
    return `${current.hour}:${String(current.minute).padStart(2, '0')}`;
  }

  function numberWord(value) {
    const small = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens = ['','','twenty','thirty','forty','fifty'];
    if (value < 20) return small[value];
    const remainder = value % 10;
    return remainder ? `${tens[Math.floor(value / 10)]}-${small[remainder]}` : tens[Math.floor(value / 10)];
  }

  function position(element, angle) {
    element.style.setProperty('--angle', `${angle}deg`);
  }

  function setRider(element, value, unit) {
    element.querySelector('span').innerHTML = unit ? `${value}<small>${unit}</small>` : String(value);
  }

  function updateAll() {
    const current = parts(studyMinutes);
    const hourMarkAngle = (current.hour % 12) * 30;
    const minuteAngle = current.minute * 6;
    const trueHourAngle = (current.hour24 % 12) * 30 + current.minute * .5;

    position($('#gameHourHand'), trueHourAngle);
    position($('#gameMinuteHand'), minuteAngle);
    position($('#gameHour'), trueHourAngle);
    position($('#gameMinute'), minuteAngle);
    if (revealed) {
      setRider($('#gameHour'), current.hour, 'hour');
      setRider($('#gameMinute'), String(current.minute).padStart(2, '0'), 'min');
      gameFace.setAttribute('aria-label', `The answer is ${format(studyMinutes)}.`);
    } else {
      setRider($('#gameHour'), '?', 'hour');
      setRider($('#gameMinute'), '?', 'min');
      gameFace.setAttribute('aria-label', 'Guess the time from the hands.');
    }
  }

  function hideAnswer() {
    revealed = false;
    gameFace.classList.remove('is-revealed');
    revealButton.textContent = 'Show';
    revealButton.setAttribute('aria-pressed', 'false');
  }

  function tick() {
    if (!followsNow) return;
    const current = minutesNow();
    if (current === lastLiveMinute) return;
    lastLiveMinute = current;
    studyMinutes = current;
    hideAnswer();
    updateAll();
  }

  revealButton.addEventListener('click', () => {
    revealed = !revealed;
    gameFace.classList.toggle('is-revealed', revealed);
    revealButton.textContent = revealed ? 'Hide' : 'Show';
    revealButton.setAttribute('aria-pressed', String(revealed));
    updateAll();
  });

  socialMode ? updateAll() : tick();
  setInterval(tick, 15000);
})();