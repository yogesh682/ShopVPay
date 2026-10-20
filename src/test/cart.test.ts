import { describe, expect, it } from "vitest";
import {
  addLine,
  cartSubtotal,
  cartTotal,
  changeQty,
  monthlyEmi,
  promoDiscount,
  qualifiesForFreeShipping,
} from "@/lib/cart";

describe("cart rules", () => {
  it("CAMPUSVIP gives a flat ₹300 off, case-insensitive", () => {
    expect(promoDiscount("campusvip")).toBe(300);
    expect(promoDiscount("WRONG")).toBeNull();
  });

  it("total never goes below zero", () => {
    expect(cartTotal(7293, 300)).toBe(6993);
    expect(cartTotal(200, 300)).toBe(0);
  });

  it("free shipping applies from ₹499", () => {
    expect(qualifiesForFreeShipping(499)).toBe(true);
    expect(qualifiesForFreeShipping(498)).toBe(false);
  });

  it("VPay EMI splits the total over 6 months", () => {
    expect(monthlyEmi(6997)).toBe(1166);
  });

  it("adding the same item twice increases quantity; reducing to 0 removes it", () => {
    let lines = addLine([], { id: "a", name: "A", price: 100 });
    lines = addLine(lines, { id: "a", name: "A", price: 100 });
    expect(lines[0]?.qty).toBe(2);
    expect(cartSubtotal(lines)).toBe(200);
    expect(changeQty(lines, "a", -2)).toEqual([]);
  });
});
