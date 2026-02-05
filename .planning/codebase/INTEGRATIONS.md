# External Integrations

**Analysis Date:** 2026-02-05

## Overview

Both projects in this repository are frontend-only marketing/portfolio websites with minimal external integrations. No backend APIs, databases, or authentication services are currently integrated.

---

## APIs & External Services

### Google Maps (marko-react only)

**Service:** Google Maps Embed API
- **Usage:** Embedded iframe in `marko_main_files/marko-react/src/Components/Maps/map.jsx`
- **Auth:** None required (public embed)
- **Integration Type:** iframe embed, no JavaScript SDK
- **Example:**
```jsx
<iframe
  src="https://maps.google.com/maps?q=London%20Eye...&output=embed"
  title="Location"
/>
```

### Google Fonts (irenic-media only)

**Service:** Google Fonts via Next.js
- **Usage:** Font loading in `irenic-media/app/layout.tsx`
- **Auth:** None required
- **Fonts Used:** Inter, Outfit
- **Integration Type:** Next.js `next/font/google` module (automatic optimization)

---

## Data Storage

### Databases
- **None** - Both projects are static frontend applications

### File Storage
- **Local filesystem only** - Static assets in `public/` directories

### Caching
- **None** - No caching layer configured

---

## Authentication & Identity

**Auth Provider:**
- **None** - No authentication implemented in either project

---

## Monitoring & Observability

### Error Tracking
- **None** - No Sentry, LogRocket, or similar service configured

### Logs
- **Console only** - Standard `console.log` statements
- Example in `irenic-media/components/Contact.tsx`:
```typescript
console.log('Form submitted:', formData)
```

### Analytics
- **None** - No Google Analytics, Plausible, or similar configured

---

## CI/CD & Deployment

### Hosting
- **Not configured** - No deployment configuration files present

### CI Pipeline
- **None** - No GitHub Actions, CircleCI, or similar configured

### Potential Deployment Targets

**irenic-media (Next.js):**
- Vercel (recommended, zero-config)
- Netlify
- AWS Amplify
- Self-hosted Node.js server

**marko-react (Vite SPA):**
- GitHub Pages
- Netlify
- Vercel
- Any static file hosting (S3, CloudFront)

---

## Webhooks & Callbacks

### Incoming
- **None** - No webhook endpoints

### Outgoing
- **None** - No outbound webhook calls

---

## Environment Configuration

### Required Environment Variables
- **None** - Neither project uses environment variables

### Secrets Location
- **Not applicable** - No secrets configured

### Environment Files
- **None detected** - No `.env`, `.env.local`, or similar files

---

## Form Handling

### Contact Forms

**irenic-media:**
- Location: `irenic-media/components/Contact.tsx`
- Backend: **None** - Form submission logs to console only
- Validation: Client-side only

**marko-react:**
- Location: `marko_main_files/marko-react/src/Components/Form/ContactForm.jsx`
- Backend: **None** - Form submission logs success message only
- Validation: Client-side email validation

**Recommendation:** Both contact forms require backend integration to actually send messages. Options:
- Formspree (no-code)
- Netlify Forms (if deploying to Netlify)
- Custom API endpoint
- Email service (SendGrid, Resend, etc.)

---

## Third-Party Services Summary

| Service | Project | Purpose | Auth Required |
|---------|---------|---------|---------------|
| Google Maps Embed | marko-react | Location display | No |
| Google Fonts | irenic-media | Typography | No |

---

## Missing Integrations (Recommendations)

**For Production Readiness:**

1. **Analytics** - Add Google Analytics, Plausible, or similar
2. **Error Monitoring** - Add Sentry for error tracking
3. **Form Backend** - Implement email sending for contact forms
4. **SEO** - irenic-media has metadata; marko-react needs similar

**Optional Enhancements:**

1. **CMS** - Sanity, Contentful, or Strapi for content management
2. **Newsletter** - Mailchimp or ConvertKit integration
3. **Chat Widget** - Intercom, Crisp, or similar

---

*Integration audit: 2026-02-05*
