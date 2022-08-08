onmousemove = function moveScreen(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;

    let screenX = (clientX-880)/880;
    let screenY = (clientY-370)/370;
    document.getElementById("screen").style.transform = "translate(" + screenX + "rem," + screenY + "rem)";

    let spaceX = (clientX-440)/440;
    let spaceY = (clientY-185)/185;
    document.getElementById("space").style.transform = "translate(" + spaceX + "rem," + spaceY + "rem)";

}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = document.createElement("img");
img.src = window.getComputedStyle(canvas).backgroundImage.slice(4, -1).replace(/"/g, "");

img.onload = function () {
    drawText();
}

function drawText() {
    ctx.font = window.getComputedStyle(canvas).font;
    ctx.fillStyle = ctx.createPattern(img, 'repeat');
    ctx.textAlign = 'center';
    var x = canvas.width / 2,
        y = 0;
    ctx.fillText(canvas.textContent, x, 200);
    ctx.fill();
}
