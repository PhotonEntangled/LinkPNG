"use client"
import { useApp } from "../hooks/useApp"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import Footer from "./Footer"
import FloatingGameButton from "./FloatingGameButton"
import { 
  MapPin, ChevronRight, 
  CreditCard, Car, Package, Landmark, Zap, Utensils,
  Timer, TrendingUp
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

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
  category?: string;
  province?: string;
}

interface HomePageProps {
  products?: Product[];
}

export default function HomePage({ products: propProducts }: HomePageProps) {
  const { t } = useLanguage()
  const { setCurrentPage, setSelectedProduct } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })

  // Default products data with unique items
  const defaultProducts: Product[] = [
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
      category: "Traditional Crafts",
      province: "Western Highlands"
    },
    {
      id: 2,
      name: "PNG Arabica Coffee - Western Highlands",
      nameKey: "westernHighlandsCoffee",
      price: 42.00,
      originalPrice: 55.00,
      image: "/images/products/highlands-coffee.svg",
      discount: 24,
      sold: 356,
      stock: 88,
      category: "PNG Coffee",
      province: "Western Highlands"
    },
    {
      id: 3,
      name: "Taro Chips - Morobe Style",
      nameKey: "morobeTaroChips",
      price: 18.00,
      originalPrice: 25.00,
      image: "/images/products/taro-chips.svg",
      discount: 28,
      sold: 189,
      stock: 120,
      category: "Local Foods",
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
      sold: 267,
      stock: 95,
      category: "PNG Fashion",
      province: "National Capital District"
    },
    {
      id: 5,
      name: "Sepik River Wood Carving",
      nameKey: "sepikCarving",
      price: 150.00,
      originalPrice: 200.00,
      image: "/images/products/sepik-carving.svg",
      discount: 25,
      sold: 45,
      stock: 12,
      category: "Traditional Crafts",
      province: "East Sepik"
    },
    {
      id: 6,
      name: "Coconut Oil Soap - Natural",
      nameKey: "coconutSoap",
      price: 12.00,
      originalPrice: 15.00,
      image: "/images/products/coconut-soap.webp",
      discount: 20,
      sold: 423,
      stock: 200,
      category: "Personal Care",
      province: "New Ireland"
    },
    {
      id: 7,
      name: "Kundu Drum - Handcrafted",
      nameKey: "kunduDrum",
      price: 95.00,
      originalPrice: 120.00,
      image: "/images/products/kundu-drum.svg",
      discount: 21,
      sold: 67,
      stock: 23,
      category: "Traditional Crafts",
      province: "Oro Province"
    },
    {
      id: 8,
      name: "Bird of Paradise Art Print",
      nameKey: "birdParadiseArt",
      price: 35.00,
      originalPrice: 45.00,
      image: "/images/products/bird-paradise-art.svg",
      discount: 22,
      sold: 156,
      stock: 78,
      category: "Modern PNG",
      province: "National Capital District"
    },
    {
      id: 9,
      name: "Sago Flour - Traditional",
      nameKey: "sagoFlour",
      price: 25.00,
      originalPrice: 30.00,
      image: "/images/products/sago-flour.svg",
      discount: 17,
      sold: 289,
      stock: 150,
      category: "Local Foods",
      province: "Western Province"
    },
    {
      id: 10,
      name: "PNG Independence Shirt",
      nameKey: "independenceShirt",
      price: 32.00,
      originalPrice: 40.00,
      image: "/images/products/independence-shirt.svg",
      discount: 20,
      sold: 345,
      stock: 110,
      category: "PNG Fashion",
      province: "National Capital District"
    },
    {
      id: 11,
      name: "Traditional Clay Pot",
      nameKey: "clayPot",
      price: 45.00,
      originalPrice: 55.00,
      image: "/images/products/clay-pot.svg",
      discount: 18,
      sold: 78,
      stock: 34,
      category: "Traditional Crafts",
      province: "Central Province"
    },
    {
      id: 12,
      name: "PNG Highlands Honey",
      nameKey: "highlandsHoney",
      price: 38.00,
      originalPrice: 45.00,
      image: "/images/products/madang-honey.svg",
      discount: 16,
      sold: 234,
      stock: 67,
      category: "Local Foods",
      province: "Eastern Highlands"
    },
    {
      id: 13,
      name: "Oro Province Tapa Cloth",
      nameKey: "tapaCLoth",
      price: 65.00,
      originalPrice: 80.00,
      image: "/images/products/oro-tapa.svg",
      discount: 19,
      sold: 56,
      stock: 18,
      category: "Traditional Crafts",
      province: "Oro Province"
    },
    {
      id: 14,
      name: "PNG Spices Collection",
      nameKey: "spicesCollection",
      price: 28.00,
      originalPrice: 35.00,
      image: "/images/products/png-spices.svg",
      discount: 20,
      sold: 178,
      stock: 89,
      category: "Local Foods",
      province: "Madang"
    },
    {
      id: 15,
      name: "Traditional Bilum Laptop Bag",
      nameKey: "bilumLaptop",
      price: 120.00,
      originalPrice: 150.00,
      image: "/images/products/traditional-laptop-bag.svg",
      discount: 20,
      sold: 89,
      stock: 32,
      category: "Modern PNG",
      province: "Simbu"
    },
    {
      id: 16,
      name: "Eastern Highlands Coffee Beans",
      nameKey: "easternCoffee",
      price: 48.00,
      originalPrice: 60.00,
      image: "/images/products/eastern-coffee.svg",
      discount: 20,
      sold: 412,
      stock: 156,
      category: "PNG Coffee",
      province: "Eastern Highlands"
    }
  ];

  const products = propProducts || defaultProducts;

  // Hero carousel data with PNG cultural imagery
  const heroSlides = [
    {
      id: 1,
      image: "/images/banners/hero-digital-bridge.svg",
      title: "Connecting PNG to the Digital Future",
      subtitle: "Shop authentic PNG products from every province",
      cta: "Shop Local Crafts",
      bgGradient: "from-orange-600/90 to-red-600/90"
    },
    {
      id: 2,
      image: "/images/banners/highlands-coffee-hero.svg",
      title: "Premium PNG Coffee Direct from Farmers",
      subtitle: "Support local growers, taste the difference",
      cta: "Discover Highlands Coffee",
      bgGradient: "from-amber-700/90 to-amber-900/90"
    },
    {
      id: 3,
      image: "/images/banners/free-shipping-banner.svg",
      title: "Free Shipping Nationwide",
      subtitle: "All islands • All provinces • No minimum order",
      cta: "Start Shopping",
      bgGradient: "from-blue-600/90 to-indigo-700/90"
    }
  ];

  // Timer effect for flash sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const getProductName = (product: Product): string => {
    if (product.nameKey) {
      return t(product.nameKey);
    }
    return product.name;
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
  };

  // Quick actions - only features with prototypes
  const quickActions = [
    { label: 'Top Up', icon: Zap, color: 'from-blue-400 to-blue-600', page: 'top-up' },
    { label: 'Pay Bills', icon: CreditCard, color: 'from-emerald-400 to-emerald-600', page: 'bill-payments' },
    { label: 'Ride', icon: Car, color: 'from-gray-600 to-gray-800', page: 'ride-hailing' },
    { label: 'Delivery', icon: Package, color: 'from-cyan-400 to-cyan-600', page: 'hyperlocal-delivery' },
    { label: 'Invest', icon: Landmark, color: 'from-indigo-400 to-indigo-600', page: 'financial-services' },
    { label: 'Food', icon: Utensils, color: 'from-orange-400 to-orange-600', page: 'food-delivery' }
  ];

  // Categories with beautiful imagery
  const categories = [
    {
      name: "Traditional Crafts",
      nameKey: "traditionalCrafts",
      image: "/images/categories/traditional-crafts.svg",
      count: "2,345 items"
    },
    {
      name: "PNG Coffee",
      nameKey: "pngCoffee",
      image: "/images/categories/png-coffee.svg",
      count: "156 varieties"
    },
    {
      name: "Local Foods",
      nameKey: "localFoods",
      image: "/images/categories/local-foods.svg",
      count: "1,234 products"
    },
    {
      name: "PNG Fashion",
      nameKey: "pngFashion",
      image: "/images/categories/png-fashion.svg",
      count: "890 items"
    },
    {
      name: "Personal Care",
      nameKey: "personalCare",
      image: "/images/categories/personal-care.svg",
      count: "567 products"
    },
    {
      name: "Modern PNG",
      nameKey: "modernPng",
      image: "/images/categories/modern-png.svg",
      count: "432 items"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Carousel */}
      <section className="relative h-[400px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl mb-8 text-white/90">{slide.subtitle}</p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                      {slide.cta}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions - Single Row */}
      <section className="bg-white py-6 shadow-sm overflow-visible">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center overflow-x-auto overflow-y-visible scrollbar-hide py-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(action.page)}
                className="flex flex-col items-center min-w-[80px] group"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 transform transition-transform group-hover:scale-110 shadow-md group-hover:shadow-lg`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-700 font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900 mr-4">Flash Sale</h2>
              <div className="flex items-center space-x-1 text-white">
                <div className="bg-red-600 rounded px-2 py-1">
                  <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-red-600 font-bold">:</span>
                <div className="bg-red-600 rounded px-2 py-1">
                  <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-red-600 font-bold">:</span>
                <div className="bg-red-600 rounded px-2 py-1">
                  <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            <button className="text-red-600 font-semibold hover:underline flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map(product => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={getProductName(product)}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                  <div className="absolute top-2 right-2 flex items-center bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                    <Timer className="w-3 h-3 text-red-600 mr-1" />
                    <span className="text-xs font-semibold text-red-600">Limited</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {getProductName(product)}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-lg font-bold text-red-600">K{product.price}</span>
                      <span className="text-xs text-gray-500 line-through ml-1">
                        K{product.originalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min((product.sold / (product.sold + (product.stock || 50))) * 100, 95)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {product.sold} sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
              >
                <Image
                  src={category.image}
                  alt={category.nameKey ? t(category.nameKey) : category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">
                    {category.nameKey ? t(category.nameKey) : category.name}
                  </h3>
                  <p className="text-sm text-white/80">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Discover */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Discover</h2>
              <p className="text-gray-600 mt-1">Fresh finds from across Papua New Guinea</p>
            </div>
            <button className="text-orange-600 font-semibold hover:underline flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.slice(0, 12).map(product => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={getProductName(product)}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {getProductName(product)}
                  </h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-gray-900">K{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        K{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">{product.province}</p>
                    <div className="flex items-center">
                      <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">{product.sold} sold</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <Footer />
      
      {/* Floating Game Button */}
      <FloatingGameButton />
    </div>
  )
}