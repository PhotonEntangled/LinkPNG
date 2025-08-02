"use client"

import { useState, useEffect, useMemo } from "react"
import { useApp } from "../hooks/useApp"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "./ProductCard"
import { ArrowLeft, Search } from "lucide-react"

interface Product {
  id: number;
  name: string;
  nameKey?: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  sold: number;
  stock?: number;
  rating?: number;
  province?: string;
}

export default function SearchPage() {
  const { searchTerm, setCurrentPage, setSelectedProduct } = useApp()
  const { t } = useLanguage()

  // Mock products data - same as in HomePage
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Sigri Estate Coffee - Wahgi Valley",
      nameKey: "sigriEstateCoffee",
      price: 65.00,
      image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop&crop=center",
      sold: 145,
      rating: 4.9,
      province: "Western Highlands"
    },
    {
      id: 2,
      name: "Wild Honey - Madang Forest",
      nameKey: "madangWildHoney",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&crop=center",
      sold: 89,
      rating: 4.8,
      province: "Madang"
    },
    {
      id: 3,
      name: "Sepik River Wood Carving - Crocodile Spirit",
      nameKey: "sepikWoodCarving",
      price: 450.00,
      originalPrice: 600.00,
      image: "/images/products/sepik-river-crocodile.jpg",
      discount: 25,
      sold: 34,
      rating: 4.9,
      province: "East Sepik"
    },
    {
      id: 4,
      name: "Traditional Shell Jewelry Set - Manus",
      nameKey: "manusShellJewelry",
      price: 180.00,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
      sold: 67,
      rating: 4.7,
      province: "Manus"
    },
    {
      id: 5,
      name: "Traditional Sago Flour - Western Province",
      nameKey: "westernSagoFlour",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&crop=center",
      sold: 123,
      rating: 4.6,
      province: "Western Province"
    },
    {
      id: 6,
      name: "Coconut Oil Soap - Bougainville Natural",
      nameKey: "bougainvilleCoconutSoap",
      price: 15.00,
      image: "/images/products/coconut-soap.webp",
      sold: 198,
      rating: 4.5,
      province: "Bougainville"
    },
    {
      id: 7,
      name: "Traditional Bilum Bag - Highlands Style",
      nameKey: "bilumBagHighlands",
      price: 85.00,
      originalPrice: 120.00,
      image: "/images/products/bilum-bag.avif",
      discount: 29,
      sold: 234,
      stock: 45,
      province: "Western Highlands"
    },
    {
      id: 8,
      name: "PNG Arabica Coffee - Western Highlands",
      nameKey: "westernHighlandsCoffee",
      price: 42.00,
      originalPrice: 55.00,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center",
      discount: 24,
      sold: 156,
      stock: 88,
      province: "Western Highlands"
    },
    {
      id: 9,
      name: "Taro Chips - Morobe Style",
      nameKey: "morobeTaroChips",
      price: 18.00,
      originalPrice: 25.00,
      image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&h=400&fit=crop&crop=center",
      discount: 28,
      sold: 89,
      stock: 120,
      province: "Morobe"
    },
    {
      id: 10,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    }
  ]

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return []
    
    const searchLower = searchTerm.toLowerCase()
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      (product.province && product.province.toLowerCase().includes(searchLower))
    )
  }, [searchTerm])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage("product")
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-png-red transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t("backToHome") || "Back to Home"}</span>
            </button>
            
            <div className="flex items-center gap-2 text-gray-800">
              <Search className="w-5 h-5" />
              <span className="font-medium">
                {searchTerm ? `"${searchTerm}"` : t("searchResults") || "Search Results"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!searchTerm.trim() ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              {t("enterSearchTerm") || "Enter a search term"}
            </h2>
            <p className="text-gray-500">
              {t("searchHint") || "Search for products, categories, or provinces"}
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              {t("noResultsFound") || "No results found"}
            </h2>
            <p className="text-gray-500 mb-4">
              {t("noResultsHint") || `We couldn't find any products matching "${searchTerm}"`}
            </p>
            <button 
              onClick={handleBackToHome}
              className="bg-png-red text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              {t("backToHome") || "Back to Home"}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {t("searchResults") || "Search Results"}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length === 1 
                  ? `1 ${t("resultFound") || "result found"} for "${searchTerm}"`
                  : `${filteredProducts.length} ${t("resultsFound") || "results found"} for "${searchTerm}"`
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}