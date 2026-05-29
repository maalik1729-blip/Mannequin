# /ui-redesign — A K Enterprises Mannequin Storefront Redesign Pipeline

> Type `/ui-redesign` in Antigravity to run all 5 stages.
> Frontend changes only. No build-env files are modified.
> The agent automatically reviews each stage output before proceeding.

---

## Pre-flight

Before commencing Stage 1, inspect the following files using the editor to understand the app layout:
- `src/index.css`                      ← Styles, custom luxury palettes, fonts
- `src/App.tsx`                        ← Context Providers, BrowserRoutes
- `src/pages/Index.tsx`                ← Homepage structure
- `src/pages/ProductDetails.tsx`        ← Restock modals, quantity controls
- `src/pages/Checkout.tsx`             ← Form layout, B2B/B2C toggle
- `src/pages/QuoteRequest.tsx`         ← Bespoke quotation forms
- `src/components/site/Header.tsx`     ← Main branding header
- `src/components/site/Products.tsx`   ← Products display grid
- `src/components/site/CartDrawer.tsx` ← Shop cart slider drawer
- `src/hooks/useLenis.ts`              ← Smooth scroll hook

Confirm in the chat: which files were loaded, their line lengths, and how the global contexts (`Cart`, `Wishlist`, `Currency`, `Theme`) propagate down to them.

---

## Stage 1 — UI Audit (Frontend Code & Layouts)

**Read**: All `.tsx` pages in `src/pages/` and custom site components in `src/components/site/`
**Write**: `outputs/01_ui_audit.md`

### Audit Specifications

#### 1. Currency Display & Formatting Audit
Scan `src/components/site/Products.tsx`, `src/components/site/CartDrawer.tsx`, `src/pages/Checkout.tsx`, and `src/pages/Wishlist.tsx` for:
- Any hardcoded Indian Rupee (`₹`) symbols or dollar symbols in text strings.
- Lines where raw numeric prices (e.g. `product.priceINR`) are displayed without wrapping them in the `CurrencyContext` `format()` utility.
- Audit whether currency toggle state changes propagate instantly to the shopping cart drawer subtotal and checkout summaries.

#### 2. Scroll Interactivity & Drawer Collision Audit
Audit `src/hooks/useLenis.ts` and overlays like `CartDrawer.tsx` and the restock capture modal inside `ProductDetails.tsx` for:
- Check if background scrolling remains active when these dialogs/overlays are rendered.
- Check if there are scroll-lock utilities or Lenis instances that need manual start/stop actions.
- List touch-screen behavior when dragging elements inside the cart drawer.

#### 3. Checkout and Quote Validation Audit
Open `src/pages/Checkout.tsx` and `src/pages/QuoteRequest.tsx`:
- Inspect form fields and validation handlers (`onSubmit`, validation regex, manual state checking).
- Identify fields that lack mandatory error feedback or permit invalid submissions.
- Check if B2B-specific variables (like company name or GSTIN number) have robust validators.

#### 4. Grid and Wishlist Sync Audit
Audit the catalog cards in `Products.tsx`:
- Review the `Heart` favorite icon buttons.
- Check if favoriting an item inside the landing grid immediately updates that item's heart state in the related products list or inside the wishlisted pages without page refreshes.

#### 5. Mobile Viewport & Typography Audit
Audit all routes at a `375px` simulated mobile screen width:
- Detect fixed pixel sizes that will overflow container limits.
- Audit touch targets; make sure buttons, selectors, and tabs have a minimum height/width of 44px (`min-h-[44px]`).
- Verify that luxury font families (`Cormorant Garamond` and `Outfit`) are configured with appropriate fallbacks to prevent flash-of-unstyled-text (FOUT) on slower mobile connections.

### Required Output Structure

```markdown
# 01 — A K Enterprises UI Audit

## Executive Summary
[Brief overview of the storefront health, performance, and B2B/B2C readiness]

## Dynamic Currency Findings
[Every location where raw prices are hardcoded or desynced. Severity tagged.]

## Scroll Interactivity & Lock Findings
[Lenis-overlay collisions, background scrolling, and mobile touch lock conflicts]

## Form Validation & Schema Findings
[Areas in Checkout/QuoteRequest lacking robust validators or Zod integrations]

## Wishlist & Grid Sync Findings
[Behavior of heart favorite toggles on grids and related item lists]

## Mobile Viewport & Accessibility Findings
[Overflow issues at 375px width, touch targets < 44px, FOUT risks]

## Prioritized Redesign Checklist
[Ranked: CRITICAL → HIGH → MEDIUM → LOW]
[Each item: file path, required correction, rationale]
```

