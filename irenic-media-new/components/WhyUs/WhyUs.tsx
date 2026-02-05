'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { DifferentiatorCard } from './DifferentiatorCard'
import { Lightbulb, BarChart3, Handshake, Zap } from 'lucide-react'

const differentiators = [
  {
    icon: Lightbulb,
    title: 'Strategy Before Execution',
    description: 'We don\'t jump into tactics. Every campaign starts with deep strategic thinking, clear objectives, and a roadmap for success.',
    stat: '100%',
    statLabel: 'Strategy First'
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Our decisions are backed by data, not guesswork. We measure everything that matters and optimize based on real insights.',
    stat: '24/7',
    statLabel: 'Monitoring'
  },
  {
    icon: Handshake,
    title: 'Transparent Partnership',
    description: 'No black boxes. We share our thinking, our data, and our learnings openly. You\'ll always know what we\'re doing and why.',
    stat: '95%',
    statLabel: 'Client Retention'
  },
  {
    icon: Zap,
    title: 'Agile & Adaptive',
    description: 'Markets change fast. We stay nimble, continuously testing and iterating to keep you ahead of the curve.',
    stat: '2x',
    statLabel: 'Faster Iteration'
  }
]

// AnimateOnScroll wrapper for scroll-triggered animations
function AnimateOnScroll({
  children,
  delay = 0
}: {
  children: React.ReactNode
  delay?: number
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="section bg-[var(--accent-color-3)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Why Choose Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Why <span className="accent-color">Irenic Media</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          We're not just another agency. Here's what makes us different.
        </p>

        {/* Differentiators Grid - Mobile-first responsive: 1 col -> 2 cols -> 4 cols */}
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
