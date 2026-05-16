# Visual Redesign Direction — A K Enterprises Mannequin Store

**Source:** outputs/02_ux_improvement_strategy.md
**Role:** Senior Product UI Designer
**Quality Reference:** Stripe (structural clarity), Linear (spacing precision), Notion (information density), Airtable (component consistency)
**Brand Context:** Luxury Indian retail/event supply — Obsidian + Gold + Ivory system already established

---

## Visual Design Philosophy

The existing design has strong bones: a dark luxury palette, serif display headings (Cormorant Garamond), gold accents, and clean card structures. The problem is not the aesthetic — it is the **lack of system discipline**. Gold is used on tags, prices, borders, hover states, CTAs, icons, and dividers simultaneously, destroying the hierarchy it was meant to create. Spacing is inconsistent. Typography does not scale as a system. Components with identical purposes have different visual treatments.

The redesign direction must:
1. **Create visual hierarchy through restraint** — Gold used sparingly becomes precious. Gold used everywhere becomes noise.
2. **Distinguish audience tiers** — B2C product cards vs B2B quote-request cards must look different enough that users immediately understand their path.
3. **Build trust through density control** — Premium brands (Stripe, Linear) use generous white space not for aesthetics but to reduce cognitive load. More breathing room = more perceived quality.
4. **Systematize every component** — Every button, every card, every form field must follow one set of rules. No ad-hoc Tailwind classes scattered per-component.

The redesign preserves the Obsidian/Gold/Ivory identity. It does not introduce new colors. It restructures how and when those colors appear.

---

## Typography Recommendations

### Display Type (Cormorant Garamond — Keep, Constrain Usage)
- **Use only for:** H1 (hero headline), H2 (section headlines), product names at 24px+, cart/wishlist page headings, checkout page heading
- **Remove from:** Product card body text below 20px, small labels, navigation items, form labels, button text
- **Reasoning:** Cormorant Garamond's ultra-thin hairlines are invisible on non-retina screens below 20px. Every use below this threshold reduces readability without adding elegance.

### Body Type (Inter — Standardize)
- **Use for:** All body copy, descriptions, form labels, meta text, navigation, footer content, all text below 16px
- **Scale:**
  - `xs` (12px) — meta labels only (SKU, category tag)
  - `sm` (14px) — secondary body, table rows, form labels
  - `base` (16px) — primary body copy, descriptions
  - `lg` (18px) — sub-headings, card taglines
- **Remove:** All `text-[10px]` and `text-[9px]` instances. Replace with `text-xs` (12px) minimum. WCAG 2.1 AA requires 4.5:1 contrast at small sizes — 10px makes compliance nearly impossible.

### Price Type (Outfit — Keep, Expand)
- Outfit already used for price display — good choice. Extend its use to: quantity badges, cart counts, stat numbers in hero, order totals in checkout.
- Do NOT use Outfit for general body copy. Reserve it for numerical/transactional contexts only.

### Tracking (Letter-Spacing) System
Replace per-component tracking values with a 3-level system:
- **Level 1 — `tracking-widest` (0.1em):** Navigation links, CTA button text, tag labels
- **Level 2 — `tracking-wider` (0.05em):** Section sub-labels ("The Collection", "Browse", "About A K Enterprises")
- **Level 3 — `tracking-normal` (0em):** All body copy, descriptions, form fields
- **Remove:** `tracking-[0.4em]`, `tracking-[0.3em]`, `tracking-[0.25em]`, `tracking-[0.2em]` as one-off values. These create visual inconsistency across sections.

### Headline Scale (Section H2s — Reduce to 2 Consistent Sizes)
- **Desktop:** H2 sections → `text-5xl` (48px). Currently `text-4xl md:text-6xl` makes all sections the same visual weight.
- **Mobile:** H2 sections → `text-3xl` (30px). Currently `text-4xl` on mobile is too large relative to the viewport.
- **Hero H1:** Remains large (`text-6xl md:text-8xl`) — this is the only justified exception.

