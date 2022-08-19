let user = {};

window.onload = function() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('googlePic').src = user.img;
        document.getElementById('googleName').innerHTML = user.name;
        document.getElementById('googleEmail').innerHTML = user.email;
        loadHistory();
    }
    else {
        console.log("User not signed in yet!");
    }
}

function signOut() {
    window.localStorage.clear();
    window.location.href = "../shop/";
}

function loadHistory() {
    axios.get('localhost:300/users/' + user.email, (res) => {
        console.log(res.data);
    })
}