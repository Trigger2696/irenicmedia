# Phase 5: Pricing & Contact - Research

**Researched:** 2026-02-06
**Domain:** React Form Validation, Contact Form UI Patterns, Pricing Components
**Confidence:** HIGH

## Summary

This research investigates patterns for implementing contact form validation and completing the pricing/contact sections in a Next.js 15 + React 19 project. Critical finding: The Pricing component already exists and is fully functional (added during Phase 4), displaying three tiers (Starter ₹35,000, Growth ₹85,000, Enterprise Custom) with proper styling and CTAs.

The main work for Phase 5 is enhancing the Contact section with a proper form component that includes validation for name, email, company, and message fields, displays contact information with icons, and shows success/error feedback messages. The marko template reference uses controlled components with React useState for validation and temporary success messages.

For this project's needs, controlled components with useState (already used in the codebase) are sufficient - no form library needed. The contact form should use client-side validation with ARIA attributes for accessibility, match the established component patterns (AnimateOnScroll, lucide-react icons), and display inline error messages with a dismissible success state.

**Primary recommendation:** Build Contact form component with controlled inputs, useState for form state/validation, email regex validation, ARIA attributes (aria-invalid, aria-describedby), lucide-react icons for contact info, and success/error message states that auto-dismiss after 3 seconds.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React useState | Built-in (v19) | Form state management | Already used in Header.tsx, sufficient for simple forms |
| Native HTML validation | Built-in | Required fields, email type | Zero-dependency, browser-native, works without JS |
| ARIA attributes | Built-in | Accessibility for errors | WCAG 2.1 requirement for accessible form validation |
| lucide-react | 0.563.0 (installed) | Icons for contact info | Already used throughout project for consistency |
| framer-motion | 12.x (installed) | Scroll animations | Already used in all sections for consistency |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-intersection-observer | 10.x (installed) | Trigger scroll animations | Already used in other sections for AnimateOnScroll |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| useState + regex | React Hook Form | RHF adds 40KB bundle, overkill for 4-field form, Formik not actively maintained |
| useState + regex | Zod + Server Actions | Backend integration out of scope per requirements, adds complexity |
| Inline messages | Toast notifications | Inline messages keep validation context near inputs (better UX) |
| Auto-dismiss (3s) | Manual dismiss button | Both can coexist, auto-dismiss shown in marko reference |

**Installation:**
```bash
# No new packages needed - all dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── Contact/
│   ├── Contact.tsx              # Main contact section with form and contact info
│   └── ContactForm.tsx          # Form component with validation logic
app/
├── page.tsx                     # Already imports other sections, add Contact
```

### Pattern 1: Controlled Form Component with Validation
**What:** React component using useState to manage form inputs, validation state, and error/success messages
**When to use:** Simple forms (under 10 fields) without backend integration
**Example:**
```typescript
// Source: Adapted from marko-react ContactForm.jsx + React best practices
'use client'

import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const validateEmail = (email: string): boolean => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      setShowError(true)
      setShowSuccess(false)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    // Success state (no backend per requirements)
    setShowSuccess(true)
    setShowError(false)
    setFormData({ name: '', email: '', company: '', message: '' })
    setErrors({})
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields with ARIA attributes */}
    </form>
  )
}
```

### Pattern 2: Accessible Error Messages with ARIA
**What:** Link error messages to inputs using aria-describedby and aria-invalid
**When to use:** All form validation to meet WCAG 2.1 accessibility standards
**Example:**
```typescript
// Source: https://react-aria.adobe.com/forms + https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
<div>
  <label htmlFor="email" className="block text-sm font-medium mb-2">
    Email Address *
  </label>
  <input
    type="email"
    id="email"
    value={formData.email}
    onChange={(e) => handleChange('email', e.target.value)}
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
    className={`w-full px-4 py-3 rounded-lg border ${
      errors.email ? 'border-red-500' : 'border-[var(--accent-color-3)]'
    }`}
    required
  />
  {errors.email && (
    <p
      id="email-error"
      role="alert"
      aria-live="polite"
      className="text-red-500 text-sm mt-1"
    >
      {errors.email}
    </p>
  )}
</div>
```

### Pattern 3: Success/Error Alert Boxes
**What:** Dismissible alert boxes that appear at top of form and auto-hide after 3 seconds
**When to use:** Form submission feedback without navigation away from page
**Example:**
```typescript
// Source: Adapted from marko-react ContactForm.jsx
{showSuccess && (
  <div className="p-4 mb-6 rounded-lg bg-green-50 border border-green-500 flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
      <Check className="w-5 h-5 text-white" />
    </div>
    <p className="text-green-800">
      Thank you! We'll get back to you within 24 hours.
    </p>
  </div>
)}

{showError && (
  <div className="p-4 mb-6 rounded-lg bg-red-50 border border-red-500 flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
      <X className="w-5 h-5 text-white" />
    </div>
    <p className="text-red-800">
      Please correct the errors below and try again.
    </p>
  </div>
)}
```

