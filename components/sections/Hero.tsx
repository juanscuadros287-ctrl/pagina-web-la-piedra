'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0, h = 0, dpr = 1
    const COUNT = 70
    type Particle = { x: number; y: number; r: number; vy: number; vx: number; alpha: number; twinkle: number; twinkleSpd: number }
    let parts: Particle[] = []

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas!.parentElement!.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      parts = []
      for (let i = 0; i < COUNT; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.3,
          vy: -(Math.random() * 0.25 + 0.05),
          vx: (Math.random() - 0.5) * 0.12,
          alpha: Math.random() * 0.6 + 0.15,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpd: Math.random() * 0.04 + 0.01,
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.y += p.vy
        p.x += p.vx
        p.twinkle += p.twinkleSpd
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.twinkle)) * 0.55
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grad.addColorStop(0, `rgba(22,164,122,${alpha})`)
        grad.addColorStop(0.4, `rgba(14,124,92,${alpha * 0.35})`)
        grad.addColorStop(1, 'rgba(14,124,92,0)')
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.fillStyle = `rgba(14,124,92,${alpha * 1.4})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    resize(); init(); draw()
    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })
    els.forEach(el => io.observe(el))
    // Fallback: force-reveal elements already in viewport after short delay
    const timer = setTimeout(() => {
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in')
        }
      })
    }, 200)
    return () => { io.disconnect(); clearTimeout(timer) }
  }, [])

  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 70% 60% at 80% 30%, rgba(22,164,122,0.10), transparent 60%),
          radial-gradient(ellipse 60% 50% at 10% 90%, rgba(14,124,92,0.10), transparent 60%),
          linear-gradient(180deg, #FFFFFF 0%, #F4F7F5 60%, #EDF2EF 100%)
        `,
      }}
    >
      {/* Texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.18  0 0 0 0 0.13  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        opacity: 0.6,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
      }} />

      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Content */}
      <div className="hero-pad" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: 'var(--emerald)', fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: 32, fontWeight: 500, fontFamily: 'var(--font-raleway)' }}>
            <span style={{ width: 36, height: 1, background: 'var(--emerald)', display: 'inline-block', opacity: 0.5 }} />
            Muzo · Boyacá · Colombia
          </span>
        </div>

        <h1 className="reveal delay-1" style={{ fontSize: 'clamp(34px, 5.2vw, 68px)', fontWeight: 500, color: 'var(--ink)', marginBottom: 28, maxWidth: '18ch' }}>
          Esmeraldas de Muzo.{' '}
          <em style={{
            fontStyle: 'italic', fontWeight: 400,
            background: 'linear-gradient(135deg, #16A47A 0%, #0E7C5C 50%, #0A4F3B 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            Directas de la fuente.
          </em>
        </h1>

        <p className="reveal delay-2" style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'var(--ink-soft)', maxWidth: '52ch', marginBottom: 48, fontWeight: 300, lineHeight: 1.7, fontFamily: 'var(--font-raleway)' }}>
          Asesoría personalizada para emprendedores, joyeros y coleccionistas. Cada piedra es seleccionada en origen, certificada y enviada con discreción a todo el mundo.
        </p>

        <div className="reveal delay-3 hero-btns">
          <Link href="/#catalogo">
            <BtnPrimary>Ver catálogo</BtnPrimary>
          </Link>
          <Link href="/#asesorias">
            <BtnGhost>Agendar asesoría</BtnGhost>
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, var(--emerald))', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, left: 0, width: '100%', height: 10, background: 'var(--emerald)', animation: 'scrollDot 2.4s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}

function BtnPrimary({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        padding: '18px 34px',
        fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase',
        fontFamily: 'var(--font-raleway)', fontWeight: 500,
        background: 'linear-gradient(180deg, #16A47A 0%, #0E7C5C 60%, #0A4F3B 100%)',
        color: '#fff',
        border: 'none',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 28px rgba(14,124,92,0.28)',
        cursor: 'pointer',
        transition: 'all .35s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.25), 0 14px 40px rgba(14,124,92,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 28px rgba(14,124,92,0.28)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
    >
      {children}
      <Arrow />
    </button>
  )
}

function BtnGhost({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        padding: '18px 34px',
        fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase',
        fontFamily: 'var(--font-raleway)', fontWeight: 500,
        background: 'transparent',
        color: 'var(--ink)',
        border: '1px solid var(--line-strong)',
        cursor: 'pointer',
        transition: 'all .35s ease',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--emerald)'; el.style.color = 'var(--emerald)'; el.style.background = 'var(--emerald-tint)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--line-strong)'; el.style.color = 'var(--ink)'; el.style.background = 'transparent' }}
    >
      {children}
      <Arrow />
    </button>
  )
}

function Arrow() {
  return (
    <span style={{ width: 14, height: 1, background: 'currentColor', position: 'relative', display: 'inline-block', flexShrink: 0 }}>
      <span style={{ content: '', position: 'absolute', right: 0, top: -3, width: 7, height: 7, borderTop: '1px solid currentColor', borderRight: '1px solid currentColor', transform: 'rotate(45deg)' }} />
    </span>
  )
}
