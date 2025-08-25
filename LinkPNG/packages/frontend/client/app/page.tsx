"use client"

import AppRouter from "./components/AppRouter"
import { AppProvider } from "./context/AppContext"
import { LanguageProvider } from "./context/LanguageContext"

export default function Page() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </LanguageProvider>
  )
}
