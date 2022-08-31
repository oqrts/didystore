const original_items = [];
let user = {};
let isInCart = false;
let item = {};
let cartShow = false;

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
    }
    else {
        document.getElementById('accountShow').style.display = 'none';
        console.log("User not signed in yet!");
    }
    getOriginalItems();
}

function checkOut() { 
    if(localStorage.getItem('cart') == null) {
        return;
    }
    else if(JSON.parse(localStorage.getItem('cart')).length == 0) {
        return;
    }
    else {
        window.location.href = "../../cart/";
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
    if(item.id == id) {
        addToCart();
        return;
    }
    let newCartItems = [];
    for (let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id != id) {
            newCartItems.push(cartItems[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    generateCartItems();
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


function displayItem() {
    console.log(item.img.length);
    //Image Selection
    for (let i = 0; i < item.img.length; i++) {
        if(i == 0) {
            document.getElementById('img-selector').innerHTML += `<img class="active" onclick="moveSlideTo(0)" id="img-select-0" src="${item.img[0]}">`;
        }
        else {
            document.getElementById('img-selector').innerHTML += `<img onclick="moveSlideTo(${i})" id="img-select-${i}" src="${item.img[i]}">`;
        }
    }

    //Slide Images
    for (let i = 0; i < item.img.length; i++) {
        document.getElementById('slide').innerHTML += `<img src="${item.img[i]}">`;
    }

    //Name
    document.getElementById('item-name').innerHTML = item.name;

    //Price
    document.getElementById('item-price').innerHTML = "$" + item.price;

    //Price
    document.getElementById('priceSum').innerHTML = "$" + item.price;

    //Description
    document.getElementById('desc').innerHTML = "<h3>Description:</h3>" + item.desc;
}

function getItemDetail() {
    if(localStorage.getItem('item_details') != null) {
        item = JSON.parse(localStorage.getItem('item_details'));
        item.qty = 1;
        console.log(item);
    }
    else {
        console.log("No item to see detail of!");
    }
    
}

function moveSlideTo(pos) {
    document.getElementById('slide').style.transform = `translateX(${pos * -100}%)`;
    let images = document.getElementById('img-selector').childElementCount;
    for (let i = 0; i < images; i++) {
        if(i == pos) {
            document.getElementById(`img-select-${i}`).classList.add('active');
        }
        else {
            document.getElementById(`img-select-${i}`).classList.remove('active');
        }
    }
}

function sumPrice() {
    document.getElementById('priceSum').innerHTML = "$" + (item.qty * item.price).toFixed(2);
}

function selectSize(size) {
    if(isInCart) return;
    item.size = size;
    document.getElementById('addToCart').disabled = false;
    for (let i = 0; i < 5; i++) {
        if(i == size) {
            document.getElementById(`size-${size}`).classList.add('active');
        }
        else {
            document.getElementById(`size-${i}`).classList.remove('active');
        }
    }
    document.getElementById('addToCart').innerHTML = "ADD TO CART";
    document.getElementById('addToCart').classList.remove('block');
}

function addQty(){
    if(isInCart) return;
    item.qty++;
    document.getElementById('qty').innerHTML = item.qty;
    sumPrice();
}

function reduceQty() {
    if(isInCart) return;
    if(item.qty > 1) {
        item.qty--;
        document.getElementById('qty').innerHTML = item.qty;
        sumPrice();
    }
}

function addToCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let newCartItems = [];
    if(isInCart) {
        for (let i = 0; i < cartItems.length; i++) {
            if(cartItems[i].id != item.id) {
                newCartItems.push(cartItems[i]);
            }
        }
        document.getElementById('addToCart').innerHTML = "ADD TO CART";
        document.getElementById('addToCart').classList.remove('remove');
        document.getElementById('inCartText').style.display = 'none';
        item.qty = 1;
        document.getElementById('qty').innerHTML = item.qty;
        sumPrice();
        isInCart = false;
    }
    else  {
        newCartItems = cartItems;
        let newItem = {
            id: item.id,
            qty: item.qty,
            size: item.size
        }
        console.log(newItem);
        newCartItems.push(newItem);
        document.getElementById('addToCart').innerHTML = "REMOVE FROM CART";
        document.getElementById('addToCart').classList.add('remove');
        document.getElementById('inCartText').style.display = 'block';
        isInCart = true;
    }
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    generateCartItems();
}

function checkCart()
{   
    if(original_items[item.id].category < 1 || original_items[item.id].category > 2) {
        selectSize(0);
        document.getElementById('size-section').style.display = 'none'; 
        document.getElementById('size-guide').style.display = 'none'; 
    }
    if(localStorage.getItem('cart') != null) {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if(cartItems.length > 0) {
            for (let i = 0; i < cartItems.length; i++) {
                if(cartItems[i].id == item.id) {
                    console.log("Item is in cart!");
                    document.getElementById('addToCart').disabled = false;
                    console.log(cartItems[i].size);
                    document.getElementById(`size-${cartItems[i].size}`).classList.add('active');
                    document.getElementById('addToCart').classList.remove('block');
                    document.getElementById('addToCart').innerHTML = "REMOVE FROM CART";
                    document.getElementById('addToCart').classList.add('remove');
                    document.getElementById('inCartText').style.display = 'block';
                    document.getElementById('qty').innerHTML = cartItems[i].qty;
                    item.qty = cartItems[i].qty;
                    sumPrice();
                    isInCart = true;
                }
            }
        }
        else {
            console.log("Item is NOT in cart");
            if(item.category < 1 || item.category > 2) {
                console.log(item.category);
                document.getElementById('addToCart').innerHTML = "ADD TO CART";
            }
            else {
                document.getElementById('addToCart').innerHTML = "PLEASE SELECT A SIZE";
            }
            document.getElementById('addToCart').classList.remove('remove');
            document.getElementById('inCartText').style.display = 'none';
            isInCart = false;
        }
    }
    else {
        let emptyCart = []
        localStorage.setItem('cart', JSON.stringify(emptyCart));
        console.log("Item is NOT in cart");
        document.getElementById('addToCart').innerHTML = "ADD TO CART";
        document.getElementById('addToCart').classList.remove('remove');
        document.getElementById('inCartText').style.display = 'none';
        isInCart = false;
    }
}

function fetchItem() {
    return fetch('../../data/items_latest.json').then(function(response) {
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
        getItemDetail();
        displayItem();
        checkCart();
        generateCartItems();
    });
}
