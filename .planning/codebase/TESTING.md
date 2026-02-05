# Testing Patterns

**Analysis Date:** 2026-02-05

## Test Framework

**Runner:**
- Not configured

**Status:**
- No test framework is currently set up in either project
- No test files exist in the source code directories
- Package.json files do not include test-related scripts or dependencies

## Test File Organization

**Location:**
- Not applicable - no tests exist

**Current Structure:**
```
irenic-media/
  app/
  components/
  hooks/
  (no __tests__ or *.test.* files)

marko_main_files/marko-react/
  src/
    Components/
    Data/
    Page/
    (no __tests__ or *.test.* files)
```

## Run Commands

**irenic-media (Next.js):**
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

**marko-react (Vite):**
```bash
npm run dev      # Start Vite dev server
npm run build    # Production build (vite build)
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Coverage

Not configured - no test coverage tools are installed.

## Recommended Test Setup

**For irenic-media (Next.js + TypeScript):**

Recommended framework: **Vitest** or **Jest** with React Testing Library

Install:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

Suggested file structure:
```
irenic-media/
  __tests__/
    components/
      Button.test.tsx
      Card.test.tsx
    hooks/
      useInView.test.tsx
  vitest.config.ts
```

**For marko-react (Vite + React):**

Recommended framework: **Vitest** (native Vite integration)

Install:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Test Types Needed

| Type | Priority | Purpose |
|------|----------|---------|
| Unit | High | Test hooks (`useInView`), validation functions |
| Component | High | Test UI components in isolation |
| Integration | Medium | Test form submissions, navigation flows |
| E2E | Low | Full user journey testing (Playwright/Cypress) |

## Key Areas to Test

**irenic-media:**
- `hooks/useInView.tsx` - Intersection Observer hook logic
- `components/ui/Button.tsx` - Variant rendering, click handlers
- `components/ui/Card.tsx` - Compound component composition
- `components/Contact.tsx` - Form validation and submission

**marko-react:**
- `src/Components/Hooks/AnimateOnScroll.jsx` - Animation trigger logic
- `src/Components/Form/ContactForm.jsx` - Email validation
- `src/Components/Context/NavContext.jsx` - Navigation context state

## Mocking Patterns

**Intersection Observer (for useInView):**
```typescript
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback
    }
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
  }
})
```

**Framer Motion:**
```typescript
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))
```

**Next.js Image:**
```typescript
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))
```

## Sample Test Structure

**Component Test Pattern:**
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Button from '@/components/ui/Button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-100')
  })
})
```

**Hook Test Pattern:**
```typescript
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useInView } from '@/hooks/useInView'

describe('useInView', () => {
  it('returns ref and initial false state', () => {
    const { result } = renderHook(() => useInView())
    const [ref, isInView] = result.current

    expect(ref.current).toBeNull()
    expect(isInView).toBe(false)
  })
})
```

---

*Testing analysis: 2026-02-05*
