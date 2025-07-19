"use client"
import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import SpinTheKunduModal from "./gamification/SpinTheKunduModal"
import { Gift, Sparkles } from "lucide-react"

export default function FloatingGameButton() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40" data-testid="floating-game-button">
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
            {t("spinTheKundu")}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group"
        >
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 bg-png-yellow rounded-full animate-ping opacity-25" />
          
          {/* Main button */}
          <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-png-yellow to-png-red rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
            <Gift className="w-7 h-7 text-white" />
            
            {/* Sparkle decoration */}
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-white animate-pulse" />
          </div>

          {/* Badge showing spins remaining (example) */}
          <div className="absolute -top-1 -left-1 bg-png-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </div>
        </button>
      </div>

      {/* Spin the Kundu Modal */}
      <SpinTheKunduModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 