'use client'

const items = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2 L24 8 L21 22 L7 22 L4 8 Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <path d="M14 2 L14 22 M4 8 L24 8" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      </svg>
    ),
    title: 'Origen certificado',
    titleEm: 'Muzo',
    desc: 'Trabajamos directamente con la mina. Cada esmeralda llega con trazabilidad de origen y certificación gemológica.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M5 24 c0 -5 4 -8 9 -8 s9 3 9 8" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      </svg>
    ),
    title: 'Asesoría',
    titleEm: 'personalizada',
    desc: 'Acompañamiento uno a uno: te ayudamos a elegir según presupuesto, intención y propósito de la pieza.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <circle cx="18" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <path d="M2 24c0-4.5 3.5-7.5 8-7.5s8 3 8 7.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <path d="M20 16.5c2.5.5 5 2.5 5 7.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Comunidad',
    titleEm: '',
    desc: 'Llevamos más de 2 años en el sector, con una comunidad activa en TikTok y WhatsApp que aprende, crece y negocia junto a nosotros.',
  },
]

export default function WhyUs() {
  return (
    <section
      id="por-que"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="container section-pad">
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: 'var(--emerald)', fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500, fontFamily: 'var(--font-raleway)', justifyContent: 'center' }}>
            <span style={{ width: 36, height: 1, background: 'var(--emerald)', display: 'inline-block', opacity: 0.5 }} />
            Por qué nosotros
            <span style={{ width: 36, height: 1, background: 'var(--emerald)', display: 'inline-block', opacity: 0.5 }} />
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', color: 'var(--ink)', marginBottom: 18 }}>
            Para confiar en <span style={{ color: 'var(--emerald)' }}>La Piedra Esmeralda.</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }} className="why-grid">
          {items.map((item, i) => (
            <WhyItem key={i} item={item} isLast={i === items.length - 1} delay={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function WhyItem({ item, isLast, delay }: { item: typeof items[0]; isLast: boolean; delay: number }) {
  return (
    <div
      className={`reveal${delay > 0 ? ` delay-${delay}` : ''} why-item-card`}
      style={{
        padding: '48px 40px',
        textAlign: 'center',
        borderRight: isLast ? 'none' : '1px solid var(--line-strong)',
        position: 'relative',
      }}
    >
      <div
        className="why-icon-circle"
        style={{
          width: 64, height: 64,
          margin: '0 auto 28px',
          border: '1px solid var(--line-strong)',
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--emerald)',
          background: 'var(--emerald-tint)',
          transition: 'all .4s ease',
        }}
      >
        {item.icon}
      </div>
      <h3 style={{ fontSize: 18, color: 'var(--ink)', marginBottom: 12, fontFamily: 'var(--font-cinzel)', fontStyle: 'normal' }}>
        {item.title}{item.titleEm && <> <span style={{ color: 'var(--emerald)' }}>{item.titleEm}</span></>}
      </h3>
      <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.7, fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
        {item.desc}
      </p>
      <style>{`
        .why-item-card:hover .why-icon-circle {
          box-shadow: 0 8px 24px rgba(14,124,92,0.18);
          border-color: var(--emerald);
          background: var(--emerald-soft);
        }
        @media (max-width: 960px) {
          .why-item-card {
            border-right: none !important;
            border-bottom: 1px solid var(--line);
            padding: 48px 24px;
          }
        }
      `}</style>
    </div>
  )
}