---

## Stage 2 — UX Strategy (Data Sync & Validation Layout)

**Read**: `outputs/01_ui_audit.md`
**Write**: `outputs/02_ux_strategy.md`

### Strategy Specifications

Focus strictly on information hierarchy, validation mechanisms, state propagation, and interactive transitions.

#### 1. Currency Formatting Propagation
- Design a centralized formatting standard using the global `CurrencyContext` to ensure all prices convert dynamically between INR and USD across grids, sliders, cart tables, and checkout totals.

#### 2. Body Scroll Locking Strategy
- Formulate a clean protocol to lock/unlock Lenis smooth scrolling. When overlay dialogs or drawers are active, the body scroll must be locked either by pausing the Lenis instance or by applying temporary CSS variables (`overflow: hidden`).

#### 3. Schema-Based Validation
- Architect robust Zod schemas paired with React Hook Form for `/checkout` and `/request-quote`. Define specific validators for:
  - Phone numbers (strict 10-digit formats).
  - Commercial GSTIN codes (for B2B wholesale transactions).
  - Boutique descriptions and customized fabrication specifications.

#### 4. State Event Synchronization
- Propose a state management strategy to sync favorited heart states instantly across all active cards on the page without requiring full re-renders.

#### 5. Checkout Interactive Segmenting
- Design a high-fidelity B2B/B2C transition strategy for the segment toggles in Checkout. Detail the visual transformation as the form expands from a standard retail order form to a complex wholesale proposal capture.

### Required Output Structure

```markdown
# 02 — UX Strategy

## Redesign Strategy Overview
## Multi-Currency Pricing Architecture
## Smooth Scroll Lock & Drawer Interactivity Protocol
## Centralized Form Validation Schemas (Zod + Hook Form)
## Real-Time Wishlist Event Synchronization
## Segmented Checkout UX (B2B vs B2C Transition Logic)
## Component Hierarchy Upgrades
## Top 10 UX Enhancement Priorities
```

---

## Stage 3 — Design Tokens + Visual Direction

**Read**: `outputs/02_ux_strategy.md` + `outputs/01_ui_audit.md`
**Write**: `outputs/03_visual_tokens.md`
**Also update**: `src/index.css` (integrates the premium styling block)

### Design Specifications

#### 1. Couture Color System (HSL Tokens)
Define custom HSL custom properties inside `src/index.css` for light (Pearl Silk) and dark (Espresso Obsidian) mode variables:
- Light Mode: Pearl Silk base background, Espresso text, Platinum Silver accent, Secondary Pearl borders.
- Dark Mode: Espresso Obsidian base background, Soft Pearl text, Pure Onyx borders.

#### 2. Class Specifications for Luxury Elements
Specify actual Tailwind class strings for key components to ensure design uniformity:
1. **Header Navigation Bar**: glassmorphic blurring, border transitions.
2. **Product Display Frame (`.product-frame`)**: radial glow gradients, paper-grain noise overlays, and floor shadow levels.
3. **Primary & Secondary Buttons**: scale modifications, hover transitions, and border curves.
4. **B2B/B2C Checkout Toggle**: sliding background, high-contrast states.
5. **Restock Capture Modals**: backdrop blur depths, elegant card framing.

### Required Output Structure

```markdown
# 03 — Design Tokens & Visual Direction

## HSL Token System
[Standard CSS Custom Property block]

## Extended Tailwind Typography & Theme Config
[Theme extensions to integrate Cormorant Garamond, Outfit, and Inter]

## Luxury Component Class Specifications
[Copy-paste ready Tailwind utility class sets for headers, product-frames, forms, and buttons]

## Micro-Animation & Backdrop Blurs
[Transition cubic-beziers, scroll-reveal properties, and glassmorphic blurs]

## Fonts & Performance Optimization
[Google Font loading, display: swap fallbacks, and preload targets]
```

---

## Stage 4 — Component Fixes (React Code Execution)

**Read**: `outputs/03_visual_tokens.md` + `outputs/02_ux_strategy.md`
**Write**: `outputs/04_change_plan.md`
**Also modify**: actual source files in `src/`

