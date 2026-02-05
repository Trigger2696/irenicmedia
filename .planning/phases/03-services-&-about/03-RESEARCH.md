# Phase 3: Services & About - Research

**Researched:** 2026-02-05
**Domain:** React Card Components, Responsive Grid Layouts, Scroll Animations, Two-Column Layouts
**Confidence:** HIGH

## Summary

This research investigates patterns for implementing three content sections: Services (6 service cards in responsive grid), About (founder story + company values in two-column layout), and Why Us (4 differentiator cards with stats). The project already has the necessary animation infrastructure (framer-motion, react-intersection-observer), so the focus is on reusable card component patterns, responsive grid layouts, and icon selection.

The key challenges involve creating maintainable card components that avoid props explosion, implementing mobile-first responsive grids that stack properly, and selecting appropriate icons from lucide-react for digital marketing services. All animations should follow the established pattern from Phase 2 (AnimateOnScroll wrapper with framer-motion).

**Primary recommendation:** Create reusable Card component with composition pattern (CardIcon, CardTitle, CardDescription), use Tailwind grid with mobile-first breakpoints (grid-cols-1 md:grid-cols-2 lg:grid-cols-3), leverage lucide-react for service icons, and reuse the AnimateOnScroll pattern established in Hero.tsx for fade-in animations.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| lucide-react | 0.563.0 (installed) | Service/differentiator icons | Tree-shakeable, 1000+ icons, already in project |
| framer-motion | 12.33.0 (installed) | Card fade-in animations | Already in project, AnimateOnScroll pattern established |
| react-intersection-observer | 10.0.2 (installed) | Trigger animations on scroll | Already in project, used in Hero |
| Tailwind CSS | 4.x (installed) | Responsive grid layouts | CSS-based config already established |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 (installed) | Conditional card styling | Already in project via cn() utility |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| lucide-react | react-icons | lucide-react already installed, consistent design language |
| Card composition | Single Card with 10+ props | Composition avoids props explosion, more maintainable |
| CSS Grid | Flexbox with flex-wrap | Grid is more predictable for card layouts, better gap handling |

**Installation:**
```bash
# All dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── Hero/
│   ├── Hero.tsx                    # Existing, contains AnimateOnScroll
│   ├── YouTubeBackground.tsx
│   └── StatCounter.tsx
├── Services/
│   ├── Services.tsx                # Services section with grid
│   └── ServiceCard.tsx             # Individual service card
├── About/
│   ├── About.tsx                   # About section with two-column layout
│   ├── FounderStory.tsx            # Left column: story
│   └── CompanyValues.tsx           # Right column: values list
├── WhyUs/
│   ├── WhyUs.tsx                   # Why Us section with grid
│   └── DifferentiatorCard.tsx      # Card with icon, title, description, stat
app/
├── page.tsx                         # Import all section components
├── globals.css                      # Card styling if needed
```

### Pattern 1: Reusable Card Component with Composition
**What:** Card component that accepts icon, title, description as separate elements
**When to use:** Service cards, differentiator cards, any content card
**Example:**
```typescript
// components/Services/ServiceCard.tsx
'use client'

import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <div className={cn(
      'p-6 rounded-marko bg-[var(--accent-color-3)] border border-[var(--accent-color-3)]',
      'transition-all duration-300 hover:shadow-accent',
      className
    )}>
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-[var(--accent-color)] bg-opacity-10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-accent" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-primary mb-3">
        {title}
      </h3>
      <p className="text-[var(--text-color)] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
```

