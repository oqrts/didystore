const original_items = [];
let user = {};
let item = {};

window.onload = function() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('accountShow').style.display = 'none';
    }
    else {
        document.getElementById('accountShow').style.display = 'none';
        console.log("User not signed in yet!");
    }
    getOriginalItems();
    console.log("done");
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
            document.querySelector(".cartBody").innerHTML += `
            <li class="cartRow cartRow-${id} cartPosition">
                <img class="cartImg" src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="cartInfo">
                    <p class="cartName">${original_items[cartItems[i].id].name}
                    </p>
                    <br>
                    <div class="hoverRemove">
                        <a onclick="removeFromCart(${cartItems[i].id})" class="cartRemove" id="${id}">REMOVE</a>
                    </div>
                </div>
                <div class="qty">
                    <div class="quantityselector">
                        <a class="add-remove-quantity">-</a>
                        <p class="${cartItems[i].qty}" id="value-${id}">1</p>
                        <a class="add-remove-quantity">+</a>
                    </div>
                </div>
                <div class="cartPrice">
                    <span class="cartName cartPrice">$${(original_items[cartItems[i].id].price).toFixed(2)}</span>
                </div>
                <a class="cartSubtotal">
                    <span id='subPrice-${id}' class="cartName">$${(original_items[cartItems[i].id].price * cartItems[i].qty).toFixed(2)}</span>
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
            <li class="cartRow cartRow-${id} cartPosition">
                <img class="cartImg" src="${original_items[cartItems[i].id].img[0]}" alt="">
                <div class="cartInfo">
                    <p class="cartName">${original_items[cartItems[i].id].name}
                    </p>
                    <br>
                    <p class="cartName">SIZE:  ${currentItemSize}
                    </p>
                    <br>
                    <div class="hoverRemove">
                        <a onclick="removeFromCart(${cartItems[i].id})" class="cartRemove" id="${id}">REMOVE</a>
                    </div>
                </div>
                <div class="qty">
                    <div class="quantityselector">
                        <a class="add-remove-quantity">-</a>
                        <p class="${cartItems[i].qty}" id="value-${id}">1</p>
                        <a class="add-remove-quantity">+</a>
                    </div>
                </div>
                <div class="cartPrice">
                    <span class="cartName cartPrice">$${(original_items[cartItems[i].id].price).toFixed(2)}</span>
                </div>
                <a class="cartSubtotal">
                    <span id='subPrice-${id}' class="cartName">$${(original_items[cartItems[i].id].price * cartItems[i].qty).toFixed(2)}</span>
                </a>
            </li> `;
        }
    }
}

function getOriginalItems() {
    fetchItem().then(function(result) {
        for (let i = 0; i < result.length; i++) {
            original_items.push(result[i]);
            original_items[i].id = i;
        }
        generateCartItems();
    });
}