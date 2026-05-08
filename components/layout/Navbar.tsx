'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#asesorias', label: 'Asesorías' },
  { href: '/#catalogo', label: 'Catálogo' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? '14px 0' : '22px 0',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(247,247,245,0.6)',
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        borderBottom: scrolled ? '1px solid rgba(26,36,33,0.10)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 24px rgba(14,124,92,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>

        {/* Logo */}
        <Link href="/#inicio" style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <span style={{ width: 36, height: 36, display: 'grid', placeItems: 'center' }}>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
              <defs>
                <linearGradient id="lg-nav" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#16A47A"/>
                  <stop offset="1" stopColor="#0A4F3B"/>
                </linearGradient>
              </defs>
              <path d="M18 4 L30 12 L26 28 L10 28 L6 12 Z" stroke="url(#lg-nav)" strokeWidth="1.4" fill="rgba(22,164,122,0.12)"/>
              <path d="M18 4 L18 28 M6 12 L30 12 M10 28 L26 28 L18 4" stroke="url(#lg-nav)" strokeWidth="0.8" opacity="0.6"/>
            </svg>
          </span>
          <span style={{ fontFamily: 'var(--font-cinzel), Georgia, serif', fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 500 }}>
            La Piedra <span style={{ color: 'var(--emerald)', letterSpacing: '0.18em', fontWeight: 600 }}>Esmeralda</span>
          </span>
        </Link>

        {/* Links desktop */}
        <ul style={{ display: 'flex', gap: 38, listStyle: 'none', margin: 0, padding: 0 }} className="nav-links-desktop">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Burger mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="nav-burger-btn"
          style={{
            display: 'none',
            placeItems: 'center',
            width: 40, height: 40,
            border: '1px solid var(--line-strong)',
            cursor: 'pointer',
            background: 'transparent',
            color: 'var(--ink)',
          }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid var(--line)', padding: '16px 32px 24px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', padding: '10px 0', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)', fontWeight: 500 }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .nav-burger-btn { display: grid !important; }
        }
      `}</style>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 12,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        position: 'relative',
        padding: '6px 0',
        transition: 'color .3s',
        fontFamily: 'var(--font-raleway), system-ui, sans-serif',
        fontWeight: 400,
        display: 'inline-block',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--emerald)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
    >
      {children}
    </Link>
  )
}
