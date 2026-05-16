# UI/UX Audit — A K Enterprises Mannequin Store

**Project:** A K Enterprises — Mannequin & Display Solutions E-commerce
**Stack:** React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui + React Router v6
**Design System:** Obsidian (dark plum) + Gold + Ivory/Pearl | Cormorant Garamond (display) + Inter (body)
**Audit Date:** 2026-05-16

---

## Executive Summary

A K Enterprises presents a visually premium e-commerce storefront for mannequins, decor statues, and wedding mandaps. The design language is intentional — dark luxury with gold accents — and the hero section communicates brand authority well. However, beneath this polished surface lie critical functional failures that directly damage conversion. A cart that cannot check out multiple products, algorithmically fabricated discounts, dead social links, and a product grid that mixes ₹9,500 torso busts with ₹30,00,000 wedding mandaps without any filtering — these are not cosmetic issues. They are trust-breaking, conversion-killing problems. Mobile users experience a stripped navigation with no access to cart or search. The checkout flow processes only one product at a time regardless of cart contents. First-time B2B buyers (boutiques, event houses) encounter no segment-specific messaging. The audit below documents 40+ specific issues organized by severity and category.

---

## Major UX Problems

### P1 — Critical (Conversion-Blocking)

**1. Multi-item cart routes to checkout for `items[0]` only**
- **File:** `src/components/site/CartDrawer.tsx:19` — `navigate('/checkout/${items[0].id}')`
- **Impact:** If a user adds 3 products to cart and proceeds to checkout, only the first item appears in the order summary. The remaining items are silently ignored. This is a fundamental e-commerce breakage.
- **User pain:** Business owners placing bulk orders lose items without warning.
- **Severity:** CRITICAL

**2. No product category filtering despite FILTERS array existing**
- **File:** `src/data/products.ts:82-93` defines 9 filter tags; `src/components/site/Products.tsx` applies no filter UI.
- **Impact:** All 28 products are shown in reverse order with no way to browse by type. A boutique owner looking only for mannequins must scroll past ₹6,50,000 mandaps. A wedding planner cannot isolate mandap products.
- **User pain:** Cognitive overload, abandonment.
- **Severity:** CRITICAL

**3. Price range mixes ₹9,500 retail items with ₹30,00,000 mandaps in the same grid**
- The product grid contains items spanning 3 orders of magnitude in price — from a ₹9,500 dress form to a ₹30,00,000 wooden mandab with elephant walkway — displayed in the same 4-column grid with identical card templates.
- **User pain:** First-time visitors cannot understand what the business sells. B2C and B2B buyers are shown the same undifferentiated catalog.
- **Severity:** CRITICAL

**4. Mobile users cannot access Cart, Wishlist, or Search**
- **File:** `src/components/site/Header.tsx:151,158,170` — `hidden sm:block` on all three utility icons.
- Mobile menu (`lg:hidden`) only renders NAV links. No cart icon, no wishlist icon, no search on phones.
- **User pain:** Mobile shoppers cannot add or review items. On a mobile-first market like India, this eliminates the primary user segment.
- **Severity:** CRITICAL

### P2 — High (Trust-Breaking)

**5. Discount percentages are algorithmically fabricated**
- **File:** `src/pages/ProductDetails.tsx:30` — `percentOff = 15 + (product.id.length % 15)`
- The "original price" and % OFF badge on every product detail page are computed from the string length of the product ID. No real original prices exist.
- **User pain:** Users who notice different products showing the same discount pattern will lose trust entirely. A product named "black-female-trio" (16 chars) shows 16% OFF; "dress-form" (9 chars) shows 24% OFF.
- **Severity:** HIGH

**6. SKU is fabricated from product ID**
- **File:** `src/pages/ProductDetails.tsx:158` — `MNQ-${product.id.substring(0, 6).toUpperCase()}`
- Displayed as a trust signal under product details, but meaningless (e.g., "MNQ-BLACK-" for "black-female-trio").
- **Severity:** HIGH

**7. Social media links are dead placeholders**
- **File:** `src/components/site/Footer.tsx:27` — all three icons link to `href="#"`.
- Instagram, Facebook, YouTube icons appear but open nothing. A luxury brand without real social presence signals inauthenticity.
- **Severity:** HIGH

**8. Payment processing is simulated with `setTimeout`**
- **File:** `src/pages/Checkout.tsx:43-47` — payment submits after 1.5s setTimeout with no real gateway.
- This is expected in development but must be flagged: any real user will place a "successful" order with no actual payment.
- **Severity:** HIGH (deployment risk)

