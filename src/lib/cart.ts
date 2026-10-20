// Pure pricing rules for the ShopVPay cart. Keep UI out of here so rules stay testable.

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
}

export const PROMO_CODE = "CAMPUSVIP";
export const PROMO_DISCOUNT = 300;
export const FREE_SHIPPING_THRESHOLD = 499;
export const EMI_MONTHS = 6;

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}

/** Returns the discount for a code, or null when the code is invalid. */
export function promoDiscount(code: string): number | null {
  return code.trim().toUpperCase() === PROMO_CODE ? PROMO_DISCOUNT : null;
}

export function cartTotal(subtotal: number, discount: number): number {
  return Math.max(0, subtotal - discount);
}

export function qualifiesForFreeShipping(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}

export function monthlyEmi(total: number, months = EMI_MONTHS): number {
  return Math.floor(total / months);
}

export function addLine(lines: CartLine[], item: Omit<CartLine, "qty">): CartLine[] {
  const existing = lines.find((l) => l.id === item.id);
  if (existing) return lines.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l));
  return [...lines, { ...item, qty: 1 }];
}

export function changeQty(lines: CartLine[], id: string, delta: number): CartLine[] {
  return lines
    .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
    .filter((l) => l.qty > 0);
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