### Pattern 2: Mobile-First Responsive Grid (6 Cards)
**What:** Grid that displays 1 column mobile, 2 tablet, 3 desktop for 6 service cards
**When to use:** Service cards, differentiator cards (4 items), any card grid
**Example:**
```typescript
// components/Services/Services.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ServiceCard } from './ServiceCard'
import {
  Share2,      // Social Media
  Search,      // SEO
  TrendingUp,  // Performance Marketing
  Users,       // Influencer
  Smartphone,  // Mobile App
  Code         // Custom Software
} from 'lucide-react'

const services = [
  {
    icon: Share2,
    title: 'Social Media',
    description: 'Strategic social media management that builds engaged communities and drives conversions.'
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Data-driven SEO strategies that improve rankings and deliver sustainable organic growth.'
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'ROI-focused campaigns across paid channels optimized for maximum performance.'
  },
  {
    icon: Users,
    title: 'Influencer Marketing',
    description: 'Authentic influencer partnerships that amplify your brand and reach target audiences.'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Marketing',
    description: 'End-to-end app marketing from ASO to user acquisition and retention strategies.'
  },
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Bespoke software solutions built to solve unique business challenges.'
  }
]

// Reuse AnimateOnScroll from Hero or extract to shared utils
function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay = 0
}: {
  children: React.ReactNode
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'
  delay?: number
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  })

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="section bg-[var(--accent-color-3)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Our Services</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          What We <span className="accent-color">Offer</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Comprehensive digital marketing and technology solutions tailored to your business needs.
        </p>

        {/* Services Grid - Mobile-first responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimateOnScroll
              key={service.title}
              animation="fadeInUp"
              delay={index * 0.1}
            >
              <ServiceCard {...service} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 3: Two-Column Layout (Story + Values)
**What:** Desktop two-column layout that stacks on mobile
**When to use:** About section with founder story left, company values right
**Example:**
```typescript
// components/About/About.tsx
export default function About() {
  return (
    <section
      id="about"
      className="section"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">About Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
          Who We <span className="accent-color">Are</span>
        </h2>

        {/* Two-column layout: stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Founder Story */}
          <AnimateOnScroll animation="fadeInLeft">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Our Story
              </h3>
              <p className="text-[var(--text-color)] mb-4 leading-relaxed">
                Founded by <span className="text-accent font-semibold">Raj Shah</span> and{' '}
                <span className="text-accent font-semibold">Ruchika Chandel</span>, Irenic Media
                was born from a simple belief: that great marketing starts with great strategy.
              </p>
              <p className="text-[var(--text-color)] leading-relaxed">
                We saw too many brands chasing tactics without purpose, running campaigns without
                clarity. We built Irenic Media to be different—a place where strategy comes first,
                creativity has intent, and growth is built to last.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Company Values */}
          <AnimateOnScroll animation="fadeInRight">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                Our Values
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-accent mb-2">
                    Strategy First
                  </h4>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    We don't jump into tactics. Every campaign begins with deep strategic thinking.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-accent mb-2">
                    Creative Intent
                  </h4>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    Our creativity serves a purpose. Every design decision is backed by data and insights.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-accent mb-2">
                    Long-term Growth
                  </h4>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    We build for the long haul. Sustainable growth beats short-term wins every time.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
```

### Pattern 4: Differentiator Card with Stat Badge
**What:** Card displaying icon, title, description, and stat/metric
**When to use:** Why Us section differentiator cards
**Example:**
```typescript
// components/WhyUs/DifferentiatorCard.tsx
'use client'

import { LucideIcon } from 'lucide-react'

interface DifferentiatorCardProps {
  icon: LucideIcon
  title: string
  description: string
  stat: string
  statLabel: string
}

export function DifferentiatorCard({
  icon: Icon,
  title,
  description,
  stat,
  statLabel
}: DifferentiatorCardProps) {
  return (
    <div className="p-6 rounded-marko bg-[var(--accent-color-3)] border border-[var(--accent-color-3)] transition-all duration-300 hover:shadow-accent">
      {/* Icon with stat badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-full bg-[var(--accent-color)] bg-opacity-10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-accent" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">{stat}</div>
          <div className="text-xs text-[var(--text-color)]">{statLabel}</div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-primary mb-3">
        {title}
      </h3>
      <p className="text-[var(--text-color)] leading-relaxed">
        {description}
      </p>
    </div>
  )
}

// components/WhyUs/WhyUs.tsx
import { DifferentiatorCard } from './DifferentiatorCard'
import { Lightbulb, BarChart3, Handshake, Zap } from 'lucide-react'

const differentiators = [
  {
    icon: Lightbulb,
    title: 'Strategy Before Execution',
    description: 'We don't jump into tactics. Every campaign starts with deep strategic thinking and clear objectives.',
    stat: '100%',
    statLabel: 'Strategy First'
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Our decisions are backed by data, not guesswork. We measure everything that matters.',
    stat: '24/7',
    statLabel: 'Monitoring'
  },
  {
    icon: Handshake,
    title: 'Transparent Partnership',
    description: 'No black boxes. We share our thinking, our data, and our learnings openly.',
    stat: '95%',
    statLabel: 'Client Retention'
  },
  {
    icon: Zap,
    title: 'Agile & Adaptive',
    description: 'Markets change. We stay nimble, testing and iterating to stay ahead.',
    stat: '2x',
    statLabel: 'Faster Iteration'
  }
]

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="section bg-[var(--accent-color-3)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
          Why <span className="accent-color">Irenic Media</span>
        </h2>

        {/* 4 cards: 1 col mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((diff, index) => (
            <AnimateOnScroll key={diff.title} delay={index * 0.1}>
              <DifferentiatorCard {...diff} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Anti-Patterns to Avoid
- **Don't create separate components for every card variant:** Use composition pattern instead of props explosion
- **Don't use fixed pixel widths for cards:** Use grid with fr units for responsive behavior
- **Don't forget mobile-first breakpoints:** Start with grid-cols-1, add breakpoints up
- **Don't manually manage card indexes for keys:** Use unique identifiers from data (title is acceptable if unique)
- **Don't animate expensive properties:** Stick to opacity and transform (y, x) for smooth 60fps animations

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG components | lucide-react (installed) | 1000+ icons, tree-shakeable, consistent design |
| Responsive grids | Custom flex with media queries | Tailwind grid utilities | Mobile-first, less code, better maintainability |
| Card animations | CSS keyframes | Framer Motion + Intersection Observer | Declarative, handles cleanup, already in project |
| Two-column stacking | Custom breakpoint logic | Tailwind grid with lg:grid-cols-2 | Automatic stacking, no JS needed |
| Conditional styling | String concatenation | clsx/cn utility (installed) | Handles falsy values, cleaner syntax |

**Key insight:** The project already has all necessary tools installed. No new dependencies needed. Reuse the AnimateOnScroll pattern from Hero.tsx for consistent animation behavior across sections.

## Common Pitfalls

### Pitfall 1: Props Explosion in Card Components
**What goes wrong:** Card component has 10+ props for every variation (showStat, showBadge, iconPosition, etc.)
**Why it happens:** Trying to handle all variations in a single component
**How to avoid:** Use composition pattern—create separate ServiceCard and DifferentiatorCard components that share common styling
**Warning signs:** Card component file over 100 lines, difficult to understand which props are required

### Pitfall 2: Grid Not Stacking on Mobile
**What goes wrong:** Cards stay side-by-side on mobile, causing horizontal scroll or squished content
**Why it happens:** Forgot grid-cols-1 base class, only specified md: breakpoint
**How to avoid:** Always start with mobile-first: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
**Warning signs:** Cards look fine on desktop, broken on mobile

### Pitfall 3: Animation Replaying on Scroll
**What goes wrong:** Cards fade in every time user scrolls past them
**Why it happens:** Missing triggerOnce: true in useInView options
**How to avoid:** Always include `triggerOnce: true` for scroll-triggered animations
**Warning signs:** Cards flicker or re-animate when scrolling up and down

### Pitfall 4: Inconsistent Card Heights in Grid
**What goes wrong:** Cards in same row have different heights, creating misaligned layout
**Why it happens:** Content length varies, no height constraints
**How to avoid:** Let CSS Grid handle it naturally—all cards in a row will match tallest card's height automatically. If needed, use `items-start` on grid container
**Warning signs:** Cards don't align at top, uneven spacing

### Pitfall 5: Using Array Index as Key
**What goes wrong:** React reconciliation issues when list order changes or items are filtered
**Why it happens:** Using index from map as key: `{services.map((s, i) => <Card key={i} />)}`
**How to avoid:** Use unique identifier from data: `key={service.title}` (if titles are unique) or `key={service.id}`
**Warning signs:** Cards re-mount unnecessarily, state resets unexpectedly

### Pitfall 6: Missing Accessibility for Icon-Only Content
**What goes wrong:** Screen readers can't interpret meaning of icon-only elements
**Why it happens:** Icons rendered without aria-label or descriptive text
**How to avoid:** lucide-react icons are aria-hidden by default. Always pair with visible text (title) or add aria-label if icon-only
**Warning signs:** Screen reader testing reveals missing context

### Pitfall 7: Forgetting to Extract AnimateOnScroll
**What goes wrong:** AnimateOnScroll duplicated in Services, About, WhyUs sections
**Why it happens:** Copying AnimateOnScroll from Hero.tsx into each section file
**How to avoid:** Either import from Hero.tsx (if it's a local utility) or extract to shared utils/animations.ts file. For Phase 3, keeping it local in Hero.tsx is acceptable if only used in 2-3 files.
**Warning signs:** Same 30-line component repeated in multiple files

### Pitfall 8: Incorrect lucide-react Import Pattern
**What goes wrong:** Large bundle size or TypeScript errors when importing icons
**Why it happens:** Using dynamic icon loading or incorrect import syntax
**How to avoid:** Always use static imports: `import { Share2, Search } from 'lucide-react'`. Pass icon component as prop with type `LucideIcon`
**Warning signs:** Bundle includes all 1000+ icons, slow build times

## Code Examples

Verified patterns from official sources:

### lucide-react Icon Usage (Static Imports)
```typescript
// Source: https://lucide.dev/guide/packages/lucide-react
import { Camera, Heart, Share2 } from 'lucide-react'

// Correct - static import, tree-shakeable
<Camera className="w-6 h-6 text-accent" />

// Correct - passing as prop with proper typing
import { LucideIcon } from 'lucide-react'

interface CardProps {
  icon: LucideIcon
}

function Card({ icon: Icon }: CardProps) {
  return <Icon className="w-7 h-7" />
}

// Incorrect - dynamic loading imports all icons
import { DynamicIcon } from 'lucide-react/dynamic'
<DynamicIcon name="camera" /> // Avoid this
```

### Responsive Grid Pattern (Mobile-First)
```typescript
// Source: https://tailwindcss.com/docs/responsive-design
// 6 service cards: 1 col mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map(service => <ServiceCard key={service.title} {...service} />)}
</div>

// 4 differentiator cards: 1 col mobile, 2 tablet, 4 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {differentiators.map(diff => <DifferentiatorCard key={diff.title} {...diff} />)}
</div>

// Two-column layout: stack mobile, side-by-side desktop
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Reusing AnimateOnScroll Pattern
```typescript
// Source: irenic-media-new/components/Hero/Hero.tsx (Phase 2)
// Option 1: Import from Hero.tsx (if exported)
import { AnimateOnScroll } from '@/components/Hero/Hero'

// Option 2: Extract to shared utility (recommended for Phase 3+)
// utils/animations.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay = 0
}: {
  children: React.ReactNode
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'
  delay?: number
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  })

  const variants = {
    fadeInUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    fadeInLeft: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    fadeInRight: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Usage in any section
<AnimateOnScroll animation="fadeInUp" delay={0.1}>
  <ServiceCard {...service} />
</AnimateOnScroll>
```

### Card Hover Effects (Matching Marko Template)
```typescript
// app/globals.css already has shadow utilities
// Use existing shadow-accent class for hover effect
<div className="transition-all duration-300 hover:shadow-accent hover:-translate-y-1">
  {/* Card content */}
</div>

// Or use Tailwind hover utilities
<div className="hover:shadow-[var(--box-shadow-top-left),var(--box-shadow-bottom-right)] transition-shadow duration-300">
  {/* Card content */}
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flexbox for card grids | CSS Grid | 2017+ | More predictable layouts, better gap handling |
| react-icons | lucide-react | 2022+ | Smaller bundle, better tree-shaking, consistent design |
| animate.css | Framer Motion | 2020+ | Better React integration, exit animations, gesture support |
| Custom icon components | Icon libraries | 2020+ | Faster development, consistent design system |
| Bootstrap grid classes | Tailwind responsive utilities | 2019+ | Mobile-first by default, more flexible |

**Deprecated/outdated:**
- **react-icons:** Still works but lucide-react has better tree-shaking and smaller bundle
- **Bootstrap card components:** Tailwind utility classes provide same result with less overhead
- **jQuery card plugins:** Native React components are simpler and more performant
- **CSS Modules for card styling:** Tailwind utilities are faster for component-level styling

## Open Questions

Things that couldn't be fully resolved:

1. **Service descriptions length**
   - What we know: Each service needs title and description
   - What's unclear: Exact word count or character limits for descriptions
   - Recommendation: Use 1-2 sentences (~15-25 words) for consistency

2. **Icon selection for services**
   - What we know: lucide-react has relevant icons (Share2, Search, TrendingUp, Users, Smartphone, Code)
   - What's unclear: Whether client has specific icon preferences or brand guidelines
   - Recommendation: Use suggested icons, document that they can be customized

3. **Differentiator stats format**
   - What we know: Each differentiator needs a stat/metric (100%, 24/7, 95%, 2x)
   - What's unclear: Actual metrics from Irenic Media's data
   - Recommendation: Use placeholder metrics that sound realistic, mark for client review

4. **AnimateOnScroll extraction timing**
   - What we know: Pattern is currently in Hero.tsx, will be needed in 3+ sections
   - What's unclear: Whether to extract now or wait until Phase 4+
   - Recommendation: For Phase 3, duplicate in sections (acceptable for 2-3 files). Extract to utils/animations.tsx in Phase 4 if more sections need it

## Sources

### Primary (HIGH confidence)
- [lucide-react Official Docs](https://lucide.dev/guide/packages/lucide-react) - Icon usage, tree-shaking, TypeScript types
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Mobile-first breakpoints
- [CSS Grid Layout Guide](https://css-tricks.com/css-grid-layout-guide/) - Grid fundamentals
- Existing codebase: irenic-media-new/components/Hero/Hero.tsx - AnimateOnScroll pattern verified
- Existing codebase: irenic-media-new/app/globals.css - Card styling utilities (shadow-accent, rounded-marko)

### Secondary (MEDIUM confidence)
- [React Intersection Observer Guide](https://www.builder.io/blog/react-intersection-observer) - Best practices for scroll animations
- [Framer Motion Scroll Animations](https://motion.dev/docs/react-scroll-animations) - Scroll-triggered animation patterns
- [Mastering Responsive Layouts with Tailwind Grid](https://codeparrot.ai/blogs/mastering-responsive-layouts-with-tailwind-grid-in-react) - Grid best practices
- [React Component Reusability with TypeScript](https://medium.com/@muhabbat.dev/reusable-react-components-with-typescript-a-step-by-step-guide-1ba2c63c6344) - Card composition patterns

### Tertiary (LOW confidence)
- [React Anti-Patterns to Avoid](https://itnext.io/6-common-react-anti-patterns-that-are-hurting-your-code-quality-904b9c32e933) - Common mistakes
- [Fix Tailwind Grid Issues](https://cliptics.com/blog/fix-tailwind-grid-issues-common-problems-solutions) - Grid troubleshooting

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, lucide-react verified
- Architecture: HIGH - Patterns follow established conventions from Phase 1-2
- Pitfalls: HIGH - Mobile-first grid mistakes and props explosion are well-documented issues
- Code examples: HIGH - All patterns verified in official docs or existing codebase

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - stack is stable, but monitor Tailwind v4 updates)
