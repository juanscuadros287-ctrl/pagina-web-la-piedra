'use client'

import Link from 'next/link'
import config from '@/data/config.json'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contacto"
      style={{
        background: 'linear-gradient(180deg, #062E22 0%, #041D16 100%)',
        color: '#D8E5DF',
        padding: '80px 0 32px',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 60, marginBottom: 60 }} className="footer-grid">

          {/* Marca */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <span style={{ width: 36, height: 36, display: 'grid', placeItems: 'center' }}>
                <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
                  <path d="M18 4 L30 12 L26 28 L10 28 L6 12 Z" stroke="#6BD4AE" strokeWidth="1.4" fill="rgba(107,212,174,0.15)"/>
                  <path d="M18 4 L18 28 M6 12 L30 12 M10 28 L26 28 L18 4" stroke="#6BD4AE" strokeWidth="0.8" opacity="0.6"/>
                </svg>
              </span>
              <span style={{ fontFamily: 'var(--font-cinzel), Georgia, serif', fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F4F8F6', fontWeight: 500 }}>
                La Piedra <span style={{ color: '#6BD4AE', fontWeight: 600 }}>Esmeralda</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(216,229,223,0.7)', fontSize: 13, lineHeight: 1.8, marginTop: 24, maxWidth: '38ch', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
              Esmeraldas auténticas de las minas de Muzo, Boyacá. Asesoría personalizada para emprendedores, joyeros y coleccionistas en Colombia y el mundo.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6BD4AE', marginBottom: 24, fontFamily: 'var(--font-raleway)', fontWeight: 600 }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { href: '/#inicio', label: 'Inicio' },
                { href: '/#por-que', label: 'Por qué nosotros' },
                { href: '/#asesorias', label: 'Asesorías' },
                { href: '/#catalogo', label: 'Catálogo' },
              ].map(({ href, label }) => (
                <li key={href} style={{ padding: '6px 0' }}>
                  <Link
                    href={href}
                    style={{ fontSize: 13, color: 'rgba(216,229,223,0.7)', transition: 'color .3s', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(216,229,223,0.7)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes y contacto */}
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6BD4AE', marginBottom: 24, fontFamily: 'var(--font-raleway)', fontWeight: 600 }}>
              Síguenos
            </h4>
            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <SocialLink href={config.social.instagram} label="Instagram">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="11.5" cy="4.5" r="0.7" fill="currentColor"/>
                </svg>
              </SocialLink>
              <SocialLink href={config.social.tiktok} label="TikTok">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 1v8.5a3 3 0 11-3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M10 1c0 2.5 2 4 4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                </svg>
              </SocialLink>
              <SocialLink href={config.social.facebook} label="Facebook">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M9 15V9h2l.5-3H9V4.5c0-.8.4-1.5 1.5-1.5H12V.2C11.6.1 10.7 0 9.7 0 7.5 0 6 1.4 6 4v2H4v3h2v6h3z" fill="currentColor"/>
                </svg>
              </SocialLink>
              <SocialLink href={`https://wa.me/${config.whatsapp}`} label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8c0 1.2.3 2.3.9 3.3L1.5 14.5l3.3-.9c1 .5 2 .8 3.2.8 3.6 0 6.5-2.9 6.5-6.5S11.6 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M5.5 5.8c0-.2.1-.3.3-.3h.7c.2 0 .3.1.4.3l.4 1c.1.2 0 .4-.1.5l-.4.4c.4.7 1 1.3 1.7 1.7l.4-.4c.1-.1.3-.2.5-.1l1 .4c.2.1.3.2.3.4v.7c0 .2-.1.3-.3.3-2.7 0-4.9-2.2-4.9-4.9z" fill="currentColor"/>
                </svg>
              </SocialLink>
            </div>

            <h4 style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6BD4AE', marginBottom: 16, fontFamily: 'var(--font-raleway)', fontWeight: 600 }}>
              Contacto directo
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '6px 0', fontSize: 13, color: 'rgba(216,229,223,0.7)', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
                WhatsApp: +57 314 831 6745
              </li>
              <li style={{ padding: '6px 0', fontSize: 13, color: 'rgba(216,229,223,0.7)', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
                {config.email}
              </li>
              <li style={{ padding: '6px 0', fontSize: 13, color: 'rgba(216,229,223,0.7)', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
                Cali · Valle del Cauca, Colombia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(216,229,223,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(216,229,223,0.55)', flexWrap: 'wrap', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
          <span>© {year} La Piedra Esmeralda — Esmeraldas de Muzo, Colombia</span>
          <span>Trazabilidad · Certificación · Envíos seguros</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 40, height: 40,
        border: '1px solid rgba(216,229,223,0.2)',
        display: 'grid',
        placeItems: 'center',
        color: 'rgba(216,229,223,0.7)',
        transition: 'all .3s',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#062E22'; el.style.background = '#6BD4AE'; el.style.borderColor = '#6BD4AE'; el.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(216,229,223,0.7)'; el.style.background = 'transparent'; el.style.borderColor = 'rgba(216,229,223,0.2)'; el.style.transform = 'translateY(0)' }}
    >
      {children}
    </a>
  )
}
