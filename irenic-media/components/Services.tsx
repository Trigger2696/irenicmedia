'use client'

import { motion } from 'framer-motion'
import {
  Share2,
  Search,
  TrendingUp,
  Users,
  Smartphone,
  Code2,
} from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { Card, CardHeader, CardBody, CardIcon } from './ui/Card'

const services = [
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Build authentic connections with your audience through strategic content and community management across all major platforms.',
  },
  {
    icon: Search,
    title: 'Search Engine Optimization',
    description: 'Dominate search results with data-driven SEO strategies that drive organic traffic and establish your authority.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Maximize your ROI with targeted paid campaigns across Google, Meta, and emerging platforms.',
  },
  {
    icon: Users,
    title: 'Influencer Campaigns',
    description: 'Connect with the right voices in your industry to amplify your message and reach new audiences authentically.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Transform your ideas into powerful mobile experiences with native and cross-platform app development.',
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    description: 'Build scalable, secure software solutions tailored to your unique business needs and workflows.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Services() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="services" ref={ref} className="py-24 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-black mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From strategy to execution, we provide comprehensive digital solutions
            that drive measurable results for your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card variant="elevated" className="h-full">
                <CardHeader>
                  <CardIcon>
                    <service.icon size={24} />
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <h3 className="font-display text-xl font-bold text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
