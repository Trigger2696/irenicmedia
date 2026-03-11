# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Irenic Media — a single-page marketing website for a digital marketing & technology agency. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

## Commands

- **Dev server:** `npm run dev` (localhost:3000)
- **Build:** `npm run build`
- **Start prod:** `npm run start`

No test runner or linter is configured.

## Architecture

**Single-page app** — `app/page.tsx` composes all sections in order: Header, Hero, Services, About, WhyUs, Testimonials, CaseStudies, Pricing, Contact, Footer. Navigation uses anchor links with smooth scroll and a 140px header offset (`components/Header.tsx:19`).

**Theming:** Dark mode is default (no class). Light mode applies `.light` class on `<html>`. Theme colors are CSS custom properties defined in `app/globals.css` `:root` (dark) and `.light` (light). The theme script in `app/layout.tsx` runs before hydration to prevent FOUC.

**Tailwind v4:** Uses `@theme` directive in `globals.css` for custom tokens (accent color, border radius, font). There's also a legacy `tailwind.config.ts` — the v4 `@theme` block in CSS is the source of truth.

**Animations:** `components/AnimateOnScroll.tsx` is the shared scroll-triggered animation wrapper using Framer Motion + react-intersection-observer. All sections should use this component for consistent animation timing (600ms, easeOut, 15% threshold, triggerOnce).

**Shared data:** `lib/navigation.ts` centralizes nav links and contact info. `lib/utils.ts` exports `cn()` (clsx wrapper) for conditional class merging.

**Component structure:** Each major section has its own directory under `components/` (e.g., `Hero/`, `Services/`, `Contact/`) with a main section component and sub-components. Standalone components (`Header.tsx`, `Footer.tsx`, `ThemeToggle.tsx`, `MobileMenu.tsx`, `AnimateOnScroll.tsx`) live directly in `components/`.

## Key Conventions

- Path alias: `@/*` maps to project root
- Font: Plus Jakarta Sans loaded via `next/font/google` with CSS variable `--font-jakarta`
- Accent color: `#C82AEF` (purple) — used throughout as `var(--accent-color)` and Tailwind's `accent`
- Border radius: 25px (`rounded-marko` utility class, `--global-border-radius` CSS var)
- Icons: Font Awesome loaded via static CSS files in `/assets/css/vendor/`; Lucide React also available as a dependency
- Images: `next/image` with Unsplash configured as remote pattern in `next.config.ts`
- Custom CSS classes: `.section` (section spacing), `.hero-container` (max-width container), `.shadow-accent` / `.shadow-accent-wide`, `.cta-primary` / `.cta-secondary` — all defined in `globals.css`
- Client components use `'use client'` directive; the root layout and page are server components
