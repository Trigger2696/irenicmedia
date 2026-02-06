'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  // Only run on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  // Prevent hydration mismatch - render placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/10"
        aria-label="Toggle theme"
      >
        <i className="fa-solid fa-moon text-accent"></i>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 transition-all duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <i
        className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} text-accent transition-transform duration-200`}
      ></i>
    </button>
  )
}
