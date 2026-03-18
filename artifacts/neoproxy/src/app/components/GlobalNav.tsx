'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './GlobalNav.module.css'

const NAV = [
  { href: '/',            label: 'HOME',        icon: '⬡' },
  { href: '/concept',     label: 'CONCEPT',     icon: '◈' },
  { href: '/lab',         label: 'LAB',         icon: '⟁' },
  { href: '/fabrication', label: 'FABRICATION', icon: '◉' },
  { href: '/shop',        label: 'SHOP',        icon: '◎' },
]

export default function GlobalNav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className={styles.globalNav}>
      <div className={styles.navContainer}>
        <div className={styles.navHeader}>
          <Link href="/" className={styles.logo}>
            <span className={styles.neo}>NEO</span><span className={styles.proxy}>PROXY</span>
          </Link>
          <div className={styles.version}>v1.0</div>
        </div>
        <div className={styles.navMenu}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              <span className={styles.navIndicator} />
            </Link>
          ))}
        </div>
        <div className={styles.navFooter}>
          <div className={styles.systemStatus}>
            <span className={styles.statusDot} />
            <span>SYSTEM_ONLINE</span>
          </div>
          <div className={styles.operator}>OPERATOR: darkproxy</div>
        </div>
      </div>
    </nav>
  )
}
