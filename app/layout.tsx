import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { Analytics } from "@vercel/analytics/react" // Import Analytics

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AVALON - Study Resource Hub",
  description: "A study resource hub for 4th semester Data Analytics students",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A study resource hub for 4th semester Data Analytics students." />
        <meta name="keywords" content="study resources, data analytics, BCA, semester 4, preparatory, final exams" />
        <meta name="author" content="AVALON Team, 8harath, Bharath" />
        <meta property="og:title" content="AVALON - Jain University" />
        <meta property="og:description" content="A study resource hub for 4th semester Data Analytics students." />
        <meta property="og:url" content="https://www.jainuniversity.live/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <title>AVALON - Study Resource Hub</title>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
