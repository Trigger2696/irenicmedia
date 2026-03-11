'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { navLinks } from '@/lib/navigation'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

export default function Header() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains('light'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 140
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="navbar-wrapper fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <header
          className={cn(
            'navbar relative flex w-full z-10 p-4 md:px-8 border border-[var(--accent-color-3)] bg-[var(--accent-color-4)] rounded-marko transition-transform duration-300',
            scrollDirection === 'down' && !isAtTop && '-translate-y-[calc(100%+2rem)]',
            scrollDirection === 'up' && 'translate-y-0'
          )}
        >
          <div className="navbar-container flex flex-row justify-between items-center w-full">
            {/* Logo */}
            <div className="logo-container w-auto lg:w-[30%]">
              <a
                href="#"
                onClick={handleLogoClick}
                className="flex items-center"
              >
                <img
                  src={isLight ? '/logo-black.png' : '/logo-white.png'}
                  alt="Irenic Media"
                  className={`h-[44px] md:h-[54px] w-auto ${isLight ? 'mix-blend-multiply' : 'mix-blend-screen'}`}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex navbar-nav mx-auto">
              <ul className="flex flex-row items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.href} className="nav-item">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="nav-link px-4 py-2 text-base font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Side - Theme Toggle & Phone (Desktop) */}
            <div className="navbar-action-container flex flex-row items-center gap-4 lg:w-[30%] justify-end">
              <div className="navbar-action-button flex items-center gap-4">
                <ThemeToggle />
              </div>


              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden nav-btn px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
                aria-label="Open menu"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
