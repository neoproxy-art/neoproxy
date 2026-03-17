'use client'

import Link from 'next/link'
import styles from './page.module.css'

export default function Page() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.neo}>NEO</span>
          <span className={styles.proxy}>PROXY</span>
        </h1>
        <p className={styles.subtitle}>
          Interface Neural Cuántica • Red Descentralizada
        </p>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Conectando Conciencia con Realidad
          </h2>
          <p className={styles.heroDesc}>
            Accede a la red NeoProxy a través de interfaces físicas y digitales
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projects}>
        <h2 className={styles.sectionTitle}>Proyectos Activos</h2>
        
        <div className={styles.grid}>
          {/* Espada Proxy */}
          <Link href="/espada" className={styles.projectCard}>
            <div className={styles.projectIcon}>🗡️</div>
            <h3 className={styles.projectTitle}>Espada Proxy</h3>
            <p className={styles.projectDesc}>
              Interface física para acceso a la red NeoProxy
            </p>
            <div className={styles.projectStatus}>Activo</div>
          </Link>

          {/* Tienda */}
          <Link href="/shop" className={styles.projectCard}>
            <div className={styles.projectIcon}>🛒</div>
            <h3 className={styles.projectTitle}>NeoProxy Shop</h3>
            <p className={styles.projectDesc}>
              STL Premium y productos físicos
            </p>
            <div className={styles.projectStatus}>Próximamente</div>
          </Link>

          {/* Sinspissss */}
          <div className={styles.projectCard}>
            <div className={styles.projectIcon}>🧠</div>
            <h3 className={styles.projectTitle}>Sinspissss</h3>
            <p className={styles.projectDesc}>
              Protocolo neural cuántico
            </p>
            <div className={styles.projectStatus}>Beta</div>
          </div>

          {/* Lab / NPos */}
          <Link href="/npos" className={styles.projectCard}>
            <div className={styles.projectIcon}>🔬</div>
            <h3 className={styles.projectTitle}>NPos / Lab</h3>
            <p className={styles.projectDesc}>
              Creative OS & Generative R&D. Exploración de algoritmos y geometría.
            </p>
            <div className={styles.projectStatus}>Activo</div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 NeoProxy • Conectando Futuros</p>
      </footer>
    </div>
  )
}
