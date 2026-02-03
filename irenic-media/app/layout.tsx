import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Irenic Media | Strategy-Led Digital Marketing & Technology Agency',
  description: 'Growth without chaos. Strategy without noise. We are a digital marketing and technology agency focused on sustainable, long-term growth.',
  keywords: ['digital marketing', 'SEO', 'social media marketing', 'app development', 'web development', 'strategy'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
