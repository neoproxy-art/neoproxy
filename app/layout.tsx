import { Space_Mono } from 'next/font/google'
import type { Viewport } from 'next'

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
})

export const metadata = {
  title: 'NEOPROXY // WIRED',
  description: 'Artificial Neural Network Interface'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body 
        className="m-0 p-0 overflow-hidden bg-black text-white font-mono"
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          background: '#000000',
          color: '#ffffff'
        }}
      >
        {children}
      </body>
    </html>
  )
}
