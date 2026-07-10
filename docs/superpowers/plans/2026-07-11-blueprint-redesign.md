# Blueprint/Technical Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current obsidian-dark/neon (indigo-cyan-purple) visual theme with a navy blueprint/engineering-schematic theme across the public site and `/admin`, without changing layout structure, fonts, or content.

**Architecture:** Change design tokens and shared CSS classes in `src/app/globals.css` first (this cascades to every component via CSS variables and shared classes like `.card`, `.az-btn`, `.eyebrow`), then walk each component top-to-bottom recoloring hardcoded inline styles that don't use CSS variables, adding `FIG. 0X`-style mono annotation labels, and swapping the spotlight+tilt hover effect for a CSS-only corner-bracket hover effect.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4 (CSS-based `@theme` config, no `tailwind.config`), plain inline `style={{}}` props (no CSS-in-JS library) plus global utility classes in `globals.css`.

## Global Constraints

- No test framework is configured in this repo — verification is manual (dev server) plus `bun run lint`. Every task's "verify" step uses this pattern, not automated tests.
- Fonts unchanged: Plus Jakarta Sans (display/body) + JetBrains Mono (labels/mono). Do not touch the `@import` or `--font-*` vars.
- Radius unchanged: `--radius: 16px`, `--radius-sm: 10px`. Do not change border-radius values anywhere.
- Semantic colors unchanged: `--color-ok` (success/status) and `--color-danger` (destructive actions) keep their current values everywhere — never remap these to blue or amber.
- Dark-mode only — do not add a light theme or `prefers-color-scheme` handling.
- No copy/content changes — do not edit any user-facing text except the small annotation labels explicitly specified in each task (e.g. `FIG. 01`).
- No layout restructuring — grid spans, breakpoints, and DOM structure stay as they are; only colors, borders, gradients, hover behavior, and label text change.
- Package manager is Bun — use `bun run lint`, not `npm`/`yarn`.

## File Structure

| File | Responsibility | Change type |
|---|---|---|
| `src/app/globals.css` | Design tokens (`@theme`), shared classes (`.card`, `.az-btn`, ambient blobs, hover effects) | Full rewrite of specific blocks |
| `src/components/ui/Motion.tsx` | Progressive-enhancement JS (cursor spotlight, 3D tilt, ambient parallax) | Remove spotlight+tilt listeners, keep ambient parallax |
| `src/components/ui/Nav.tsx` | Sticky nav pill | Recolor + relabel |
| `src/components/ui/Footer.tsx` | Site footer | Recolor + relabel |
| `src/components/ui/Hero.tsx` | Landing hero section | Recolor + relabel + remove gradient text-clip |
| `src/components/ui/Projects.tsx` | Project grid + featured architecture mock | Recolor + `FIG.` labels |
| `src/components/ui/ProjectLinks.tsx` | Project link-picker modal | Recolor |
| `src/components/ui/Skills.tsx` | Skill category cards | Recolor (collapse per-category hues to blue+1 amber) |
| `src/components/ui/TechRadar.tsx` | SVG radar chart | Recolor gradients/strokes |
| `src/components/ui/Experience.tsx` | Career timeline | Recolor |
| `src/components/ui/About.tsx` | Principles/focus-areas section | Recolor |
| `src/components/ui/Contact.tsx` | Contact cards | Recolor, unify hover hues |
| `src/components/admin/AdminShell.tsx` | Admin CMS shell (sidebar active-tab indicator) | Recolor sidebar active state only |

No changes needed to `src/components/ui/SectionKicker.tsx` — it only uses the `.eyebrow` class and `var(--color-fg-strong)`/`var(--color-muted)`, both of which pick up the new palette automatically once Task 1 lands.

---

### Task 1: Global design tokens & shared CSS (`src/app/globals.css`)

**Files:**
- Modify: `src/app/globals.css` (full file)

**Interfaces:**
- Produces: CSS custom properties consumed by every component — `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-fg-strong`, `--color-fg`, `--color-muted`, `--color-faint`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-accent-warm` (new), `--color-ok`, `--color-danger`. **Removes** `--color-accent-cyan` and `--color-accent-purple` — later tasks must replace every remaining usage of these two.
- Produces: `.grid-paper` utility class (new) — grid-paper background pattern, usable on any element.
- Produces: corner-bracket hover effect on `.card`/`.az-card` (replaces old radial-spotlight `::after`), triggered by plain `:hover` (no longer needs a JS-added `.is-lit` class).

- [ ] **Step 1: Replace the file**

Replace the entire contents of `src/app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@import 'tailwindcss';

@theme {
  /* Colors — navy blueprint/schematic */
  --color-bg: #0e1b2e;
  --color-surface: rgba(20, 36, 60, 0.55);
  --color-surface-2: rgba(27, 46, 74, 0.8);
  --color-fg-strong: #ffffff;
  --color-fg: #eaf1fb;
  --color-muted: #9cc0ea;
  --color-faint: #5d7ba3;
  --color-border: rgba(127, 168, 214, 0.16);
  --color-border-strong: rgba(127, 168, 214, 0.32);

  /* Single accent system: blue rules/borders + one warm contrast for CTAs */
  --color-accent: #4a7fc0;
  --color-accent-warm: #d97b3f;
  --color-ok: #10b981;
  --color-danger: #ef4444;

  /* Fonts */
  --font-display: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Shape */
  --radius: 16px;
  --radius-sm: 10px;

  /* Custom Animations */
  --animate-az-pulse: azPulse 2.4s ease-in-out infinite;
  --animate-radar-sweep: radarSweep 12s linear infinite;
  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-slow: pulseSlow 4s ease-in-out infinite;
  --animate-glow-border: glowBorder 8s linear infinite;

  @keyframes azPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
  @keyframes radarSweep {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulseSlow {
    0%, 100% { opacity: 0.45; filter: blur(40px); }
    50% { opacity: 0.7; filter: blur(28px); }
  }
  @keyframes glowBorder {
    0%, 100% { border-color: rgba(74, 127, 192, 0.15); }
    50% { border-color: rgba(217, 123, 63, 0.3); }
  }
}

@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: rgba(127, 168, 214, 0.14) transparent;
    background-color: var(--color-bg);
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(127, 168, 214, 0.14);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(127, 168, 214, 0.24);
  }

  body {
    margin: 0;
    max-width: 100vw;
    overflow-x: hidden;
    background-color: var(--color-bg);
    background-image:
      linear-gradient(rgba(127, 168, 214, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(127, 168, 214, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    color: var(--color-fg);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.015em;
  }

  ::selection {
    background: rgba(74, 127, 192, 0.35);
    color: var(--color-fg-strong);
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--color-faint);
  }

  textarea {
    resize: vertical;
  }
}

@layer components {
  /* Scroll reveal — toggled by useRevealOnScroll */
  .az-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .az-reveal.is-visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .az-reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  /* Grid-paper pattern — reusable on any element (nav, footer, cards) */
  .grid-paper {
    background-image:
      linear-gradient(rgba(127, 168, 214, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(127, 168, 214, 0.12) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* ── Bento grid ─────────────────────────────────────── */
  .bento {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px) {
    .bento {
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
    }
  }
  @media (max-width: 560px) {
    .bento {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }

  /* Responsive column spans */
  .span-12 { grid-column: span 12; }
  .span-8 { grid-column: span 8; }
  .span-6 { grid-column: span 6; }
  .span-4 { grid-column: span 4; }

  @media (max-width: 900px) {
    .span-12 { grid-column: span 6; }
    .span-8 { grid-column: span 6; }
    .span-6 { grid-column: span 6; }
    .span-4 { grid-column: span 3; }
  }
  @media (max-width: 560px) {
    .span-12, .span-8, .span-6, .span-4 {
      grid-column: span 2;
    }
  }

  /* Featured project card */
  .feat-card {
    grid-template-columns: 1.15fr 1fr;
  }
  @media (max-width: 768px) {
    .feat-card {
      grid-template-columns: 1fr !important;
    }
    .feat-card > div:last-child {
      border-left: none !important;
      border-top: 1px solid var(--color-border);
    }
  }

  /* Card surface — glassmorphism over the blueprint grid */
  .card {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 4px 24px rgba(0, 0, 0, 0.4);
  }
  .card-hover {
    transition:
      border-color 0.3s,
      background 0.3s,
      transform 0.3s,
      box-shadow 0.3s;
  }
  .card-hover:hover {
    border-color: rgba(217, 123, 63, 0.4);
    background: rgba(27, 46, 74, 0.6);
    transform: translateY(-3px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 12px 32px rgba(74, 127, 192, 0.12);
  }
  .card-pad {
    padding: 30px;
  }
  @media (max-width: 560px) {
    .card-pad {
      padding: 20px;
    }
  }

  /* ── Motion: corner-bracket hover (replaces spotlight + tilt) ──── */
  .card,
  .az-card {
    overflow: hidden;
  }
  .card::after,
  .az-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    background-repeat: no-repeat;
    background-image:
      linear-gradient(to right, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to bottom, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to left, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to bottom, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to left, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to top, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to right, var(--color-accent-warm) 2px, transparent 2px),
      linear-gradient(to top, var(--color-accent-warm) 2px, transparent 2px);
    background-size:
      16px 2px, 2px 16px,
      16px 2px, 2px 16px,
      16px 2px, 2px 16px,
      16px 2px, 2px 16px;
    background-position:
      top left, top left,
      top right, top right,
      bottom right, bottom right,
      bottom left, bottom left;
  }
  .card:hover::after,
  .az-card:hover::after {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .card::after,
    .az-card::after {
      display: none;
    }
  }

  /* Ambient glowing backdrop blobs — recolored, kept subtle under the grid */
  .ambient {
    position: absolute;
    top: -240px;
    left: 50%;
    width: 1100px;
    height: 700px;
    max-width: 140vw;
    transform: translateX(-50%);
    background: radial-gradient(
      closest-side,
      rgba(74, 127, 192, 0.14) 0%,
      rgba(217, 123, 63, 0.05) 50%,
      transparent 100%
    );
    filter: blur(45px);
    pointer-events: none;
    z-index: 0;
    animation: pulseSlow 10s ease-in-out infinite;
  }

  .ambient-2 {
    position: absolute;
    top: 1200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      closest-side,
      rgba(217, 123, 63, 0.08) 0%,
      transparent 100%
    );
    filter: blur(50px);
    pointer-events: none;
    z-index: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .ambient, .ambient-2 {
      display: none;
    }
  }

  /* Eyebrow labels — reused for FIG.-style annotations */
  .eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  /* Tech micro-card */
  .tech-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: rgba(127, 168, 214, 0.03);
    font-size: 13px;
    font-family: var(--font-mono);
    color: var(--color-muted);
    transition: all 0.25s ease;
  }
  .tech-card:hover {
    border-color: rgba(74, 127, 192, 0.4);
    color: var(--color-fg-strong);
    background: rgba(74, 127, 192, 0.08);
    transform: translateY(-1px);
  }

  /* ── Buttons ────────────────────────────────────────── */
  .az-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #0e1b2e;
    background: var(--color-accent-warm);
    border: 1px solid rgba(217, 123, 63, 0.6);
    border-radius: var(--radius-sm);
    padding: 10px 18px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 12px rgba(217, 123, 63, 0.2);
  }
  .az-btn:hover {
    background: #e58a4f;
    transform: translateY(-1.5px);
    box-shadow: 0 6px 16px rgba(217, 123, 63, 0.3);
  }

  .az-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-fg);
    background: rgba(127, 168, 214, 0.04);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    padding: 10px 18px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
    backdrop-filter: blur(8px);
  }
  .az-btn-ghost:hover {
    border-color: rgba(74, 127, 192, 0.5);
    background: rgba(74, 127, 192, 0.08);
    color: var(--color-fg-strong);
    transform: translateY(-1px);
  }

  /* Interactive surface card */
  .az-card {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 4px 20px rgba(0, 0, 0, 0.35);
    transition:
      border-color 0.3s,
      background 0.3s,
      transform 0.3s,
      box-shadow 0.3s;
  }
  .az-card:hover {
    border-color: rgba(217, 123, 63, 0.4);
    background: rgba(27, 46, 74, 0.65);
    transform: translateY(-3px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 12px 30px rgba(74, 127, 192, 0.12);
  }

  /* Floating Navbar Links */
  .az-navlink {
    font-size: 13.5px;
    font-weight: 500;
    text-decoration: none;
    color: var(--color-muted);
    transition: all 0.2s ease;
    padding: 6px 12px;
    border-radius: 99px;
  }
  .az-navlink:hover {
    color: var(--color-fg-strong);
    background: rgba(127, 168, 214, 0.08);
  }

  /* Form fields */
  .az-input,
  .az-textarea {
    width: 100%;
    font-family: inherit;
    font-size: 14.5px;
    color: var(--color-fg);
    background: rgba(127, 168, 214, 0.03);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 12px 16px;
    outline: none;
    transition: all 0.25s ease;
  }
  .az-textarea {
    font-size: 14px;
    line-height: 1.6;
  }
  .az-input:focus,
  .az-textarea:focus {
    border-color: var(--color-accent);
    background: rgba(74, 127, 192, 0.05);
    box-shadow: 0 0 0 3px rgba(74, 127, 192, 0.18);
  }

  /* Icon button */
  .az-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--color-muted);
    background: rgba(127, 168, 214, 0.04);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .az-icon-btn:hover {
    color: var(--color-fg-strong);
    background: rgba(127, 168, 214, 0.1);
    border-color: var(--color-border-strong);
    transform: scale(1.03);
  }
  .az-icon-btn-danger:hover {
    color: #fff;
    background: var(--color-danger);
    border-color: var(--color-danger);
  }

  /* Sidebar link (admin) */
  .az-side-link {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: inherit;
    font-size: 13.5px;
    text-align: left;
    color: var(--color-muted);
    background: none;
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 12px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .az-side-link:hover {
    background: rgba(127, 168, 214, 0.08);
    color: var(--color-fg-strong);
  }
  .az-side-link-danger:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }

  /* Project link option row (modal) */
  .az-link-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: rgba(127, 168, 214, 0.03);
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .az-link-option:hover {
    border-color: var(--color-border-strong);
    background: rgba(74, 127, 192, 0.08);
    transform: translateX(2px);
  }

  /* Resume file input */
  .az-resume-input {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-muted);
  }
  .az-resume-input::file-selector-button {
    margin-right: 12px;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 12.5px;
    color: var(--color-fg-strong);
    background: rgba(127, 168, 214, 0.04);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    padding: 8px 12px;
    transition: background 0.2s;
  }
  .az-resume-input::file-selector-button:hover {
    background: rgba(127, 168, 214, 0.1);
  }

  /* Admin shell */
  .admin-shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 252px 1fr;
    background-color: var(--color-bg);
    background-image:
      linear-gradient(rgba(127, 168, 214, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(127, 168, 214, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  @media (max-width: 768px) {
    .admin-shell {
      grid-template-columns: 1fr;
    }
    .admin-sidebar {
      position: static !important;
      height: auto !important;
    }
  }

  /* Experience timeline rows */
  .exp-row {
    grid-template-columns: 190px 1fr;
  }
  @media (max-width: 720px) {
    .exp-row {
      grid-template-columns: 1fr;
      gap: 12px !important;
    }
  }

  /* Admin rows */
  .az-row {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: rgba(127, 168, 214, 0.01);
    transition: border-color 0.25s;
  }
  .az-row:hover {
    border-color: var(--color-border-strong);
  }
}
```

Note what changed vs. the old file: `--color-accent-cyan` and `--color-accent-purple` are **gone** — Tasks 3–12 fix every remaining reference to them. The old `.tilt` class (3D transform) is **gone** — Task 2 removes its only two usages in JSX. The `.card::after`/`.az-card::after` spotlight is now a corner-bracket effect triggered by `:hover` directly (the `.is-lit` class is no longer required, so Task 2 can safely delete the JS that added it). Task 12's admin sidebar fix is a separate inline-style change in `AdminShell.tsx`, not a new CSS class.

- [ ] **Step 2: Verify no build errors**

Run: `bun run lint`
Expected: no new errors (CSS isn't linted by ESLint, but this catches any accidental TSX breakage — there should be none yet since no `.tsx` files changed in this task).

- [ ] **Step 3: Visual check**

Start the dev server (`bun dev`) if not already running, open `/`. Expect: page background is now deep navy with a faint blue grid pattern, cards have a blue-ish translucent border, primary buttons (e.g. "Explore Projects" in the hero) are solid amber instead of white. Colors elsewhere will look inconsistent until later tasks land — that's expected at this point.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style: rework design tokens to navy blueprint theme"
```

---

### Task 2: Remove spotlight/tilt JS (`src/components/ui/Motion.tsx`)

**Files:**
- Modify: `src/components/ui/Motion.tsx`

**Interfaces:**
- Consumes: none new.
- Produces: no exports change (still a default no-render effect component); only its internal side effects shrink to ambient parallax only.

- [ ] **Step 1: Remove the cursor-spotlight and 3D-tilt blocks**

In `src/components/ui/Motion.tsx`, replace the whole `useEffect` body. Old code (lines 14–91) is:

```tsx
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: Array<() => void> = [];

    // ── Cursor spotlight ──────────────────────────────────────────
    const lit = Array.from(
      document.querySelectorAll<HTMLElement>('.card, .az-card')
    );
    lit.forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.classList.add('is-lit');
      };
      const leave = () => el.classList.remove('is-lit');
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

    // ── 3D tilt ───────────────────────────────────────────────────
    const tilts = Array.from(document.querySelectorAll<HTMLElement>('.tilt'));
    tilts.forEach((el) => {
      // pointermove is already coalesced to the frame rate by the browser,
      // so applying directly stays smooth without an extra rAF hop.
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${px * 5}deg) rotateX(${
          -py * 5
        }deg)`;
      };
      const leave = () => {
        el.style.transform = '';
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

    // ── Ambient parallax (mouse + scroll) ─────────────────────────
    const ambient = document.querySelector<HTMLElement>('.ambient');
    if (ambient) {
      let mx = 0;
      let my = 0;
      let sy = 0;
      const apply = () => {
        ambient.style.transform = `translate(calc(-50% + ${mx}px), ${sy + my}px)`;
      };
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 44;
        my = (e.clientY / window.innerHeight - 0.5) * 30;
        apply();
      };
      const onScroll = () => {
        sy = window.scrollY * 0.14;
        apply();
      };
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('scroll', onScroll);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
```

New code:

```tsx
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: Array<() => void> = [];

    // ── Ambient parallax (mouse + scroll) ─────────────────────────
    const ambient = document.querySelector<HTMLElement>('.ambient');
    if (ambient) {
      let mx = 0;
      let my = 0;
      let sy = 0;
      const apply = () => {
        ambient.style.transform = `translate(calc(-50% + ${mx}px), ${sy + my}px)`;
      };
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 44;
        my = (e.clientY / window.innerHeight - 0.5) * 30;
        apply();
      };
      const onScroll = () => {
        sy = window.scrollY * 0.14;
        apply();
      };
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('scroll', onScroll);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
```

Also update the file's leading comment block (lines 5–12) from:

```tsx
/**
 * Progressive-enhancement motion layer. Attaches listeners to already-rendered
 * DOM so server components stay clean:
 *  - cursor spotlight on `.card` / `.az-card`
 *  - subtle 3D tilt on `.tilt`
 *  - ambient blob parallax (mouse + scroll)
 * Fully disabled under `prefers-reduced-motion`.
 */
```

to:

```tsx
/**
 * Progressive-enhancement motion layer. Attaches listeners to already-rendered
 * DOM so server components stay clean:
 *  - ambient blob parallax (mouse + scroll)
 * Fully disabled under `prefers-reduced-motion`. Card hover feedback (corner
 * brackets) is pure CSS — see `.card::after` / `.az-card::after` in globals.css.
 */
```

- [ ] **Step 2: Verify**

Run: `bun run lint`
Expected: no errors (no unused imports were introduced — `useEffect` is still used).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Motion.tsx
git commit -m "refactor: drop cursor-spotlight and 3D-tilt JS, keep ambient parallax"
```

---

### Task 3: Nav (`src/components/ui/Nav.tsx`)

**Files:**
- Modify: `src/components/ui/Nav.tsx`

- [ ] **Step 1: Recolor the nav pill and logo, add grid-paper background**

Replace the `<nav>` opening style block (lines 60–81):

```tsx
      <nav
        style={{
          width: '100%',
          maxWidth: 1200,
          background: scrolled
            ? 'rgba(10, 10, 20, 0.75)'
            : 'rgba(13, 13, 23, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 99,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 20px',
          pointerEvents: 'auto',
          boxShadow: scrolled
            ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            : '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
```

with:

```tsx
      <nav
        className='grid-paper'
        style={{
          width: '100%',
          maxWidth: 1200,
          background: scrolled
            ? 'rgba(14, 27, 46, 0.85)'
            : 'rgba(14, 27, 46, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--color-border)',
          borderRadius: 99,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 20px',
          pointerEvents: 'auto',
          boxShadow: scrolled
            ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            : '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
```

- [ ] **Step 2: Recolor the logo mark from circular gradient to squared mono mark**

Replace (lines 94–112):

```tsx
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              border: '1.5px solid transparent',
              background: 'linear-gradient(var(--color-bg), var(--color-bg)) padding-box, linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-cyan) 100%) border-box',
              borderRadius: '50%',
              fontWeight: 700,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-fg-strong)',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
            }}
          >
            AZ
          </span>
```

with:

```tsx
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              border: '1.5px solid var(--color-accent)',
              background: 'var(--color-bg)',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-fg-strong)',
              boxShadow: '0 2px 8px rgba(74, 127, 192, 0.25)',
            }}
          >
            AZ
          </span>
```

- [ ] **Step 3: Add a mono index label under the active desktop link**

Replace the desktop links block (lines 127–144):

```tsx
        <div className='hidden items-center gap-2 md:flex'>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className='az-navlink'
              style={
                active === l.id
                  ? {
                      color: 'var(--color-fg-strong)',
                      background: 'rgba(255, 255, 255, 0.06)',
                    }
                  : undefined
              }
            >
              {l.label}
            </a>
          ))}
```

with:

```tsx
        <div className='hidden items-center gap-2 md:flex'>
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={l.href}
              className='az-navlink'
              style={
                active === l.id
                  ? {
                      color: 'var(--color-fg-strong)',
                      background: 'rgba(74, 127, 192, 0.12)',
                      borderBottom: '1px solid var(--color-accent)',
                    }
                  : undefined
              }
            >
              {String(i + 1).padStart(2, '0')} · {l.label}
            </a>
          ))}
```

- [ ] **Step 4: Recolor the mobile dropdown drawer**

Replace (lines 190–208):

```tsx
            style={{
              position: 'absolute',
              top: 68,
              left: 0,
              right: 0,
              background: 'rgba(10, 10, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 24,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6)',
              zIndex: 49,
            }}
```

with:

```tsx
            style={{
              position: 'absolute',
              top: 68,
              left: 0,
              right: 0,
              background: 'rgba(14, 27, 46, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--color-border)',
              borderRadius: 24,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6)',
              zIndex: 49,
            }}
```

- [ ] **Step 5: Verify**

Run: `bun run lint`. Then check `/` in the browser: nav pill shows a faint grid pattern, logo is a squared outlined "AZ" mark, active link shows an index number + underline in blue, Résumé button is amber (from Task 1's `.az-btn`).

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Nav.tsx
git commit -m "style: reskin nav to blueprint theme"
```

---

### Task 4: Footer (`src/components/ui/Footer.tsx`)

**Files:**
- Modify: `src/components/ui/Footer.tsx` (full file — it's only 57 lines)

- [ ] **Step 1: Replace the whole file**

```tsx
export default function Footer() {
  return (
    <footer
      className='grid-paper'
      style={{
        borderTop: '1px solid var(--color-border)',
        marginTop: 100,
        background: 'rgba(14, 27, 46, 0.4)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13.5, color: 'var(--color-muted)' }}>
            © {new Date().getFullYear()} Abdul Azis
          </span>
          <div style={{ width: 1, height: 12, background: 'var(--color-border)' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-ok)',
                boxShadow: '0 0 6px var(--color-ok)',
              }}
            />
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
              Operational status: Normal
            </span>
          </div>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            color: 'var(--color-faint)',
            letterSpacing: '-0.01em',
          }}
        >
          REV. {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')} — FIG. 12
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `bun run lint`. Check `/`: footer top border is blue, grid pattern faintly visible, right side reads `REV. 2026.07 — FIG. 12` in mono.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Footer.tsx
git commit -m "style: reskin footer to blueprint theme with technical stamp"
```

---

### Task 5: Hero (`src/components/ui/Hero.tsx`)

**Files:**
- Modify: `src/components/ui/Hero.tsx`

- [ ] **Step 1: Unify metric icon/glow colors to blue and update the eyebrow label**

Replace the `METRICS` array (lines 4–23):

```tsx
const METRICS = [
  {
    value: '5+ Years',
    label: 'Shipping production software',
    icon: <Calendar size={18} style={{ color: 'var(--color-accent)' }} />,
    color: 'rgba(99, 102, 241, 0.1)'
  },
  {
    value: 'Web & Mobile',
    label: 'Full-stack platform depth',
    icon: <Smartphone size={18} style={{ color: 'var(--color-accent-cyan)' }} />,
    color: 'rgba(6, 182, 212, 0.1)'
  },
  { 
    value: '60fps UI', 
    label: 'Fluid rendering benchmark', 
    icon: <Sparkles size={18} style={{ color: 'var(--color-accent-purple)' }} />,
    color: 'rgba(168, 85, 247, 0.1)'
  },
];
```

with:

```tsx
const METRICS = [
  {
    value: '5+ Years',
    label: 'Shipping production software',
    icon: <Calendar size={18} style={{ color: 'var(--color-accent)' }} />,
    color: 'rgba(74, 127, 192, 0.1)'
  },
  {
    value: 'Web & Mobile',
    label: 'Full-stack platform depth',
    icon: <Smartphone size={18} style={{ color: 'var(--color-accent)' }} />,
    color: 'rgba(74, 127, 192, 0.1)'
  },
  { 
    value: '60fps UI', 
    label: 'Fluid rendering benchmark', 
    icon: <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />,
    color: 'rgba(74, 127, 192, 0.1)'
  },
];
```

- [ ] **Step 2: Add grid-paper to the headline card, relabel the eyebrow**

Replace (lines 30–46):

```tsx
        <div
          className='card card-pad az-reveal span-8'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 380,
            padding: '36px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span className='eyebrow'>
              <TermIcon size={12} />
              Software Engineer
            </span>
          </div>
```

with:

```tsx
        <div
          className='card card-pad az-reveal span-8 grid-paper'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 380,
            padding: '36px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span className='eyebrow'>
              <TermIcon size={12} />
              FIG. 01 — Software Engineer
            </span>
          </div>
```

- [ ] **Step 3: Replace the gradient text-clip headline with solid white + amber underline**

Replace (lines 51–70):

```tsx
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4.2vw, 52px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  color: 'var(--color-fg-strong)',
                }}
              >
                Building software that{' '}
                <span style={{
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-cyan) 50%, var(--color-accent-purple) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  feels native
                </span>{' '}
                and ships on time.
              </h1>
```

with:

```tsx
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4.2vw, 52px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  color: 'var(--color-fg-strong)',
                }}
              >
                Building software that{' '}
                <span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--color-accent-warm)',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '4px',
                }}>
                  feels native
                </span>{' '}
                and ships on time.
              </h1>
