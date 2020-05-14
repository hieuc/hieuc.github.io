var audio = new Audio("audio/wide.mp3");

audio.loop = true;
audio.volume = 0.5;

function clicky() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}