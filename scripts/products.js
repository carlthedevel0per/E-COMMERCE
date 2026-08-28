import {cart, addToCart, updateCartQuantity, saveToStorage} from './data/cart.js';
import {products} from './data/items.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

updateCartQuantity();

products.forEach((product) => {
  productsHTML += `
  
  <div class="each-product"> 
      <img src="${product.image}" alt="This is a SMG" class="product-image">
        <div class="product-info" >
          <p class="product-name"> ${product.name} </p>
          <p class="product-price"> $${formatCurrency(product.priceCents)} </p>
          <select class="quantity-value js-quantity-value-${product.id}">
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

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantityValue = Number(document.querySelector(`.js-quantity-value-${productId}`).value);

      addToCart(productId, quantityValue);
      updateCartQuantity();

      saveToStorage();
  });
});

function searchFunction() {

    const searchInput = document.querySelector('.js-input-box').value.toLowerCase();

    const matchingProducts = products.filter((product) => {
      return product.keywords.includes(searchInput);
    })

    if (matchingProducts.length === 0) {
      alert('we dont have that item.')
      return; 
    }

    let searchProductHTML = '';

    matchingProducts.forEach((product) => {
    
      searchProductHTML += `

        <div class="each-product"> 
          <img src="${product.image}" alt="This is a SMG" class="product-image">
            <div class="product-info" >
              <p class="product-name"> ${product.name} </p>
              <p class="product-price"> $${formatCurrency(product.priceCents)} </p>
              <select class="quantity-value js-quantity-value">
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

    document.querySelector('.js-products-grid')
      .innerHTML = searchProductHTML;

}

document.querySelector('.js-search-button')
  .addEventListener('click', () => {

    searchFunction();

    document.querySelector('.js-input-box')
        .value = '';
      
  });


document.querySelector('.js-input-box')
  .addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
      searchFunction();
      document.querySelector('.js-input-box')
        .value = '';
    }

  });

  






  