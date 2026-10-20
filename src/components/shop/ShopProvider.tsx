import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { addLine, changeQty, promoDiscount, type CartLine } from "@/lib/cart";
import { findProduct, type Product } from "@/data/products";

type Modal = "account" | "checkout" | "orders" | null;

interface ToastState {
  title: string;
  message: string;
  visible: boolean;
}

interface ShopContextValue {
  cart: CartLine[];
  discount: number;
  promoApplied: boolean;
  wishlist: Set<string>;
  wishlistBase: number;
  cartOpen: boolean;
  modal: Modal;
  toast: ToastState;
  addToCart: (p: Product) => void;
  updateQty: (id: string, delta: number) => void;
  removeLine: (id: string) => void;
  applyPromo: (code: string) => void;
  toggleWishlist: (p: Product) => void;
  openCart: () => void;
  closeCart: () => void;
  setModal: (m: Modal) => void;
  showToast: (title: string, message: string) => void;
  placeOrder: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function initialCart(): CartLine[] {
  return ["f2", "f4", "m5"].flatMap((id) => {
    const p = findProduct(id);
    return p ? [{ id: p.id, name: p.cartName, price: p.price, image: p.image, qty: 1 }] : [];
  });
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(initialCart);
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [toast, setToast] = useState<ToastState>({ title: "", message: "", visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((title: string, message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ title, message, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3200);
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setCart((c) => addLine(c, { id: p.id, name: p.cartName, price: p.price, image: p.image }));
      showToast("Added to Cart 🛍️", p.cartName);
      setCartOpen(true);
    },
    [showToast],
  );

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((c) => changeQty(c, id, delta));
  }, []);

  const removeLine = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
  }, []);

  const applyPromo = useCallback(
    (code: string) => {
      const d = promoDiscount(code);
      if (d !== null) {
        setDiscount(d);
        setPromoApplied(true);
        showToast("Promo Code Activated!", `Flat ₹${d} Campus Discount applied.`);
      } else {
        showToast("Invalid Promo Code", "Please try using CAMPUSVIP");
      }
    },
    [showToast],
  );

  const toggleWishlist = useCallback(
    (p: Product) => {
      setWishlist((w) => {
        const next = new Set(w);
        if (next.has(p.id)) {
          next.delete(p.id);
          showToast("Removed from Wishlist", p.cartName);
        } else {
          next.add(p.id);
          showToast("Saved to Wishlist ❤️", p.cartName);
        }
        return next;
      });
    },
    [showToast],
  );

  // Called after the order rows are saved; clears the cart and shows the orders list.
  const placeOrder = useCallback(() => {
    setModal("orders");
    setCart([]);
    setDiscount(0);
    setPromoApplied(false);
    showToast("Order Confirmed! 🎉", "Your order has been saved to My Orders.");
  }, [showToast]);

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      discount,
      promoApplied,
      wishlist,
      wishlistBase: 2,
      cartOpen,
      modal,
      toast,
      addToCart,
      updateQty,
      removeLine,
      applyPromo,
      toggleWishlist,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      setModal,
      showToast,
      placeOrder,
    }),
    [cart, discount, promoApplied, wishlist, cartOpen, modal, toast, addToCart, updateQty, removeLine, applyPromo, toggleWishlist, showToast, placeOrder],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function Icon({ name, className = "", fill = false }: { name: string; className?: string; fill?: boolean }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${fill ? "icon-fill" : ""} ${className}`}>
      {name}
    </span>
  );
}
