# Visual Redesign Direction — Mannequin Display Solutions (A K Enterprises)

**Author:** Senior Product UI Designer  
**Reference Document:** `outputs/02_ux_improvement_strategy.md`  
**Inspiration Standards:** Stripe, Linear, and High-End Fashion Editorial Catalogs (Celine, Giorgio Armani)  

---

# Visual Design Philosophy

Our visual direction marries the **architectural, minimalist UI precision of Linear & Stripe** with the **luxurious editorial breathing space of high-fashion catalog design**. 

We utilize a **Pearl Silk & Symmetrical Espresso Obsidian** color system to frame our mannequin and statue products. Instead of cluttering the page with busy shadows, heavy borders, or bright colors, we rely on **extreme spacing discipline, pristine typographic hierarchy, and micro-animated component states** that guide the user's focus precisely onto the visual merchandising solutions.

---

# Typography Recommendations

We establish a dual-typeface typographic system designed to balance high-end artistic heritage with numeric commercial scanning:

### 1. Display Headers: Cormorant Garamond
* **Usage**: Page titles, section headers (`h1`, `h2`), and featured product names.
* **Style**: Light weight (`font-light`), subtle italics (`italic`) for emphasis, and tight letter-spacing (`tracking-tight`).
* **Visual Goal**: Conveys heritage, bespoke craftsmanship, and luxury.

### 2. UI Elements & Numerical Data: Outfit & Inter
* **Usage**: Body paragraphs, B2B forms, shopping cart counters, checkout steps, and currency values.
* **Style**: Regular/Medium weights, uppercase for sub-labels with broad letter-spacing (`tracking-[0.2em]`). Outfit is utilized for tabular numbers (`font-variant-numeric: tabular-nums`) to ensure price lines align perfectly across currency shifts.
* **Visual Goal**: Clean technical scanning, high readability, and architectural precision.

---

# Layout System

* **Grid System**: Standard 12-column grid container (`max-w-6xl` or `max-w-7xl`) with generous padding (`px-4 sm:px-6 lg:px-8`).
* **Breathing Space (Section Padding)**: Standardize section vertical heights (`py-16 md:py-24 lg:py-32`) to prevent cognitive crowding and allow high-impact product imagery to stand out.
* **Consistency Rules**: Every component must follow an 8px spacing grid (e.g. padding of `p-4`, `p-6`, `p-8`, or margin margins of `mt-2`, `mt-4`, `mt-8`).

---

# Color Hierarchy

Both themes are built strictly with HSL coordinates to allow smooth, high-fidelity color interpolation.

```
Pearl Silk Mode (Light)
├── Background: HSL 30 8% 96% (Soft Silk Pearl)
├── Foreground: HSL 30 12% 12% (Matte Espresso Obsidian)
├── Cards: HSL 30 8% 98% (Delicate Pearl Silk)
└── Accents: HSL 220 10% 72% (Polished Platinum Silver)

Espresso Obsidian Mode (Dark)
├── Background: HSL 30 12% 7% (Deep Espresso Obsidian)
├── Foreground: HSL 30 8% 92% (Soft Pearl Silk)
├── Cards: HSL 30 10% 10% (Muted Espresso Silk)
└── Accents: HSL 220 10% 72% (Symmetrical Polished Platinum)
```

---

# Navigation Redesign

* **Desktop Header**:
  - Keep the header fixed but transition background and borders smoothly (`transition-all duration-500`).
  - Scrolled state: `bg-background/95 backdrop-blur-xl border-b border-border shadow-luxe`.
  - Introduce an elegant **Theme Switcher** next to the Cart, using micro-animated Sun/Moon icons from Lucide.
* **Mobile Drawer**:
  - Replace raw dark panels in light mode with an elegant `bg-background` slide-over, framed with `border-border` dividers and clean `text-foreground` navigation items.

---

# Catalog Grid & Product Listing Redesign

