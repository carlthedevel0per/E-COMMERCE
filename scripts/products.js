const products = [
  {
    name: "SMG",
    image: "Photos/smg.png",
    priceCents: 120025
  },
  {
    name: "ANACONDA",
    image: "Photos/anaconda.png",
    priceCents: 80075
  },
  {
    name: "AK-47",
    image: "Photos/ak47.png",
    priceCents: 150090
  },
  {
    name: "SHOTGUN",
    image: "Photos/shotgun.png",
    priceCents: 200030
  },
  {
    name: "SNIPER",
    image: "Photos/sniper.png",
    priceCents: 400050
  },
  {
    name: "PISTOL",
    image: "Photos/pistol.png",
    priceCents: 100060
  }

];

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
            <button class="products_button"> 
                Add To Cart 
            </button>
          </div>
      </div>
  
  `;
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;