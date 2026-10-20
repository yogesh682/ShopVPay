// Pure order-building rules. Checkout stores one row per cart line, all sharing an order_group.
import type { CartLine } from "./cart";

export interface OrderInput {
  orderGroup: string;
  customerId: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

export function paymentStatusFor(method: string): string {
  return method === "cod" ? "pay_on_delivery" : "pending";
}

export function buildOrderRows(cart: CartLine[], o: OrderInput) {
  return cart.map((l) => ({
    order_group: o.orderGroup,
    customer_id: o.customerId,
    customer_name: o.customerName,
    product_id: l.id,
    product_name: l.name,
    product_image_url: l.image ?? "",
    quantity: l.qty,
    unit_price: l.price,
    total_price: l.price * l.qty,
    payment_method: o.paymentMethod,
    payment_status: paymentStatusFor(o.paymentMethod),
    order_status: "confirmed",
    phone: o.phone,
    address: o.address,
  }));
}

export function formatOrderDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export function statusLabel(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
