import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { metadata } from "./metadata"
import { AppProvider } from "./context/AppProvider"
import { LanguageProvider } from "./context/LanguageContext"
import { DemoModeProvider } from "./context/DemoModeContext"
import { DemoPlaybackProvider } from "./context/DemoPlaybackContext"
import { Toaster } from "@/components/ui/toaster"

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
          <DemoModeProvider>
            <DemoPlaybackProvider>
              <AppProvider>{children}</AppProvider>
              <Toaster />
            </DemoPlaybackProvider>
          </DemoModeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