### Pattern 4: Contact Info Display with Icons
**What:** Display contact details (email, phone, location) with icon + label + value pattern
**When to use:** Alongside contact form to provide alternative contact methods
**Example:**
```typescript
// Source: Adapted from marko-react contact.jsx
import { Mail, Phone, MapPin } from 'lucide-react'

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@irenicmedia.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India' }
]

<div className="space-y-6">
  {contactDetails.map((detail) => (
    <div key={detail.label} className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
        <detail.icon className="w-6 h-6 text-accent" />
      </div>
      <div>
        <p className="text-[var(--text-color)] text-sm">{detail.label}</p>
        <p className="text-primary font-semibold">{detail.value}</p>
      </div>
    </div>
  ))}
</div>
```

### Anti-Patterns to Avoid
- **Uncontrolled components with refs:** Harder to validate and doesn't match existing Header.tsx pattern
- **External form library for 4 fields:** React Hook Form (40KB) or Formik (unmaintained) adds unnecessary complexity
- **Server Actions without backend:** Phase requirements explicitly state "backend is out of scope"
- **Toast notifications for errors:** Inline errors keep validation context near inputs (better UX)
- **No auto-dismiss on success:** User expects confirmation to fade after seeing it (marko does 3s)

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email validation | Custom regex from scratch | Standard email regex pattern | Edge cases like unicode domains, plus signs, hyphens |
| Accessible forms | Manual role attributes | aria-invalid + aria-describedby | WCAG 2.1 compliance requires specific ARIA patterns |
| Form reset after submit | Manually clear each field | Reset full state object + errors | Easy to miss a field or error state |

**Key insight:** For this simple 4-field form, standard React patterns (useState, controlled inputs, validation function) are sufficient. The complexity that justifies React Hook Form or Formik (conditional fields, field arrays, complex schemas, multi-step forms) doesn't exist here.

## Common Pitfalls

### Pitfall 1: Over-engineering with Form Libraries
**What goes wrong:** Installing React Hook Form or Formik for a simple contact form adds bundle size and learning curve
**Why it happens:** React form validation tutorials often jump straight to libraries as "best practice"
**How to avoid:** Assess complexity first - 4 fields with simple validation = useState is sufficient
**Warning signs:** Bundle size increases by 40KB+, team needs to learn new library API for single use case

### Pitfall 2: Missing Accessibility Attributes
**What goes wrong:** Form validation fails WCAG 2.1 compliance, screen reader users can't understand errors
**Why it happens:** Developers focus on visual error display, forget ARIA attributes
**How to avoid:** Always pair visual error messages with aria-invalid and aria-describedby
**Warning signs:** Lighthouse accessibility score below 95, screen reader testing shows errors aren't announced

### Pitfall 3: Not Clearing Errors on Input Change
**What goes wrong:** Error messages persist after user corrects the field, creating frustration
**Why it happens:** Validation only runs on submit, not on field change
**How to avoid:** Clear field-specific error in onChange handler when user starts typing
**Warning signs:** User complaints about "sticky" error messages, QA feedback about confusing validation

### Pitfall 4: Success Message Without Auto-Dismiss
**What goes wrong:** Success message blocks form permanently, no way to submit again without refresh
**Why it happens:** Forgot to add dismiss logic or timer
**How to avoid:** Set timeout to clear success state after 3-5 seconds (marko uses 3s)
**Warning signs:** Form becomes unusable after first submission, no way to re-submit

### Pitfall 5: Pricing Already Exists (Phase-Specific)
**What goes wrong:** Duplicate work implementing pricing when it's already done in Phase 4
**Why it happens:** Not checking existing codebase before planning
**How to avoid:** Review page.tsx and STATE.md to verify what's already implemented
**Warning signs:** Plan includes tasks for components that already exist and work

## Code Examples

Verified patterns from official sources:

### Contact Section Layout (Two-Column)
```typescript
// Source: Adapted from marko-react contact.jsx structure
'use client'

import ContactForm from './ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section
      id="contact"
      className="section bg-[var(--accent-color-3)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Contact Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Let's <span className="accent-color">Talk</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Ready to start your growth journey? Get in touch with us today.
        </p>

        {/* Two-Column Layout: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            {/* Contact details with icons - see Pattern 4 above */}
          </div>

          {/* Right: Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Complete Form with All Fields
```typescript
// Source: Adapted from marko-react ContactForm.jsx
'use client'

import { useState, FormEvent } from 'react'
import { Check, X } from 'lucide-react'

