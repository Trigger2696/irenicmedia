'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// AnimateOnScroll wrapper for scroll-triggered animations
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
              <p className="text-[var(--text-color)] mb-4 leading-relaxed">
                We saw too many brands chasing tactics without purpose, running campaigns without
                clarity. We built Irenic Media to be different—a place where strategy comes first,
                creativity has intent, and growth is built to last.
              </p>
              <p className="text-[var(--text-color)] leading-relaxed">
                Today, we partner with ambitious brands across industries, helping them cut through
                the noise and achieve sustainable, long-term growth.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Company Values */}
          <AnimateOnScroll animation="fadeInRight" delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                Our Values
              </h3>
              <div className="space-y-6">
                <div className="p-4 rounded-marko bg-[var(--accent-color-3)] border border-[var(--accent-color-3)]">
                  <h4 className="text-lg font-bold text-accent mb-2">
                    Strategy First
                  </h4>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    We don't jump into tactics. Every campaign begins with deep strategic
                    thinking—understanding your goals, audience, and competitive landscape.
                  </p>
                </div>
                <div className="p-4 rounded-marko bg-[var(--accent-color-3)] border border-[var(--accent-color-3)]">
                  <h4 className="text-lg font-bold text-accent mb-2">
                    Creative Intent
                  </h4>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    Our creativity serves a purpose. Every design decision, every piece of
                    content is backed by data and aligned with your objectives.
                  </p>
                </div>
                <div className="p-4 rounded-marko bg-[var(--accent-color-3)] border border-[var(--accent-color-3)]">
                  <h4 className="text-lg font-bold text-accent mb-2">
                    Long-term Growth
                  </h4>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    We build for the long haul. Sustainable growth beats short-term wins
                    every time—we're here to help you scale responsibly.
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
