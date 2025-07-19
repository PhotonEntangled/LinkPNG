"use client"
import { useApp } from "../hooks/useApp"
import Header from "./Header"
import HeroCarousel from "./HeroCarousel"
import FlashSale from "./FlashSale"
import ProductCard from "./ProductCard"
import Footer from "./Footer"
import { Zap, CreditCard, Utensils, Gift, Video, Shirt, Smartphone, Globe } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  sold: number;
  stock?: number;
  rating?: number;
}

// Mock data - Replace with API calls
const carouselImages = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=800&text=Flash+Sale+50%+OFF",
    title: "Flash Sale 50% OFF",
    subtitle: "Limited Time Only!",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=800&text=Free+Shipping+PNG",
    title: "Free Shipping Nationwide",
    subtitle: "Orders over K50",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=800&text=New+Arrivals",
    title: "New Arrivals Daily",
    subtitle: "Fresh products every day",
  },
]

const flashSaleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 45.99,
    originalPrice: 89.99,
    image: "/placeholder.svg?height=150&width=150&text=Headphones",
    discount: 49,
    sold: 234,
    stock: 500,
  },
  {
    id: 2,
    name: "Smart Phone Case",
    price: 12.99,
    originalPrice: 25.99,
    image: "/placeholder.svg?height=150&width=150&text=Phone+Case",
    discount: 50,
    sold: 156,
    stock: 300,
  },
  {
    id: 3,
    name: "USB Fast Charger",
    price: 18.99,
    originalPrice: 35.99,
    image: "/placeholder.svg?height=150&width=150&text=Charger",
    discount: 47,
    sold: 89,
    stock: 200,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 29.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=150&width=150&text=Speaker",
    discount: 50,
    sold: 67,
    stock: 150,
  },
]

const dailyDiscoverProducts = [
  {
    id: 1,
    name: "Premium Coffee Beans 1kg",
    price: 25.99,
    originalPrice: 35.99,
    image: "/placeholder.svg?height=200&width=200&text=Coffee",
    discount: 28,
    sold: 145,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Organic Coconut Oil 500ml",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200&text=Coconut+Oil",
    sold: 89,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Traditional Bilum Bag",
    price: 45.99,
    image: "/placeholder.svg?height=200&width=200&text=Bilum+Bag",
    sold: 234,
    rating: 4.9,
  },
  {
    id: 4,
    name: "PNG Coffee Mug Set",
    price: 22.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=200&width=200&text=Mug+Set",
    discount: 23,
    sold: 67,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Solar Power Bank",
    price: 39.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=200&width=200&text=Power+Bank",
    discount: 33,
    sold: 123,
    rating: 4.7,
  },
  {
    id: 6,
    name: "PNG Flag T-Shirt",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=200&text=T-Shirt",
    sold: 78,
    rating: 4.4,
  },
  {
    id: 7,
    name: "Tropical Fruit Snacks",
    price: 8.99,
    originalPrice: 12.99,
    image: "/placeholder.svg?height=200&width=200&text=Snacks",
    discount: 31,
    sold: 456,
    rating: 4.3,
  },
  {
    id: 8,
    name: "Handwoven Basket",
    price: 32.99,
    image: "/placeholder.svg?height=200&width=200&text=Basket",
    sold: 34,
    rating: 4.8,
  },
]

const quickActions = [
  { icon: Zap, label: "Top Up", color: "bg-blue-500" },
  { icon: CreditCard, label: "Pay Bills", color: "bg-green-500" },
  { icon: Utensils, label: "LinkPNG Food", color: "bg-red-500" },
  { icon: Gift, label: "Promos", color: "bg-purple-500" },
  { icon: Video, label: "Live", color: "bg-pink-500" },
  { icon: Shirt, label: "Fashion", color: "bg-indigo-500" },
  { icon: Smartphone, label: "Electronics", color: "bg-yellow-500" },
  { icon: Globe, label: "Global Deals", color: "bg-teal-500" },
]

const categories = [
  {
    name: "Home & Garden",
    image: "/placeholder.svg?height=120&width=120&text=Home",
    color: "bg-green-100",
  },
  {
    name: "Beauty & Health",
    image: "/placeholder.svg?height=120&width=120&text=Beauty",
    color: "bg-pink-100",
  },
  {
    name: "Electronics",
    image: "/placeholder.svg?height=120&width=120&text=Electronics",
    color: "bg-blue-100",
  },
  {
    name: "Fashion",
    image: "/placeholder.svg?height=120&width=120&text=Fashion",
    color: "bg-purple-100",
  },
  {
    name: "Sports & Outdoor",
    image: "/placeholder.svg?height=120&width=120&text=Sports",
    color: "bg-orange-100",
  },
  {
    name: "Local Products",
    image: "/placeholder.svg?height=120&width=120&text=Local",
    color: "bg-yellow-100",
  },
]

export default function HomePage() {
  const { setCurrentPage, setSelectedProduct } = useApp()

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage("product")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel images={carouselImages} />

      {/* Quick Actions Grid */}
      <section className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer hover:opacity-80">
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
      <FlashSale products={flashSaleProducts} onProductClick={handleProductClick} />

      {/* Category Showcase */}
      <section className="bg-white py-6 mt-2">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Shop By Category</h2>
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

      {/* Daily Discover Product Grid */}
      <section className="bg-white py-6 mt-2">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Daily Discover</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {dailyDiscoverProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-[#E50000] text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
