import {orders} from "./data/placeOrders.js";
import { products } from "./data/items.js";
import { deliveryDate } from "./data/deliverySelection.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');

let matchingOrder;

orders.forEach((order) => {
  if (orderId === order.id) {
    matchingOrder = order;
  }
});

const orderDate = dayjs(matchingOrder.orderDate);

const arrivalDate = orderDate.add(matchingOrder.deliveryOption.days, 'days').format('MMMM D, dddd');

let trackPackageHTML = '';

let trackHTML = `

    <span class="arrival-date"> ${arrivalDate} </span>

  `;

let matchingItem;

matchingOrder.cart.forEach((cartItem) => {
  
  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      matchingItem = product;
    }
  });

  console.log(cartItem.quantity);

  trackHTML += `

      <div class="package-grid-container">

          <div class="each-package-details">
            <img src="${matchingItem.image}" class="product-image">

            <div class="specific-details">
              <p class="product-name"> ${matchingItem.name} </p>
              <p class="product-quantity"> Quantity: ${cartItem.quantity} </p>
            </div>

          </div>
          
      </div>

  `;

  });

  trackPackageHTML += trackHTML;

document.querySelector('.js-package-details')
  .innerHTML = trackPackageHTML;






