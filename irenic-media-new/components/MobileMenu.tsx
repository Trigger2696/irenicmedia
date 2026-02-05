'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/lib/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    onClose()

    // Small delay to allow menu close animation
    setTimeout(() => {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            aria-hidden="true"
          />

          {/* Slide Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-secondary z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--accent-color-3)]">
                <img
                  src="/assets/images/marko-logo.png"
                  alt="Irenic Media"
                  className="h-10 w-auto"
                />
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent text-white font-bold hover:bg-accent/80 transition-colors"
                  aria-label="Close menu"
                >
                  X
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block py-3 px-4 text-lg font-medium text-primary hover:text-accent rounded-lg hover:bg-[var(--accent-color-3)] transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer - Contact Info */}
              <div className="p-6 border-t border-[var(--accent-color-3)]">
                <p className="text-sm text-[var(--text-color)]">
                  hello@irenicmedia.com
                </p>
                <p className="text-sm text-[var(--text-color)] mt-1">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
