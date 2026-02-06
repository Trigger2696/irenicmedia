---
phase: 06-visual-polish
plan: 01
subsystem: animations
tags: [framer-motion, react-intersection-observer, scroll-animations, refactor]

dependency-graph:
  requires: [05-01]
  provides: [shared-animate-on-scroll-component]
  affects: [06-02, 06-03]

tech-stack:
  added: []
  patterns: [shared-animation-wrapper, standardized-timing]

key-files:
  created:
    - irenic-media-new/components/AnimateOnScroll.tsx
  modified:
    - irenic-media-new/components/Services/Services.tsx
    - irenic-media-new/components/About/About.tsx
    - irenic-media-new/components/WhyUs/WhyUs.tsx
    - irenic-media-new/components/Testimonials/Testimonials.tsx
    - irenic-media-new/components/CaseStudies/CaseStudies.tsx
    - irenic-media-new/components/Pricing/Pricing.tsx
    - irenic-media-new/components/Contact/Contact.tsx

decisions:
  - id: shared-animation-component
    choice: "Created single AnimateOnScroll component used by 7 sections"
    rationale: "Eliminates 226 lines of duplicated animation code"
  - id: animation-prop-naming
    choice: "Use 'animation' prop instead of 'variant'"
    rationale: "Clearer naming convention matching component purpose"
  - id: hero-animation-local
    choice: "Keep Hero.tsx local AnimateOnScroll unchanged"
    rationale: "Per project decision: component only used in hero section"

metrics:
  duration: ~4.5min
  completed: 2026-02-06
---

# Phase 6 Plan 1: Extract and Standardize AnimateOnScroll Summary

**One-liner:** Shared AnimateOnScroll wrapper consolidating scroll animations across 7 sections with standardized 600ms/easeOut timing.

## What Was Built

### Task 1: Shared AnimateOnScroll Component
Created `irenic-media-new/components/AnimateOnScroll.tsx`:
- Supports 4 animation types: fadeIn, fadeInUp, fadeInLeft, fadeInRight
- Standardized timing: 600ms duration, easeOut easing, 15% viewport threshold
- Configurable props: animation, delay, duration, threshold, className
- Uses framer-motion + react-intersection-observer
- Both named and default exports

### Task 2: Section Migration
Migrated 7 section components to use the shared component:
- **Services.tsx**: Removed local definition, uses fadeInUp (default)
- **About.tsx**: Removed local definition, uses fadeInLeft/fadeInRight
- **WhyUs.tsx**: Removed local definition, uses fadeInUp (default)
- **Testimonials.tsx**: Removed local definition, uses fadeInUp (default)
- **CaseStudies.tsx**: Removed local definition, uses fadeInUp (default)
- **Pricing.tsx**: Removed local definition, uses fadeInUp (default)
- **Contact.tsx**: Removed local definition, changed variant prop to animation

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Shared animation component | Single AnimateOnScroll in components/ | Eliminates 226 lines of duplicated code |
| Animation prop naming | `animation` prop | Clearer than `variant`, matches component purpose |
| Hero.tsx unchanged | Keep local AnimateOnScroll | Per project decision - only used in hero |
| Timing standardization | 600ms, easeOut, 0.15 threshold | Matches marko template specifications |

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- [x] Shared AnimateOnScroll component exists at irenic-media-new/components/AnimateOnScroll.tsx
- [x] No local AnimateOnScroll function definitions in section components (grep confirmed)
- [x] All 7 sections import from shared component
- [x] TypeScript compiles without errors
- [x] Build succeeds (Next.js production build)

## Code Statistics

- **Lines removed:** 226 (duplicated animation code)
- **Lines added:** 83 (shared component)
- **Net reduction:** 143 lines

## Key Code Patterns

### AnimateOnScroll Usage
```tsx
// Default fadeInUp animation
<AnimateOnScroll delay={index * 0.1}>
  <Card />
</AnimateOnScroll>

// Directional animations
<AnimateOnScroll animation="fadeInLeft">
  <Content />
</AnimateOnScroll>
```

### Animation Variants
```typescript
const animationVariants = {
  fadeIn: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  fadeInUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  fadeInLeft: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  fadeInRight: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }
}
```

## Next Phase Readiness

Ready for 06-02 (Button Hover Microinteractions):
- Animation infrastructure established
- Consistent framer-motion patterns in place
- Build verified working
