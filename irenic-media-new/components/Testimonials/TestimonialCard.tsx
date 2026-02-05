'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  name: string
  company: string
  role: string
  rating: number
  review: string
  image: string
  className?: string
}

export function TestimonialCard({
  name,
  company,
  role,
  rating,
  review,
  image,
  className
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-marko bg-[var(--body-bg)] border border-[var(--accent-color-3)]',
        'transition-all duration-300 hover:shadow-accent hover:-translate-y-1',
        className
      )}
    >
      {/* Star Rating */}
      <div
        role="img"
        aria-label={`${rating} out of 5 stars`}
        className="flex gap-1 mb-4"
      >
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={cn(
              index < rating
                ? 'fill-[var(--accent-color)] text-accent'
                : 'text-[var(--accent-color-3)]'
            )}
          />
        ))}
      </div>

      {/* Review Text */}
      <blockquote className="text-[var(--text-color)] leading-relaxed mb-4">
        "{review}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center gap-4">
        {/* Photo */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image
            src={image}
            alt={`${name} profile photo`}
            fill
            sizes="56px"
            className="rounded-full object-cover"
          />
        </div>

        {/* Text Info */}
        <div className="flex-1">
          <p className="text-lg font-bold text-primary">{name}</p>
          <p className="text-sm text-[var(--text-color)]">{role}</p>
          <p className="text-sm text-accent">{company}</p>
        </div>
      </div>
    </div>
  )
}
