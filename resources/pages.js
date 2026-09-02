//created by Mr L 2026

//create the controls
let controls = CreateNewUI();

//create the context menu for right click
let menu = CreateDefaultContextMenu(controls);

let butPrev = document.createElement("button");
butPrev.type = "button";
butPrev.innerHTML = `<span class="material-symbols-outlined">chevron_backward</span>`;
controls.appendChild(butPrev);
butPrev.addEventListener("click",watchButPrev);
let butNext = document.createElement("button");
butNext.type = "button";
butNext.innerHTML = `<span class="material-symbols-outlined">chevron_forward</span>`;
controls.appendChild(butNext);
butNext.addEventListener("click",watchButNext);

function watchButNext () {
    MovePage(1);
}

function watchButPrev () {
    MovePage(-1);
}

function MovePage (dir) {
    let Objs = $(".object-div");
    let w = window.innerWidth * dir;
    for ( let i = 0; i < Objs.length; i++ ) {
        if ( Objs[i] != controls ) {
            Objs[i].animate({
                transform: `translateX(${w}px)`,
                offset: 0
            }, 1000);
        }
    }
}