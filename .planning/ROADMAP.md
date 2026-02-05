# Roadmap

## Milestone: v1.0 — Irenic Media Website Launch

This roadmap delivers a complete single-page Next.js website that matches the marko template's visual design while showcasing Irenic Media's positioning as a strategy-first digital agency.

---

## Progress

| Phase | Goal | Requirements | Status |
|-------|------|--------------|--------|
| 1 - Foundation & Layout | Core structure and navigation working | 5 | Complete |
| 2 - Hero Section | Video background hero with brand messaging live | 5 | Not Started |
| 3 - Services & About | Core content sections complete | 10 | Not Started |
| 4 - Social Proof | Testimonials and case studies displayed | 6 | Not Started |
| 5 - Pricing & Contact | Lead conversion sections functional | 7 | Not Started |
| 6 - Visual Polish | Animations and styling match template exactly | 5 | Not Started |

---

## Phase Breakdown

### Phase 1: Foundation & Layout

**Goal:** Core site structure is navigable with responsive layout and theme toggle working.

**Dependencies:** None (foundation phase)

**Requirements:**
- LAYOUT-01: Responsive single-page layout (mobile, tablet, desktop)
- LAYOUT-02: Header with logo and navigation links
- LAYOUT-03: Footer with service links, company links, social icons, copyright
- LAYOUT-04: Smooth-scroll navigation to sections
- LAYOUT-05: Dark/light theme toggle

**Success Criteria:**
1. User can view the site layout on mobile, tablet, and desktop without breaking
2. User can click navigation links in header and smoothly scroll to placeholder sections
3. User can toggle between dark and light themes and see immediate visual change
4. User can see footer with all required links and social icons
5. All navigation anchor links work correctly without page reload

**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — Project setup, CSS foundation, theme infrastructure
- [x] 01-02-PLAN.md — Header with scroll behavior, mobile menu, theme toggle
- [x] 01-03-PLAN.md — Footer with links, social icons, page integration

---

### Phase 2: Hero Section

**Goal:** Hero section displays video background with brand messaging and CTAs.

**Dependencies:** Phase 1 (layout foundation)

**Requirements:**
- HERO-01: YouTube video fullscreen background (muted, looped, autoplay)
- HERO-02: Main headline: "Growth without chaos. Strategy without noise."
- HERO-03: Subheadline describing value proposition
- HERO-04: Two CTA buttons: "Start Your Journey" and "Explore Services"
- HERO-05: Stats display: 50+ Projects, 95% Client Retention, 3x Average ROI

**Success Criteria:**
1. User sees video playing automatically as hero background on page load
2. User can read brand headline and subheadline clearly over video background
3. User can click "Start Your Journey" and scroll to contact section
4. User can click "Explore Services" and scroll to services section
5. User can see all three stats displayed prominently in hero

**Plans:** 2 plans

Plans:
- [ ] 02-01-PLAN.md — Install react-intersection-observer, useCountUp hook, YouTubeBackground component
- [ ] 02-02-PLAN.md — StatCounter component, Hero section, page integration

---

### Phase 3: Services & About

**Goal:** Core content sections communicate what Irenic Media does and who they are.

**Dependencies:** Phase 1 (layout), Phase 2 (for visual consistency)

**Requirements:**
- SERV-01: 6 service cards in responsive grid
- SERV-02: Each service card shows icon, title, description
- SERV-03: All 6 services displayed (Social Media, SEO, Performance Marketing, Influencer, Mobile App, Custom Software)
- SERV-04: Service cards animate on scroll (fade-in)
- ABOUT-01: Founder story (Raj Shah & Ruchika Chandel)
- ABOUT-02: Company values: Strategy First, Creative Intent, Long-term Growth
- ABOUT-03: Two-column layout (story left, values right on desktop)
- WHY-01: 4 differentiator cards
- WHY-02: Differentiators: Strategy Before Execution, Data-Driven Decisions, Transparent Partnership, Agile & Adaptive
- WHY-03: Each differentiator card shows icon, title, description, and stat

**Success Criteria:**
1. User can scroll to services section and see all 6 services in a responsive grid
2. User can read service descriptions with clear icons for each service
3. User can scroll to about section and learn about founders and company values
4. User sees two-column layout on desktop that stacks on mobile
5. User can view 4 differentiator cards explaining why to choose Irenic Media
6. Service cards fade in as user scrolls to them

---

### Phase 4: Social Proof

**Goal:** Testimonials and case studies build credibility with realistic client stories.

**Dependencies:** Phase 1 (layout), Phase 3 (content pattern established)

**Requirements:**
- TEST-01: 3-4 client testimonials displayed
- TEST-02: Each testimonial shows client photo, name, company, role, review text
- TEST-03: Testimonials match marko template card styling
- CASE-01: 3-4 project showcases displayed
- CASE-02: Each case study shows project image, title, category, key results
- CASE-03: Case studies match marko template card styling

**Success Criteria:**
1. User can scroll to testimonials section and read 3-4 client reviews
2. User sees client photo, name, company, and role for each testimonial
3. User can scroll to case studies section and view 3-4 project examples
4. User can see project image, category, and key results for each case study
5. Both sections match the marko template's card styling visually

---

### Phase 5: Pricing & Contact

**Goal:** Pricing tiers are clear and contact form captures leads successfully.

**Dependencies:** Phase 1 (layout), Phase 2 (CTAs point here)

**Requirements:**
- PRICE-01: 3 service tiers displayed (Starter, Growth, Enterprise)
- PRICE-02: Each tier shows price, feature list, CTA button
- PRICE-03: Pricing matches marko template with highlighted "popular" tier
- CONT-01: Contact form with name, email, company, message fields
- CONT-02: Form validates required fields and email format
- CONT-03: Contact info displayed: email, phone, location
- CONT-04: Form shows success message after submission

**Success Criteria:**
1. User can scroll to pricing section and compare 3 service tiers
2. User can identify the "popular" tier with visual highlighting
3. User can see feature lists and prices for each tier
4. User can fill out contact form with name, email, company, and message
5. User receives validation errors if required fields are empty or email is invalid
6. User sees success message after submitting valid form
7. User can see contact email, phone, and location displayed

---

### Phase 6: Visual Polish

**Goal:** All animations, styling, and visual details match marko template exactly.

**Dependencies:** All previous phases (applies polish to completed sections)

**Requirements:**
- VIS-01: Site matches marko template CSS styling exactly
- VIS-02: Marko template color scheme and typography applied
- VIS-03: Animate.css or equivalent scroll animations
- VIS-04: Font Awesome icons matching template
- VIS-05: All sections animate on scroll (fadeIn, slideUp patterns)

**Success Criteria:**
1. User experiences smooth scroll animations (fadeIn, slideUp) on all sections
2. Visual comparison with marko template shows matching colors, fonts, spacing
3. All icons use Font Awesome library matching template choices
4. User sees consistent animation timing and easing across all sections
5. Site feels polished and production-ready with no visual inconsistencies

---

## Notes

**Depth:** Standard (6 phases)
**Coverage:** 38/38 v1 requirements mapped (100%)

**Content creation phases:**
- Phase 4 requires creating fictional testimonials and case studies
- Phase 5 requires defining pricing tiers appropriate for digital agency

**Technical dependencies:**
- Next.js setup happens in Phase 1
- marko template CSS extraction happens in Phases 1 & 6
- YouTube video embed setup in Phase 2
