let canPlay = true;

function loveMusic() {
    if(!canPlay) return;
    var audio = document.getElementById('love-music');
    canPlay = false;
    audio.play();
    setTimeout(allowMusic, 7000);
}

function allowMusic() {
    canPlay = true;
}

function stopMusic() {
    var audio = document.getElementById('love-music');
    canPlay = true;
    audio.pause();
    audio.currentTime = 0;
}