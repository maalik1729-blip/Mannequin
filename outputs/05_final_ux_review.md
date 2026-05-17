# Final UX Review — A K Enterprises Mannequin Store

**Source:** outputs/04_component_execution_plan.md
**Role:** Senior UX Reviewer
**Stack:** React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui + React Router v6
**Review Date:** 2026-05-18

---

## Final UX Review Summary

The redesign plan across stages 01–04 is thorough, well-reasoned, and addresses the most severe conversion-blocking issues. Functional fixes (multi-item checkout, mobile cart access, filter tabs, dead social links) are correctly prioritised in Phase 1. Visual and interaction improvements in Phases 2–4 are realistic and additive without over-engineering the codebase.

**Three remaining risk areas before implementation:**

1. **The checkout flow still relies on a mock payment gateway** — `setTimeout` with no real transaction. Every functional and UX fix is undermined if no real payment is processed. This must be flagged to stakeholders before any public release.
2. **The B2B / B2C audience split is unresolved** — Products ranging from ₹9,500 torso busts to ₹30,00,000 mandaps are still presented in a single grid. Filter tabs help, but no landing-page-level separation exists.
3. **Accessibility remediation is listed as Phase 4 (last)** — WCAG-critical issues (payment radio group using `div`, missing `aria-live` for search, hover-only CTAs) should be elevated to Phase 2 since they affect real usability, not just screen readers.

---

## Remaining UX Risks

### Risk 1 — Mock Payment Gateway (CRITICAL)
- **File:** `src/pages/Checkout.tsx` — `onSubmit` uses `setTimeout(1500)` to simulate payment success
- **Risk:** Any live user placing an order receives a success screen with no real transaction, no payment captured, no order record
- **Impact:** Legal exposure, zero revenue capture, user trust destruction
- **Mitigation:** Integrate Razorpay, PhonePe, or Cashfree before release. Alternatively, disable the "Place Order" button entirely and replace with a "Send Enquiry" flow that emails order details to `akenterprisesbus26@gmail.com`

### Risk 2 — No Order Persistence
- **File:** `src/pages/OrderSuccess.tsx` — no order state, no reference number, no email confirmation
- **Risk:** After "order placed", refreshing the page shows the same success screen. Cart is cleared. No record exists anywhere
- **Mitigation:** Even without a real backend, store a generated order reference to `localStorage` and display it on the success page with a "We'll contact you within 24 hours" message

### Risk 3 — Cart State Lost on Page Refresh (Partial)
- **File:** `src/context/CartContext.tsx` — check whether cart persists to `localStorage`
- **Risk:** If `localStorage` persistence is not implemented, every page refresh empties the cart — critical for mobile users who switch apps mid-shopping
- **Mitigation:** Verify `useEffect` sync to `localStorage` is in place. If not, add it.

### Risk 4 — No Input Sanitisation on Forms
- **Files:** `src/pages/Checkout.tsx`, `src/components/site/Enquiry.tsx`, `src/pages/QuoteRequest.tsx`
- **Risk:** Free-text fields (Name, Message, Address) have no length limits or sanitisation. XSS risk if form data is ever rendered server-side
- **Mitigation:** Add `maxLength` attributes. Add client-side trim. Use a server-side sanitiser if form data reaches a backend

### Risk 5 — Currency Conversion Uses Static Rates
- **File:** `src/context/CurrencyContext.tsx` — rates are likely hardcoded
- **Risk:** If USD/EUR rates are fixed in code, international prices shown to users will be incorrect as market rates change
- **Mitigation:** Add a comment in the file noting the rate source and date. Consider an API (ExchangeRate-API free tier) or at minimum a manual quarterly update reminder

### Risk 6 — "Kids Range" Filter Category Has Zero Products
- **File:** `src/data/products.ts` FILTERS array contains `"Kids Range"` but no product has `tag: "Kids Range"`
- **Risk:** Selecting the Kids Range filter shows an empty state ("No pieces in this category yet") — confusing and looks broken
- **Mitigation:** Remove "Kids Range" from the FILTERS array until products are added, OR show the filter as disabled/greyed out

---

## Accessibility Risks

