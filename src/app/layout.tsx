import { IBM_Plex_Mono, Inter } from 'next/font/google'

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'NeoProxy | Impresión 3D, Robótica & Sistemas Web',
  description: 'Plataforma de servicios tecnológicos avanzados. Especialistas en prototipado rápido, desarrollo de software y soluciones robóticas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${mono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
