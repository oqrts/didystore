onmousemove = function moveScreen(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;

    let screenX = (clientX-880)/880;
    let screenY = (clientY-370)/370;
    document.getElementById("screen").style.transform = "translate(" + screenX + "rem," + screenY + "rem)";

    let membersX = (clientX-1000)/1000;
    let membersY = (clientY-800)/800;
    document.getElementById("members").style.transform = "translate(" + membersX + "rem," + membersY + "rem)";
}

window.onload = function() {
    if(localStorage.getItem('user') == null) {
        document.getElementById('accountShow').style.display = 'none';
    }
    else {
        console.log("User not signed in yet!");
    }
}
