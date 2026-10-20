import { useMemo } from "react";
import { allProducts, departmentProducts, type Department, type Product } from "@/data/products";
import { CompactCard, FeatureCard } from "./ProductCard";
import { Icon } from "./ShopProvider";

export type SortKey = "popular" | "price-low" | "price-high" | "discount";

const tabs: { id: Department; label: string; icon: string }[] = [
  { id: "mobile", label: "Mobile & Accessories", icon: "smartphone" },
  { id: "laptops", label: "Laptop & Computer", icon: "laptop_mac" },
  { id: "coding", label: "Coding & Engineering", icon: "terminal" },
  { id: "study", label: "Study & College", icon: "menu_book" },
  { id: "audio", label: "Entertainment & Audio", icon: "headphones" },
  { id: "daily", label: "Daily-use Electronics", icon: "electrical_services" },
];

const gridFor: Record<Department, string> = {
  mobile: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",
  laptops: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4",
  coding: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4",
  study: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
  audio: "grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto",
  daily: "grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto",
};

const imageHeight: Partial<Record<Department, string>> = { laptops: "h-32", coding: "h-28" };

function discountOf(p: Product) {
  return p.mrp ? (p.mrp - p.price) / p.mrp : 0;
}

function sortProducts(list: Product[], sort: SortKey) {
  const copy = [...list];
  if (sort === "price-low") copy.sort((a, b) => a.price - b.price);
  if (sort === "price-high") copy.sort((a, b) => b.price - a.price);
  if (sort === "discount") copy.sort((a, b) => discountOf(b) - discountOf(a));
  return copy;
}

interface StudentHubProps {
  active: Department;
  onTab: (d: Department) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  search: { query: string; category: Department | "all" } | null;
  onClearSearch: () => void;
}

export function StudentHub({ active, onTab, sort, onSort, search, onClearSearch }: StudentHubProps) {
  const results = useMemo(() => {
    if (!search) return null;
    const q = search.query.trim().toLowerCase();
    const pool = search.category === "all" ? allProducts : departmentProducts[search.category];
    const seen = new Set<string>();
    return pool.filter((p) => {
      const key = p.cartName.toLowerCase();
      if (seen.has(key)) return false;
      const hit = !q || `${p.name} ${p.cartName} ${p.category ?? ""} ${p.note ?? ""}`.toLowerCase().includes(q);
      if (hit) seen.add(key);
      return hit;
    });
  }, [search]);

  const list = sortProducts(results ?? departmentProducts[active], sort);
  const feature = !results && (active === "audio" || active === "daily");

  return (
    <section id="student-hub" className="mx-auto max-w-7xl scroll-mt-32 px-4 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Icon name="school" className="text-sm" /> Curated College Department Tech
          </div>
          <h2 className="text-headline-md text-on-surface md:text-headline-lg">College Student Electronics Hub</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Engineered bundles tested for hostel life, labs, coders, and late-night study sessions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sortProducts" className="text-xs font-semibold text-outline">
            Sort by:
          </label>
          <select
            id="sortProducts"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="rounded-lg border border-outline-variant/60 bg-surface-lowest px-3 py-1.5 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-outline-variant/30 pb-3 text-sm font-semibold" role="tablist">
        {tabs.map((t) => {
          const isActive = !results && t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTab(t.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 transition-all ${
                isActive ? "bg-on-surface text-on-primary" : "bg-surface-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Icon name={t.icon} className="text-base" /> {t.label}
            </button>
          );
        })}
      </div>

      {results && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface-low px-4 py-2.5 text-xs text-on-surface-variant">
          <span>
            {results.length} result{results.length === 1 ? "" : "s"}
            {search?.query ? (
              <>
                {" "}for <strong className="text-on-surface">“{search.query}”</strong>
              </>
            ) : null}
          </span>
          <button type="button" onClick={onClearSearch} className="flex items-center gap-1 font-bold text-primary hover:underline">
            <Icon name="close" className="text-sm" /> Clear search
          </button>
        </div>
      )}

      <div className="mt-8">
        {list.length === 0 ? (
          <div className="py-12 text-center text-outline">
            <Icon name="search_off" className="mb-2 text-4xl text-outline-variant" />
            <p className="text-sm">No gadgets match that search. Try “charger” or “Raspberry Pi”.</p>
          </div>
        ) : (
          <div className={results ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" : gridFor[active]}>
            {list.map((p) =>
              feature ? (
                <FeatureCard key={p.id} product={p} tone={active === "daily" ? "secondary" : "primary"} />
              ) : (
                <CompactCard key={p.id} product={p} imageHeight={results ? "h-36" : (imageHeight[active] ?? "h-36")} />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
