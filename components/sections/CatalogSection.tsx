'use client'

import React, { useEffect, useState } from 'react'
import { supabase, type Producto } from '@/lib/supabase'

const TIERS = [
  {
    key: 'Genesis' as const,
    label: 'Génesis',
    tier: 'Punto de partida',
    ct: '1 ct de esmeraldas cuidadosamente seleccionadas',
    desc: 'Especial para emprendedores que están iniciando y desean arriesgar bajo capital — esmeraldas de alta calidad para platería.',
    ventajas: [
      'Video asesoría (Todo lo que necesitas saber sobre las esmeraldas)',
    ],
    gem: <GemGenesis />,
  },
  {
    key: 'Dual' as const,
    label: 'Dual',
    tier: 'Equilibrio',
    ct: '1,5 ct seleccionados específicamente para oro y platería',
    desc: 'Para quienes desean comenzar con esmeraldas para joyería en oro, sin arriesgar en platería. Con las esmeraldas para oro obtienes mucha más rentabilidad.',
    ventajas: [
      'Video asesoría (Todo lo que necesitas saber sobre las esmeraldas)',
      'Master Class Pt.1 (Oferta, valor y estrategia)',
    ],
    gem: <GemDual />,
  },
  {
    key: 'Elite' as const,
    label: 'Élite',
    tier: 'Inversión',
    ct: '1,5 ct de esmeraldas de alta calidad para montura en oro',
    desc: 'Pensado para emprendedores que desean trabajar con lotes de alta calidad — piezas con gran cristal, color y trazabilidad.',
    ventajas: [
      'Video asesoría (Todo lo que necesitas saber sobre las esmeraldas)',
      'Master Class Pt.1 (Oferta, valor y estrategia)',
      'Master Class Pt.2 (Marketing)',
      'Asesoría 1 a 1 (Paso a paso para iniciar y escalar tu negocio)',
    ],
    gem: <GemElite />,
  },
]

