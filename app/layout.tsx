import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import SmoothScroll from '@/components/core/SmoothScroll'
import '@/styles/themes.css'
import './globals.css'
import Navbar from '@/components/core/Navbar'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Sarthak Bhatele',
  description: 'Fullstack Developer & AI Engineer',
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

