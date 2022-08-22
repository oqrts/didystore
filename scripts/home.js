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

window.onload = function() {
    if(localStorage.getItem('user') == null) {
        document.getElementById('accountShow').style.display = 'none';
    }
    else {
        console.log("User not signed in yet!");
    }
}