```

- [ ] **Step 4: Recolor the radar card, drop the `tilt` class**

Replace (lines 102–111):

```tsx
        <div
          className='card card-pad az-reveal span-4 tilt'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 380,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
            background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 50%), var(--color-surface)',
          }}
        >
```

with:

```tsx
        <div
          className='card card-pad az-reveal span-4'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 380,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
            background: 'radial-gradient(circle at top right, rgba(74, 127, 192, 0.06), transparent 50%), var(--color-surface)',
          }}
        >
```

- [ ] **Step 5: Verify**

Run: `bun run lint`. Check `/`: hero eyebrow reads "FIG. 01 — Software Engineer", headline is solid white with "feels native" amber-underlined (no gradient text), all 3 metric icons are the same blue, radar card no longer tilts on mouse move (still has border/hover from `.card`).

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Hero.tsx
git commit -m "style: reskin hero to blueprint theme, drop gradient text and tilt"
```

---

### Task 6: Projects & ProjectLinks (`src/components/ui/Projects.tsx`, `src/components/ui/ProjectLinks.tsx`)

**Files:**
- Modify: `src/components/ui/Projects.tsx`
- Modify: `src/components/ui/ProjectLinks.tsx`

- [ ] **Step 1: Recolor `ARCHITECTURE_LAYERS` and the mock card**

