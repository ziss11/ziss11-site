# Blueprint/Technical Redesign — Design Spec

Date: 2026-07-11

## Context

Current site theme (from prior "premium bento-grid" redesign) is an obsidian-dark UI with indigo/cyan/purple neon accents, glassmorphism cards, radial-glow hovers, and 3D tilt. This spec replaces that visual direction entirely with a **blueprint / engineering-schematic** aesthetic, while keeping the existing bento-grid layout structure, fonts, and corner radii.

Scope: full visual redesign — public landing page (all sections) **and** the `/admin` CMS shell. No content/copy changes, no new features, no test framework changes (none exists in this repo).

## 1. Design Tokens (`src/app/globals.css`)

- **Background**: deep navy `#0e1b2e` (replaces `--color-bg: #030307`).
- **Grid-paper pattern**: a repeating `linear-gradient` (two axes, ~16–20px cell, `rgba(120,160,210,.12)` lines) applied as a background-image utility, used on `body` and reused inside cards/sections for the schematic-paper look.
- **Text**: white/off-white primary (`--color-fg-strong`, `--color-fg` kept as-is conceptually, just re-tuned against navy); light blue (`#9cc0ea`) for secondary/label text (replaces `--color-muted` tone).
- **Accent system**: reduce the current 3-way indigo/cyan/purple accent split down to **one system color** — blue (border/rule color `#3a5f8f`–`#7fa8d6`, replacing `--color-accent`, `--color-accent-cyan`, `--color-accent-purple` as distinct hues) — **plus one contrast accent**, warm amber/rust (e.g. `#d97b3f`), reserved for primary CTAs, active/selected states, and single most-important highlights per section.
- **Semantic colors unchanged**: `--color-ok` (success/status-normal) and `--color-danger` (destructive actions) stay as-is — these are meaning-carrying, not brand accents.
- **Fonts**: unchanged — Plus Jakarta Sans (display/body) + JetBrains Mono (labels/annotations).
- **Radius**: unchanged — `--radius: 16px`, `--radius-sm: 10px`.
- **Annotation labels**: new convention using mono font for schematic-style kickers/badges, e.g. `FIG. 01`, `01 · REACT`, `REV. 2026.07` — replaces plain eyebrow text where it reads as a figure/plate label.

## 2. Global Chrome (Nav, Footer)

**Nav** (`src/components/ui/Nav.tsx`):
- Pill retains shape/position (sticky, rounded-99 container) but border becomes muted blue, background swaps to navy-glass, with the grid-paper pattern visible faintly inside.
- Logo mark: square with small radius (not circular "AZ" badge), mono type.
- Active link: thin blue underline + small mono index label (e.g. `01`) instead of plain background highlight.
- Résumé button: switches from white-gradient `.az-btn` fill to the amber accent fill.

**Footer** (`src/components/ui/Footer.tsx`):
- Reframed as a technical document's closing block: top border becomes a blue rule, faint grid-paper background consistent with other sections.
- Left: copyright + status dot (keep `--color-ok` green — semantic, not brand) styled as a system log line.
- Right: replace "Designed & built for..." tagline with a technical stamp, e.g. `REV. 2026.07 — FIG. 12`.

## 3. Hero (`src/components/ui/Hero.tsx`)

- Eyebrow becomes a mono `FIG. 01 — ROLE`-style annotation label (keep the terminal icon).
- Headline: drop the 3-color gradient text-clip; solid white headline with the key phrase underlined in amber instead.
- Card background: grid-paper pattern instead of radial neon blob; border becomes muted blue instead of translucent white.
- Radar card: recolor only (see §5) — same layout, crosshair/border in blue/amber, no purple glow.
- Metric strip (3 cards): icon-box border becomes a small-radius square, icon color unified to blue across all three cards (currently indigo/cyan/purple per card — no longer meaningful under the 1-accent system).
- Buttons: primary → amber solid fill; ghost → blue-muted outline (was white/neutral outline).

## 4. Projects (`src/components/ui/Projects.tsx`)

