import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata = {
  metadataBase: new URL('https://awb-silk.vercel.app'),
  title: {
    default: 'African Website Builder',
    template: '%s | AWB'
  },
  description: 'Welcome to African Website Builder (AWB), your top choice for creating professional websites across Africa.',
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
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://awb-silk.vercel.app',
    title: 'African Website Builder',
    description: 'Welcome to African Website Builder (AWB), your top choice for creating professional websites across Africa.',
    siteName: 'African Website Builder',
    images: [{
      url: 'https://awb-silk.vercel.app/logo.png',
      width: 1200,
      height: 630,
      alt: 'African Website Builder'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'African Website Builder',
    description: 'Your top choice for creating professional websites across Africa',
    images: ['https://awb-silk.vercel.app/logo.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
    }
  },
  verification: {
    google: 'your-google-verification-code', // Add your verification code if needed
  },
  alternates: {
    canonical: 'https://awb-silk.vercel.app'
  },
  appleWebApp: {
    title: 'AWB',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/logo.png'
    ]
  },
  formatDetection: {
    telephone: true
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}