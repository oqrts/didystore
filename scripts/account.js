window.onload = function() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('googlePic').src = user.img;
        document.getElementById('googleName').innerHTML = user.name;
        document.getElementById('googleEmail').innerHTML = user.email;
    }
    else {
        console.log("User not signed in yet!");
    }
}

function signOut() {
    window.localStorage.clear();
    window.location.href = "../shop/";
}