'use client'

import { cn } from '@/lib/utils'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  return (
    <div className={cn(
      'p-6 rounded-marko bg-[var(--body-bg)] border border-[var(--accent-color-3)]',
      'transition-all duration-300 hover:shadow-accent hover:-translate-y-1',
      className
    )}>
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        <i className={cn(icon, 'text-3xl text-accent')} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-primary mb-3">
        {title}
      </h3>
      <p className="text-[var(--text-color)] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
