import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { metadata } from "./metadata"
import { AppProvider } from "./context/AppProvider"
import { LanguageProvider } from "./context/LanguageContext"

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
        <LanguageProvider>
          <AppProvider>{children}</AppProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
