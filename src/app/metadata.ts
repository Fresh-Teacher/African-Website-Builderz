import type { Metadata } from 'next'

const siteConfig = {
  name: 'African Website Builder',
  description: 'Welcome to African Website Builder (AWB), your top choice for creating professional websites across Africa.',
  url: 'https://awb-silk.vercel.app',
  ogImage: 'https://awb-silk.vercel.app/logo.png'
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'African Website Builder',
    'website creation',
    'responsive design',
    'business websites',
    'personal websites',
    'online presence',
    'professional web solutions'
  ],
  authors: [{ name: 'AWB Team' }],
  creator: 'AWB Team',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}