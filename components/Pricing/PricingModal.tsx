'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import type { PricingTier } from './Pricing'

interface PricingModalProps {
  tier: PricingTier
  isOpen: boolean
  onClose: () => void
}

export default function PricingModal({ tier, isOpen, onClose }: PricingModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  if (!isOpen) return null

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
      newErrors.email = 'Please enter a valid email'
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required'
    else if (!/^[+]?[\d\s-]{7,15}$/.test(formData.phone.trim()))
      newErrors.phone = 'Please enter a valid phone number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/pricing-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan: tier.name }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setFormData({ name: '', email: '', phone: '' })
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-5xl h-[85vh] max-h-[700px] bg-[var(--secondary)] border border-[var(--accent-color-3)] rounded-marko z-10 grid grid-cols-1 md:grid-cols-[1fr_380px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent-color-3)] text-[var(--text-color)] hover:text-primary hover:bg-[var(--accent-color-3)] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ===== LEFT: Scrollable Features ===== */}
        <div className="overflow-y-auto p-6 md:p-10 md:border-r border-[var(--accent-color-3)]">
          {/* Plan badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <i className="fa-solid fa-bolt text-accent text-xs" />
            <span className="text-accent text-sm font-semibold">{tier.name} Plan</span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            What&apos;s Included
          </h3>
          <p className="text-[var(--text-color)] mb-8">
            {tier.description}
          </p>

          {/* Feature cards */}
          <div className="space-y-4">
            {tier.featureDetails.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-xl bg-[var(--accent-color-3)]/50 border border-[var(--accent-color-3)] hover:border-accent/30 transition-colors"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <i className={`${feature.icon} text-accent text-lg`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-primary font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-[var(--text-color)] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom spacer for mobile (form comes after on mobile) */}
          <div className="h-6 md:hidden" />
        </div>

        {/* ===== RIGHT: Fixed Price + Form ===== */}
        <div className="flex flex-col bg-[var(--secondary)] p-6 md:p-8 overflow-y-auto md:overflow-y-hidden">
          {/* Price header */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl lg:text-5xl font-black text-accent">{tier.price}</span>
              {tier.period && (
                <span className="text-[var(--text-color)] text-lg">{tier.period}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <i className="fa-solid fa-shield-halved text-accent text-sm" />
              <span className="text-[var(--text-color)] text-sm">No hidden fees. Cancel anytime.</span>
            </div>
          </div>

          <hr className="border-[var(--accent-color-3)] mb-6" />

          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-5 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">You&apos;re all set!</h4>
              <p className="text-[var(--text-color)] text-sm mb-6">
                We&apos;ve received your interest in the {tier.name} plan. Our team will reach out within 1–2 business days.
              </p>
              <button
                onClick={onClose}
                className="cta-primary text-white py-2.5 px-8 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
              <h4 className="text-lg font-bold text-primary mb-4">Get Started</h4>

              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500 text-red-500 px-3 py-2.5 rounded-lg mb-4 text-sm" role="alert">
                  <X className="w-4 h-4 flex-shrink-0" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <div className="space-y-3 flex-1">
                <div>
                  <label htmlFor="pricing-name" className="block text-primary font-medium mb-1 text-sm">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pricing-name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-[var(--secondary)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
                      errors.name ? 'border-red-500' : 'border-[var(--accent-color-3)]'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="pricing-email" className="block text-primary font-medium mb-1 text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="pricing-email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-[var(--secondary)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
                      errors.email ? 'border-red-500' : 'border-[var(--accent-color-3)]'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="pricing-phone" className="block text-primary font-medium mb-1 text-sm">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="pricing-phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-[var(--secondary)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
                      errors.phone ? 'border-red-500' : 'border-[var(--accent-color-3)]'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full cta-primary text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60 mt-6"
              >
                {status === 'submitting' ? 'Submitting...' : `Choose ${tier.name} Plan`}
              </button>

              <p className="text-[var(--text-color)] text-xs text-center mt-3">
                We&apos;ll reach out within 1–2 business days.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
