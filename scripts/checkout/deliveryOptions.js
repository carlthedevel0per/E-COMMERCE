import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderDeliveryOptions() {

  const freeShipping = dayjs().add(7, 'days');
  const freeShippingFormat = freeShipping.format('dddd, MMMM D');

  const threeDays = dayjs().add(3, 'days');
  const threeDaysFormat = threeDays.format('dddd, MMMM D');

  const oneDay = dayjs().add(1, 'days');
  const oneDayFormat = oneDay.format('dddd, MMMM D')

  const deliveryOptionsHTML = `
  
  <h1> Choose a delivery option: </h1>

    <div class="delivery-options">
      <input type="radio" name="option" id="option1">
      <label for="option1"> ${oneDayFormat} </label>
      <p> +$7.99 </p>
    </div>

    <div class="delivery-options">
      <input type="radio" name="option" id="option2">
      <label for="option2"> ${threeDaysFormat} </label>
      <p> +$2.99 </p>
    </div>

    <div class="delivery-options">
      <input type="radio" name="option" id="option3">
      <label for="option3"> ${freeShippingFormat} </label>
      <p> FREE SHIPPING </p>
    </div>

  `;

  document.querySelector('.js-delivery-option')
    .innerHTML = deliveryOptionsHTML;

}
