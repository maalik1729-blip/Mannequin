# Agent Rules — A K Enterprises Mannequin Storefront Redesign

## Scope Enforcement (Highest Priority)
- **NEVER modify**: `package.json`, `vite.config.ts`, `postcss.config.js`, `tsconfig.json`, `eslint.config.js`, or any file outside the `src/` directory.
- **NEVER add new npm packages**: utilize what is currently installed in the workspace (Vite, React 18, React Router v6, Radix, Tailwind v3, Lucide React, etc.).
- **NEVER edit outputs** from previously completed stages. If a re-run occurs, append a `_v2` suffix to the file name.
- **ALL modifications** are strictly confined to the `src/` directory only.

---

## Code Rules
- **TypeScript Only**: No raw JavaScript files allowed inside `src/`. All new or modified files must enforce type safety.
- **Tailwind-First Utility Classes**: Styling must rely on Tailwind utility classes. Do not use inline `style={}` objects unless the desired visual property cannot be expressed via Tailwind.
- **Theme Variables single source of truth**: Use the custom HSL design tokens (`--background`, `--foreground`, `--primary`, `--gold`, etc.) defined inside `src/index.css` for both light (Pearl Silk) and dark (Espresso Obsidian) modes.
- **Dynamic Multi-Currency Pricing**: Every price string rendered in any card, drawer, checkout total, or spec sheet must be formatted dynamically through the `useCurrency` `format` hook. Hardcoded currency symbols (`₹` or `$`) in text strings are prohibited.
- **Component Libraries**: Do not introduce any external UI libraries. Limit components to what exists in `src/components/ui/` or Radix primitives.

---

## Quality Rules
- **TypeScript Validity**: Every change must compile without TypeScript warnings or errors. Do not insert `@ts-ignore` comments.
- **Robust B2B/B2C Validations**: Checkout and custom quote request forms must implement complete client-side Zod validation schemas with descriptive error message feedback.
- **Scroll Lock Protocol**: Overlay drawers (`CartDrawer`) and product details modals must lock background body scrolling. Adjust the `useLenis()` hook states or toggle a scroll-lock class to avoid touch-device scroll leak.
- **Wishlist Syncing**: Heart favorites toggled inside homepage collection cards must instantly sync their visual state with related product card selections without requiring a manual page refresh.
- **Touch Target Accessibility**: All interactive elements (buttons, selectors, toggles) must maintain a minimum height/width of 44px (`h-11` or `min-h-[44px]`) on mobile devices.

---

## Communication Rules
- **After Each Stage**: Output a concise, three-line report in the agent chat:
  - **Line 1**: Files read
  - **Line 2**: Files written or modified
  - **Line 3**: Top finding or development blocker
- **Missing Inputs**: If a required output file from a prior stage is missing, halt execution and ask the user to run the preceding command.
- **Directory Audit**: If an expected source file is missing from a specified route path, list the active directory contents in the chat before executing any fallback logic.

---

## Output Rules
- **Documentation Folder**: The `outputs/` folder must contain only markdown files (`.md`). Do not save active source code inside this folder.
- **Change Log Tracking**: Document every single source file modified during Stage 4 inside `ui_redesign/outputs/change_log.md` using the exact format:
  `[timestamp] | [file path] | [summary of what changed]`