- Each project card gets a `FIG. 0X` corner label (replacing the plain zero-padded index `02`, `03`).
- Card borders: muted blue instead of the current neutral/white translucent border.
- Featured project `ArchitectureMock`: keep the 4-layer (UI/State/Domain/Data) diagram as-is structurally — it already reads as schematic — recolor: border blue, category badge blue (was separate cyan badge), radial background glow indigo→blue.
- Non-featured cards: folder icon box → small-radius square with blue border (was rounded translucent box); category label → blue (was purple); tech tag chips → blue-muted border (was white translucent).
- Hover interaction (applies sitewide to `.card`/`.az-card`, see §7): replace radial-glow spotlight + 3D tilt with a **corner-bracket reveal** (four small crosshair/viewfinder brackets appear at the corners on hover) plus a blue→amber border pulse. No `transform` tilt.

## 5. Skills, TechRadar, Experience, About, Contact

- **Skills** (`Skills.tsx`): category icon colors currently vary per group (indigo/cyan/purple/amber/green/red) → unify to blue, with **one** category permitted to use the amber accent for emphasis. Radial glow behind each card → uniform muted blue (was per-category hue).
- **TechRadar** (`TechRadar.tsx`): grid rings/spokes already read as blueprint (keep as-is). Recolor only: sweep-beam gradient and proficiency-area fill from cyan→indigo→purple to blue→amber; vertex dots from cyan to amber accent.
- **Experience** (`Experience.tsx`): timeline dashed line + dot indicators (currently indigo glow) → blue, alternating blue/amber per entry index for rhythm. `exp.type` badge cyan → blue. Role icon (Briefcase) purple → blue. Tech tag chips stay neutral mono (already on-theme).
- **About** (`About.tsx`): "Core Focus Areas" icons (4 distinct hues) → all blue, with the single most important item permitted amber. Body card radial glow indigo → muted blue.
- **Contact** (`Contact.tsx`): the 3 cards (Email/LinkedIn/GitHub) currently each carry a distinct hover hue (cyan/blue/purple) → unify hover state to blue border+background. Email "copied" success state keeps `--color-ok` green (semantic, unchanged).

## 6. Admin (`/admin`)

- Most of the reskin is inherited for free from the global token/class changes (`.card`, `.az-btn`, `.az-input`, `.az-row`, etc. are shared between public site and admin).
- Sidebar (`admin-shell` / `az-side-link` in `AdminShell.tsx`): add faint grid-pattern background; active tab indicated by a left-side blue rule + mono label, not just a background tint.
- Destructive actions (delete/logout) keep the semantic red (`--color-danger`) — not remapped to amber, so "danger" stays visually distinct from the brand accent.
- Header icons (Briefcase/FolderGit2/Mail, etc.) unified to blue.

## 7. Interaction Changes

- Remove `.card::after` / `.az-card::after` radial-glow-follows-cursor spotlight and the `.tilt` 3D-transform behavior.
- Replace with a corner-bracket hover treatment: four small L-shaped brackets fade in at the card corners, border transitions blue → amber, no transform/tilt. Applies uniformly to `.card`, `.az-card`, and project cards.
- `prefers-reduced-motion` handling carries over unchanged (disable the bracket transition, keep static state).

## 8. Implementation Order & Verification

1. `globals.css` tokens first (background, accent collapse to blue+amber, grid-pattern utility, hover-effect CSS swap) — cascades automatically to shared classes (`.card`, `.az-btn`, `.az-card`, `.tech-card`, etc.).
2. Component-level recolors/label changes in visibility order: Nav → Footer → Hero → Projects → Skills/TechRadar → Experience → About → Contact → Admin.
3. Remove now-unused `tilt` class usage from JSX where the corner-bracket hover replaces it.
4. No test framework in this repo (per `CLAUDE.md`) — verification is manual: run dev server, visually check each section, confirm responsive bento collapse still works at existing breakpoints (900px/560px), and run `bun run lint` for TS/ESLint cleanliness.

## Out of Scope

- Copy/content changes.
- New sections or features.
- Layout restructuring beyond recoloring/reskinning existing bento-grid (linear-schematic-flow layout option was considered and rejected in favor of keeping bento-grid).
- Light mode (site remains dark-only, as today).
