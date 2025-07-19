import { createContext, useContext } from "react"
import type { AppContextType } from "./AppProvider"

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export { AppProvider } from "./AppProvider"
export type { AppContextType } from "./AppProvider" 