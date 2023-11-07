import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google'
import React from 'react'
import { ThemeProvider } from '@/constants/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-inter'
})

const spcaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-spaceGrotesk'
})

export const metadata: Metadata = {
  title: 'HelperCom',
  description:
    'A community where everyone get their help . Question about everying ,Share knowledge and colllaboration with dev and gamers and explore vast amount of topic in any  development',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`
          ${inter.variable} 
          ${spcaceGrotesk.variable}`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500'
            }
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
