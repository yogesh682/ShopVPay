import type { Product } from "@/data/products";
import { formatINR } from "@/lib/cart";
import { Icon, useShop } from "./ShopProvider";

function WishButton({ product, size = "text-base" }: { product: Product; size?: string }) {
  const { wishlist, toggleWishlist } = useShop();
  const active = wishlist.has(product.id);
  return (
    <button
      type="button"
      aria-label={active ? `Remove ${product.cartName} from wishlist` : `Save ${product.cartName} to wishlist`}
      aria-pressed={active}
      onClick={() => toggleWishlist(product)}
      className="absolute right-2 top-2 z-10 p-1 text-outline transition-colors hover:text-error"
    >
      <Icon name="favorite" fill={active} className={`${size} ${active ? "text-error" : ""}`} />
    </button>
  );
}

export function FlashCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  return (
    <div className="card-lift group relative flex flex-col justify-between rounded-xl border border-outline-variant/40 bg-surface-lowest p-4">
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded bg-error px-2 py-0.5 text-[11px] font-bold text-on-primary">
          {product.badge}
        </span>
      )}
      <WishButton product={product} size="text-lg" />
      <div className="mb-3 flex h-44 w-full items-center justify-center overflow-hidden rounded-lg bg-surface-low p-2">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="max-h-full object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-primary">{product.category}</div>
        <h3 className="mt-0.5 line-clamp-1 text-title-md text-on-surface">{product.name}</h3>
        {product.rating && (
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="flex items-center font-bold text-star">
              <Icon name="star" fill className="text-sm" /> {product.rating}
            </span>
            <span className="text-[11px] text-on-surface-variant">({product.reviews} reviews)</span>
          </div>
        )}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-title-lg font-bold text-on-surface">{formatINR(product.price)}</span>
          {product.mrp && <span className="text-xs text-outline line-through">{formatINR(product.mrp)}</span>}
        </div>
        {product.note && <div className="mt-0.5 text-[11px] font-medium text-secondary">{product.note}</div>}
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-container py-2 text-xs font-semibold text-on-primary transition-colors hover:bg-primary active:scale-95"
      >
        <Icon name="add_shopping_cart" className="text-sm" /> Add to Cart
      </button>
    </div>
  );
}

export function CompactCard({ product, imageHeight = "h-36" }: { product: Product; imageHeight?: string }) {
  const { addToCart } = useShop();
  const badgeIsEmi = product.badge === "0% EMI";
  return (
    <div className="card-lift relative flex flex-col justify-between rounded-xl border border-outline-variant/40 bg-surface-lowest p-3.5">
      {product.badge && (
        <span
          className={`absolute left-2 top-2 z-10 rounded px-2 py-0.5 text-[10px] font-bold ${
            badgeIsEmi ? "bg-secondary text-on-primary" : "bg-primary-fixed text-primary"
          }`}
        >
          {product.badge}
        </span>
      )}
      <WishButton product={product} />
      <div className={`mb-2 flex ${imageHeight} items-center justify-center rounded-lg bg-surface-low p-2`}>
        <img src={product.image} alt={product.alt} loading="lazy" className="max-h-full object-contain" />
      </div>
      <div>
        {product.category && <div className="text-[10px] font-semibold text-outline">{product.category}</div>}
        <h4 className="line-clamp-2 text-xs font-semibold text-on-surface">{product.name}</h4>
        {product.rating && (
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-star">
            <Icon name="star" fill className="text-xs" /> {product.rating} ({product.reviews})
          </div>
        )}
        <div className="mt-2 text-sm font-bold text-on-surface">
          {formatINR(product.price)}{" "}
          {product.mrp && <span className="text-[10px] font-normal text-outline line-through">{formatINR(product.mrp)}</span>}
        </div>
        {product.note && <div className="text-[10px] text-secondary">{product.note}</div>}
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded bg-surface-container py-1.5 text-xs font-semibold text-secondary transition-all hover:bg-secondary hover:text-on-primary"
      >
        <Icon name="add" className="text-sm" /> Add
      </button>
    </div>
  );
}

export function FeatureCard({ product, tone = "primary" }: { product: Product; tone?: "primary" | "secondary" }) {
  const { addToCart } = useShop();
  return (
    <div className="card-lift relative flex flex-col justify-between rounded-xl border border-outline-variant/40 bg-surface-lowest p-4">
      <WishButton product={product} />
      <div className="mb-3 flex h-44 items-center justify-center rounded-lg bg-surface-low p-3">
        <img src={product.image} alt={product.alt} loading="lazy" className="max-h-full object-contain" />
      </div>
      <div>
        <span className={`text-xs font-bold ${tone === "primary" ? "text-primary" : "text-secondary"}`}>
          {product.category}
        </span>
        <h4 className="mt-1 text-sm font-semibold text-on-surface">{product.name}</h4>
        <div className="mt-2 text-base font-bold text-on-surface">
          {formatINR(product.price)}{" "}
          {product.mrp && <span className="text-xs font-normal text-outline line-through">{formatINR(product.mrp)}</span>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="mt-3 w-full rounded-lg bg-primary-container py-2 text-xs font-semibold text-on-primary transition-colors hover:bg-primary active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
}
