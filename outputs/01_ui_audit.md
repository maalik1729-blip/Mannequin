# UI/UX Audit Report — Mannequin Display Solutions (A K Enterprises)

**Auditor:** Senior UI/UX & Product Design Auditor  
**Project:** A K Enterprises Display Solutions Catalog  
**Date:** May 2026  

---

# Executive Summary

This audit evaluates the user interface (UI) and user experience (UX) of the **A K Enterprises Display Solutions** web application, focusing on the high-fashion couture catalog, wishlist, shopping cart drawer, checkout workflow, and informational pages. 

The application has been recently updated with a premium **Pearl Silk & Polished Platinum** light theme and smooth transitions, which dramatically improves brand value and aligns it with high-end designer boutiques. However, several critical usability friction points, layout inconsistencies, accessibility gaps, and trust leaks remain in the interface. Addressing these issues will significantly reduce cart abandonment, increase bulk B2B inquiry conversion, and deliver a frictionless editorial experience on mobile devices.

---

# Major UX Problems

### 1. Inconsistent Header Navigation and Anchor Jump Jumps (Severity: High)
* **The Issue**: Desktop navigation links (e.g., "Product", "About", "Enquiry", "Contact") use raw anchor hashes (`/#products`, `/#about`, etc.). If a user is on an inner page like `/wishlist` or `/product/1` and clicks "Product", the browser navigates back to the homepage but jumps abruptly or fails to scroll smoothly to the target section because of route re-mounting.
* **Why it matters**: Abrupt page jumps disrupt the premium feel. Users expect a consistent, smooth-scrolling transition regardless of which page they initiate the navigation from.

### 2. High Checkout Friction for B2B Wholesale Buyers (Severity: High)
* **The Issue**: The checkout page uses a standard B2C e-commerce checkout layout. However, a significant portion of A K Enterprises' business consists of bulk commercial accounts (boutique owners ordering 10+ mannequins, custom wedding mandaps, or decorators). There is no streamlined toggle to differentiate a **Retail Purchase** from a **Wholesale/Commercial Inquiry**, forcing bulk buyers to fill out B2C shipping details when they actually require a wholesale tax invoice (GSTIN) and commercial shipping freight quotes.
* **Why it matters**: B2B clients have distinct purchasing workflows. Forcing them into B2C shapes leads to friction, cart abandonment, and lost commercial contracts.

---

# Major UI Problems

### 1. Lack of Focus States and Focus-Visible Rings (Severity: Medium)
* **The Issue**: Interactive elements (filter pills, product cards, inputs, and custom buttons) lack clean, visible `:focus-visible` rings. When using keyboard navigation, it is extremely difficult to track the active focused item.
* **Why it matters**: A luxury editorial brand must feel inclusive. Missing focus states block keyboard-only users and reduce general accessibility.

### 2. Tiny Interaction Zones on Qty Steppers (Severity: Medium)
* **The Issue**: On the Product Details page and Cart Drawer, the increment (`+`) and decrement (`−`) buttons on the quantity steppers are only `40x40px` (smaller on the cart drawer).
* **Why it matters**: Touch targets under `48x48px` violate mobile design standards, leading to misclicks—especially for older or less-handy mobile users trying to adjust wholesale quantities.

---

# User Friction Points

### 1. Hardcoded Sold-Out Friction (Severity: High)
* **The Issue**: Sold-out products display a standard, locked "Unavailable" button with a lock icon. There is no simple, direct "Notify Me / Inquire about Restock" interactive popup, forcing users to manually navigate to the generic Enquiry form at the bottom of the homepage and type the product name themselves.
* **Why it matters**: When a premium buyer sees a piece they love is sold out, they are highly motivated. A dead end without a direct micro-action causes immediate bounce.

### 2. Truncated Search Result Lists on Desktop (Severity: Medium)
* **The Issue**: The inline search input has a fixed width (`w-36 sm:w-44 lg:w-56`). When a user types a search query, the dropdown results display names in a small, absolute-positioned container. Long editorial product names (e.g., "Textured Matte Black Male Torso Bust") get heavily truncated.
* **Why it matters**: Users cannot verify if they are clicking the correct silhouette variation, reducing search confidence.

