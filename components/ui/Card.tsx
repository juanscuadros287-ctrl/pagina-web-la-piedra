'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) {
  const base = [
    'oil-drop rounded-sm overflow-hidden',
    onClick || hoverable ? 'cursor-pointer' : '',
    className,
  ].join(' ')

  if (hoverable || onClick) {
    return (
      <motion.div
        className={base}
        onClick={onClick}
        whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(11,110,79,0.2), 0 8px 20px rgba(0,0,0,0.4)' }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}
