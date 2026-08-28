import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliverySelection = [
  {
    deliveryOptionId: 'option1',
    priceCents: 799,
    days: 1
  },
  {
    deliveryOptionId: 'option2',
    priceCents: 299,
    days: 3
  }, 
  {
    deliveryOptionId: 'option3', 
    priceCents: 0,
    days: 7
  }
]; 

export let selectedDeliveryOption = JSON.parse(localStorage.getItem('selectedDeliveryOption')) || deliverySelection[2];

export function setSelectedDeliveryOption(option) {
  selectedDeliveryOption = option;
}

export function saveToDeliveryOption() {
  localStorage.setItem('selectedDeliveryOption', JSON.stringify(selectedDeliveryOption));
}

export function deliveryDate(days) {

  const today = dayjs();
  const date = today.add(days, 'days');

  return date.format('MMMM D, dddd');
}
