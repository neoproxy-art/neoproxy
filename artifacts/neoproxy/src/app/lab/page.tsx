'use client'
import Link from 'next/link'

const EXPERIMENTS = [
  {
    id: 'dj',
    title: 'GEOSYNC',
    subtitle: 'Geometric sequencer · Tone.js',
    desc: 'Formas 3D que generan ritmos al atravesar anillos concéntricos. Secuenciador geométrico con síntesis de audio.',
    href: '/dj',
    color: '#b400ff',
    status: 'LIVE',
    tags: ['audio', 'babylon', 'tone.js'],
  },
  {
    id: 'attractors',
    title: 'ATTRACTORS',
    subtitle: 'Caos determinista · Babylon.js',
    desc: 'Atractores caóticos — Lorenz, Rössler, Thomas — visualizados en tiempo real con partículas 3D.',
    href: '/npos/lab',
    color: '#00d4ff',
    status: 'LIVE',
    tags: ['generative', 'babylon', 'chaos'],
  },
  {
    id: 'wip1',
    title: 'NEURAL FIELD',
    subtitle: 'Próximamente',
    desc: 'Campo neural reactivo al audio del micrófono. Geometría que responde a la voz.',
    href: '#',
    color: '#333',
    status: 'WIP',
    tags: ['audio', 'reactive'],
  },
  {
    id: 'wip2',
    title: 'FLUID SIM',
    subtitle: 'Próximamente',
    desc: 'Simulación de fluidos en GPU con shaders GLSL. Interacción con cursor.',
    href: '#',
    color: '#333',
    status: 'WIP',
    tags: ['shader', 'fluid'],
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
            Experimentos con Babylon.js, audio generativo y geometría computacional.
            Cada experimento es un canvas independiente.
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
                border: `1px solid ${exp.status === 'LIVE' ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
                padding: '24px',
                transition: 'all 0.2s',
                cursor: exp.status === 'WIP' ? 'default' : 'pointer',
              }}
              onClick={e => exp.status === 'WIP' && e.preventDefault()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: exp.color, marginTop: 4 }} />
                <span style={{
                  fontSize: 8, letterSpacing: '0.15em',
                  color: exp.status === 'LIVE' ? '#00ff9d' : '#444',
                  border: `1px solid ${exp.status === 'LIVE' ? 'rgba(0,255,157,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  padding: '2px 8px',
                }}>
                  {exp.status}
                </span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: exp.status === 'LIVE' ? '#fff' : '#333', letterSpacing: '0.1em', marginBottom: 4 }}>
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
            ADDING NEW EXPERIMENTS CONTINUOUSLY · WIRED · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  )
}
