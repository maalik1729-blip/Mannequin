# Individual Stage Commands — A K Enterprises Redesign

This document defines the individual slash commands that run each of the 5 pipeline stages.

---

## `/ui-audit`
- **Setup**: Load `GEMINI.md` to acquire project context.
- **Execution**: Run **Stage 1 (UI Audit)** from `ui-redesign.md` only.
- **Outputs**: Write `outputs/01_ui_audit.md`.
- **Chat Confirmation**: Report files read, count of high/medium/low severity findings, and top blocker identified.

---

## `/ux-strategy`
- **Setup**: Load `GEMINI.md`. Read `outputs/01_ui_audit.md` (halt if missing).
- **Execution**: Run **Stage 2 (UX Strategy)** from `ui-redesign.md` only.
- **Outputs**: Write `outputs/02_ux_strategy.md`.
- **Chat Confirmation**: Report the target multi-currency B2B/B2C architecture and scroll lock solution.

---

## `/visual-tokens`
- **Setup**: Load `GEMINI.md`. Read `outputs/01_ui_audit.md` and `outputs/02_ux_strategy.md`.
- **Execution**: Run **Stage 3 (Design Tokens + Visual Direction)** from `ui-redesign.md` only.
- **Outputs**: Write `outputs/03_visual_tokens.md` and append visual tokens block inside `src/index.css`.
- **Chat Confirmation**: Verify HSL tokens mapped and Tailwind custom theme elements extended.

---

## `/component-fixes`
- **Setup**: Load `GEMINI.md`. Read `outputs/03_visual_tokens.md` and `outputs/02_ux_strategy.md`.
- **Execution**: Run **Stage 4 (Component Fixes)** from `ui-redesign.md` only.
- **Outputs**: Write `outputs/04_change_plan.md` and modify specified files inside `src/`.
- **Chat Confirmation**: Document all files edited in `outputs/change_log.md` and list line ranges modified.

---

## `/ux-review`
- **Setup**: Load `GEMINI.md`. Read `outputs/04_change_plan.md` (halt if missing).
- **Execution**: Run **Stage 5 (Final Review)** from `ui-redesign.md` only.
- **Outputs**: Write `outputs/05_final_review.md`.
- **Verification**: Simulate mobile viewport sizes (e.g. 375px) on the checkout, quote request, and product details routes using a browser agent or manual testing to ensure layout responsiveness.
