"use client";

import Link from 'next/link'

const modules = [
  {
    href: '/npos/lab',
    icon: '⚗️',
    name: 'Generative Lab',
    desc: 'Laboratorio de geometría. Exploración procedural: algoritmos, formas caóticas, esculturas matemáticas.',
  },
  {
    href: '/npos/fabrication',
    icon: '🔧',
    name: 'Fabrication Lab',
    desc: 'La conexión con el taller físico. Arte digital que se convierte en objeto real mediante resina, luz y electrónica.',
  },
  {
    href: '/npos/memory',
    icon: '🧬',
    name: 'Memory Lab',
    desc: 'Archivo vivo de conversaciones con IA, procesos creativos, errores y descubrimientos. El diario del sistema.',
  },
]

export default function NPosPortal() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 1 }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>

        {/* Tag */}
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#00d4ff', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#4a6080' }}>//</span> NeoProxy OS — v0.2 — Surface Portal
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
          <span style={{ color: '#00d4ff' }}>Neo</span><span style={{ color: 'white' }}>Proxy</span>
          <span style={{ display: 'block', fontSize: '0.32em', color: '#4a6080', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 400, marginTop: '0.8rem' }}>
            Creative Operating System
          </span>
        </h1>

        {/* Flow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem' }}>
          {['Idea', 'IA', 'Geometría', 'Objeto', 'Experiencia'].map((n, i, arr) => (
            <span key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ padding: '0.4rem 0.9rem', border: '1px solid #0f1f35', background: '#080d14', color: '#00d4ff', letterSpacing: '0.1em' }}>{n}</span>
              {i < arr.length - 1 && <span style={{ color: '#4a6080' }}>→</span>}
            </span>
          ))}
        </div>

        {/* Modules Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: '#0f1f35', border: '1px solid #0f1f35' }}>
          {modules.map((m) => (
            <Link key={m.href} href={m.href} style={{ background: '#080d14', padding: '2rem', textDecoration: 'none', display: 'block', transition: 'background 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0d1825')}
              onMouseLeave={e => (e.currentTarget.style.background = '#080d14')}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>{m.icon}</span>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{m.name}</div>
              <p style={{ fontSize: '0.85rem', color: '#4a6080' }}>{m.desc}</p>
            </Link>
          ))}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: 'white', textDecoration: 'none' }}>
            <span style={{ color: '#00d4ff' }}>Neo</span>Proxy <span style={{ fontFamily: "'Space Mono', monospace", color: '#4a6080', fontSize: '0.65rem', fontWeight: 400 }}>← main site</span>
          </Link>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#4a6080', letterSpacing: '0.15em' }}>
            NPos KERNEL: <span style={{ color: '#5ef0c0' }}>IDLE</span>
          </div>
        </div>

      </div>
    </div>
  )
}
