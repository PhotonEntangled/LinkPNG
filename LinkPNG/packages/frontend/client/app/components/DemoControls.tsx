"use client"
import { useDemoMode } from "../context/DemoModeContext"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { AutomatedFullDemo } from "./AutomatedFullDemo"

export default function DemoControls() {
  const { isDemoMode, enableDemoMode } = useDemoMode();
  const [isDemoRunning, setIsDemoRunning] = useState(false);

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

  // Do not render anything if demo mode is not active OR if the full demo is running
  if ((!showDemoButton && !isDemoMode) || isDemoRunning) return null

  return (
    <div className="fixed top-4 left-4 z-50">
      {!isDemoMode ? (
        <button
          onClick={enableDemoMode}
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
          
          {/* Pass the setIsDemoRunning setter to the main demo component */}
          <AutomatedFullDemo setMasterDemoRunning={setIsDemoRunning} />
        </div>
      )}
    </div>
  )
}
