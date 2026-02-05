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
    title: 'Social Media Marketing',
    description: 'Strategic social media management that builds engaged communities and drives meaningful conversions across all platforms.'
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Data-driven SEO strategies that improve your search rankings and deliver sustainable organic growth over time.'
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'ROI-focused campaigns across paid channels, optimized continuously for maximum performance and efficiency.'
  },
  {
    icon: Users,
    title: 'Influencer Campaigns',
    description: 'Authentic influencer partnerships that amplify your brand message and reach your target audiences effectively.'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'End-to-end mobile app solutions from concept to launch, with ongoing marketing and user acquisition support.'
  },
  {
    icon: Code,
    title: 'Custom Software Development',
    description: 'Bespoke software solutions designed and built to solve your unique business challenges and drive efficiency.'
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

        {/* Services Grid - Mobile-first responsive: 1 col -> 2 cols -> 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimateOnScroll
              key={service.title}
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
