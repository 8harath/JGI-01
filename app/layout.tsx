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
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics /> {/* Add Analytics component */}
      </body>
    </html>
  )
}
