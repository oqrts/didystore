
let canVoice = true;

function lingVoice() {
    if(!canVoice) return;
    var audio = document.getElementById('ling-voice');
    canVoice = false;
    audio.play();
    setTimeout(allowlingVoice, 2000);
}

function allowlingVoice() {
    canVoice = true;
}

function stoplingVoice() {
    var audio = document.getElementById('ling-voice');
    canVoice = true;
    audio.pause();
    audio.currentTime = 0;
}

canPlay2 = true;

function showLing() {
    if(!canPlay2) return;
    document.getElementById('ling-screen').style.zIndex = 2;
    document.getElementById('ling-screen').style.display = "block";
    let video = document.getElementById('ling-video');
    video.volume = 1;
    video.play();
    canPlay2 = false;
    $(document).on('keydown', function(event) {
        if (event.key == "Escape") {
            hideLing(document.getElementById('ling-video'));
            return;
        }
     }); 
}

document.getElementById('ling-video').addEventListener('ended', function(e) {
    hideLing(document.getElementById('ling-video'));
})

function hideLing(video) {
    video.pause();
    video.currentTime = 0;
    document.getElementById('ling-screen').style.display = "none";
    document.getElementById('ling-screen').style.zIndex = -1;
    canPlay2 = true;
}
