//web cam draggable
//created by Mr L 2026

let outer = CreateNewObj();
let menu = CreateDefaultContextMenu(outer);
let video = document.createElement("video");
video.style.objectFit = "cover";
video.style.zIndex = 1;
video.autoplay = true;
outer.style.height = "480px";
video.muted = true;
outer.appendChild(video);

var constraints = {
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // only to make stream available to console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
