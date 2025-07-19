"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, Truck, MapPin } from "lucide-react"
import { useApp } from "../context/AppContext"
import Header from "./Header"
import Footer from "./Footer"
import Image from "next/image"

export default function CheckoutPage() {
  const { cartItems, setCurrentPage } = useApp()
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
              Back to Cart
            </button>
            <h1 className="text-2xl font-bold">Checkout</h1>
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
                <h2 className="text-lg font-bold">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={deliveryAddress.name}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                    placeholder="+675 XXXX XXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <textarea
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                    rows={3}
                    placeholder="Enter your complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                  >
                    <option value="Port Moresby">Port Moresby</option>
                    <option value="Lae">Lae</option>
                    <option value="Mount Hagen">Mount Hagen</option>
                    <option value="Madang">Madang</option>
                    <option value="Wewak">Wewak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select
                    value={deliveryAddress.province}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, province: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
                  >
                    <option value="National Capital District">National Capital District</option>
                    <option value="Morobe">Morobe</option>
                    <option value="Western Highlands">Western Highlands</option>
                    <option value="Madang">Madang</option>
                    <option value="East Sepik">East Sepik</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>

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
                    <div className="font-medium">Mobile Money</div>
                    <div className="text-sm text-gray-600">Pay with Digicel, Bmobile, or other mobile wallets</div>
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
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, and other major cards</div>
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
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when your order arrives</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-600">Qty: {item.quantity || 1}</span>
                        <span className="text-sm font-medium">K{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>K{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#E50000]">K{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#E50000] text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Place Order
              </button>

              <div className="mt-4 text-xs text-gray-600 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
