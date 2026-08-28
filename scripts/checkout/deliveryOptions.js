import {deliverySelection, saveToDeliveryOption, setSelectedDeliveryOption, deliveryDate} from '../data/deliverySelection.js';

import {formatCurrency} from '../utils/money.js';
import { renderOrderSummaryPrices } from './orderSummaryPrices.js';
import {cart} from '../data/cart.js';

export function renderDeliveryOptions() {

  let deliveryOptionsHTML = '';

  deliveryOptionsHTML = `
  
    <h1> Choose a delivery option: </h1>
  
  `;

  deliverySelection.forEach((option) => {

    const optionId = option.deliveryOptionId;
    const priceCents = option.priceCents;
    const days = option.days;

    deliveryOptionsHTML += `

        <div class="delivery-options js-delivery-selection-${optionId}
        js-delivery-selection"
        data-option-id="${optionId}">
          <input type="radio" name="option" id="${optionId}">
          <label for="${optionId}" class="js-date-label"> ${deliveryDate(days)}</label>
          <p> $${formatCurrency(priceCents)} </p>
        </div>
    
    `;
  });

  document.querySelector('.js-delivery-option')
    .innerHTML = deliveryOptionsHTML;


  document.querySelectorAll('.js-delivery-selection')
    .forEach((selected) => {
      selected.addEventListener('click', () => {

        const optionId = selected.dataset.optionId;

        let matchingItem;

        deliverySelection.forEach((option) => {
          if (optionId === option.deliveryOptionId) {
            matchingItem = option;
          }
        });

        if (matchingItem) {

          setSelectedDeliveryOption(matchingItem);

          saveToDeliveryOption();

          renderOrderSummaryPrices();

        }

        if (cart.length === 0) {
          alert('select an item first!');

          window.location.href = '../../products.html';
        }
        
      });
    });

}



