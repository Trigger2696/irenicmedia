'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook that animates a number from 0 to a target value over a specified duration.
 * Animation only starts when `start` becomes true (controlled by Intersection Observer).
 *
 * @param target - Final number to count up to
 * @param duration - Time in milliseconds (default 2000)
 * @param start - Boolean that triggers the animation when true
 * @returns Current count value
 */
export function useCountUp(
  target: number,
  duration: number = 2000,
  start: boolean = false
): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    // Reset count when starting
    setCount(0)

    // Calculate approximately 60 steps over the duration
    const steps = 60
    const increment = Math.max(1, Math.ceil(target / steps))
    const delay = duration / (target / increment)

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, delay)

    return () => clearInterval(timer)
  }, [target, duration, start])

  return count
}