### A1 — Payment Option `div` is Not Keyboard Navigable (HIGH)
- **File:** `src/pages/Checkout.tsx` — `PaymentOption` renders a `div` with `onClick`
- **Risk:** Keyboard-only users cannot Tab to payment options; screen readers don't announce them as radio inputs
- **Fix:** Wrap in `<fieldset>` + `<legend>`, render each option as `<label htmlFor>` + `<input type="radio">` (already specified in 04_component_execution_plan.md — must not be deferred)

### A2 — Hover-Only "Buy Now" on Product Cards
- **File:** `src/components/site/Products.tsx` — the overlay with "Buy Now" is `opacity-0 group-hover:opacity-100`
- **Risk:** Keyboard users pressing Tab will focus the card link but cannot reach the "Buy Now" button; touch users on mobile cannot hover
- **Fix:** Make the button always visible (already specified in plan). Confirm it also receives natural Tab focus

### A3 — Search Results Have No `aria-live` Announcement
- **File:** `src/components/site/Header.tsx` — search dropdown appears without notifying screen readers
- **Fix:** Add `aria-live="polite"` to the search results container. Already specified — confirm it's promoted to Phase 2

### A4 — Colour Contrast: Gold on Linen Background
- **Colors:** `hsl(32 35% 52%)` (gold) on `hsl(36 28% 96%)` (ivory background)
- **Risk:** Contrast ratio ≈ 2.8:1 — fails WCAG AA (requires 4.5:1 for normal text, 3:1 for large text)
- **Affected areas:** Section sub-labels in gold, category tag labels in gold, footer social links in gold
- **Fix:** Darken gold text instances to `hsl(30 45% 38%)` for text use only (keep decorative gold as-is)

### A5 — Image `alt` Text Quality
- **Files:** `src/components/site/About.tsx`, `src/components/site/Hero.tsx`
- `alt="Showroom"` and `alt="Professional mannequin display"` are insufficient for users relying on screen readers
- **Fix:** Use descriptive alt text: `"A K Enterprises showroom interior displaying gold and white full-body mannequins"`, `"Full-body black female mannequins in a Chennai display solutions atelier"`

### A6 — Footer Social Icons (All Three Share `aria-label="social"`)
- **Fix:** Change to `aria-label="Follow A K Enterprises on Instagram"`, `"...Facebook"`, `"...YouTube"`
- Still unresolved from the audit — must be implemented in Phase 4

### A7 — In-Stock / Out-of-Stock Colour-Only Signal
- **File:** `src/pages/ProductDetails.tsx`
- Green/red dots with no icon or text pattern — users with colour blindness cannot distinguish
- **Fix:** Use text labels "In Stock" / "Currently Unavailable" alongside dots (already implemented — verify the text labels are retained)

---

## Responsive Design Risks

### R1 — Product Filter Pills Overflow on 320px Screens
- **Risk:** With 9 filter options as pill buttons in a `flex-wrap` row, on 320px (older Android phones) they may overflow or wrap into 4–5 rows, pushing products far down the page
- **Fix:** Consider a horizontal scroll filter row (`overflow-x-auto` + `flex-nowrap`) for screens below 480px, with a subtle fade gradient on the right edge indicating scrollability

### R2 — Cart Drawer Width on Small Phones
- The CartDrawer is `w-full max-w-md` — on 320px screens `max-w-md` (448px) triggers `w-full`, which is correct. Verify the drawer header doesn't overflow horizontally (logo + close button + potential badge)

### R3 — Product Card Name Truncation Hides Long Names
- `truncate` class on `<h3>` in product cards cuts off names like "Wooden type mandabam with walk way Elephant"
- On 2-column mobile grid, cards are ~160px wide — the truncated name may show only "Wooden type manda..."
- **Fix:** Allow 2-line clamp instead of single-line truncate on mobile: `line-clamp-2` instead of `truncate`

### R4 — Checkout Form Field Labels on Mobile
- Fields like "State / Province" and "Postal / Zip Code" have long label text that may wrap onto 2 lines at `text-xs uppercase tracking-widest`
- **Fix:** Shorten labels on mobile: "Province" → "State", "Postal / Zip Code" → "Postcode"