### P3 — Medium

**9. Related products wishlist button is non-functional**
- **File:** `src/pages/ProductDetails.tsx:185` — `onClick={(e) => e.preventDefault()}` — wishlist button in related products section does nothing.

**10. Categories section links all point to `/#products`**
- **File:** `src/components/site/Categories.tsx:64` — clicking any category card just scrolls to the full product section without applying a filter.

**11. Duplicate product names with different prices and IDs**
- Products: "Stage Mandabam" appears 3 times (₹6,50,000 / ₹6,80,000 / ₹7,25,000), "Entrance arch" appears twice (₹1,50,000 each). Users cannot distinguish them.

**12. COD payment method shows no additional information**
- **File:** `src/pages/Checkout.tsx:97-103` — selecting "Cash on Delivery" renders nothing below the selector. Users don't know the terms.

**13. Enquiry form (homepage) and Quote Request page (`/request-quote`) are two separate forms doing nearly identical work**
- Creates confusion: which form to use, where the submission goes.

---

## Major UI Problems

**1. Hero statistics (6+ Years, 100+ Boutiques, 40+ Cities) are hidden on mobile**
- **File:** `src/components/site/Hero.tsx:43` — `hidden lg:flex` on the stats block. Mobile users see only the headline and CTAs, no social proof.

**2. CurrencyToggle placement is inconsistent**
- Appears in: product grid header, product detail page (near price + separate), checkout order summary. Each instance has different sizing and context. Users don't know it's a global preference.

**3. Product cards show no "Add to Cart" CTA by default**
- The "Buy Now" CTA on product cards only appears on hover (`opacity-0 group-hover:opacity-100`). First-time users never discover it.

**4. Wishlist icon uses `aria-label="wishlist"` (lowercase, vague)**
- **File:** `src/components/site/Products.tsx:50` — no clear ARIA description.

**5. Announcement bar hidden on mobile**
- **File:** `src/components/site/Header.tsx:83` — `hidden md:block`. Mobile users don't see phone number or email contact.

**6. Product card image aspect is `aspect-square` for rectangular mannequin photos**
- Products like standing full-body mannequins are portrait-oriented but are squeezed into square cards with `object-contain`, leaving large white padding areas.

**7. Footer social links have generic `aria-label="social"` for all three icons**
- Screen readers cannot distinguish Instagram from Facebook from YouTube.

---

## User Friction Points

**1. No quantity selector on product detail or listing pages**
- Users must add to cart then go to cart drawer to adjust quantity. Boutiques ordering 10 mannequins have no direct quantity input.

**2. Back navigation from ProductDetails goes to `/#products` (full page reload)**
- `Link to="/#products"` causes a full navigation from inner page back to home, scrolling to the products section — not a back action.

**3. Search is desktop-only and requires 2+ character minimum, with no loading state**
- Mobile users have no search. Desktop users typing a single character see no results and no feedback.

**4. Cart drawer checkout disables entirely if ANY item is out-of-stock**
- **File:** `src/components/site/CartDrawer.tsx:17` — `if (items.length === 0 || hasOutOfStockItems) return;`
- If one item is OOS, the entire cart is blocked. Users cannot checkout the remaining valid items.

**5. "Get a Quote" CTA in header is `hidden` on non-lg screens**
- **File:** `src/components/site/Header.tsx:181` — `hidden lg:inline-flex`. The primary business conversion action is invisible on mobile and tablet.

**6. Order success page has no order number, no email confirmation message**
- **File:** `src/pages/OrderSuccess.tsx` — simply shows a success state with no reference number.

**7. No breadcrumb navigation on ProductDetails or Checkout pages**
- Users cannot orient themselves within the site hierarchy.

---

## Visual Hierarchy Problems

**1. Section headlines compete — all headings use the same 4xl–6xl display size**
- Hero h1: `text-4xl sm:text-5xl md:text-7xl lg:text-8xl`
- Products h2: `text-4xl md:text-6xl`
- Categories h2: `text-4xl md:text-6xl`
- About h2: `text-4xl md:text-6xl`
- All sections fight for visual dominance equally. There is no hierarchy between primary and secondary sections.

**2. Gold accent is overused — used on tag labels, prices, icons, CTAs, nav hover, borders, section labels simultaneously**
- Gold was meant to signal premium. When everything is gold, nothing is premium.

**3. Product grid lacks visual weight differentiation for price tiers**
- A ₹9,500 dress form and a ₹30,00,000 wooden mandab with elephant walkway share identical card templates. No visual signal communicates price tier or exclusivity.

