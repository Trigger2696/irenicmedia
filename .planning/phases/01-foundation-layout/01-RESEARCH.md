# Phase 1: Foundation & Layout - Research

**Researched:** 2026-02-05
**Domain:** Next.js 15 App Router with Tailwind CSS, Responsive Layout, Navigation Patterns
**Confidence:** HIGH

## Summary

This research investigates the standard stack and patterns for building a responsive single-page Next.js 15 application with App Router, featuring advanced navigation behaviors (show-on-scroll-up header, slide-from-right mobile menu), theme toggle with localStorage persistence, and smooth-scroll navigation with active state indicators.

The project will match the visual design of a Vite/React template (marko-react) while using the existing Next.js site structure as a foundation. Key technical challenges include avoiding hydration mismatches with theme detection, implementing performant scroll-direction detection, and using Intersection Observer for active navigation states.

**Primary recommendation:** Use Next.js 15 App Router with TypeScript, Tailwind CSS for styling, Framer Motion for animations (slide-in menu, theme transitions), and custom hooks for scroll direction detection and Intersection Observer. Avoid third-party navigation libraries—Next.js Link with scroll={false} handles anchor navigation natively.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x | React framework with App Router | Official React framework, built-in optimizations, file-based routing |
| TypeScript | 5.4+ | Type safety | Industry standard for production React apps |
| Tailwind CSS | 3.4+ | Utility-first CSS | Most popular CSS framework, excellent responsive utilities |
| Framer Motion | 11.x | Animation library | Best-in-class React animation library, used in existing site |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.378+ | Icon library | Lightweight, tree-shakeable icons (already in existing site) |
| next/font | Built-in | Web font optimization | Automatically optimize Google Fonts with zero layout shift |
| clsx / cn | 2.x | Conditional className utility | Optional, for cleaner conditional Tailwind classes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Framer Motion | CSS transitions only | Framer Motion provides more control for complex animations (slide panels, staggered children) |
| Custom hooks | react-intersection-observer npm | Custom hooks avoid dependencies, but npm package has better test utilities |
| Tailwind CSS | CSS Modules | Tailwind is faster for responsive design, matches existing site patterns |

**Installation:**
```bash
npx create-next-app@latest project-name --typescript --tailwind --app
npm install framer-motion lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx           # Root layout with fonts, metadata, theme script
├── page.tsx             # Single-page app with all sections
├── globals.css          # Tailwind imports + custom utilities
components/
├── Header.tsx           # 'use client' - navigation with scroll detection
├── MobileMenu.tsx       # Slide-from-right panel
├── ThemeToggle.tsx      # 'use client' - dark/light toggle
├── Footer.tsx           # Static component (can be Server Component)
├── sections/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   └── ...             # Section components with IDs for anchor links
hooks/
├── useScrollDirection.ts  # Custom hook for show-on-scroll-up
├── useInView.ts           # Intersection Observer for active nav state
lib/
├── utils.ts            # cn() helper, other utilities
```

### Pattern 1: Next.js 15 App Router Single-Page Setup
**What:** App Router with single page.tsx containing all sections
**When to use:** Single-page websites with anchor navigation
**Example:**
```typescript
// app/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
// ... other sections

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* Other sections with IDs for anchor links */}
      <Footer />
    </main>
  )
}
```

### Pattern 2: Show-on-Scroll-Up Header
**What:** Header hides when scrolling down, shows when scrolling up
**When to use:** Single-page sites with long scrollable content
**Example:**
```typescript
// hooks/useScrollDirection.ts
'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return scrollDirection
}

// components/Header.tsx
'use client'

export default function Header() {
  const scrollDirection = useScrollDirection()

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50
      transition-transform duration-300
      ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}
    `}>
      {/* Header content */}
    </header>
  )
}
```

### Pattern 3: Theme Toggle Without Hydration Mismatch
**What:** Dark/light theme toggle that prevents FOUC and hydration errors
**When to use:** Theme toggles with localStorage persistence in Next.js
**Example:**
```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

// components/ThemeToggle.tsx
'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
    setTheme(stored)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <button onClick={toggleTheme} className="transition-all duration-200">
      {/* Icon based on theme */}
    </button>
  )
}

// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... rest of config
}
```

### Pattern 4: Smooth Scroll with Active Navigation State
**What:** Navigation links highlight based on visible section, smooth scroll to anchors
**When to use:** Single-page sites with multiple sections
**Example:**
```typescript
// hooks/useInView.ts
'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.5, rootMargin = '0px', triggerOnce = false } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.unobserve(element)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

// components/Header.tsx - Navigation links
'use client'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
]

