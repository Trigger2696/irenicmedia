import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero/Hero'
import Services from '@/components/Services/Services'
import About from '@/components/About/About'
import WhyUs from '@/components/WhyUs/WhyUs'
import Testimonials from '@/components/Testimonials/Testimonials'
import CaseStudies from '@/components/CaseStudies/CaseStudies'
import Pricing from '@/components/Pricing/Pricing'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section - starts from top, behind navbar */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* About Section */}
      <About />

      {/* Why Us Section */}
      <WhyUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Pricing Section */}
      <Pricing />

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
