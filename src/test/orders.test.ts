import { describe, expect, it } from "vitest";
import { buildOrderRows, paymentStatusFor } from "@/lib/orders";

const base = { orderGroup: "g1", customerId: "u1", customerName: "Priya", phone: "9876543210", address: "Hostel C", paymentMethod: "upi" };

describe("buildOrderRows", () => {
  it("stores product details, quantity and line total per item", () => {
    const [row] = buildOrderRows([{ id: "f2", name: "Earbuds", price: 1299, image: "https://x/img.jpg", qty: 3 }], base);
    expect(row).toMatchObject({ product_id: "f2", product_name: "Earbuds", product_image_url: "https://x/img.jpg", quantity: 3, unit_price: 1299, total_price: 3897, customer_name: "Priya", order_status: "confirmed" });
  });
  it("cash on delivery is pay on delivery", () => {
    expect(paymentStatusFor("cod")).toBe("pay_on_delivery");
  });
});
