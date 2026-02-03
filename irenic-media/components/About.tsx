'use client'

import { motion } from 'framer-motion'
import { Target, Heart, Rocket } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const values = [
  {
    icon: Target,
    title: 'Strategy First',
    description: 'Every decision is backed by data and aligned with your business goals.',
  },
  {
    icon: Heart,
    title: 'Creative Intent',
    description: 'We blend creativity with purpose to create meaningful brand experiences.',
  },
  {
    icon: Rocket,
    title: 'Long-term Growth',
    description: 'We build sustainable systems, not quick fixes that fade away.',
  },
]

export default function About() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="about" ref={ref} className="py-24 bg-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-black mt-2 mb-6">
              Built Different.
              <br />
              <span className="text-gray-400">By Design.</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Irenic Media was founded by <strong className="text-black">Raj Shah</strong> and{' '}
                <strong className="text-black">Ruchika Chandel</strong> with a simple belief:
                great marketing shouldn&apos;t feel chaotic.
              </p>
              <p>
                We&apos;ve seen too many businesses burn through budgets on tactics without strategy,
                chase trends without purpose, and measure vanity metrics instead of real growth.
              </p>
              <p>
                That&apos;s why we built Irenic Media differently. Every campaign starts with strategy.
                Every decision is intentional. Every result is measurable. We&apos;re not here to
                add noise to your business — we&apos;re here to bring clarity.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white">
                  <value.icon size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-black mb-1">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
