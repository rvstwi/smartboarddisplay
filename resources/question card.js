//adapted from Trivia Hide/Reveal CSS
// by JT
//https://codepen.io/jtcattelan/pen/RwKdjdm

let style = document.createElement('style');
let csscontent = `
.reveal-q {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: #fff;
  height: 450px;
  width: 650px;
  border: 4px solid #1e1e1e;
  border-radius: 40px;
  box-shadow: 1px 1px 20px #222;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.745, 0.11, 0.35, 0.845); /* custom */
  transition-timing-function: cubic-bezier(
    0.745,
    0.11,
    0.35,
    0.845
  ); /* custom */
}

.reveal-q:hover {
  background-color: #000;
  border: 4px solid #3d3d3d;
}

.pic-q {
  position: absolute;
  height: 450px;
  width: 650px;
  object-fit: cover;
  z-index: 10;
  border-radius: 40px;
}

.reveal-q h1 {
  color: #000;
  font-size: 55px;
  font-weight: 600;
  line-height: 55px;
}

.reveal-q h2 {
  margin-top: auto;
  color: #000;
  z-index: 5;
  font-size: 25px;
  font-weight: 500;
}

.reveal-q h3 {
  color: #fff;
  z-index: 5;
  font-size: 30px;
}

.footer-q {
  font-size: 20px;
  margin-top: auto;
  padding-bottom: 15px;
}
`;
style.textContent = csscontent;
$('head').append(style);

//draggable
let outer = CreateNewObj();

outer.innerHTML = `
<div class="reveal-q">
    <img alt="Answer" class="pic-q" src="https://i.imgur.com/RFxr4Qc.png">
    <h2>What was the first</h2>
    <h1>National Park?</h1>
    <h3>Yellowstone</h3>
    <p class="footer-q">(hover to reveal)</p>
</div>
`;
let menu = CreateDefaultContextMenu(outer);