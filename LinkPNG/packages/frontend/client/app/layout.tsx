import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { metadata } from "./metadata"
import { AppProvider } from "./context/AppProvider"
import { LanguageProvider } from "./context/LanguageContext"
import { DemoModeProvider } from "./context/DemoModeContext"
import DemoOverlay from "./components/DemoOverlay"
import { Toaster } from "@/components/ui/toaster"
import AutoFillDemo from "./components/AutoFillDemo"

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
            <AppProvider>{children}</AppProvider>
            <DemoOverlay />
            <Toaster />
            <AutoFillDemo />
          </DemoModeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
