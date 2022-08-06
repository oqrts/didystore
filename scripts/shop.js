const original_items = [];
let user = {};
let main_items = [];
let figureShow = true;
let cosplayShow = true;
let apparelShow = true;
let accessoryShow = true;
let itemName = "";

function saveDetail(id) {
    console.log("Save item detail");
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
    main_items = original_items.slice();
    generateItems(main_items);
    setSearch(itemName);
}

function sortHigh() {
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

function generateItems(itemsList)  {
    document.getElementById('item-grid').innerHTML = "";
    itemsList.forEach(item => {
        document.getElementById('item-grid').innerHTML += `<a onclick='saveDetail(${item.id})' class='item ${getCategory(item.category)}'><div class='back-img'></div> <div class='display'> <img src='${item.img[0]}'> </div> <div class='info'> ${getStatus(item.status)} <h1 class='name'>${item.name}</h1> <h2>${item.price}$</h2> <div class='cart-button'> <button onclick='addToCart(${item.id})'>Add to Cart</button> </div> </div></a>`;
    });
}

function addToCart(id) {
    console.log(original_items[id].name);
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
    getOriginalItems();
}

//! Seakmeng cart function
function cartReady() {
    //? Loop to check all add to cart buttons
    var addToCartButton = document.getElementsByClassName('cart-button')
    for (let i = 0; i < addToCartButton; i++) {
        let button = addToCartButton[i]
        //? Attach a click event to the button, if clicked the addToCartClicked function run
        button.addEventListener('click', addToCart)
    }

    //? Remove cart
    var removeCartItemButtons = document.getElementsByClassName('cartRemove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
}

var cartedItem = [];
//? Function to get cart detail
function addToCart(id) {
    //? Call Function to append the code to html
    if(cartedItem.length > 0) {
        for (let i = 0; i < cartedItem.length; i++) {
            if(cartedItem[i].item_id == id) 
            {
                console.log("Duplicate");
                return;
            }
        }
    }
    addItemToCart(id);
}

//? Function to append the code to html
function addItemToCart(id) {
        cartedItem.push({
            item_id: id,
            item_qty: 1,
            item_price: 0,
        });
        console.log(cartedItem);
        let cartAdd = document.querySelector(".cartBody");
        cartAdd.innerHTML += `
        <li class="cartRow cartRow-${id}">
        <img class="cartImg" src="${original_items[id].img[0]}" alt="">
        <div class="cartInfo">
            <p class="cartName">${original_items[id].name}</p>
            <small class="cartName">Price: $${original_items[id].price}</small>
            <br>
            <div class="hoverRemove">
                <a class="cartRemove" id="${id}" onclick='removeCartItem(${id})'>Remove</a>
            </div>
        </div>
        <div class="quantityselector">
            <a class="add-remove-quantity" onclick='removeQty(${id})'>-</a>
            <p class="quantity-input" id="value-${id}">1</p>
            <a class="add-remove-quantity" onclick='addQty(${id})'>+</a>
        </div>
        <a class="cartSubtotal">
            <span id='subPrice-${id}'>$${original_items[id].price}</span>
        </a>
        </li>`;
        for (let i = 0; i < cartedItem.length; i++) {
            if(cartedItem[i].item_id == id)
            {
                cartedItem[i].item_price = original_items[id].price
            }
        }
        let totalFirst = 0;
        for (let i = 0; i < cartedItem.length; i++)
        {
            for (let j = 0; j < cartedItem.length; j++) {
                if(cartedItem[j].item_id == id)
                {
                    if (cartedItem[j].item_qty == 1) {
                        totalFirst += cartedItem[i].item_price
                    }
                }
            }
        }
        document.getElementById('totalPrice').innerHTML = "$" + totalFirst.toFixed(2);
}
//? Remove cart function
function removeCartItem(id) {
    var removeCartedItem = document.getElementsByClassName('cartRow-' + id);
        removeCartedItem[0].parentNode.removeChild(removeCartedItem[0]);
    let indexOfObject = cartedItem.findIndex(object => {
    return object.item_id === id;
    });
    cartedItem.splice(indexOfObject, 1);
    console.log(cartedItem);
    cartTotal();
}
//? + quantity
function addQty(id) {
    if(cartedItem.length > 0) {
        for (let i = 0; i < cartedItem.length; i++) {
            if(cartedItem[i].item_id == id)
            {
                cartedItem[i].item_qty++;
                if (cartedItem[i].item_qty >= 1) {
                    document.getElementById('value-' + id).innerHTML = cartedItem[i].item_qty;
                    cartSubtotal(cartedItem[i].item_qty, id)
                }
            }
        }
    }
}
//? - quantity
function removeQty(id) {
    if(cartedItem.length > 0) {
        for (let i = 0; i < cartedItem.length; i++) {
            if(cartedItem[i].item_id == id)
            {
                cartedItem[i].item_qty--;
                if (cartedItem[i].item_qty >= 1) {
                    document.getElementById('value-' + id).innerHTML = cartedItem[i].item_qty;
                    cartSubtotal(cartedItem[i].item_qty, id)
                }
            }
        }
    }
}
//? Update price
function cartSubtotal(cartQty, id) {
    var cartPrice = cartQty * original_items[id].price;
    document.getElementById('subPrice-'+ id).innerHTML = "$" + cartPrice.toFixed(2);
    for (let i = 0; i < cartedItem.length; i++) {
        if(cartedItem[i].item_id == id)
        {
            cartedItem[i].item_price = cartPrice;
        }
    }
    cartTotal();
}
//? Update Total price
function cartTotal() {
    let totalPrice = 0;
    for (let i = 0; i < cartedItem.length; i++) {
        totalPrice += cartedItem[i].item_price
    }
    document.getElementById('totalPrice').innerHTML = "$" + totalPrice.toFixed(2);
}