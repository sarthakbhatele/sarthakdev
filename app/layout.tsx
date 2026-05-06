import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import SmoothScroll from '@/components/core/SmoothScroll'
import '@/styles/themes.css'
import './globals.css'
import Navbar from '@/components/core/Navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

const BASE_URL = 'https://www.sarthakbhatele.tech'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Sarthak Bhatele | Full Stack Developer & AI Engineer',
    template: '%s | Sarthak Bhatele',
  },
  description: 'Full Stack Developer & AI Engineer building production-ready web apps end-to-end.',

  keywords: [
    'Sarthak Bhatele',
    'Sarthak Bhatele Portfolio',
    'Full Stack Developer',
    'AI Engineer',
    'Next.js Developer',
    'React Developer',
    'Node.js',
    'PostgreSQL',
    'India',
  ],

  authors: [{ name: 'Sarthak Bhatele', url: BASE_URL }],
  creator: 'Sarthak Bhatele',
  publisher: 'Sarthak Bhatele',
  category: 'technology',

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Sarthak Bhatele Portfolio',
    title: 'Sarthak Bhatele | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer & AI Engineer building production-ready web apps end-to-end.',
    locale: 'en_US',
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Sarthak Bhatele Portfolio',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sarthak Bhatele | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer & AI Engineer building production-ready web apps end-to-end.',
    images: [`${BASE_URL}/images/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Sarthak Bhatele',
      url: BASE_URL,
      image: `${BASE_URL}/images/og-image.png`,
      jobTitle: 'Full Stack Developer & AI Engineer',
      description: 'Full Stack Developer & AI Engineer building production-ready web apps end-to-end.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gwalior', // 🔁 change if needed
        addressCountry: 'IN',
      },
      knowsAbout: [
        'Next.js', 'React.js', 'Node.js',
        'PostgreSQL', 'AI Engineering',
        'Full Stack Development', 'SaaS',
      ],
      sameAs: [
        'https://github.com/sarthakbhatele',
        'https://www.linkedin.com/in/sarthak-bhatele-55a67a30a',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Sarthak Bhatele Portfolio',
      author: { '@id': `${BASE_URL}/#person` },
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: 'Sarthak Bhatele — Full Stack Developer & AI Engineer',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#person` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
          <Navbar />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}