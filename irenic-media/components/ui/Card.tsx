'use client'

import { createContext, useContext, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface CardContextValue {
  variant: 'default' | 'elevated' | 'outlined'
}

const CardContext = createContext<CardContextValue>({ variant: 'default' })

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'elevated' | 'outlined'
  children: ReactNode
}

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-xl shadow-gray-200/50',
  outlined: 'bg-white border border-gray-200',
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={`
          rounded-2xl overflow-hidden
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    </CardContext.Provider>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  )
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
}

interface CardIconProps {
  children: ReactNode
  className?: string
}

export function CardIcon({ children, className = '' }: CardIconProps) {
  return (
    <div className={`
      w-14 h-14 rounded-xl
      bg-black
      flex items-center justify-center
      text-white
      ${className}
    `}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
Card.Icon = CardIcon

export default Card
