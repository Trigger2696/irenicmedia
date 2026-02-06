export interface NavLink {
  name: string
  href: string
}

export const navLinks: NavLink[] = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
]

export const contactInfo = {
  phone: '+91 98765 43210',
  email: 'hello@irenicmedia.com',
  location: 'Mumbai, India',
}