---

# Visual Hierarchy Problems

### 1. Primary vs. Secondary CTA Clashing in Hero (Severity: Medium)
* **The Issue**: In the Hero section, the primary CTA ("Explore Collection") is a large, rounded-full gold button. The secondary CTA ("Request a Quote") is a text link with a thin animated line. On light mode, the primary button's high visual weight completely pulls attention away from "Request a Quote"—which is the highest-value conversion target for A K Enterprises' custom commercial builds.
* **Why it matters**: A B2B user looking to commission a custom mandap might miss the quote link because their eyes are forced onto the retail catalog button.

---

# Typography Problems

### 1. Serif vs. Sans-Serif Contrast Gaps (Severity: Low)
* **The Issue**: The application beautifully pairs *Cormorant Garamond* (for display headlines) and *Inter/Outfit* (for body and numeric labels). However, in forms and metadata rows, the line-height and letter-spacing of uppercase sans-serif sub-labels are too tight, causing them to blend into the body copy.
* **Why it matters**: Clean typography hierarchy is crucial for scanning. When labels look like body text, cognitive scanning speed decreases.

---

# Accessibility Problems

### 1. Contrast Ratios for Muted Secondary Copy (Severity: Medium)
* **The Issue**: Sub-labels and decorative tags styled as `text-foreground/50` or `text-foreground/40` in light mode do not meet the WCAG AA contrast ratio of 4.5:1.
* **Why it matters**: Users with low vision or those viewing screens in bright, outdoor Chennai sunlight will struggle to read product tags and descriptions.

---

# Mobile Responsiveness Problems

### 1. Wrap Layout Jumps on Filter Pills (Severity: Low)
* **The Issue**: The product categories filter pill row has horizontal scrolling enabled on mobile. However, if a user changes the currency toggle next to it, the toggle wraps awkwardly to a new line on smaller screens (below `380px`), pushing the product grid down abruptly.
* **Why it matters**: Sudden layout shifts on mobile violate Core Web Vitals (CLS) and cause visual jank.

---

# Cognitive Load Analysis

### 1. Single Long Homepage Layout (Severity: Low)
* **The Issue**: The homepage contains nine distinct sections stacked sequentially. While excellent for one-page storytelling, first-time users can experience cognitive fatigue scrolling through hero stats, marquee, categories, products, about paragraphs, enquiry forms, and footer maps all at once.
* **Why it matters**: Users have limited attention spans. Without clear visual breathing space and explicit navigation markers, they will abandon the page before reaching the Enquiry CTA.

---

# Trust & Clarity Issues

### 2. Missing Payment Security Badges on Checkout (Severity: High)
* **The Issue**: The checkout page expects credit card or payment entries but does not show SSL secure processing badges, PCI compliance logos, or clear secure gateway disclaimers.
* **Why it matters**: High-end boutique owners placing ₹50,000+ orders will not enter their card details on a site that does not explicitly guarantee bank-grade payment security.

---

# Recommended Priority Fixes

| Rank | Issue | Impact Area | Severity | Action |
| :--- | :--- | :--- | :--- | :--- |
| **1** | B2C/B2B Checkout Isolation | Checkout Page | High | Introduce a checkout-level toggle to switch between retail credit-card purchase and commercial invoice/freight quote request. |
| **2** | Payment Trust Indicators | Checkout Page | High | Add visual secure SSL logos, PCI compliance tags, and secure processor text at the final payment step. |
| **3** | Direct OOS Micro-Action | Product Details | High | Replace the generic locked "Unavailable" button with a soft "Request Re-stock Notification" button that pre-fills an enquiry modal. |
| **4** | Touch Target Expansion | Stepper Components | Medium | Scale quantity stepper buttons to a minimum of `48x48px` for touch targets on mobile viewports. |
| **5** | Accessibility Contrast Fix | index.css | Medium | Raise the opacity of `text-foreground/50` sub-labels to meet WCAG AA contrast compliance. |
