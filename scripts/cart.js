const original_items = [];
let user = {};
let item = {};
let isInCart = false;
let cartItems = [];
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
        document.getElementById('no-account').style.display = 'none';
        console.log("test");
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
            let itemCategory;
            let currentItemSize = cartItems[i].size;

            if(original_items[cartItems[i].id].category == 1) {
                itemCategory = "Cosplay";
            }
            else itemCategory = "Apparel";
            document.querySelector(".cartBody").innerHTML += `
            <li class="cartRow cartPosition item">
                <img class="cartImg" src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="cartInfo">
                    <a>
                        <h2>${original_items[cartItems[i].id].name}</h2>
                        <h5> <span>Category:</span> ${itemCategory}</h5>
                    </a>
                    <div class="hoverRemove">
                        <a onclick="removeFromCart(${cartItems[i].id})" class="cartRemove">REMOVE</a>
                    </div>
                </div>
                <div class="qty">
                    <div class="quantityselector">
                        <span onclick="reduceQty(${i})" class="qty add-remove-quantity">-</span>
                        <p id="qtyNum${i}"class="quantity-input">${cartItems[i].qty}</p>
                        <span onclick="addQty(${i})" class="qty add-remove-quantity">+</span>
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
            let itemCategory;
            let currentItemSize = cartItems[i].size;

            if(original_items[cartItems[i].id].category == 1) {
                itemCategory = "Cosplay";
            }
            else itemCategory = "Apparel";

            if(currentItemSize == 0) currentItemSize = 'S';
            else if(currentItemSize == 1) currentItemSize = 'M';
            else if(currentItemSize == 2) currentItemSize = 'L';
            else if(currentItemSize == 3) currentItemSize = 'XL';
            else if(currentItemSize == 4) currentItemSize = 'XXL';
            document.querySelector(".cartBody").innerHTML += `
            <li class="cartRow cartPosition item">
                <img class="cartImg" src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="cartInfo">
                    <a>
                        <h2>${original_items[cartItems[i].id].name}</h2>
                        <h5> <span>Category:</span> ${itemCategory}, <span>Size:</span> ${currentItemSize}</h5>
                    </a>
                    <div class="hoverRemove">
                        <a onclick="removeFromCart(${cartItems[i].id})" class="cartRemove">REMOVE</a>
                    </div>
                </div>
                <div class="qty">
                    <div class="quantityselector">
                        <span onclick="reduceQty(${i})" class="qty add-remove-quantity">-</span>
                        <p id="qtyNum${i}"class="quantity-input">${cartItems[i].qty}</p>
                        <span onclick="addQty(${i})" class="qty add-remove-quantity">+</span>
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
    cartItems[i].qty = document.getElementById(`qtyNum${i}`).innerHTML;
    cartItems[i].qty++;
    document.getElementById(`qtyNum${i}`).innerHTML = cartItems[i].qty;
    subTotal(i, cartItems[i].qty);
}

function reduceQty(i) {
    if(isInCart) return;
    cartItems[i].qty = document.getElementById(`qtyNum${i}`).innerHTML;
    if(cartItems[i].qty > 1) {
        cartItems[i].qty--;
        document.getElementById(`qtyNum${i}`).innerHTML = cartItems[i].qty;
        subTotal(i, cartItems[i].qty);
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

function checkOut() {
    
    if(localStorage.getItem('user') == null) {
        console.log("User not login");
        return;
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    let checkOutItems = JSON.parse(localStorage.getItem('cart'));
        for (let i = 0; i < checkOutItems.length; i++) {
            let date = new Date();
            let result = date.toLocaleDateString("en-GB", { // you can use undefined as first argument
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
            });
            checkOutItems[i].date = result;
        }
        console.log(user.email);
        axios.post('https://animedstore-api.netlify.app/.netlify/functions/api/addItemToUser', { 
            email: user.email,
            items: checkOutItems
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('cart', JSON.stringify([]));
            window.location.href = '../account/';
        });
}