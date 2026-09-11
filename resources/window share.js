//window share draggable
//created by Mr L 2026

let outer = CreateNewObj();
let menu = CreateDefaultContextMenu(outer);
let video = document.createElement("video");
video.style.objectFit = "cover";
video.style.zIndex = 1;
video.autoplay = true;
video.muted = true;
outer.appendChild(video);

var constraints = {
  video: true
};

SetWindow();
let lie = AddContextItem(menu,"neww",`<span class="material-symbols-outlined">video_frame_copy</span>Select window to share`,true);
lie.addEventListener('click', function() { $(".context").hide(100); SetWindow();});

function handleSuccess(stream) {
  window.stream = stream; // only to make stream available to console
  video.srcObject = stream;
}

function handleError(error) {
  alert('Webcam error: \n'+ error);
  //console.log('getUserMedia error: ', error);
}

function SetWindow() {
    navigator.mediaDevices.getDisplayMedia(constraints).then(handleSuccess).catch(handleError);
}