export default function CatalogSection() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<'todos' | 'Genesis' | 'Dual' | 'Elite'>('todos')

  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .eq('disponible', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProductos(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro)

  return (
    <section
      id="catalogo"
      style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container section-pad">

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: 'var(--emerald)', fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500, fontFamily: 'var(--font-raleway)', justifyContent: 'center' }}>
            <span style={{ width: 36, height: 1, background: 'var(--emerald)', display: 'inline-block', opacity: 0.5 }} />
            Catálogo
            <span style={{ width: 36, height: 1, background: 'var(--emerald)', display: 'inline-block', opacity: 0.5 }} />
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', color: 'var(--ink)', marginBottom: 18 }}>
            Tres lotes. <span style={{ color: 'var(--emerald)' }}>Tres caminos.</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '56ch', margin: '0 auto', fontSize: 16, fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
            Selecciones pensadas según experiencia, presupuesto y propósito. Todas con origen de la mina más importante de Colombia, Muzo.
          </p>
        </div>

        {/* Tier cards (static) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 80 }} className="catalog-grid">
          {TIERS.map((t, i) => (
            <TierCard key={t.key} tier={t} delay={i} onFilter={() => setFiltro(t.key)} />
          ))}
        </div>

        {/* Products section */}
        {(loading || productos.length > 0) && (
          <>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
              <div>
                <span style={{ display: 'block', fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--emerald)', fontFamily: 'var(--font-raleway)', fontWeight: 500, marginBottom: 8 }}>
                  Inventario disponible
                </span>
                <h3 style={{ fontSize: 'clamp(20px, 2vw, 28px)', color: 'var(--ink)', fontFamily: 'var(--font-cinzel)' }}>
                  Piezas actuales
                </h3>
              </div>
              {/* Filter pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['todos', 'Genesis', 'Dual', 'Elite'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFiltro(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 999,
                      border: '1px solid',
                      borderColor: filtro === cat ? 'var(--emerald)' : 'var(--line)',
                      background: filtro === cat ? 'var(--emerald)' : 'transparent',
                      color: filtro === cat ? '#fff' : 'var(--emerald)',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-raleway)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all .25s',
                    }}
                  >
                    {cat === 'todos' ? 'Todos' : cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--emerald)', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
              </div>
            ) : filtrados.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-dim)', fontFamily: 'var(--font-raleway)' }}>
                <p style={{ fontSize: 14 }}>No hay piezas disponibles en esta categoría ahora mismo.</p>
                <p style={{ fontSize: 13, marginTop: 8 }}>Escríbenos para consultar disponibilidad.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }} className="products-grid">
                {filtrados.map((p, i) => (
                  <ProductCard key={p.id} producto={p} delay={i % 3} />
                ))}
              </div>
            )}
          </>
        )}

        {/* No products at all — CTA */}
        {!loading && productos.length === 0 && (
          <div className="reveal" style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)', fontSize: 15, marginBottom: 24 }}>
              Escríbenos por WhatsApp para conocer el inventario disponible.
            </p>
            <a
              href="https://wa.me/573148316745?text=Hola%2C%20me%20gustar%C3%ADa%20ver%20el%20cat%C3%A1logo%20de%20esmeraldas"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                background: 'var(--emerald)',
                color: '#fff',
                fontSize: 12,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity .25s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Ver catálogo por WhatsApp
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .catalog-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .products-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}

function TierCard({ tier, delay, onFilter }: { tier: typeof TIERS[0]; delay: number; onFilter: () => void }) {
  const waText = `Hola, me interesa el Lote ${tier.label}`
  const waUrl = `https://wa.me/573148316745?text=${encodeURIComponent(waText)}`

  return (
    <article
      className={`reveal${delay > 0 ? ` delay-${delay}` : ''} stone-card-hover`}
      style={{
        position: 'relative',
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        transition: 'transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s, border-color .5s',
      }}
    >
      {/* Visual */}
      <div style={{
        aspectRatio: '4/3',
        background: 'radial-gradient(circle at 30% 30%, rgba(22,164,122,0.10), transparent 60%), linear-gradient(180deg, #F4F8F6 0%, #E3F1EB 100%)',
        display: 'grid',
        placeItems: 'center',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{ width: '60%' }}>{tier.gem}</div>
      </div>

      {/* Body */}
      <div style={{ padding: '32px 32px 36px' }}>
        <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 19, color: 'var(--ink)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
          Lote <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>{tier.label}</span>
        </h3>
        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-dim)', marginBottom: 18, fontWeight: 600, fontFamily: 'var(--font-raleway)' }}>
          {tier.tier}
        </p>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.75, marginBottom: 12, fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
          {tier.desc}
        </p>

        {/* Cantidad */}
        <p style={{ fontSize: 13, color: 'var(--emerald)', fontFamily: 'var(--font-raleway)', fontWeight: 600, marginBottom: 20, borderLeft: '2px solid var(--emerald)', paddingLeft: 10 }}>
          {tier.ct}
        </p>

        {/* Ventajas */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tier.ventajas.map((v, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M2 7l3.5 3.5L12 3" stroke="var(--emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {v}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onFilter}
            style={{
              flex: 1,
              padding: '13px 16px',
              border: '1px solid var(--emerald)',
              background: 'transparent',
              color: 'var(--emerald)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-raleway)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .3s',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--emerald)'; el.style.color = '#fff' }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--emerald)' }}
          >
            Ver piezas
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '13px 16px',
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--ink-soft)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-raleway)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .3s',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--emerald)'; el.style.color = 'var(--emerald)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--line)'; el.style.color = 'var(--ink-soft)' }}
          >
            Consultar
          </a>
        </div>
      </div>

      <style>{`
        .stone-card-hover:hover {
          transform: translateY(-8px);
          border-color: var(--emerald) !important;
          box-shadow: 0 30px 60px -20px rgba(14,124,92,0.25), 0 8px 24px rgba(26,36,33,0.06);
        }
      `}</style>
    </article>
  )
}

function ProductCard({ producto, delay }: { producto: Producto; delay: number }) {
  const waText = `Hola, me interesa la piedra: ${producto.nombre}${producto.precio_mostrado ? ` (${producto.precio_mostrado})` : ''}`
  const waUrl = `https://wa.me/573148316745?text=${encodeURIComponent(waText)}`

  const catColor = producto.categoria === 'Elite' ? '#0A4F3B' : producto.categoria === 'Dual' ? '#0E7C5C' : '#16A47A'

  return (
    <article
      className={`reveal${delay > 0 ? ` delay-${delay}` : ''} product-card-hover`}
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        transition: 'transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s, border-color .4s',
      }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '1/1',
        background: 'linear-gradient(135deg, #E3F1EB, #F1F7F4)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M28 6L46 16.5L42 40H14L10 16.5Z" stroke="#0E7C5C" strokeWidth="1.5" fill="rgba(14,124,92,0.08)"/>
            <path d="M28 6L28 40M10 16.5L46 16.5" stroke="#0E7C5C" strokeWidth="1" opacity="0.4"/>
          </svg>
        )}
        <span style={{
          position: 'absolute',
          top: 12,
          left: 12,
          fontSize: 9,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#fff',
          padding: '4px 10px',
          background: catColor,
          fontFamily: 'var(--font-raleway)',
          fontWeight: 600,
        }}>
          {producto.categoria}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '20px 22px 24px' }}>
        <h4 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 14,
          color: 'var(--ink)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 8,
          lineHeight: 1.4,
        }}>
          {producto.nombre}
        </h4>

        {/* Details */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          {producto.quilates && (
            <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)' }}>
              ⚖ {producto.quilates}
            </span>
          )}
          {producto.color && (
            <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)' }}>
              ◆ {producto.color}
            </span>
          )}
        </div>

        {producto.descripcion && (
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 16, fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
            {producto.descripcion}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line)', gap: 12 }}>
          {producto.precio_mostrado ? (
            <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 15, color: 'var(--emerald)', fontWeight: 600 }}>
              {producto.precio_mostrado}
            </span>
          ) : (
            <span style={{ fontSize: 12, color: 'var(--ink-dim)', fontFamily: 'var(--font-raleway)', letterSpacing: '0.12em' }}>
              Consultar precio
            </span>
          )}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 16px',
              background: 'var(--emerald)',
              color: '#fff',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-raleway)',
              fontWeight: 600,
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'opacity .25s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  )
}

