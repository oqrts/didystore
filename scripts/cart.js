const original_items = [];
let user = {};
let item = {};
let isInCart = false;
onmousemove = function moveScreen(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;

    let screenX = (clientX-880)/880;
    let screenY = (clientY-370)/370;
    document.getElementById("screen").style.transform = "translate(" + screenX + "rem," + screenY + "rem)";
}

window.onload = function() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('accountShow').style.display = 'block';
        console.log("test")
    }
    else {
        document.getElementById('accountShow').style.display = 'none';
        console.log("User not signed in yet!");
    }
    getOriginalItems();
}

function fetchItem() {
    return fetch('../../data/items_latest.json').then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}

//? Generate cart
function generateCartItems() {
    if(localStorage.getItem('cart') != null) {
        document.getElementById('cartBody').innerHTML = '';
    }
    cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log(cartItems);
    for (let i = 0; i < cartItems.length; i++) {
        if(original_items[cartItems[i].id].category < 1 || original_items[cartItems[i].id].category > 2) {
            document.querySelector(".cartBody").innerHTML += `
            <li class="cartRow cartPosition">
                <img class="cartImg" src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="cartInfo">
                    <p class="cartName">${original_items[cartItems[i].id].name}
                    </p>
                    <br>
                    <div class="hoverRemove">
                        <a onclick="removeFromCart(${cartItems[i].id})" class="cartRemove">REMOVE</a>
                    </div>
                </div>
                <div class="qty">
                    <div class="quantityselector">
                        <a onclick="reduceQty(${i})" class="qty add-remove-quantity">-</a>
                        <p id="qtyNum${i}"class="quantity-input">${cartItems[i].qty}</p>
                        <a onclick="addQty(${i})" class="qty add-remove-quantity">+</a>
                    </div>
                </div>
                <div class="cartPrice">
                    <span id="itemPrice${i}" class="cartName cartPrice">$${(original_items[cartItems[i].id].price).toFixed(2)}</span>
                </div>
                <a class="cartSubtotal">
                    <span id="subTotal${i}" class=" cartName">$${(original_items[cartItems[i].id].price * cartItems[i].qty).toFixed(2)}</span>
                </a>
            </li> `;
    }
        else {
            let currentItemSize = cartItems[i].size;
            if(currentItemSize == 0) currentItemSize = 'S';
            else if(currentItemSize == 1) currentItemSize = 'M';
            else if(currentItemSize == 2) currentItemSize = 'L';
            else if(currentItemSize == 3) currentItemSize = 'XL';
            else if(currentItemSize == 4) currentItemSize = 'XXL';
            document.querySelector(".cartBody").innerHTML += `
            <li class="cartRow cartPosition">
                <img class="cartImg" src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="cartInfo">
                    <p class="cartName">${original_items[cartItems[i].id].name}
                    </p>
                    <br>
                    <p class="cartName">SIZE:  ${currentItemSize}
                    </p>
                    <br>
                    <div class="hoverRemove">
                        <a onclick="removeFromCart(${cartItems[i].id})" class="cartRemove">REMOVE</a>
                    </div>
                </div>
                <div class="qty">
                    <div class="quantityselector">
                        <a onclick="reduceQty(${i})" class="qty add-remove-quantity">-</a>
                        <p id="qtyNum${i}"class="quantity-input">${cartItems[i].qty}</p>
                        <a onclick="addQty(${i})" class="qty add-remove-quantity">+</a>
                    </div>
                </div>
                <div class="cartPrice">
                    <span id="itemPrice${i}" class="cartName cartPrice">$${(original_items[cartItems[i].id].price).toFixed(2)}</span>
                </div>
                <a class="cartSubtotal">
                    <span id="subTotal${i}" class=" cartName">$${(original_items[cartItems[i].id].price * cartItems[i].qty).toFixed(2)}</span>
                </a>
            </li> `;
        }
    }
}

//! remove from cart
function removeFromCart(id) {
    let newCartItems = [];
    for (let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id != id) {
            newCartItems.push(cartItems[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    generateCartItems();
    totalPriceUpdate();
}

function totalPriceUpdate() {
    let sum = 0
    let subPrice = {};
    for (let i = 0; i < cartItems.length; i++) {
        //? convert into float and remove first character which is $
        subPrice[i] = parseFloat(document.getElementById(`subTotal${i}`).innerHTML.slice(1));
        sum = parseFloat(subPrice[i] + sum);
    }
    document.getElementById('totalPrice').innerHTML = "$" + sum.toFixed(2);
}

function subTotal(i, qty) {
    //? slice(1) = remove first character
    let price = document.getElementById(`itemPrice${i}`).innerHTML.slice(1);
    let itemSubTotal = parseFloat(price * qty);
    document.getElementById(`subTotal${i}`).innerHTML = "$" + itemSubTotal.toFixed(2);
    totalPriceUpdate()
}

function addQty(i){
    if(isInCart) return;
    item.qty = document.getElementById(`qtyNum${i}`).innerHTML;
    item.qty++;
    document.getElementById(`qtyNum${i}`).innerHTML = item.qty;
    subTotal(i, item.qty);
}

function reduceQty(i) {
    if(isInCart) return;
    item.qty = document.getElementById(`qtyNum${i}`).innerHTML;
    if(item.qty > 1) {
        item.qty--;
        document.getElementById(`qtyNum${i}`).innerHTML = item.qty;
        subTotal(i, item.qty);
    }
}

function getOriginalItems() {
    fetchItem().then(function(result) {
        for (let i = 0; i < result.length; i++) {
            original_items.push(result[i]);
            original_items[i].id = i;
        }
        generateCartItems();
        totalPriceUpdate();
    });
}