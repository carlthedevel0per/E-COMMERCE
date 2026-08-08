export let cart = [
  {
    productId: "abc123",
    quantity: 1
  },
  {
    productId: "def123",
    quantity: 1
  }
];

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
}

export function deleteFromCart(productId) {

  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

}