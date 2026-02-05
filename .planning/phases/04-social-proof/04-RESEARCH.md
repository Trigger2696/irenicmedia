# Phase 4: Social Proof - Research

**Researched:** 2026-02-05
**Domain:** Testimonial Cards, Case Study Showcases, Carousel Components, Social Proof Patterns
**Confidence:** HIGH

## Summary

This research investigates patterns for implementing two social proof sections: Testimonials (3-4 client testimonials with photos, ratings, and reviews) and Case Studies (3-4 project showcases with images, titles, categories, and key results). The project already has the necessary animation infrastructure (framer-motion, useInView hook) and card composition patterns (Card, CardHeader, CardBody) from previous phases.

The key challenges involve selecting the right carousel library for testimonials (Embla vs Swiper vs pure CSS grid), implementing accessible star ratings, using Next.js Image component for optimized client photos, and creating tag badge patterns for case study categories. All components should follow the established Card composition pattern and animation patterns from Phase 3.

The marko template reference shows testimonials using Swiper.js carousel with star ratings and case studies in a 2x2 grid layout with category tags. However, for Next.js with SSR and maximum performance, Embla Carousel (7KB) is recommended over Swiper (45KB) if carousel functionality is needed, though a simple responsive grid may suffice.

**Primary recommendation:** Use responsive grid layout (avoiding carousel complexity initially), reuse existing Card composition pattern for both testimonial and case study cards, implement read-only star rating with proper aria-label for accessibility, use Next.js Image component with blur placeholders for client photos, and create pill-shaped badges for case study tags.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | ^11.2.4 (installed) | Card fade-in animations | Already in project, established animation patterns |
| useInView hook | custom (installed) | Trigger animations on scroll | Already implemented in project hooks/ |
| next/image | 16.1.6 (built-in) | Optimized testimonial photos | Next.js built-in, automatic WebP, lazy loading |
| lucide-react | ^0.378.0 (installed) | Star icons, quote icons | Tree-shakeable, consistent with Phase 3 |
| Tailwind CSS | ^3.4.3 (installed) | Responsive grid layouts, badge styling | CSS-based, mobile-first |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| embla-carousel-react | 8.5+ (not installed) | Testimonial carousel (optional) | Only if carousel required, SSR-safe, 7KB bundle |
| next/font | 16.1.6 (built-in) | Font optimization for names/titles | Next.js built-in, automatic optimization |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Grid layout | Embla Carousel | Grid is simpler, carousel adds complexity but better UX on mobile |
| Grid layout | Swiper.js | Swiper has 45KB bundle vs grid (0KB) or Embla (7KB), poor SSR support |
| lucide-react Star | react-rating library | lucide-react already installed, custom star display is simple for read-only |
| Next.js Image | Regular img tag | Next.js Image provides automatic optimization, WebP, blur placeholder |

**Installation:**
```bash
# All core dependencies already installed

# Optional: Only if carousel is required
npm install embla-carousel-react
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── Testimonials/
│   ├── Testimonials.tsx            # Testimonials section with grid
│   ├── TestimonialCard.tsx         # Individual testimonial card
│   └── StarRating.tsx              # Read-only star rating component
├── CaseStudies/
│   ├── CaseStudies.tsx             # Case studies section with grid
│   ├── CaseStudyCard.tsx           # Individual case study card
│   └── Badge.tsx                   # Tag badge component
├── ui/
│   ├── Card.tsx                    # Existing - reuse for composition
app/
├── page.tsx                         # Import Testimonials and CaseStudies
├── globals.css                      # Badge utility classes if needed
public/
├── images/
│   ├── testimonials/                # Client photos (400x400 recommended)
│   └── case-studies/                # Project images (600x400 recommended)
```

### Pattern 1: Testimonial Card with Star Rating
**What:** Card displaying client photo, name, company, role, star rating, and review text
**When to use:** Testimonials section (3-4 cards)
**Example:**
```typescript
// components/Testimonials/TestimonialCard.tsx
'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'

interface TestimonialCardProps {
  name: string
  company: string
  role: string
  rating: number // 1-5
  review: string
  image: string
  className?: string
}

export function TestimonialCard({
  name,
  company,
  role,
  rating,
  review,
  image,
  className = ''
}: TestimonialCardProps) {
  return (
    <Card variant="elevated" className={`h-full ${className}`}>
      <CardHeader>
        {/* Star Rating - Read-only with aria-label */}
        <div className="flex gap-1 mb-4" role="img" aria-label={`${rating} out of 5 stars`}>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={20}
              className={index < rating ? 'fill-black text-black' : 'text-gray-300'}
            />
          ))}
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={image}
              alt={`${name} profile photo`}
              fill
              className="rounded-full object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-black">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
            <p className="text-sm text-gray-500">{company}</p>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {/* Review Text with Quote Icon */}
        <blockquote className="text-gray-700 leading-relaxed">
          "{review}"
        </blockquote>
      </CardBody>
    </Card>
  )
}
```

