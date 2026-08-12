import {cart, updateCheckoutHeaderQuantity} from "../data/cart.js";
import {products} from "../data/items.js";

export function renderOrderSummaryPrices() {

let totalPrice = 0;
let orderSummaryHTML = '';
let cartItems = 0;

cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  products.forEach((product) => {
    if (product.id === productId) {
     totalPrice += product.priceCents * cartItem.quantity;
    }
  });

  if (cartItem.productId === productId) {
    cartItems += cartItem.quantity;
  }

});

  const dollarPrice = (totalPrice / 100).toFixed(2);

  const shippingFee = 0;

  const taxPercentage = 10 / 100;

  const taxPrice = (taxPercentage * dollarPrice).toFixed(2);

  const finalTotal = (((dollarPrice * 100) + (taxPrice * 100)) / 100).toFixed(2);

  orderSummaryHTML = `
    <div class="summary-container">

          <div class="order-summary">
            <p> Items (${cartItems}): </p>
            
            <p> Shipping fee: </p>
            
            <p> Total before tax: </p>
            
            <p> Estimated tax (10%): </p>
            
            <p> Order total: </p>
            
          </div>

          <div class="order-prices">
            
            <p> $${dollarPrice} </p>
          
            <p> $${shippingFee}</p>
            
            <p> $${dollarPrice}</p>
            
            <p> $${taxPrice} </p>
            
            <p> $${finalTotal} </p>
            
          </div>
          
        </div>

        <div class="place-order-button">
          <a href="orders.html"> 
            PLACE YOUR ORDERS
          </a>
        </div>
    `;

    document.querySelector('.js-order-summary')
      .innerHTML = orderSummaryHTML;
}