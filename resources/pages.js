//created by Mr L 2026

//default page button size
let butSize = 0.6;
let bgColor = "#ececec46";

//create the controls
let controls = CreateNewUI();

//create the context menu for right click
let menu = CreateDefaultContextMenu(controls);

//left-right buttons
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

//make very transparent
controls.style.background = bgColor;
butPrev.style.scale = butSize;
butNext.style.scale = butSize;

function watchButNext () {
    MovePage(1);
}

function watchButPrev () {
    MovePage(-1);
}

function MovePage (dir) {
    let Objs = $(".object-div");
    let w = window.innerWidth * dir;
    let x;
    let scale;
    for ( let i = 0; i < Objs.length; i++ ) {
        if ( Objs[i] != controls ) {
            //get current scale
            scale = Objs[i].getBoundingClientRect().width / Objs[i].offsetWidth;
            //reset scale so it doesn't mess up location math
            $(Objs[i]).css('transform', 'scale(1)');
            //get the location after resetting scale
            x = Objs[i].getBoundingClientRect().left;
            x += w;
            //set new location and set scale
            $(Objs[i]).css({
                'left': x,
                'transform': `scale(${scale})`,
            });
        }
    }
}