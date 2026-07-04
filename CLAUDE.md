# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun install` — install deps (project uses Bun, see vercel.json)
- `bun dev` — start dev server (Next.js)
- `bun run build` — production build
- `bun run start` — run production build
- `bun run lint` — ESLint (flat config, next/core-web-vitals + next/typescript)

No test framework is configured in this repo.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4 (no tailwind.config — v4 CSS-based config in `src/app/globals.css`). Path alias `@/*` → `./src/*`.

### Public site
`src/app/page.tsx` composes section components from `src/components/ui/` (Hero, About, Experience, Skills, Projects, TechRadar, ProjectLinks, Contact, Footer, Nav). Content types live in `src/data/content.ts`.

### Admin CMS (`/admin`)
Password-protected content editor, no OAuth:
- `src/lib/auth.ts` — password check against `ADMIN_PASSWORD` env, signs session cookie with `ADMIN_SESSION_SECRET`.
- `src/app/admin/actions.ts` — server actions: `login`, `logout`, `saveExperiencesAction`, `saveProjectsAction`, `saveContactAction`, `saveResumeAction`. Each save calls `revalidatePath()` to refresh public pages.
- `src/components/admin/AdminShell.tsx` — tabbed editor UI (Experience/Projects/Contact/Resume) driving those actions.

### Storage (two backends — don't confuse them)
- **Turso (libSQL) via Drizzle ORM** — structured content: `experiences`, `projects`, `contact` tables. Schema in `src/lib/schema.ts`, connection in `src/lib/db.ts`, CRUD in `src/lib/content-db.ts`. Requires `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`.
- **Vercel Blob** — resume PDF only, stored at `content/resume.pdf`, uploaded via `src/components/admin/ResumeUploader.tsx`, ops in `src/lib/blob-content.ts`. Requires `BLOB_READ_WRITE_TOKEN`. Served publicly via `src/app/resume.pdf/route.ts`.

Required env vars (see `.env.example`): `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`.

## Deployment
Vercel, deploy config in `vercel.json` (bun install/build/dev commands). Auto-deploy is off for this project — deploys are manual (see project memory).
