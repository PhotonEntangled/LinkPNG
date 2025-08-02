"use client"
import { useDemoMode } from "../context/DemoModeContext"
import { useEffect } from "react"
import { Play, Eye, EyeOff, UserCheck, Square } from "lucide-react"
import { useAutomatedSellerDemo } from "./AutomatedSellerDemo"
import { AutomatedFullDemo } from "./AutomatedFullDemo" // Import the new component

export default function DemoControls() {
  const { isDemoMode, enableDemoMode, playDemo } = useDemoMode()
  
  // Use the automated seller demo hook
  const sellerDemo = useAutomatedSellerDemo({})

  // Secret key combination (Ctrl+Shift+I) to activate investor mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        enableDemoMode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableDemoMode])

  // Show demo button if URL has ?demo=preview
  const showDemoButton = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('demo') === 'preview'

  if (!showDemoButton && !isDemoMode) return null

  return (
    <div className="fixed top-4 left-4 z-50">
      {!isDemoMode ? (
        <button
          onClick={() => {
            enableDemoMode()
            setTimeout(() => playDemo(), 500) // Start demo after enabling
          }}
          className="bg-png-red text-white px-4 py-2 rounded-lg shadow-lg hover:bg-png-red/90 transition-all flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Start Demo
        </button>
      ) : (
        <div className="space-y-2 flex flex-col items-start">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-png-red" />
            <span className="text-sm font-medium">Demo Mode Active</span>
          </div>
          
          {/* Automated Full Demo Button */}
          <AutomatedFullDemo />

          {/* Automated Seller Demo Button */}
          <button
            onClick={() => {
              if (sellerDemo.isRunning) {
                sellerDemo.stopDemo()
              } else {
                sellerDemo.startDemo()
              }
            }}
            className={`${
              sellerDemo.isRunning 
                ? 'bg-gray-600 hover:bg-gray-700' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 w-full`}
          >
            {sellerDemo.isRunning ? (
              <>
                <Square className="w-4 h-4" />
                Stop Seller Demo
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                Auto Seller Demo (Legacy)
              </>
            )}
          </button>
          
          {/* Demo Progress Indicator */}
          {sellerDemo.isRunning && (
            <div className="bg-black/80 text-white px-3 py-2 rounded text-xs">
              Step {sellerDemo.currentStep + 1} of {sellerDemo.totalSteps}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