In `Projects.tsx`, replace (lines 16–25):

```tsx
const ARCHITECTURE_LAYERS: {
  label: string;
  detail: string;
  color: string;
}[] = [
  { label: 'UI layer', detail: 'Components / Views', color: 'var(--color-fg-strong)' },
  { label: 'State management', detail: 'Store / Hooks / Providers', color: 'var(--color-accent)' },
  { label: 'Domain layer', detail: 'Use Cases / Business Logic', color: 'var(--color-fg-strong)' },
  { label: 'Data layer', detail: 'Repositories / APIs / DB', color: 'var(--color-accent-cyan)' },
];
```

with:

```tsx
const ARCHITECTURE_LAYERS: {
  label: string;
  detail: string;
  color: string;
}[] = [
  { label: 'UI layer', detail: 'Components / Views', color: 'var(--color-fg-strong)' },
  { label: 'State management', detail: 'Store / Hooks / Providers', color: 'var(--color-accent-warm)' },
  { label: 'Domain layer', detail: 'Use Cases / Business Logic', color: 'var(--color-fg-strong)' },
  { label: 'Data layer', detail: 'Repositories / APIs / DB', color: 'var(--color-accent)' },
];
```

Replace the mock's outer wrapper background (lines 36–41):

```tsx
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 24,
        borderRadius: 'var(--radius)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        background:
          'radial-gradient(130% 100% at 50% 0%, rgba(99, 102, 241, 0.06), transparent 70%), rgba(5, 5, 10, 0.4)',
      }}
```

