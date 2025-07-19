"use client"

import { useState, useRef, useEffect } from "react"
import { Gift, Sparkles, Trophy, Coins } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

interface Prize {
  id: number
  nameKey: string
  description: string
  color: string
  icon: string
  probability: number
  value?: string
}

interface SpinTheKunduProps {
  onPrizeWon?: (prize: Prize) => void
  className?: string
}

export default function SpinTheKundu({ onPrizeWon, className = "" }: SpinTheKunduProps) {
  const { t } = useLanguage()
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [spinsRemaining, setSpinsRemaining] = useState(3) // Daily limit
  const wheelRef = useRef<HTMLDivElement>(null)

  // PNG-themed prizes with cultural relevance
  const prizes: Prize[] = [
    {
      id: 1,
      nameKey: "freeShippingOuterProvince",
      description: "Free shipping to outer provinces",
      color: "bg-png-red text-white",
      icon: "🚢",
      probability: 15,
      value: "K50 value"
    },
    {
      id: 2,
      nameKey: "discountTraditionalCrafts",
      description: "20% off traditional crafts",
      color: "bg-amber-500 text-white",
      icon: "🏺",
      probability: 20,
      value: "20% OFF"
    },
    {
      id: 3,
      nameKey: "pngCoffeeDiscount",
      description: "15% off PNG coffee",
      color: "bg-amber-900 text-white",
      icon: "☕",
      probability: 25,
      value: "15% OFF"
    },
    {
      id: 4,
      nameKey: "loyaltyPointsBonus",
      description: "500 Bonus Loyalty Points",
      color: "bg-yellow-500 text-black",
      icon: "⭐",
      probability: 30,
      value: "500 pts"
    },
    {
      id: 5,
      nameKey: "nextOrderDiscount",
      description: "K10 off next order",
      color: "bg-green-600 text-white",
      icon: "💰",
      probability: 25,
      value: "K10 OFF"
    },
    {
      id: 6,
      nameKey: "grandPrize",
      description: "Free traditional bilum bag",
      color: "bg-gradient-to-r from-png-red to-yellow-500 text-white",
      icon: "🎁",
      probability: 5,
      value: "K120 value"
    }
  ]

  const spinWheel = () => {
    if (isSpinning || spinsRemaining <= 0) return

    setIsSpinning(true)
    setWonPrize(null)

    // Determine winning prize based on probability
    const random = Math.random() * 100
    let cumulativeProbability = 0
    let selectedPrize = prizes[0]

    for (const prize of prizes) {
      cumulativeProbability += prize.probability
      if (random <= cumulativeProbability) {
        selectedPrize = prize
        break
      }
    }

    // Calculate rotation to land on selected prize
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id)
    const sectionAngle = 360 / prizes.length
    const targetAngle = (prizeIndex * sectionAngle) + (sectionAngle / 2)
    const totalRotation = currentRotation + 1440 + targetAngle // Multiple spins plus target

    setCurrentRotation(totalRotation)

    // Handle spin completion
    setTimeout(() => {
      setIsSpinning(false)
      setWonPrize(selectedPrize)
      setSpinsRemaining(prev => prev - 1)
      onPrizeWon?.(selectedPrize)
    }, 3000)
  }

  return (
    <div className={`flex flex-col items-center p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl border-2 border-png-red ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">🥁</span>
          <h2 className="text-2xl font-bold text-png-red">{t("spinTheKundu")}</h2>
          <span className="text-3xl">🥁</span>
        </div>
        <p className="text-gray-600 text-sm">{t("spinKunduDescription")}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">
            {t("spinsRemaining")}: {spinsRemaining}
          </span>
        </div>
      </div>

      {/* Wheel Container */}
      <div className="relative mb-6">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className={`w-80 h-80 rounded-full border-8 border-png-red shadow-2xl transition-transform duration-3000 ease-out ${
            isSpinning ? 'animate-pulse' : ''
          }`}
          style={{
            transform: `rotate(${currentRotation}deg)`,
            background: `conic-gradient(${prizes.map((prize, index) => {
              const startAngle = (index * 360) / prizes.length
              const endAngle = ((index + 1) * 360) / prizes.length
              return `${prize.color.includes('gradient') ? '#DC2626' : prize.color.replace('bg-', '').replace('text-white', '').replace('text-black', '')} ${startAngle}deg ${endAngle}deg`
            }).join(', ')})`
          }}
        >
          {/* Prize Sections */}
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index
            return (
              <div
                key={prize.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <div
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    top: '20%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <span className="text-2xl mb-1">{prize.icon}</span>
                  <span className="text-xs font-bold text-white px-1 py-0.5 bg-black bg-opacity-50 rounded">
                    {prize.value}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Center Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-png-red rounded-full"></div>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-png-red"></div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning || spinsRemaining <= 0}
        className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 ${
          isSpinning || spinsRemaining <= 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-png-red hover:bg-red-700 active:scale-95 shadow-lg hover:shadow-xl'
        } text-white`}
      >
        {isSpinning ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            {t("spinning")}...
          </div>
        ) : spinsRemaining <= 0 ? (
          t("noSpinsRemaining")
        ) : (
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {t("spinNow")}
          </div>
        )}
      </button>

      {/* Prize Display */}
      {wonPrize && !isSpinning && (
        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-500 shadow-lg animate-bounce">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-green-600">{t("congratulations")}</h3>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">{wonPrize.icon}</span>
              <div>
                <p className="font-semibold">{t(wonPrize.nameKey)}</p>
                <p className="text-sm text-gray-600">{wonPrize.description}</p>
              </div>
            </div>
            <p className="text-sm text-green-600 font-medium">
              {t("prizeAddedToAccount")}
            </p>
          </div>
        </div>
      )}

      {/* Traditional Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">{t("dailySpinLimit")}</p>
        <p className="text-xs text-gray-500">{t("traditionMeetsInnovation")}</p>
      </div>
    </div>
  )
} 