# Component Execution Plan — A K Enterprises Mannequin Store

**Source:** outputs/03_visual_redesign_direction.md
**Role:** Senior Frontend Architect + Product Designer
**Stack:** React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui + React Router v6
**Constraint:** No code changes — this is a developer handoff document only

---

## Header Changes

### File: `src/components/site/Header.tsx`

**Current Issue:**
- Cart, Wishlist, and Search are `hidden sm:block` — invisible on mobile (<640px)
- "Get a Quote" CTA is `hidden lg:inline-flex` — invisible below 1024px
- Mobile hamburger menu only shows text navigation links
- Nav link font size is effectively 11px with `tracking-[0.2em]` — below comfortable readability
- Icon touch targets are `p-2 + size={18}` = ~38px, below the 44px minimum

**Redesign Goal:**
Make all utility actions accessible on every breakpoint. Restructure the mobile menu to include search, wishlist, cart, and a "Get a Quote" CTA.

**Exact UI Changes:**

1. **Mobile header bar (< 1024px):** Change from `[Logo | Hamburger]` to `[Logo | Search + Cart(badge) + Hamburger]`
   - Move Search icon and Cart icon outside of the `hidden sm:block` guard
   - Wishlist icon: move into the mobile menu drawer (acceptable; reduces header clutter)
   - Cart icon: always visible. Remove `hidden sm:block`. Add `block` class.
   - Search button: always visible. Remove `hidden sm:block`. Add `block` class.

2. **Icon touch targets:** Change all header icon buttons from `p-2` → `p-2.5 md:p-2` to reach 44px on mobile.

3. **Mobile menu drawer:** Add below the existing NAV links:
   ```
   <hr className="border-white/20 my-2" />
   <div className="px-1">
     <SearchInput />  {/* inline search bar */}
   </div>
   <a href="/wishlist" className="...">Wishlist ({totalWishlist})</a>
   <hr className="border-white/20 my-2" />
   <a href="/request-quote" className="w-full block text-center bg-gold text-obsidian py-3 rounded-full font-bold uppercase tracking-widest text-sm">
     Get a Quote
   </a>
   <div className="mt-4 text-xs text-white/50 space-y-1">
     <a href="tel:+919884195244">+91 98841 95244</a>
     <a href="mailto:akenterprisesbus26@gmail.com">akenterprisesbus26@gmail.com</a>
   </div>
   ```

4. **"Get a Quote" in header:** Change `hidden lg:inline-flex` → `hidden md:inline-flex` to show on tablets.

5. **Nav link size:** Change `text-sm` → keep `text-sm`, but reduce `tracking-[0.2em]` → `tracking-widest` (Tailwind standard = 0.1em). More readable.

**Interaction Improvements:**
- Mobile menu: animate as right-to-left slide-in panel instead of top-to-bottom dropdown (change `lg:hidden` drawer from absolute positioned block below header to a `fixed inset-y-0 right-0 w-72` side drawer with `translate-x-full` → `translate-x-0` transition)
- Close drawer on route change (already implemented with `onClick={() => setOpen(false)}` on nav links — extend to wishlist and quote links)

**Responsive Behavior:**
- `< 640px`: Logo + Search + Cart(badge) + Hamburger
- `640px – 1023px`: Logo + Search + Cart(badge) + "Get a Quote" + Hamburger
- `≥ 1024px`: Full desktop header (current behavior)

**Spacing Changes:**
- Announcement bar: `py-2` → `py-2.5` for slightly more breathing room
- Header icon gap: `gap-1 md:gap-2` → `gap-2 md:gap-3`

---

## Sidebar Changes

*No traditional sidebar exists in this application. The CartDrawer functions as a contextual side panel.*

### File: `src/components/site/CartDrawer.tsx`

**Current Issue:**
- Checkout button routes to `navigate('/checkout/${items[0].id}')` — only processes the first cart item
- Entire checkout is blocked if any one item is out-of-stock
- No total price displayed — user doesn't know their cart value before proceeding

**Redesign Goal:**
Fix multi-item checkout routing. Add total price. Soften the OOS block — offer "Remove & Proceed" instead of complete lock.

**Exact UI Changes:**

1. **Checkout routing:** Change from single-item routing to a multi-item query string or cart context approach:
   - Option A: Navigate to `/checkout` (no ID) and read all cart items from context on the checkout page
   - Option B: Navigate to `/checkout?ids=id1,id2,id3`
   - Recommended: Option A — `/checkout` as a standalone route that renders all cart items

