onmousemove = function moveScreen(e) {
    let x = (e.clientX-880)/880;
    let y = (e.clientY-370)/370;
    console.log(x);
    document.getElementById("screen").style.transform = "translate(" + x + "rem," + y + "rem)";
    let a = (e.clientX-440)/440;
    let b = (e.clientY-185)/185;
    console.log(x);
    document.getElementById("back").style.transform = "translate(" + a + "rem," + b + "rem)";
}
