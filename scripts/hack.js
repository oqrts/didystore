let timePerLetter = 100;
let newLineCharacter = '|';
let firstTime = true;

let canPlayCode = true;

function codeMusic() {
    if(!canPlayCode) return;
    var audio = document.getElementById('code-music');
    canPlayCode = false;
    audio.volume = 0.1;
    audio.play();
    setTimeout(allowCodeMusic, 44000);
}

function allowCodeMusic() {
    canPlayCode = true;
}

function stopCodeMusic() {
    var audio = document.getElementById('code-music');
    canPlayCode = true;
    audio.pause();
    audio.currentTime = 0;
}

function hackScreenShow() {
    document.getElementById('hacked-screen').style.zIndex = 2;
    document.getElementById('hacked-screen').style.display = "block";
    let video = document.getElementById('hacked-video');
    video.volume = 0.1;
    video.play();
    setTimeout(hackScreenHide, 14000, video);
    document.getElementById('hackText').innerHTML = '';
}

function hackScreenHide(video) {
    video.pause();
    video.currentTime = 0;
    document.getElementById('hacked-screen').style.display = "none";
    document.getElementById('hacked-screen').style.zIndex = -1;
    firstTime = true;
}

function typingSound() {
    stopCodeMusic();
    var audio = new Audio('../sounds/typing.wav');
    audio.play();
}

function hackVoice() {
    var audio = new Audio('../sounds/hackvoice.wav');
    audio.play();
}

function printOut(text) {
    if(!firstTime) return;
    typingSound();
    setTimeout(hackScreenShow, 5000);
    setTimeout(hackVoice, 3500);
    for(var i = 0; i < text.length; i++) {
        var CHAR = text[i];
        setTimeout(appendLetter, timePerLetter*i, CHAR);
    }
    firstTime = false;
}

function appendLetter(character)
{
    console.log("printing text");
    if(newLineCharacter == character)
    {
        $('#hackText').append('<br>');
    }
    else
    {
        document.getElementById('hackText').innerHTML += character;
    }    
}
