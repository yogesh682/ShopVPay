import { useEffect, useState } from "react";
import { LOGO_URL } from "@/data/products";
import {
  cartCount,
  cartSubtotal,
  cartTotal,
  formatINR,
  FREE_SHIPPING_THRESHOLD,
  monthlyEmi,
  qualifiesForFreeShipping,
} from "@/lib/cart";
import { Icon, useShop } from "./ShopProvider";

const field =
  "w-full rounded-lg border border-outline-variant/60 bg-surface-lowest p-2.5 text-xs text-on-surface outline-none focus:border-secondary";

export function CartDrawer() {
  const { cart, cartOpen, closeCart, updateQty, removeLine, discount, promoApplied, applyPromo, setModal } = useShop();
  const [code, setCode] = useState("");
  const subtotal = cartSubtotal(cart);
  const total = cartTotal(subtotal, discount);
  const freeShip = qualifiesForFreeShipping(subtotal);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!cartOpen}
    >
      <div className="absolute inset-0 bg-scrim/40 backdrop-blur-sm" onClick={closeCart} />
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div
          role="dialog"
          aria-label="Shopping cart"
          className={`flex w-screen max-w-md transform flex-col bg-surface-lowest shadow-2xl transition-transform duration-300 ease-in-out ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-low px-5 py-4">
            <div className="flex items-center gap-2">
              <Icon name="shopping_bag" className="text-primary" />
              <h3 className="text-base font-semibold text-on-surface">Your Tech Bag ({cartCount(cart)} items)</h3>
            </div>
            <button
              type="button"
              aria-label="Close cart"
              onClick={closeCart}
              className="rounded-full p-1.5 text-outline hover:bg-surface-variant hover:text-on-surface"
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-primary-fixed bg-primary-fixed/30 px-5 py-2.5 text-xs font-semibold text-on-primary-fixed">
            {freeShip ? (
              <>
                <span className="flex items-center gap-1.5">
                  <Icon name="check_circle" className="text-sm text-primary" /> Free College Shipping Unlocked!
                </span>
                <span className="font-bold text-primary">₹0 Delivery</span>
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <Icon name="local_shipping" className="text-sm text-primary" /> Add{" "}
                {formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
              </span>
            )}
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-outline">
                <Icon name="remove_shopping_cart" className="mb-2 text-4xl text-outline-variant" />
                <p className="text-sm">Your shopping bag is empty.</p>
                <button type="button" onClick={closeCart} className="mt-4 text-xs font-bold text-primary hover:underline">
                  Start Browsing Tech
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-outline-variant/30 bg-surface-low p-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface-lowest p-1">
                      {item.image ? (
                        <img src={item.image} alt="" className="max-h-full object-contain" />
                      ) : (
                        <Icon name="devices" className="text-secondary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h5 className="truncate text-xs font-semibold text-on-surface">{item.name}</h5>
                      <div className="mt-0.5 text-xs font-bold text-primary">{formatINR(item.price)}</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex items-center overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-lowest text-xs">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => updateQty(item.id, -1)}
                        className="px-2 py-1 font-bold text-on-surface hover:bg-surface-container"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-medium">{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => updateQty(item.id, 1)}
                        className="px-2 py-1 font-bold text-on-surface hover:bg-surface-container"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeLine(item.id)}
                      className="p-1 text-outline hover:text-error"
                    >
                      <Icon name="delete" className="text-base" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-outline-variant/20 bg-surface-lowest px-5 py-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                applyPromo(code);
              }}
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                aria-label="Promo code"
                placeholder="Enter 'CAMPUSVIP' for ₹300 off"
                className="flex-1 rounded-lg border border-outline-variant/60 px-3 py-2 font-mono text-xs uppercase outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="rounded-lg bg-secondary px-4 py-2 text-xs font-semibold text-on-primary hover:bg-secondary-container"
              >
                Apply
              </button>
            </form>
            {promoApplied && (
              <div className="mt-1 text-[11px] font-medium text-success">Coupon applied: ₹{discount} student discount!</div>
            )}
          </div>

          <div className="space-y-3 border-t border-outline-variant/30 bg-surface-low p-5">
            <div className="space-y-1.5 text-xs text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-on-surface">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Campus Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-bold text-success">FREE</span>
              </div>
              <div className="flex justify-between border-t border-outline-variant/20 pt-2 text-sm font-bold text-on-surface">
                <span>Total Amount</span>
                <span className="text-base text-primary">{formatINR(total)}</span>
              </div>
            </div>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => {
                closeCart();
                setModal("checkout");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cta-gradient py-3 text-sm font-semibold text-on-primary shadow-glow transition-all hover:opacity-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Proceed to Checkout</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
            <div className="flex items-center justify-center gap-3 text-center text-[10px] text-outline">
              <span>🔒 256-Bit Encrypted</span>
              <span>•</span>
              <span>⚡ Instant UPI / 0% EMI</span>
              <span>•</span>
              <span>7-Day Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalShell({
  open,
  onClose,
  children,
  className,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className: string;
  label: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`relative w-full rounded-2xl bg-surface-lowest p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-outline hover:text-on-surface"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  );
}

