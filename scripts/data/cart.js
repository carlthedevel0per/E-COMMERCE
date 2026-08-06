export const cart = [
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