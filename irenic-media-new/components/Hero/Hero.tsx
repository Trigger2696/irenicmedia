'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import YouTubeBackground from './YouTubeBackground'
import { StatCounter } from './StatCounter'

/**
 * Wrapper component for scroll-triggered animations.
 * Uses Intersection Observer to detect visibility and Framer Motion for animation.
 */
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

/**
 * Hero section component with video background, headline, CTAs, and stats.
 * Implements HERO-01 through HERO-05 requirements.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden" style={{ scrollMarginTop: '100px' }}>
      {/* Video Background */}
      <YouTubeBackground videoId="P68V3iH4TeE" />

      {/* Gradient Overlay */}
      <div className="hero-overlay absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="relative z-10 hero-container min-h-screen flex flex-col justify-center py-32 px-5">
        {/* Headline */}
        <AnimateOnScroll animation="fadeInLeft">
          <h1 className="hero-headline text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Growth without chaos.<br />
            Strategy without noise.
          </h1>
        </AnimateOnScroll>

        {/* Subheadline */}
        <AnimateOnScroll animation="fadeInUp" delay={0.2}>
          <p className="text-lg md:text-xl text-[var(--text-color)] mt-6 max-w-2xl">
            We are Irenic Media, a strategy-led digital marketing and technology agency
            helping ambitious brands build sustainable, long-term growth.
          </p>
        </AnimateOnScroll>

        {/* CTAs */}
        <AnimateOnScroll animation="fadeInUp" delay={0.4}>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#contact"
              className="cta-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold"
            >
              <span>Start Your Journey</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                <i className="fa-solid fa-arrow-right" />
              </div>
            </a>
            <a
              href="#services"
              className="cta-secondary inline-flex items-center gap-3 px-6 py-3 rounded-full text-primary font-semibold"
            >
              <span>Explore Services</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent-color-3)]">
                <i className="fa-solid fa-arrow-right" />
              </div>
            </a>
          </div>
        </AnimateOnScroll>

        {/* Stats */}
        <AnimateOnScroll animation="fadeInUp" delay={0.6}>
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
            <StatCounter value={50} suffix="+" label="Projects Completed" />
            <StatCounter value={95} suffix="%" label="Client Retention" />
            <StatCounter value={3} suffix="x" label="Average ROI" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
