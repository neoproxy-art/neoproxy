import { Metadata } from 'next'
import styles from './concept.module.css'

export const metadata: Metadata = {
  title: 'NeoProxy OS // Concept · Identity · System',
  description: 'Sistema Operativo Creativo. Un ecosistema vivo que convierte pensamiento en geometría, geometría en materia, y materia en experiencia.',
}

export default function ConceptPage() {
  return (
    <div className="concept-page" data-theme="concept">
      {/* Background Effects */}
      <div className={styles.matrixRain} />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.neo}>NEO</span><span className={styles.proxy}>PROXY</span>
          </h1>
          <div className={styles.subtitle}>CREATIVE OPERATING SYSTEM</div>
          <div className={styles.version}>v0.2 // ENTANGLED_TESSERACT_ACTIVE</div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.conceptNav}>
        <a href="#philosophy" className={styles.navLink}>[PHILOSOPHY]</a>
        <a href="#architecture" className={styles.navLink}>[ARCHITECTURE]</a>
        <a href="#identity" className={styles.navLink}>[IDENTITY]</a>
        <a href="#ecosystem" className={styles.navLink}>[ECOSYSTEM]</a>
        <a href="#manifesto" className={styles.navLink}>[MANIFESTO]</a>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Philosophy Section */}
        <section id="philosophy" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>01</span>
            PHILOSOPHY
          </h2>
          <div className={styles.sectionContent}>
            <p className={styles.conceptText}>
              NeoProxy no es solo una web, es un <strong>Sistema Operativo Creativo</strong> completo 
              que funciona como un ecosistema vivo que convierte pensamiento en geometría, 
              geometría en materia, y materia en experiencia.
            </p>
            <blockquote className={styles.manifestoQuote}>
              "Tu taller, tu computadora y tu web son un solo sistema.<br/>
              IA + geometría + impresión física.<br/>
              Muy poca gente une esas tres cosas."
            </blockquote>
            <div className={styles.axiomList}>
              <h3>AXIOMS</h3>
              <div className={styles.axiom}>
                <span className={styles.axiomNumber}>01</span>
                El sistema nunca explica todo
              </div>
              <div className={styles.axiom}>
                <span className={styles.axiomNumber}>02</span>
                La interfaz responde, no persuade
              </div>
              <div className={styles.axiom}>
                <span className={styles.axiomNumber}>03</span>
                El usuario siente peso en cada acción
              </div>
              <div className={styles.axiom}>
                <span className={styles.axiomNumber}>04</span>
                El silencio es feedback válido
              </div>
              <div className={styles.axiom}>
                <span className={styles.axiomNumber}>05</span>
                Nada grita "haz click"
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>02</span>
            ARCHITECTURE
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.layers}>
              <div className={styles.layer}>
                <div className={styles.layerNumber}>LAYER 01</div>
                <div className={styles.layerName}>IDEA LAYER</div>
                <div className={styles.layerDesc}>Conciencia // Imaginación · Diálogo IA · Naturaleza</div>
              </div>
              <div className={styles.layer}>
                <div className={styles.layerNumber}>LAYER 02</div>
                <div className={styles.layerName}>AGENT LAYER</div>
                <div className={styles.layerDesc}>Inteligencia // Architect · Engineer · Artist · Fabricator</div>
              </div>
              <div className={styles.layer}>
                <div className={styles.layerNumber}>LAYER 03</div>
                <div className={styles.layerName}>GEOMETRY ENGINE</div>
                <div className={styles.layerDesc}>Geometría // Campos escalares · Superficies mínimas</div>
              </div>
              <div className={styles.layer}>
                <div className={styles.layerNumber}>LAYER 04</div>
                <div className={styles.layerName}>SIMULATION LAYER</div>
                <div className={styles.layerDesc}>Mundo Digital // NeoProxy.art · Visualización 3D</div>
              </div>
              <div className={styles.layer}>
                <div className={styles.layerNumber}>LAYER 05</div>
                <div className={styles.layerName}>FABRICATION LAYER</div>
                <div className={styles.layerDesc}>Mundo Físico // Resina UV · LEDs · Electrónica</div>
              </div>
            </div>
          </div>
        </section>

        {/* Identity Section */}
        <section id="identity" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>03</span>
            IDENTITY
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.identityGrid}>
              <div className={styles.identityCard}>
                <div className={styles.idNumber}>01</div>
                <div className={styles.idLabel}>LABORATORIO<br/>ARTÍSTICO</div>
              </div>
              <div className={styles.identityCard}>
                <div className={styles.idNumber}>02</div>
                <div className={styles.idLabel}>SISTEMA<br/>OPERATIVO</div>
              </div>
              <div className={styles.identityCard}>
                <div className={styles.idNumber}>03</div>
                <div className={styles.idLabel}>IDENTIDAD<br/>PERSONAL</div>
              </div>
              <div className={styles.identityCard}>
                <div className={styles.idNumber}>04</div>
                <div className={styles.idLabel}>EMPRESA<br/>TECNOLÓGICA</div>
              </div>
              <div className={styles.identityCard}>
                <div className={styles.idNumber}>05</div>
                <div className={styles.idLabel}>UNIVERSO<br/>ARTÍSTICO</div>
              </div>
            </div>
            
            <div className={styles.visualIdentity}>
              <h3>VISUAL PROTOCOL</h3>
              <div className={styles.colorPalette}>
                <div className={styles.color} style={{ background: '#000000' }}>
                  <span>BLACK</span>
                </div>
                <div className={styles.color} style={{ background: '#00ff9d' }}>
                  <span>TERMINAL_GREEN</span>
                </div>
                <div className={styles.color} style={{ background: '#00d4ff' }}>
                  <span>CYAN</span>
                </div>
                <div className={styles.color} style={{ background: '#111111' }}>
                  <span>DARK_GRAY</span>
                </div>
                <div className={styles.color} style={{ background: '#ffffff', opacity: 0.2 }}>
                  <span>WHITE_20%</span>
                </div>
              </div>
              <div className={styles.symbol}>
                <h4>SYMBOL: ENTANGLED TESSERACT</h4>
                <p>El hipercubo 4D representa la emergencia de realidades superpuestas y la naturaleza distribuida del sistema.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>04</span>
            ECOSYSTEM
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.ecosystemMap}>
              <div className={styles.ecosystemNode}>
                <div className={styles.nodeIcon}>⚗️</div>
                <div className={styles.nodeTitle}>NEOPROXY.ART</div>
                <div className={styles.nodeDesc}>Interface principal // Portal de acceso</div>
              </div>
              <div className={styles.ecosystemNode}>
                <div className={styles.nodeIcon}>⚗️</div>
                <div className={styles.nodeTitle}>NPOS OS</div>
                <div className={styles.nodeDesc}>Sistema operativo // Kernel lógico</div>
              </div>
              <div className={styles.ecosystemNode}>
                <div className={styles.nodeIcon}>⚗️</div>
                <div className={styles.nodeTitle}>GENERATIVE LAB</div>
                <div className={styles.nodeDesc}>Geometría algorítmica // STL export</div>
              </div>
              <div className={styles.ecosystemNode}>
                <div className={styles.nodeIcon}>⚗️</div>
                <div className={styles.nodeTitle}>FABRICATION</div>
                <div className={styles.nodeDesc}>Objetos físicos // Resina UV</div>
              </div>
              <div className={styles.ecosystemNode}>
                <div className={styles.nodeIcon}>⚗️</div>
                <div className={styles.nodeTitle}>MEMORY</div>
                <div className={styles.nodeDesc}>Archivo vivo // Proceso creativo</div>
              </div>
            </div>
            
            <div className={styles.flowDiagram}>
              <h3>CREATIVE FLOW</h3>
              <div className={styles.flow}>
                <div className={styles.flowStep}>MENTE</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowStep}>NEOPROXY OS</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowStep}>IA + AGENTES</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowStep}>GEOMETRÍA</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowStep}>OBJETO</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowStep}>PERSONA</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowStep}>NUEVA CONVERSACIÓN</div>
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section id="manifesto" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>05</span>
            MANIFESTO
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.manifestoContent}>
              <h3>DECLARACIÓN DE INTENCIONES</h3>
              <div className={styles.manifestoText}>
                <p>
                  <strong>NeoProxy no guía. NeoProxy responde.</strong>
                </p>
                <p>
                  Este no es un portafolio. No es una showcase. 
                  Es un <em>manifiesto operable</em> donde cada función, 
                  cada línea de código, cada pixel, es una declaración de principios.
                </p>
                <p>
                  Creemos en sistemas que se habitan, no en páginas que se visitan. 
                  En interfaces que responden, no en experiencias que persuaden. 
                  En silencios que comunican, no en ruidos que saturan.
                </p>
                <p>
                  La tecnología no es una herramienta, es un medio de expresión. 
                  La geometría no es matemática, es pensamiento hecho forma. 
                  La fabricación no es producción, es manifestación física de ideas.
                </p>
              </div>
              
              <div className={styles.finalStatement}>
                <h4>PROTOCOL FINAL</h4>
                <blockquote>
                  "El sistema nunca explica todo.<br/>
                  La interfaz responde, no persuade.<br/>
                  El usuario siente peso en cada acción.<br/>
                  El silencio es feedback válido.<br/>
                  Nada grita 'haz click'.<br/>
                  <br/>
                  NeoProxy no es una web que visitas.<br/>
                  Es un sistema que habitas."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.statusLine}>
            <span>SYSTEM: ONLINE</span>
            <span>LAYER: CONCEPT</span>
            <span>MODE: DOCUMENTATION</span>
          </div>
          <div className={styles.copyright}>
            // NEOPROXY OS v0.2 // CREATIVE OPERATING SYSTEM // ©2026 DARKPROXY
          </div>
        </div>
      </footer>
    </div>
  )
}