### Pattern 2: Case Study Card with Tags
**What:** Card displaying project image, title, category tags, and key results
**When to use:** Case studies section (3-4 cards)
**Example:**
```typescript
// components/CaseStudies/CaseStudyCard.tsx
'use client'

import Image from 'next/image'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from './Badge'

interface CaseStudyCardProps {
  title: string
  description: string
  tags: string[] // e.g., ["SEO", "Content", "Analytics"]
  image: string
  className?: string
}

export function CaseStudyCard({
  title,
  description,
  tags,
  image,
  className = ''
}: CaseStudyCardProps) {
  return (
    <Card variant="elevated" className={`h-full ${className}`}>
      <CardHeader className="p-0">
        {/* Project Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={`${title} project screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardBody>
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-black mb-3">
          {title}
        </h3>

        {/* Description / Key Results */}
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
```

### Pattern 3: Badge Component for Tags
**What:** Pill-shaped badge for case study categories/tags
**When to use:** Case study cards, skill tags, category labels
**Example:**
```typescript
// components/CaseStudies/Badge.tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    accent: 'bg-black/5 text-black hover:bg-black/10'
  }

  return (
    <span className={`
      inline-flex items-center
      px-3 py-1
      text-xs font-medium
      rounded-full
      transition-colors duration-200
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  )
}
```

### Pattern 4: Responsive Grid for Testimonials/Cases
**What:** Mobile-first grid that displays 1 col mobile, 2 tablet, 3 desktop
**When to use:** Both testimonials and case studies sections
**Example:**
```typescript
// components/Testimonials/Testimonials.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { TestimonialCard } from './TestimonialCard'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechCorp',
    role: 'Marketing Director',
    rating: 5,
    review: 'Irenic Media transformed our digital presence. Their strategic approach resulted in 150% increase in qualified leads within 6 months.',
    image: '/images/testimonials/sarah-johnson.jpg'
  },
  // ... 2-3 more testimonials
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Testimonials() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
            Client Stories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-black mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real results from real clients. Here's how we've helped businesses
            like yours achieve their digital marketing goals.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

### Pattern 5: Next.js Image with Blur Placeholder
**What:** Optimized image loading with blur placeholder for perceived performance
**When to use:** Client photos, case study images
**Example:**
```typescript
// For static images with blur data URL (recommended for small set of images)
import Image from 'next/image'

// Option 1: External images (requires next.config.js domains config)
<Image
  src="/images/testimonials/client-photo.jpg"
  alt="Client name"
  width={64}
  height={64}
  className="rounded-full"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate with plaiceholder or similar
/>

// Option 2: Fill container (for cards)
<div className="relative w-full h-48">
  <Image
    src="/images/cases/project.jpg"
    alt="Project screenshot"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
</div>
```

### Anti-Patterns to Avoid
- **Don't use array index as key for testimonials:** Use unique ID from data
- **Don't skip alt text on images:** Critical for accessibility and SEO
- **Don't use decorative star icons without aria-label:** Read-only ratings need role="img" and descriptive label
- **Don't forget Next.js Image sizes prop:** Prevents layout shift and enables proper responsive loading
- **Don't use regular img tag for testimonial photos:** Next.js Image provides automatic optimization
- **Don't create separate badge variants for every color:** Keep it simple with 2-3 variants max
- **Don't make star rating interactive on testimonials:** These are display-only, not user input

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading, WebP conversion | next/image (built-in) | Automatic optimization, blur placeholder, responsive sizing |
| Carousel/slider | Custom swipe detection, pagination | Embla Carousel (if needed) | 7KB, SSR-safe, accessible, touch gestures |
| Star rating display | SVG star paths | lucide-react Star icon | Already installed, consistent design, tree-shakeable |
| Badge/tag styling | Custom pill CSS | Tailwind utilities with component | Mobile-first, no CSS file needed |
| Scroll animations | Custom IntersectionObserver per component | useInView hook (installed) | Reusable, cleanup handled, already in project |
| Card composition | Monolithic card component | Card/CardHeader/CardBody pattern | Already established in Phase 3, flexible |

**Key insight:** The project already has all necessary tools. No new heavy dependencies needed. If carousel is absolutely required, Embla Carousel (7KB) is the only acceptable addition due to Next.js SSR compatibility. Otherwise, use responsive grid which is simpler and performs better.

## Common Pitfalls

### Pitfall 1: Carousel Complexity vs Grid Simplicity
**What goes wrong:** Adding Swiper.js (45KB) or complex carousel when simple grid would work
**Why it happens:** Marko template uses carousel, assumption it's required
**How to avoid:** Start with responsive grid. Only add carousel if user testing shows mobile users struggle navigating 3-4 testimonials. If carousel needed, use Embla (7KB, SSR-safe) not Swiper (45KB, SSR issues)
**Warning signs:** Hydration mismatches in Next.js, large bundle size increase, poor Lighthouse scores

### Pitfall 2: Missing aria-label on Star Rating
**What goes wrong:** Screen readers can't interpret star rating meaning
**Why it happens:** Decorative icons rendered without semantic information
**How to avoid:** Wrap star rating in container with role="img" and aria-label="{rating} out of 5 stars"
**Warning signs:** Screen reader testing reveals no rating information announced

### Pitfall 3: Regular img Tag Instead of next/image
**What goes wrong:** Client photos load unoptimized, cause layout shift, poor performance
**Why it happens:** Copying HTML patterns from marko template (non-Next.js)
**How to avoid:** Always use next/image for testimonial photos and case study images with proper width/height or fill prop
**Warning signs:** Large image file sizes, layout shift on load, poor Core Web Vitals

### Pitfall 4: Missing sizes Attribute on next/image
**What goes wrong:** Next.js can't generate optimal srcset, loads wrong image size
**Why it happens:** sizes prop is optional but critical for responsive images
**How to avoid:** Always specify sizes for fill images: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
**Warning signs:** Large images loaded on mobile, wasted bandwidth

### Pitfall 5: Badge Tag Proliferation
**What goes wrong:** 10+ different badge styles, inconsistent design
**Why it happens:** Creating new badge variant for every use case
**How to avoid:** Limit to 2 variants: default (gray) and accent (black). Use consistent styling across all tags
**Warning signs:** Multiple badge components, CSS file growing, inconsistent spacing

### Pitfall 6: Interactive Star Rating on Testimonials
**What goes wrong:** Users think they can rate testimonials, click handlers added unnecessarily
**Why it happens:** Copying interactive rating component patterns
**How to avoid:** Testimonials show read-only ratings. Use simple div with Star icons, not clickable buttons
**Warning signs:** onClick handlers on stars, cursor:pointer on testimonial ratings

### Pitfall 7: Not Optimizing Testimonial Photos
**What goes wrong:** Large 2000x2000 photos loaded when 64x64 display size
**Why it happens:** Using original high-res photos without resizing
**How to avoid:** Prepare testimonial photos at 400x400 (2x for retina), use next/image which generates smaller sizes automatically
**Warning signs:** Multi-megabyte page loads, slow mobile performance

### Pitfall 8: Forgetting Multiple Card Heights in Grid
**What goes wrong:** Cards with different content lengths create uneven layout
**Why it happens:** Testimonial reviews vary in length (100-300 words)
**How to avoid:** Add h-full to Card component so CSS Grid auto-stretches to tallest card in row. Keep review text to ~50-100 words for consistency
**Warning signs:** Cards don't align at bottom, uneven spacing

### Pitfall 9: Case Study Images Without Next.js Config
**What goes wrong:** Next.js Image component errors if images from external domains
**Why it happens:** Forgot to add image domains to next.config.js
**How to avoid:** For external images, add domains to next.config.js remotePatterns. For local images, use /public/images/
**Warning signs:** Next.js Image component throws "Invalid src" errors

## Code Examples

Verified patterns from official sources:

### Next.js Image Component for Testimonials
```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'

// Client photo (circular avatar)
<div className="relative w-16 h-16 flex-shrink-0">
  <Image
    src="/images/testimonials/client.jpg"
    alt="Client name profile photo"
    fill
    className="rounded-full object-cover"
    sizes="64px"
  />
</div>

// Case study image (rectangular)
<div className="relative w-full h-48">
  <Image
    src="/images/cases/project.jpg"
    alt="Project screenshot"
    fill
    className="object-cover rounded-t-2xl"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
</div>

// With blur placeholder (recommended)
<Image
  src="/images/testimonials/client.jpg"
  alt="Client name"
  width={64}
  height={64}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Read-Only Star Rating with Accessibility
```typescript
// Source: https://mui.com/material-ui/react-rating/ (accessibility patterns)
import { Star } from 'lucide-react'

// Read-only rating display (testimonials)
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={20}
          className={
            index < rating
              ? 'fill-black text-black'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  )
}

// Usage in testimonial card
<StarRating rating={5} />
```

### Badge/Tag Component Pattern
```typescript
// Source: Tailwind CSS utilities + https://smart-interface-design-patterns.com/articles/badges-chips-tags-pills/
// Pill-shaped badges for case study tags
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    accent: 'bg-black/5 text-black hover:bg-black/10'
  }

  return (
    <span className={`
      inline-flex items-center
      px-3 py-1
      text-xs font-medium
      rounded-full
      transition-colors duration-200
      ${variants[variant]}
    `}>
      {children}
    </span>
  )
}

// Usage
<div className="flex flex-wrap gap-2">
  {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
</div>
```

### Reusing Card Composition Pattern (Phase 3)
```typescript
// Source: irenic-media/components/ui/Card.tsx (existing)
import { Card, CardHeader, CardBody } from '@/components/ui/Card'

// Testimonial card composition
<Card variant="elevated" className="h-full">
  <CardHeader>
    {/* Star rating + client info */}
  </CardHeader>
  <CardBody>
    {/* Review text */}
  </CardBody>
</Card>

// Case study card composition
<Card variant="elevated" className="h-full">
  <CardHeader className="p-0">
    {/* Project image */}
  </CardHeader>
  <CardBody>
    {/* Title + description + tags */}
  </CardBody>
</Card>
```

### Embla Carousel (If Required)
```typescript
// Source: https://www.embla-carousel.com/get-started/react/
// Only use if carousel is absolutely needed
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function TestimonialsCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000 })]
  )

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Regular img tags | next/image component | Next.js 10 (2020) | Automatic optimization, WebP, lazy loading, blur placeholder |
| Swiper.js for all carousels | Embla Carousel or grid | 2024+ | Embla: 7KB vs Swiper 45KB, SSR-safe, grid: 0KB overhead |
| Custom star SVG paths | lucide-react/Icon libraries | 2022+ | Tree-shakeable, consistent design, no custom SVG maintenance |
| Inline CSS for badges | Tailwind utility classes | 2019+ | Mobile-first, no CSS file, faster development |
| Custom lazy loading | Intersection Observer API | 2019+ (Chrome 51+) | Native browser support, no library needed |
| react-rating libraries | Simple Star icon display | 2024+ | For read-only ratings, no library needed, lucide-react sufficient |

**Deprecated/outdated:**
- **Swiper.js for Next.js:** Poor SSR support, large bundle (45KB), causes hydration mismatches. Use Embla (7KB) or grid instead.
- **react-rating libraries for display:** Overkill for read-only testimonials. Use lucide-react Star with aria-label instead.
- **Regular img tags:** Next.js Image provides automatic optimization, should always be used instead.
- **Custom image lazy loading:** next/image handles this automatically with better performance.
- **Owl Carousel, Slick Carousel:** Legacy jQuery-based, not React-native, large bundles, poor mobile performance.

## Open Questions

Things that couldn't be fully resolved:

1. **Carousel vs Grid Decision**
   - What we know: Marko template uses Swiper carousel, grid is simpler and performs better
   - What's unclear: Whether client expects/requires carousel interaction pattern
   - Recommendation: Start with grid (3 columns desktop, 2 tablet, 1 mobile). Only add Embla Carousel if user testing shows mobile navigation issues. Document that carousel adds ~10KB to bundle.

2. **Client Photo Image Sources**
   - What we know: Need 3-4 client testimonial photos, recommended size 400x400 for 2x retina
   - What's unclear: Whether using real client photos or placeholder images during development
   - Recommendation: Use placeholder images from unsplash.com/photos/[random] or generated avatars initially. Create /public/images/testimonials/ folder structure.

3. **Case Study Image Aspect Ratios**
   - What we know: Marko template uses various aspect ratios (tall and wide cards)
   - What's unclear: Whether to standardize on single aspect ratio (16:9, 4:3, 1:1) or support multiple
   - Recommendation: Use 3:2 aspect ratio (600x400) for consistency. All case study cards same size prevents layout issues.

4. **Star Rating Icon Style**
   - What we know: lucide-react has Star icon, can fill for active stars
   - What's unclear: Whether to use solid fill, outlined, or custom accent color for stars
   - Recommendation: Use fill-black for active stars (matches current black accent theme), text-gray-300 for inactive. Consistent with WhyUs section styling.

5. **Review Text Length Guidelines**
   - What we know: Testimonials need consistent card heights
   - What's unclear: Target word count for review text (affects card heights)
   - Recommendation: Limit reviews to 50-100 words (~2-3 sentences). Longer reviews create uneven card heights. Add character limit in data if needed.

6. **Case Study Tag/Badge Limit**
   - What we know: Marko template shows 5-7 tags per case study
   - What's unclear: Maximum tags before wrapping causes layout issues
   - Recommendation: Limit to 4-5 tags per case study. Too many tags clutters design and reduces tag significance.

## Sources

### Primary (HIGH confidence)
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Image optimization, sizing, blur placeholder
- [Next.js Image Optimization Guide](https://nextjs.org/docs/app/getting-started/images) - Best practices for images
- [Embla Carousel React Docs](https://www.embla-carousel.com/get-started/react/) - Installation, SSR support, API
- [lucide-react GitHub](https://github.com/lucide-icons/lucide) - Star icon usage, tree-shaking
- Existing codebase: irenic-media/components/ui/Card.tsx - Card composition pattern verified
- Existing codebase: irenic-media/hooks/useInView.tsx - Animation trigger pattern verified
- Existing codebase: irenic-media/components/Services.tsx - Grid layout pattern verified

### Secondary (MEDIUM confidence)
- [Material UI Rating Accessibility](https://mui.com/material-ui/react-rating/) - aria-label patterns for star ratings
- [Accessible Card UI Patterns](https://dap.berkeley.edu/web-a11y-basics/accessible-card-ui-component-patterns) - Card accessibility best practices
- [Embla vs Swiper Comparison](https://www.capaxe.com/blog/20251109-swiperjs-vs-embla-carousel/) - Bundle size, SSR support comparison
- [Best React Carousel Libraries 2026](https://blog.croct.com/post/best-react-carousel-slider-libraries) - Carousel options analysis
- [Badges vs Pills vs Chips vs Tags](https://smart-interface-design-patterns.com/articles/badges-chips-tags-pills/) - Badge design patterns
- [Modern Testimonials in React Tutorial](https://dev.to/aryaziai/modern-testimonials-in-react-tutorial-cn1) - Testimonial component patterns
- Marko template reference: marko_main_files/marko-react/src/Components/Testimonial/ - Visual reference only

### Tertiary (LOW confidence)
- [React Testimonial Components](https://www.landingfolio.com/library/testimonial/react) - Design inspiration only
- [10 Best React Carousels 2025](https://www.swhabitation.com/blogs/best-react-carousels-user-friendly-efficient) - General carousel overview

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All core dependencies already installed (framer-motion, next/image, lucide-react, useInView)
- Architecture: HIGH - Patterns follow established Card composition from Phase 3, Next.js Image docs are official
- Pitfalls: HIGH - Carousel complexity, Next.js Image misuse, accessibility issues are well-documented
- Code examples: HIGH - All patterns verified in Next.js docs or existing codebase

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - stack is stable, monitor Embla Carousel updates if used)

---

## Key Takeaways for Planning

1. **No new heavy dependencies needed** - Use grid layout, not carousel initially. Only add Embla if testing shows need.
2. **Reuse Phase 3 patterns** - Card composition, useInView hook, framer-motion animations all established.
3. **Next.js Image is critical** - Always use for client photos and case study images, never regular img tag.
4. **Accessibility requirements** - Star ratings need role="img" and aria-label, images need descriptive alt text.
5. **Keep it simple** - 3-4 testimonials/cases, 2 badge variants, ~50-100 word reviews, 4-5 tags max per case.
6. **Marko template is visual reference only** - Don't copy Swiper.js or Bootstrap patterns, adapt to Next.js/Tailwind.
