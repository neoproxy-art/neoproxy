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
          <div className={styles.subtitle} style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Un sistema donde el código, la materia y el sonido son lo mismo
          </div>
          <div className={styles.version} style={{ marginTop: 16, color: 'rgba(255,255,255,0.7)', textTransform: 'none', maxWidth: 600, lineHeight: 1.6 }}>
            NeoProxy es un laboratorio creativo donde diseño 3D, inteligencia artificial y fabricación física convergen en un solo ecosistema.
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.conceptNav}>
        <a href="#philosophy" className={styles.navLink}>[QUÉ ES]</a>
        <a href="#architecture" className={styles.navLink}>[CÓMO FUNCIONA]</a>
        <a href="#identity" className={styles.navLink}>[QUIÉN]</a>
        <a href="#ecosystem" className={styles.navLink}>[ECOSYSTEM]</a>
        <a href="#manifesto" className={styles.navLink}>[MANIFESTO]</a>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Philosophy Section */}
        <section id="philosophy" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>01</span>
            QUÉ ES
          </h2>
          <div className={styles.sectionContent}>
            <p className={styles.conceptText}>
              Cada objeto físico que ves aquí nació como dato. Cada visualización 3D puede convertirse en algo que puedes sostener. El laboratorio conecta esos dos mundos — el digital y el físico — en tiempo real.
            </p>
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
                Nada compite por tu atención.
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.lineNumber}>02</span>
            CÓMO FUNCIONA
          </h2>
          <div className={styles.sectionContent}>
            <p className={styles.conceptText} style={{ marginBottom: 32 }}>
              Una base de datos controla la escena 3D. Los objetos impresos tienen ficha digital. Los experimentos de audio generan geometría. Todo habla con todo.
            </p>
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
            QUIÉN
          </h2>
          <div className={styles.sectionContent}>
            <p className={styles.conceptText} style={{ marginBottom: 32 }}>
              Darkproxy. Diseñador, programador, fabricante. Este es mi laboratorio personal — abierto al público.
            </p>
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

      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(0,212,255,0.1)', maxWidth: 700, margin: '0 auto', fontFamily: 'monospace' }}>
        <div style={{ fontSize: 9, color: 'rgba(0,212,255,0.4)', letterSpacing: '0.2em', marginBottom: 24 }}>// MANIFIESTO NEO·PROXY</div>
        
        <div className="space-y-8" style={{ color: 'rgba(0,212,255,0.7)', lineHeight: 2 }}>
          <p>
            No somos el origen.<br />
            No somos el destino.<br />
            <strong className="text-cyan-400">Somos el canal.</strong>
          </p>

          <p>
            Existimos donde la intención no tiene forma<br />
            y la forma aún no decide obedecer.<br />
            Entre la mano y la máquina.<br />
            Entre la idea y su residuo.
          </p>

          <div style={{ height: '1px', background: 'rgba(0,212,255,0.2)', margin: '32px 0' }}></div>

          <p>
            No representamos: intermediamos.<br />
            No creamos objetos: activamos procesos.<br />
            No ofrecemos respuestas: exponemos sistemas.
          </p>

          <p>
            Aquí nada está terminado.<br />
            Todo está en estado de ejecución.
          </p>

          <p>
            La estética no precede al sentido.<br />
            El sentido emerge del error,<br />
            de la fricción,<br />
            de la latencia.
          </p>

          <div style={{ height: '1px', background: 'rgba(0,212,255,0.2)', margin: '32px 0' }}></div>

          <p>
            El usuario no entra.<br />
            Es incorporado.<br />
            No observa el sistema:<br />
            queda inscrito en él.
          </p>

          <p>
            La máquina no sirve.<br />
            Interpreta.<br />
            La inteligencia no explica.<br />
            Decide cuándo callar.
          </p>

          <p>
            La memoria no almacena.<br />
            Deforma.<br />
            El acceso no se concede.<br />
            Se negocia.
          </p>

          <div style={{ height: '1px', background: 'rgba(0,212,255,0.2)', margin: '32px 0' }}></div>

          <p>
            No hay centro.<br />
            No hay jerarquía estable.<br />
            No hay versión final.
          </p>

          <p>
            Toda interfaz es una prótesis.<br />
            Todo proxy es una máscara.<br />
            Toda máscara dice una verdad parcial.
          </p>

          <p>
            Operamos en la grieta<br />
            entre control y emergencia.<br />
            Entre lo legible y lo oculto.<br />
            Entre lo humano y lo que ya no lo es.
          </p>

          <div style={{ height: '1px', background: 'rgba(0,212,255,0.2)', margin: '32px 0' }}></div>

          <p>
            Si buscas claridad, este sistema resistirá.<br />
            Si buscas control, este sistema mutará.<br />
            Si buscas sentido, este sistema te reflejará.
          </p>

          <p>
            Neo·Proxy no promete futuro.<br />
            No archiva pasado.<br />
            <strong className="text-cyan-400">Ejecuta presente.</strong>
          </p>

          <p>
            Nada aquí es neutral.<br />
            Nada aquí es inocente.<br />
            Nada aquí está solo.
          </p>

          <p>
            Esto no es un sitio.<br />
            Es un estado transitorio<br />
            donde algo piensa<br />
            a través de ti.
          </p>
        </div>
      </section>
    </div>
  )
}
