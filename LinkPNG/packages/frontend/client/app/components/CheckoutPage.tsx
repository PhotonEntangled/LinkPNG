"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, Truck, MapPin } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import Footer from "./Footer"
import Image from "next/image"
import { formatKina } from "@/lib/utils"

export default function CheckoutPage() {
  const { cartItems, setCurrentPage } = useApp()
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState("mobile")
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Port Moresby",
    province: "National Capital District",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    setCurrentPage("confirmation")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage("cart")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#E50000]"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("backToCart")}
            </button>
            <h1 className="text-2xl font-bold">{t("checkout")}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#E50000]" />
                <h2 className="text-lg font-bold">{t("deliveryAddress")}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fullName")}</label>
                  <input
                    type="text"
                    value={deliveryAddress.name}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                    placeholder={t("enterFullName")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("phoneNumber")}</label>
                  <input
                    type="tel"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                    placeholder={t("enterPhoneNumber")}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("streetAddress")}</label>
                  <textarea
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                    rows={3}
                    placeholder={t("enterCompleteAddress")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("city")}</label>
                  <select
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                  >
                    <option value="Port Moresby">{t("portMoresby")}</option>
                    <option value="Lae">{t("lae")}</option>
                    <option value="Mount Hagen">{t("mountHagen")}</option>
                    <option value="Madang">{t("madang")}</option>
                    <option value="Wewak">{t("wewak")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("province")}</label>
                  <select
                    value={deliveryAddress.province}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, province: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                  >
                    <option value="National Capital District">{t("nationalCapitalDistrict")}</option>
                    <option value="Morobe">{t("morobe")}</option>
                    <option value="Western Highlands">{t("westernHighlands")}</option>
                    <option value="Madang">{t("madang")}</option>
                    <option value="East Sepik">{t("eastSepik")}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6" data-testid="payment-section">
              <h2 className="text-lg font-bold mb-4">{t("paymentMethod")}</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mobile"
                    checked={paymentMethod === "mobile"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-[#E50000]"
                  />
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{t("mobileMoney")}</div>
                    <div className="text-sm text-gray-600">{t("payWithMobileMoney")}</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-[#E50000]"
                  />
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">{t("creditDebitCard")}</div>
                    <div className="text-sm text-gray-600">{t("visaMastercardEtc")}</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-[#E50000]"
                  />
                  <Truck className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">{t("cashOnDelivery")}</div>
                    <div className="text-sm text-gray-600">{t("payWhenOrderArrives")}</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">{t("orderSummary")}</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=400&fit=crop&crop=center"}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-600">{t("qty")}: {item.quantity || 1}</span>
                        <span className="text-sm font-medium">{t("price")}: {formatKina(item.price * (item.quantity || 1))}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>{t("price")}: {formatKina(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("shipping")}</span>
                  <span className="text-green-600">{t("freeLabel")}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("total")}</span>
                  <span className="text-[#E50000]">{t("price")}: {formatKina(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#E50000] text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                {t("placeOrder")}
              </button>

              <div className="mt-4 text-xs text-gray-600 text-center">
                {t("termsOfServiceAndPrivacyPolicy")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