const payments = [
  { value: "vpay", title: "VPay 0% EMI" },
  { value: "upi", title: "UPI / QR", sub: "GPay, PhonePe, Paytm" },
  { value: "card", title: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
  { value: "cod", title: "Cash On Delivery", sub: "Pay at Hostel Gate" },
];

export function CheckoutModal() {
  const { modal, setModal, cart, discount, placeOrder } = useShop();
  const [payment, setPayment] = useState("vpay");
  const total = cartTotal(cartSubtotal(cart), discount);

  return (
    <ModalShell
      open={modal === "checkout"}
      onClose={() => setModal(null)}
      label="Checkout"
      className="max-h-[90vh] max-w-xl overflow-y-auto"
    >
      <div className="mb-4 flex items-center gap-2">
        <img src={LOGO_URL} alt="ShopVPay" className="h-6" />
        <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-xs font-bold text-primary">Fast Student Checkout</span>
      </div>
      <h3 className="text-title-lg text-on-surface">Complete Your Order</h3>
      <p className="mb-4 text-xs text-on-surface-variant">Enter shipping address and select payment mode.</p>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          placeOrder();
        }}
      >
        <div>
          <label className="mb-1 block text-xs font-semibold text-on-surface" htmlFor="co-name">
            Full Name
          </label>
          <input id="co-name" required placeholder="e.g. Vishnu Priya" className={field} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-on-surface" htmlFor="co-phone">
              Mobile Number (For Delivery OTP)
            </label>
            <input id="co-phone" type="tel" required placeholder="+91 98765 43210" className={field} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-on-surface" htmlFor="co-pin">
              Hostel / College / Pincode
            </label>
            <input id="co-pin" required placeholder="560001 (Hostel Block C)" className={field} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-on-surface" htmlFor="co-address">
            Delivery Address
          </label>
          <textarea
            id="co-address"
            required
            rows={2}
            placeholder="Room 402, Ramanujan Hostel, College Campus, Main Road"
            className={field}
          />
        </div>
        <fieldset>
          <legend className="mb-2 block text-xs font-bold text-on-surface">Select Payment Mode</legend>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {payments.map((p) => {
              const checked = payment === p.value;
              return (
                <label
                  key={p.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 transition-colors ${
                    checked ? "border-secondary bg-secondary-fixed/20" : "border-outline-variant/40 hover:border-secondary"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.value}
                    checked={checked}
                    onChange={() => setPayment(p.value)}
                    className="accent-secondary"
                  />
                  <div>
                    <div className="font-bold text-on-surface">{p.title}</div>
                    <div className={`text-[10px] ${p.value === "vpay" ? "text-secondary" : "text-outline"}`}>
                      {p.value === "vpay" ? `Pay ${formatINR(monthlyEmi(total))} / mo` : p.sub}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="pt-3">
          <button
            type="submit"
            className="w-full rounded-lg bg-cta-gradient py-3 text-sm font-semibold text-on-primary shadow-glow transition-all hover:opacity-95"
          >
            Confirm &amp; Place Order ({formatINR(total)})
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export function AccountModal() {
  const { modal, setModal, showToast } = useShop();
  const signIn = () => {
    setModal(null);
    showToast("Signed In Successfully", "Welcome back Vishnu! Campus privileges unlocked.");
  };
  return (
    <ModalShell open={modal === "account"} onClose={() => setModal(null)} label="Student account" className="max-w-sm">
      <div className="mb-6 space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="lock" className="text-2xl" />
        </div>
        <h3 className="text-title-lg text-on-surface">Student Account Access</h3>
        <p className="text-xs text-on-surface-variant">
          Sign in with your student phone number or college email (.edu / .ac.in)
        </p>
      </div>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <input aria-label="College email or mobile" placeholder="College Email or Mobile" className={field} />
        <input aria-label="Password" type="password" placeholder="Password" className={field} />
        <button
          type="submit"
          className="w-full rounded-lg bg-primary-container py-2.5 text-xs font-semibold text-on-primary transition-all hover:bg-primary"
        >
          Continue with ShopVPay
        </button>
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-outline-variant/30" />
          <span className="mx-2 flex-shrink font-mono text-[10px] uppercase text-outline">Instant Perks</span>
          <div className="flex-grow border-t border-outline-variant/30" />
        </div>
        <button
          type="button"
          onClick={signIn}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant/50 bg-surface-low py-2 text-xs font-semibold text-on-surface transition-all hover:bg-surface-container"
        >
          <Icon name="verified" className="text-sm text-secondary" /> Verify via College ID Card
        </button>
      </form>
    </ModalShell>
  );
}

export function Toast() {
  const { toast } = useShop();
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-xl bg-inverse-surface px-4 py-3 text-inverse-on-surface shadow-2xl transition-all duration-300 ${
        toast.visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <Icon name="check_circle" className="text-success-soft" />
      <div>
        <div className="text-xs font-bold">{toast.title}</div>
        <div className="text-[11px] text-inverse-on-surface/80">{toast.message}</div>
      </div>
    </div>
  );
}
