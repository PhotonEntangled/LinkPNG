"use client"

import { useState } from "react"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Image from "next/image"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Premium Coffee Beans 1kg",
    price: 25.99,
    originalPrice: 35.99,
    image: "/placeholder.svg?height=80&width=80&text=Coffee",
    quantity: 2,
    seller: "PNG Coffee Co.",
  },
  {
    id: 2,
    name: "Traditional Bilum Bag",
    price: 45.99,
    image: "/placeholder.svg?height=80&width=80&text=Bilum",
    quantity: 1,
    seller: "Local Crafts PNG",
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 39.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=80&width=80&text=Power+Bank",
    quantity: 1,
    seller: "Tech Solutions PNG",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3])
  const [selectAll, setSelectAll] = useState(true)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
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
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#E50000]">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
            <h1 className="text-2xl font-bold">Shopping Cart ({cartItems.length})</h1>
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
                <span className="font-medium">Select All ({cartItems.length} items)</span>
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
                    <p className="text-sm text-gray-600 mb-2">by {item.seller}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#E50000] font-bold text-lg">K{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-gray-500 text-sm line-through">K{item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                <h3 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-4">Add some products to get started!</p>
                <button className="bg-[#E50000] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>K{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `K${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <p className="text-sm text-gray-600">Add K{(50 - subtotal).toFixed(2)} more for free shipping</p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#E50000]">K{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={selectedItems.length === 0}
                className="w-full bg-[#E50000] text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Check Out ({selectedItems.length})
              </button>

              <div className="mt-4 text-center">
                <button className="text-[#E50000] text-sm hover:underline">Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