**4. The "Get a Quote" button in the header competes with the "Explore Collection" CTA in the hero**
- Both use similar color/style with no clear primary/secondary hierarchy.

**5. Product category label (`text-[10px]`) is too small to be a meaningful navigation signal**
- The tag label above product names is 10px uppercase — nearly unreadable and visually insignificant.

---

## Typography Problems

**1. Extreme tracking values create tension between elegance and readability**
- `tracking-[0.4em]` on section labels, `tracking-[0.3em]` on product tags, `tracking-[0.25em]` on CTAs — heavy letter-spacing works at large sizes but becomes illegible at `text-[10px]`.

**2. No defined type scale — font sizes are per-component, not systematic**
- Hero uses `text-4xl sm:text-5xl md:text-7xl lg:text-8xl`, section heads use `text-4xl md:text-6xl`, with no intermediate rhythm. On tablet the jump from 4xl to 6xl with no 5xl step creates uneven reading.

**3. `font-display` (Cormorant Garamond) applied to product card names creates readability issues at small sizes**
- Cormorant Garamond is a high-contrast serif optimized for large display use. Used at `text-xl` in product cards, the thin strokes of the serif typeface reduce readability significantly on non-retina screens.

**4. Body copy uses `text-foreground/90` and `text-foreground/80` inconsistently**
- About section: `text-foreground/90`, Enquiry body: `text-white/90`, Product description: `text-foreground/80`. No consistent body text opacity.

**5. Price display (`font-price`, Outfit) is inconsistently applied**
- ProductDetails applies `font-price` to prices; product cards apply it; but checkout order summary applies it only to some price fields.

---

## Accessibility Problems

**1. All social media footer icons share the same `aria-label="social"`**
- Screen readers announce "social link, social link, social link" with no distinction.

**2. Product card "Buy Now" button is hover-only and keyboard-inaccessible**
- `opacity-0 group-hover:opacity-100` on the hover overlay means keyboard users and screen readers cannot access the Buy Now shortcut on product cards.

**3. Very small text throughout — 10px and 9px labels used across multiple components**
- WCAG 2.1 AA requires minimum 4.5:1 contrast ratio. Gold (`hsl(16 65% 58%)`) on white background at 10px may fail small text contrast requirements.

**4. Search input has no ARIA live region for results**
- When search results appear in the dropdown, there is no `aria-live` announcement for screen readers.

**5. Payment option selector uses `div` with `onClick` instead of `button` or `input[type=radio]`**
- **File:** `src/pages/Checkout.tsx:196-206` — `PaymentOption` is a `div` with click handler. Not keyboard navigable, not announced as a radio group.

**6. Form inputs in checkout use only bottom-border without visible focus indicators beyond `focus:border-gold`**
- Low-vision users and keyboard users may not see the focus state clearly.

**7. `<img>` in About section has no meaningful alt text**
- **File:** `src/components/site/About.tsx:16` — `alt="Showroom"` and `alt="Torso"` are generic descriptions, not descriptive.

**8. Color alone distinguishes in-stock vs out-of-stock (green/red dot)**
- **File:** `src/pages/ProductDetails.tsx:112` — Users with color blindness cannot rely on red/green dots.

---

## Mobile Responsiveness Problems

**1. Cart, Wishlist, Search completely hidden on mobile**
- The three most important utility actions are `hidden sm:block` — invisible below 640px.

**2. Mobile hamburger menu shows only navigation links, no utility actions**
- Cart count, wishlist count, search — none appear in the mobile slide-down menu.

**3. "Get a Quote" primary CTA is hidden on mobile and tablet**
- `hidden lg:inline-flex` — the business's primary conversion CTA doesn't exist below 1024px.

**4. Hero statistics block is hidden on mobile**
- `hidden lg:flex` — social proof (6+ years, 100+ boutiques) invisible on mobile.

**5. Announcement bar (phone number + email) is hidden on mobile**
- `hidden md:block` — contact info disappears on the devices most likely to want quick access.

**6. Product card grid jumps from 1-col (mobile) to 2-col (sm) to 4-col (xl)**
- No 3-col intermediate on medium tablets. At 768px, 2 columns means very large cards; at 1280px, 4 columns appear. The gap is jarring.

**7. Checkout form grid is `grid-cols-2` without mobile fallback for some fields**
- **File:** `src/pages/Checkout.tsx:67` — First Name/Last Name sit in 2-col grid, which may be too narrow on small phones.

