'use client'

import { useState, FormEvent } from 'react'

export default function Asesoria() {
  return (
    <section
      id="asesorias"
      style={{
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(14,124,92,0.06), transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(14,124,92,0.05), transparent 50%),
          linear-gradient(180deg, #F1F7F4 0%, #E8F0EC 100%)
        `,
      }}
    >
      <div className="container section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="asesorias-grid">

          {/* Texto */}
          <div className="reveal">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: 'var(--emerald)', fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500, fontFamily: 'var(--font-raleway)' }}>
              <span style={{ width: 36, height: 1, background: 'var(--emerald)', display: 'inline-block', opacity: 0.5 }} />
              Asesorías personalizadas
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: 24, color: 'var(--ink)' }}>
              Una conversación <span style={{ color: 'var(--emerald)' }}>cambia todo.</span>
            </h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: 32, lineHeight: 1.8, fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
              Antes de comprar, conversamos. Entendemos para qué necesitas la piedra, qué estás buscando y cómo invertir mejor tu presupuesto. Treinta minutos por WhatsApp o videollamada, sin compromiso.
            </p>
            <ul style={{ listStyle: 'none', borderTop: '1px solid var(--line)', padding: 0, margin: 0 }}>
              {[
                'Diagnóstico de necesidad y presupuesto',
                'Recomendación de quilates, color y claridad',
                'Proyección de margen para reventa',
                'Acompañamiento durante todo el proceso',
              ].map(item => (
                <li key={item} style={{ padding: '18px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 18, fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
                  <span style={{ width: 6, height: 6, transform: 'rotate(45deg)', background: 'var(--emerald)', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Formulario */}
          <div className="reveal delay-1">
            <AsesoriaForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .asesorias-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  )
}

function AsesoriaForm() {
  const [nombre, setNombre] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [interes, setInteres] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const map: Record<string, string> = { reventa: 'Reventa', joyeria: 'Joyería', coleccion: 'Colección personal' }
    const text = `Hola, soy ${nombre}. Quiero agendar una asesoría. Interés: ${map[interes] || interes}. WhatsApp: ${whatsapp}`
    const url = `https://wa.me/573148316745?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="form-card">
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'linear-gradient(180deg, var(--emerald-bright), var(--emerald-deep))', pointerEvents: 'none' }} />

      <h3 style={{ fontSize: 22, marginBottom: 8, color: 'var(--ink)', fontFamily: 'var(--font-cinzel)' }}>Agenda tu asesoría</h3>
      <p style={{ color: 'var(--ink-dim)', fontSize: 13, marginBottom: 32, fontFamily: 'var(--font-raleway)', fontWeight: 300 }}>
        Completa tus datos y te contactamos por WhatsApp en menos de 2 horas.
      </p>

      <form onSubmit={handleSubmit}>
        <Field label="Nombre completo">
          <input
            type="text"
            placeholder="Tu nombre"
            required
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.target.style.borderBottomColor = 'var(--emerald)')}
            onBlur={e => (e.target.style.borderBottomColor = 'var(--line-strong)')}
          />
        </Field>

        <Field label="WhatsApp">
          <input
            type="tel"
            placeholder="+57 300 000 0000"
            required
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.target.style.borderBottomColor = 'var(--emerald)')}
            onBlur={e => (e.target.style.borderBottomColor = 'var(--line-strong)')}
          />
        </Field>

        <Field label="Interés principal">
          <select
            required
            value={interes}
            onChange={e => setInteres(e.target.value)}
            style={{
              ...inputStyle,
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%230E7C5C' stroke-width='1.4' fill='none'/></svg>")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 4px center',
              cursor: 'pointer',
            }}
            onFocus={e => (e.target.style.borderBottomColor = 'var(--emerald)')}
            onBlur={e => (e.target.style.borderBottomColor = 'var(--line-strong)')}
          >
            <option value="" disabled>Selecciona una opción</option>
            <option value="reventa">Reventa</option>
            <option value="joyeria">Joyería</option>
            <option value="coleccion">Colección personal</option>
          </select>
        </Field>

        <button
          type="submit"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            padding: '18px 34px',
            marginTop: 12,
            fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase',
            fontFamily: 'var(--font-raleway)', fontWeight: 500,
            background: 'linear-gradient(180deg, #16A47A 0%, #0E7C5C 60%, #0A4F3B 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 28px rgba(14,124,92,0.28)',
            cursor: 'pointer',
            transition: 'all .35s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
        >
          Agendar por WhatsApp
          <span style={{ width: 14, height: 1, background: 'currentColor', position: 'relative', display: 'inline-block', flexShrink: 0 }}>
            <span style={{ position: 'absolute', right: 0, top: -3, width: 7, height: 7, borderTop: '1px solid currentColor', borderRight: '1px solid currentColor', transform: 'rotate(45deg)' }} />
          </span>
        </button>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 10, fontWeight: 600, fontFamily: 'var(--font-raleway)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line-strong)',
  padding: '10px 0 14px',
  color: 'var(--ink)',
  fontFamily: 'var(--font-raleway)',
  fontSize: 15,
  outline: 'none',
  transition: 'border-color .3s',
  fontWeight: 300,
}
