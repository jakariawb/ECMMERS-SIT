



var cart = JSON.parse(localStorage.getItem('cart')) || [];
var totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

var addTOCartButton = document.querySelectorAll('.add-to-cart');
var cartItem = document.getElementById('cart-item');
var itemTtalPrice = document.getElementById('total');
var BuyNow = document.getElementById('BuyNow')

addTOCartButton.forEach(Button => {
    Button.addEventListener('click', () => {
        var productName = Button.getAttribute('data-name');
        var productPric = parseFloat(Button.getAttribute('data-price'));

        var exidtingProduct = cart.find(item => item.name === productName);
        if (exidtingProduct) {
            exidtingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPric,
                quantity: 1
            });
        }

        totalPrice += productPric;

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));

        updateCartDisplay();
    });
});

var updateCartDisplay = () => {
    cartItem.innerHTML = '';
    cart.forEach((item, index) => {
        var li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} * ${item.quantity}
            <button id="ja" class='remove-item' data-index='${index}'>Remove</button>
        `;
        cartItem.appendChild(li);
    });

    itemTtalPrice.textContent = totalPrice.toFixed(2);

    var removeItems = document.querySelectorAll('.remove-item');
    removeItems.forEach(Button => {
        Button.addEventListener('click', () => {
            var index = Button.getAttribute('data-index');
            removeCartItem(index);
        });
    });
};

var removeCartItem = (index) => {
    var item = cart[index];
    totalPrice -= item.price * item.quantity;
    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    updateCartDisplay();
};

updateCartDisplay();

BuyNow.addEventListener('click',()=>{
   if(cart.length > 0){
    alert ('Thank you for your purchase!');

    cart = [];
    totalPrice = 0;

    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');
    updateCartDisplay();
   }
   else{
    alert('your cart is empty!');
   }
})