2. **Add cart total to footer section:**
   ```
   <div className="flex justify-between text-base font-semibold mt-2">
     <span className="font-display">Total</span>
     <span className="font-price">{format(cartTotal)}</span>
   </div>
   ```
   `cartTotal` = sum of `item.priceINR × item.quantity` for all items.

3. **Partial OOS handling:** Replace the locked-button state with:
   ```
   <button onClick={removeOOSAndCheckout} className="...">
     Remove out-of-stock items & Proceed
   </button>
   ```
   This auto-removes OOS items from cart and navigates. Keep the red warning message as-is.

**Spacing Changes:**
- Item rows: `py-4` → keep. Add `gap-5` between items instead of `space-y-4`.
- Footer padding: `px-6 py-5` → `px-6 py-6`

---

## Navigation Improvements

### File: `src/components/site/Categories.tsx`

**Current Issue:**
All category cards link to `href="/#products"` with no filter applied.

**Redesign Goal:**
Category cards trigger the product filter for their respective category.

**Exact UI Changes:**
1. Change `href="/#products"` on each category card to `href="/#products?category=${encodeURIComponent(c.tag)}"` (or use React Router's `Link` + `useSearchParams`)
2. In `Products.tsx`, read `URLSearchParams` on mount and set the active filter accordingly:
   ```tsx
   const [searchParams] = useSearchParams();
   const initialCategory = searchParams.get("category") ?? "All";
   const [activeFilter, setActiveFilter] = useState(initialCategory);
   ```

**Interaction Improvement:**
- Smooth scroll to `#products` section after category click (can use `element.scrollIntoView({ behavior: 'smooth' })` after state update)
- Active category card: add `ring-2 ring-gold` or a checkmark overlay when that category is the active filter

---

## Dashboard Card Changes

### File: `src/components/site/Products.tsx`

**Current Issue:**
- No filter UI despite `FILTERS` array existing in `products.ts`
- Products displayed in reverse insertion order with no logic
- No "Add to Cart" button visible without hover
- `aspect-square` image container doesn't suit portrait-oriented full-body mannequins
- Product tag labels are `text-[10px]` — below minimum readability

**Redesign Goal:**
Add filter tabs. Show an "Add to Cart" action without requiring hover. Improve image proportions. Increase tag text size.

**Exact UI Changes:**

1. **Filter tabs:** Add above the product grid:
   ```tsx
   <div className="flex flex-wrap gap-2 mt-10 mb-6">
     {FILTERS.map(filter => (
       <button
         key={filter}
         onClick={() => setActiveFilter(filter)}
         className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-smooth ${
           activeFilter === filter
             ? 'bg-gold text-obsidian'
             : 'border border-border text-foreground/70 hover:border-foreground'
         }`}
       >
         {filter}
       </button>
     ))}
   </div>
   ```
   Filter logic: `const displayed = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.tag === activeFilter)`

2. **CurrencyToggle:** Move from its own row to be right-aligned beside the filter tabs in the same flex row.

3. **Product card "Add to Cart" button:** Add a small icon button always visible at bottom-right of the image area:
   ```tsx
   <button
     aria-label={`Add ${p.name} to cart`}
     onClick={(e) => { e.preventDefault(); addToCart(p); }}
     className="absolute bottom-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-obsidian text-white hover:bg-gold hover:text-obsidian transition-smooth z-10 shadow-md"
   >
     <ShoppingCart size={14} />
   </button>
   ```

4. **Image aspect ratio:** Change `aspect-square` → `aspect-[3/4]` for Full Body products; keep `aspect-square` for Torso Bust, Decor, Mandap. Implement via:
   ```tsx
   const aspectClass = (p.tag.includes("Full Body")) ? "aspect-[3/4]" : "aspect-square";
   ```

5. **Tag label size:** Change `text-[10px]` → `text-xs` throughout product cards.

6. **Grid columns:** Change from `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` → `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4` (add the missing `md:grid-cols-3`).

**Responsive Behavior:**
- Mobile: 1 col
- 640–767px: 2 col
- 768–1279px: 3 col
- 1280px+: 4 col

---

## Table Improvements

*No traditional tables exist. Applies to structured data lists.*

### File: `src/pages/Checkout.tsx` — Order Summary Line Items

**Current Issue:** Line item rows have inconsistent padding; "Calculated at next step" for shipping is vague.

**Exact UI Changes:**
1. Each line item row: add `py-3 border-b border-border/40` for clear visual separation
2. Shipping row: replace "Calculated at next step" with "Free above ₹50,000 · Calculated otherwise"
3. Total row: change from `font-display text-xl` → `font-display text-xl border-t-2 border-border pt-4 mt-2`
4. Multi-item support: when there are multiple cart items, render each item as its own line in the order summary with name + qty + subtotal

### File: `src/components/site/Enquiry.tsx` — Info Panel `dl` List

**Current Issue:** Three-row info panel (Response Time, Minimum Order, Lead Time) has no icons.

**Exact UI Changes:**
- Add a Lucide icon before each `dt`: `Clock` for response time, `Package` for minimum order, `Calendar` for lead time
- Row padding: `pb-3` → `pb-4`

---

## Form Improvements

### File: `src/pages/Checkout.tsx` — `Field` Component

**Current Issue:**
- Bottom-border-only input (`border-b border-border`) is hard to scan on multi-field forms
- No inline validation feedback
- No focus ring

**Exact UI Changes:**
Rewrite the `Field` component:
```tsx
const Field = ({ label, error, ...props }) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-foreground/70 font-medium mb-1.5 block">
      {label}
    </label>
    <input
      {...props}
      className={`w-full rounded-lg border px-4 py-3 text-sm bg-background text-foreground
        placeholder:text-foreground/30 outline-none transition-colors
        focus:border-gold focus:ring-1 focus:ring-gold/30
        ${error ? 'border-red-400 ring-1 ring-red-400/20' : 'border-border'}
      `}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
