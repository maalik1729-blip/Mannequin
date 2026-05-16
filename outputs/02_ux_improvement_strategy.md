# UX Improvement Strategy — A K Enterprises Mannequin Store

**Source:** outputs/01_ui_audit.md
**Role:** Senior Product Designer
**Focus:** Experience logic, flow improvements, reduced friction — no visual redesign yet

---

## UX Strategy Overview

A K Enterprises serves two fundamentally different buyer types on the same platform:

- **B2C buyers** — boutique owners, photographers, small retailers purchasing 1–10 mannequins at ₹9,500–₹45,000 per piece
- **B2B buyers** — wedding event companies, hotel chains, hospitality groups purchasing mandaps at ₹1,25,000–₹30,00,000 per unit

The current UX treats both identically. Every friction point in this store stems from that single root problem: **one undifferentiated experience for two completely different decision journeys.** A boutique owner comparing torso busts needs immediate pricing, quick checkout, and product variety. A wedding planner evaluating a ₹30,00,000 mandab needs custom consultation, lead time discussion, site visits, and a quote — not an "Add to Cart" button.

The strategy below converts this from a confused single-lane road into a bifurcated user journey that serves both audiences without rebuilding the entire product.

---

## Workflow Simplifications

### 1. Fix the Multi-Item Checkout Flow
**Current state:** Cart accepts multiple items but checkout processes only `items[0]`. All other items are silently discarded.
**Improvement:** Checkout must render and bill all cart items. The order summary should list every item with quantity and line-item subtotal.
**Why it matters:**
- User impact: Anyone who adds 2+ products loses items without knowing. Every multi-item buyer currently has a broken experience.
- Business impact: Average order value is directly suppressed. A boutique ordering 5 mannequins loses 4 from every transaction.

### 2. Decouple "Buy Now" from "Add to Cart" Flows
**Current state:** Product detail page has both "Buy Now" (direct to checkout) and "Add to Cart" (to drawer). The flows make sense, but there is no quantity input before either action.
**Improvement:** Add a quantity stepper (min: 1) on the product detail page before the action buttons. "Buy Now" with qty=3 should route to checkout with quantity 3 of that product.
**Why it matters:**
- User impact: B2C boutiques ordering in multiples need to set quantity at the product level, not in the cart drawer.
- Business impact: Higher average units per order.

### 3. Consolidate Enquiry Form + Quote Request Page
**Current state:** A homepage Enquiry section (`#enquiry`) and a standalone `/request-quote` page exist. Both accept name, phone, email, interest, and message. Users don't know which to use.
**Improvement:** Keep one unified contact/quote form. The `/request-quote` page should be the canonical location. The homepage Enquiry section should show a brief pitch + a "Request a Quote" button that navigates to the page — not duplicate the form inline.
**Why it matters:**
- User impact: Removes confusion about which form submission goes where and whether both are monitored.
- Business impact: All leads centralized. Easier to track and respond.

### 4. Unblock Checkout When Partial Out-of-Stock
**Current state:** If any cart item is out-of-stock, the entire checkout button is locked. Users must manually find and remove the item before proceeding.
**Improvement:** When OOS items exist, show a "Remove out-of-stock items & proceed" CTA that auto-removes them and continues to checkout.
**Why it matters:**
- User impact: Eliminates a dead end that forces manual remediation.
- Business impact: Recovers orders that are currently abandoned.

---

## Navigation Improvements

### 1. Restore Mobile Utility Actions
**Current state:** Cart, Wishlist, and Search are hidden below 640px. The mobile hamburger menu only shows text nav links.
**Improvement:** Add Cart icon (with badge), Wishlist icon (with badge), and Search icon to the mobile hamburger drawer. Alternatively, place all three icons in the mobile header bar alongside the hamburger — at `sm:` and below, the header should show: Logo | [Search] [Cart] [Hamburger].
**Why it matters:**
- User impact: Mobile users — likely 60–70% of traffic in India — cannot shop at all without cart access.
- Business impact: Directly restores mobile conversion.

### 2. Make "Get a Quote" Visible at All Breakpoints
**Current state:** The header's "Get a Quote" CTA is `hidden lg:inline-flex` — invisible on mobile and tablet.
**Improvement:** The mobile menu (hamburger drawer) should include "Get a Quote" as a styled CTA button at the bottom of the nav list.
**Why it matters:**
- User impact: The primary business CTA must always be reachable.
- Business impact: B2B enquiry is the highest-value conversion action. Making it invisible on most devices costs real revenue.

