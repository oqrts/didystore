let canPlay1 = true;

function loveMusic() {
    if(!canPlay1) return;
    var audio = document.getElementById('love-music');
    canPlay1 = false;
    audio.play();
    setTimeout(allowMusic, 44000);
}

function allowMusic() {
    canPlay1 = true;
}

function stopMusic() {
    var audio = document.getElementById('love-music');
    canPlay1 = true;
    audio.pause();
    audio.currentTime = 0;
}