



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

var text = 'Welcome to My website!'
var textBox = document.getElementById('textBox')

for(let i = 0; i<text.length; i++){
    setTimeout(() =>{
        textBox.textContent += text[i]
    }, i * 100)
}

var text1 = 'Welcome to My website!'
var textBox1 = document.getElementById('textBox1')

let index = 0;
let isDlite = false;

function typeEffict (){
    if(!isDlite && index <= text1.length){
        textBox1.textContent = text1.substring(0, index);
        index ++
    }
    else if(isDlite && index >= 0){
        textBox1.textContent = text1.substring(0 , index)
        index--
    }
    if(index>text1.length){
        isDlite  = true;
    }
    if(index< 0){
        isDlite = false;
    }
    setTimeout(typeEffict, 100)
}
typeEffict()