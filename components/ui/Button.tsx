'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
  target?: '_blank' | '_self'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
}

const variants = {
  primary: [
    'bg-muzo-verde text-white border border-muzo-verde',
    'hover:bg-muzo-verde-oscuro hover:border-muzo-verde-oscuro',
    'focus-visible:ring-2 focus-visible:ring-muzo-verde focus-visible:ring-offset-2 focus-visible:ring-offset-muzo-negro',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  secondary: [
    'bg-transparent text-muzo-dorado border border-muzo-dorado',
    'hover:bg-muzo-dorado/10',
    'focus-visible:ring-2 focus-visible:ring-muzo-dorado focus-visible:ring-offset-2 focus-visible:ring-offset-muzo-negro',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  ghost: [
    'bg-transparent text-muzo-marfil border border-transparent',
    'hover:text-muzo-dorado hover:border-muzo-dorado/30',
    'focus-visible:ring-2 focus-visible:ring-muzo-marfil/50 focus-visible:ring-offset-2 focus-visible:ring-offset-muzo-negro',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
}

const sizes = {
  sm:  'px-4 py-2 text-sm font-medium tracking-wide',
  md:  'px-6 py-3 text-sm font-medium tracking-wide',
  lg:  'px-8 py-4 text-base font-medium tracking-wider',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  children,
  className = '',
  target,
  type = 'button',
  loading = false,
}: ButtonProps) {
  const base = [
    'inline-flex items-center justify-center gap-2 rounded-sm',
    'transition-colors duration-250',
    'font-inter',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  const motionProps = {
    whileHover: disabled ? {} : { y: -2 },
    whileTap: disabled ? {} : { y: 0, scale: 0.98 },
    transition: { duration: 0.15 },
  }

  const inner = loading ? (
    <>
      <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span>Enviando...</span>
    </>
  ) : children

  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target={target ?? '_blank'}
          rel="noopener noreferrer"
          className={base}
          {...motionProps}
        >
          {inner}
        </motion.a>
      )
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={base}>
          {inner}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={base}
      {...motionProps}
    >
      {inner}
    </motion.button>
  )
}
