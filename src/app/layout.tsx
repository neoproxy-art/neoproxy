import { JetBrains_Mono, Inter, Space_Mono } from 'next/font/google'
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

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-jetbrains',
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
    <html lang="es" className={`${mono.variable} ${inter.variable} ${spaceMono.variable} ${jetbrains.variable}`}>
      <body className={`${mono.className} ${spaceMono.className} ${jetbrains.className}`}>
        <GlobalNav />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