### Execution Specifications

Apply changes directly to the React components. Document every modified file inside `outputs/change_log.md` chronologically.

#### Fix 1 — Centralized Colors & Custom Typography in `src/index.css`
- Inject the full set of HSL variables for the Pearl Silk and Espresso Obsidian themes.
- Confirm headings use `Cormorant Garamond` and prices use `Outfit`.

#### Fix 2 — Multi-Currency Syncing
- Update price elements in `Products.tsx`, `CartDrawer.tsx`, and `Checkout.tsx` to query `useCurrency()` and run the `format()` function dynamically. Eliminate all hardcoded rupee symbols.

#### Fix 3 — Lenis Scrolling Lock
- Modify `src/hooks/useLenis.ts` to expose pause/resume scroll methods. Wire these triggers to `CartDrawer.tsx` open/close actions and the restock modal inside `ProductDetails.tsx` to stop background page scrolling.

#### Fix 4 — Robust Form Validations (Zod integration)
- Rewrite validation systems inside `Checkout.tsx` and `QuoteRequest.tsx`. Wire in schema validations to block incomplete submissions, and display descriptive error messages beneath invalid inputs.

#### Fix 5 — Wishlist Syncing
- Refactor the click handler in `Products.tsx` so that toggling an item's favorite state immediately triggers card context updates, updating all heart icons across the homepage collections.

#### Fix 6 — High-Contrast Segment Toggle
- Update `/checkout` segmented control with transition classes, sliding highlights, and distinct visual indicators for Retail (B2C) vs Wholesale (B2B).

### Required Output Structure

```markdown
# 04 — Component Fixes Change Plan

## Summary of Code Changes
[File path | Change description | Line ranges affected]

## Fix 1: Luxury CSS Variables & Dark Mode Variables
## Fix 2: Dynamic Currency Pricing Integration
## Fix 3: Lenis Scroll Lock Protocol
## Fix 4: Zod Schema Form Validations
## Fix 5: Synced Grid Wishlist Context Toggles
## Fix 6: Symmetrical B2B/B2C Checkout Transitions

## Local Validation Verification
[Manual terminal execution reports: build status, TypeScript correctness checks]
```

---

## Stage 5 — Final Review (Multi-Viewport Quality Check)

**Read**: `outputs/04_change_plan.md`
**Write**: `outputs/05_final_review.md`

### Verification Specifications

1. Open modified files to verify the implemented fixes are fully integrated.
2. Confirm the multi-currency conversions work seamlessly without layout shifts.
3. Test forms with invalid inputs; verify that checkout is blocked and display errors correctly.
4. Verify scroll lock functionality on mobile-width sizes.
5. Search the codebase for hardcoded `₹` characters or remaining voter/TNVS references.

### Viewport Verification Protocol
Using a browser agent or local simulator, inspect the website at `375px` mobile viewport width:
- Verify header collapses correctly.
- Verify checkout summaries and product detail images fit without overflowing.
- Verify touch targets feel comfortable to interact with on mobile.

### Required Output Structure

```markdown
# 05 — Final Review

## Redesign Verification Results
[Pass/Fail outcomes for each of the 6 Stage 4 fixes]

## Hardcoded Elements Check
[Verification that all static symbols have been removed]

## Scroll Lock Audit Results
[Performance of background locking during drawer/modal rendering]

## Mobile 375px Viewport Assessment
[Layout responsiveness, overflow analysis, and touch-target checks]

## Remaining Outstanding Issues
[Any unfinished fixes with complete technical explanations]

## Redesign Verdict
[Ready / Not Ready - one-line assessment with strict dependencies]
```

---

## Post-Pipeline

After completing Stage 5, share a concise summary in the chat:

```
A K Enterprises Storefront UI Redesign — Pipeline Complete

Modified files: [comma-separated paths from outputs/change_log.md]
Currency Conversion: [Synced / Issues outstanding]
Scroll Lock Protocol: [Implemented / Issues outstanding]
Zod Schema Form Validations: [Checkout & QuoteRequest fully protected]
Grid Wishlist Toggles: [Real-time syncing enabled]
Mobile 375px Responsive Viewport: [Pass / Issues identified]

Next: execute 'npm run build' to confirm strict type-safety compilation.
Then: export outputs/05_final_review.md for client presentation and sign-off.
```
