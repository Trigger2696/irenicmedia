# Technical Concerns

**Analysis Date:** 2025-02-05

## Code Quality Issues

| Location | Issue | Severity | Recommendation |
|----------|-------|----------|----------------|
| `irenic-media/components/Contact.tsx:59` | Console.log left in production code | low | Remove `console.log('Form submitted:', formData)` or replace with proper logging |
| `irenic-media/components/Contact.tsx:56-62` | Form submission does nothing | high | Form only logs to console - no actual email/API submission implemented |
| `irenic-media/components/Footer.tsx:36` | Placeholder href="#" link | low | Logo link points to "#" - should link to top of page or home |
| `irenic-media/components/Header.tsx:40` | Placeholder href="#" link | low | Logo link points to "#" - should link to "/" or add proper navigation |
| `irenic-media/components/Footer.tsx:22-25` | Social media links non-functional | medium | Social links use href="#" placeholders - need actual URLs |
| `marko_main_files/marko-react/src/Components/Form/ContactForm.jsx` | Form only validates email | medium | No backend integration - form submits to nowhere |

## TODOs & FIXMEs

| Location | Comment | Priority |
|----------|---------|----------|
| Not detected | No TODO/FIXME comments found in codebase | - |

## Security Considerations

- **Form Inputs (irenic-media):** Contact form has basic client-side validation but no sanitization for XSS prevention. If form data is ever sent to a backend, implement server-side validation and sanitization.

- **Form Inputs (marko_main_files):** ContactForm.jsx has minimal validation (email only). First name, last name, subject, and message fields have no validation - implement comprehensive validation if backend is added.

- **No Authentication:** Neither project implements authentication. If protected routes are needed, add proper auth system.

- **No CSRF Protection:** No CSRF tokens implemented for forms. Add CSRF protection when backend API is integrated.

- **No Rate Limiting:** Contact forms have no rate limiting - vulnerable to spam/abuse when backend is connected.

## Dependency Issues

| Package | Issue | Action Needed |
|---------|-------|---------------|
| `irenic-media/next: ^16.1.6` | Very recent version | Monitor for stability issues - Next.js 16.x is newly released |
| `marko_main_files/react: ^19.1.0` | React 19 (latest) | Recently released - may have breaking changes from React 18 patterns |
| `marko_main_files/vite: ^7.0.4` | Vite 7 (very new) | Recently released - may encounter undocumented issues |
| Both projects | No lockfile version pinning verification | Consider using `npm ci` for reproducible builds |

## Technical Debt

### irenic-media Project

- **No Testing Infrastructure:** Zero test files exist. No test framework configured. Add Jest/Vitest and implement component tests.
  - Files affected: All components in `irenic-media/components/`
  - Impact: Cannot verify components work correctly after changes
  - Priority: High

- **Contact Form Backend Missing:** The contact form at `irenic-media/components/Contact.tsx` only logs to console.
  - Impact: Users cannot actually contact the business
  - Fix: Integrate with email service (e.g., Resend, SendGrid) or form backend (e.g., Formspree)
  - Priority: Critical for production

- **Hardcoded Content:** All text content is hardcoded in components.
  - Files: All components in `irenic-media/components/`
  - Impact: Content changes require code deployments
  - Fix: Consider headless CMS or content files for easy updates

- **No Error Boundary:** No error boundaries implemented.
  - Impact: Runtime errors crash entire app
  - Fix: Add error boundary components around major sections

- **No Loading States:** Components don't handle loading states.
  - Impact: No feedback during async operations
  - Fix: Add loading skeletons or indicators

### marko_main_files Project

- **Legacy/Template Code:** Appears to be a purchased/downloaded template with extensive boilerplate.
  - Impact: Large codebase with potentially unused code
  - Fix: Audit and remove unused components if integrating into main project

- **No Testing:** No test files exist in marko-react project.
  - Impact: Same as irenic-media

- **Mixed Project Structure:** Repository contains multiple unrelated projects (irenic-media, marko_main_files) without clear organization.
  - Impact: Confusing project structure, potential for accidental cross-project changes
  - Fix: Consider monorepo structure with proper workspaces or separate repositories

## Test Coverage Gaps

| Untested Area | What's Not Tested | Files | Risk | Priority |
|---------------|-------------------|-------|------|----------|
| All Components | No component tests exist | `irenic-media/components/*.tsx` | UI regressions undetected | High |
| Form Validation | Contact form validation logic | `irenic-media/components/Contact.tsx` | Validation bugs in production | High |
| Custom Hook | useInView hook behavior | `irenic-media/hooks/useInView.tsx` | Intersection observer edge cases | Medium |
| UI Components | Button and Card components | `irenic-media/components/ui/*.tsx` | Styling/behavior regressions | Medium |

## Accessibility Concerns

| Location | Issue | Severity | Recommendation |
|----------|-------|----------|----------------|
| `irenic-media/components/Header.tsx` | Mobile menu lacks focus trap | medium | Add focus trap when mobile menu is open |
| `irenic-media/components/Hero.tsx` | Scroll indicator has no aria-label | low | Add `aria-label="Scroll down"` |
| `irenic-media/components/Contact.tsx` | Form lacks aria-live region | medium | Add aria-live for form submission feedback |
| All components | No skip-to-content link | low | Add skip navigation link for keyboard users |

## Performance Concerns

| Location | Issue | Severity | Recommendation |
|----------|-------|----------|----------------|
| `irenic-media/components/Header.tsx:45-52` | Large logo image (500x200 specified) | low | Verify actual logo dimensions needed; optimize if oversized |
| Multiple components | Framer Motion on all components | low | Consider reducing animations on reduced-motion preference |

## Missing Critical Features

| Feature | Problem | Blocks | Priority |
|---------|---------|--------|----------|
| Form Backend | Contact form non-functional | User inquiries | Critical |
| Analytics | No analytics integration | Usage tracking | Medium |
| SEO | Basic metadata only | Search visibility | Medium |
| Sitemap | No sitemap.xml | Search indexing | Low |
| robots.txt | No robots.txt | SEO best practices | Low |

## Recommendations

1. **Critical - Implement Contact Form Backend:** The contact form logs to console but sends no data. Integrate with:
   - Server action (Next.js 13+) with email service
   - Third-party form service (Formspree, Netlify Forms)
   - Custom API route with email delivery

2. **High - Add Testing Framework:** Set up Vitest or Jest with React Testing Library. Start with:
   - Contact form validation tests
   - useInView hook tests
   - Button/Card component tests

3. **High - Add Error Boundaries:** Wrap main sections in error boundaries to prevent full-app crashes.

4. **Medium - Fix Placeholder Links:** Replace all `href="#"` with proper destinations or remove non-functional links.

5. **Medium - Implement Analytics:** Add analytics (Vercel Analytics, Plausible, or Google Analytics) for usage insights.

6. **Medium - Repository Organization:** Clarify relationship between irenic-media and marko_main_files projects. Consider:
   - Separating into distinct repositories
   - Proper monorepo setup with workspaces
   - Documenting project purposes in root README

7. **Low - Remove Console Logging:** Clean up `console.log` statements before production deployment.

8. **Low - Add Accessibility Improvements:** Implement focus trap for mobile menu, aria-live regions for dynamic content, and skip-to-content links.

---

*Concerns audit: 2025-02-05*