```

**Interaction Improvements:**
- Add `onBlur` validation to each field (validate pattern on blur, not only on submit)
- Pre-fill Country field with "India" as default value
- Combine First Name + Last Name into a single "Full Name" field (reduces field count from 9 to 8)

### File: `src/components/site/Enquiry.tsx` — Enquiry Form

**Current Issue:** Dark surface form uses bottom-border inputs that are hard to distinguish from dividers.

**Exact UI Changes:**
- Dark version of the contained field: `rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white`
- Focus: `focus:border-gold focus:ring-1 focus:ring-gold/30`
- Add "Quantity Required" field (numeric input, min=1) between "Interested In" and "Message"

---

## Button System Improvements

### All Button-Containing Files

**Current Issue:** Buttons are styled ad-hoc per component. The same "primary action" button has different `px`, `py`, `tracking`, and `text-size` values in `Hero.tsx`, `Checkout.tsx`, `CartDrawer.tsx`, and `Enquiry.tsx`.

**Exact UI Changes — Define 4 Shared Classes in `index.css` or a `Button` utility:**

```css
/* In @layer components: */
.btn-primary {
  @apply inline-flex items-center justify-center gap-2
    bg-gold text-obsidian font-bold uppercase tracking-widest
    rounded-full px-7 py-3.5 text-sm
    hover:bg-white transition-smooth shadow-md
    disabled:opacity-40 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply inline-flex items-center justify-center gap-2
    bg-obsidian text-white font-bold uppercase tracking-widest
    rounded-full px-7 py-3.5 text-sm
    hover:bg-gold hover:text-obsidian transition-smooth
    disabled:opacity-40 disabled:cursor-not-allowed;
}

.btn-outline {
  @apply inline-flex items-center justify-center gap-2
    border-2 border-obsidian text-obsidian font-semibold uppercase tracking-widest
    rounded-full px-7 py-3.5 text-sm
    hover:bg-obsidian hover:text-white transition-smooth
    disabled:opacity-40 disabled:cursor-not-allowed;
}

