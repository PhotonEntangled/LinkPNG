"use client"

import { useState } from "react"
import { Search, ShoppingCart, Menu, Bell, User, Globe } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function Header() {
  const { cartItems, setCurrentPage } = useApp()
  const [currentLanguage, setCurrentLanguage] = useState("EN")
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Promotional Bar */}
      <div className="bg-[#E50000] text-white text-center py-2 text-sm">
        🚚 Free Shipping on Orders Over K50 | 📱 Download LinkPNG App for Exclusive Deals
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
            <div className="bg-[#E50000] text-white px-3 py-2 rounded-lg font-bold text-lg">LinkPNG</div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setCurrentLanguage(currentLanguage === "EN" ? "TOK" : "EN")}
            >
              <Globe className="w-4 h-4" />
              <span>{currentLanguage === "EN" ? "English" : "Tok Pisin"}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000] pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E50000] text-white p-2 rounded-md hover:bg-red-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>

            <button className="relative" onClick={() => setCurrentPage("cart")}>
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E50000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="hidden md:block">
              <User className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <div className="hidden md:block border-t border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-8 py-2 text-sm">
            <button
              onClick={() => setCurrentPage("home")}
              className="text-gray-700 hover:text-[#E50000] transition-colors"
            >
              Categories
            </button>
            <a href="#" className="text-gray-700 hover:text-[#E50000] transition-colors">
              Flash Sale
            </a>
            <a href="#" className="text-gray-700 hover:text-[#E50000] transition-colors">
              New Arrivals
            </a>
            <a href="#" className="text-gray-700 hover:text-[#E50000] transition-colors">
              Local Products
            </a>
            <button
              onClick={() => setCurrentPage("tracking")}
              className="text-gray-700 hover:text-[#E50000] transition-colors"
            >
              Track Order
            </button>
            <a href="#" className="text-gray-700 hover:text-[#E50000] transition-colors">
              Electronics
            </a>
            <a href="#" className="text-gray-700 hover:text-[#E50000] transition-colors">
              Fashion
            </a>
            <a href="#" className="text-gray-700 hover:text-[#E50000] transition-colors">
              Home & Garden
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
