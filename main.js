let cartIcon = document.querySelector(".bx-cart");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = ("click", () => {
    cart.classList.add("active")
});

closeCart.onclick = ("click", () => {
    cart.classList.remove("active");
});

    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", ready);
    } else {
        ready();
    }

function ready() {
    var removeCartButtons = document.querySelectorAll(".cart-box .bx.bxs-trash-alt");

    console.log(removeCartButtons);
        for (let i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener("click", removeCartItem);
    }

    var quantityInput = document.getElementsByClassName("cart-quantity");
        for(var i = 0; i < quantityInput.length; i++) {
            var input = quantityInput[i];
            input.addEventListener("change", quantityChange);
        }
        var addCart =  document.querySelectorAll(".bxs-cart-add");
        for(var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener("click", addCartClicked);
        }

        document.getElementsByClassName("buy-btn")[0].addEventListener("click", buyButtonClicked);

}

function buyButtonClicked() {
    alert("Your Order is placed");

    var cartContent = document.getElementsByClassName("cart-content")[0];
        while(cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }

        updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChange(event) {
    var input = event.target
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
        updateTotal();
}


function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-name")[0].innerText;
    var price = shopProducts.getElementsByClassName("product-price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    
    addProduct(title, price, productImg);
    updateTotal();
}

function addProduct(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        for(var i = 0; i < cartItemsNames.length; i++) {
            if(cartItemsNames[i].innerText == title) {

            alert("You have already add this item to cart");
            return;
            }
        }

        var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChange);

    updateTotal()
}

function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var priceText = priceElement.innerText.replace("R$", "");
            var price = parseFloat(priceText.replace(",", "."));

            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var quantity = parseInt(quantityElement.value, 10);
    
            total = total + (price * quantity);
        }
                total = Math.round(total * 100) / 100;
                document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
}