### R5 — Hero Headline Font Size on 375px Screens
- `text-4xl` (2.25rem) for the H1 on mobile with 3-line text = approximately 3×36px = 108px just for the headline. Combined with the sub-label and CTAs, this pushes the stats strip below the fold entirely
- **Fix:** Add `text-3xl` at xs (below 375px) as the minimum: `text-3xl sm:text-4xl md:text-6xl lg:text-7xl`

---

## Interaction Consistency Review

| Interaction | Expected Behaviour | Current State | Status |
|---|---|---|---|
| Add to Cart from product card | Adds item, shows badge increment on cart icon | Plus button works but no animation/feedback | ⚠️ Missing feedback |
| Add to Cart from product detail | Adds `qty` items, shows "Added!" for 2s | ✅ Implemented | ✅ OK |
| Cart icon badge | Shows count, updates in real-time | ✅ Via context | ✅ OK |
| Wishlist toggle | Heart fills red, count updates | ✅ Implemented | ✅ OK |
| Search — no results | Shows "No results for..." message | ✅ Implemented | ✅ OK |
| Search — close on Escape | Closes search bar | ✅ Implemented | ✅ OK |
| Category filter from Categories section | Scrolls to filtered product grid | ⚠️ Currently shows unfiltered grid | ⚠️ Phase 1 fix |
| Payment method selection | Shows relevant details below | ✅ Cards/UPI/COD all render | ✅ OK |
| Checkout submit — loading state | Shows spinner, disables button | ✅ `Loader2` + `disabled` | ✅ OK |
| Currency toggle | Updates all prices globally | ✅ Via context | ✅ OK |
| Mobile menu — close on nav click | Closes drawer | ✅ `onClick={() => setOpen(false)}` | ✅ OK |
| Related products wishlist | Adds to wishlist | ⚠️ `e.preventDefault()` blocks it | ⚠️ Phase 1 bug |

**Inconsistency:** "Add to Cart" from the product card has no visual feedback (no toast, no animation, no badge flash). But "Add to Cart" from the product detail page shows a green "Added!" state. These two interactions should be consistent — add a brief toast or badge flash when adding from the card.

---

## Edge Case Review

### E1 — Empty Cart Checkout Navigation
- **Path:** User navigates directly to `/checkout` with no cart items and no product ID
- **Current:** Shows "Your cart is empty" with a "Return to Store" button — ✅ handled
- **Edge:** User navigates to `/checkout/nonexistent-id` — `singleProduct` is `null`, `checkoutItems` is `[]`, renders empty cart state — ✅ handled

### E2 — Product Not Found
- **Path:** User navigates to `/product/random-string`
- **Current:** Shows "Product not found" with a link back — ✅ handled
- **Improvement:** Add 3 featured products below the not-found message to retain the user in the funnel

### E3 — Very Long Product Names in Cart Drawer
- Product name "Wooden type mandabam with walk way Elephant" in the cart drawer item row may overflow the `w-48` or `flex-1` container
- **Fix:** Apply `line-clamp-2` or `truncate` to the cart item name in `CartDrawer.tsx`

### E4 — Quantity Stepper — Maximum Not Defined
- **File:** `src/pages/ProductDetails.tsx` — `setQty(q => q + 1)` has no upper limit
- User can set quantity to 9999 for a ₹30,00,000 mandap = ₹29,99,70,00,000 in the order summary
- **Fix:** Add `Math.min(99, q + 1)` as the upper limit, or a stock-based cap

### E5 — Currency Toggle on Checkout with International Currency
- If user sets currency to USD and proceeds to checkout, the order summary shows USD prices. But the order is physically placed in India with INR. There is no currency note on the order confirmation
- **Fix:** Add a disclaimer: "All orders are invoiced in INR. Prices shown in foreign currencies are approximate"

### E6 — Multiple Rapid Add-to-Cart Clicks
- Clicking "Add to Cart" multiple times in 200ms intervals on the product detail page adds duplicate items because there is no debounce
- **Fix:** Disable the button for 300ms after click, or debounce the `addToCart` call

### E7 — Wishlist Persisted Across Sessions, Cart Potentially Not
- If `WishlistContext` persists to `localStorage` but `CartContext` does not, a returning user finds their wishlist intact but their cart empty — creates asymmetric expectations
- **Fix:** Ensure both contexts sync to `localStorage` with the same strategy

