import type React from "react"
import type { Metadata } from "next"
import { Geist } from 'next/font/google'
import { Inter } from 'next/font/google'
import "./globals.css"

// Load Geist font (Primary typeface for headings)
const geist = Geist({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
})

// Load Inter font (Secondary typeface for body text)
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Revenue Operations Maturity Assessment",
  description: "Evaluate your RevOps capabilities and get AI-powered insights",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
