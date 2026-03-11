import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Irenic Media | Strategy-Led Digital Marketing & Technology Agency',
  description: 'Growth without chaos. Strategy without noise. We are a digital marketing and technology agency focused on sustainable, long-term growth.',
  keywords: ['digital marketing', 'SEO', 'social media marketing', 'app development', 'web development', 'strategy'],
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Theme script runs before React hydration to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                // Default to dark theme if no preference stored
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                }
                // Dark is default, no class needed
              })();
            `,
          }}
        />
        {/* Font Awesome for icons matching marko template */}
        <link rel="stylesheet" href="/assets/css/vendor/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/vendor/brands.css" />
        <link rel="stylesheet" href="/assets/css/vendor/solid.css" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
