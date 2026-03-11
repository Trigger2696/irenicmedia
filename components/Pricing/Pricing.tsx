'use client'

import { useState } from 'react'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import PricingModal from './PricingModal'

export interface FeatureDetail {
  icon: string
  title: string
  description: string
}

export interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  featureDetails: FeatureDetail[]
  cta: string
  popular: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '₹35,000',
    period: '/month',
    description: 'Perfect for small businesses starting their digital journey',
    features: [
      'Social Media Management (2 platforms)',
      'Basic SEO Optimization',
      'Monthly Performance Report',
      '5 Creative Posts/Week',
      'Email Support',
      'Basic Analytics Dashboard'
    ],
    featureDetails: [
      {
        icon: 'fa-solid fa-share-nodes',
        title: 'Social Media Management (2 Platforms)',
        description: 'Content calendar, scheduling, community management, and engagement tracking for Instagram + Facebook or any 2 platforms of your choice.'
      },
      {
        icon: 'fa-solid fa-magnifying-glass-chart',
        title: 'Basic SEO Optimization',
        description: 'On-page SEO audit, keyword research for up to 20 keywords, meta tag optimization, and sitemap setup to boost your organic visibility.'
      },
      {
        icon: 'fa-solid fa-chart-line',
        title: 'Monthly Performance Report',
        description: 'Detailed analytics report covering reach, engagement, traffic, and growth metrics with actionable insights delivered every month.'
      },
      {
        icon: 'fa-solid fa-palette',
        title: '5 Creative Posts per Week',
        description: 'Professionally designed static and carousel graphics tailored to your brand identity — consistent, on-brand content every week.'
      },
      {
        icon: 'fa-solid fa-envelope',
        title: 'Email Support',
        description: 'Dedicated support during business hours (Mon–Fri, 10 AM–7 PM IST) with a guaranteed 24-hour response time.'
      },
      {
        icon: 'fa-solid fa-gauge-high',
        title: 'Basic Analytics Dashboard',
        description: 'Access to a real-time dashboard tracking key metrics across your managed platforms — always know how you\'re performing.'
      }
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Growth',
    price: '₹85,000',
    period: '/month',
    description: 'Ideal for growing businesses ready to scale their presence',
    features: [
      'Social Media Management (4 platforms)',
      'Advanced SEO & Content Strategy',
      'Performance Marketing (up to ₹50k ad spend)',
      'Weekly Performance Reports',
      '10 Creative Posts/Week',
      'Priority Support',
      'Competitor Analysis',
      'Influencer Outreach (Micro)'
    ],
    featureDetails: [
      {
        icon: 'fa-solid fa-share-nodes',
        title: 'Social Media Management (4 Platforms)',
        description: 'Full-service management across Instagram, Facebook, LinkedIn, and Twitter/X with tailored strategies per platform.'
      },
      {
        icon: 'fa-solid fa-rocket',
        title: 'Advanced SEO & Content Strategy',
        description: 'Comprehensive SEO including technical audits, content planning, blog strategy, backlink outreach, and up to 50 keyword tracking.'
      },
      {
        icon: 'fa-solid fa-bullseye',
        title: 'Performance Marketing',
        description: 'Google Ads and Meta Ads management with up to ₹50,000 monthly ad spend (billed separately), including A/B testing and conversion optimization.'
      },
      {
        icon: 'fa-solid fa-chart-column',
        title: 'Weekly Performance Reports',
        description: 'In-depth weekly analytics with campaign performance breakdowns, ROI tracking, and strategy adjustment recommendations.'
      },
      {
        icon: 'fa-solid fa-paintbrush',
        title: '10 Creative Posts per Week',
        description: 'Mix of static graphics, carousels, reels/short-form videos, and stories designed for maximum engagement across all platforms.'
      },
      {
        icon: 'fa-solid fa-headset',
        title: 'Priority Support',
        description: 'Faster response times (within 4 hours) with a dedicated account coordinator and bi-weekly strategy calls.'
      },
      {
        icon: 'fa-solid fa-binoculars',
        title: 'Competitor Analysis',
        description: 'Monthly competitive landscape report covering content strategies, ad activity, and market positioning of your top 5 competitors.'
      },
      {
        icon: 'fa-solid fa-users',
        title: 'Micro-Influencer Outreach',
        description: 'Identification, vetting, and management of micro-influencer collaborations — up to 5 partnerships per month.'
      }
    ],
    cta: 'Start Growing',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-service solution for established brands seeking dominance',
    features: [
      'All Growth Features',
      'Unlimited Platforms',
      'Dedicated Account Manager',
      'Custom Software Development',
      'Mobile App Development',
      'Advanced Analytics & BI',
      'Influencer Campaigns (All Tiers)',
      '24/7 Priority Support',
      'Quarterly Strategy Reviews'
    ],
    featureDetails: [
      {
        icon: 'fa-solid fa-layer-group',
        title: 'Everything in Growth',
        description: 'All features from the Growth plan included as your baseline — fully customizable to your specific business needs.'
      },
      {
        icon: 'fa-solid fa-globe',
        title: 'Unlimited Platform Management',
        description: 'Manage presence across all relevant social platforms, review sites, and emerging channels without any platform limits.'
      },
      {
        icon: 'fa-solid fa-user-tie',
        title: 'Dedicated Account Manager',
        description: 'A senior strategist assigned exclusively to your brand with weekly strategy sessions and direct communication channels.'
      },
      {
        icon: 'fa-solid fa-code',
        title: 'Custom Software Development',
        description: 'Bespoke web applications, SaaS platforms, dashboards, and internal tools built to your exact specifications.'
      },
      {
        icon: 'fa-solid fa-mobile-screen-button',
        title: 'Mobile App Development',
        description: 'Native or cross-platform mobile application development (iOS & Android) with ongoing maintenance and updates.'
      },
      {
        icon: 'fa-solid fa-database',
        title: 'Advanced Analytics & BI',
        description: 'Custom BI dashboards, attribution modeling, predictive analytics, and data-driven strategy powered by your business data.'
      },
      {
        icon: 'fa-solid fa-star',
        title: 'Full-Scale Influencer Campaigns',
        description: 'End-to-end influencer marketing across micro, mid-tier, and macro influencers with campaign strategy, negotiation, and reporting.'
      },
      {
        icon: 'fa-solid fa-clock',
        title: '24/7 Priority Support',
        description: 'Round-the-clock dedicated support with guaranteed 1-hour response time for critical issues — we\'re always on.'
      },
      {
        icon: 'fa-solid fa-compass',
        title: 'Quarterly Strategy Reviews',
        description: 'Executive-level strategic reviews with C-suite presentations, market analysis, and 90-day roadmap planning sessions.'
      }
    ],
    cta: 'Contact Us',
    popular: false
  }
]

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)

  return (
    <section
      id="pricing"
      className="section bg-[var(--body-bg)]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="hero-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-star text-accent"></i>
          <span className="text-primary font-bold">Pricing</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Simple, Transparent <span className="accent-color">Pricing</span>
        </h2>
        <p className="text-[var(--text-color)] mb-12 max-w-2xl">
          Choose the plan that fits your growth stage. All plans include strategy consultation and no hidden fees.
        </p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => (
            <AnimateOnScroll key={tier.name} delay={index * 0.1}>
              <div
                className={`relative p-6 lg:p-8 rounded-marko border transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
                  tier.popular
                    ? 'bg-accent/5 border-accent shadow-accent'
                    : 'bg-[var(--body-bg)] border-[var(--accent-color-3)] hover:shadow-accent'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-accent">{tier.price}</span>
                    <span className="text-[var(--text-color)]">{tier.period}</span>
                  </div>
                  <p className="text-[var(--text-color)] text-sm mt-3">{tier.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-lg text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-color)] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedTier(tier)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'cta-primary text-white'
                      : 'cta-secondary text-primary hover:text-white hover:bg-accent'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-[var(--text-color)] text-sm mt-8">
          * Ad spend is billed separately. Custom requirements? <a href="#contact" className="text-accent hover:underline">Let&apos;s talk</a>.
        </p>
      </div>

      {/* Pricing Modal */}
      {selectedTier && (
        <PricingModal
          tier={selectedTier}
          isOpen={!!selectedTier}
          onClose={() => setSelectedTier(null)}
        />
      )}
    </section>
  )
}