with:

```tsx
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 24,
        borderRadius: 'var(--radius)',
        border: '1px solid var(--color-border)',
        background:
          'radial-gradient(130% 100% at 50% 0%, rgba(74, 127, 192, 0.08), transparent 70%), rgba(14, 27, 46, 0.4)',
      }}
```

Replace the "Layered Design" badge (lines 51–66):

```tsx
        <span className='eyebrow' style={{ fontSize: 10 }}>
          Clean System Architecture
        </span>
        <span
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent-cyan)',
            background: 'rgba(6, 182, 212, 0.08)',
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          Layered Design
        </span>
```

with:

```tsx
        <span className='eyebrow' style={{ fontSize: 10 }}>
          FIG. 02 — Clean System Architecture
        </span>
        <span
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            background: 'rgba(74, 127, 192, 0.1)',
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          Layered Design
        </span>
```

Replace the "State management" row's highlighted border (lines 79–84):

```tsx
              border:
                layer.label === 'State management'
                  ? '1px solid rgba(99, 102, 241, 0.2)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
```

with:

```tsx
              border:
                layer.label === 'State management'
                  ? '1px solid rgba(217, 123, 63, 0.3)'
                  : '1px solid var(--color-border)',
```

- [ ] **Step 2: Add a `FIG.` label to the featured project's category badge**

Replace (lines 162–179):

```tsx
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className='eyebrow' style={{ color: 'var(--color-accent)' }}>
                  Featured Project
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent-cyan)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    background: 'rgba(6, 182, 212, 0.05)',
                    padding: '2px 8px',
                    borderRadius: 99,
                  }}
                >
                  {featured.category}
                </span>
              </div>
```

with:

```tsx
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className='eyebrow' style={{ color: 'var(--color-accent)' }}>
                  FIG. 03 — Featured Project
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(74, 127, 192, 0.3)',
                    background: 'rgba(74, 127, 192, 0.06)',
                    padding: '2px 8px',
                    borderRadius: 99,
                  }}
                >
                  {featured.category}
                </span>
              </div>
```

- [ ] **Step 3: Recolor the non-featured project cards' folder icon, category label, index label**

Replace (lines 265–293):

```tsx
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent-cyan)',
                  }}
                >
                  <Folder size={18} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      color: 'var(--color-faint)',
                    }}
                  >
                    {num}
                  </span>
                  {hasLinks && (
                    <ArrowUpRight size={15} style={{ color: 'var(--color-faint)' }} />
                  )}
                </div>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: 'var(--color-accent-purple)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {proj.category}
              </span>
```

with:

```tsx
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(127, 168, 214, 0.04)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent)',
                  }}
                >
                  <Folder size={18} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      color: 'var(--color-faint)',
                    }}
                  >
                    FIG. {num}
                  </span>
                  {hasLinks && (
                    <ArrowUpRight size={15} style={{ color: 'var(--color-faint)' }} />
                  )}
                </div>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: 'var(--color-accent)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {proj.category}
              </span>
```

