import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ai.engineer',
  description: 'AI engineering notes by Rishi Raj',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
