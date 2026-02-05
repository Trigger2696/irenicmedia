# Technology Stack

**Analysis Date:** 2026-02-05

## Overview

This repository contains two separate frontend projects:
1. **irenic-media** - Next.js 16 marketing website (TypeScript)
2. **marko_main_files/marko-react** - Vite React 19 marketing template (JavaScript)

---

## Project 1: irenic-media (Next.js)

### Languages

**Primary:**
- TypeScript 5.4.5 - All source code in `app/`, `components/`, `hooks/`

### Runtime

**Environment:**
- Node.js (version not specified, requires ES2017+ per tsconfig)

**Package Manager:**
- npm
- Lockfile: `irenic-media/package-lock.json` (present)

### Frameworks

**Core:**
- Next.js ^16.1.6 - Full-stack React framework with App Router
- React ^18.3.1 - UI component library
- React DOM ^18.3.1 - DOM rendering

**Styling:**
- Tailwind CSS ^3.4.3 - Utility-first CSS framework
- PostCSS ^8.4.38 - CSS processing
- Autoprefixer ^10.4.19 - CSS vendor prefixing

**Animation:**
- Framer Motion ^11.2.4 - Production-ready animations

**Icons:**
- Lucide React ^0.378.0 - Icon library

### Build Tools

- Next.js built-in bundler (Turbopack/Webpack)
- TypeScript compiler (no emit, type checking only)
- PostCSS for CSS processing

### Development Tools

- TypeScript ^5.4.5 - Type checking
- @types/node ^20.12.12 - Node.js type definitions
- @types/react ^18.3.2 - React type definitions
- @types/react-dom ^18.3.0 - React DOM type definitions

### Configuration Files

| File | Purpose |
|------|---------|
| `irenic-media/next.config.js` | Next.js configuration (reactStrictMode enabled) |
| `irenic-media/tsconfig.json` | TypeScript configuration (strict mode, ES2017 target) |
| `irenic-media/tailwind.config.js` | Tailwind CSS customization (fonts, animations) |
| `irenic-media/postcss.config.js` | PostCSS plugins (tailwindcss, autoprefixer) |

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^16.1.6 | Framework - App Router, SSR, routing |
| react | ^18.3.1 | UI components |
| framer-motion | ^11.2.4 | Scroll and interaction animations |
| lucide-react | ^0.378.0 | SVG icon components |
| tailwindcss | ^3.4.3 | Utility CSS styling |

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js linter
```

---

## Project 2: marko-react (Vite)

### Languages

**Primary:**
- JavaScript (ES Modules) - JSX components in `src/`

### Runtime

**Environment:**
- Node.js (modern, supports ES modules)

**Package Manager:**
- npm
- Lockfile: `marko_main_files/marko-react/package-lock.json` (present)

### Frameworks

**Core:**
- React ^19.1.0 - UI component library
- React DOM ^19.1.0 - DOM rendering
- React Router DOM ^7.7.1 - Client-side routing

**Styling:**
- Bootstrap ^5.3.8 - CSS framework with grid system
- Animate.css ^4.1.1 - CSS animation library
- Custom CSS in `src/assets/css/`
- Font Awesome (via public assets)

**Components:**
- Swiper ^11.2.10 - Touch slider/carousel

### Build Tools

- Vite ^7.0.4 - Fast development server and bundler
- @vitejs/plugin-react ^4.6.0 - React JSX support

### Development Tools

- ESLint ^9.30.1 - Code linting
- @eslint/js ^9.30.1 - ESLint core rules
- eslint-plugin-react-hooks ^5.2.0 - React hooks rules
- eslint-plugin-react-refresh ^0.4.20 - Fast refresh support
- globals ^16.3.0 - Global variables for ESLint

### Configuration Files

| File | Purpose |
|------|---------|
| `marko_main_files/marko-react/vite.config.js` | Vite bundler configuration |
| `marko_main_files/marko-react/eslint.config.js` | ESLint flat config (ES2020, JSX) |

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.1.0 | UI components |
| react-router-dom | ^7.7.1 | SPA routing |
| bootstrap | ^5.3.8 | CSS framework and grid |
| swiper | ^11.2.10 | Image/content carousels |
| react-intersection-observer | ^9.16.0 | Scroll visibility detection |
| animate.css | ^4.1.1 | CSS animations |

### Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Platform Requirements

**Development:**
- Node.js 18+ recommended
- npm 8+
- Git

**Production (irenic-media):**
- Vercel, Netlify, or any Node.js hosting
- Node.js runtime for SSR

**Production (marko-react):**
- Any static hosting (GitHub Pages, S3, Netlify)
- No server-side runtime required (SPA)

---

*Stack analysis: 2026-02-05*
