# Phase 2: Hero Section - Research

**Researched:** 2026-02-05
**Domain:** YouTube IFrame API Background Video, Scroll-triggered Animations, Hero Layout with Stats
**Confidence:** HIGH

## Summary

This research investigates patterns for implementing a fullscreen YouTube video background hero section in Next.js 15 with React 19. The hero displays an autoplaying, muted, looped YouTube video as background, overlaid with brand messaging (headline, subheadline), two CTA buttons, and animated statistics counters.

The reference implementation (marko-react Banner component) uses the YouTube IFrame Player API loaded dynamically, with custom sizing logic to maintain aspect ratio coverage. The project already has framer-motion installed, which should be used for scroll-triggered animations instead of animate.css (used in the reference). Stats display uses animated counters triggered by Intersection Observer when scrolling into view.

**Primary recommendation:** Use YouTube IFrame Player API with playerVars for mute/loop/autoplay, framer-motion for scroll animations (not animate.css), react-intersection-observer for triggering counter animations, and CSS absolute positioning with cover sizing for fullscreen video background.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| YouTube IFrame API | Built-in | Embedded YouTube video player | Official YouTube embed API, handles autoplay policies |
| framer-motion | 12.x (installed) | Scroll-triggered animations | Already in project, superior to animate.css for React |
| react-intersection-observer | 9.x | Trigger animations on scroll | Lightweight, React-native API, tree-shakeable |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.x (installed) | Conditional classNames | Already in project for cn() utility |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| YouTube IFrame API | react-youtube npm package | Adds dependency, YouTube IFrame API is simple enough to use directly |
| framer-motion | animate.css (reference uses) | framer-motion already installed, better React integration |
| react-intersection-observer | Custom useInView hook | npm package is more battle-tested, minimal size (~1.15kB) |
| Animated counters | countup.js | Custom hook is simpler for this use case |

**Installation:**
```bash
npm install react-intersection-observer
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── Hero/
│   ├── Hero.tsx                 # Main hero section with video background
│   ├── YouTubeBackground.tsx    # YouTube player component (client-only)
│   └── StatCounter.tsx          # Animated stat counter component
hooks/
├── useCountUp.ts                # Animated number counter hook
app/
├── page.tsx                     # Import Hero component
├── globals.css                  # Hero-specific CSS (video sizing, overlay)
```

### Pattern 1: YouTube IFrame API Background Video
**What:** Dynamically load YouTube IFrame API and create player with background video configuration
**When to use:** Fullscreen video backgrounds that must autoplay muted
**Example:**
```typescript
// Source: https://developers.google.com/youtube/iframe_api_reference
// components/Hero/YouTubeBackground.tsx
'use client'

import { useEffect, useRef } from 'react'

interface YouTubeBackgroundProps {
  videoId: string
}

declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

export default function YouTubeBackground({ videoId }: YouTubeBackgroundProps) {
  const playerRef = useRef<YT.Player | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-background', {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: videoId, // Required for loop to work
          showinfo: 0,       // Deprecated but harmless
          rel: 0,
          enablejsapi: 1,
          disablekb: 1,
          modestbranding: 1, // Deprecated since Aug 2023
          iv_load_policy: 3, // Hide annotations
          playsinline: 1,    // Inline on iOS
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            event.target.playVideo()
            resizePlayer()
          },
          onStateChange: (event) => {
            // Restart if ended (backup for loop)
            if (event.data === window.YT.PlayerState.ENDED) {
              playerRef.current?.playVideo()
            }
          }
        }
      })
    }

    // If API already loaded
    if (window.YT?.Player) {
      window.onYouTubeIframeAPIReady()
    }

    const resizePlayer = () => {
      const container = containerRef.current
      if (!container || !playerRef.current?.getIframe) return

      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      const aspectRatio = 16 / 9

      let width, height
      if (containerWidth / containerHeight > aspectRatio) {
        width = containerWidth
        height = containerWidth / aspectRatio
      } else {
        width = containerHeight * aspectRatio
        height = containerHeight
      }

      const iframe = playerRef.current.getIframe()
      iframe.style.width = `${width}px`
      iframe.style.height = `${height}px`
    }

    window.addEventListener('resize', resizePlayer)
    return () => window.removeEventListener('resize', resizePlayer)
  }, [videoId])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div id="youtube-background" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}
```

### Pattern 2: Scroll-triggered Fade-in with Framer Motion
**What:** Animate elements when they enter viewport
**When to use:** Hero content that should animate in on page load or scroll
**Example:**
```typescript
// Source: SKILL.md framer-motion patterns
// components/Hero/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Reusable animation wrapper
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
```

