'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, type Producto } from '@/lib/supabase'

const META: Record<string, { label: string; tier: string; desc: string }> = {
  genesis: {
    label: 'Génesis',
    tier: 'Punto de partida',
    desc: 'Esmeraldas de alta calidad para platería. Ideal para emprendedores que están iniciando.',
  },
  dual: {
    label: 'Dual',
    tier: 'Equilibrio',
    desc: 'Seleccionadas para oro y platería. Mayor rentabilidad con menor riesgo.',
  },
  elite: {
    label: 'Élite',
    tier: 'Inversión',
    desc: 'Esmeraldas de alta calidad para montura en oro. Gran cristal, color y trazabilidad.',
  },
}

export default function CategoriaPage() {
  const params = useParams()
  const router = useRouter()
  const categoriaSlug = (params.categoria as string)?.toLowerCase()
  const meta = META[categoriaSlug]

  const categoriaDB =
    categoriaSlug === 'genesis' ? 'Genesis' :
    categoriaSlug === 'dual' ? 'Dual' : 'Elite'

  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!meta) return
    supabase
      .from('productos')
      .select('*')
      .eq('disponible', true)
      .eq('categoria', categoriaDB)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProductos(data || [])
        setLoading(false)
      })
  }, [categoriaDB, meta])

  if (!meta) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)' }}>
        <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)' }}>Categoría no encontrada.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--bg-soft)',
        borderBottom: '1px solid var(--line)',
        padding: '32px 0 40px',
      }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <button
            onClick={() => router.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--emerald)',
              fontFamily: 'var(--font-raleway)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: 28,
              padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{
                display: 'block',
                fontSize: 10,
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                color: 'var(--emerald)',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 500,
                marginBottom: 10,
              }}>
                Lote
              </span>
              <h1 style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: 'var(--ink)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                {meta.label}
              </h1>
              <p style={{
                fontSize: 11,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--ink-dim)',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 600,
                marginBottom: 16,
              }}>
                {meta.tier}
              </p>
              <p style={{
                color: 'var(--ink-soft)',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 300,
                fontSize: 15,
                maxWidth: '52ch',
                lineHeight: 1.7,
              }}>
                {meta.desc}
              </p>
            </div>

            <a
              href={`https://wa.me/573148316745?text=${encodeURIComponent(`Hola, me interesa el Lote ${meta.label}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                background: 'var(--emerald)',
                color: '#fff',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 600,
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container" style={{ maxWidth: 1100, paddingTop: 56, paddingBottom: 100 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid var(--emerald)',
              borderTopColor: 'transparent',
              animation: 'spin 0.7s linear infinite',
            }} />
          </div>
        ) : productos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-raleway)', fontSize: 16, marginBottom: 8 }}>
              No hay piezas disponibles en el lote {meta.label} ahora mismo.
            </p>
            <p style={{ color: 'var(--ink-dim)', fontFamily: 'var(--font-raleway)', fontSize: 14, marginBottom: 32 }}>
              Escríbenos para consultar disponibilidad próxima.
            </p>
            <a
              href={`https://wa.me/573148316745?text=${encodeURIComponent(`Hola, ¿cuándo habrá disponibilidad del Lote ${meta.label}?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                background: 'var(--emerald)',
                color: '#fff',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Consultar disponibilidad
            </a>
          </div>
        ) : (
          <>
            <p style={{
              color: 'var(--ink-dim)',
              fontFamily: 'var(--font-raleway)',
              fontSize: 13,
              marginBottom: 36,
              letterSpacing: '0.06em',
            }}>
              {productos.length} {productos.length === 1 ? 'pieza disponible' : 'piezas disponibles'}
            </p>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}
              className="cat-products-grid"
            >
              {productos.map((p) => <ProductCard key={p.id} producto={p} categoriaLabel={meta.label} />)}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .cat-products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function ProductCard({ producto, categoriaLabel }: { producto: Producto; categoriaLabel: string }) {
  const waText = `Hola, me interesa la piedra: ${producto.nombre}${producto.precio_mostrado ? ` (${producto.precio_mostrado})` : ''} del Lote ${categoriaLabel}`
  const waUrl = `https://wa.me/573148316745?text=${encodeURIComponent(waText)}`
  const catColor = producto.categoria === 'Elite' ? '#0A4F3B' : producto.categoria === 'Dual' ? '#0E7C5C' : '#16A47A'

  return (
    <article
      className="cat-card-hover"
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        transition: 'transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s, border-color .4s',
      }}
    >
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
          // eslint-disable-next-line @next/next/no-img-element
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
          position: 'absolute', top: 12, left: 12,
          fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#fff', padding: '4px 10px', background: catColor,
          fontFamily: 'var(--font-raleway)', fontWeight: 600,
        }}>
          {producto.categoria}
        </span>
      </div>

      <div style={{ padding: '20px 22px 24px' }}>
        <h4 style={{
          fontFamily: 'var(--font-cinzel)', fontSize: 14, color: 'var(--ink)',
          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, lineHeight: 1.4,
        }}>
          {producto.nombre}
        </h4>

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
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 16px', background: 'var(--emerald)', color: '#fff',
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'var(--font-raleway)', fontWeight: 600,
              textDecoration: 'none', flexShrink: 0, transition: 'opacity .25s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Consultar
          </a>
        </div>
      </div>

      <style>{`
        .cat-card-hover:hover {
          transform: translateY(-6px);
          border-color: var(--emerald) !important;
          box-shadow: 0 24px 48px -16px rgba(14,124,92,0.2), 0 6px 20px rgba(26,36,33,0.06);
        }
      `}</style>
    </article>
  )
}