export default function Header() {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleAnchorClick(e, link.href)}
        >
          {link.name}
        </a>
      ))}
    </nav>
  )
}

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}
```

### Pattern 5: Mobile Menu Slide From Right
**What:** Full-height mobile menu panel that slides in from right side
**When to use:** Mobile/tablet navigation with Framer Motion
**Example:**
```typescript
// components/MobileMenu.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { name: string; href: string }[]
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Slide Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl"
          >
            <div className="p-6">
              <button onClick={onClose} className="mb-8">
                <X size={24} />
              </button>
              <nav className="space-y-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block text-lg font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Anti-Patterns to Avoid
- **Don't use both CSS scroll-behavior and JavaScript scrollTo():** Can cause conflicts—use one or the other
- **Don't read localStorage during SSR:** Always wrap in useEffect or use inline script in <head>
- **Don't use 'use client' unnecessarily:** Keep sections as Server Components unless they need interactivity
- **Don't forget scroll={false} on Next.js Links:** For anchor navigation, prevent default scroll-to-top behavior

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG components for every icon | lucide-react | 1000+ icons, tree-shakeable, consistent design |
| Font optimization | Manual @font-face with self-hosted fonts | next/font | Automatic optimization, zero layout shift, no FOUT |
| Class conditionals | String concatenation with template literals | clsx or cn utility | Handles null/undefined gracefully, cleaner syntax |
| Responsive breakpoints | Custom media query hooks | Tailwind responsive prefixes | Built-in, works with SSR, no hydration issues |
| Animation library | CSS transitions for complex sequences | Framer Motion | Handles AnimatePresence (exit animations), stagger children, gesture support |

**Key insight:** Next.js 15 and Tailwind CSS provide most functionality out-of-the-box. Third-party libraries are only needed for animations (Framer Motion) and icons (lucide-react). Everything else should use framework primitives.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch with Theme Toggle
**What goes wrong:** Server renders light theme, client immediately switches to dark (from localStorage), React throws hydration error
**Why it happens:** Server cannot access localStorage, so initial HTML doesn't match client
**How to avoid:** Use inline script in <head> that runs before React hydration, and add suppressHydrationWarning to <html>
**Warning signs:** Console errors like "Text content does not match server-rendered HTML" or flash of wrong theme

### Pitfall 2: Smooth Scroll Not Working with Next.js Link
**What goes wrong:** Clicking anchor links scrolls to top instead of smooth scrolling to section
**Why it happens:** Next.js Link defaults to scrolling to top on navigation
**How to avoid:** Use regular <a> tags for anchor links, or add scroll={false} to Link component and handle scrolling manually
**Warning signs:** Page jumps to top when clicking navigation links

### Pitfall 3: Performance Issues with Scroll Event Listeners
**What goes wrong:** Scroll listeners fire hundreds of times per second, causing jank
**Why it happens:** Scroll events are very frequent, expensive calculations in handler block main thread
**How to avoid:** Use { passive: true } option, debounce/throttle expensive operations, keep scroll handlers minimal
**Warning signs:** Janky scrolling, delayed UI updates, dropped frames

### Pitfall 4: Mobile Menu Not Closing on Outside Click
**What goes wrong:** Clicking overlay doesn't close mobile menu, or closes then immediately reopens
**Why it happens:** Event bubbling from menu to overlay, or missing event listeners
**How to avoid:** Use separate overlay element with onClick={onClose}, or stopPropagation on menu clicks
**Warning signs:** Menu flickers open/closed, requires multiple clicks to close

### Pitfall 5: Intersection Observer Triggering Too Early/Late
**What goes wrong:** Navigation highlights wrong section, or doesn't highlight at all
**Why it happens:** Default threshold (0.0) triggers as soon as 1px is visible
**How to avoid:** Use threshold: 0.5 (50% visible) for active nav states, adjust rootMargin if needed
**Warning signs:** Active nav indicator jumps between sections, or multiple sections highlighted simultaneously

### Pitfall 6: Fixed Header Covering Section Content
**What goes wrong:** When scrolling to anchor, content appears beneath fixed header
**Why it happens:** scrollIntoView doesn't account for fixed header height
**How to avoid:** Use scroll-margin-top on section elements, or adjust scrollIntoView with block: 'start' and offset
**Warning signs:** Section headings hidden under header after navigation

### Pitfall 7: Next.js 15 Caching Changes Breaking Development Workflow
**What goes wrong:** Changes to fetched data not appearing, or cached incorrectly
**Why it happens:** Next.js 15 changed caching defaults—GET routes no longer cached by default
**How to avoid:** Understand new caching behavior, explicitly opt into caching where needed
**Warning signs:** Data not updating as expected, stale content persisting

## Code Examples

Verified patterns from official sources and existing codebase:

### Tailwind Responsive Layout
```tsx
// Source: Existing irenic-media site
export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-max section-padding py-16">
        {/* Stack on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            {/* Brand column takes 2 cols on desktop */}
          </div>
          <div>{/* Services */}</div>
          <div>{/* Company */}</div>
        </div>
      </div>
    </footer>
  )
}
```