### Pattern 3: Animated Counter on Scroll
**What:** Number that counts up from 0 when visible
**When to use:** Statistics displays that should animate when scrolled into view
**Example:**
```typescript
// hooks/useCountUp.ts
'use client'

import { useState, useEffect } from 'react'

export function useCountUp(
  target: number,
  duration: number = 2000,
  start: boolean = false
): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    const steps = 60
    const increment = Math.max(1, Math.ceil(target / steps))
    const delay = duration / (target / increment)

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, delay)

    return () => clearInterval(timer)
  }, [target, duration, start])

  return count
}

// components/Hero/StatCounter.tsx
'use client'

import { useInView } from 'react-intersection-observer'
import { useCountUp } from '@/hooks/useCountUp'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

export function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  })

  const count = useCountUp(value, 2000, inView)

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-primary">
        {count}{suffix}
      </div>
      <div className="text-sm text-[var(--text-color)]">{label}</div>
    </div>
  )
}
```

### Anti-Patterns to Avoid
- **Don't use animate.css in React:** Framer Motion provides better control, already installed
- **Don't load YouTube script synchronously:** Blocks page rendering, use dynamic loading
- **Don't forget playlist parameter for loop:** Loop won't work without it
- **Don't use fixed pixel dimensions for video:** Use aspect ratio calculation for responsive cover
- **Don't rely on modestbranding/showinfo:** Both deprecated, have no effect

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YouTube embedding | Custom iframe with query params | YouTube IFrame API | API provides events, controls, error handling |
| Intersection detection | Scroll event + getBoundingClientRect | react-intersection-observer | More performant, off main thread |
| Staggered animations | setTimeout chains | Framer Motion variants with staggerChildren | Declarative, handles cleanup |
| Video cover sizing | Fixed dimensions | Aspect ratio calculation | Responsive, maintains coverage |

**Key insight:** YouTube IFrame API handles browser autoplay policies automatically. Manual iframe embeds may fail silently when autoplay is blocked.

## Common Pitfalls

### Pitfall 1: YouTube Video Not Autoplaying
**What goes wrong:** Video loads but doesn't start playing
**Why it happens:** Browser blocks autoplay for videos with sound
**How to avoid:** Always set mute: 1 in playerVars. Autoplay only works with muted videos
**Warning signs:** Video stuck on first frame, no error in console

### Pitfall 2: Video Loop Not Working
**What goes wrong:** Video plays once and stops
**Why it happens:** loop: 1 requires playlist parameter set to same video ID
**How to avoid:** Always include `playlist: videoId` alongside `loop: 1`
**Warning signs:** Video ends and shows related videos or black screen

### Pitfall 3: Video Not Covering Container
**What goes wrong:** Black bars on sides or top/bottom of video
**Why it happens:** Fixed dimensions don't account for container aspect ratio
**How to avoid:** Calculate dimensions based on container size and 16:9 aspect ratio, always size larger than container
**Warning signs:** Visible letterboxing, video doesn't fill hero section

### Pitfall 4: Counter Animation Replaying
**What goes wrong:** Counter restarts every time user scrolls past
**Why it happens:** Intersection Observer keeps triggering
**How to avoid:** Use `triggerOnce: true` option in useInView
**Warning signs:** Numbers jumping around when scrolling up/down

### Pitfall 5: YouTube API Not Ready Race Condition
**What goes wrong:** `window.YT.Player is not a constructor` error
**Why it happens:** Trying to create player before API script has loaded
**How to avoid:** Check if API already loaded, otherwise wait for onYouTubeIframeAPIReady callback
**Warning signs:** Console error on first page load, works after refresh

### Pitfall 6: Deprecated YouTube Parameters
**What goes wrong:** Parameters have no effect, video shows YouTube branding
**Why it happens:** modestbranding (Aug 2023) and showinfo (2018) are deprecated
**How to avoid:** Don't rely on these parameters, accept minimal YouTube branding is unavoidable
**Warning signs:** YouTube logo appears briefly, not a bug

### Pitfall 7: Hydration Mismatch with Client Components
**What goes wrong:** React hydration warning in console
**Why it happens:** Server renders nothing for YouTube embed, client renders player
**How to avoid:** Use 'use client' directive, render placeholder during SSR
**Warning signs:** Console hydration errors, brief flicker

## Code Examples

Verified patterns from official sources:

### YouTube Player Parameters (Official)
```typescript
// Source: https://developers.google.com/youtube/player_parameters
// All valid parameters for background video use case
const playerVars = {
  autoplay: 1,           // Start playing immediately
  controls: 0,           // Hide player controls
  mute: 1,               // Required for autoplay
  loop: 1,               // Loop video
  playlist: videoId,     // Required for loop
  rel: 0,                // Show same-channel videos only (can't fully disable)
  disablekb: 1,          // Disable keyboard controls
  iv_load_policy: 3,     // Hide video annotations
  playsinline: 1,        // Play inline on iOS (not fullscreen)
  enablejsapi: 1,        // Enable JavaScript API
  origin: window.location.origin  // Security
}
```

### Hero Section Layout
```typescript
// Based on marko_main_files reference + Tailwind v4
export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <YouTubeBackground videoId="P68V3iH4TeE" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-[var(--secondary)] opacity-50" />

      {/* Content */}
      <div className="relative z-10 hero-container py-32 flex flex-col gap-8">
        <AnimateOnScroll animation="fadeInLeft">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-transparent via-[var(--primary)] to-[var(--primary)] bg-clip-text text-transparent">
            Growth without chaos.<br />
            Strategy without noise.
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fadeInUp" delay={0.2}>
          <p className="text-xl text-[var(--text-color)] max-w-2xl">
            We are Irenic Media...
          </p>
        </AnimateOnScroll>

        {/* CTAs and Stats */}
      </div>
    </section>
  )
}
```

### CTA Button Pattern
```typescript
// Matching marko template button styling
function CTAButton({ href, variant, children }: CTAButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all',
        variant === 'primary' && 'bg-accent text-white hover:shadow-accent-wide',
        variant === 'secondary' && 'border border-[var(--accent-color-3)] text-primary hover:bg-[var(--accent-color-3)]'
      )}
    >
      <span>{children}</span>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
        <i className="fa-solid fa-arrow-right" />
      </div>
    </a>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| showinfo=0 parameter | Parameter deprecated | Sept 2018 | Cannot hide video title overlay |
| modestbranding=1 | Parameter deprecated | Aug 2023 | Cannot reduce YouTube branding |
| jQuery YouTube plugins | Native IFrame API | 2015+ | Lighter, no jQuery dependency |
| animate.css classes | Framer Motion | 2020+ | Better React integration, exit animations |
| Manual scroll events | Intersection Observer | Browser standard 2019 | Better performance, off main thread |

**Deprecated/outdated:**
- **showinfo parameter:** Deprecated Sept 2018, no longer hides video title
- **modestbranding parameter:** Deprecated Aug 2023, has no effect
- **animate.css in React:** Works but Framer Motion is superior for React apps
- **Manual aspect ratio media queries:** Use JS calculation for precise cover behavior

## Open Questions

Things that couldn't be fully resolved:

1. **YouTube Video ID**
   - What we know: Reference uses "P68V3iH4TeE" (demo video)
   - What's unclear: Actual video ID for Irenic Media hero
   - Recommendation: Use placeholder video ID, document that client provides actual video

2. **Fallback for Blocked Autoplay**
   - What we know: Muted autoplay should work in all modern browsers
   - What's unclear: Behavior on very restrictive browsers or corporate networks
   - Recommendation: Consider static image fallback, but LOW priority

3. **Video Loading State**
   - What we know: YouTube API fires onReady when player is ready
   - What's unclear: Best UX for loading state (skeleton, blur, nothing)
   - Recommendation: Use gradient overlay that persists, video fades in underneath

## Sources

### Primary (HIGH confidence)
- [YouTube IFrame API Reference](https://developers.google.com/youtube/iframe_api_reference) - Player initialization, events
- [YouTube Player Parameters](https://developers.google.com/youtube/player_parameters) - All available playerVars, deprecation notices
- marko_main_files/marko-react/src/Components/Banner/index.jsx - Reference implementation
- SKILL.md - Framer Motion patterns for this project

### Secondary (MEDIUM confidence)
- [react-intersection-observer GitHub](https://github.com/thebuilder/react-intersection-observer) - useInView hook API
- [React Intersection Observer Guide](https://www.builder.io/blog/react-intersection-observer) - Best practices
- [Animate.style](https://animate.style/) - Animation class names (for reference, not using)

### Tertiary (LOW confidence)
- [YouTube Autoplay Made Easy](https://mattnichols.dev/blog/youtube-iframe-api-autoplay-made) - Community blog post

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - YouTube IFrame API is official, framer-motion already in project
- Architecture: HIGH - Pattern from reference implementation + official docs
- Pitfalls: HIGH - Deprecations confirmed in official YouTube docs
- Code examples: MEDIUM - Adapted from reference, not yet tested in Next.js 15

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - YouTube API is stable, framer-motion updates minor)
