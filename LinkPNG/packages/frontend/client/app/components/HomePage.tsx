"use client"
import { useApp } from "../hooks/useApp"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import HeroCarousel from "./HeroCarousel"
import FlashSale from "./FlashSale"
import ProductCard from "./ProductCard"
import Footer from "./Footer"
import FloatingGameButton from "./FloatingGameButton"
import { Zap, CreditCard, Utensils, Gift, Video, Shirt, Smartphone, Globe, Store, Gamepad2, Landmark, Car, Package } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number;
  name: string;
  nameKey?: string; // Translation key for product name
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  sold: number;
  stock?: number;
  rating?: number;
}

export default function HomePage() {
  const { t } = useLanguage()
  
  // Function to get translated product name
  const getProductName = (product: Product): string => {
    if (product.nameKey) {
      return t(product.nameKey)
    }
    return product.name // Fallback to original name
  }

  // Mock data - Replace with API calls
  const carouselImages = [
    {
      id: 1,
      image: "/images/banners/flash-sale-banner.svg",
      title: t('flashSaleBanner'),
      subtitle: t('flashSaleBannerSubtitle'),
    },
    {
      id: 2,
      image: "/images/banners/free-shipping-banner.svg",
      title: t('freeShippingBanner'),
      subtitle: t('freeShippingBannerSubtitle'),
    },
    {
      id: 3,
      image: "/images/banners/new-arrivals-banner.svg",
      title: t('newArrivalsBanner'),
      subtitle: t('newArrivalsBannerSubtitle'),
    },
  ]

  const products = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    },
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    },
    {
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    },
    {
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    },
    {
      id: 17,
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
      id: 18,
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
      id: 19,
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
      id: 20,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    },
    {
      id: 21,
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
      id: 22,
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
      id: 23,
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
      id: 24,
      name: "PNG Flag T-Shirt - Premium Cotton",
      nameKey: "pngFlagTshirt",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-flag-shirt.jpg",
      discount: 20,
      sold: 67,
      stock: 95
    },
  ];

  const { setCurrentPage, setSelectedProduct } = useApp()

  // Move arrays inside component to access t() function
  const quickActions = [
    { label: 'Top Up', icon: Smartphone, color: 'bg-blue-500' },
    { label: 'Pay Bills', icon: CreditCard, color: 'bg-green-500' },
    { label: 'Food', icon: Utensils, color: 'bg-orange-500' },
    { label: 'Ride', icon: Car, color: 'bg-gray-800'},
    { label: 'Delivery', icon: Package, color: 'bg-cyan-500'},
    { label: 'Promos', icon: Gift, color: 'bg-red-500' },
    { label: 'Games', icon: Gamepad2, color: 'bg-purple-500' },
    { label: 'Invest', icon: Landmark, color: 'bg-indigo-500' },
    { label: 'Live', icon: Video, color: 'bg-pink-500' },
    { label: 'Fashion', icon: Shirt, color: 'bg-teal-500' },
];

  const categories = [
    {
      image: "/images/categories/traditional-crafts.svg",
      name: t("traditionalCrafts"),
      color: "bg-amber-100",
      icon: "🏺"
    },
    {
      image: "/images/categories/png-coffee.svg", 
      name: t("pngCoffee"),
      color: "bg-amber-900 text-white",
      icon: "☕"
    },
    {
      image: "/images/categories/local-foods.svg",
      name: t("localFoods"),
      color: "bg-green-100",
      icon: "🥥"
    },
    {
      image: "/images/categories/png-fashion.svg",
      name: t("pngFashion"),
      color: "bg-red-100",
      icon: "👕"
    },
    {
      image: "/images/categories/personal-care.svg",
      name: t("personalCare"),
      color: "bg-blue-100",
      icon: "🧴"
    },
    {
      image: "/images/categories/modern-png.svg",
      name: t("modernPng"),
      color: "bg-purple-100",
      icon: "🎨"
    },
  ]

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage("product")
  }

  // Create translated versions of products
  const translatedFlashSaleProducts = products.slice(0, 6).map(product => ({
    ...product,
    name: getProductName(product)
  }))

  const translatedDailyDiscoverProducts = products.slice(0, 12).map(product => ({
    ...product,
    name: getProductName(product)
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel images={carouselImages} />

      {/* Seller CTA Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Sell Your PNG Products Nationwide</h2>
              <p className="text-green-100">Join thousands of PNG entrepreneurs growing their business on LinkPNG</p>
            </div>
            <button 
              onClick={() => setCurrentPage("become-seller")}
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Store className="w-5 h-5" />
              Start Selling Today
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <section className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => {
                  if (action.label === 'Invest') {
                    setCurrentPage('financial-services');
                  }
                  if (action.label === 'Pay Bills') {
                    setCurrentPage('bill-payments');
                  }
                  if (action.label === 'Ride') {
                    setCurrentPage('ride-hailing');
                  }
                  if (action.label === 'Delivery') {
                    setCurrentPage('hyperlocal-delivery');
                  }
                  // TODO: Add handlers for other quick actions
                }}
              >
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-2`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-center text-gray-700">{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <FlashSale products={translatedFlashSaleProducts} onProductClick={handleProductClick} />

      {/* Category Showcase */}
      <section className="bg-white py-6 mt-2">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">{t("shopByCategory")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow`}
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="w-16 h-16 mx-auto mb-2 rounded-lg"
                />
                <span className="text-sm font-medium text-gray-800">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Discover Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t('dailyDiscover')}</h2>
            <a href="#" className="text-sm text-red-600 font-semibold hover:underline">{t('viewAll')}</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {translatedDailyDiscoverProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onProductClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Tracking Section - Hidden unless in demo mode */}
      <section className="hidden" data-testid="tracking-demo">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-4">Track Your Order</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Order #PNG-2024-001 is on its way!</p>
            <button 
              onClick={() => setCurrentPage("tracking")}
              className="mt-4 bg-png-blue text-white px-6 py-2 rounded-lg hover:bg-png-blue/90"
            >
              Track Order
            </button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating Game Button */}
      <FloatingGameButton />
    </div>
  )
}
