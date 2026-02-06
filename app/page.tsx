import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero/Hero'
import Services from '@/components/Services/Services'
import About from '@/components/About/About'
import WhyUs from '@/components/WhyUs/WhyUs'
import Testimonials from '@/components/Testimonials/Testimonials'
import CaseStudies from '@/components/CaseStudies/CaseStudies'
import Pricing from '@/components/Pricing/Pricing'
import Contact from '@/components/Contact/Contact'

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
      <Contact />

      <Footer />
    </main>
  )
}
