'use client'

import { useState } from 'react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { navLinks, contactInfo } from '@/lib/navigation'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

export default function Header() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
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
                className="flex items-center gap-2"
              >
                <span className="text-2xl md:text-3xl font-black text-accent">Irenic</span>
                <span className="text-2xl md:text-3xl font-black text-primary">Media</span>
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

              {/* Phone number - Desktop only */}
              <div className="hidden xl:flex navbar-icon-wrapper items-center gap-0 rounded-full px-1 py-1 shadow-[var(--box-shadow-top-left)] hover:shadow-[var(--box-shadow-bottom-right)] transition-shadow duration-500">
                <div className="icon-circle w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white">
                  <i className="fa-solid fa-phone-volume text-sm"></i>
                </div>
                <span className="text-primary font-semibold text-sm px-4">
                  {contactInfo.phone}
                </span>
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