function GemGenesis() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 24px rgba(14,124,92,0.25)) drop-shadow(0 0 30px rgba(22,164,122,0.18))' }}>
      <defs>
        <linearGradient id="g1a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3FA688"/><stop offset="0.5" stopColor="#1B4D3E"/><stop offset="1" stopColor="#0C2A22"/>
        </linearGradient>
        <linearGradient id="g1b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FCBB1" stopOpacity="0.9"/><stop offset="1" stopColor="#1B4D3E" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <polygon points="60,30 140,30 170,60 170,100 140,130 60,130 30,100 30,60" fill="url(#g1a)" stroke="#0A4F3B" strokeWidth="0.6"/>
      <polygon points="75,45 125,45 145,65 145,95 125,115 75,115 55,95 55,65" fill="url(#g1b)" opacity="0.7"/>
      <polygon points="85,55 115,55 130,70 130,90 115,105 85,105 70,90 70,70" fill="#0F2E25" opacity="0.5"/>
      <line x1="60" y1="30" x2="75" y2="45" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="140" y1="30" x2="125" y2="45" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="170" y1="60" x2="145" y2="65" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="170" y1="100" x2="145" y2="95" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="140" y1="130" x2="125" y2="115" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="60" y1="130" x2="75" y2="115" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="30" y1="100" x2="55" y2="95" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <line x1="30" y1="60" x2="55" y2="65" stroke="#E2C268" strokeWidth="0.4" opacity="0.7"/>
      <polygon points="78,50 90,50 82,70" fill="white" opacity="0.25"/>
      <polygon points="95,55 102,55 98,68" fill="white" opacity="0.18"/>
    </svg>
  )
}

