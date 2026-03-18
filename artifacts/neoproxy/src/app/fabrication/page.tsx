export const metadata = {
  title: 'NeoProxy · Fabrication',
  description: 'Objetos físicos del laboratorio NeoProxy.',
}

export default function FabricationPage() {
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
            // NEOPROXY · PHYSICAL LAB
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', margin: 0 }}>
            FABRI<span style={{ color: '#00d4ff' }}>CATION</span>
          </h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 12, letterSpacing: '0.05em', lineHeight: 1.8 }}>
            Objetos físicos impresos en el laboratorio. Resina UV, PLA, PETG.
            La materia como extensión del código.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {[
            { title: 'ESPADA PROXY', material: 'Resina UV', status: 'V1 COMPLETA', color: '#00d4ff', desc: 'Ninjatō modular con electrónica integrada. Acceso físico a la red NeoProxy.' },
            { title: 'KERNEL CHIP', material: 'PLA + cobre', status: 'EN PROCESO', color: '#ff9500', desc: 'Módulo físico del kernel. Circuitos expuestos, diseño cyberpunk.' },
            { title: 'MASK 01', material: 'Resina UV', status: 'PROTOTIPO', color: '#b400ff', desc: 'Máscara facial con LEDs integrados. Serie limitada.' },
            { title: 'NODE TOTEM', material: 'PETG', status: 'DISEÑO', color: '#333', desc: 'Tótem de nodo de red. Próximo objeto de la serie.' },
          ].map(item => (
            <div key={item.title} style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${item.color === '#333' ? 'rgba(255,255,255,0.05)' : 'rgba(0,212,255,0.1)'}`,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                <span style={{ fontSize: 8, color: item.color, letterSpacing: '0.15em' }}>{item.status}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color === '#333' ? '#333' : '#fff', letterSpacing: '0.1em', marginBottom: 8 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 9, color: 'rgba(0,212,255,0.5)', letterSpacing: '0.08em', marginBottom: 12 }}>
                {item.material}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
