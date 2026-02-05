# Codebase Structure

**Analysis Date:** 2026-02-05

## Directory Layout

```
test_c/
├── .claude/                    # Claude Code configuration
│   └── skills/
│       └── frontend-patterns/  # Frontend patterns skill
├── .planning/                  # GSD planning documents
│   └── codebase/               # Codebase analysis docs
├── irenic-media/               # Next.js project (Irenic Media)
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   └── ui/                 # Reusable UI primitives
│   ├── hooks/                  # Custom React hooks
│   ├── public/                 # Static assets
│   └── node_modules/           # Dependencies
├── marko_main_files/           # Marko template project
│   ├── documentation/          # Template documentation
│   └── marko-react/            # React SPA (Vite)
│       ├── public/             # Static assets
│       │   └── assets/         # Images, CSS, fonts
│       └── src/                # Source code
│           ├── assets/         # Bundled CSS
│           ├── Components/     # React components (PascalCase)
│           ├── Data/           # Static content data
│           └── Page/           # Page-level components
├── CLAUDE.md                   # Project instructions
├── irenic-logo.png             # Logo asset
└── Untitled document.docx      # Document file
```

## Directory Purposes

**marko_main_files/marko-react/src/Components/:**
- Purpose: All React components organized by feature
- Contains: Feature folders (Banner, Services, Card, etc.)
- Key files:
  - `Header/header.jsx` - Main navigation
  - `Footer/footer.jsx` - Site footer
  - `Sidebar/Sidebar.jsx` - Mobile sidebar
  - `Context/NavContext.jsx` - Navigation state
  - `Hooks/AnimateOnScroll.jsx` - Animation utility

**marko_main_files/marko-react/src/Components/Card/:**
- Purpose: Reusable card components for content display
- Contains: Presentational card components
- Key files:
  - `ServiceCard.jsx` - Service display card
  - `TestimonialCard.jsx` - Testimonial card
  - `BlogCard.jsx` - Blog post card
  - `TeamCard.jsx` - Team member card
  - `PartnershipCard.jsx` - Partner logo card

**marko_main_files/marko-react/src/Page/:**
- Purpose: Page-level components that compose sections
- Contains: One folder per route
- Key files:
  - `Home/index.jsx` - Homepage composition
  - `About/index.jsx` - About page
  - `Service/index.jsx` - Services listing
  - `Contact/index.jsx` - Contact page

**marko_main_files/marko-react/src/Data/:**
- Purpose: Static content data for components
- Contains: Exported arrays of content objects
- Key files:
  - `ServiceData.jsx` - Services content
  - `TeamData.jsx` - Team members
  - `TestimonialData.jsx` - Customer testimonials
  - `BlogPostData.jsx` - Blog posts
  - `FaqData.jsx` - FAQ content

**irenic-media/app/:**
- Purpose: Next.js App Router pages and layouts
- Contains: Page components and layout
- Key files:
  - `layout.tsx` - Root layout with fonts/metadata
  - `page.tsx` - Homepage
  - `globals.css` - Global Tailwind styles

**irenic-media/components/:**
- Purpose: Section components for page composition
- Contains: Feature components
- Key files:
  - `Header.tsx` - Navigation header
  - `Hero.tsx` - Hero section
  - `Services.tsx` - Services grid
  - `Footer.tsx` - Site footer

**irenic-media/components/ui/:**
- Purpose: Reusable UI primitives
- Contains: Base components
- Key files:
  - `Button.tsx` - Button component
  - `Card.tsx` - Card component with compound pattern

**irenic-media/hooks/:**
- Purpose: Custom React hooks
- Contains: Utility hooks
- Key files:
  - `useInView.tsx` - Intersection observer hook

## Key File Locations

**Entry Points:**
- `marko_main_files/marko-react/src/main.jsx`: Vite app entry, global styles
- `marko_main_files/marko-react/src/App.jsx`: React app shell with providers
- `irenic-media/app/layout.tsx`: Next.js root layout

**Configuration:**
- `marko_main_files/marko-react/package.json`: Vite project deps
- `marko_main_files/marko-react/vite.config.js`: Vite configuration
- `marko_main_files/marko-react/eslint.config.js`: ESLint config
- `irenic-media/package.json`: Next.js project deps
- `irenic-media/next.config.js`: Next.js configuration
- `irenic-media/postcss.config.js`: PostCSS/Tailwind config

**Core Logic:**
- `marko_main_files/marko-react/src/Routers.jsx`: Client-side routing
- `marko_main_files/marko-react/src/Components/Context/NavContext.jsx`: Navigation state
- `irenic-media/hooks/useInView.tsx`: Scroll animation logic

**Testing:**
- Not detected in either project

**Styling:**
- `marko_main_files/marko-react/src/assets/css/main.css`: Main styles
- `marko_main_files/marko-react/src/assets/css/responsive.css`: Responsive styles
- `irenic-media/app/globals.css`: Tailwind configuration

## Naming Conventions

**Files:**
- Components (marko-react): lowercase with `.jsx` extension (`header.jsx`, `footer.jsx`)
- Components (irenic-media): PascalCase with `.tsx` extension (`Header.tsx`, `Services.tsx`)
- Card components: PascalCase (`ServiceCard.jsx`, `TeamCard.jsx`)
- Data files: PascalCase with Data suffix (`ServiceData.jsx`, `TeamData.jsx`)
- Page index files: `index.jsx`
- Hooks (irenic-media): camelCase with `use` prefix (`useInView.tsx`)

**Directories:**
- Components (marko-react): PascalCase feature folders (`Components/Banner/`, `Components/Services/`)
- Components (irenic-media): lowercase (`components/`, `components/ui/`)
- Pages (marko-react): PascalCase (`Page/Home/`, `Page/About/`)
- Pages (irenic-media): lowercase (`app/`)

**Exports:**
- Default exports for components
- Named exports for data arrays (`export const services = [...]`)

## Where to Add New Code

**New Feature (marko-react):**
- Primary code: `marko_main_files/marko-react/src/Components/{FeatureName}/`
- Card component: `marko_main_files/marko-react/src/Components/Card/{Name}Card.jsx`
- Data file: `marko_main_files/marko-react/src/Data/{Name}Data.jsx`
- Page: `marko_main_files/marko-react/src/Page/{Name}/index.jsx`
- Route: Add to `marko_main_files/marko-react/src/Routers.jsx`
- Tests: Not established

**New Feature (irenic-media):**
- Section component: `irenic-media/components/{Name}.tsx`
- UI primitive: `irenic-media/components/ui/{Name}.tsx`
- Hook: `irenic-media/hooks/use{Name}.tsx`
- Page: `irenic-media/app/{route}/page.tsx`
- Tests: Not established

**New Component/Module:**
- marko-react: Create folder in `src/Components/` with main component file
- irenic-media: Create file in `components/` or `components/ui/`

**Utilities:**
- marko-react hooks: `marko_main_files/marko-react/src/Components/Hooks/`
- irenic-media hooks: `irenic-media/hooks/`

## Special Directories

**marko_main_files/marko-react/public/assets/:**
- Purpose: Static assets served directly (images, fonts, vendor CSS)
- Generated: No
- Committed: Yes

**irenic-media/.next/:**
- Purpose: Next.js build output and cache
- Generated: Yes
- Committed: No (should be in .gitignore)

**irenic-media/node_modules/:**
- Purpose: npm dependencies
- Generated: Yes
- Committed: No

**marko_main_files/documentation/:**
- Purpose: HTML documentation for the Marko template
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-02-05*