---

## Performance Considerations

### P1 — Images Are Not Optimised
- All product images are imported as static assets in `products.ts`. PNG files for mannequins and mandaps are likely high-resolution (500KB–2MB each)
- **Impact:** Initial page load on mobile 4G may be slow (28 products × ~1MB = 28MB if not lazy-loaded)
- **Fix:** All product `<img>` tags in `Products.tsx` already have `loading="lazy"` — ✅ good. Ensure images are compressed to WebP at build time (Vite `vite-imagetools` plugin or manual conversion)

### P2 — All 28 Products Load Immediately
- No pagination, infinite scroll, or virtual list — all 28 products render on mount
- At 28 products this is acceptable. Above 50 products, consider virtual scrolling
- **Current risk:** Low — no action needed now

### P3 — Lenis Smooth Scroll on Every Page
- `useLenis()` is called on Index, Checkout, ProductDetails, QuoteRequest, Wishlist, CancellationRefund, PrivacyPolicy, TermsConditions, ShippingPolicy
- Lenis initialises a `requestAnimationFrame` loop — on low-end devices this can drain battery and cause jank
- **Fix:** Only apply Lenis on the homepage. Use native scroll on inner pages

### P4 — `transition-smooth` is 0.6s on All Interactive Elements
- `transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1)` applied globally via `.transition-smooth`
- `transition: all` captures every CSS property — expensive on composite layers
- **Fix:** Replace `transition: all` with `transition: color, background-color, border-color, opacity, transform` — target only the properties that change

---

## UX QA Checklist

### Homepage
- [ ] Hero CTA "Explore Collection" scrolls to `#products` section smoothly
- [ ] Hero secondary CTA "Request a Quote" navigates to `/request-quote`
- [ ] Marquee strip animates without jank
- [ ] Category cards apply the correct filter when clicked (after Phase 1 fix)
- [ ] Product grid filter tabs work — switching filters updates the displayed products
- [ ] "Kids Range" filter removed from UI (has zero products)
- [ ] Product card "Add to Cart" (plus icon) adds item and increments header cart badge
- [ ] Wishlist heart on product card toggles filled/unfilled state
- [ ] Enquiry form submits successfully and shows a confirmation state
- [ ] Contact section phone and email links open correctly
- [ ] Footer social links point to real social profiles (not `#`)
- [ ] Footer policy links navigate to their respective pages

### Header (All Pages)
- [ ] Cart icon visible on mobile (below 640px)
- [ ] Search icon visible on mobile
- [ ] Cart badge count updates after Add to Cart
- [ ] Search bar opens on click, closes on Escape or X button
- [ ] Search results show for queries of 2+ characters
- [ ] Search results link correctly to product detail pages
- [ ] Mobile hamburger opens drawer
- [ ] Mobile drawer contains: nav links, search, wishlist, "Get a Quote" CTA, contact info
- [ ] "Get a Quote" button visible on tablet (640px–1023px)

### Product Detail Page
- [ ] Product name, tag, price, description render correctly
- [ ] Currency toggle updates price display
- [ ] In Stock badge shows correctly (green, with text)
- [ ] Quantity stepper increments/decrements between 1 and 99
- [ ] "Buy Now" navigates to `/checkout/:id`
- [ ] "Add to Cart" adds selected quantity, shows "Added!" feedback for 2s
- [ ] Wishlist heart toggles correctly
- [ ] Related products section renders (max 4 same-tag products)
- [ ] Related product wishlist buttons work (after Phase 1 fix)
- [ ] "Back to Collection" link navigates correctly

### Cart Drawer
- [ ] Cart drawer opens on cart icon click
- [ ] All cart items display (not just first item)
- [ ] Item quantity can be increased/decreased
- [ ] Item can be removed
- [ ] Total price shown correctly (sum of all items × quantities)
- [ ] "Proceed to Checkout" navigates to `/checkout` (multi-item route)
- [ ] OOS items show a warning; "Remove & Proceed" option available
- [ ] Empty cart state shows with a link to continue shopping

