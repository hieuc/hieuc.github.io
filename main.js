var audio = new Audio("audio/wide.mp3");

audio.loop = true;
audio.volume = 0.5;

function clicky() {
    var emote = document.getElementById("wide");
    
    if (audio.paused) {
        audio.play();
        emote.classList.add("animated");
    } else {
        audio.pause();
        emote.classList.remove("animated");
    }
}