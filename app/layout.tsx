import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouTube Shorts AI Agent',
  description: 'Automated YouTube Shorts content creation and posting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
