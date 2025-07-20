



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

var text1 = 'Welcome to My website!';
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
        index--;
    }
    if(index > text1.length){
        isDlite  = true;
    }
    if(index < 0){
        isDlite = false;
    }
    setTimeout(typeEffict, 100)
}
typeEffict()


var textInput = document.getElementById('textInput');
var button = document.getElementById('button');
var qrbox = document.getElementById('qrbox')

function QR (value){
if (value.trim() !== "") {
       qrbox.src = `
       https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value)}`;
   }
   else{
    alert('Please enter texr or URL to generate a QR Code')
   }
}

button.addEventListener('click',()=>{
  var v = textInput.value;
  QR(v)
  
})

// learn pagination

var productlist = document.getElementById('product-list');
var pagination = document.getElementById('pagination');
var perPageProducts = 6;
let allproducts = []

var lodeProduct = async () =>{
    var rest = await fetch('https://fakestoreapi.com/products')
    var data = await rest.json()
    allproducts = data;
     showPage(1);
     setupPagination();
}
var showPage = (pageNumber) =>{
     productlist.innerHTML = '';
    var start = (pageNumber -1) * perPageProducts;
    var end = start +  perPageProducts;
    var pageItems = allproducts.slice(start, end);
    pageItems.forEach(product =>{
        var div = document.createElement('div');
        Object.assign(div.style,{
            border:'2px solid black'
        })
        div.innerHTML = `
             
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}" style="width: 100px;">
                <p>Price: $${product.price}</p>
                <p>${product.description}</p>
            
        `;
        productlist.appendChild(div)
    })
}
var setupPagination = () =>{
     pagination.innerHTML = '';
   var totalPages = Math.ceil(allproducts.length / perPageProducts);

    for(let i = 0; i <= totalPages; i++){
        var btn = document.createElement('button');
        btn.innerText = i;
        btn.addEventListener('click', () => showPage(i));
        pagination.appendChild(btn)
    }
}
lodeProduct()
