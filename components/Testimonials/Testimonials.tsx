'use client'

import AnimateOnScroll from '@/components/AnimateOnScroll'
import { TestimonialCard } from './TestimonialCard'

const testimonials = [
  {
    name: 'Arjun Mehta',
    company: 'TechFlow Solutions',
    role: 'Marketing Director',
    rating: 5,
    review: 'Irenic Media transformed our digital presence. Their strategic approach resulted in a 150% increase in qualified leads within just 6 months. The team truly understands how to blend creativity with data-driven decisions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Priya Sharma',
    company: 'GreenLeaf Ventures',
    role: 'Founder & CEO',
    rating: 5,
    review: "Working with Irenic Media has been a game-changer. They don't just execute campaigns – they become true partners in your growth journey. Our ROI has tripled since we started working together.",
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Vikram Desai',
    company: 'Bloom Fashion',
    role: 'Brand Manager',
    rating: 5,
    review: "The transparency and communication from Irenic Media is unmatched. We always know exactly what's happening with our campaigns and why. They've helped us build a loyal community of over 100k followers.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Eloisa Flament',
    company: 'FitnessPro App',
    role: 'Head of Growth',
    rating: 5,
    review: 'From app development to user acquisition, Irenic Media handled everything seamlessly. Our app downloads increased by 200% in the first quarter after launch. Highly recommend their mobile expertise.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  }
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section bg-[var(--body-bg)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Client Stories</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          What Our <span className="accent-color">Clients Say</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Hear from businesses we've helped grow with strategic digital marketing and technology solutions.
        </p>

        {/* Testimonials Grid - Mobile-first responsive: 1 col -> 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.name} delay={index * 0.1}>
              <TestimonialCard {...testimonial} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