- [ ] **Step 4: Drop the `tilt` class from the featured project button**

Replace (line 140):

```tsx
            className='card card-hover az-reveal span-12 feat-card tilt'
```

with:

```tsx
            className='card card-hover az-reveal span-12 feat-card'
```

- [ ] **Step 5: Recolor `ProjectLinks.tsx`**

Replace (lines 45, 53) — the two remaining hardcoded rgba colors that aren't blue/amber-neutral:

```tsx
      icon: <AppleGlyph size={18} />,
      color: 'rgba(59, 130, 246, 0.1)'
```

with:

```tsx
      icon: <AppleGlyph size={18} />,
      color: 'rgba(74, 127, 192, 0.1)'
```

and:

```tsx
      icon: <Github size={18} />,
      color: 'rgba(168, 85, 247, 0.1)'
```

with:

```tsx
      icon: <Github size={18} />,
      color: 'rgba(74, 127, 192, 0.1)'
```

(the Play Store option's `rgba(16, 185, 129, 0.1)` is left as-is — it's `--color-ok` green, a semantic "available on this store" tint distinct from the brand accent, not part of the collapsed accent system.)

Replace the "Launch Platform" label color (line 127):

```tsx
              color: 'var(--color-accent-cyan)',
```

with:

```tsx
              color: 'var(--color-accent)',
```

- [ ] **Step 6: Verify**

Run: `bun run lint`. Check `/#work`: featured project shows `FIG. 03 — Featured Project`, architecture mock badge is blue, non-featured cards show `FIG. 02`/`FIG. 03`/etc. instead of bare `02`/`03`, hovering any project card shows amber corner brackets (from Task 1) instead of the old tilt/spotlight. Click a project with links to confirm the modal still opens and its "Launch Platform" label is blue.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/Projects.tsx src/components/ui/ProjectLinks.tsx
git commit -m "style: reskin projects grid and link modal to blueprint theme"
```

---

### Task 7: Skills (`src/components/ui/Skills.tsx`)

**Files:**
- Modify: `src/components/ui/Skills.tsx`

- [ ] **Step 1: Collapse category icon colors to blue, keep one amber highlight**

Replace (lines 5–22):

```tsx
const ICON_MAP: Record<string, React.ReactNode> = {
  'Architecture': <Layers size={18} style={{ color: 'var(--color-accent)' }} />,
  'Languages': <Code2 size={18} style={{ color: 'var(--color-accent-cyan)' }} />,
  'Frameworks': <Boxes size={18} style={{ color: 'var(--color-accent-purple)' }} />,
  'Backend & Data': <Database size={18} style={{ color: '#f59e0b' }} />,
  'CI / CD': <RefreshCw size={18} style={{ color: 'var(--color-ok)' }} />,
  'Testing': <ShieldCheck size={18} style={{ color: '#f43f5e' }} />,
};


const GLOW_COLOR_MAP: Record<string, string> = {
  'Architecture': 'rgba(99, 102, 241, 0.04)',
  'Languages': 'rgba(6, 182, 212, 0.04)',
  'Frameworks': 'rgba(168, 85, 247, 0.04)',
  'Backend & Data': 'rgba(245, 158, 11, 0.04)',
  'CI / CD': 'rgba(16, 185, 129, 0.04)',
  'Testing': 'rgba(244, 63, 94, 0.04)',
};
```

with:

```tsx
const ICON_MAP: Record<string, React.ReactNode> = {
  'Architecture': <Layers size={18} style={{ color: 'var(--color-accent-warm)' }} />,
  'Languages': <Code2 size={18} style={{ color: 'var(--color-accent)' }} />,
  'Frameworks': <Boxes size={18} style={{ color: 'var(--color-accent)' }} />,
  'Backend & Data': <Database size={18} style={{ color: 'var(--color-accent)' }} />,
  'CI / CD': <RefreshCw size={18} style={{ color: 'var(--color-accent)' }} />,
  'Testing': <ShieldCheck size={18} style={{ color: 'var(--color-accent)' }} />,
};


const GLOW_COLOR_MAP: Record<string, string> = {
  'Architecture': 'rgba(217, 123, 63, 0.05)',
  'Languages': 'rgba(74, 127, 192, 0.04)',
  'Frameworks': 'rgba(74, 127, 192, 0.04)',
  'Backend & Data': 'rgba(74, 127, 192, 0.04)',
  'CI / CD': 'rgba(74, 127, 192, 0.04)',
  'Testing': 'rgba(74, 127, 192, 0.04)',
};
```

("Architecture" is the one category kept on the amber accent, since it's the most distinctive/important entry — `--color-ok` for "CI / CD" is deliberately removed here since it wasn't a semantic status indicator in this context, just a leftover hue choice, so it's fair game to fold into the unified blue system.)

- [ ] **Step 2: Verify**

Run: `bun run lint`. Check `/#stack`: all 6 category cards show blue icons except "Architecture" which is amber; background glows are uniform faint blue (Architecture faint amber).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Skills.tsx
git commit -m "style: unify skills category colors to blue+amber accent system"
```

---

### Task 8: TechRadar (`src/components/ui/TechRadar.tsx`)

**Files:**
- Modify: `src/components/ui/TechRadar.tsx`

- [ ] **Step 1: Recolor the sweep and area gradients**

Replace (lines 56–65):

```tsx
            {/* Sweep gradient */}
            <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
            </linearGradient>

            {/* Radar area gradient */}
            <radialGradient id="radarAreaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-accent-purple)" stopOpacity="0.08" />
            </radialGradient>
```

with:

```tsx
            {/* Sweep gradient */}
            <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent-warm)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
            </linearGradient>

            {/* Radar area gradient */}
            <radialGradient id="radarAreaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-accent-warm)" stopOpacity="0.1" />
            </radialGradient>
```

- [ ] **Step 2: Recolor the sweep beam stroke**

Replace (lines 103–111):

```tsx
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - R}
              stroke="var(--color-accent-cyan)"
              strokeWidth={1.5}
              opacity={0.8}
            />
```

with:

```tsx
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - R}
              stroke="var(--color-accent-warm)"
              strokeWidth={1.5}
              opacity={0.8}
            />
```

- [ ] **Step 3: Recolor the vertex inner dots**

Replace (lines 136–142):

```tsx
                <circle
                  cx={x}
                  cy={y}
                  r={2}
                  fill='var(--color-accent-cyan)'
                />
```

with:

```tsx
                <circle
                  cx={x}
                  cy={y}
                  r={2}
                  fill='var(--color-accent-warm)'
                />
```

- [ ] **Step 4: Recolor the "Live engine proficiencies" status dot**

Replace (lines 185–195):

```tsx
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent-cyan)',
            boxShadow: '0 0 8px var(--color-accent-cyan)',
          }}
          className='animate-pulse'
          aria-hidden
        />