---

## Layout System

### Container Width
- Current `container` class (Tailwind default, maxing at ~80rem) is appropriate. Keep it.
- Add consistent `px-4 md:px-6 lg:px-8` horizontal padding everywhere (currently inconsistent between sections).

### Section Spacing (Vertical Rhythm)
- Current: `py-16 md:py-24 lg:py-32` applied inconsistently across sections.
- **Standardize to three tiers:**
  - `section-spacing` = `py-20 md:py-28` (all standard sections)
  - `section-spacing-lg` = `py-28 md:py-40` (hero, key landing sections)
  - `section-spacing-sm` = `py-12 md:py-16` (compact utility sections, policy pages)
- Every section uses exactly one of these three values. No exceptions.

### Grid System
- **Product grid:** `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4` — add the missing `md:grid-cols-3` breakpoint
- **Category grid:** `grid-cols-2 lg:grid-cols-4` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **Checkout:** `lg:grid-cols-12` with `lg:col-span-7` / `lg:col-span-5` is good — keep
- **About:** `lg:grid-cols-2` is good — keep

### Card Internal Spacing
- Image area: Fixed aspect ratios — `aspect-[3/4]` for full-body mannequins, `aspect-square` for torsos/busts/decor, `aspect-[4/3]` for mandaps
- Content area: Consistent `p-5` (20px) padding on all product cards
- Gap between image and text: `gap-0` (no gap — border visually separates image from content)

---

## Color Hierarchy

The current design uses gold for everything. Redesign the color usage rules:

### Gold — "Signal Color" (Use for Action + Achievement Only)
**Keep gold on:**
- Primary CTA button fill ("Get a Quote", "Explore Collection", hover state of "Buy Now")
- Price display text
- Active filter tab indicator
- Cart/wishlist badge count background
- "In Stock" positive state accent
- Section sub-labels (the small uppercase intro text before headings)

