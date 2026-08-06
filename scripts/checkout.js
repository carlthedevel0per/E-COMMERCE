import {cart} from "./data/cart.js";
import {products} from "./data/items.js";

/* ORDER SUMMARY BRO

let orderSummaryHTML = '';

cart.forEach((order) => {

let orderPrice;

if (products.id === order.productId) {
  orderPrice = order;
}

const price = orderPrice.priceCents;

console.log(price);

const priceBeforeTax = ((80075 * 10) / 100).toFixed(2);
const taxPercentage = 10 / 100;
const taxPrice = priceBeforeTax * taxPercentage;
const total = (((priceBeforeTax * 100) + (taxPrice * 100)) / 100);


orderSummaryHTML += `
  <div class="summary-container">

        <div class="order-summary">
          <p> Items (): </p>
          
          <p> Shipping fee: </p>
          
          <p> Total before tax: </p>
          
          <p> Estimated tax (10%): </p>
          
          <p> Order total: </p>
          
        </div>

        <div class="order-prices">
          
          <p> $5,001.10 </p>
        
          <p> $0.00</p>
          
          <p> $5,001.10</p>
          
          <p> $500.11 </p>
          
          <p> $5,501.21 </p>
          
        </div>
        
      </div>

      <div class="place-order-button">
        <a href="orders.html"> 
          PLACE YOUR ORDERS
        </a>
      </div>
  `;

});

document.querySelector('.js-order-summary')
  .innerHTML = orderSummaryHTML;

*/

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product; 
    }
  });

  console.log(matchingProduct);

  cartSummaryHTML += `

    <div class="order-details">
        <img src="${matchingProduct.image}">
        <div class="order-info">
          <h1> ${matchingProduct.name} </h1>

          <div class="quantity-section">

            <b> Quantity: </b>

            <p> ${cartItem.quantity} </p> 

            <div class="quantity-buttons">

              <button> 
                UPDATE
              </button>
              
              <button>
                DELETE
              </button>

            </div>

          </div>

          <p> <b> Price: </b> $${(matchingProduct.priceCents * 0.1).toFixed(2)}</p>
        </div>
      
        </div>
    `;

});

document.querySelector('.js-order-section')
  .innerHTML = cartSummaryHTML;


