import {cart, saveToStorage} from "../data/cart.js";
import { selectedDeliveryOption } from "../data/deliverySelection.js";
import {products} from "../data/items.js";
import {orders} from "../data/placeOrders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { formatCurrency } from "../utils/money.js";


export function renderOrderSummaryPrices() {

let totalPrice = 0;
let orderSummaryHTML = '';
let cartItems = 0;

cart.forEach((cartItem) => {

  const productId = cartItem.productId;
  cartItems += cartItem.quantity;

  products.forEach((product) => {
    if (product.id === productId) {
     totalPrice += product.priceCents * cartItem.quantity;
      }
    });

  });

  let shippingFee = selectedDeliveryOption.priceCents; 

  let dollarPrice = ((shippingFee / 100) + (totalPrice / 100)).toFixed(2);

  let taxPercentage = 10 / 100;

  let taxPrice = (taxPercentage * dollarPrice).toFixed(2);

  let finalTotal = (((dollarPrice * 100) + (taxPrice * 100) + (shippingFee)) / 100).toFixed(2);

  if (cart.length === 0) {
    shippingFee = 0;
    dollarPrice = formatCurrency(0);
    taxPercentage = formatCurrency(0);
    taxPrice = formatCurrency(0);
    finalTotal = formatCurrency(0);
  }


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
          
            <p class="js-shipping-fee"> $${formatCurrency(shippingFee)}</p>
            
            <p> $${dollarPrice}</p>
            
            <p> $${taxPrice} </p>
            
            <p> $${finalTotal} </p>
            
          </div>
          
        </div>

        <div class="place-order-button js-place-order-button">
          <a> 
            PLACE YOUR ORDERS
          </a>
        </div>
    `;

    document.querySelector('.js-order-summary')
      .innerHTML = orderSummaryHTML;

    document.querySelector('.js-place-order-button')
      .addEventListener('click', () => {

        orders.push({
          id: crypto.randomUUID(),
          cart: [...cart],
          deliveryOption: selectedDeliveryOption,
          orderDate: dayjs().toISOString()
        });

        localStorage.setItem('orders', JSON.stringify(orders));
       
        window.location.href = '../../orders.html';

        cart.length = 0;

        saveToStorage();


      });
}


