"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface DemoStep {
  id: string
  title: string
  description: string
  element?: string // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right'
  navigateTo?: string // Page to navigate to for this step
}

interface DemoModeContextType {
  isDemoMode: boolean
  enableDemoMode: () => void
  disableDemoMode: () => void
  toggleDemoMode: () => void
  resetDemo: () => void
  // Demo flow state
  currentStep: number
  demoSteps: DemoStep[]
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
  isPlaying: boolean
  playDemo: () => void
  pauseDemo: () => void
  demoProgress: number
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined)

const DEMO_STEPS: DemoStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to LinkPNG',
    description: 'Papua New Guinea\'s premier e-commerce platform connecting urban centers with authentic local products.',
    position: 'bottom'
  },
  {
    id: 'language',
    title: 'Cultural Integration',
    description: 'Switch between English and Tok Pisin to serve all Papua New Guineans.',
    element: '[data-testid="language-toggle"]',
    position: 'bottom'
  },
  {
    id: 'products',
    title: 'Authentic PNG Products',
    description: 'Browse curated selections from local sellers - from traditional bilums to fresh produce.',
    element: '[data-testid="product-grid"]',
    position: 'top'
  },
  {
    id: 'search',
    title: 'Voice Search Available',
    description: 'Use voice search in Tok Pisin or English - perfect for all literacy levels.',
    element: '[data-testid="search-bar"]',
    position: 'bottom'
  },
  {
    id: 'games',
    title: 'Interactive Features',
    description: 'Engage users with PNG-themed activities like Spin the Kundu.',
    element: '[data-testid="floating-game-button"]',
    position: 'left'
  },
  {
    id: 'product-detail',
    title: 'Product Discovery',
    description: 'Explore detailed product information with local seller stories.',
    navigateTo: '/product/1',
    position: 'bottom'
  },
  {
    id: 'checkout',
    title: 'PNG Payment Methods',
    description: 'Support for BSP Mobile Banking, Digicel Mobile Money, and Cash on Delivery.',
    navigateTo: '/checkout',
    element: '[data-testid="payment-section"]',
    position: 'top'
  },
  {
    id: 'analytics',
    title: 'Business Intelligence',
    description: 'View real-time analytics showing 178% growth, 125k users, and K2.85M monthly GMV.',
    navigateTo: '/analytics',
    position: 'bottom'
  }
]

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const mode = urlParams.get('mode')
      if (mode === 'demo' || mode === 'investor') { // Support legacy 'investor' parameter
        setIsDemoMode(true)
      }
    }
  }, [])

  const enableDemoMode = () => {
    setIsDemoMode(true)
    if (typeof window !== 'undefined') {
      // Add query parameter to URL without page reload
      const url = new URL(window.location.href)
      url.searchParams.set('mode', 'demo')
      window.history.pushState({}, '', url.toString())
    }
  }

  const disableDemoMode = () => {
    setIsDemoMode(false)
    if (typeof window !== 'undefined') {
      // Remove query parameter from URL without page reload
      const url = new URL(window.location.href)
      url.searchParams.delete('mode')
      window.history.pushState({}, '', url.toString())
    }
  }

  const toggleDemoMode = () => {
    if (isDemoMode) {
      disableDemoMode()
    } else {
      enableDemoMode()
    }
  }

  const resetDemo = () => {
    if (typeof window !== 'undefined') {
      // Clear all storage
      localStorage.clear()
      sessionStorage.clear()
      
      // Reset demo state
      setCurrentStep(0)
      setIsPlaying(false)
      
      // Navigate to home with demo mode preserved
      const url = new URL(window.location.origin)
      if (isDemoMode) {
        url.searchParams.set('mode', 'demo')
      }
      window.location.href = url.toString()
    }
  }

  const nextStep = () => {
    if (currentStep < DEMO_STEPS.length - 1) {
      const nextStepIndex = currentStep + 1
      const nextStepData = DEMO_STEPS[nextStepIndex]
      
      // Navigate to new page if specified
      if (nextStepData.navigateTo && typeof window !== 'undefined') {
        const url = new URL(window.location.origin + nextStepData.navigateTo)
        url.searchParams.set('mode', 'demo')
        window.location.href = url.toString()
      }
      
      setCurrentStep(nextStepIndex)
    } else {
      setIsPlaying(false)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 0 && step < DEMO_STEPS.length) {
      const stepData = DEMO_STEPS[step]
      
      // Navigate to new page if specified
      if (stepData.navigateTo && typeof window !== 'undefined') {
        const url = new URL(window.location.origin + stepData.navigateTo)
        url.searchParams.set('mode', 'demo')
        window.location.href = url.toString()
      }
      
      setCurrentStep(step)
    }
  }

  const playDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
  }

  const pauseDemo = () => {
    setIsPlaying(false)
  }

  const demoProgress = (currentStep / (DEMO_STEPS.length - 1)) * 100

  // Auto-advance demo when playing
  useEffect(() => {
    if (isPlaying && currentStep < DEMO_STEPS.length - 1) {
      const timer = setTimeout(() => {
        nextStep()
      }, 6000) // 6 seconds per step to allow for page transitions
      
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep])

  return (
    <DemoModeContext.Provider value={{
      isDemoMode,
      enableDemoMode,
      disableDemoMode,
      toggleDemoMode,
      resetDemo,
      currentStep,
      demoSteps: DEMO_STEPS,
      nextStep,
      previousStep,
      goToStep,
      isPlaying,
      playDemo,
      pauseDemo,
      demoProgress
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

// Legacy export for backward compatibility
export const useInvestorMode = useDemoMode
export const InvestorModeProvider = DemoModeProvider 