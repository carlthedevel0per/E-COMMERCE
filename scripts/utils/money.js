export function formatCurrency(priceCents) {
  return (priceCents * 0.1).toFixed(2);
}