**Remove gold from:**
- Product tag labels → use `text-foreground/60` instead
- Navigation hover state → use `text-foreground` instead of `text-gold`
- Footer icon hover → keep (gold on dark background works here)
- Border accents on cards → use `border-border` instead
- Hero stat numbers → keep gold here (justified — it's a highlight)

**Reasoning:** When gold marks 3 things simultaneously on a product card (tag label + price + hover border), none of them feel special. When gold appears only on price, the price becomes the focal point — which is the correct hierarchy for a commerce site.

### Obsidian — "Structure Color" (Primary Surfaces + Authority)
- Primary button fill (non-quote CTAs: "Buy Now", "Add to Cart", "Place Order")
- Header background (on scroll)
- Cart drawer background
- Footer background
- Mobile menu background
- Keep as-is in these contexts — it works well

### Ivory/White — "Space Color"
- Background of light sections: keep `bg-background` (current warm pearl `hsl(28 40% 97%)`)
- Body text on dark surfaces: keep as `text-white` or `text-ivory`
- Do not introduce any new background colors — the warm pearl is brand-appropriate

### Red — "Alert Only"
- Out-of-stock badges, error states, and OOS overlays only
- Do not use red for discount badges (current) — it creates false urgency and cheapens the premium aesthetic

---

## Navigation Redesign

### Desktop Header Structure (Keep, Refine)
Current structure: `[Announcement bar] [Logo | Nav | Search + Wishlist + Cart + "Get a Quote"]`
- This structure is sound. Refine with:
  - Increase announcement bar text to `text-sm` from `text-xs` — 12px is the minimum
  - Use `font-normal` instead of `font-medium` for announcement bar body
  - Increase header height from `h-20` to `h-16 md:h-20` — on mobile the height is wasted since utility icons are hidden
  - Nav link font: `text-xs` → `text-sm`. 11px tracking-widest nav links are borderline unreadable.

### Mobile Header Structure (Redesign Required)
New structure: `[Logo | Search | Cart (badge) | Menu]` — all 4 items always visible
- Logo: left-aligned, same as desktop
- Right group: `[Search icon] [Cart icon + badge] [Hamburger]`
- All icons: 44×44px touch targets (Apple HIG minimum)
- Wishlist: moves inside the hamburger drawer (acceptable trade-off to avoid overcrowding header)

### Mobile Menu Drawer
Current: List of 5 text nav links
Redesign:
```
[Nav links: Home / Products / About / Enquiry / Contact]
───────────────────────────────
[Search bar — inline, full width]
[Wishlist → (count badge)]
───────────────────────────────
[Get a Quote — full-width gold button]
───────────────────────────────
[+91 98841 95244  |  akenterprisesbus26@gmail.com]
```
- Add a visible close (×) button at top-right of drawer
- Background: `bg-obsidian` (as currently, keep)
- Drawer should animate from right (slide-in), not drop down from top

### Scroll Behavior
Keep the transparent-to-frosted glass transition on scroll. It works correctly. Keep `backdrop-blur-xl` and `bg-obsidian/95 border-b border-gold/20` on scroll state.

---

## Dashboard Redesign

*The "dashboard" is the homepage scroll experience.*

### Hero Section
- Keep full-viewport hero with overlay gradient — it is effective
- **Add:** Mobile stat strip below the CTA buttons (`6+ Years | 100+ Boutiques | 40+ Cities` as a horizontal flex row of 3 pills)
- **Change:** Secondary CTA label from "Custom Enquiry" → "Request a Quote"
- **Remove:** The current `reveal` animation delay on the hero heading. The hero is above the fold — it should appear instantly, not with a 1-second opacity transition.

### Audience Selector Section (New)
Insert a new section between Hero and Products:
```
[I'm a Retailer / Boutique Owner]   [I'm Planning a Wedding / Event]
     → Shop Mannequins                   → Browse Mandaps & Decor
```
Two large clickable cards, obsidian background, gold icon, brief descriptor. These act as filter-preset CTAs.

### Products Section
- Add filter tabs above the grid: `All | Mannequins & Torsos | Decor Statues | Wedding & Mandap`
- CurrencyToggle: move to right-aligned position beside the filter tabs (not below them)
- Product grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`

---

## Card Component Redesign

### Product Card (B2C — Mannequin/Torso/Decor)
```
[Image area: aspect-[3/4] or aspect-square by category]
  - Wishlist icon: top-right, always visible (not hover-only)
  - "Add to Cart" icon button: bottom-right of image, always visible
  - "Quick View" / "Buy Now" label: hover-only center overlay (keep as-is)
[Content area: p-5]
  - Tag: text-xs tracking-widest text-foreground/50 (NOT gold)
  - Product name: font-display text-xl font-semibold (keep)
  - Price: font-price text-lg font-bold text-foreground (gold ONLY on price)
```
- Border: `border border-border/60` (slightly more visible than current `border-border/40`)
- Border-radius: `rounded-2xl` throughout (consistent top+bottom, not just top)
- Remove: Crossed-out "original price" entirely
- Remove: % OFF badges

### Product Card (B2B — Mandap/Wedding Event)
For products above ₹1,00,000:
```
[Image area: aspect-[4/3] — landscape for mandap stage photos]
  - "Custom" badge: top-left corner if product is bespoke
[Content area: p-5]
  - Tag: "Mandap" / "Wedding & Event" label
  - Product name: font-display text-xl
  - Price: "From ₹X,XX,XXX" (not a hard buy price — it's a quote starting point)
  - CTA: "Request Quote" button (not "Buy Now" / "Add to Cart")
```
- Background: `bg-secondary/60` (slightly warmer surface to differentiate from B2C cards)
- This visual distinction communicates: "These are different — they require a different action."

### Category Card
Current design is strong. Minor refinement:
- Increase gradient overlay opacity from `from-obsidian/90` → `from-obsidian/95` for better text legibility
- Move count label above the title (not below): "4 pieces" → [count above] → [category title below]
- Font: category title `text-2xl` → `text-xl` on mobile to prevent overflow

---

## Table Redesign

*No traditional data tables exist in the current UI. The closest equivalents are:*

### Price Breakdown in Checkout (Order Summary)
Current: `flex justify-between` rows with `text-sm`
Redesign:
- Add consistent `py-3` padding to each row
- Use `font-medium` for label, `font-semibold font-price` for value
- Total row: Use `text-lg font-bold` with a top border separator
- Remove "Calculated at next step" text for shipping — replace with "Free for orders above ₹50,000 | Calculated for others"

### Enquiry Info Panel (Left Column)
Current: `dl` list with `flex justify-between border-b` rows
Redesign:
- Add icon beside each key: clock icon for Response Time, package icon for Minimum Order, calendar icon for Lead Time
- Increase row padding to `py-4`
- Values: `text-gold font-semibold` (keep gold here — this is value communication, gold is justified)

---

## Form Redesign

### Current Pattern (Bottom-Border Only)
`border-b border-border` with no visible field container. On a complex form, this makes it hard to scan which fields are filled vs empty.

### Redesigned Pattern (Contained + Labeled)
- Each field: `rounded-lg border border-border bg-background/50 px-4 py-3`
- Label: floats above the input as a persistent label (`text-xs tracking-widest uppercase`)
- Focus state: `border-gold ring-1 ring-gold/30` (subtle ring, not just border color change)
- Error state: `border-red-400 ring-1 ring-red-400/20` with inline error message below
- This brings form fields closer to Linear/Stripe input style — contained, clearly bounded, scannable

### Payment Option Cards
Replace `div` blocks with proper `label`+`input[type=radio]` elements:
```
[Radio input — visually hidden]
[Label — styled card with icon + title]
  Selected: border-gold bg-gold/5 ring-1 ring-gold/40
  Unselected: border-border hover:border-foreground/40
```

---

## Button System

### Three Button Types — Strict Hierarchy

**Primary (Gold Fill) — "The Most Important Action"**
- Use: "Get a Quote", "Explore Collection", "Send Enquiry"
- Style: `bg-gold text-obsidian font-bold uppercase tracking-widest rounded-full px-7 py-4`
- Hover: `bg-white text-obsidian`
- One per page section maximum

**Secondary (Obsidian Fill) — "The Purchase Action"**
- Use: "Buy Now", "Place Order", "Proceed to Checkout", "Add to Cart" (when shown standalone)
- Style: `bg-obsidian text-white font-bold uppercase tracking-widest rounded-full px-7 py-4`
- Hover: `bg-gold text-obsidian`

**Tertiary (Outline) — "The Secondary Action"**
- Use: "Add to Cart" (alongside Buy Now), "Continue Shopping", "Back"
- Style: `border-2 border-obsidian text-obsidian font-semibold uppercase tracking-widest rounded-full px-7 py-4`
- Hover: `bg-obsidian text-white`
- Dark surface variant: `border-2 border-white text-white` → hover `bg-white text-obsidian`

**Ghost (Text Only) — "The Utility Action"**
- Use: "Continue Shopping" (cart drawer), "Back to Collection", breadcrumb links
- Style: `text-foreground/60 underline-offset-4 hover:text-foreground hover:underline text-sm uppercase tracking-widest`

**Rules:**
- All buttons: `rounded-full` (consistent with current — keep the pill shape, it matches brand)
- All buttons: minimum `py-3 px-6` touch target
- Disabled state: `opacity-40 cursor-not-allowed` — never hide or completely grey-out the button shape
- Never use more than 2 button types in the same visual section

---

## Mobile-First Design Adjustments

### Remove Hidden Utility Actions from Mobile
Audit every `hidden sm:block`, `hidden md:block`, `hidden lg:inline-flex` and classify as:
- **Must show on mobile:** Cart icon, Wishlist icon, Search icon, "Get a Quote" (in mobile menu), announcement bar phone number, hero stats
- **Acceptable to hide on mobile:** Announcement bar email address (show only phone), desktop nav links (hamburger is correct)
- **Should restructure, not hide:** Hero stats (show as horizontal strip below CTAs, not in right column)

### Mobile Card Layout
- Single column on < 640px — each product card spans full width
- Card image: `aspect-[3/4]` for mannequins (shows more of the product), `aspect-[4/3]` for mandaps
- "Add to Cart" button: always visible below image (not hover-dependent)

### Mobile Touch Targets
Every interactive element must be ≥ 44×44px:
- Current icon buttons (`p-2` + `size={18}` icon = ~38px) are slightly under
- Increase to `p-3` for header icon buttons → 44px touch target

### Mobile Typography
- Body copy: minimum `text-base` (16px) — no `text-sm` for main description text
- CTAs: `text-xs uppercase tracking-widest` is acceptable for buttons (keep)
- Tags: minimum `text-xs` (12px) — remove `text-[10px]` entirely

---

## UI Consistency Rules

1. **Border-radius:** `rounded-full` for all buttons and badges. `rounded-2xl` for all cards and modals. `rounded-lg` for all form inputs. No mixing.
2. **Shadow scale:** `shadow-soft` for resting cards. `shadow-luxe` for elevated/hover states and modals. No other shadow values.
3. **Gold usage:** Price text, active states, section sub-labels (those small uppercase "The Collection" lines), primary CTA fill. Nothing else.
4. **Transition:** `transition-smooth` (0.6s cubic) for visual elements. `transition-colors` (0.15s) for text hover states only. Not `transition-smooth` on text — it's too slow for hover feedback.
5. **Uppercase tracking text:** Only for: button labels, category tags, section sub-labels, nav links. Never for: body copy, product descriptions, form labels, headings.
6. **Form fields:** All use the same contained `rounded-lg border` pattern. No mixing with bottom-border-only fields.
7. **Image fit:** `object-contain` for mannequin/statue product photos (white background product shots). `object-cover` for editorial/ambient images (hero, categories, about section).
8. **Icon size:** `size={16}` for inline text icons. `size={20}` for standalone interactive icons. `size={24}` for empty state illustrations. No mixing.

---

## Visual Simplification Opportunities

### What to Remove
1. **Fabricated discount badges (% OFF + crossed-out price)** — Remove entirely from ProductDetails
2. **Fabricated SKU display** — Remove from ProductDetails, or replace with real SKUs
3. **`tracking-[0.4em]` custom values** — Replace with `tracking-widest`
4. **`text-[10px]` and `text-[9px]`** — Remove entirely; use `text-xs` as the minimum
5. **Per-section `reveal` animation on above-fold content** — Hero content should render immediately
6. **Gold border accents on cards** — The current `border-gold/20` on headers/search creates visual noise; use `border-border` instead

### What to Simplify
1. **CurrencyToggle** — One instance in the header only; remove from product grid and product detail page separately
2. **Enquiry + QuoteRequest forms** — Merge into one page
3. **Navigation `NAV` array** — Duplicate in Header.tsx and Footer.tsx; source from one shared constant
4. **Product tag labels** — Currently all gold + uppercase + ultra-spaced; reduce to `text-xs text-foreground/50 uppercase tracking-wide`

### What to Strengthen Visually
1. **Price display** — Make it larger and gold on product cards. Currently `text-sm font-bold` — increase to `text-base font-bold text-gold`
2. **"Get a Quote" CTA** — Give it more visual weight with a subtle shadow: `shadow-md`
3. **Hero headline** — Increase to `text-5xl sm:text-6xl md:text-8xl` on larger screens; the current cap at `lg:text-8xl` never renders without a very large viewport
4. **Product section headings** — Give each section a more distinct visual opener; the repeated `text-xs uppercase tracking-[0.4em] text-gold` sub-label before every h2 is a pattern that needs either variation or reduction
5. **In-stock indicator** — Replace color-only dot with a `✓ In Stock` text badge with a subtle green background
