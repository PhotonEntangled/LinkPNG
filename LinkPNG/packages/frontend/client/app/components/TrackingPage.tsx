"use client"

import { useState } from "react"
import { ArrowLeft, Package, MapPin, Phone, MessageCircle, Copy, Check } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import Footer from "./Footer"
import TrackingTimeline from "./TrackingTimeline"
import OrderItem from "./OrderItem"
import { formatKina } from "@/lib/utils"

// Mock order data - Replace with API call
const mockOrderData = {
  orderNumber: "LPG-2024-001",
  orderDate: "2024-01-15",
  estimatedDelivery: "2024-01-20",
  status: "shipped",
  totalAmount: 97.97,
  shippingMethod: "Standard Delivery",
  trackingNumber: "PNG123456789",
  deliveryAddress: {
    name: "John Doe",
    phone: "+675 7123 4567",
    address: "123 Independence Drive, Waigani",
    city: "Port Moresby",
    province: "National Capital District",
    postalCode: "111",
  },
  items: [
    {
      id: 1,
      name: "Premium Coffee Beans 1kg",
      price: 25.99,
      quantity: 2,
      image: "/images/products/highlands-coffee.svg",
      seller: "PNG Coffee Co.",
    },
    {
      id: 2,
      name: "Traditional Bilum Bag",
      price: 45.99,
      quantity: 1,
      image: "/images/products/bilum-bag.avif",
      seller: "Local Crafts PNG",
    },
  ],
  trackingSteps: [
    {
      id: 1,
      status: "placed",
      label: "Order Placed",
      description: "We have received your order and payment confirmation.",
      date: "2024-01-15 10:30 AM",
      completed: true,
      icon: "check",
    },
    {
      id: 2,
      status: "processing",
      label: "Processing",
      description: "Your order is being prepared and packaged.",
      date: "2024-01-15 2:45 PM",
      completed: true,
      icon: "package",
    },
    {
      id: 3,
      status: "shipped",
      label: "Shipped",
      description: "Your order has been dispatched and is on its way.",
      date: "2024-01-16 9:15 AM",
      completed: true,
      icon: "truck",
      current: true,
    },
    {
      id: 4,
      status: "out_for_delivery",
      label: "Out for Delivery",
      description: "Your order is out for delivery and will arrive soon.",
      date: "Expected: 2024-01-20 AM",
      completed: false,
      icon: "map",
    },
    {
      id: 5,
      status: "delivered",
      label: "Delivered",
      description: "Your order has been successfully delivered.",
      date: "Expected: 2024-01-20",
      completed: false,
      icon: "check",
    },
  ],
}

export default function TrackingPage() {
  const { setCurrentPage } = useApp()
  const { t } = useLanguage()
  const [copiedTracking, setCopiedTracking] = useState(false)

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(mockOrderData.trackingNumber)
    setCopiedTracking(true)
    setTimeout(() => setCopiedTracking(false), 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#E50000]"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("back")}
            </button>
            <h1 className="text-2xl font-bold">{t("trackYourOrder")}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Order Status Overview */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t("orderNumber")} #{mockOrderData.orderNumber}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{t("orderDate")}: {mockOrderData.orderDate}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(mockOrderData.status)}`}>
                  {t(mockOrderData.status)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">{t("estimatedDelivery")}</div>
              <div className="text-lg font-bold text-[#E50000]">{mockOrderData.estimatedDelivery}</div>
            </div>
          </div>

          {/* Tracking Number */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">{t("trackingNumber")}</div>
                <div className="font-mono text-lg font-bold">{mockOrderData.trackingNumber}</div>
              </div>
              <button
                onClick={copyTrackingNumber}
                className="flex items-center gap-2 px-3 py-2 bg-[#E50000] text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {copiedTracking ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedTracking ? t("copied") : t("copyNumber")}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="w-5 h-5 text-[#E50000]" />
              <div className="text-left">
                <div className="font-medium">{t("callCourier")}</div>
                <div className="text-sm text-gray-600">+675 180 1234</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-[#E50000]" />
              <div className="text-left">
                <div className="font-medium">{t("liveChat")}</div>
                <div className="text-sm text-gray-600">{t("getInstantHelp")}</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="w-5 h-5 text-[#E50000]" />
              <div className="text-left">
                <div className="font-medium">{t("reportIssue")}</div>
                <div className="text-sm text-gray-600">{t("orderProblems")}</div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-6">{t("orderProgress")}</h3>
              <TrackingTimeline steps={mockOrderData.trackingSteps} />
            </div>

            {/* Delivery Map Placeholder */}
            <div className="bg-white rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">{t("deliveryLocation")}</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{t("liveTrackingComingSoon")}</p>
                  <p className="text-sm text-gray-500">{t("currentlyInPortMoresbyArea")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">{t("orderItems")} ({mockOrderData.items.length})</h3>
              <div className="space-y-4">
                {mockOrderData.items.map((item) => (
                  <OrderItem key={item.id} item={item} />
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("total")}</span>
                  <span className="text-[#E50000]">{formatKina(mockOrderData.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">{t("deliveryDetails")}</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t("deliveryAddress")}</div>
                  <div className="font-medium">{mockOrderData.deliveryAddress.name}</div>
                  <div className="text-sm text-gray-700">
                    {mockOrderData.deliveryAddress.address}
                    <br />
                    {mockOrderData.deliveryAddress.city}, {mockOrderData.deliveryAddress.province}
                    <br />
                    {mockOrderData.deliveryAddress.postalCode}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t("phoneNumber")}</div>
                  <div className="font-medium">{mockOrderData.deliveryAddress.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t("shippingMethod")}</div>
                  <div className="font-medium">{t("standardDelivery")}</div>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">{t("needHelp")}</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#E50000] text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  {t("contactCustomerService")}
                </button>
                <button className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  {t("viewOrderDetails")}
                </button>
                <button className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  {t("returnRefundRequest")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
