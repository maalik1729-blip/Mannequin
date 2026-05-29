# Component Execution Plan — Mannequin Display Solutions (A K Enterprises)

**Author:** Senior Frontend Architect & Product Designer  
**Reference Document:** `outputs/03_visual_redesign_direction.md`  
**Target Stack:** React (Vite) + Tailwind CSS + Lucide Icons + Lenis Smooth Scroll  

---

# Header Changes

* **Current Issue**: The header uses hardcoded black (`bg-obsidian`) on scroll and relies on complex, manual text color checks, leading to a sterile, non-adaptive UI.
* **Redesign Goal**: Create a fully theme-adaptive, translucent glassmorphic header that scales smoothly across light and dark settings.
* **Exact UI Changes**:
  - Update scrolled header classes to: `bg-background/95 backdrop-blur-xl border-b border-border shadow-luxe`.
  - Simplify header text color to `text-foreground` across all states.
  - Implement a micro-animated **Theme Switcher** Sun/Moon button right next to the shopping cart icon.
* **Interaction Improvements**:
  - Switcher icons rotate `360deg` and fade gently when toggled (`transition-all duration-500`).
* **Responsive Behavior**:
  - The announcement bar at the top (`Crafted in India · Worldwide Shipping`) is hidden below `md` viewports to optimize vertical breathing space.
* **Spacing and Layout Changes**:
  - Vertical height standardized: `h-16 md:h-20` with aligned container limits (`container px-4`).

---

# Mobile Side Drawer Changes

* **Current Issue**: The mobile navigation drawer is hardcoded to solid black (`bg-obsidian`) even in light mode, creating heavy visual jank.
* **Redesign Goal**: Turn the side drawer into a beautiful, lightweight flyout that reflects the active theme.
* **Exact UI Changes**:
  - Change main drawer background to `bg-background`.
  - Update layout borders to `border-border`.
  - Convert navigation text color to `text-foreground`.
  - Replace the background dim overlay with a soft blurred backdrop mask (`bg-foreground/40 backdrop-blur-sm`).
* **Interaction Improvements**:
  - Links expand and highlight smoothly on touch: `hover:bg-muted transition-smooth`.
* **Responsive Behavior**:
  - Flyout occupies exactly `w-72` on the right side of the screen.
* **Spacing and Layout Changes**:
  - Padding standardized: `px-5 py-4` for headers, `px-5 pb-6` for CTAs.

---

# Navigation Improvements

* **Current Issue**: Anchor links navigate instantly or fail to resolve smoothly when clicked from inner pages like `/checkout` or `/wishlist`.
* **Redesign Goal**: Implement an intelligent single-page navigation handler that manages home redirects and smooth scrolling.
* **Exact UI Changes**:
  - Utilize React Router's `useNavigate` and `useLocation` to check the pathname:
    - If on home `/`, trigger a smooth scroll down to the targeted `#id`.
    - If on an inner page, navigate to `/?target=id` and scroll once home is mounted.
* **Interaction Improvements**:
  - Links underline with a soft, sliding underline that expands from the center (`w-0 group-hover:w-full transition-all duration-300`).

---

# Product Card Changes

* **Current Issue**: Cards have flat, flat gray backgrounds with small wishlist icons and lack depth.
* **Redesign Goal**: Frame display silhouettes on a rich, paper-like radial canvas that adapts to light and dark settings.
* **Exact UI Changes**:
  - Implement the `.product-frame` background:
    ```css
    .product-frame {
      background: radial-gradient(120% 80% at 50% 0%, hsl(var(--card)) 0%, hsl(var(--secondary)) 55%, hsl(var(--border)) 100%);
      box-shadow: inset 0 60px 60px -40px hsl(var(--card) / 0.7), inset 0 0 0 1px hsl(var(--border) / 0.6);
    }
    ```
  - Display numerical catalog indexing on the top-left (e.g. `01`, `02`).
* **Interaction Improvements**:
  - On hover, the silhouette scales by `4%` (`scale-[1.04]`) with a 700ms smooth transition.
  - Cart and wishlist controls dissolve in gently on hover.
* **Responsive Behavior**:
  - Dual columns on mobile (`grid-cols-2`), expanding to 3 on tablet, and 4 on large desktops.

---

# Shopping Cart Drawer Listing Improvements

