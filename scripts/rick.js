let canPlay = true;

function rickMusic() {
    if(!canPlay) return;
    var audio = document.getElementById('rick-music');
    canPlay = false;
    audio.play();
    setTimeout(allowRickMusic, 44000);
}

function allowRickMusic() {
    canPlay = true;
}

function stopRickMusic() {
    var audio = document.getElementById('rick-music');
    canPlay = true;
    audio.pause();
    audio.currentTime = 0;
}