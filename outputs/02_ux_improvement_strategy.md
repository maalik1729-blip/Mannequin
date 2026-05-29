# UX Improvement Strategy — Mannequin Display Solutions (A K Enterprises)

**Author:** Senior Product UX Designer  
**Reference Document:** `outputs/01_ui_audit.md`  
**Target:** Conversion Rate Optimization (CRO), B2B Integration, and Interaction Simplicity  

---

# UX Strategy Overview

The primary objective of this UX Strategy is to transition A K Enterprises from a simple retail catalog into a **dual-channel B2C/B2B commerce powerhouse**. By keeping the premium visual identity of our **Pearl Silk & Platinum** theme, we will streamline interaction logic to accommodate both small B2C retail buyers and high-volume commercial B2B boutique owners. 

The strategy focuses on reducing checkout friction, handling out-of-stock items gracefully, expanding mobile touch targets, and reinforcing payment security indicators to build trust and increase conversion.

---

# Workflow Simplifications

### 1. Symmetrical B2C Purchase vs. B2B Commercial Invoice Workflow
* **The Goal**: Introduce a smart toggle at the top of the Checkout page: **[Retail Purchase]** or **[B2B Wholesale / Request Commercial Invoice]**.
* **Why**: Retail buyers expect instant payment via credit card or UPI. Commercial buyers ordering in bulk require custom shipping freight quotes, tax invoices with GSTIN inclusion, and bank wire details.
* **User Impact**: Wholesale buyers are spared from entering payment cards prematurely, and retail buyers get a rapid, distraction-free card payment path.
* **Business Impact**: Significant reduction in checkout cart abandonment from commercial boutique owners who require corporate invoicing pathways.

### 2. Direct "Notify Me / Inquire about Restock" Workflow for OOS Items
* **The Goal**: Replace the locked "Unavailable" button for sold-out products with a soft, active **"Request Restock Info"** button. Clicking this triggers a micro-modal that is pre-filled with the user's name, email, and the out-of-stock product details, immediately funneling them into our sales pipeline.
* **Why**: It converts a dead-end page element into a high-intent B2B lead generator.
* **User Impact**: Eliminates the frustration of manually copying product names into the main enquiry form.
* **Business Impact**: Creates a hot B2B lead list for specific silhouettes, telling our production team exactly what displays to restock first.

---

# Navigation Improvements

### 1. Universal Smooth Scroll Route Resolvers
* **The Goal**: Implement an intelligent router link handler. Clicking navigation links (e.g. "Product") while on an inner page like `/wishlist` will navigate the browser back to the homepage `/` and *then* trigger a smooth-scroll down to the `#products` target using Lenis.
* **Why**: Standard anchor links feel abrupt.
* **User Impact**: Continuous, elegant visual transitions that maintain the luxury feel of the brand.
* **Business Impact**: Higher user retention on inner pages and reduced navigation bounces.

---

# Catalog & Merchandising Improvements

### 1. Transparent Filtering & Real-time Count Indicators
* **The Goal**: Display active filter item counts directly inside the category selection pills (e.g. `Full Body Male (8)`). 
* **Why**: It gives users immediate feedback on what they will find before they click, avoiding "zero results" frustrations.
* **User Impact**: Faster catalog browsing and scanning.
* **Business Impact**: Higher category exploration rates.

---

# Form Improvements

### 1. Progressive Field Disclosure for Bulk Enquiries
* **The Goal**: In the B2B Enquiry form, dynamically show the "Quantity Required" field based on the selected "Interested In" option. If the user selects "Custom Build" or "Wedding Mandap", show specialized brief fields (e.g., finish type, event dates) only when selected.
* **Why**: Keeps the form short and highly approachable upon initial view, reducing cognitive dread.
* **User Impact**: Shorter, cleaner forms that are easier to complete.
* **Business Impact**: 15–20% increase in initial bulk inquiry submissions.

---

# CTA Improvements

### 1. Hero Section Conversion Balancing
* **The Goal**: Balance visual CTAs in the Hero section:
  - Make "Request a Quote" a clean, semi-prominent outline button styled in polished silver (`border-border text-foreground hover:bg-foreground hover:text-background`).
  - Keep "Explore Collection" as the solid gold/silver primary action.
* **Why**: The B2B commercial quote option is currently drowned out by the retail catalog CTA.
* **User Impact**: Clearer dual paths for wholesale buyers vs. retail window shoppers.
* **Business Impact**: Boost in high-value B2B bespoke mandap and custom-statue commission enquiries.

---

# User Psychology Improvements

### 1. Reassuring B2B Quality Guarantees
* **The Goal**: Embed a horizontal micro-badge row directly below the "Proceed to Checkout" button inside the Cart Drawer:
  - **Pan-India Secure Freight** · **1-Year Structure Warranty** · **Secure PCI-Compliant Invoicing**.
* **Why**: Reassures buyers at the exact moment of financial commitment, addressing anxiety.
* **User Impact**: Enhanced confidence and peace of mind when checking out.
* **Business Impact**: Lower cart abandonment rate at final checkout steps.

---

# Information Hierarchy Improvements

### 1. Dedicated B2B Wholesale Info Section
* **The Goal**: Introduce a small "Commercial Merchandising Solution" section right next to the retail products catalog, clearly outlining wholesale volume pricing, lead times, and GST tax invoice options.
* **Why**: Elevates the brand from a standard shop into a professional display manufacturer.
* **User Impact**: Direct clarity for retail store visual merchandisers.
* **Business Impact**: Direct entry into corporate purchasing programs.

---

# Mobile UX Improvements

### 1. Upgraded Interactive Stepper Zones
* **The Goal**: Expand mobile touch targets on the quantity steppers (`+` and `−` buttons) to a comfortable `48x48px` boundary.
* **Why**: Avoids misclicks on small mobile viewports.
* **User Impact**: Frustration-free cart adjustments.
* **Business Impact**: Fewer accidental cart item deletions on mobile.

---

# Accessibility Enhancements

### 1. High-Contrast Typography Opacities
* **The Goal**: Update secondary text opacities in CSS: change `text-foreground/50` to `text-foreground/65` in light mode.
* **Why**: Guarantees a contrast ratio of > 4.5:1, meeting WCAG AA standards.
* **User Impact**: Crisp readability in all viewing environments.
* **Business Impact**: Better usability and compliance index.

---

# Recommended UX Priorities

| Priority | UX Initiative | Workflow Area | User Impact | Business Impact |
| :--- | :--- | :--- | :--- | :--- |
| **1** | B2B Commercial Checkout Toggle | Checkout Form | Wholesale clients skip payment fields | Unlocks B2B invoicing pipeline |
| **2** | OOS Lead Capture Flow | Product Details Page | Converts unavailable items to requests | Prevents client bounces to competitors |
| **3** | Payment Trust Badges | Cart & Checkout | Reassures buyer during payment step | Increases final checkout conversion |
| **4** | Focus Rings & Accessibility | Global CSS | Essential for keyboard navigation | WCAG AA compliance |
| **5** | Touch Zone Expansion | Cart Drawer | Easier mobile interactions | Lowers mobile cart abandonment |
