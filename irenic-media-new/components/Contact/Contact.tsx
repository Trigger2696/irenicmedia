'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import ContactForm from './ContactForm'

const contactDetails = [
  { icon: 'fa-solid fa-envelope', label: 'Email', value: 'hello@irenicmedia.com' },
  { icon: 'fa-solid fa-phone', label: 'Phone', value: '+91 98765 43210' },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Mumbai, India' }
]

// AnimateOnScroll wrapper for scroll-triggered animations
function AnimateOnScroll({
  children,
  delay = 0,
  variant = 'fadeIn'
}: {
  children: React.ReactNode
  delay?: number
  variant?: 'fadeIn' | 'fadeInLeft' | 'fadeInRight'
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  })

  const variants = {
    fadeIn: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 }
    }
  }

  const selected = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial={selected.initial}
      animate={inView ? selected.animate : selected.initial}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="section bg-[var(--accent-color-3)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Contact Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Let's <span className="accent-color">Talk</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Ready to start your growth journey? Get in touch with our team and let's discuss how we can help transform your digital presence.
        </p>

        {/* Two-column grid: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Contact Info */}
          <AnimateOnScroll variant="fadeInLeft" delay={0}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-6">Get in Touch</h3>
                <p className="text-[var(--text-color)] mb-8">
                  Whether you have a question about our services, pricing, or just want to say hello, we'd love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <i className={cn(detail.icon, 'text-2xl text-accent')} />
                    </div>
                    <div>
                      <p className="text-[var(--text-color)] text-sm">{detail.label}</p>
                      <p className="text-primary font-semibold">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-[var(--accent-color-3)]">
                <p className="text-[var(--text-color)] text-sm">
                  <span className="font-semibold text-primary">Business Hours:</span> Mon - Fri, 10:00 AM - 7:00 PM IST
                </p>
                <p className="text-[var(--text-color)] text-sm mt-2">
                  <span className="font-semibold text-primary">Response Time:</span> Within 24 hours
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Contact Form */}
          <AnimateOnScroll variant="fadeIn" delay={0.2}>
            <ContactForm />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
