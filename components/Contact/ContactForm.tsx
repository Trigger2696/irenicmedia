'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email validation (required + format)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message validation (required)
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle field changes
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
      setFormData({ name: '', email: '', company: '', message: '' })
      setErrors({})
    } catch {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--body-bg)] p-6 lg:p-8 rounded-marko border border-[var(--accent-color-3)]"
    >
      <h3 className="text-xl font-bold text-primary mb-6">Send us a Message</h3>

      {/* Success Alert */}
      {showSuccess && (
        <div
          className="flex items-center gap-3 bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-5"
          role="alert"
          aria-live="polite"
        >
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>Thank you! We'll get back to you within 24 hours.</span>
        </div>
      )}

      {/* Error Alert */}
      {showError && (
        <div
          className="flex items-center gap-3 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-5"
          role="alert"
          aria-live="polite"
        >
          <X className="w-5 h-5 flex-shrink-0" />
          <span>Please correct the errors below and try again.</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="contact-name" className="block text-primary font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border bg-[var(--body-bg)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.name ? 'border-red-500' : 'border-[var(--accent-color-3)]'
            }`}
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p
              id="name-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
              aria-live="polite"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="contact-email" className="block text-primary font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border bg-[var(--body-bg)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.email ? 'border-red-500' : 'border-[var(--accent-color-3)]'
            }`}
            placeholder="your@email.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
              aria-live="polite"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Company Field (Optional) */}
        <div>
          <label htmlFor="contact-company" className="block text-primary font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="contact-company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[var(--accent-color-3)] bg-[var(--body-bg)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Your company (optional)"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block text-primary font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border bg-[var(--body-bg)] text-primary placeholder:text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
              errors.message ? 'border-red-500' : 'border-[var(--accent-color-3)]'
            }`}
            placeholder="How can we help you?"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
              aria-live="polite"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cta-primary text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