// ... (FormState, FormErrors interfaces from Pattern 1)

export default function ContactForm() {
  // ... (state and validation from Pattern 1)

  return (
    <div className="bg-[var(--body-bg)] p-6 lg:p-8 rounded-marko border border-[var(--accent-color-3)]">
      <h3 className="text-2xl font-bold text-primary mb-6">
        Send us a Message
      </h3>

      {/* Success/Error Alerts - Pattern 3 */}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border bg-[var(--body-bg)] text-primary ${
              errors.name ? 'border-red-500' : 'border-[var(--accent-color-3)]'
            }`}
            placeholder="Your name"
            required
          />
          {errors.name && (
            <p id="name-error" role="alert" aria-live="polite" className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field - similar structure */}

        {/* Company Field (optional) */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border bg-[var(--body-bg)] text-primary border-[var(--accent-color-3)]"
            placeholder="Your company (optional)"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border bg-[var(--body-bg)] text-primary ${
              errors.message ? 'border-red-500' : 'border-[var(--accent-color-3)]'
            }`}
            placeholder="Tell us about your project..."
            required
          />
          {errors.message && (
            <p id="message-error" role="alert" aria-live="polite" className="text-red-500 text-sm mt-1">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cta-primary text-white py-3 px-6 rounded-lg font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Formik | React Hook Form or useState | 2023-2024 | Formik not actively maintained, RHF has better performance |
| Class components with state | Functional components with hooks | 2019 | Simpler code, better TypeScript support |
| animate.css | framer-motion | 2020+ | Better React integration, more control |
| Custom validation logic | Zod/Yup schemas | 2021+ | Type-safe validation, better DX (but overkill for simple forms) |
| Uncontrolled refs | Controlled components (useState) | Context-dependent | Controlled better for validation, uncontrolled better for performance |

**Deprecated/outdated:**
- Formik: Not actively maintained (last commit >1 year ago), community moving to React Hook Form
- jQuery form validation: No place in modern React apps
- Redux Form: Deprecated in favor of React Hook Form or local state

## Open Questions

Things that couldn't be fully resolved:

1. **Backend Integration Timeline**
   - What we know: Requirements state "backend is out of scope (frontend-only)"
   - What's unclear: Will backend be added in a future phase? Should form collect data differently?
   - Recommendation: Implement success message now, prepare data structure that's easy to POST later

2. **Form Analytics/Tracking**
   - What we know: Not mentioned in requirements
   - What's unclear: Should we track form submissions, abandonment, field errors?
   - Recommendation: Add data-tracking attributes to form elements for future analytics integration

3. **Spam Prevention**
   - What we know: No backend = no server-side spam prevention
   - What's unclear: Will honeypot fields or client-side rate limiting be needed?
   - Recommendation: Implement basic rate limiting (prevent rapid repeat submissions) in Phase 5, defer honeypot to future

## Sources

### Primary (HIGH confidence)
- React documentation (useState, controlled components): https://react.dev/learn/managing-state
- MDN Web Docs (ARIA attributes): https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
- React Aria (accessible forms): https://react-aria.adobe.com/forms
- Codebase review: irenic-media-new/components/Header.tsx (existing useState pattern), marko-react ContactForm.jsx (reference implementation)
- Codebase review: irenic-media-new/components/Pricing/Pricing.tsx (already complete, verified in STATE.md)

### Secondary (MEDIUM confidence)
- [React Form Validation: The Ultimate Guide](https://formspree.io/blog/react-form-validation/)
- [Form on React: Best Practices](https://daily.dev/blog/form-on-react-best-practices)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)
- [The Only Guide You Need for Next.js Forms: Server Actions, Zod & Validation (2025)](https://www.deepintodev.com/blog/form-handling-in-nextjs)
- [React Hook Form vs Formik comparison](https://refine.dev/blog/react-hook-form-vs-formik/)
- [The best React form libraries of 2026](https://blog.croct.com/post/best-react-form-libraries)
- [Success Message UX Examples & Best Practices](https://www.pencilandpaper.io/articles/success-ux)
- [How to Design UI Forms in 2026: Your Best Guide](https://www.interaction-design.org/literature/article/ui-form-design)
- [A Guide To Accessible Form Validation](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/)

### Tertiary (LOW confidence)
- None - all major claims verified with official docs or codebase review

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, patterns verified in existing codebase
- Architecture: HIGH - marko-react reference implementation reviewed, fits established patterns
- Pitfalls: HIGH - Common React form pitfalls well-documented, accessibility requirements from WCAG 2.1

**Research date:** 2026-02-06
**Valid until:** ~60 days (form validation patterns are stable, React 19 is current)

**Key Finding:** Pricing component already complete (added in Phase 4), verified in STATE.md and codebase. Phase 5 main work is Contact form with validation.