### Next.js Font Optimization
```tsx
// Source: https://nextjs.org/docs/app/getting-started/css
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### Scroll Direction Detection
```tsx
// Source: https://www.codemzy.com/blog/react-sticky-header-disappear-scroll
'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }

      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection])

  return scrollDirection
}
```

### Accessibility - Minimum Tap Target Size
```tsx
// Source: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
// WCAG 2.5.5 requires minimum 44x44 CSS pixels for touch targets

// Correct - meets WCAG requirements
<button className="w-11 h-11 flex items-center justify-center">
  <Icon size={20} />
</button>

// Incorrect - too small
<button className="w-6 h-6">
  <Icon size={20} />
</button>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router | Next.js 13+ (stable in 15) | File-based routing with layouts, Server Components by default |
| CSS Modules | Tailwind CSS | 2020-2025 | Faster development, smaller bundles with purging |
| prefers-color-scheme only | Class-based dark mode | Tailwind 2.0+ | User control over theme, localStorage persistence |
| JavaScript scroll detection | Intersection Observer API | Browser standard since 2019 | Better performance, more reliable |
| defaultProps (React) | Default parameters | React 18+ | defaultProps deprecated in function components |
| GET caching by default | Opt-in caching | Next.js 15 | More predictable behavior, explicit caching |

**Deprecated/outdated:**
- **next/legacy/image**: Use next/image (automatic since Next.js 13)
- **Bootstrap grid system**: Use Tailwind responsive utilities
- **jQuery for scroll detection**: Use native Intersection Observer API
- **react-scroll library**: Native scrollIntoView with smooth behavior is sufficient
- **CSS-in-JS (styled-components)**: Tailwind is preferred for Next.js App Router

## Open Questions

Things that couldn't be fully resolved:

1. **Section content timing**
   - What we know: User expects real content from Phase 1, not placeholders
   - What's unclear: Whether to pull data from existing irenic-media site or marko template, or create new content
   - Recommendation: Review both codebases during planning to identify best source for each section

2. **Logo asset requirements**
   - What we know: Need separate dark/light theme logos, existing site uses single logo with CSS filters
   - What's unclear: Whether marko template has both logo variants, or if we need to extract/create them
   - Recommendation: Check marko_main_files/marko-react/public/assets/images/ for logo assets during task creation

3. **Social media links**
   - What we know: Footer should include social icons (LinkedIn, Twitter, Instagram, Email per existing site)
   - What's unclear: Actual social media URLs for Irenic Media
   - Recommendation: Use placeholder '#' hrefs initially, document need for real URLs in task

## Sources

### Primary (HIGH confidence)
- [Next.js 15 Official Docs](https://nextjs.org/docs/app) - App Router architecture
- [Tailwind CSS Dark Mode Docs](https://tailwindcss.com/docs/dark-mode) - Class-based dark mode configuration
- [Next.js Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating) - Link component behavior
- [WCAG Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html) - 44px minimum tap targets
- Existing codebase: irenic-media/ - Header, Footer, useInView patterns verified

### Secondary (MEDIUM confidence)
- [Next.js 15 Scroll Behavior Guide](https://dev.to/hijazi313/nextjs-15-scroll-behavior-a-comprehensive-guide-387j) - Smooth scroll implementation
- [Light & Dark Mode in Next.js App Router](https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind) - Theme toggle patterns
- [React Sticky Header Disappear on Scroll](https://www.codemzy.com/blog/react-sticky-header-disappear-scroll) - Scroll direction detection
- [Framer Motion Sliding Sidebar](https://egghead.io/blog/how-to-create-a-sliding-sidebar-menu-with-framer-motion) - Mobile menu animation
- [Highlighting Navigation on Scroll](https://www.thomasledoux.be/blog/highlighting-navigation-items-on-scroll) - Intersection Observer for nav

### Tertiary (LOW confidence)
- [Common Mistakes with Next.js App Router](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them) - Pitfalls compilation
- [Next.js 15 Upgrade Guide](https://prateeksha.com/blog/nextjs-15-upgrade-guide-app-router-caching-migration) - Caching changes
- [Hydration Errors in Next.js 2026](https://medium.com/@blogs-world/next-js-hydration-errors-in-2026-the-real-causes-fixes-and-prevention-checklist-4a8304d53702) - Hydration pitfalls

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js 15 + Tailwind is industry standard, verified in existing site
- Architecture: HIGH - App Router patterns documented officially, existing site follows conventions
- Pitfalls: MEDIUM - Community sources + official warnings, but some scenarios untested in this exact setup
- Code examples: HIGH - All patterns verified in official docs or existing irenic-media codebase

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days for stable stack, but monitor Next.js 15 updates)