### 3. Connect Category Cards to Filtered Product View
**Current state:** All four category cards link to `/#products` without applying any filter. Clicking "Mandap" takes users to the top of the product grid showing all 28 items.
**Improvement:** Each category card should navigate to `/#products?category=Mandap` (or use URL hash params) and auto-apply the corresponding filter on mount.
**Why it matters:**
- User impact: Users who identify their need from the categories section immediately hit a wall of irrelevant products.
- Business impact: Segment discovery drives higher intent. A wedding planner clicking "Mandap" is high-intent; showing them mannequins immediately reduces conversion.

### 4. Add Breadcrumb Navigation to Inner Pages
**Current state:** ProductDetails, Checkout, Wishlist, and policy pages have no breadcrumb. The "Back" link on ProductDetails navigates to `/#products`, which causes a full page load.
**Improvement:** Add a simple breadcrumb trail: `Home > Products > [Product Name]` on ProductDetails. Use React Router's `navigate(-1)` on the back button, not a hard link to the home page anchor.
**Why it matters:**
- User impact: Users who arrive on a product page via external link or search have no sense of navigation context. Browser back is the only recovery.
- Business impact: Reduces bounce from inner pages.

---

## Dashboard Improvements

*This project has no admin dashboard. The "dashboard" equivalent is the Homepage — the Index page that contains Hero + Products + Categories + About + Enquiry + Contact in sequence.*

### 1. Segment the Homepage Into Clear User Journeys
**Current state:** The homepage is a linear scroll — Hero → Products → Categories → About → Enquiry → Contact — with no user segmentation.
**Improvement:** After the hero, add a brief audience-selector section:
- "I'm a boutique / retailer → Shop Mannequins & Torsos"
- "I'm planning a wedding / event → Browse Mandaps & Decor"

This creates two separate scroll paths or filter presets, not two different pages.
**Why it matters:**
- User impact: Reduces cognitive load. Users immediately self-identify and see only relevant products.
- Business impact: Higher relevance → higher time on site → higher conversion for both segments.

### 2. Surface Hero Statistics on Mobile
**Current state:** "6+ Years, 100+ Boutiques, 40+ Cities" is hidden on mobile.
**Improvement:** Move the stats block below the CTA buttons on mobile as a horizontal strip of 3 stat pills. These are critical trust signals.
**Why it matters:**
- User impact: First-time mobile visitors see zero social proof.
- Business impact: Social proof (boutiques served, years in business) directly impacts trust and purchase decisions.

---

## Form Improvements

### 1. Checkout Form — Add Field Validation Feedback Inline
**Current state:** Checkout fields use HTML5 `pattern` validation but provide no real-time inline feedback. Errors only appear on submit.
**Improvement:** Show inline error messages (e.g., "Enter a valid 10-digit number") beneath each field on blur, before the user hits submit.
**Why it matters:**
- User impact: Users who fill 8 fields and hit submit only to see one error feel penalized. Inline validation respects their effort.
- Business impact: Reduces form abandonment at the submission stage.

### 2. Checkout Form — Remove Friction Fields or Make Them Optional
**Current state:** Users must fill First Name, Last Name, Email, Phone, Street Address, City, State, Postal Code, Country — 9 fields — plus payment details before placing an order.
**Improvement:** For high-value mandap B2B orders (where physical delivery and customization is required), this is appropriate. For B2C mannequin orders, consider: combine First/Last Name into "Full Name" (1 field instead of 2), and make Country pre-filled to "India" since the business is India-focused.
**Why it matters:**
- User impact: Shorter forms have measurably higher completion rates.
- Business impact: Every removed form field increases checkout conversion.

### 3. Enquiry Form — Add "Quantity Required" Field
**Current state:** The enquiry form asks for name, phone, email, interest category, and message — no quantity field.
**Improvement:** Add a "Quantity / Number of Pieces" numeric input so the business can immediately qualify and price leads.
**Why it matters:**
- User impact: Customers don't need to write quantity in a free-text message.
- Business impact: Pre-qualified leads (with quantity) allow faster response with accurate pricing.

