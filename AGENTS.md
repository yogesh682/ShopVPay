<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Storefront is a single page (`src/routes/index.tsx`) built from `src/components/shop/*`; cart/wishlist/modal/toast state lives in `ShopProvider` context — keeps all overlays in sync without a backend.
- Pricing rules (promo, totals, EMI, free-shipping threshold) live as pure functions in `src/lib/cart.ts` with tests in `src/test/cart.test.ts` — UI must call these, never re-implement math.
- Product catalog is static data in `src/data/products.ts` with hotlinked images — swap for a database later without touching card components.
- Icons use the Material Symbols Outlined web font via the `Icon` helper — matches the source design.
- Shopper accounts use Cloud email/password auth; session + profile state lives in `AuthProvider` (`src/hooks/use-auth.tsx`, mounted in `__root`) with the only auth listener — keeps header, account modal and checkout in sync.
- Account form rules (name, phone, password) are zod schemas in `src/lib/account.ts` with tests in `src/test/account.test.ts`; a DB trigger creates the `profiles` row from sign-up metadata.
