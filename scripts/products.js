import {cart, addToCart} from './data/cart.js';
import {products} from './data/items.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
  
  <div class="each-product"> 
          <img src="${product.image}" alt="This is a SMG" class="product-image">
          <div class="product-info" >
            <p class="product-name"> ${product.name} </p>
            <p class="product-price"> $${(product.priceCents / 100).toFixed(2)} </p>
            <select class="quantity-value">
              <option selected value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
              <option value="6"> 6 </option>
              <option value="7"> 7 </option>
              <option value="8"> 8 </option>
              <option value="9"> 9 </option>
              <option value="10"> 10 </option>
            </select>
            <button class="products_button js-add-to-cart"
            data-product-id="${product.id}"> 
                Add To Cart 
            </button>
          </div>
      </div>
  
  `;

});


document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
   let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();
    })
  })


  