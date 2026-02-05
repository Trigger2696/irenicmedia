# Architecture

**Analysis Date:** 2026-02-05

## Pattern Overview

**Overall:** Multi-Project Repository with Component-Based Frontend Architecture

This repository contains two distinct frontend projects:
1. **marko-react** - React SPA (Vite) for a digital marketing agency template
2. **irenic-media** - Next.js application for Irenic Media agency website

**Key Characteristics:**
- Component-based UI architecture with reusable presentational components
- Page-level composition using section components
- Data separation pattern (static data files for marko-react)
- Context-based state management for cross-cutting concerns
- Client-side routing (marko-react) vs App Router (irenic-media)

## Layers

**Presentation Layer (Pages):**
- Purpose: Compose page layouts from section components
- Location:
  - `marko_main_files/marko-react/src/Page/`
  - `irenic-media/app/`
- Contains: Page components that assemble sections
- Depends on: Components, Data
- Used by: Router (marko-react) / App Router (irenic-media)

**Section Components Layer:**
- Purpose: Self-contained sections of a page (Hero, Services, Footer, etc.)
- Location:
  - `marko_main_files/marko-react/src/Components/`
  - `irenic-media/components/`
- Contains: Feature-specific components (Banner, Services, Testimonial, etc.)
- Depends on: Card components, UI components, Data, Hooks
- Used by: Page components

**Card/UI Components Layer:**
- Purpose: Reusable presentational components
- Location:
  - `marko_main_files/marko-react/src/Components/Card/`
  - `irenic-media/components/ui/`
- Contains: Generic cards, buttons, form elements
- Depends on: Styling, animation utilities
- Used by: Section components

**Data Layer:**
- Purpose: Static content data (services, testimonials, team, etc.)
- Location: `marko_main_files/marko-react/src/Data/`
- Contains: Exported arrays of objects with content
- Depends on: Nothing
- Used by: Section components that render lists

**Context Layer:**
- Purpose: Cross-cutting state (navigation, video modals, theme)
- Location: `marko_main_files/marko-react/src/Components/Context/`
- Contains: React Context providers
- Depends on: React, react-router-dom
- Used by: App shell, navigation components

**Hooks Layer:**
- Purpose: Reusable logic for animations and behaviors
- Location:
  - `marko_main_files/marko-react/src/Components/Hooks/`
  - `irenic-media/hooks/`
- Contains: Custom hooks (AnimateOnScroll, CounterOnScroll, useInView)
- Depends on: react-intersection-observer, React
- Used by: Components requiring scroll-based behavior

## Data Flow

**marko-react Page Rendering:**

1. `main.jsx` bootstraps app with global styles and React StrictMode
2. `App.jsx` wraps with Router, NavProvider, ModalVideoProvider
3. `Routers.jsx` matches URL to Page component
4. Page component composes Section components
5. Section components import Data and render Card components
6. Card components apply animations via AnimateOnScroll hook

**irenic-media Page Rendering:**

1. `app/layout.tsx` provides root layout with fonts and metadata
2. `app/page.tsx` composes section components
3. Section components use Framer Motion for animations
4. Components import custom `useInView` hook for scroll animations
5. UI components from `components/ui/` provide consistent styling

**State Management:**
- **marko-react:** React Context for NavContext (active route tracking) and ModalVideoContext (video modal state)
- **irenic-media:** Component-local state with useState hooks (no global state)

## Key Abstractions

**AnimateOnScroll (marko-react):**
- Purpose: Wrapper component that triggers CSS animations when element enters viewport
- Location: `marko_main_files/marko-react/src/Components/Hooks/AnimateOnScroll.jsx`
- Pattern: Higher-order component using react-intersection-observer

**useInView (irenic-media):**
- Purpose: Hook that tracks element visibility in viewport
- Location: `irenic-media/hooks/useInView.tsx`
- Pattern: Custom hook using IntersectionObserver API

**NavContext (marko-react):**
- Purpose: Provide current route and dropdown active state detection
- Location: `marko_main_files/marko-react/src/Components/Context/NavContext.jsx`
- Pattern: React Context with useLocation from react-router-dom

**Card Components:**
- Purpose: Standardized content display (services, testimonials, team, blog)
- Examples:
  - `marko_main_files/marko-react/src/Components/Card/ServiceCard.jsx`
  - `marko_main_files/marko-react/src/Components/Card/TestimonialCard.jsx`
  - `irenic-media/components/ui/Card.tsx`
- Pattern: Presentational components with props-based content

## Entry Points

**marko-react:**
- Location: `marko_main_files/marko-react/src/main.jsx`
- Triggers: Vite dev server or build
- Responsibilities: Import global styles, mount React app to DOM

**irenic-media:**
- Location: `irenic-media/app/layout.tsx` and `irenic-media/app/page.tsx`
- Triggers: Next.js App Router
- Responsibilities: Define root layout, metadata, and home page composition

## Error Handling

**Strategy:** Minimal - primarily UI error boundaries not observed

**Patterns:**
- Route-level 404 handling via catch-all route in `Routers.jsx`
- NotFound component at `marko_main_files/marko-react/src/Components/NotFound/notfound.jsx`

## Cross-Cutting Concerns

**Logging:** None observed (console only)

**Validation:** Not detected in static marketing sites

**Authentication:** Not applicable (static marketing sites)

**Theming:**
- marko-react: ThemeSwitcher component at `marko_main_files/marko-react/src/Components/Theme/themeswitch.jsx`
- irenic-media: CSS-based with Tailwind (no dynamic theme switching)

**Animations:**
- marko-react: animate.css library with AnimateOnScroll wrapper
- irenic-media: Framer Motion with custom useInView hook

---

*Architecture analysis: 2026-02-05*
