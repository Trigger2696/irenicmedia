import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-24 md:h-28"></div>

      {/* Hero Section Placeholder */}
      <section id="hero" className="section min-h-screen flex items-center">
        <div className="hero-container">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Growth without chaos.
          </h1>
          <p className="text-xl text-[var(--text-color)] mt-4">
            Strategy without noise.
          </p>
        </div>
      </section>

      {/* Test sections with IDs for scroll navigation */}
      <section id="services" className="section min-h-screen bg-[var(--accent-color-3)]">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">Services</h2>
          <p className="text-[var(--text-color)] mt-4">Services section placeholder</p>
        </div>
      </section>

      <section id="about" className="section min-h-screen">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">About</h2>
          <p className="text-[var(--text-color)] mt-4">About section placeholder</p>
        </div>
      </section>

      <section id="why-us" className="section min-h-screen bg-[var(--accent-color-3)]">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">Why Us</h2>
          <p className="text-[var(--text-color)] mt-4">Why Us section placeholder</p>
        </div>
      </section>

      <section id="testimonials" className="section min-h-screen">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">Testimonials</h2>
          <p className="text-[var(--text-color)] mt-4">Testimonials section placeholder</p>
        </div>
      </section>

      <section id="case-studies" className="section min-h-screen bg-[var(--accent-color-3)]">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">Case Studies</h2>
          <p className="text-[var(--text-color)] mt-4">Case Studies section placeholder</p>
        </div>
      </section>

      <section id="pricing" className="section min-h-screen">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">Pricing</h2>
          <p className="text-[var(--text-color)] mt-4">Pricing section placeholder</p>
        </div>
      </section>

      <section id="contact" className="section min-h-screen bg-[var(--accent-color-3)]">
        <div className="hero-container">
          <h2 className="text-3xl font-bold text-primary">Contact</h2>
          <p className="text-[var(--text-color)] mt-4">Contact section placeholder</p>
        </div>
      </section>
    </main>
  )
}
