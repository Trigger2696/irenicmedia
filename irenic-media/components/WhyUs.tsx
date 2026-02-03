'use client'

import { motion } from 'framer-motion'
import { Lightbulb, BarChart3, Shield, Zap } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const reasons = [
  {
    icon: Lightbulb,
    title: 'Strategy Before Execution',
    description:
      'We don\'t start with tactics. We start with understanding your business, your audience, and your goals. Then we build a roadmap that actually makes sense.',
    stat: '100%',
    statLabel: 'Strategy-First Approach',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description:
      'Every recommendation we make is backed by real data. No guesswork, no hunches — just insights that drive results.',
    stat: '3x',
    statLabel: 'Average Client ROI',
  },
  {
    icon: Shield,
    title: 'Transparent Partnership',
    description:
      'You\'ll always know exactly where your budget is going, what we\'re working on, and how it\'s performing. No black boxes here.',
    stat: '24/7',
    statLabel: 'Real-Time Reporting',
  },
  {
    icon: Zap,
    title: 'Agile & Adaptive',
    description:
      'Markets change fast. We stay ahead by continuously testing, learning, and optimizing. Your strategy evolves with your business.',
    stat: '2 Weeks',
    statLabel: 'Avg. Optimization Cycle',
  },
]

export default function WhyUs() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="why-us" ref={ref} className="py-24 bg-black relative overflow-hidden">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
            The Irenic Difference
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;re not just another agency. We&apos;re your strategic partners
            in building sustainable, long-term growth.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                  <reason.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {reason.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-white">
                      {reason.stat}
                    </span>
                    <span className="text-gray-500 text-sm">{reason.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
