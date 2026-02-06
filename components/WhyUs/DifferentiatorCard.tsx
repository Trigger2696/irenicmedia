'use client'

import { cn } from '@/lib/utils'

interface DifferentiatorCardProps {
  icon: string
  title: string
  description: string
  stat: string
  statLabel: string
}

export function DifferentiatorCard({
  icon,
  title,
  description,
  stat,
  statLabel
}: DifferentiatorCardProps) {
  return (
    <div className="p-6 rounded-marko bg-[var(--body-bg)] border border-[var(--accent-color-3)] transition-all duration-300 hover:shadow-accent hover:-translate-y-1">
      {/* Icon with stat badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          <i className={cn(icon, 'text-3xl text-accent')} />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">{stat}</div>
          <div className="text-xs text-[var(--text-color)]">{statLabel}</div>
        </div>
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
