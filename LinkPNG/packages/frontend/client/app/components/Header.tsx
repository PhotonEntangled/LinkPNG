"use client"

import { Search, ShoppingCart, Menu, Bell, User, Globe } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useLanguage } from "../context/LanguageContext"

export default function Header() {
  const { cartItems, setCurrentPage } = useApp()
  const { language, setLanguage, t, isEnglish } = useLanguage()
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const toggleLanguage = () => {
    setLanguage(isEnglish ? "tok" : "en")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Promotional Bar */}
      <div className="linkpng-red text-white text-center py-2 text-sm">
        🚚 {t("freeShippingPromo")} | 📱 {t("appDownload")}
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage("home")}>
            <div className="linkpng-red text-white px-3 py-2 rounded-lg font-bold text-lg">LinkPNG</div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4" />
              <span>{isEnglish ? t("english") : t("tokPisin")}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t("search")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-png-red pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-png-red">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-png-red">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-png-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Cart */}
            <button 
              className="relative p-2 text-gray-600 hover:text-png-red"
              onClick={() => setCurrentPage("cart")}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-png-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-png-red">
              <User className="w-6 h-6" />
              <span className="hidden md:block text-sm">{t("myAccount")}</span>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 hidden md:block">
          <div className="flex items-center gap-8">
            <button 
              className="text-gray-700 hover:text-png-red font-medium transition-colors"
              onClick={() => setCurrentPage("home")}
            >
              {t("home")}
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              Bilums & Bags
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              Carvings & Art
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              PNG Coffee & Food
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              Local Fashion
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              Traditional Crafts
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              {t("categories")}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
