import { useState } from "react";
import { LOGO_URL, type Department } from "@/data/products";
import { cartCount } from "@/lib/cart";
import { Icon, useShop } from "./ShopProvider";

export type SearchCategory = Department | "all";

const ribbon: { label: string; dept: Department }[] = [
  { label: "Laptops", dept: "laptops" },
  { label: "Mobile", dept: "mobile" },
  { label: "Study Lamps", dept: "study" },
  { label: "Coding & IoT", dept: "coding" },
  { label: "Audio", dept: "audio" },
  { label: "Daily-use", dept: "daily" },
];

interface HeaderProps {
  onSearch: (query: string, category: SearchCategory) => void;
  onDepartment: (dept: Department) => void;
}

export function Header({ onSearch, onDepartment }: HeaderProps) {
  const { cart, wishlist, wishlistBase, openCart, setModal } = useShop();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <>
      <div className="relative z-50 bg-brand-gradient px-4 py-2 text-xs font-semibold text-on-primary shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-on-primary/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
              Campus Deal
            </span>
            <span className="font-medium">
              🎓 Exclusive College Discount: Flat 15% OFF with code{" "}
              <strong className="font-bold tracking-wide underline decoration-on-primary/50">CAMPUSVIP</strong> | 0% EMI with VPay
            </span>
          </div>
          <div className="flex items-center gap-4 divide-x divide-on-primary/30 text-[11px] font-medium">
            <span className="flex items-center gap-1 pl-2">
              <Icon name="local_shipping" className="text-sm" /> Free Shipping over ₹499
            </span>
            <a className="flex items-center gap-1 pl-3 hover:underline" href="#emi-calculator">
              <Icon name="credit_score" className="text-sm" /> Check 0% EMI Eligibility
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface-lowest/90 text-primary shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 md:gap-6 md:px-8">
          <a href="#" className="flex shrink-0 items-center gap-3 transition-transform duration-150 active:scale-95">
            <img src={LOGO_URL} alt="ShopVPay Logo - Shop Smart Pay Easy" className="h-9 w-auto object-contain md:h-10" />
          </a>

          <form onSubmit={submit} className="relative hidden max-w-2xl flex-1 items-center md:flex" role="search">
            <div className="flex w-full items-center overflow-hidden rounded-full border border-outline-variant/50 bg-surface-low py-1 pl-4 pr-1.5 transition-all focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/20 hover:border-secondary">
              <Icon name="search" className="mr-2 shrink-0 text-outline" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
                placeholder="Search gadgets, Raspberry Pi, student laptops, audio, chargers..."
                className="w-full border-none bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/70"
              />
              <div className="relative ml-1 border-l border-outline-variant/40 pl-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SearchCategory)}
                  aria-label="Search category"
                  className="cursor-pointer border-none bg-transparent py-1 pr-2 text-xs font-semibold text-on-surface-variant outline-none"
                >
                  <option value="all">All Tech</option>
                  <option value="coding">Coding &amp; IoT</option>
                  <option value="laptops">Laptops</option>
                  <option value="audio">Audio</option>
                  <option value="mobile">Mobiles</option>
                  <option value="study">Study Gear</option>
                  <option value="daily">Daily-use</option>
                </select>
              </div>
              <button
                type="submit"
                className="ml-2 flex items-center gap-1 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-on-primary transition-colors hover:bg-secondary-container"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
            <a
              href="#student-hub"
              className="hidden items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1.5 text-xs font-semibold text-on-primary-fixed transition-all hover:bg-primary hover:text-on-primary lg:flex"
            >
              <Icon name="school" className="text-sm" /> Student Perks
            </a>
            <button
              type="button"
              title="Wishlist"
              aria-label="Wishlist"
              className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
            >
              <Icon name="favorite" className="text-xl" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-on-primary">
                {wishlistBase + wishlist.size}
              </span>
            </button>
            <button
              type="button"
              onClick={openCart}
              title="Shopping Cart"
              className="relative flex items-center gap-2 rounded-full border border-outline-variant/40 p-2 px-3 text-on-surface transition-all hover:bg-surface-container hover:text-primary"
            >
              <Icon name="shopping_cart" className="text-xl text-primary" />
              <span className="hidden text-xs font-bold text-on-surface sm:inline">Cart</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1.5 text-[11px] font-bold text-on-primary">
                {cartCount(cart)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setModal("account")}
              title="Account"
              className="flex items-center gap-1 rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
            >
              <Icon name="account_circle" className="text-2xl" />
              <span className="hidden text-xs font-semibold xl:inline">Login</span>
            </button>
          </div>
        </div>

        <nav className="no-scrollbar overflow-x-auto border-t border-outline-variant/20 bg-surface-lowest">
          <div className="mx-auto flex h-10 max-w-7xl items-center space-x-6 whitespace-nowrap px-4 text-xs font-semibold md:px-8">
            <a href="#student-hub" className="flex items-center gap-1 border-b-2 border-primary pb-1 font-semibold text-primary">
              <Icon name="grid_view" className="text-sm" /> All Categories
            </a>
            {ribbon.map((r) => (
              <button
                key={r.dept}
                type="button"
                onClick={() => onDepartment(r.dept)}
                className="text-on-surface-variant transition-colors hover:text-on-surface"
              >
                {r.label}
              </button>
            ))}
            <span className="text-outline-variant/60">|</span>
            <a href="#flash-deals" className="flex items-center gap-1 font-bold text-secondary hover:underline">
              <Icon name="local_fire_department" className="text-sm text-error" /> Flash Deals (Save up to 60%)
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
