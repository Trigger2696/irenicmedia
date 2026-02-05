# Coding Conventions

**Analysis Date:** 2026-02-05

## Project Structure

This repository contains two distinct React projects:
1. **irenic-media** - Next.js 16 + TypeScript project (primary/active)
2. **marko_main_files/marko-react** - Vite + React 19 JSX project (template-based)

## Naming Patterns

**Files:**
- Components: PascalCase (`Hero.tsx`, `Button.tsx`, `ServiceCard.jsx`)
- Hooks: camelCase with `use` prefix (`useInView.tsx`)
- Pages (Next.js): lowercase (`page.tsx`, `layout.tsx`)
- Config files: lowercase with dots (`eslint.config.js`, `vite.config.js`, `tailwind.config.js`)

**Functions:**
- Components: PascalCase (`export default function Hero()`)
- Hooks: camelCase with `use` prefix (`export function useInView()`)
- Event handlers: camelCase with `handle` prefix (`handleSubmit`, `handleChange`)
- Validation: camelCase with `validate` prefix (`validateForm`, `validateEmail`)

**Variables:**
- State: camelCase (`isScrolled`, `formData`, `isInView`)
- State setters: `set` prefix (`setIsScrolled`, `setFormData`)
- Constants/data arrays: camelCase (`services`, `navLinks`, `footerLinks`)
- Animation variants: camelCase with `Variants` suffix (`containerVariants`, `itemVariants`)

**Types/Interfaces:**
- PascalCase with descriptive names (`FormData`, `FormErrors`, `UseInViewOptions`)
- Props interfaces: ComponentName + `Props` (`ButtonProps`, `CardProps`)

## Code Style

**Formatting:**
- Tool: ESLint (flat config format)
- Config location:
  - `marko_main_files/marko-react/eslint.config.js`
- No Prettier configured in source projects

**Key ESLint Rules:**
- `no-unused-vars`: Error with varsIgnorePattern `^[A-Z_]`
- React Hooks plugin: recommended-latest
- React Refresh plugin: Vite config

**TypeScript (irenic-media):**
- Strict mode enabled (`"strict": true`)
- Path aliases: `@/*` maps to `./*`
- Target: ES2017
- Config: `irenic-media/tsconfig.json`

## Import Organization

**Order:**
1. Framework imports (`'use client'` directive first for Next.js client components)
2. React/Next.js core (`react`, `next`, `next/font/google`)
3. Third-party libraries (`framer-motion`, `lucide-react`)
4. Internal components (`@/components/...`, `./ui/Button`)
5. Internal hooks (`@/hooks/useInView`)
6. Styles (CSS imports last)

**Path Aliases (irenic-media):**
- `@/*` - Root-relative imports (e.g., `@/components/Header`, `@/hooks/useInView`)

**Relative Imports (marko-react):**
- Use relative paths from current file (`../Hooks/AnimateOnScroll`, `./ui/Button`)

## Component Patterns

**Client Components (Next.js):**
- Add `'use client'` directive at top of file
- Example: `irenic-media/components/Hero.tsx`

**Function Component Declaration:**
```typescript
// Named export with forwardRef for UI components
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => { ... }
)

// Default export for page/section components
export default function Hero() { ... }
```

**Compound Components:**
- Use static properties for sub-components
- Example from `irenic-media/components/ui/Card.tsx`:
```typescript
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
Card.Icon = CardIcon
```

**Props with Defaults:**
```typescript
const ServiceCard = ({icon, title, content, link, speed = ""}) => { ... }
```

## Animation Patterns

**Framer Motion (irenic-media):**
- Define variants outside component
- Use `containerVariants` / `itemVariants` naming
- Common pattern:
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}
```

**animate.css (marko-react):**
- Use `AnimateOnScroll` wrapper component
- Props: `animation`, `delay`, `speed`, `threshold`

## State Management

**Local State:**
- Use `useState` for component-level state
- Group related state in objects when appropriate:
```typescript
const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  company: '',
  message: '',
})
```

**Context Pattern (marko-react):**
- Create context with `createContext()`
- Export Provider component and custom hook together
- Example: `irenic-media/components/ui/Card.tsx`, `marko_main_files/marko-react/src/Components/Context/NavContext.jsx`

## Error Handling

**Form Validation:**
- Inline validation with error state object
- Display errors conditionally near inputs
- Pattern from `irenic-media/components/Contact.tsx`:
```typescript
const [errors, setErrors] = useState<FormErrors>({})

const validateForm = (): boolean => {
  const newErrors: FormErrors = {}
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required'
  }
  // ...
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

## Styling Patterns

**Tailwind CSS (irenic-media):**
- Utility-first approach
- Custom utilities in `globals.css` using `@layer`
- Common custom classes: `section-padding`, `container-max`
- Template literals for conditional classes:
```typescript
className={`
  fixed top-0 left-0 right-0 z-50
  ${isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent'}
`}
```

**Bootstrap CSS (marko-react):**
- Bootstrap 5 grid system
- BEM-style custom classes (`card-service`, `service-icon-wrapper`)
- FontAwesome icons via class names

## Comments

**When to Comment:**
- Section headers in JSX: `{/* Section Header */}`
- Complex conditional logic (sparingly used)
- Props documentation in TypeScript interfaces

**JSDoc/TSDoc:**
- Not extensively used in this codebase
- Interface definitions serve as documentation

## Module Design

**Exports:**
- Default exports for page/section components
- Named exports for UI components and hooks (often with additional default export)
- Example: `irenic-media/hooks/useInView.tsx` exports both named and default

**Barrel Files:**
- Not currently used in the codebase
- Each component is imported directly by file path

## Data Organization

**Static Data:**
- Co-located in component file for small datasets
- Separate `Data/` directory for larger datasets (marko-react pattern)
- Location: `marko_main_files/marko-react/src/Data/`

---

*Convention analysis: 2026-02-05*
