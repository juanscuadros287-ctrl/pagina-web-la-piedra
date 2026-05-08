'use client'

import { useState } from 'react'
import config from '@/data/config.json'

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false)
  const waUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hola, quiero más información')}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 28, right: 28,
        zIndex: 90,
        width: 60, height: 60,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366 0%, #1EBE5D 100%)',
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform .3s',
        animation: 'waPulse 2.4s ease-out infinite',
        textDecoration: 'none',
      }}
    >
      <span style={{
        position: 'absolute',
        right: 72, top: '50%',
        transform: hovered ? 'translateY(-50%) translateX(-4px)' : 'translateY(-50%)',
        background: 'var(--ink)',
        color: '#fff',
        padding: '10px 16px',
        fontSize: 12,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        opacity: hovered ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity .3s, transform .3s',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        fontFamily: 'var(--font-raleway)',
        fontWeight: 400,
      }}>
        Escríbenos por WhatsApp
      </span>

      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15 2C7.82 2 2 7.82 2 15c0 2.28.6 4.42 1.64 6.27L2 28l6.92-1.62A12.93 12.93 0 0015 28c7.18 0 13-5.82 13-13S22.18 2 15 2zm-3.44 7.5c-.23-.52-.47-.53-.69-.54l-.59-.01c-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.52 0 1.48 1.08 2.91 1.23 3.11.15.2 2.1 3.36 5.2 4.57 2.57 1.01 3.1.81 3.66.76.56-.05 1.8-.74 2.05-1.45.25-.71.25-1.32.18-1.45-.08-.13-.28-.2-.58-.35-.3-.15-1.8-.89-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.77.99-.95 1.19-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.65-.92-2.24z" fill="white"/>
      </svg>
    </a>
  )
}
