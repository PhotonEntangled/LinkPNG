"use client"

import { useState, useEffect } from "react"
import { MapPin, Star, Trophy, CheckCircle, Lock } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

interface Province {
  id: string
  name: string
  nameKey: string
  description: string
  challenge: string
  challengeKey: string
  reward: string
  rewardKey: string
  progress: number
  maxProgress: number
  completed: boolean
  difficulty: "easy" | "medium" | "hard"
  icon: string
  color: string
  unlocked: boolean
}

interface PngProvincialChallengeProps {
  onChallengeComplete?: (province: Province) => void
  className?: string
}

export default function PngProvincialChallenge({ 
  onChallengeComplete, 
  className = "" 
}: PngProvincialChallengeProps) {
  const { t } = useLanguage()
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
  const [totalScore, setTotalScore] = useState(0)

  const provinces: Province[] = [
    {
      id: "western-highlands",
      name: "Western Highlands",
      nameKey: "westernHighlands",
      description: "Home of world-famous coffee",
      challenge: "Purchase 3 coffee items from Western Highlands",
      challengeKey: "westernHighlandsChallenge",
      reward: "15% off next coffee order + Coffee Expert badge",
      rewardKey: "westernHighlandsReward",
      progress: 2,
      maxProgress: 3,
      completed: false,
      difficulty: "easy",
      icon: "☕",
      color: "bg-amber-700",
      unlocked: true
    },
    {
      id: "east-sepik",
      name: "East Sepik",
      nameKey: "eastSepik",
      description: "Master woodcarvers and artists",
      challenge: "Buy 2 traditional crafts from East Sepik",
      challengeKey: "eastSepikChallenge",
      reward: "Free shipping + Craft Collector badge",
      rewardKey: "eastSepikReward",
      progress: 1,
      maxProgress: 2,
      completed: false,
      difficulty: "medium",
      icon: "🪵",
      color: "bg-amber-600",
      unlocked: true
    },
    {
      id: "manus",
      name: "Manus",
      nameKey: "manus",
      description: "Beautiful shell jewelry and island crafts",
      challenge: "Collect 4 items from Manus Province",
      challengeKey: "manusChallenge",
      reward: "K20 voucher + Island Explorer badge",
      rewardKey: "manusReward",
      progress: 0,
      maxProgress: 4,
      completed: false,
      difficulty: "medium",
      icon: "🐚",
      color: "bg-blue-500",
      unlocked: true
    },
    {
      id: "madang",
      name: "Madang",
      nameKey: "madang",
      description: "Wild honey and coastal treasures",
      challenge: "Try 3 natural products from Madang",
      challengeKey: "madangChallenge",
      reward: "Honey jar gift + Nature Lover badge",
      rewardKey: "madangReward",
      progress: 0,
      maxProgress: 3,
      completed: false,
      difficulty: "easy",
      icon: "🍯",
      color: "bg-yellow-500",
      unlocked: false
    },
    {
      id: "oro",
      name: "Oro (Northern)",
      nameKey: "oro",
      description: "Traditional tapa cloth artisans",
      challenge: "Purchase 2 authentic tapa cloth items",
      challengeKey: "oroChallenge",
      reward: "Tapa cloth sample + Cultural Heritage badge",
      rewardKey: "oroReward",
      progress: 0,
      maxProgress: 2,
      completed: false,
      difficulty: "hard",
      icon: "🎨",
      color: "bg-purple-600",
      unlocked: false
    },
    {
      id: "bougainville",
      name: "Bougainville",
      nameKey: "bougainville",
      description: "Natural beauty and coconut products",
      challenge: "Complete the Bougainville collection (5 items)",
      challengeKey: "bougainvilleChallenge",
      reward: "Coconut product set + Island Champion badge",
      rewardKey: "bougainvilleReward",
      progress: 0,
      maxProgress: 5,
      completed: false,
      difficulty: "hard",
      icon: "🥥",
      color: "bg-green-600",
      unlocked: false
    }
  ]

  // Calculate total score from completed challenges
  useEffect(() => {
    const completedChallenges = provinces.filter(p => p.completed)
    const score = completedChallenges.reduce((acc, province) => {
      const points = province.difficulty === "easy" ? 100 : 
                   province.difficulty === "medium" ? 200 : 300
      return acc + points
    }, 0)
    setTotalScore(score)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600"
      case "medium": return "text-yellow-600"
      case "hard": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.round((progress / maxProgress) * 100)
  }

  return (
    <div className={`p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-png-red ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="h-6 w-6 text-png-red" />
          <h2 className="text-2xl font-bold text-png-red">{t("provincialChallenge")}</h2>
          <MapPin className="h-6 w-6 text-png-red" />
        </div>
        <p className="text-gray-600 text-sm mb-2">{t("provincialChallengeDescription")}</p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-600" />
            <span className="font-semibold text-yellow-600">
              {t("totalScore")}: {totalScore}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="text-sm">
              {provinces.filter(p => p.completed).length}/{provinces.length} {t("provincesCompleted")}
            </span>
          </div>
        </div>
      </div>

      {/* Provinces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {provinces.map((province) => (
          <div
            key={province.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              province.unlocked
                ? province.completed
                  ? "bg-green-100 border-green-500 shadow-lg"
                  : "bg-white border-gray-300 hover:border-png-red hover:shadow-md"
                : "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
            }`}
            onClick={() => province.unlocked && setSelectedProvince(province)}
          >
            {/* Lock overlay for locked provinces */}
            {!province.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80 rounded-lg">
                <Lock className="h-8 w-8 text-gray-500" />
              </div>
            )}

            {/* Province Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{province.icon}</span>
                <div>
                  <h3 className="font-bold text-sm">{t(province.nameKey)}</h3>
                  <p className="text-xs text-gray-600">{province.description}</p>
                </div>
              </div>
              {province.completed && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>{t("progress")}</span>
                <span>{province.progress}/{province.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    province.completed ? "bg-green-500" : "bg-png-red"
                  }`}
                  style={{ width: `${getProgressPercentage(province.progress, province.maxProgress)}%` }}
                ></div>
              </div>
            </div>

            {/* Difficulty & Reward */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${getDifficultyColor(province.difficulty)}`}>
                  {t(province.difficulty)}
                </span>
                <span className="text-xs text-gray-500">
                  {province.difficulty === "easy" ? "100" : 
                   province.difficulty === "medium" ? "200" : "300"} {t("points")}
                </span>
              </div>
              <p className="text-xs text-gray-700">{t(province.challengeKey)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Province Details */}
      {selectedProvince && (
        <div className="bg-white p-4 rounded-lg border-2 border-png-red shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{selectedProvince.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-png-red">
                  {t(selectedProvince.nameKey)}
                </h3>
                <p className="text-sm text-gray-600">{selectedProvince.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedProvince(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">{t("challenge")}:</h4>
              <p className="text-sm text-gray-700 mb-3">{t(selectedProvince.challengeKey)}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">{t("progress")}:</span>
                <span className="text-sm">
                  {selectedProvince.progress}/{selectedProvince.maxProgress}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-png-red h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${getProgressPercentage(selectedProvince.progress, selectedProvince.maxProgress)}%` 
                  }}
                ></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">{t("reward")}:</h4>
              <p className="text-sm text-gray-700 mb-3">{t(selectedProvince.rewardKey)}</p>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${getDifficultyColor(selectedProvince.difficulty)}`}>
                  {t(selectedProvince.difficulty)} {t("difficulty")}
                </span>
                <span className="text-sm text-yellow-600">
                  +{selectedProvince.difficulty === "easy" ? "100" : 
                    selectedProvince.difficulty === "medium" ? "200" : "300"} {t("points")}
                </span>
              </div>
            </div>
          </div>

          {!selectedProvince.completed && (
            <div className="mt-4 text-center">
              <button className="px-6 py-2 bg-png-red text-white rounded-full hover:bg-red-700 transition-colors">
                {t("shopNow")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">{t("challengeRewardsInfo")}</p>
      </div>
    </div>
  )
} 