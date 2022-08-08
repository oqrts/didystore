let price = 50;
let isInCart = false;
let item = {};

onmousemove = function moveScreen(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;

    let screenX = (clientX-880)/880;
    let screenY = (clientY-370)/370;
    document.getElementById("screen").style.transform = "translate(" + screenX + "rem," + screenY + "rem)";
}

window.onload = function() {
    sumPrice();
    getItemDetail();
    displayItem();
}

function displayItem() {
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
    for (let i = 0; i < 4; i++) {
        document.getElementById('slide').innerHTML += `<img src="${item.img[i]}">`;
    }

    //Name
    document.getElementById('item-name').innerHTML = item.name;

    //Price
    document.getElementById('item-price').innerHTML = item.price + "$";
    price = item.price;
    sumPrice();

    //Show Size
    if(item.category < 1 || item.category > 2) {
        document.getElementById('size-section').style.display = 'none';
        document.getElementById('addToCart').innerHTML = "ADD TO CART";
        document.getElementById('addToCart').classList.remove('block');
        document.getElementById('addToCart').disabled = false;
        document.getElementById('size-guide').style.display = 'none';
    }
}

function getItemDetail() {
    if(localStorage.getItem('item_details') != null) {
        item = JSON.parse(localStorage.getItem('item_details'));
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
    document.getElementById('priceSum').innerHTML = (parseFloat(document.getElementById('qty').innerHTML) * price).toFixed(2) + "$";
}

function reduceQty() {
    if(parseFloat(document.getElementById('qty').innerHTML) > 1) {
        document.getElementById('qty').innerHTML = parseInt(document.getElementById('qty').innerHTML) - 1;
        sumPrice();
    }
}

function addQty() {
    document.getElementById('qty').innerHTML = parseInt(document.getElementById('qty').innerHTML) + 1;
    sumPrice();
}

function selectSize(size) {
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

function addToCart() {
    if(!isInCart) {
        document.getElementById('addToCart').innerHTML = "REMOVE FROM CART";
        document.getElementById('addToCart').classList.add('remove');
        document.getElementById('inCartText').style.display = 'block';
        isInCart = true;
    }
    else {
        document.getElementById('addToCart').innerHTML = "ADD TO CART";
        document.getElementById('addToCart').classList.remove('remove');
        document.getElementById('inCartText').style.display = 'none';
        isInCart = false;
    }
}