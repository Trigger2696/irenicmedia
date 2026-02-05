import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-24 md:h-28"></div>

      {/* Hero Section Placeholder */}
      <section id="hero" className="section min-h-[80vh] flex items-center">
        <div className="hero-container">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary">
            Growth without chaos.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-color)] mt-4">
            Strategy without noise.
          </p>
          <p className="text-[var(--text-color)] mt-6 max-w-2xl">
            We are Irenic Media, a strategy-led digital marketing and technology agency
            helping ambitious brands build sustainable, long-term growth.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-[var(--accent-color-3)]" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What We <span className="accent-color">Offer</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Comprehensive digital marketing and technology solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">About Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Who We <span className="accent-color">Are</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Founded by Raj Shah & Ruchika Chandel, Irenic Media brings together
            strategy, creativity, and technology to drive meaningful growth.
          </p>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="section bg-[var(--accent-color-3)]" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why <span className="accent-color">Irenic Media</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Strategy before execution. Data-driven decisions. Transparent partnership.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What Our <span className="accent-color">Clients Say</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Don't just take our word for it - hear from the brands we've helped grow.
          </p>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="section bg-[var(--accent-color-3)]" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">Case Studies</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our <span className="accent-color">Success Stories</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Real results from real partnerships.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Simple, Transparent <span className="accent-color">Pricing</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Choose the plan that fits your growth stage.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-[var(--accent-color-3)]" style={{ scrollMarginTop: '100px' }}>
        <div className="hero-container">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-star text-accent"></i>
            <span className="text-primary font-bold">Contact Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Let's <span className="accent-color">Talk</span>
          </h2>
          <p className="text-[var(--text-color)] mt-4 max-w-2xl">
            Ready to start your growth journey? Get in touch.
          </p>
          <div className="mt-8 text-[var(--text-color)]">
            <p>Email: hello@irenicmedia.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Mumbai, India</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
