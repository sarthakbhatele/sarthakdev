import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import SmoothScroll from '@/components/core/SmoothScroll'
import '@/styles/themes.css'
import './globals.css'
import Navbar from '@/components/core/Navbar'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

const BASE_URL = 'https://www.sarthakbhatele.tech' // 🔁 replace this

export const metadata: Metadata = {
  title: 'Sarthak Bhatele | Portfolio',
  description: 'Fullstack Developer & AI Engineer. Dual-themed interactive portfolio featuring Pac-Man and Chess aesthetics.',
  metadataBase: new URL(BASE_URL), // ✅ this is the key fix
  openGraph: {
    title: 'Sarthak Bhatele | Portfolio',
    description: 'Fullstack Developer & AI Engineer.',
    url: BASE_URL,
    siteName: 'Sarthak Bhatele',
    images: [
      {
        url: '/images/og-image.png', // ✅ Next.js resolves to absolute using metadataBase
        width: 1200,
        height: 630,
        alt: 'Sarthak Bhatele - Fullstack Developer & AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarthak Bhatele | Portfolio',
    description: 'Fullstack Developer & AI Engineer.',
    images: ['/images/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScroll>
          {children}
          <Navbar />
        </SmoothScroll>
      </body>
    </html>
  )
}