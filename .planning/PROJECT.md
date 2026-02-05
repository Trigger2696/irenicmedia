# Irenic Media Website Rebuild

## What This Is

A complete rebuild of the Irenic Media website using the marko template's visual design, ported to Next.js. The site showcases Irenic Media's services as a strategy-led digital marketing and technology agency, with a single-page layout featuring video background hero, services, about, testimonials, case studies, pricing, and contact sections.

## Core Value

The website must clearly communicate Irenic Media's positioning as a strategy-first agency and make it easy for potential clients to understand services and get in touch.

## Requirements

### Validated

(From existing irenic-media codebase)

- ✓ Hero section with tagline and CTAs — existing
- ✓ Services section displaying 6 core services — existing
- ✓ About section with founder story and values — existing
- ✓ Why Us section with differentiators — existing
- ✓ Contact form with validation — existing
- ✓ Footer with navigation and social links — existing
- ✓ Responsive design — existing

### Active

- [ ] Port marko template visual design to Next.js
- [ ] Video background hero matching template exactly
- [ ] Testimonials section with client reviews (create content)
- [ ] Case Studies section showcasing work (create content)
- [ ] Pricing section with service tiers (create content)
- [ ] Match template CSS, animations, and layout patterns
- [ ] Single-page navigation with anchor links
- [ ] Dark/light theme toggle (from template)

### Out of Scope

- Multi-page routing (Blog, separate Service pages) — keeping single-page for simplicity
- Newsletter signup backend — no email service configured
- Video modal popups — adds complexity without clear value
- Partner/client logo carousel — no client logos provided
- Map integration — unnecessary for contact section
- Blog section — no content to populate

## Context

**Existing assets:**
- irenic-media: Current Next.js site with real business data (services, about, contact info, brand copy)
- marko_main_files: Vite/React template to match visually

**Business data to preserve:**
- Brand: Irenic Media — "Growth without chaos. Strategy without noise."
- Founders: Raj Shah & Ruchika Chandel
- Contact: hello@irenicmedia.com, +91 98765 43210, Mumbai, India
- Services: Social Media Marketing, SEO, Performance Marketing, Influencer Campaigns, Mobile App Dev, Custom Software Dev
- Stats: 50+ Projects, 95% Client Retention, 3x Average ROI

**Content to create:**
- 3-4 testimonials from fictional but realistic clients
- 3-4 case studies with realistic metrics
- 3 pricing tiers appropriate for a digital agency

## Constraints

- **Tech stack**: Next.js with TypeScript — consistency with existing setup
- **Styling**: Match marko template CSS exactly — user requirement
- **Data**: All business data from irenic-media must be preserved
- **Simplicity**: No unnecessary features — user requirement

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page over multi-page | Simpler, cleaner for service agency | — Pending |
| Next.js over Vite | Better SEO, matches existing setup | — Pending |
| Create fictional testimonials/cases | No real client data available | — Pending |
| Match template exactly | User explicitly requested visual match | — Pending |

---
*Last updated: 2026-02-05 after initialization*
