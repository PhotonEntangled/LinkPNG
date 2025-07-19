"use client"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SpinTheKundu from "../components/gamification/SpinTheKundu"
import PngProvincialChallenge from "../components/gamification/PngProvincialChallenge"
import { Trophy, Gamepad2, Gift, MapPin } from "lucide-react"

export default function GamesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Games Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-red-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-png-yellow rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-png-red" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-png-red mb-2">{t("gamificationZone")}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("gamificationDescription")}</p>
          </div>

          {/* Games Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <Gamepad2 className="w-8 h-8 text-png-red mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-600">{t("gamesAvailable")}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <Gift className="w-8 h-8 text-png-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">K50+</div>
              <div className="text-sm text-gray-600">{t("totalPrizes")}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <MapPin className="w-8 h-8 text-png-black mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">22</div>
              <div className="text-sm text-gray-600">{t("provincesToExplore")}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <Trophy className="w-8 h-8 text-png-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-sm text-gray-600">{t("yourPoints")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Spin the Kundu */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{t("spinTheKundu")}</h2>
                <p className="text-gray-600 text-sm">{t("spinTheKunduDescription")}</p>
              </div>
              <div className="flex justify-center">
                <SpinTheKundu 
                  onPrizeWon={(prize) => {
                    console.log("Prize won:", prize);
                    // Here you could show a toast notification or update user points
                  }}
                  className="w-full max-w-md"
                />
              </div>
            </div>
            
            {/* PNG Provincial Challenge */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{t("pngProvincialChallenge")}</h2>
                <p className="text-gray-600 text-sm">{t("provincialChallengeDescription")}</p>
              </div>
              <div className="flex justify-center">
                <PngProvincialChallenge 
                  onChallengeComplete={(province) => {
                    console.log("Challenge completed:", province);
                    // Here you could update user progress or show celebration
                  }}
                  className="w-full max-w-2xl"
                />
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("moreGamesComing")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🎲</div>
                <div className="text-sm text-gray-600">{t("luckySixes")}</div>
                <div className="text-xs text-png-red mt-1">{t("comingSoon")}</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🏃‍♂️</div>
                <div className="text-sm text-gray-600">{t("dailyChallenge")}</div>
                <div className="text-xs text-png-red mt-1">{t("comingSoon")}</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-sm text-gray-600">{t("pricePrediction")}</div>
                <div className="text-xs text-png-red mt-1">{t("comingSoon")}</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-sm text-gray-600">{t("leaderboard")}</div>
                <div className="text-xs text-png-red mt-1">{t("comingSoon")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 