.btn-ghost {
  @apply text-foreground/60 text-sm uppercase tracking-widest
    hover:text-foreground underline-offset-4 hover:underline transition-colors;
}
```

Replace current one-off Tailwind classes on buttons throughout the codebase with these 4 classes.

**Interaction Improvements:**
- `btn-primary` and `btn-secondary`: Add `active:scale-[0.98]` for tactile press feedback
- Disabled loading state: Replace static "Processing..." text with a Lucide `Loader2` spinner icon + `animate-spin`

---

## Modal Improvements

*The CartDrawer is the primary modal-like component.*

### File: `src/components/site/CartDrawer.tsx`

**Current Issue:**
- Drawer drops in from right with no animation (CSS only — no Framer Motion or transition class on the drawer element itself)
- No swipe-to-close on mobile
- Backdrop `bg-obsidian/60` is slightly too transparent — content behind is distracting

**Exact UI Changes:**
1. Add animation to the drawer:
   ```tsx
   /* Drawer div: add transition and initial/animated classes */
   className="fixed right-0 top-0 h-full w-full max-w-md z-[200] bg-background shadow-luxe flex flex-col
     translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
   ```
   Use a `cartOpen` state to toggle `translate-x-full` (closed) → `translate-x-0` (open) instead of conditional render (`if (!cartOpen) return null`)

2. Backdrop opacity: `bg-obsidian/60` → `bg-obsidian/70`

3. Empty cart state: Change generic `ShoppingBag size={48}` icon to a more evocative message:
   ```
   Your cart is empty
   Browse the collection and add pieces you love.
   [Explore Products →]
   ```

---

## Empty State Improvements

### CartDrawer Empty State
- Current: ShoppingBag icon + "Your cart is empty" + "Continue Shopping" text link
- Redesign: Add a brief descriptor + a styled CTA button (`btn-secondary` style, smaller: `px-5 py-2.5 text-xs`)

### Wishlist Empty State (`src/pages/Wishlist.tsx`)
- Current: Heart icon + "Your wishlist is empty" + "Explore Products" button — this is good
- Minor change: "Save items you love to build your perfect collection." → more specific: "Add mannequins, decor, or mandaps you're considering — we'll keep them here for you."

### ProductDetails — Not Found State
- Current: "Product not found" + "Return to Collection" link — adequate
- Add: A brief suggestion: "Try browsing our full collection below" with a secondary Products grid (3 featured products)

---

## Error State Improvements

### Checkout Form Validation
- Current: HTML5 browser-native validation popups — inconsistent cross-browser appearance, no branding
- Redesign: Disable `noValidate` on the form, add manual validation via `react-hook-form`:
  - Each field shows a red-bordered input + inline error text on blur
  - On submit, first invalid field scrolls into view and receives focus

### Cart OOS Error Banner
- Current: Red alert box (`bg-red-500/10 border-red-500/20`) — appropriate
- Minor improvement: Make the error dismissible after user acknowledges it (add an × button on the banner)

### Out-of-Stock Product Detail
- Current: Disabled buttons with "Out of Stock" text and a red dot
- Redesign: Replace red dot with a `bg-red-500/10 text-red-600 text-xs px-2 py-1 rounded-full` badge reading "Currently Unavailable"
- Add below the badge: "Notify me when available" text link (even if it just opens the Enquiry form pre-filled with the product name — a meaningful UX gesture)

---

## Responsive Design Tasks

### Priority Order for Responsive Fixes

**P1 — Mobile Cart Access**
- File: `Header.tsx`
- Task: Remove `hidden sm:block` from Cart and Search icons. Add them to header at all breakpoints.
- Breakpoints: affects xs (< 640px)

**P2 — Mobile "Get a Quote" CTA**
- File: `Header.tsx` mobile menu section
- Task: Add "Get a Quote" as full-width button inside mobile hamburger drawer
- Breakpoints: affects xs, sm (< 1024px)

**P3 — Product Grid 3-Column on Tablet**
- File: `Products.tsx`
- Task: Add `md:grid-cols-3` to product grid
- Breakpoints: affects md (768px–1279px)

**P4 — Hero Stats on Mobile**
- File: `Hero.tsx`
- Task: Move stats block from `hidden lg:flex lg:col-span-5` to a separate row below CTAs with `flex lg:hidden` or reuse in both locations
- Breakpoints: affects xs, sm, md (< 1024px)

**P5 — Checkout Form on Mobile**
- File: `Checkout.tsx`
- Task: Ensure `grid-cols-2` in the shipping form collapses to `grid-cols-1` below 480px (add `xs:grid-cols-2` or `sm:grid-cols-2`)
- Breakpoints: affects xs (< 480px)

**P6 — Category Grid on Mobile**
- File: `Categories.tsx`
- Task: Change `grid-cols-2 lg:grid-cols-4` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Breakpoints: affects xs (< 640px)

---

## Mobile Interaction Improvements

**1. Product Card — Touch-Activated "Add to Cart"**
On touch devices, the hover overlay (Buy Now) is inaccessible. Add a persistent CTA below the image on mobile:
```tsx
<div className="block sm:hidden px-4 pb-4">
  <button className="btn-secondary w-full py-2.5 text-xs">
    Add to Cart
  </button>
