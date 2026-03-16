import { JetBrains_Mono, Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import './styles/theme.css'
import './styles/responsive.css'
import GlobalNav from './components/GlobalNav'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'NeoProxy OS // Creative Operating System',
  description: 'Sistema Operativo Creativo. Un ecosistema vivo que convierte pensamiento en geometría, geometría en materia, y materia en experiencia.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${mono.variable} ${inter.variable}`}>
      <body className={mono.className}>
        <GlobalNav />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
