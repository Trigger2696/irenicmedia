'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Mail } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  services: [
    { name: 'Social Media Marketing', href: '#services' },
    { name: 'SEO', href: '#services' },
    { name: 'Performance Marketing', href: '#services' },
    { name: 'App Development', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Mail, href: 'mailto:hello@irenicmedia.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-max section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <Image
                src="/logo.png"
                alt="Irenic Media"
                width={400}
                height={100}
                className="h-36 w-auto brightness-0 invert"
              />
            </motion.a>
            <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
              Growth without chaos. Strategy without noise. We&apos;re a strategy-led
              digital marketing and technology agency helping ambitious brands
              build sustainable growth.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Irenic Media. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Founded by Raj Shah & Ruchika Chandel
          </p>
        </div>
      </div>
    </footer>
  )
}
