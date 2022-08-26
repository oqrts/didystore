const original_items = [];
let user = {};
let main_items = [];
let figureShow = true;
let cosplayShow = true;
let apparelShow = true;
let accessoryShow = true;
let cartShow = false;
let cartItems = [];
let itemName = "";

function saveDetail(id) {
    localStorage.setItem("item_details", JSON.stringify(original_items[id]));
    window.location.href = './detail';
}

function setFilter() {
    if(figureShow) turnOn('figure');
    else turnOff('figure');
    if(cosplayShow) turnOn('cosplay');
    else turnOff('cosplay');
    if(apparelShow) turnOn('apparel');
    else turnOff('apparel');
    if(accessoryShow) turnOn('accessory');
    else turnOff('accessory');
}

function sortOld() {
    document.getElementById('high').classList.remove('selected');
    document.getElementById('low').classList.remove('selected');
    document.getElementById('new').classList.remove('selected');
    document.getElementById('old').classList.add('selected');
    main_items = original_items.slice();
    main_items.reverse();
    console.log(original_items);
    generateItems(main_items);
    setSearch(itemName);
}

function sortNew() {
    document.getElementById('high').classList.remove('selected');
    document.getElementById('low').classList.remove('selected');
    document.getElementById('new').classList.add('selected');
    document.getElementById('old').classList.remove('selected');
    main_items = original_items;
    generateItems(original_items);
    setSearch(itemName);
    console.log(original_items);
}

function sortHigh() {
    main_items = original_items.slice();
    main_items.sort(function(a, b){
        return b.price - a.price;
    });
    document.getElementById('high').classList.add('selected');
    document.getElementById('low').classList.remove('selected');
    document.getElementById('new').classList.remove('selected');
    document.getElementById('old').classList.remove('selected');
    generateItems(main_items);
    setSearch(itemName);
}

function sortLow() {
    main_items = original_items.slice();
    main_items.sort(function(a, b){
        return a.price - b.price;
    });
    document.getElementById('high').classList.remove('selected');
    document.getElementById('low').classList.add('selected');
    document.getElementById('new').classList.remove('selected');
    document.getElementById('old').classList.remove('selected');
    generateItems(main_items);
    setSearch(itemName);
}

function setSearch() {
    let searchedItems = [];
    let count = 0;
    main_items.forEach(item => {
        if(item.name.toUpperCase().search(itemName.toUpperCase()) >= 0) {
            searchedItems[count] = item;
            count++;
        }
    });
    generateItems(searchedItems);
    setFilter();
}

function searchItem() {
    itemName = document.getElementById('searchBar').value;
    setSearch(itemName);
}

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
        items[i].classList.remove('itemFadeIn');
        items[i].classList.add('itemFadeOut');
    }
    setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }
    }, 500);
}

function turnOn(className) {
    let items = document.getElementsByClassName(className);
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('itemFadeOut');
        items[i].classList.add('itemFadeIn');
    }
    setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "block";
        }
    }, 500);
}

function fetchItem() {
    return fetch('../data/items_latest.json').then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}

function getOriginalItems() {
    fetchItem().then(function(result) {
        for (let i = 0; i < result.length; i++) {
            original_items.push(result[i]);
            original_items[i].id = i;
        }
        main_items = original_items;
        console.log(main_items);
        generateItems(main_items);
        generateCartItems();
    });
}

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
        axios.post('https://animedstore-api.netlify.app/.netlify/functions/api/signIn', { email: user.email }).then((res) => {
            console.log(res.data);
        })
    }
    else {
        document.getElementById('accountShow').style.display = 'none';
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
    axios.get('https://animedstore-api.netlify.app/.netlify/functions/api/users').then((res) => {
        console.log(res.data);
    });
    axios.post('https://animedstore-api.netlify.app/.netlify/functions/api/signIn', { email: user.email}).then((res) => {
        console.log(res.data);
    });
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

function generateItems(itemsList)  {
    document.getElementById('item-grid').innerHTML = "";
    itemsList.forEach(item => {
        document.getElementById('item-grid').innerHTML += `<a onclick='saveDetail(${item.id})' class='item ${getCategory(item.category)}'><div class='back-img'></div> <div class='display'> <img src='${item.img[0]}'> </div> <div class='info'> ${getStatus(item.status)} <h1 class='name'>${item.name}</h1> <h2>$${item.price}</h2> <div class='cart-button'> </div> </div></a>`;
    });
}


function toggleCart() {
    if(cartShow) {
        document.getElementById('page').classList.remove('active');
        cartShow = false;
    }
    else {
        document.getElementById('page').classList.add('active');
        cartShow = true;
    }
}

function generateCartItems() {
    if(localStorage.getItem('cart') == null) {
        let emptyCart = [];
        localStorage.setItem('cart', JSON.stringify(emptyCart));
        document.getElementById('cartBucket').innerHTML = "<div class='empty-cart'>Cart is empty</div>";
    }
    else if(JSON.parse(localStorage.getItem('cart')).length == 0) {
        document.getElementById('cartBucket').innerHTML = "<div class='empty-cart'>Cart is empty</div>";
    }
    else {
        document.getElementById('cartBucket').innerHTML = '';
    }
    cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log(cartItems);
    for (let i = 0; i < cartItems.length; i++) {
        if(original_items[cartItems[i].id].category < 1 || original_items[cartItems[i].id].category > 2) {
            document.getElementById('cartBucket').innerHTML += `
            <div class="cart-item">
                <img src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="info">
                    <h1>${original_items[cartItems[i].id].name}</h1>
                    <div class="bot">
                        <h3>Quantity: ${cartItems[i].qty}</h3>
                        <div class="price-remove">
                            <h2>$${(original_items[cartItems[i].id].price * cartItems[i].qty).toFixed(2)}</h2>
                            <h2 onclick="removeFromCart(${cartItems[i].id})">Remove</h2>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        else {
            let currentItemSize = cartItems[i].size;
            if(currentItemSize == 0) currentItemSize = 'S';
            else if(currentItemSize == 1) currentItemSize = 'M';
            else if(currentItemSize == 2) currentItemSize = 'L';
            else if(currentItemSize == 3) currentItemSize = 'XL';
            else if(currentItemSize == 4) currentItemSize = 'XXL';
            document.getElementById('cartBucket').innerHTML += `
            <div class="cart-item">
                <img src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="info">
                    <h1>${original_items[cartItems[i].id].name}</h1>
                    <div class="bot">
                        <h3>Size: ${currentItemSize}</h3>
                        <h3>Quantity: ${cartItems[i].qty}</h3>
                        <div class="price-remove">
                            <h2>$${(original_items[cartItems[i].id].price * cartItems[i].qty).toFixed(2)}</h2>
                            <h2 onclick="removeFromCart(${cartItems[i].id})">Remove</h2>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }
}

function removeFromCart(id) {
    let newCartItems = [];
    for (let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id != id) {
            newCartItems.push(cartItems[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    generateCartItems();
}

function checkOut() {
    if(localStorage.getItem('cart') == null) {
        return;
    }
    else if(JSON.parse(localStorage.getItem('cart')).length == 0) {
        return;
    }
    else {
        window.location.href = "../cart/";
    }
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
    getOriginalItems();
}

