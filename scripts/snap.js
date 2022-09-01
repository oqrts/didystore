var imageDataArray = [];
var canvasCount = 35;
let snapMember = 2;
let state = 0;
let myMembers = `<div class="content">
<div id="magic-circle">
          <img id="magic-circle-img" src="../Images/green_circle.png" alt="">
    </div>
<div class="members-grid" style="width: 100%;" id="my-content">
    <div id="member3" class="member" onmouseenter="loveMusic()" onmouseleave="stopMusic()">
        <audio id="love-music">
            <source src="../sounds/baby.wav" type="audio/ogg">
        </audio>
        <div class="image-layered">
            <img src="../images/you1.jpg" alt="">
            <img src="../images/layheng1.jpg" alt="">
        </div>
        <div class="info">
            <h2>Layheng Hok</h2>
            <div class="quote-layered" style="margin-bottom: 3.5rem;">
                <p>
                    <span>Email</span>: lhok1@paragoniu.edu.kh<br>
                    <span>Hobbies</span>: Music
                </p>
                <p style="font-size: 4rem;">
                    X
                </p>
            </div>
            <p class="specials"><span>Quote</span>: <span class="special">L</span>ook i might not have a fanc<span class="special">Y</span> car, but i fancy <span class="special">YOU</span></p>
        </div>
    </div>
    <div id="member2" class="member" onclick="printOut('Your computer has been hacked.')">
        <div class="image-layered">
            <img src="../images/hackerman.gif" alt="">
            <img src="../images/seakmeng1.jpg" alt="">
        </div>
        <div class="info">
            <h2>Seakmeng Hor</h2>
            <div>
                <p><span>Email</span>: shor1@paragoniu.edu.kh </p>
                <div class="quote-layered">
                    <p>
                        <span>Hobbies</span>: Gaming, Sleeping
                        <span>Quote</span>: ឈប់រៀន! ឈប់រីកចម្រើន!<br>
                    </p>
                    <p>
                        <span>Hobbies</span>: Gaming, Hacking<br>
                        <span>Quote</span>: <span id="hackText"></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div id="member5" class="member" onclick="showLing()" onmouseenter="lingVoice()" onmouseleave="stoplingVoice()">
        <audio id="ling-voice">
            <source src="../sounds/lingvoicehover.wav" type="audio/ogg">
        </audio>
        <div class="image-layered">
            <img src="../images/ling.png" alt="">
            <img src="../images/sal2.jpg" alt="">
        </div>
        <div class="info">
            <h2>Bovisal Zhou</h2>
            <div>
                <p><span>Email</span>: bzhou@paragoniu.edu.kh</p>
                <p><span>Hobbies</span>: Gaming, TikTok, Facebook</p>
                <div class="quote-layered">
                    <p><span>Quote</span>: Life is hard, but at least i have a pretty girlfriend</p>
                    <p><span>Quote</span>: The journey of a thousand miles begins with one step</p>
                </div>
            </div>
        </div>
    </div>
    <div id="member4" class="member" onmouseenter="rickMusic()" onmouseleave="stopRickMusic()">
        <audio id="rick-music">
            <source src="../sounds/rick.wav" type="audio/ogg">
        </audio>
        <div class="image-layered">
            <img src="../images/rickroll-roll.gif" alt="">
            <img src="../images/long1.webp" alt="">
        </div>
        <div class="info">
            <h2>Bunlong Prak</h2>
            <div>
                <p><span>Email</span>: bprak@paragoniu.edu.kh</p>
                <div class="quote-layered">
                    <p>
                        <span>Hobbies</span>: Watching Animes<br>
                        <span>Quote</span>: If You Can't Beat The Game, You're Nothing But A Loser
                    </p>
                    <p>
                        <span>Hobbies</span>: Rick Rolling<br>
                        <span>Quote</span>: Never gonna give you up, never gonna let you down
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;

let canVoice1 = true;

function useGauntlet() {
  if(state == 0) {
    startTheSnap();
    state = 1;
  }
  else {
    reverseTime();
    state = 0;
  }
}

function reverseTime() {
  $('#thanos').attr("src","../Images/thanos_reverse.gif");
  var audio = new Audio('../sounds/reverse.wav');
  audio.volume = 0.7;
  audio.play();
  document.getElementById('snap-grid').innerHTML = myMembers;
  document.getElementById('my-content').style.opacity = 0;
  document.getElementById('magic-circle').style.display = 'flex';
  document.getElementById('magic-circle').style.zIndex = 2;
  document.getElementById('magic-circle-img').style.width = '400px'; 
  setTimeout(showMembersBack, 2400);
}

function showMembersBack() {
  document.getElementById('my-content').style.opacity = 1;
  document.getElementById('magic-circle').style.display = 'none';
  document.getElementById('magic-circle').style.zIndex = -1;
  document.getElementById('magic-circle-img').style.width = '0'; 
  $('#thanos').attr("src","../Images/thanos_idle.png");
}

function thanosVoice() {
    if(!canVoice1) return;
    var audio = document.getElementById('thanos-voice');
    canVoice1 = false;
    audio.play();
    setTimeout(allowthanosVoice, 3000);
}

function allowthanosVoice() {
    canVoice1 = true;
}

function stopthanosVoice() {
    var audio = document.getElementById('thanos-voice');
    canVoice1 = true;
    audio.pause();
    audio.currentTime = 0;
}

function startTheSnap() {
  var audio = new Audio('../sounds/thesnap.wav');
  audio.volume = 0.7;
  audio.play();
  setTimeout(startSnapping, 30);
}

function startSnapping() {
  $('#thanos').attr("src","../Images/thanos_snap.gif");
  setTimeout(startSnap, 1500);
}

function startSnap() {
  $('#thanos').attr("src","../Images/thanos_idle.png"); 
  var audio = new Audio('../sounds/dusted.wav');
  audio.play();
  html2canvas($(".content")[0]).then(canvas => {
    //capture all div data as image
    ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixelArr = imageData.data;
    
    createBlankImageData(imageData);
    
    //put pixel info to imageDataArray (Weighted Distributed)
    for (let i = 0; i < pixelArr.length; i+=4) {
      //find the highest probability canvas the pixel should be in
      let p = Math.floor((i/pixelArr.length) *canvasCount);
      let a = imageDataArray[weightedRandomDistrib(p)];
      
      a[i] = pixelArr[i];
      a[i+1] = pixelArr[i+1];
      a[i+2] = pixelArr[i+2];
      a[i+3] = pixelArr[i+3]; 
    }
    
    //create canvas for each imageData and append to target element
    for (let i = 0; i < canvasCount; i++) {
      let c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
      c.classList.add("dust");
      $("#snap-grid").append(c);
    }
    
    //clear all children except the canvas
    $(".content").children().not(".dust").fadeOut(3500);
    
    //apply animation
    $(".dust").each( function(index) {
      animateBlur($(this),0.8,800);
      setTimeout(() => {
        animateTransform($(this),100,-100,chance.integer({min: -15, max: 15}), 800+(110*index));
      }, 70*index);
      
      //remove the canvas from DOM tree when faded
      $(this).delay(70*index).fadeOut((110*index)+800,"easeInQuint",()=> {$(this).remove();});
    });
  });
}

function weightedRandomDistrib(peak) {
  var prob = [], seq = [];
  
  for(let i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount-Math.abs(peak-i), 3));
    seq.push(i);
  }
  
  return chance.weighted(seq, prob);
}

function animateBlur(elem, radius, duration) {
  var r = 0;
  
  $({rad:0}).animate({rad: radius}, {
    duration: duration,
    easing: "easeOutQuad",
    step: function(now) {
      elem.css({
        filter: 'blur(' + now + 'px)'
      });
    }
  });
}

function animateTransform(elem, sx, sy, angle, duration) {
  var td = tx = ty = 0;
  
  $({x: 0, y: 0, deg: 0}).animate({x: sx, y: sy, deg: angle}, {
    duration: duration,
    easing: "easeInQuad",
    step: function(now, fx) {
      if (fx.prop == "x") 
        tx = now;
      else if (fx.prop == "y") 
        ty = now;
      else if (fx.prop == "deg") 
        td = now;
      elem.css({
        transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,'+ ty +'px)'
      });
    }
  });
}

function createBlankImageData(imageData) {
  for(let i = 0; i < canvasCount; i++) {
    let arr = new Uint8ClampedArray(imageData.data);
    
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    
    imageDataArray.push(arr);
  }
}

function newCanvasFromImageData(imageDataArray, w , h) {
  var canvas = document.createElement('canvas');
  
  canvas.width = w;
  canvas.height = h;
  tempCtx = canvas.getContext("2d");
  tempCtx.putImageData(new ImageData(imageDataArray, w , h), 0, 0);

  return canvas;
}