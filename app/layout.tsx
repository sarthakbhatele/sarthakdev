import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import SmoothScroll from '@/components/core/SmoothScroll'
import '@/styles/themes.css'
import './globals.css'
import Navbar from '@/components/core/Navbar'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Sarthak Bhatele | Portfolio',
  description: 'Fullstack Developer & AI Engineer. Explore my dual-themed interactive portfolio featuring Pac-Man and Chess aesthetics.',
  openGraph: {
    title: 'Sarthak Bhatele | Portfolio',
    description: 'Fullstack Developer & AI Engineer. Explore my dual-themed interactive portfolio featuring Pac-Man and Chess aesthetics.',
    url: 'https://sarthakbhatele.com', // Update with actual URL if known
    siteName: 'Sarthak Bhatele',
    images: [
      {
        url: '/images/photo6.png', // Or another appropriate OG image if available
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
    images: ['/images/photo6.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          {children}
          <Navbar />
        </SmoothScroll>
      </body>
    </html>
  )
}