### Checkout Page
- [ ] All cart items appear in Order Summary (not just first)
- [ ] Subtotal = sum of all items
- [ ] Shipping row is descriptive (not just "Calculated")
- [ ] Tax row shows "Included"
- [ ] Total matches Subtotal (no additional fees)
- [ ] Payment method selection — all 3 options selectable
- [ ] Credit/Debit Card fields appear when "Cards" selected
- [ ] UPI ID field appears when "UPI" selected
- [ ] COD terms appear when "Cash on Delivery" selected
- [ ] Form validation runs on submit — required fields highlighted on error
- [ ] "Place Order" button shows loading spinner during submission
- [ ] Successful submission navigates to `/order-success`

### Order Success Page
- [ ] Order reference number displayed
- [ ] "We'll contact you within 24 hours" message shown
- [ ] "Continue Shopping" link returns to homepage

### Wishlist Page
- [ ] All wishlisted items display
- [ ] Remove from wishlist works per item
- [ ] Empty state shows with call to action
- [ ] "Add to Cart" from wishlist works

---

## Accessibility QA Checklist

- [ ] All form inputs have associated `<label>` elements
- [ ] Required fields marked with `aria-required="true"` and visual asterisk
- [ ] Payment options use `<fieldset>` + `<legend>` + `<input type="radio">` (not `div`)
- [ ] Search results container has `aria-live="polite"`
- [ ] Cart drawer has `role="dialog"` and `aria-label="Shopping cart"`
- [ ] Mobile menu has `aria-expanded` on hamburger button
- [ ] All icon-only buttons have descriptive `aria-label` (not just "social", "wishlist")
- [ ] Product card wishlist button: `aria-label="Add Black Female Trio to wishlist"` (product-specific)
- [ ] Footer social icons: individual `aria-label` per platform
- [ ] In-stock badge: text "In Stock" visible (not just colour dot)
- [ ] Out-of-stock badge: text "Currently Unavailable" visible
- [ ] Image alt text is descriptive (not generic "Showroom" or "Torso")
- [ ] Gold text on light background passes WCAG AA contrast (4.5:1 for normal text)
- [ ] Focus ring visible on all interactive elements (inputs, buttons, links)
- [ ] Tab order is logical on all pages (left-to-right, top-to-bottom)
- [ ] No keyboard trap in cart drawer or mobile menu (Escape closes both)

---

## Mobile Testing Checklist

### Breakpoints to Test
| Breakpoint | Width | Device Reference |
|---|---|---|
| xs | 320px | Older Android, iPhone SE (1st gen) |
| sm | 375px | iPhone 14, Galaxy S22 |
| md | 390px | iPhone 14 Pro |
| lg | 430px | iPhone 14 Pro Max |
| tablet | 768px | iPad Mini |
| tablet-lg | 1024px | iPad Pro |

### Mobile Checks
- [ ] Header: Logo + Search + Cart + Hamburger visible on 320px without overflow
- [ ] Cart badge number visible on mobile header
- [ ] Mobile menu drawer: opens from right, full height, scrollable nav
- [ ] Mobile menu: "Get a Quote" CTA visible inside drawer
- [ ] Hero headline readable at `text-3xl` on 320px
- [ ] Hero stats strip visible on mobile (below CTAs)
- [ ] Product grid: 1 column on mobile, 2 columns at 640px, 3 columns at 768px
- [ ] Product card names use 2-line clamp (not single-line truncate) on mobile
- [ ] Filter pills: horizontal scroll on 320px screens
- [ ] Product detail: image fills width, buttons are full-width stacked
- [ ] Quantity stepper buttons: minimum 44×44px touch targets
- [ ] Checkout form: single column on 320px
- [ ] Payment options: stacked 1-column on mobile
- [ ] Cart drawer: full-width on mobile
- [ ] Footer: single column on mobile, no horizontal overflow

---

## User Testing Checklist

### Scenario 1 — Boutique Owner (B2C — Mannequins)
- [ ] Can the user identify that this site sells mannequins within 5 seconds?
- [ ] Can the user filter to only see "Full Body" mannequins?
- [ ] Can the user understand the price per unit (vs. per set)?
- [ ] Can the user add 2 different mannequins to cart and checkout both?
- [ ] Does the user trust the site enough to complete an order?

