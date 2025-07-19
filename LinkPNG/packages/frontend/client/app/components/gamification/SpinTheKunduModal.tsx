"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import SpinTheKundu from "./SpinTheKundu"
import { X, Gift } from "lucide-react"

interface SpinTheKunduModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SpinTheKunduModal({ isOpen, onClose }: SpinTheKunduModalProps) {
  const { t } = useLanguage()
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateIn(true), 10)
    } else {
      setAnimateIn(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}>
        <div 
          className={`bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all duration-300 ${
            animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-png-yellow" />
              <h2 className="text-xl font-bold text-gray-800">{t("spinTheKundu")}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <SpinTheKundu 
              onPrizeWon={(prize) => {
                console.log("Prize won:", prize);
                // Here you could show a toast notification or update user points
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  )
} 