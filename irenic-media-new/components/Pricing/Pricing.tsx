'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check } from 'lucide-react'

const pricingTiers = [
  {
    name: 'Starter',
    price: '₹35,000',
    period: '/month',
    description: 'Perfect for small businesses starting their digital journey',
    features: [
      'Social Media Management (2 platforms)',
      'Basic SEO Optimization',
      'Monthly Performance Report',
      '5 Creative Posts/Week',
      'Email Support',
      'Basic Analytics Dashboard'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Growth',
    price: '₹85,000',
    period: '/month',
    description: 'Ideal for growing businesses ready to scale their presence',
    features: [
      'Social Media Management (4 platforms)',
      'Advanced SEO & Content Strategy',
      'Performance Marketing (up to ₹50k ad spend)',
      'Weekly Performance Reports',
      '10 Creative Posts/Week',
      'Priority Support',
      'Competitor Analysis',
      'Influencer Outreach (Micro)'
    ],
    cta: 'Start Growing',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-service solution for established brands seeking dominance',
    features: [
      'All Growth Features',
      'Unlimited Platforms',
      'Dedicated Account Manager',
      'Custom Software Development',
      'Mobile App Development',
      'Advanced Analytics & BI',
      'Influencer Campaigns (All Tiers)',
      '24/7 Priority Support',
      'Quarterly Strategy Reviews'
    ],
    cta: 'Contact Us',
    popular: false
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

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section bg-[var(--body-bg)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Pricing</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Simple, Transparent <span className="accent-color">Pricing</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Choose the plan that fits your growth stage. All plans include strategy consultation and no hidden fees.
        </p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => (
            <AnimateOnScroll key={tier.name} delay={index * 0.1}>
              <div
                className={`relative p-6 lg:p-8 rounded-marko border transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
                  tier.popular
                    ? 'bg-accent/5 border-accent shadow-accent'
                    : 'bg-[var(--body-bg)] border-[var(--accent-color-3)] hover:shadow-accent'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-accent">{tier.price}</span>
                    <span className="text-[var(--text-color)]">{tier.period}</span>
                  </div>
                  <p className="text-[var(--text-color)] text-sm mt-3">{tier.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-color)] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'cta-primary text-white'
                      : 'cta-secondary text-primary hover:text-white hover:bg-accent'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-[var(--text-color)] text-sm mt-8">
          * Ad spend is billed separately. Custom requirements? <a href="#contact" className="text-accent hover:underline">Let's talk</a>.
        </p>
      </div>
    </section>
  )
}
