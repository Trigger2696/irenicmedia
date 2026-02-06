'use client'

import Image from 'next/image'

interface FooterLink {
  name: string
  href: string
}

const quickLinks: FooterLink[] = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact Us', href: '#contact' },
]

const serviceLinks: FooterLink[] = [
  { name: 'Social Media Marketing', href: '#services' },
  { name: 'SEO Optimization', href: '#services' },
  { name: 'Performance Marketing', href: '#services' },
  { name: 'Influencer Campaigns', href: '#services' },
  { name: 'Mobile App Development', href: '#services' },
  { name: 'Custom Software Dev', href: '#services' },
]

const socialLinks = [
  { icon: 'fa-brands fa-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube', href: 'https://youtube.com', label: 'YouTube' },
  { icon: 'fa-brands fa-instagram', href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'fa-solid fa-envelope', href: 'mailto:hello@irenicmedia.com', label: 'Email' },
]

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.querySelector(href)
        if (element) {
          const headerOffset = 140
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="section-footer">
      <div className="bg-footer-wrapper">
        <div className="bg-footer">
          <div className="hero-container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Brand Column - Takes 2 cols on lg */}
              <div className="lg:col-span-2">
                <div className="footer-logo-container">
                  <div className="logo-container-footer flex items-center gap-2">
                    <Image
                      src="/irenic-logo.png"
                      alt="Irenic Media"
                      width={56}
                      height={56}
                      className="w-12 h-12 md:w-14 md:h-14"
                    />
                    <span className="text-2xl md:text-3xl font-black text-accent">Irenic</span>
                    <span className="text-2xl md:text-3xl font-black text-primary">Media</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-primary leading-relaxed">
                    Growth without chaos. Strategy without noise.
                  </h4>
                  <p className="text-[var(--text-color)] text-base leading-relaxed max-w-md">
                    We are a strategy-led digital marketing and technology agency
                    helping ambitious brands build sustainable, long-term growth
                    through data-driven decisions and creative excellence.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div className="footer-quick-links">
                  <h5 className="text-xl font-bold text-primary mb-6">Quick Links</h5>
                  <ul className="footer-list">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Services */}
              <div>
                <div className="footer-services-container">
                  <h5 className="text-xl font-bold text-primary mb-6">Services</h5>
                  <ul className="footer-list">
                    {serviceLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact & Social - Below grid on mobile, inline on larger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 lg:mt-16">
              {/* Contact Info */}
              <div>
                <h5 className="text-xl font-bold text-primary mb-6">Contact Info</h5>
                <ul className="contact-list">
                  <li>hello@irenicmedia.com</li>
                  <li>+91 98765 43210</li>
                  <li>Mumbai, India</li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="text-xl font-bold text-primary mb-6">Follow Us</h5>
                <div className="social-container">
                  {socialLinks.map((social) => (
                    <div key={social.label} className="social-item-wrapper">
                      <a
                        href={social.href}
                        className="social-item"
                        aria-label={social.label}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <i className={social.icon}></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-content-spacer"></div>
          </div>

          {/* Copyright */}
          <div className="hero-container">
            <div className="copyright-container">
              <span className="copyright">
                &copy; {currentYear} Irenic Media. Founded by Raj Shah & Ruchika Chandel. All Rights Reserved.
              </span>
              <div className="flex flex-row gap-6">
                <a href="#" className="legal-link">Terms of Service</a>
                <a href="#" className="legal-link">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="h-8"></div>
        </div>
      </div>
    </footer>
  )
}
