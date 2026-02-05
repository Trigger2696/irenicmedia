'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CaseStudyCard } from './CaseStudyCard'

const caseStudies = [
  {
    title: 'TechFlow Digital Transformation',
    description:
      'Implemented a comprehensive digital marketing strategy that increased qualified leads by 150% and reduced cost per acquisition by 40% within 6 months.',
    tags: ['Performance Marketing', 'SEO', 'Analytics'],
    image: '/images/case-studies/placeholder-1.jpg'
  },
  {
    title: 'GreenLeaf Brand Launch',
    description:
      'Built a complete brand presence from scratch, including social media strategy and influencer partnerships, resulting in 100k+ followers in the first quarter.',
    tags: ['Social Media', 'Influencer Marketing', 'Branding'],
    image: '/images/case-studies/placeholder-2.jpg'
  },
  {
    title: 'FitnessPro App Growth',
    description:
      'Developed and launched a fitness app with integrated marketing campaign, achieving 200% increase in downloads and 4.8-star app store rating.',
    tags: ['Mobile App', 'User Acquisition', 'ASO'],
    image: '/images/case-studies/placeholder-3.jpg'
  },
  {
    title: 'Bloom E-Commerce Expansion',
    description:
      'Scaled an e-commerce fashion brand with targeted performance campaigns, resulting in 3x ROI and 65% increase in repeat customer rate.',
    tags: ['E-Commerce', 'Performance Marketing', 'CRM'],
    image: '/images/case-studies/placeholder-4.jpg'
  }
]

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

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="section bg-[var(--accent-color-3)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Our Work</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Case <span className="accent-color">Studies</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Explore how we have helped businesses achieve remarkable results
          through strategic digital marketing and technology solutions.
        </p>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <AnimateOnScroll key={study.title} delay={index * 0.1}>
              <CaseStudyCard {...study} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
