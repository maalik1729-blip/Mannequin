# A K Enterprises Mannequin Storefront UI Redesign — Antigravity Workflow

Frontend-only e-commerce redesign pipeline for luxury retail showcases, bespoke visual merchandising, and multi-currency B2B/B2C transactions. No backend or build environment changes.

---

## Setup (One Time)

1. Ensure this entire `ui_redesign/` folder is placed directly in the root of the Mannequin project:

   ```
   Mannequin/
   ├── ui_redesign/        ← drop here
   ├── src/
   ├── package.json
   └── ...
   ```

2. Open the Mannequin folder as a Workspace in Antigravity:
   `Agent Manager → + Open Workspace → select Mannequin/`

3. Antigravity will automatically load `GEMINI.md` and this workflow setup.

---

## How to Run

Full pipeline (all 5 stages, executed sequentially):
```
/ui-redesign
```

Individual stages (should be run in chronological order):
```
/ui-audit          ← audits src/ code & styles, writes outputs/01_ui_audit.md
/ux-strategy       ← defines state sync & schema strategy, writes outputs/02_ux_strategy.md
/visual-tokens     ← maps colors, typography & transitions, writes outputs/03_visual_tokens.md
/component-fixes   ← implements React code fixes, writes outputs/04_change_plan.md
/ux-review         ← runs multi-viewport mobile checks, writes outputs/05_final_review.md
```

---

## What Gets Changed

| Stage | Output docs | Actual src/ changes |
|-------|-------------|---------------------|
| **1 — Audit** | `outputs/01_ui_audit.md` | None (Read-only analysis) |
| **2 — Strategy** | `outputs/02_ux_strategy.md` | None (Architecture validation blueprint) |
| **3 — Tokens** | `outputs/03_visual_tokens.md` | `src/index.css` (adds premium tokens & animations) |
| **4 — Fixes** | `outputs/04_change_plan.md` | `src/pages/Checkout.tsx` (Zod schemas, currency sync) |
| | | `src/pages/QuoteRequest.tsx` (Zod validation, responsive improvements) |
| | | `src/pages/ProductDetails.tsx` (Lenis lock modal, B2B restock sync) |
| | | `src/components/site/Products.tsx` (Wishlist favorite sync, price converters) |
| | | `src/components/site/CartDrawer.tsx` (Lenis locking, currency formatting) |
| | | `src/hooks/useLenis.ts` (adds scroll block/enable triggers) |
| **5 — Review** | `outputs/05_final_review.md` | None (Final QA checks) |

---

## What Does NOT Get Changed

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `eslint.config.js`
- `postcss.config.js`
- `node_modules/`
- Any non-source configurations

---

## After the Pipeline

Run the local dev command in the terminal to verify no TypeScript compilation or styling conflicts exist:
```powershell
npm run dev
```

Build the production bundle to confirm strict type safety:
```powershell
npm run build
```

If the build completes successfully, review the final walkthrough in `outputs/05_final_review.md` for client sign-off.

---

## Project Structure After Pipeline Runs

```
Mannequin/
├── ui_redesign/              ← pipeline directory (do not delete)
│   ├── GEMINI.md
│   ├── README.md
│   ├── project-rules.md
│   ├── stages.md
│   ├── ui-redesign.md
│   └── outputs/              ← pipeline output documents are saved here
│       ├── 01_ui_audit.md
│       ├── 02_ux_strategy.md
│       ├── 03_visual_tokens.md
│       ├── 04_change_plan.md
│       ├── 05_final_review.md
│       └── change_log.md     ← chronological record of all file updates
├── src/                      ← source code directory
│   ├── index.css             ← custom luxury design tokens and transition classes
│   ├── hooks/
│   │   └── useLenis.ts       ← Lenis scrolling lock functions
│   ├── components/site/
│   │   ├── Products.tsx      ← synced currency displays & wishlist favorites
│   │   └── CartDrawer.tsx    ← responsive multi-currency cart line items
│   └── pages/
│       ├── ProductDetails.tsx← scroll-locked restock modal
│       ├── Checkout.tsx      ← multi-tier checkout validations (Zod)
│       └── QuoteRequest.tsx  ← custom bespoke quotation request form
└── ...
```
