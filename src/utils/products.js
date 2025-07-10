export function calculateSubtotal(p) {
  return p.quantity * p.price;
}

export function calculateTotal(inv) {
  return inv.products.reduce((sum, p) => sum + calculateSubtotal(p), 0);
}
