import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200',
        variant === 'default' && 'bg-[var(--accent-color-3)] text-[var(--text-color)]',
        variant === 'accent' && 'bg-[var(--accent-color)] bg-opacity-10 text-accent',
        className
      )}
    >
      {children}
    </span>
  )
}
