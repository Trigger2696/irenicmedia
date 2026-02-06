'use client'

import { useInView } from 'react-intersection-observer'
import { useCountUp } from '@/hooks/useCountUp'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

/**
 * Animated stat counter that triggers when scrolled into view.
 * Uses Intersection Observer to detect visibility and useCountUp for animation.
 */
export function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  })

  const count = useCountUp(value, 2000, inView)

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-[var(--text-color)] mt-2">{label}</div>
    </div>
  )
}
