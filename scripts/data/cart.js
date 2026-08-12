export let cart =   JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: "abc123",
    quantity: 1
  },
  {
    productId: "def123",
    quantity: 1
  }
]
}


export function addToCart(productId) {

    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    }

    else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }

    saveToStorage();
}

export function deleteFromCart(productId) {

  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();

}

export function updateCartQuantity() {
   let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

export function updateCheckoutHeaderQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-checkout-quantity')
    .innerHTML = `CHECKOUT (${cartQuantity}) Items`;
}

export function updateProductQuantity(productId) {

  const container = document.querySelector(`.js-order-details-${productId}`);

  const newQuantity = container.querySelector('.js-quantity-input').value; 

  if (newQuantity <= 0) {
    window.alert('Quantity must not be 0 or negative');
  }
  else if (newQuantity > 0) {

    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = Number(newQuantity);
      }
    });

    container.classList.remove('is-editing-quantity');

    container.querySelector('.js-quantity-label')
    .innerHTML = newQuantity;
  }

}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}