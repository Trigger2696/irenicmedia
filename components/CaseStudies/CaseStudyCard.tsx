'use client'

import Image from 'next/image'
import { Badge } from './Badge'
import { cn } from '@/lib/utils'

interface CaseStudyCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  className?: string
}

export function CaseStudyCard({
  title,
  description,
  tags,
  image,
  className
}: CaseStudyCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-marko bg-[var(--body-bg)] border border-[var(--accent-color-3)]',
        'hover:shadow-accent hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {/* Project Image */}
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={image}
          alt={`${title} project screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-[var(--text-color)] leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
