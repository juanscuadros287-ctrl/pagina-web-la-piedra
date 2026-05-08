// ─────────────────────────────────────────────
// LOGO — La Piedra
// Para cambiar a SVG: reemplaza el contenido de este componente
// con <Image src="/images/brand/logo.svg" alt="La Piedra" ... />
// ─────────────────────────────────────────────
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  linkToHome?: boolean
}

const sizes = {
  sm: { title: 'text-base', sub: 'text-[9px]', gap: 'gap-0' },
  md: { title: 'text-xl', sub: 'text-[10px]', gap: 'gap-0' },
  lg: { title: 'text-2xl', sub: 'text-xs', gap: 'gap-0.5' },
}

function LogoContent({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = sizes[size]
  return (
    <div className={`flex flex-col ${s.gap} leading-none`}>
      <span
        className={`font-playfair font-bold tracking-widest text-muzo-marfil ${s.title}`}
        style={{ letterSpacing: '0.15em' }}
      >
        LA PIEDRA
      </span>
      <span
        className={`font-inter font-light tracking-[0.3em] uppercase text-muzo-dorado ${s.sub}`}
      >
        Esmeraldas · Muzo
      </span>
    </div>
  )
}

export default function Logo({ size = 'md', className = '', linkToHome = true }: LogoProps) {
  if (linkToHome) {
    return (
      <Link href="/" className={`inline-block hover:opacity-80 transition-opacity duration-200 ${className}`}>
        <LogoContent size={size} />
      </Link>
    )
  }
  return (
    <div className={`inline-block ${className}`}>
      <LogoContent size={size} />
    </div>
  )
}