### 4. Payment — Make COD Section Informative
**Current state:** Selecting "Cash on Delivery" renders a blank section. No terms, no advance payment info, no delivery time expectation.
**Improvement:** When COD is selected, show: advance payment percentage (if any), estimated delivery time, confirmation that COD is available at the delivery address.
**Why it matters:**
- User impact: Users selecting COD have the highest uncertainty. Empty UI signals that the option isn't fully supported.
- Business impact: Reduces COD-related order disputes and failed deliveries.

---

## CTA Improvements

### 1. Promote "Get a Quote" to a Global, Always-Visible CTA
**Current state:** "Get a Quote" is a header button visible only on desktop (1024px+).
**Improvement:** The quote CTA should be present at three persistent locations:
  1. Header (desktop, as it currently is)
  2. Mobile menu drawer (as a full-width button)
  3. Bottom of the product grid section (after the product cards, as a section CTA: "Need a bulk quote? Contact us →")
**Why it matters:**
- User impact: B2B buyers evaluating large purchases need a clear path to contact. The current design makes them hunt for it.
- Business impact: B2B mandap sales are the highest-margin products. Every lost B2B enquiry is ₹5,00,000+ in potential revenue.

### 2. Add a "Add to Cart" Button Visible Without Hover
**Current state:** The product grid shows only the product image, tag, name, and price. A "Buy Now" overlay appears on hover. No "Add to Cart" without entering the product detail page.
**Improvement:** Add a persistent "Add to Cart" icon button at the bottom-right of each product card. The hover overlay "Buy Now" can remain as a quick direct-checkout shortcut.
**Why it matters:**
- User impact: Users scanning the product grid must hover each card to discover purchase options. This is hidden affordance — a UX anti-pattern.
- Business impact: Faster path to cart = higher conversion, especially for B2C repeat buyers who know what they want.

### 3. Replace Hero Secondary CTA with a Higher-Value Action
**Current state:** Hero CTAs are "Explore Collection" (scrolls to products) + "Custom Enquiry" (scrolls to enquiry form).
**Improvement:** Replace "Custom Enquiry" with "Request a Quote" that links to `/request-quote`. The word "enquiry" is passive; "Request a Quote" creates a clearer expectation of a business transaction.
**Why it matters:**
- User impact: "Custom Enquiry" doesn't tell B2B buyers what they'll get. "Request a Quote" tells them they'll receive a price.
- Business impact: Higher-intent language converts better with B2B buyers.

---

## User Psychology Improvements

### 1. Remove Fabricated Discounts Immediately
**Current state:** Every product shows a crossed-out "original price" and a % OFF badge calculated from the product ID's string length.
**Improvement:** Remove entirely, or implement real promotional pricing in the product data schema. If no discount exists, show only the current price — no fake baseline.
**Why it matters:**
- User impact: Price-savvy buyers (boutique owners who regularly negotiate) will detect that "15% OFF" on a ₹45,000 adjustable dummy doesn't match any known market price. Trust is permanently damaged once detected.
- Business impact: False discounting is a legal risk in India (Consumer Protection Act). Removing it eliminates both a trust and a compliance issue.

### 2. Distinguish Product Tiers Visually and Contextually
**Current state:** ₹9,500 and ₹30,00,000 products coexist in the same grid with no tier signal.
**Improvement:** Apply product tier labels: "Standard", "Premium", "Signature / Custom" — or organize the product grid by segment tabs: "Mannequins & Torsos | Decor Statues | Wedding Mandaps."
**Why it matters:**
- User impact: Price anchoring is broken when extremes coexist without segmentation. Users can't form a mental model of the catalog.
- Business impact: Premium products (mandaps) benefit from being isolated in their own section where they command attention rather than being sandwiched between ₹12,500 vases.

### 3. Resolve the "Over a Decade" vs "6+ Years" Contradiction
**Current state:** About section: "For over a decade..." | Hero stats: "6+ Years."
**Improvement:** Pick one number and use it consistently. If the business was established 6 years ago, use 6+. If over 10, update the hero stat.
**Why it matters:**
- User impact: Contradictory claims on the same page immediately trigger doubt. If they can't be consistent about their history, can they be trusted with a ₹10,00,000 order?
- Business impact: Trust is the primary decision factor for large B2B purchases.

---

## Information Hierarchy Improvements

### 1. Separate the Catalog Into Audience-Specific Sections
The product catalog should be organized as:
  - **Section A: Mannequins & Display Forms** (Torso Busts, Full Body Male, Full Body Female, Adjustable Forms, Kids Range) — B2C-oriented
  - **Section B: Decor & Accent Pieces** (Decor Statues, Accent Decor, Statement Pieces) — B2C/B2B
  - **Section C: Wedding & Event** (Mandap, Wedding Arches, VIP Furniture) — B2B-oriented, with "Request Quote" as primary CTA instead of "Buy Now"

