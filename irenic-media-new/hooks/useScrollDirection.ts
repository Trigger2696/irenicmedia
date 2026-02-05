'use client'

import { useEffect, useState } from 'react'

type ScrollDirection = 'up' | 'down'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up')
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      // Update isAtTop state
      setIsAtTop(scrollY < 50)

      // Determine direction with 10px threshold to prevent jitter
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false
        return
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollDirection, isAtTop }
}
