"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Menu, ShoppingCart, User, Mic, MicOff, Bell, Globe, Gamepad2, Play, Wallet } from "lucide-react"
import { useApp } from "../hooks/useApp"
import { useLanguage } from "../context/LanguageContext"
import { useDemoMode } from "../context/DemoModeContext"

export default function Header() {
  const { cartItems, setCurrentPage, searchTerm, setSearchTerm } = useApp()
  const { language, setLanguage, t } = useLanguage()
  const { isDemoMode, enableDemoMode } = useDemoMode()
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Check for Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setVoiceSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = language === 'en' ? 'en-US' : 'en-US' // For now, both use English recognition
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setSearchTerm(transcript)
          setIsListening(false)
        }
        
        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }
        
        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [language, setSearchTerm])

  const startVoiceSearch = () => {
    if (recognitionRef.current && voiceSupported) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setCurrentPage("search")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const [isCartAnimating, setIsCartAnimating] = useState(false)
  
  // Trigger animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setIsCartAnimating(true)
      const timer = setTimeout(() => setIsCartAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [cartCount])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? "tok" : "en")
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
              data-testid="language-toggle"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? t("english") : t("tokPisin")}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4" data-testid="search-bar">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("search")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-png-red pr-20"
              />
              {/* Voice Search Button */}
              {voiceSupported && (
                <button 
                  onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                  className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 ${
                    isListening 
                      ? 'text-png-red bg-red-50 animate-pulse' 
                      : 'text-gray-400 hover:text-png-red hover:bg-gray-50'
                  }`}
                  title={isListening ? t("stopVoiceSearch") : t("startVoiceSearch")}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-png-red transition-colors"
                title={t("search")}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Demo Mode Button */}
            {!isDemoMode && (
              <button 
                onClick={() => {
                  enableDemoMode()
                  // Auto-demo removed - using manual navigation only
                }}
                className="flex items-center gap-2 px-3 py-2 bg-png-red text-white rounded-lg hover:bg-png-red/90 transition-all text-sm font-medium"
                title="Start interactive demo"
              >
                <Play className="w-4 h-4" />
                Demo
              </button>
            )}
            
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
                <span className={`absolute -top-1 -right-1 bg-png-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                  isCartAnimating ? 'scale-125 animate-pulse' : 'scale-100'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('wallet')}
                className="relative p-2 text-gray-600 hover:text-png-red"
              >
                <Wallet className="w-6 h-6" />
              </button>
              {/* Admin Access */}
              <button 
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-png-red"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/admin'
                  }
                }}
                title="Admin Dashboard"
              >
                <User className="w-6 h-6" />
                <span className="hidden md:block text-sm">Admin</span>
              </button>

              {/* Seller Access */}
              <button 
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-png-red"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/seller'
                  }
                }}
                title="Seller Dashboard"
              >
                <User className="w-6 h-6" />
                <span className="hidden md:block text-sm">Seller</span>
              </button>
            </div>
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
              {t("bilumsAndBags")}
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              {t("carvingsAndArt")}
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              {t("pngCoffeeAndFood")}
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              {t("localFashion")}
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              {t("traditionalCrafts")}
            </button>
            <button className="text-gray-700 hover:text-png-red font-medium transition-colors">
              {t("categories")}
            </button>
            <button 
              className="flex items-center gap-1 text-gray-700 hover:text-png-red font-medium transition-colors"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/games'
                }
              }}
            >
              <Gamepad2 className="w-4 h-4" />
              {t("games")}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