**Why it matters:** The product information hierarchy must match the buyer's decision hierarchy, not the product database order.

### 2. Move Key Trust Signals Up the Page
Current order: Hero → Products → Categories → About → Enquiry → Contact
**Improvement:** Move trust signals (years in business, cities served, boutiques supplied) directly under the hero — before users see products. Trust must be established before purchase intent is requested.

### 3. Product Detail Page — Add Specifications Section
**Current state:** ProductDetail shows tag, name, price, in-stock status, description, and SKU. No dimensions, materials, weight, or shipping information.
**Improvement:** Add a collapsible "Specifications" section with fields: dimensions (HxWxD), material (fiber/wood/fabric), weight, finish options available, and lead time.
**Why it matters:**
- User impact: Boutique owners must know if a mannequin fits their display space. Without dimensions, they cannot place orders confidently.
- Business impact: Missing specs = more pre-sale support calls + returns.

---

## Mobile UX Improvements

### 1. Mobile Header: Compact Utility Row
On screens below 640px, the header should show: `[Logo] ... [Search icon] [Cart icon with badge] [Menu]`
All four must be visible without opening any menu.

### 2. Mobile Menu: Full Utility Drawer
The mobile menu should include:
  - Navigation links (as currently)
  - Separator
  - Search bar (inline)
  - Wishlist link with count
  - "Get a Quote" full-width button
  - Phone number and email (from announcement bar)

### 3. Mobile Product Grid: Show "Add to Cart" on Tap
Replace the hover-only "Buy Now" overlay with a tap-persistent "Add to Cart" button that appears below the product image on mobile product cards.

### 4. Mobile Checkout: Stack Payment Options Vertically
On mobile, the three payment option cards (`grid-cols-1 md:grid-cols-3`) already stack to 1 column. Verify the `grid-cols-1` applies correctly at 375px.

### 5. Announcement Bar: Show on Mobile as a Compact Pill
Rather than hiding the phone number/email entirely on mobile, render them as a fixed tap-to-call button at the bottom of the screen (fixed bottom bar) on mobile.

---

## Accessibility Enhancements

### 1. Replace PaymentOption `div` with `fieldset` + `input[type=radio]`
The payment selector must be a proper radio group for keyboard and screen reader accessibility.

### 2. Add `aria-live="polite"` to Search Results Dropdown
When results appear, screen readers must be notified.

### 3. Fix Social Icon ARIA Labels
Each social icon must have a unique, descriptive label: `aria-label="A K Enterprises on Instagram"`, `aria-label="A K Enterprises on Facebook"`, etc.

### 4. Add `aria-label` to Wishlist Product Card Buttons
`aria-label="wishlist"` should read `aria-label="Add [product name] to wishlist"`.

### 5. Make Product Card "Buy Now" Keyboard Accessible
The hover overlay must also be focusable via Tab. Add `tabIndex={0}` and `onKeyDown` (Enter/Space to navigate) to the overlay button.

### 6. In-Stock Status Must Use Icon + Color + Text
Replace color-only dots with `✓ In Stock` / `✗ Out of Stock` icon+text pairs so color-blind users can read status.

---

## Recommended UX Priorities

### Priority 1 — Fix Broken Flows (Week 1)
1. Multi-item checkout — fix `items[0]` bug
2. Mobile cart + wishlist + search — restore in header/menu
3. Product filter — activate the existing `FILTERS` array
4. Remove fabricated discounts

### Priority 2 — Recover Lost Conversions (Week 2)
5. "Get a Quote" visible on all breakpoints
6. Category cards apply filters
7. Unblock checkout for partial OOS carts
8. Add quantity selector to product detail page

### Priority 3 — Build Trust (Week 3)
9. Fix social media links
10. Resolve "decade" vs "6+ years" contradiction
11. Add real product specifications (dimensions, material)
12. Fix order success page (add reference number, next-steps messaging)

### Priority 4 — Polish & Accessibility (Week 4)
13. Consolidate enquiry and quote forms
14. Fix related products wishlist button
15. Add ARIA improvements (search, payment, social icons)
16. Mobile menu utility actions
17. Breadcrumb navigation on inner pages
