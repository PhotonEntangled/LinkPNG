"use client"

import { Check } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import Footer from "./Footer"

export default function ConfirmationPage() {
  const { setCurrentPage } = useApp()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("orderPlaced")}</h2>
          <p className="text-gray-600 mb-4">
            {t("thankYouPurchase")}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentPage("tracking")}
              className="w-full bg-[#E50000] text-white py-3 rounded-lg font-medium"
            >
              {t("trackYourOrder")}
            </button>
            <button
              onClick={() => setCurrentPage("home")}
              className="w-full border border-gray-300 py-3 rounded-lg font-medium"
            >
              {t("continueShopping")}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
