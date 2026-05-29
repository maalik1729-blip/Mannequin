# A K Enterprises Mannequin Storefront UI Redesign — Agent Identity

## Scope: Frontend Only
Do NOT touch: `package.json`, `vite.config.ts`, `postcss.config.js`, `tsconfig.json`, `eslint.config.js`, or any build config files.
Every change must be inside the `src/` directory only.
No external npm packages are to be added; leverage the pre-installed tools and components.

---

## Tech Stack (Confirmed from Codebase)
- **Framework**: Vite + React 18 + React Router DOM v6
- **Styling**: Tailwind CSS v3 (standard `@tailwind` directive layer configuration inside `src/index.css`) + Custom luxury theme HSL color tokens.
- **State contexts**:
  - `CartContext` (`src/context/CartContext.tsx`) -> Store client selections.
  - `WishlistContext` (`src/context/WishlistContext.tsx`) -> Track boutique favorites.
  - `CurrencyContext` (`src/context/CurrencyContext.tsx`) -> Multi-currency support (INR/USD conversion).
  - `ThemeContext` (`src/context/ThemeContext.tsx`) -> Interactive dark/light mode toggle.
- **Animations & Smooth Scroll**:
  - Lenis Smooth Scroll (`src/hooks/useLenis.ts`) -> Handles premium deceleration scrolling.
  - Intersection Observer Scroll Reveal -> Animates elements entering the viewport with the `.reveal` transition.
- **Icons**: Lucide React
- **Notifications & UI**: Radix UI Primitives, `sonner` for luxurious toast messages, and `toaster` for form feedback.
- **Path Alias**: `@` maps directly to `src/`

---

## Confirmed Route Files
- `src/pages/Index.tsx`               → Showroom main landing grid (Hero, Marquee, Categories, Products, About, Enquiry, Contact)
- `src/pages/ProductDetails.tsx`      → Detailed silhouette specifications, quantity steppers, related collections, and B2B restock lead capture
- `src/pages/Checkout.tsx`             → Segmented retail checkout (B2C cards/UPI/COD) and wholesale quote requests (B2B tax/freight coordinates)
- `src/pages/QuoteRequest.tsx`         → Bespoke mannequin fabrication, store fit-outs, and custom color request forms
- `src/pages/Wishlist.tsx`             → Boutique collection curation list
- `src/pages/OrderSuccess.tsx`         → Transaction confirmation page
- **Legal & Info Pages**:
  - `src/pages/ShippingPolicy.tsx`     → Domestic and international delivery terms
  - `src/pages/CancellationRefund.tsx` → B2B return exemptions and terms
  - `src/pages/PrivacyPolicy.tsx`       → General data processing notice
  - `src/pages/TermsConditions.tsx`     → Retail & commercial contract clauses
  - `src/pages/NotFound.tsx`            → Graceful error route fallback

---

## Confirmed Problems (For UI/UX Redesign Audit)
1. **Currency Context Sync Gaps**: While `ProductDetails.tsx` has a functional currency selector, other vital displays (such as the homepage `Products.tsx` cards, `CartDrawer.tsx` line-items, and `Checkout.tsx` summary) have hardcoded rupee indicators or do not fully integrate the `useCurrency` `format` output dynamically.
2. **Lenis Scroll Collision**: When high-fidelity overlay elements like `CartDrawer` or the B2B restock lead modal are active, Lenis smooth scroll continues running in the background, violating desktop scroll focus and creating touch-device scrolling lock issues.
3. **Vanilla Form Validations**: The checkout flow and bespoke quote requests depend on manual form-state validations instead of a robust, unified React Hook Form + Zod validation schema.
4. **Wishlist State Grid Desync**: Product cards in the homepage main grid do not instantly sync their `Heart` icon filled-state toggles across related lists and the main catalog without a page reload or separate rendering event.
5. **Static B2B/B2C Checkout Toggle**: The segmented retail/wholesale control on `/checkout` is static and lacks high-end micro-animations or modern transition states.

---

## Brand Constraints (Non-Negotiable)
- **Theme Palettes (Couture Luxury)**:
  - **Pearl Silk Couture** (Light Mode): Ivory base background (`HSL(30 8% 96%)`), Matte Espresso Obsidian text (`HSL(30 12% 12%)`), Polished Metallic Platinum Silver (`HSL(220 10% 72%)`), and Brushed Pearl secondary (`HSL(30 8% 91%)`).
  - **Espresso Obsidian Couture** (Dark Mode): Symmetrical dark background (`HSL(30 12% 7%)`), Soft Pearl Silk text (`HSL(30 8% 92%)`), and Pure Onyx details.
- **Font Specifications**:
  - Headings & Displays: `Cormorant Garamond` (or Playfair Display serif) with subtle letter-spacing.
  - Price & Numeric Displays: `Outfit` for tabular layout clean numbers.
  - Body Copy: `Inter` for functional reading.
- **Image Styling**: Use the `.product-frame` classes. All catalog images must utilize this grid layout (radial ambient highlights, floor shadows, and subtle paper grain overlay textures) to maintain luxury merchandising visual guidelines.

---

## Workflow Trigger
To trigger the automated redesign stages in Antigravity chat, type:
```
/ui-redesign
```
This runs all 5 stages sequentially:
- `/ui-audit`         → Audit storefront logic & layouts
- `/ux-strategy`      → Establish data sync & validation workflows
- `/visual-tokens`    → Align styling variables & transition tokens
- `/component-fixes`  → Implement React fixes in `src/` pages and components
- `/ux-review`        → Perform multi-device viewport verification checks