### Scenario 2 — Event Planner (B2B — Mandaps)
- [ ] Can the user identify that mandaps are sold here?
- [ ] Can the user filter to only Mandap products?
- [ ] Can the user request a quote for a ₹30,00,000 mandap?
- [ ] Does the site's luxury aesthetic match the user's expectations for a high-value purchase?

### Scenario 3 — Mobile-First User
- [ ] Can the user search for "gold mannequin" on mobile?
- [ ] Can the user add a product to cart on mobile?
- [ ] Can the user access and review their cart on mobile?
- [ ] Can the user complete checkout on a 375px screen?

### Scenario 4 — Return Visitor
- [ ] Does the cart persist between sessions?
- [ ] Does the wishlist persist between sessions?
- [ ] Is the currency preference remembered?

---

## Release Readiness Checklist

### Functional Readiness
- [ ] Multi-item checkout works (CartDrawer routes to `/checkout`, not `/checkout/:id`)
- [ ] Cart `localStorage` persistence verified
- [ ] Wishlist `localStorage` persistence verified
- [ ] "Kids Range" filter removed (no products in this category)
- [ ] Fabricated discount percentages removed from ProductDetails
- [ ] Related products wishlist button works
- [ ] Category cards apply filters correctly
- [ ] Real social media links added (or icons removed)

### Legal & Trust Readiness
- [ ] Privacy Policy page is accurate and complete
- [ ] Terms & Conditions page is accurate and complete
- [ ] Cancellation & Refund policy is accurate and complete
- [ ] Shipping Policy reflects actual delivery timelines
- [ ] Copyright year in footer is current (2026)
- [ ] "Designed with intention · Owner: Vadivel S" watermark reviewed — keep or replace with clean brand line
- [ ] "6+ Years" (hero) vs "over a decade" (about) contradiction resolved

### Payment & Order Readiness
- [ ] Real payment gateway integrated (Razorpay / Cashfree / PhonePe) **OR** checkout replaced with "Send Enquiry" flow
- [ ] Order confirmation number generated and displayed on success page
- [ ] Order details emailed to business (via EmailJS, Formspree, or backend endpoint)
- [ ] COD availability documented correctly (₹1,00,000 limit)

### SEO & Performance
- [ ] `<title>` tag is descriptive on every page
- [ ] `<meta name="description">` exists on homepage and product pages
- [ ] Hero image (`/hero.jpg`) is compressed to WebP, below 300KB
- [ ] All product images compressed to WebP
- [ ] Lenis only applied on homepage (not inner pages)
- [ ] No console errors in production build
- [ ] `npm run build` completes without TypeScript errors

### Accessibility Readiness
- [ ] Payment options use semantic radio inputs
- [ ] All ARIA labels are unique and descriptive
- [ ] Gold text contrast passes WCAG AA where applicable
- [ ] Keyboard-only navigation tested end-to-end on all major flows

---

## Final Recommendations

### Must-Do Before Any Public Launch

1. **Resolve payment:** Integrate a real gateway or convert checkout to an enquiry flow. This is non-negotiable.
2. **Fix multi-item checkout:** The `CartDrawer → /checkout/${items[0].id}` bug silently drops all but the first cart item.
3. **Show cart/search/wishlist on mobile:** Half of all Indian e-commerce traffic is mobile. These three features being hidden is a complete conversion block.

### Should-Do in Release 1.0

4. Remove "Kids Range" from filters — it shows a broken empty state.
5. Remove fabricated discounts — they are the highest trust-risk element in the codebase.
6. Add real social media links or remove the footer icons entirely.
7. Show hero statistics on mobile (6+ Years, 100+ Boutiques, 40+ Cities) — critical social proof.
8. Fix the "6+ Years" vs "over a decade" contradiction.

### Recommended for 1.1

9. Consolidate Enquiry form and Quote Request page into a single `/contact` flow.
10. Add a persistent global currency selector in the header (remove per-section instances).
11. Add breadcrumbs to ProductDetails, Checkout, and Wishlist pages.
12. Add quantity field to the Enquiry and Quote Request forms.
13. Standardise button classes using the 4 shared CSS classes defined in `index.css`.
