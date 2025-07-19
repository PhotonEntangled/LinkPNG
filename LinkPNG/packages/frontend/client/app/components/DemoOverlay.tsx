"use client"
import { useDemoMode } from "../context/DemoModeContext"
import { useLanguage } from "../context/LanguageContext"
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCw } from "lucide-react"
import { useEffect, useState } from "react"

export default function DemoOverlay() {
  const { 
    isDemoMode, 
    currentStep, 
    demoSteps, 
    nextStep, 
    previousStep,
    isPlaying,
    playDemo,
    pauseDemo,
    demoProgress,
    disableDemoMode
  } = useDemoMode()
  
  const { t } = useLanguage()
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)

  // Handle element highlighting with proper spotlight effect
  useEffect(() => {
    if (!isDemoMode) return

    const currentDemoStep = demoSteps[currentStep]
    
    if (currentDemoStep?.element) {
      // Remove previous highlight
      if (highlightedElement) {
        const computedStyle = window.getComputedStyle(highlightedElement)
        // Only reset position if it wasn't originally fixed
        if (computedStyle.position !== 'fixed') {
          highlightedElement.style.position = ""
        }
        highlightedElement.style.zIndex = ""
        highlightedElement.style.outline = ""
        highlightedElement.style.outlineOffset = ""
        highlightedElement.style.borderRadius = ""
      }

      // Find and highlight new element
      const element = document.querySelector(currentDemoStep.element) as HTMLElement
      if (element) {
        // Don't override position for fixed elements (like floating buttons)
        const computedStyle = window.getComputedStyle(element)
        if (computedStyle.position !== 'fixed') {
          element.style.position = "relative"
        }
        
        element.style.zIndex = "1001"
        element.style.outline = "3px solid #ef4444"
        element.style.outlineOffset = "4px"
        element.style.borderRadius = "8px"
        setHighlightedElement(element)
        
        // Only scroll to non-fixed elements to prevent issues with floating buttons
        if (computedStyle.position !== 'fixed') {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "center",
            inline: "center"
          })
        }
      }
    } else {
      // Clear highlight if no element specified
      if (highlightedElement) {
        const computedStyle = window.getComputedStyle(highlightedElement)
        if (computedStyle.position !== 'fixed') {
          highlightedElement.style.position = ""
        }
        highlightedElement.style.zIndex = ""
        highlightedElement.style.outline = ""
        highlightedElement.style.outlineOffset = ""
        highlightedElement.style.borderRadius = ""
        setHighlightedElement(null)
      }
    }

    return () => {
      // Cleanup on unmount
      if (highlightedElement) {
        const computedStyle = window.getComputedStyle(highlightedElement)
        if (computedStyle.position !== 'fixed') {
          highlightedElement.style.position = ""
        }
        highlightedElement.style.zIndex = ""
        highlightedElement.style.outline = ""
        highlightedElement.style.outlineOffset = ""
        highlightedElement.style.borderRadius = ""
      }
    }
  }, [currentStep, isDemoMode])

  // Navigate to analytics page when reaching that step
  useEffect(() => {
    if (isDemoMode && currentStep === demoSteps.length - 1) {
      // Last step is analytics
      const timer = setTimeout(() => {
        window.location.href = '/analytics?mode=demo'
      }, 2000) // Navigate after 2 seconds
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, isDemoMode, demoSteps.length])

  if (!isDemoMode) return null

  const currentDemoStep = demoSteps[currentStep]

  return (
    <>
      {/* Dark overlay - lighter to show highlighted elements better */}
      <div className="fixed inset-0 bg-black/30 z-[999]" />

      {/* Demo Control Panel */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl p-6 z-[1002] max-w-2xl w-full mx-4">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {demoSteps.length}</span>
            <span>{Math.round(demoProgress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-png-red h-2 rounded-full transition-all duration-300"
              style={{ width: `${demoProgress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentDemoStep.title}
          </h3>
          <p className="text-gray-600">
            {currentDemoStep.description}
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={isPlaying ? pauseDemo : playDemo}
              className="px-4 py-2 rounded-lg bg-png-blue text-white hover:bg-png-blue/90 flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === demoSteps.length - 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={disableDemoMode}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            title="Exit Demo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating indicator */}
      <div className="fixed top-4 right-4 bg-png-red text-white px-4 py-2 rounded-lg shadow-lg z-[1002] flex items-center gap-2">
        <RotateCw className="w-4 h-4 animate-spin" />
        <span className="font-medium">Investor Demo Mode</span>
      </div>
    </>
  )
} 