* **Current Issue**: Small increment buttons (`+` and `−`) and tight layouts make cart changes difficult on mobile.
* **Redesign Goal**: Create a spacious, tactile, B2B-friendly cart summary list.
* **Exact UI Changes**:
  - Steppers are scaled up, with rounded borders: `border border-border rounded-full`.
  - Item lists are separated with thin `border-b border-border` lines.
* **Interaction Improvements**:
  - Touch targets for steppers expanded to `48x48px` to ensure effortless usability.
* **Responsive Behavior**:
  - Drawer occupies `w-full max-w-md` on the right side of the screen.

---

# Form Improvements

* **Current Issue**: Forms have hardcoded white text inputs on dark fields that do not fit light mode settings.
* **Redesign Goal**: Clean, responsive, and adaptive input elements.
* **Exact UI Changes**:
  - Standard input and textareas: `bg-foreground/[0.05] border border-foreground/10 text-foreground focus:border-gold focus:ring-1 focus:ring-gold/30`.
  - Dropdown options: `bg-background text-foreground`.
* **Interaction Improvements**:
  - Input borders highlight dynamically on focus, with focus-visible outlines.

---

# Button System Improvements

* **Current Issue**: Buttons rely on hardcoded dark styles that cause visual clashes in light settings.
* **Redesign Goal**: Unified, theme-responsive button system with clear visual priority.
* **Exact UI Changes**:
  - Primary (`btn-primary`): `bg-gold text-obsidian rounded-full px-7 py-3.5 hover:bg-foreground hover:text-background`.
  - Secondary (`btn-secondary`): `bg-obsidian text-white rounded-full px-7 py-3.5 hover:bg-gold hover:text-obsidian`.
  - Outline (`btn-outline`): `border-2 border-border text-foreground hover:bg-foreground hover:text-background`.

---

# Restock Notification Modal Improvements

* **Current Issue**: When a product is sold out, users see a locked "Unavailable" button with no conversion path.
* **Redesign Goal**: Introduce an elegant micro-modal to capture restock inquiries.
* **Exact UI Changes**:
  - Implement a modal dialog (`bg-background border border-border p-6 rounded-2xl`).
  - Form fields: Name, Email, and Quantity.
* **Interaction Improvements**:
  - Pre-fill product names automatically from the product details context.

---

# Empty State Improvements

* **Current Issue**: "No pieces in this category" empty states are simple, dry text.
* **Redesign Goal**: Premium, brand-aligned empty states that encourage catalog browsing.
* **Exact UI Changes**:
  - Display a centered icon with soft opacity, a Garamond headline, and a clean primary button to browse the full collection.

---

# Error State Improvements

* **Current Issue**: The 404 page is a plain white container.
* **Redesign Goal**: An editorial, elegant 404 page that guides users back home.
* **Exact UI Changes**:
  - Clean layout featuring Cormorant display headings, a brief explanation, and a rounded primary CTA to return to the catalog.

---

# Responsive Design Tasks

1. **Category Pills Carousel**: Implement horizontal scrolling with `overflow-x-auto scrollbar-hide` to ensure mobile filters fit on a single row.
2. **Checkout Layout Shift**: On desktop, show billing forms on the left and order summary on the right. On mobile, stack them vertically, with the summary placed first.

---

# Mobile Interaction Improvements

* **Touch target scale-up**: Wishlist heart buttons, search triggers, and close drawers are scaled to `48x48px`.
* **Active Feedback**: Add active scale-down states (`active:scale-[0.98]`) to mobile buttons to provide tactile physical response.

---

# Frontend Handoff Notes

* **Theme Tokens**: Always use CSS variables (`var(--background)`, `var(--foreground)`, etc.) instead of hardcoded hex values to guarantee theme symmetry.
* **CSS Transition**: Apply standard `.transition-smooth` utility on all interactive selectors.

---

# Component Priority Order

1. **ThemeContext & Global CSS**: Symmetrical root colors and global smooth transitions.
2. **Header & Mobile Drawer**: Symmetrical navigation and Theme Switcher integration.
3. **Hero & Footer Sections**: Dynamic backgrounds, gradient overlays, and typography.
4. **Product Card & Steppers**: Radial spot frames and touch zones.
5. **Checkout & Forms**: B2B wholesale toggle and input fields.
