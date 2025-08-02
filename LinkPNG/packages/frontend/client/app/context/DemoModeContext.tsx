"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  name: string;
  role: 'buyer' | 'seller' | 'admin';
}

interface DemoModeContextType {
  isDemoMode: boolean
  enableDemoMode: () => void
  disableDemoMode: () => void
  currentUser: User | null
  login: (user: User) => void
  logout: () => void
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined)

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const enableDemoMode = () => {
    setIsDemoMode(true)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('mode', 'demo')
      window.history.pushState({}, '', url.toString())
    }
  }

  const disableDemoMode = () => {
    setIsDemoMode(false)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('mode')
      window.history.pushState({}, '', url.toString())
    }
  }
  
  // Check URL parameters on mount to activate demo mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const mode = urlParams.get('mode')
      if (mode === 'demo') {
        setIsDemoMode(true)
      }
    }
  }, [])

  return (
    <DemoModeContext.Provider value={{
      isDemoMode,
      enableDemoMode,
      disableDemoMode,
      currentUser,
      login,
      logout,
    }}>
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoModeContext)
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoModeProvider')
  }
  return context
}