function GemDual() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 24px rgba(14,124,92,0.25)) drop-shadow(0 0 30px rgba(22,164,122,0.18))' }}>
      <defs>
        <linearGradient id="g2a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#52BFA0"/><stop offset="0.5" stopColor="#1B4D3E"/><stop offset="1" stopColor="#0A1F19"/>
        </linearGradient>
        <radialGradient id="g2b" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#A6E0CA" stopOpacity="0.7"/><stop offset="1" stopColor="#1B4D3E" stopOpacity="0.3"/>
        </radialGradient>
      </defs>
      <polygon points="40,40 90,40 105,55 105,95 90,110 40,110 25,95 25,55" fill="url(#g2a)" stroke="#0A4F3B" strokeWidth="0.6"/>
      <polygon points="50,50 80,50 92,62 92,88 80,100 50,100 38,88 38,62" fill="url(#g2b)" opacity="0.7"/>
      <polygon points="110,30 165,30 178,50 178,108 165,128 110,128 95,108 95,50" fill="url(#g2a)" stroke="#0A4F3B" strokeWidth="0.6" opacity="0.95"/>
      <polygon points="120,42 155,42 167,58 167,100 155,116 120,116 108,100 108,58" fill="url(#g2b)" opacity="0.6"/>
      <polygon points="55,55 65,55 60,68" fill="white" opacity="0.3"/>
      <polygon points="125,48 138,48 130,65" fill="white" opacity="0.28"/>
    </svg>
  )
}

function GemElite() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 24px rgba(14,124,92,0.25)) drop-shadow(0 0 30px rgba(22,164,122,0.18))' }}>
      <defs>
        <linearGradient id="g3a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6EE0BC"/><stop offset="0.4" stopColor="#1B4D3E"/><stop offset="1" stopColor="#04140F"/>
        </linearGradient>
        <radialGradient id="g3b" cx="0.35" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#C7F2DF" stopOpacity="0.85"/><stop offset="1" stopColor="#1B4D3E" stopOpacity="0.2"/>
        </radialGradient>
      </defs>
      <polygon points="55,20 145,20 180,50 180,110 145,140 55,140 20,110 20,50" fill="url(#g3a)" stroke="#0A4F3B" strokeWidth="0.8"/>
      <polygon points="70,35 130,35 155,55 155,105 130,125 70,125 45,105 45,55" fill="url(#g3b)" opacity="0.85"/>
      <polygon points="82,48 118,48 138,65 138,95 118,112 82,112 62,95 62,65" fill="#0F2E25" opacity="0.6"/>
      <polygon points="92,58 108,58 122,72 122,88 108,102 92,102 78,88 78,72" fill="#1B4D3E" opacity="0.8"/>
      <line x1="55" y1="20" x2="70" y2="35" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="145" y1="20" x2="130" y2="35" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="180" y1="50" x2="155" y2="55" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="180" y1="110" x2="155" y2="105" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="145" y1="140" x2="130" y2="125" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="55" y1="140" x2="70" y2="125" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="20" y1="110" x2="45" y2="105" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <line x1="20" y1="50" x2="45" y2="55" stroke="#E2C268" strokeWidth="0.5" opacity="0.8"/>
      <polygon points="75,42 95,42 84,65" fill="white" opacity="0.35"/>
      <polygon points="100,52 110,52 105,68" fill="white" opacity="0.22"/>
      <circle cx="120" cy="50" r="2" fill="white" opacity="0.6"/>
    </svg>
  )
}
