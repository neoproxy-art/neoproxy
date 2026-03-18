import Link from 'next/link'

export const metadata = {
  title: 'NeoProxy · Espada Proxy',
  description: 'Interface física para acceso a la red NeoProxy. Ninjatō modular con electrónica integrada.',
}

export default function EspadaPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#00000a',
      padding: '80px 40px 40px',
      fontFamily: '"Space Mono", monospace',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 9, color: 'rgba(0,212,255,0.4)', letterSpacing: '0.2em', marginBottom: 8 }}>
            // NEOPROXY · OBJECT 001
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', margin: '0 0 16px' }}>
            ESPADA<span style={{ color: '#00d4ff' }}>PROXY</span>
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: 560 }}>
            Un objeto físico que es también una llave digital.
            Ninjatō modular impreso en resina UV con electrónica integrada.
            Cada espada es una interfaz de acceso a la red NeoProxy.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          marginBottom: 48,
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.1)',
        }}>
          {[
            { label: 'MATERIAL', value: 'Resina UV + PLA' },
            { label: 'LONGITUD', value: '103 cm' },
            { label: 'PESO', value: '1.1 kg' },
            { label: 'ELECTRÓNICA', value: 'Arduino + LEDs WS2812B' },
            { label: 'CONECTIVIDAD', value: 'Bluetooth 5.0' },
            { label: 'ESTADO', value: 'V1 COMPLETA' },
          ].map(spec => (
            <div key={spec.label} style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(0,212,255,0.05)',
            }}>
              <div style={{ fontSize: 8, color: 'rgba(0,212,255,0.4)', letterSpacing: '0.15em', marginBottom: 4 }}>
                {spec.label}
              </div>
              <div style={{ fontSize: 13, color: '#fff', letterSpacing: '0.05em' }}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 9, color: 'rgba(0,212,255,0.4)', letterSpacing: '0.2em', marginBottom: 20 }}>
            // SISTEMA MODULAR
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { part: 'HOJA', desc: 'PLA translúcido con circuitos grabados. Canal interno para LEDs.', status: 'v1' },
              { part: 'MANGO (TSUKA)', desc: 'PETG con insertos metálicos. Aloja Arduino y batería Li-ion.', status: 'v1' },
              { part: 'GUARDIA (TSUBA)', desc: 'Resina UV con proyector holográfico integrado.', status: 'v1' },
              { part: 'VAINA (SAYA)', desc: 'ABS con tiras LED de estado. Indica nivel de conexión a la red.', status: 'v1' },
            ].map(p => (
              <div key={p.part} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ minWidth: 100, fontSize: 10, color: '#00d4ff', letterSpacing: '0.1em', fontWeight: 700 }}>
                  {p.part}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, flex: 1 }}>
                  {p.desc}
                </div>
                <div style={{ fontSize: 8, color: 'rgba(0,255,157,0.5)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                  {p.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/shop" style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'transparent',
            border: '1px solid rgba(0,212,255,0.4)',
            color: '#00d4ff',
            textDecoration: 'none',
            fontSize: 10,
            letterSpacing: '0.1em',
          }}>
            VER EN SHOP →
          </Link>
          <Link href="/fabrication" style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.3)',
            textDecoration: 'none',
            fontSize: 10,
            letterSpacing: '0.1em',
          }}>
            VER FABRICATION →
          </Link>
        </div>

      </div>
    </div>
  )
}
