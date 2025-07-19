"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"
import { useDemoMode } from "../context/DemoModeContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  MapPin,
  Package,
  CreditCard,
  Smartphone
} from "lucide-react"
import Image from "next/image"

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const { isDemoMode } = useDemoMode()
  const [animatedValues, setAnimatedValues] = useState({
    totalUsers: 0,
    monthlyGMV: 0,
    avgOrderValue: 0,
    activeVendors: 0
  })

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const fps = 60
    const increment = duration / fps
    let currentTime = 0

    const timer = setInterval(() => {
      currentTime += increment
      const progress = Math.min(currentTime / duration, 1)
      
      setAnimatedValues({
        totalUsers: Math.floor(125000 * progress),
        monthlyGMV: Math.floor(2850000 * progress),
        avgOrderValue: Math.floor(85 * progress),
        activeVendors: Math.floor(3200 * progress)
      })

      if (progress >= 1) {
        clearInterval(timer)
      }
    }, increment)

    return () => clearInterval(timer)
  }, [])

  const growthData = [
    { month: "Jan", users: 45000, revenue: 850000 },
    { month: "Feb", users: 58000, revenue: 1100000 },
    { month: "Mar", users: 72000, revenue: 1450000 },
    { month: "Apr", users: 89000, revenue: 1900000 },
    { month: "May", users: 105000, revenue: 2300000 },
    { month: "Jun", users: 125000, revenue: 2850000 }
  ]

  const provinceData = [
    { name: "National Capital District", users: 35000, color: "bg-png-red" },
    { name: "Morobe", users: 28000, color: "bg-png-yellow" },
    { name: "Eastern Highlands", users: 22000, color: "bg-png-blue" },
    { name: "East New Britain", users: 18000, color: "bg-green-500" },
    { name: "Central", users: 12000, color: "bg-purple-500" },
    { name: "Others", users: 10000, color: "bg-gray-400" }
  ]

  const paymentMethods = [
    { method: "BSP Mobile Banking", percentage: 42, icon: <Smartphone className="w-5 h-5" /> },
    { method: "Digicel Mobile Money", percentage: 28, icon: <Smartphone className="w-5 h-5" /> },
    { method: "Cash on Delivery", percentage: 20, icon: <DollarSign className="w-5 h-5" /> },
    { method: "Bank Cards", percentage: 10, icon: <CreditCard className="w-5 h-5" /> }
  ]

  // Analytics page is now accessible to everyone (no access restriction)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights into LinkPNG's growth and performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-png-blue" />
              <span className="text-sm text-green-600 font-medium">+28%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {animatedValues.totalUsers.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm mt-1">Total Users</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+45%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              K{(animatedValues.monthlyGMV / 1000).toFixed(0)}k
            </h3>
            <p className="text-gray-600 text-sm mt-1">Monthly GMV</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8 text-png-red" />
              <span className="text-sm text-green-600 font-medium">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              K{animatedValues.avgOrderValue}
            </h3>
            <p className="text-gray-600 text-sm mt-1">Avg Order Value</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-png-yellow" />
              <span className="text-sm text-green-600 font-medium">+52%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {animatedValues.activeVendors.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm mt-1">Active Vendors</p>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">User Growth Trajectory</h3>
            <div className="relative h-64">
              {/* Simple bar chart */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-full">
                {growthData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-png-blue mx-1 rounded-t transition-all duration-1000"
                      style={{ 
                        height: `${(data.users / 125000) * 100}%`,
                        opacity: animatedValues.totalUsers > 0 ? 1 : 0
                      }}
                    />
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">178% growth over 6 months</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Market Penetration by Province</h3>
            <div className="space-y-3">
              {provinceData.map((province, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{province.name}</span>
                    <span className="font-medium">{province.users.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${province.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ 
                        width: `${(province.users / 35000) * 100}%`,
                        opacity: animatedValues.totalUsers > 0 ? 1 : 0
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods & Category Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method Distribution</h3>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-png-blue">{method.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{method.method}</span>
                      <span className="text-sm font-medium">{method.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-png-blue h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${method.percentage}%`,
                          opacity: animatedValues.totalUsers > 0 ? 1 : 0
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Product Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍲</span>
                  <span className="text-gray-700">Local Foods & Produce</span>
                </div>
                <span className="font-bold text-gray-800">K485k</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎨</span>
                  <span className="text-gray-700">Traditional Crafts</span>
                </div>
                <span className="font-bold text-gray-800">K342k</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">☕</span>
                  <span className="text-gray-700">PNG Coffee</span>
                </div>
                <span className="font-bold text-gray-800">K298k</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span className="text-gray-700">Electronics</span>
                </div>
                <span className="font-bold text-gray-800">K225k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-8 bg-gradient-to-r from-png-red to-png-yellow text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Key Success Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-3xl font-bold">98%</h4>
              <p className="text-white/80">Delivery Success Rate</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">4.8/5</h4>
              <p className="text-white/80">Customer Satisfaction</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">2.3 days</h4>
              <p className="text-white/80">Avg Delivery Time</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 