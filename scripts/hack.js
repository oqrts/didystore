let timePerLetter = 100;
let newLineCharacter = '|';
let firstTime = true;

function hackScreenShow() {
    document.getElementById('hacked-screen').style.zIndex = 2;
    document.getElementById('hacked-screen').style.display = "block";
    let video = document.getElementById('hacked-video');
    video.volume = 0.1;
    video.play();
    setTimeout(hackScreenHide, 14000, video);
    document.getElementById('hackText').innerHTML = 'Click';
}

function hackScreenHide(video) {
    video.pause();
    video.currentTime = 0;
    document.getElementById('hacked-screen').style.display = "none";
    document.getElementById('hacked-screen').style.zIndex = -1;
    firstTime = true;
}

function printOut(text) {
    if(!firstTime) return;
    setTimeout(hackScreenShow, 3000);
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
