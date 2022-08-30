const original_items = [];
let user = {};
let totalSpent = 0;
let totalItems = 0;

onmousemove = function moveScreen(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;

    let screenX = (clientX-880)/880;
    let screenY = (clientY-370)/370;
    document.getElementById("screen").style.transform = "translate(" + screenX + "rem," + screenY + "rem)";

    let membersX = (clientX-1000)/1000;
    let membersY = (clientY-800)/800;
    document.getElementById("members").style.transform = "translate(" + membersX + "rem," + membersY + "rem)";
}


window.onload = function() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('googlePic').src = user.img;
        document.getElementById('googleName').innerHTML = user.name;
        document.getElementById('googleEmail').innerHTML = user.email;
        getOriginalItems();
    }
    else {
        console.log("User not signed in yet!");
    }
}

function signOut() {
    window.localStorage.clear();
    window.location.href = "../shop/";
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
        loadHistory();
    });
}

function saveDetail(id) {
    localStorage.setItem("item_details", JSON.stringify(original_items[id]));
    window.location.href = '../shop/detail';
}

function loadHistory() {
    axios.get('https://animedstore-api.netlify.app/.netlify/functions/api/users/' + user.email).then((res) => {
        console.log(res.data);
        let purchasedItems = res.data.history.reverse();
        purchasedItems.forEach(item => {
            totalSpent += (item.qty * original_items[item.id].price);
            totalItems += item.qty;
            if(original_items[item.id].category < 1 || original_items[item.id].category > 2) {
                let itemCategory;

                if(original_items[item.id].category == 0) {
                    itemCategory = "Figure";
                }
                else itemCategory = "Accessory";

                document.getElementById('purchased-items').innerHTML += `
                <li class="item">
                    <div class="img-wrapper">
                        <img src="${original_items[item.id].img[0]}" alt="">
                    </div>
                    <a onclick="saveDetail(${item.id})">
                        <h2>${original_items[item.id].name}</h2>
                        <h5> <span>Category:</span> ${itemCategory}</h5>
                    </a>
                    <h3>$${(original_items[item.id].price * item.qty).toFixed(2)}</h3>
                    <h3>${item.qty}</h3>
                    <h3>${item.date}</h3>
                </li>`;
            }
            else {
                let itemCategory;
                let itemSize;

                if(original_items[item.id].category == 1) {
                    itemCategory = "Cosplay";
                }
                else itemCategory = "Apparel";

                switch(item.size) {
                    case 0:
                        itemSize = "S";
                        break;
                    case 1:
                        itemSize = "M";
                        break;
                    case 2:
                        itemSize = "L";
                        break;
                    case 3:
                        itemSize = "XL";
                        break;  
                    case 4:
                        itemSize = "XXL";
                        break; 
                }

                document.getElementById('purchased-items').innerHTML += `
                <li class="item">
                    <div class="img-wrapper">
                        <img src="${original_items[item.id].img[0]}" alt="">
                    </div>
                    <a onclick="saveDetail(${item.id})">
                        <h2>${original_items[item.id].name}</h2>
                        <h5> <span>Category:</span> ${itemCategory}, <span>Size:</span> ${itemSize}</h5>
                    </a>
                    <h3>$${(original_items[item.id].price * item.qty).toFixed(2)}</h3>
                    <h3>${item.qty}</h3>
                    <h3>${item.date}</h3>
                </li>`;
            }
        });
        document.getElementById('total-spent').innerHTML = "$" + totalSpent.toFixed(2) ;
        document.getElementById('total-items').innerHTML = totalItems;
    })
}