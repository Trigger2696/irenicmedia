'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
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

/**
 * AnimateOnScroll - Shared scroll-triggered animation wrapper
 *
 * Standardizes animation timing across all sections:
 * - 600ms duration (matches marko template)
 * - easeOut easing
 * - 15% viewport threshold
 * - triggerOnce to prevent re-animation
 *
 * @example
 * <AnimateOnScroll animation="fadeInUp" delay={index * 0.1}>
 *   <ServiceCard {...service} />
 * </AnimateOnScroll>
 */
export function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold
  })

  const variants = animationVariants[animation]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateOnScroll
