import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saumya Shukla | Data Science Portfolio',
  description:
    'B.Tech CSE Data Science student and aspiring Data Analyst, Data Scientist and Data Engineer building practical data and technology projects.',
  generator: 'v0.app',
  keywords: [
    'Saumya Shukla',
    'Data Science',
    'Data Analyst',
    'Portfolio',
    'Python',
    'SQL',
    'Power BI',
    'B.Tech CSE',
  ],
  authors: [{ name: 'Saumya Shukla' }],
  openGraph: {
    title: 'Saumya Shukla | Data Science Portfolio',
    description:
      'Enter Saumya Shukla\u2019s interactive 3D digital workspace \u2014 projects, skills, experience and resume for an aspiring Data Analyst.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141019',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
