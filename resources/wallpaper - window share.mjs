//window share wallpaper
//created by Mr L 2026


let bvideo = document.getElementById('backgroundvid');
let bimg = document.getElementById('backgroundimg');
bvideo.pause();
bvideo.style = "display: inline";
bvideo.src = "";
bimg.src = "";
bimg.style = "display: none";

var constraints = {
    video: true
};

//change the context menu so the background changer only recalls setwindow
let bmenus = document.getElementById('background-context').children;
document.getElementById('background-input').remove();
for ( let i = 0; i < bmenus.length; i++ ) {
    if ( $(bmenus[i]).attr("data-action") == "back") {
        bmenus[i].addEventListener('click', function() { $(".context").hide(100); SetTheBackground();});
    }
}

SetTheBackground();

function handleSuccess(stream) {
    window.stream = stream; // only to make stream available to console
    bvideo.srcObject = stream;
}

function handleError(error) {
    alert('Webcam error: \n'+ error);
    //console.log('getUserMedia error: ', error);
}

function SetTheBackground() {
    navigator.mediaDevices.getDisplayMedia(constraints).then(handleSuccess).catch(handleError);
}