</div>
```

**2. Quantity Stepper — Larger Touch Targets**
Cart drawer quantity controls (`w-8 h-8` = 32px) are below 44px minimum.
Change: `w-8 h-8` → `w-10 h-10` for all quantity stepper buttons.

**3. Mobile Menu — Swipe or Backdrop Close**
Current mobile menu is a `div` inside the header with no backdrop. Adding:
```tsx
{open && (
  <div
    className="fixed inset-0 z-40 bg-obsidian/40"
    onClick={() => setOpen(false)}
  />
)}
```
Allows tap-outside-to-close on mobile.

**4. Checkout Payment Options — Ensure 1-column on Mobile**
`grid-cols-1 md:grid-cols-3` already handles this correctly. Verify the `md` breakpoint fires at 768px (correct) and payment cards don't overflow on 360px screens.

---

## Frontend Handoff Notes

### State Management
- Cart state: `CartContext` (context + localStorage) — adequate for current scope
- Wishlist state: `WishlistContext` — adequate
- Currency state: `CurrencyContext` — adequate, but should be accessible as a global header toggle (not per-section). Currently already global — remove per-page instances.
- Filter state: New local state in `Products.tsx` — `const [activeFilter, setActiveFilter] = useState("All")`. Read initial value from URL search param `?category=`.

### Routing
- Add `/checkout` as a new route (no `/:id` param) that reads from cart context
- Keep `/checkout/:id` for the "Buy Now" single-product direct checkout flow
- Ensure `NotFound.tsx` renders correctly for any invalid route

### Data Layer
- `products.ts` needs: add optional `minOrderQty: number`, `dimensions?: string`, `material?: string` fields to the `Product` interface
- Remove deprecated `price: string` field once `priceINR + useCurrency()` is the sole display method
- Remove the `percentOff` and `originalPrice` calculation from `ProductDetails.tsx` entirely

### CSS/Tailwind
- Remove all `text-[10px]` and `text-[9px]` one-off class values; replace with `text-xs`
- Remove all `tracking-[0.4em]`, `tracking-[0.3em]`, `tracking-[0.25em]`, `tracking-[0.2em]` one-off values; replace with `tracking-widest`, `tracking-wider`, or `tracking-wide`
- Add shared button classes to `@layer components` in `index.css`
- `transition-smooth` is `0.6s` — too slow for text hover states; add `transition-colors duration-150` as a separate utility for hover text effects

### Key Bugs to Fix Before Styling
1. `CartDrawer.tsx:19` — Fix multi-item checkout
2. `ProductDetails.tsx:30` — Remove fabricated discount
3. `Footer.tsx:27` — Fix dead social links
4. `ProductDetails.tsx:185` — Fix related products wishlist button (remove `e.preventDefault()`)
5. `Categories.tsx:64` — Fix category links to apply filters
6. `Header.tsx:151,158,170` — Restore cart/wishlist/search on mobile

---

## Component Priority Order

### Phase 1 — Functional Fixes (No Visual Change Required)
1. `CartDrawer.tsx` — Multi-item checkout + total price + OOS soft-block
2. `Header.tsx` — Mobile cart/wishlist/search restore
3. `Products.tsx` — Filter tabs using existing FILTERS array
4. `ProductDetails.tsx` — Remove fabricated discount + fix related products wishlist
5. `Categories.tsx` — Fix category card filter links
6. `Footer.tsx` — Fix social media links

### Phase 2 — Visual + UX Improvements
7. `Header.tsx` — Mobile menu drawer restructure (search + wishlist + quote CTA + contact)
8. `Products.tsx` — Add persistent "Add to Cart" button, fix grid columns, improve tag size
9. `ProductDetails.tsx` — Add quantity stepper, add specifications section, fix in-stock indicator
10. `Hero.tsx` — Show stats on mobile, change secondary CTA text

### Phase 3 — Form & Checkout Overhaul
11. `Checkout.tsx` — Multi-item support, contained field inputs, inline validation, COD info
12. `Enquiry.tsx` — Add quantity field, contained input style
13. Add new `/checkout` route (cart-based, not product-ID-based)
14. `OrderSuccess.tsx` — Add order reference number and next-steps messaging

### Phase 4 — Polish & Accessibility
15. `PaymentOption` component — Replace `div` with `fieldset` + `input[type=radio]`
16. All social icon `aria-label` fixes
17. Search results `aria-live` region
18. Product card wishlist button descriptive `aria-label`
19. Button system — Implement shared CSS classes
20. Breadcrumb component — Add to ProductDetails, Checkout, Wishlist pages
