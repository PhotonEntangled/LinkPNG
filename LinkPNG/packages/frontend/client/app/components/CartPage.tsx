"use client"

import { useState } from "react"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import Footer from "./Footer"
import Image from "next/image"
import { formatKina } from "@/lib/utils"

export default function CartPage() {
  const { cartItems, setCartItems, setCurrentPage } = useApp()
  const { t } = useLanguage()
  const [selectedItems, setSelectedItems] = useState<number[]>(cartItems.map((item) => item.id))
  const [selectAll, setSelectAll] = useState(true)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    setSelectedItems((selected) => selected.filter((itemId) => itemId !== id))
  }

  const toggleItemSelection = (id: number) => {
    setSelectedItems((selected) => {
      const newSelected = selected.includes(id) ? selected.filter((itemId) => itemId !== id) : [...selected, id]
      setSelectAll(newSelected.length === cartItems.length)
      return newSelected
    })
  }

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
    setSelectAll(!selectAll)
  }

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id))
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

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
              {t("continueShopping")}
            </button>
            <h1 className="text-2xl font-bold">{t("shoppingCart")} ({cartItems.length})</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <div className="bg-white rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-[#E50000] rounded focus:ring-[#E50000]"
                />
                <span className="font-medium">{t("selectAll")} ({cartItems.length} {t("items")})</span>
              </label>
            </div>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="w-4 h-4 text-[#E50000] rounded focus:ring-[#E50000] mt-2"
                  />

                  {/* Product Image */}
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{t("by")} {item.seller}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-png-red font-bold text-lg">{formatKina(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-gray-500 text-sm line-through">{formatKina(item.originalPrice)}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <ShoppingCart className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{t("yourCartIsEmpty")}</h3>
                <p className="text-gray-600 mb-4">{t("addSomeProducts")}</p>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="bg-[#E50000] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t("startShopping")}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">{t("orderSummary")}</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>{t("subtotal")} ({selectedItems.length} {t("items")})</span>
                  <span>{formatKina(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("shipping")}</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? t("free") : formatKina(shipping)}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <p className="text-sm text-gray-600">{t("addFreeShippingMessage")}</p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("total")}</span>
                  <span className="text-png-red">{formatKina(total)}</span>
                </div>
              </div>

              <button
                disabled={selectedItems.length === 0}
                onClick={() => setCurrentPage("checkout")}
                className="w-full linkpng-red text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {t("checkout")} ({selectedItems.length})
              </button>

              <div className="mt-4 text-center">
                <button onClick={() => setCurrentPage("home")} className="text-[#E50000] text-sm hover:underline">
                  {t("continueShopping")}
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