```

with:

```tsx
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent-warm)',
            boxShadow: '0 0 8px var(--color-accent-warm)',
          }}
          className='animate-pulse'
          aria-hidden
        />
```

- [ ] **Step 5: Verify**

Run: `bun run lint`. Check the hero's radar card: grid rings/spokes stay blue-neutral (they already reference `--color-border`/`--color-border-strong`, unaffected), the sweep beam and data-shape outline read blue→amber, vertex dots are amber, the pulsing status dot under the chart is amber.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/TechRadar.tsx
git commit -m "style: recolor tech radar chart to blue/amber accent system"
```

---

### Task 9: Experience (`src/components/ui/Experience.tsx`)

**Files:**
- Modify: `src/components/ui/Experience.tsx`

- [ ] **Step 1: Alternate timeline dot color blue/amber by index**

Replace (lines 93–116):

```tsx
                <div
                  className='hidden lg:flex lg:col-span-2 order-2'
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                    minHeight: 50,
                  }}
                >
                  {showLine && <div style={lineStyle} />}
                  <div
                    style={{
                      position: 'absolute',
                      top: 18,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'var(--color-bg)',
                      border: '2.5px solid var(--color-accent)',
                      boxShadow: '0 0 6px var(--color-accent)',
                      zIndex: 2,
                    }}
                  />
                </div>
```

with:

```tsx
                <div
                  className='hidden lg:flex lg:col-span-2 order-2'
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                    minHeight: 50,
                  }}
                >
                  {showLine && <div style={lineStyle} />}
                  <div
                    style={{
                      position: 'absolute',
                      top: 18,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'var(--color-bg)',
                      border: `2.5px solid ${isLeft ? 'var(--color-accent)' : 'var(--color-accent-warm)'}`,
                      boxShadow: `0 0 6px ${isLeft ? 'var(--color-accent)' : 'var(--color-accent-warm)'}`,
                      zIndex: 2,
                    }}
                  />
                </div>
```

- [ ] **Step 2: Recolor the `exp.type` badge**

Replace (lines 76–90):

```tsx
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-accent-cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      background: 'rgba(6, 182, 212, 0.04)',
                      borderRadius: 6,
                      padding: '3px 8px',
                      marginTop: 8,
                      width: 'fit-content',
                    }}
                  >
                    {exp.type}
                  </span>
```

with:

```tsx
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-accent)',
                      border: '1px solid rgba(74, 127, 192, 0.3)',
                      background: 'rgba(74, 127, 192, 0.05)',
                      borderRadius: 6,
                      padding: '3px 8px',
                      marginTop: 8,
                      width: 'fit-content',
                    }}
                  >
                    {exp.type}
                  </span>
```

- [ ] **Step 3: Recolor the role icon box**

Replace (lines 129–142):

```tsx
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-accent-purple)',
                      }}
                    >
                      <Briefcase size={16} />
                    </div>
```

with:

```tsx
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(127, 168, 214, 0.04)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <Briefcase size={16} />
                    </div>
```

- [ ] **Step 4: Verify**

Run: `bun run lint`. Check `/#experience`: timeline dots alternate blue/amber per row, the role-type badge (e.g. "Full-time") is blue, the briefcase icon box is blue.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Experience.tsx
git commit -m "style: reskin experience timeline to blue/amber accent system"
```

---

### Task 10: About (`src/components/ui/About.tsx`)

**Files:**
- Modify: `src/components/ui/About.tsx`

- [ ] **Step 1: Collapse focus-area icon colors, keep one amber highlight**

Replace (lines 4–25):

```tsx
const FOCUS = [
  {
    title: 'Performance Engineering',
    desc: 'Profiling critical paths, optimizing memory and render cycles, and eliminating bottlenecks across the stack.',
    icon: <Zap size={16} style={{ color: 'var(--color-accent-cyan)' }} />
  },
  {
    title: 'Scalable Systems',
    desc: 'Designing APIs and services that stay fast and reliable as traffic and complexity grow.',
    icon: <Gauge size={16} style={{ color: 'var(--color-accent)' }} />
  },
  {
    title: 'Data & Sync Architecture',
    desc: 'Architecting resilient data layers — from relational schemas to offline-first sync with conflict resolution.',
    icon: <Database size={16} style={{ color: 'var(--color-accent-purple)' }} />
  },
  {
    title: 'Clean Architecture',
    desc: 'Strict layer boundaries separating UI, business logic, and data access for testable, maintainable codebases.',
    icon: <Layers size={16} style={{ color: 'var(--color-ok)' }} />
  },
];
```

with:

```tsx
const FOCUS = [
  {
    title: 'Performance Engineering',
    desc: 'Profiling critical paths, optimizing memory and render cycles, and eliminating bottlenecks across the stack.',
    icon: <Zap size={16} style={{ color: 'var(--color-accent)' }} />
  },
  {
    title: 'Scalable Systems',
    desc: 'Designing APIs and services that stay fast and reliable as traffic and complexity grow.',
    icon: <Gauge size={16} style={{ color: 'var(--color-accent)' }} />
  },
  {
    title: 'Data & Sync Architecture',
    desc: 'Architecting resilient data layers — from relational schemas to offline-first sync with conflict resolution.',
    icon: <Database size={16} style={{ color: 'var(--color-accent)' }} />
  },
  {
    title: 'Clean Architecture',
    desc: 'Strict layer boundaries separating UI, business logic, and data access for testable, maintainable codebases.',
    icon: <Layers size={16} style={{ color: 'var(--color-accent-warm)' }} />
  },
];
```

(`Clean Architecture` becomes the single amber-highlighted item; `--color-ok` is dropped here since it was a stray decorative hue, not a status indicator.)

- [ ] **Step 2: Recolor the paragraph card's background glow**

Replace (line 42):

```tsx
            background: 'radial-gradient(circle at top left, rgba(99,102,241,0.04), transparent 50%), var(--color-surface)',
```

with:

```tsx
            background: 'radial-gradient(circle at top left, rgba(74,127,192,0.05), transparent 50%), var(--color-surface)',
```

- [ ] **Step 3: Verify**

Run: `bun run lint`. Check `/#about`: 3 of 4 focus-area icons are blue, "Clean Architecture" is amber, the paragraph card's background glow is a faint blue instead of indigo.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/About.tsx
git commit -m "style: unify about focus-area colors to blue+amber accent system"
```

---

### Task 11: Contact (`src/components/ui/Contact.tsx`)

**Files:**
- Modify: `src/components/ui/Contact.tsx`

- [ ] **Step 1: Unify the 3 cards' hover colors to blue**

Replace the three `cardStyle(...)` calls. First, the Email card (lines 147–151):

```tsx
          style={cardStyle(
            'email',
            'rgba(6, 182, 212, 0.05)',
            'rgba(6, 182, 212, 0.25)',
          )}