**8. Footer is 4-column on desktop, 2-column on tablet, but no explicit 1-column on mobile**
- `md:grid-cols-2 lg:grid-cols-4` — on phones (below md) the footer goes to 1-column but items like the address block may overflow.

---

## Cognitive Load Analysis

**1. Product catalog presents 28 items spanning 5 completely different product categories without segmentation**
- Mannequins (B2C boutiques), Mandaps (B2B event companies), Decor statues (retail/gift), Accent decor (event styling), Statement pieces (hospitality) — all presented identically. First-time visitors cannot determine the business's primary offering.

**2. Price range creates confusion about target audience**
- ₹9,500 dress form vs ₹30,00,000 mandab in the same row. Users question: "Is this affordable or premium? Am I the right customer?"

**3. Two inquiry channels with no differentiation**
- Homepage Enquiry form and `/request-quote` page accept similar inputs. Users don't know which to use.

**4. CurrencyToggle appears in 4 different locations (product section, product detail twice, checkout)**
- Users expect a single persistent preference. Finding it in multiple places creates uncertainty about whether their selection persisted.

**5. Cart drawer checkout blocks entire order for one out-of-stock item**
- Instead of removing the barrier (let users checkout available items), the UI presents an error and a locked button — forcing users to manually remove items.

**6. The hero headline ("Sculpting silent storytellers for elevated spaces") is evocative but non-functional for first-time B2B buyers**
- A boutique owner googling "mannequin supplier India" needs immediate confirmation they've found the right business. The headline prioritizes poetics over clarity.

---

## Trust & Clarity Issues

**1. Discount percentages are algorithmically generated from product ID string length**
- This is the most critical trust issue in the codebase. Products with longer ID strings show lower discounts. Any price-aware shopper who compares products will notice inconsistency.

**2. No real payment gateway — orders complete with a setTimeout**
- Every form submission succeeds after 1.5 seconds with no real transaction. In a live environment, this would take money or promise fulfillment that cannot be tracked.

**3. Social media links are dead (href="#")**
- Instagram, Facebook, YouTube icons that lead nowhere signal an abandoned or fake account. On a premium luxury brand, this is immediately noticed.

**4. SKU values are meaningless strings derived from product IDs**
- Displayed as "SKU: MNQ-BLACK-" — sophisticated B2B buyers verify SKUs for reordering. Fake SKUs damage credibility with this audience.

**5. Order success page has no order confirmation number, no email promise, no next steps**
- After checkout, users land on a success screen with no reference, no tracking path, no "we'll contact you" message. They have no evidence their order was received.

**6. "Designed with intention · Owner: Vadivel S" in footer copyright**
- Mentions the owner's name in a way that feels like a personal project watermark rather than a professional brand. Reduces perceived business legitimacy.

**7. About section claims "over a decade" of experience but hero tagline says "Est. Premium Display Atelier" and stats show "6+ Years"**
- The About section says "over a decade" (10+ years) while the hero shows "6+ Years." This contradiction undermines credibility.

---

## Recommended Priority Fixes

### Immediate (Conversion-Critical)
1. **Fix multi-item checkout** — Checkout must handle all cart items, not just `items[0]`
2. **Add mobile cart/wishlist/search** — Restore utility icons in mobile nav or mobile menu
3. **Add product category filter** — Implement the existing `FILTERS` array as visible filter tabs/pills
4. **Remove fabricated discounts** — Delete the `percentOff` calculation from `ProductDetails.tsx` or replace with real data
5. **Add "Get a Quote" CTA to mobile** — The primary business CTA must be visible everywhere

### High Priority (Trust & Usability)
6. **Fix social media links** — Add real Instagram/Facebook/YouTube URLs or remove icons entirely
7. **Fix related products wishlist button** — Remove the `e.preventDefault()` no-op
8. **Fix category filter links** — Category cards should filter products, not just scroll to unfiltered grid
9. **Rename duplicate products** — Give unique descriptive names to the 3 Stage Mandabam variants
10. **Add COD payment information** — Show delivery terms, advance payment, etc. when COD is selected

### Medium Priority (UX Quality)
11. Add quantity selector to product detail page
12. Consolidate Enquiry form and Quote Request page
13. Add order confirmation number to OrderSuccess page
14. Make hero stats visible on mobile
15. Fix the "over a decade" vs "6+ Years" contradiction

### Low Priority (Polish)
16. Standardize CurrencyToggle to a single global location (header)
17. Improve ARIA labels on social icons, search results, payment options
18. Replace payment option `div`s with proper `input[type=radio]` elements
19. Add breadcrumbs to ProductDetails and Checkout pages
20. Fix announcement bar visibility on mobile