* **The Grid**: Implement a clean, responsive product grid: 2 columns on mobile, 3 columns on tablet, and 4 columns on large desktops.
* **Visual Dominance**: The product image itself must occupy **85%** of the product card viewport, utilizing an editorial `product-frame` featuring a soft overhead radial light source and a subtle floor shadow.
* **Clean Filters**: The category filter row utilizes simple, horizontal-scrolling rounded pill buttons in `border-border text-foreground/60` and `bg-gold text-obsidian` when active.

---

# Card Component Redesign

* **The Card Frame**: Maintain flat borders or border-less elements, framing flat product silhouettes on a textured radial canvas:
  ```css
  .product-frame {
    background: radial-gradient(120% 80% at 50% 0%, hsl(var(--card)) 0%, hsl(var(--secondary)) 55%, hsl(var(--border)) 100%);
    box-shadow: inset 0 60px 60px -40px hsl(var(--card) / 0.7), inset 0 0 0 1px hsl(var(--border) / 0.6);
  }
  ```
* **Hover Micro-Animations**:
  - On hover, the image scales gently by **4%** (`scale-[1.04]`).
  - The checkout wishlist and cart buttons dissolve smoothly into view, providing interactive affordance.

---

# Shopping Cart & Checkout Layout Redesign

* **Cart Drawer Layout**:
  - Muted backdrop using a soft blurred cover: `bg-foreground/40 backdrop-blur-sm`.
  - Drawers rise cleanly from the right. Cart items use `border-b border-border` dividers.
  - Steppers use generous touch pads (`48x48px`) styled with thin border lines.
* **Checkout Page**:
  - Clean two-column split: left column for address/GST B2B toggle forms, and right sticky column for order breakdown.

---

# Form Redesign

* **Form Fields**:
  - Fields are translucent, adapting naturally to the active theme: `bg-foreground/[0.05] border border-foreground/10 focus:border-gold focus:ring-1 focus:ring-gold/30`.
  - Select dropdown items match the background perfectly (`bg-background text-foreground`).
  - Required fields use a soft red asterisk `*` for clear indication.

---

# Button System

* **Primary Buttons (`btn-primary`)**:
  - Rounded full (`rounded-full`), styling a bold uppercase label with broad tracking.
  - Active theme colors: `bg-gold text-obsidian hover:bg-foreground hover:text-background`.
* **Secondary Buttons (`btn-secondary`)**:
  - Rounded full: `bg-obsidian text-white hover:bg-gold hover:text-obsidian`.
* **Outline Buttons (`btn-outline`)**:
  - Clean border outline: `border border-border text-foreground hover:bg-foreground hover:text-background`.

---

# Mobile-first Design Adjustments

* **Touch Zones**: Increase minimum touch zone area for all mobile interactive elements to `48x48px` (wishlist hearts, stepper increment triggers, currency switches).
* **Category Carousel**: Set horizontal category filters with a hidden scrollbar (`scrollbar-hide`) to keep mobile viewports clean and avoid horizontal layout jank.

---

# UI Consistency Rules

1. **Border Radius**: Standardize all borders using a unified token (`rounded-lg` / `var(--radius)` which maps to `0.75rem`). Pill components (buttons, filter rows, tags) use a full radius (`rounded-full`).
2. **Transition Speeds**: All theme-affected elements must transition exactly at `500ms` using the custom easing curve `cubic-bezier(0.22, 1, 0.36, 1)` to maintain the premium feel.

---

# Visual Simplification Opportunities

* **Eliminate Raw Grays**: Remove all clinical pure grays (`#f3f4f6`, `#9ca3af`) from the stylesheet. Replace them entirely with our warm, Pearl-Silk-based HSL neutrals to enrich the luxury editorial brand.
* **Vignette Gradients**: Swap basic flat background panels for radial overhead light spotlights to instantly evoke high-end retail gallery showroom spaces.
