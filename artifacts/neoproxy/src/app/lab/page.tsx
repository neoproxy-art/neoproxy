'use client'
import Link from 'next/link'

const EXPERIMENTS = [
  {
    id: 'attractors',
    title: 'ATTRACTORS',
    subtitle: 'Caos determinista · Babylon.js',
    desc: 'Atractores caóticos — Lorenz, Rössler, Thomas — visualizados en tiempo real con partículas 3D interactivas.',
    href: '/npos/lab',
    color: '#00d4ff',
    status: 'LIVE',
    tags: ['generative', 'babylon', 'chaos'],
  },
  {
    id: 'dj',
    title: 'DJ MODULE',
    subtitle: 'Secuenciador geométrico · Tone.js',
    desc: 'Formas 3D que generan ritmos al atravesar anillos concéntricos. Síntesis de audio en tiempo real.',
    href: '/dj',
    color: '#b400ff',
    status: 'LIVE',
    tags: ['audio', 'babylon', 'tone.js'],
  },
]

export default function LabPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#00000a',
      padding: '80px 40px 40px',
      fontFamily: '"Space Mono", monospace',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 9, color: 'rgba(0,212,255,0.4)', letterSpacing: '0.2em', marginBottom: 8 }}>
            // NEOPROXY · EXPERIMENTAL LAB
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', margin: 0 }}>
            LAB<span style={{ color: '#00d4ff' }}>ORATORY</span>
          </h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 12, letterSpacing: '0.05em', lineHeight: 1.8 }}>
            Experimentos activos con Babylon.js y audio generativo.
            Cada canvas es un sistema independiente.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 16,
        }}>
          {EXPERIMENTS.map(exp => (
            <Link
              key={exp.id}
              href={exp.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid rgba(0,212,255,0.15)`,
                padding: '24px',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: exp.color, marginTop: 4 }} />
                <span style={{
                  fontSize: 8, letterSpacing: '0.15em',
                  color: '#00ff9d',
                  border: '1px solid rgba(0,255,157,0.3)',
                  padding: '2px 8px',
                }}>
                  LIVE
                </span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', marginBottom: 4 }}>
                {exp.title}
              </div>
              <div style={{ fontSize: 9, color: exp.color, letterSpacing: '0.08em', marginBottom: 12 }}>
                {exp.subtitle}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                {exp.desc}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 8, color: 'rgba(0,212,255,0.4)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    padding: '2px 8px', letterSpacing: '0.05em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
            WIRED · {new Date().getFullYear()} · EXPERIMENTOS EN CURSO
          </div>
        </div>
      </div>
    </div>
  )
}
