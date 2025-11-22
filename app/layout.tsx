import type React from "react"
// ... existing code ...
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Revenue Operations Maturity Assessment",
  description: "Evaluate your RevOps capabilities and get AI-powered insights",
  // ... existing icons ...
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
