# Phase 1 Context: Foundation & Layout

## Navigation Behavior

**Header:**
- **Show on scroll up** — Header hides when scrolling down, reappears on scroll up
- Smooth transition animation when showing/hiding

**Mobile Menu:**
- Hamburger menu icon on mobile/tablet
- **Slide from right** — Full-height panel slides in from right side
- Close on link click or outside tap

**Active State:**
- Navigation links highlight based on current scroll position
- Use Intersection Observer or scroll spy pattern
- Visual indicator (underline, color change) on active link

**Logo:**
- Click scrolls smoothly to top (hero section)
- No page reload

---

## Theme Toggle UX

**Default Theme:**
- **Dark theme** by default (matches current irenic-media brand)

**Persistence:**
- Save choice to localStorage
- On return visit, load saved preference
- Fall back to dark if no preference saved

**Toggle Location:**
- In header navigation bar
- Visible on both desktop and mobile

**Transition:**
- **Smooth animation** (~200ms) when switching themes
- All colors transition together

---

## Mobile Layout

**Breakpoints:**
- Use Tailwind CSS defaults:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

**Footer on Mobile:**
- Columns stack vertically
- Links remain visible (no accordion)
- Social icons stay in row

**Touch Targets:**
- Minimum 44px tap targets for all interactive elements
- Ensure accessibility compliance

---

## Section Structure

**Important:** Sections should contain **real, complete content** — not placeholders. The user expects the site to look finished from Phase 1.

**Content Strategy:**
- Use real Irenic Media data where available (from existing irenic-media codebase)
- Create realistic fictional content for testimonials, case studies, pricing
- All text, images, and data should look production-ready

**Section Order (top to bottom):**
1. Hero
2. Services
3. About
4. Why Us
5. Testimonials
6. Case Studies
7. Pricing
8. Contact

**Section Heights:**
- Each section uses its natural content height
- No artificial height constraints
- Content determines section size

---

## Deferred Ideas

(None captured during this discussion)

---

*Created: 2026-02-05*
*Phase: 1 - Foundation & Layout*
