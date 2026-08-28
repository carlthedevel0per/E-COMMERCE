import {cart, updateCartQuantity} from "./data/cart.js";
import {products} from "./data/items.js";
import {formatCurrency} from "./utils/money.js";
import {orders} from "./data/placeOrders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


updateCartQuantity();

let orderedPackageHTML = '';

orders.forEach((order) => {

  // Calculate the total price of THIS order
  let totalPrice = 0;

  order.cart.forEach((cartItem) => {

    products.forEach((product) => {

      if (product.id === cartItem.productId) {
        totalPrice += product.priceCents * cartItem.quantity;
      }

    });

  });

  const convertedPrice = formatCurrency(totalPrice);

  const today = dayjs(order.orderDate);
  const orderDate = today.format('MMMM D');
  const arrivingDate = today.add(order.deliveryOption.days, 'days').format('MMMM D');
  const orderId = order.id;
  

  let orderHTML = `

    <div class="order-details-container">

      <div class="order-specific-info">

        <div class="order-place">
          <p>
            <b>Order Placed:</b>
            ${orderDate}
          </p>
        </div>

        <div class="order-total">
          <p>
            <b>Total:</b>
            $${convertedPrice}
          </p>
        </div>

        <div class="order-id">
          <p>
            <b>Order ID:</b>
            ${orderId}
          </p>
        </div>

        <div class="order-arriving-time">
          <p>
            <b>Arriving on:</b>
            ${arrivingDate}
          </p>
        </div>

      </div>


      <div class="track-package js-track-package
      js-track-package-${orderId}"
      data-order-id="${orderId}">
        <a>
          Track Package
        </a>
      </div>


      <div class="order-product-details">

  `;

  order.cart.forEach((cartItem) => {

    let matchingItem;

    products.forEach((product) => {

      if (product.id === cartItem.productId) {
        matchingItem = product;
      }

    });


    orderHTML += `

      <div class="each-order-product">

        <img
          src="${matchingItem.image}"
          class="order-image"
        >

        <div class="each-order-product-details">

          <p class="product-name">
            ${matchingItem.name}
          </p>

          <p>
            <b>Quantity:</b>
            ${cartItem.quantity}
          </p>

        </div>

      </div>

    `;

  });

  orderHTML += `

      </div>

    </div>

  `;

  orderedPackageHTML += orderHTML;

});


document.querySelector('.js-orders-section')
  .innerHTML = orderedPackageHTML;

document.querySelectorAll('.js-track-package')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;

      window.location.href = `tracking.html?orderId=${orderId}`;

    });
  });


  function searchFunction() {

      const searchInput = document.querySelector('.js-input-box').value.toLowerCase();

      let matchedOrderHTML = '';

      orders.forEach((order) => {

        let matchingProductsHTML = '';

        let totalPrice = 0;

        order.cart.forEach((cartItem) => {

          let matchingProduct;

          const productId = cartItem.productId;

          products.forEach((product) => {
            if (productId === product.id) {
              matchingProduct = product;

              totalPrice += product.priceCents * cartItem.quantity;
            }
          });

          if (matchingProduct.keywords.includes(searchInput)) {

            matchingProductsHTML += `

              <div class="each-order-product">

                  <img
                    src="${matchingProduct.image}"
                    class="order-image"
                  >

                  <div class="each-order-product-details">

                    <p class="product-name">
                      ${matchingProduct.name}
                    </p>

                    <p>
                      <b>Quantity:</b>
                      ${cartItem.quantity}
                    </p>

                  </div>

                </div>
            
            `;

          }

        });

        if (matchingProductsHTML !== '') {
          const convertedPrice = formatCurrency(totalPrice);

          const today = dayjs(order.orderDate);
          const orderDate = today.format('MMMM D');
          const arrivingDate = today.add(order.deliveryOption.days, 'days').format('MMMM D');

          const orderId = order.id;

          matchedOrderHTML += `
            <div class="order-details-container">

              <div class="order-specific-info">

                <div class="order-place">
                  <p>
                    <b>Order Placed:</b>
                    ${orderDate}
                  </p>
                </div>

                <div class="order-total">
                  <p>
                    <b>Total:</b>
                    $${convertedPrice}
                  </p>
                </div>

                <div class="order-id">
                  <p>
                    <b>Order ID:</b>
                    ${orderId}
                  </p>
                </div>

                <div class="order-arriving-time">
                  <p>
                    <b>Arriving on:</b>
                    ${arrivingDate}
                  </p>
                </div>

              </div>


              <div
                class="track-package js-track-package"
                data-order-id="${orderId}"
              >
                <a>
                  Track Package
                </a>
              </div>


              <div class="order-product-details">

                ${matchingProductsHTML}

              </div>

            </div>

          `;

        }

      });

      document.querySelector('.js-orders-section')
        .innerHTML = matchedOrderHTML;
      
    }

document.querySelector('.js-search-button')
  .addEventListener('click', () => {

    searchFunction();
    document.querySelector('.js-input-box')
      .value = '';

        
    document.querySelectorAll('.js-track-package')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const orderId = button.dataset.orderId;

          window.location.href = `tracking.html?orderId=${orderId}`;

        });
      });

  });


document.querySelector('.js-input-box')
  .addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
      searchFunction();
      document.querySelector('.js-input-box')
        .value = '';
    }

  })