```

with:

```tsx
          style={cardStyle(
            'email',
            'rgba(74, 127, 192, 0.06)',
            'rgba(74, 127, 192, 0.3)',
          )}
```

Second, the LinkedIn card (lines 184–188):

```tsx
          style={cardStyle(
            'linkedin',
            'rgba(59, 130, 246, 0.06)',
            'rgba(59, 130, 246, 0.25)',
          )}
```

with:

```tsx
          style={cardStyle(
            'linkedin',
            'rgba(74, 127, 192, 0.06)',
            'rgba(74, 127, 192, 0.3)',
          )}
```

Third, the GitHub card (lines 213–217):

```tsx
          style={cardStyle(
            'github',
            'rgba(168, 85, 247, 0.06)',
            'rgba(168, 85, 247, 0.25)',
          )}
```

with:

```tsx
          style={cardStyle(
            'github',
            'rgba(74, 127, 192, 0.06)',
            'rgba(74, 127, 192, 0.3)',
          )}
```

- [ ] **Step 2: Recolor the title panel's background glow and the Mail/LinkedIn/GitHub icon colors**

Replace (line 110):

```tsx
              'radial-gradient(circle at top left, rgba(99,102,241,0.05), transparent 50%), var(--color-surface)',
```

with:

```tsx
              'radial-gradient(circle at top left, rgba(74,127,192,0.06), transparent 50%), var(--color-surface)',
```

Replace the Mail icon color (lines 156–159):

```tsx
            <Mail
              size={12}
              style={{ color: 'var(--color-accent-cyan)' }}
            />
```

with:

```tsx
            <Mail
              size={12}
              style={{ color: 'var(--color-accent)' }}
            />
```

Replace the LinkedIn icon color (lines 193–196):

```tsx
            <Linkedin
              size={12}
              style={{ color: '#3b82f6' }}
            />
```

with:

```tsx
            <Linkedin
              size={12}
              style={{ color: 'var(--color-accent)' }}
            />
```

Replace the GitHub icon color (lines 222–225):

```tsx
            <Github
              size={12}
              style={{ color: 'var(--color-accent-purple)' }}
            />
```

with:

```tsx
            <Github
              size={12}
              style={{ color: 'var(--color-accent)' }}
            />
```

(The email-copy "Copied to clipboard" success hint keeps `--color-ok` green unchanged — semantic success state, out of scope for the accent unification.)

- [ ] **Step 3: Verify**

Run: `bun run lint`. Check `/#contact`: hovering any of the three cards shows the same blue tint/border (no more cyan/blue/purple split), all three label icons (Mail/LinkedIn/GitHub) are blue, clicking "copy email" still shows the green "Copied to clipboard" state.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Contact.tsx
git commit -m "style: unify contact card hover colors to blue accent"
```

---

### Task 12: Admin sidebar (`src/components/admin/AdminShell.tsx`)

**Files:**
- Modify: `src/components/admin/AdminShell.tsx`

**Interfaces:**
- Consumes: nothing new from Task 1 — this task fixes a hardcoded color literal found directly in `AdminShell.tsx` (the sidebar tab buttons don't use the `.az-side-link` class at all; they're styled inline).

- [ ] **Step 1: Recolor the active sidebar tab background**

The sidebar tab buttons (rendered from `navItems.map(...)`) set their active-state background inline. Replace (around line 345):

```tsx
                  background: on ? 'rgba(124,138,255,0.1)' : 'transparent',
                  color: on ? 'var(--color-accent)' : 'var(--color-muted)',
                  transition: 'background .2s, color .2s',
```

with:

```tsx
                  background: on ? 'rgba(74, 127, 192, 0.12)' : 'transparent',
                  color: on ? 'var(--color-accent)' : 'var(--color-muted)',
                  borderLeft: on ? '2px solid var(--color-accent)' : '2px solid transparent',
                  transition: 'background .2s, color .2s, border-color .2s',
```

Note the button's `style` object needs `paddingLeft` reduced by 2px (to `'11px 13px 11px 11px'`) so the new `borderLeft` doesn't shift content — find the existing `padding: '11px 13px',` on the same style object (a few lines above `background:`) and change it to `padding: '11px 13px 11px 11px',`.

- [ ] **Step 2: Verify**

Run: `bun run lint`. Log into `/admin`, confirm the whole shell shows the grid-paper background (set directly on `.admin-shell` in Task 1 — it has to be explicit there since `.admin-shell` paints an opaque `background-color` over `body` and would otherwise hide `body`'s pattern), and the currently active tab (Experience/Projects/Contact/Resume) shows a left blue rule + blue-tinted background instead of a plain background tint.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/AdminShell.tsx
git commit -m "style: highlight active admin sidebar tab with blueprint accent"
```

---

### Task 13: Final verification pass

**Files:**
- None (verification only).

- [ ] **Step 1: Lint the whole project**

Run: `bun run lint`
Expected: no errors.

- [ ] **Step 2: Full visual walkthrough**

Start `bun dev`, open `/` and check every section end-to-end: Nav, Hero, Projects (including opening a project's link modal), Skills, Experience, About, Contact, Footer. Confirm:
- No leftover indigo/cyan/purple hues anywhere (only navy background, blue borders/text, amber CTAs/highlights, plus untouched semantic green/red).
- Hovering any card shows amber corner brackets, not the old radial spotlight or 3D tilt.
- Grid-paper pattern is visible on body, nav, footer, and the hero headline card.

- [ ] **Step 3: Responsive check**

Resize the viewport (or use browser devtools) to ~800px and ~500px widths. Confirm the bento grid still collapses per the existing breakpoints (`900px`, `560px` in `globals.css`) — this plan did not touch breakpoint values, only colors, so layout should be unaffected, but verify nothing visually breaks (e.g. corner-bracket backgrounds overflowing on very narrow cards).

- [ ] **Step 4: Admin walkthrough**

Log into `/admin`, click through all 4 tabs (Experience/Projects/Contact/Resume), confirm the sidebar active-state indicator and shared form/button/card styling all read as blueprint-themed and legible.

- [ ] **Step 5: Reduced-motion check**

In browser devtools, emulate `prefers-reduced-motion: reduce` and reload `/`. Confirm: `.az-reveal` content appears immediately (no fade/slide-in), `.card::after`/`.az-card::after` corner brackets are hidden entirely (`display: none` per Task 1), `.ambient`/`.ambient-2` blobs are hidden.

- [ ] **Step 6: No commit needed**

This task only verifies prior commits; there's nothing new to commit. If any check in Steps 2–5 fails, fix the specific component file from the relevant earlier task and commit that fix separately (`fix: <description>`), rather than amending prior commits.
