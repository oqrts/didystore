let list = [];
let figureShow = true;
let cosplayShow = true;
let apparelShow = true;
let accessoryShow = true;

function toggleFigure() {
    if(cosplayShow == false && apparelShow == false && accessoryShow == false) {
        return;
    }
    else if(figureShow) {
        document.getElementById('figureCheckBox').classList.remove('active');
        turnOff('figure');
    }
    else {
        document.getElementById('figureCheckBox').classList.add('active');
        turnOn('figure');
    }
    figureShow = !figureShow;
}

function toggleCosplay() {
    if(figureShow == false && apparelShow == false && accessoryShow == false) {
        return;
    }
    else if(cosplayShow) {
        document.getElementById('cosplayCheckBox').classList.remove('active');
        turnOff('cosplay');
    }
    else {
        document.getElementById('cosplayCheckBox').classList.add('active');
        turnOn('cosplay');
    }
    cosplayShow = !cosplayShow;
}

function toggleApparel() {
    if(figureShow == false && cosplayShow == false && accessoryShow == false) {
        return;
    }
    else if(apparelShow) {
        document.getElementById('apparelCheckBox').classList.remove('active');
        turnOff('apparel');
    }
    else {
        document.getElementById('apparelCheckBox').classList.add('active');
        turnOn('apparel');
    }
    apparelShow = !apparelShow;
}

function toggleAccessory() {
    if(figureShow == false && apparelShow == false && cosplayShow == false) {
        return;
    }
    else if(accessoryShow) {
        document.getElementById('accessoryCheckBox').classList.remove('active');
        turnOff('accessory');
    }
    else {
        document.getElementById('accessoryCheckBox').classList.add('active');
        turnOn('accessory');
    }
    accessoryShow = !accessoryShow;
}

function turnOff(className) {
    let items = document.getElementsByClassName(className);
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

function turnOn(className) {
    let items = document.getElementsByClassName(className);
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
}

function fetchItem() {
    return fetch('../data/items_latest.json').then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}

let user = {};

onmousemove = function moveScreen(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;

    let screenX = (clientX-880)/880;
    let screenY = (clientY-370)/370;
    document.getElementById("screen").style.transform = "translate(" + screenX + "rem," + screenY + "rem)";
}

function checkUser() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        displayUser();
    }
    else {
        googleSignOut();
    }
}

function googleSignOut() {
    document.getElementById('googleInfo').style.display = "none";
    document.getElementById('signInBtn').hidden = false;
    window.localStorage.clear();
}

function displayUser() {
    document.getElementById('googleInfo').style.display = "flex";
    document.getElementById('googlePic').src = user.img;
    document.getElementById('googleName').innerHTML = user.name;
    document.getElementById('signInBtn').hidden = true;
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userInfo = jwt_decode(response.credential);
    user = {
        'img': userInfo.picture,
        'name': userInfo.name,
        'email': userInfo.email
    }
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    displayUser();
}

function getCategory(category) {
    switch(category) {
        case 0:
            return "figure";
        case 1:
            return "cosplay";
        case 2:
            return "apparel";
        case 3:
            return "accessory";
        default: 
            console.log("Category error!");
    }
}

function getStatus(status) {
    if(status == 0) return "<div class='stock'> <h3>In-Stock</h3> </div>";
    else return "<div class='pre-order'> <h3>Pre-Order</h3> </div>";
}

function generateItems()  {
    list = [];
    fetchItem().then(function(result) {
        for (let i = 0; i < result.length; i++) {
            list.push(result[i]);
        }
        console.log(list);
        list.forEach(item => {
            document.getElementById('item-grid').innerHTML += `<a href='../detail/' class='item ${getCategory(item.category)}'><div class='back-img'></div> <div class='display'> <img src='${item.img[0]}'> </div> <div class='info'> ${getStatus(item.status)} <h1 class='name'>${item.name}</h1> <h2>${item.price}$</h2> <div class='cart-button'> <button>Add to Cart</button> </div> </div></a>`;
        });
    });
}

window.onload = function () {
    google.accounts.id.initialize({
    client_id: "594234124010-23ugaco82t1moqsuuco1nahdi8sv0adf.apps.googleusercontent.com",
    callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
    document.getElementById("signInBtn"),
    { theme: "outline", size: "medium" }  // customization attributes
    );
    checkUser();
    generateItems();
}



