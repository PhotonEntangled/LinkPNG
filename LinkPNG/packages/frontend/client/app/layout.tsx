import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { metadata } from "./metadata"
import { AppProvider } from "./context/AppProvider"

const inter = Inter({ subsets: ["latin"] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
