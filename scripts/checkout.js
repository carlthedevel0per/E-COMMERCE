import {cart, deleteFromCart, updateProductQuantity, updateCheckoutHeaderQuantity} from "./data/cart.js";
import {products} from "./data/items.js";
import {formatCurrency} from "./utils/money.js";
import { renderDeliveryOptions } from "./checkout/deliveryOptions.js";
import { renderOrderSummaryPrices } from "./checkout/orderSummaryPrices.js";

updateCheckoutHeaderQuantity();

function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product; 
      }
    });

    cartSummaryHTML += `

      <div class="order-details js-order-details-${matchingProduct.id}">
          <img src="${matchingProduct.image}">
          <div class="order-info">
            <h1> ${matchingProduct.name} </h1>

            <p class="quantity-label js-quantity-label"> 
            
            <b> Quantity: </b>
            
            ${cartItem.quantity}

            </p>

              <div class="quantity-buttons">

                <span class="update-button js-update-button"
                data-product-id="${matchingProduct.id}"> 
                  UPDATE
                </span>

                <input class="quantity-input js-quantity-input" type="number" min="1" value="${cartItem.quantity}"
                >

                <span class="save-button js-save-button"
                data-product-id="${matchingProduct.id}"> 
                  SAVE 
                </span>
                
                <span class="js-delete-button"
                data-product-id="${matchingProduct.id}">
                  DELETE
                </span>

              </div>

            

            <p> <b> Price: </b> $${formatCurrency(matchingProduct.priceCents)}</p>
          </div>
        
          </div>
      `;

  });

  document.querySelector('.js-order-section')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        deleteFromCart(productId);
        
        renderOrderSummary();
        renderOrderSummaryPrices();
        updateCheckoutHeaderQuantity();

      });
    });

  document.querySelectorAll('.js-update-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        document.querySelector(`.js-order-details-${productId}`).classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        updateProductQuantity(productId);
        updateCheckoutHeaderQuantity();
        renderOrderSummaryPrices();

      })
    });
}

renderOrderSummary();
renderDeliveryOptions();
renderOrderSummaryPrices();
