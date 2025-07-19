"use client"

import { useState } from "react"
import { ArrowLeft, Star, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { useApp } from "../hooks/useApp"
import Header from "./Header"
import Footer from "./Footer"
import Image from "next/image"

export default function ProductDetailPage() {
  const { selectedProduct, setCurrentPage, addToCart } = useApp()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Product not found</p>
          <button onClick={() => setCurrentPage("home")} className="mt-4 bg-[#E50000] text-white px-6 py-2 rounded-lg">
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const product = {
    ...selectedProduct,
    images: [
      selectedProduct.image,
      "/placeholder.svg?height=400&width=400&text=Image+2",
      "/placeholder.svg?height=400&width=400&text=Image+3",
      "/placeholder.svg?height=400&width=400&text=Image+4",
    ],
    description: `Premium quality ${selectedProduct.name}. This product offers excellent value and has been carefully selected for our PNG customers.`,
    features: [
      "High quality materials",
      "Fast shipping within PNG",
      "Local warranty support",
      "Authentic product guarantee",
    ],
    seller: {
      name: "LinkPNG Verified Seller",
      rating: 4.8,
      followers: 1234,
    },
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct)
    }
    alert(`Added ${quantity} ${selectedProduct.name} to cart!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setCurrentPage("cart")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => setCurrentPage("home")} className="flex items-center gap-1 hover:text-[#E50000]">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg p-2 border-2 ${
                    selectedImage === index ? "border-[#E50000]" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt=""
                    width={80}
                    height={80}
                    className="w-full h-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating || 4.5} (125 reviews)</span>
                </div>
                <span className="text-sm text-gray-600">{product.sold} sold</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-[#E50000]">K{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">K{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="bg-[#FFCF00] text-black px-2 py-1 rounded text-sm font-bold">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#E50000] text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#FFCF00] text-black py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-4 mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Free shipping to Port Moresby</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Secure payment guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-purple-600" />
                  <span>7-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <h3 className="font-semibold mb-3">Key Features:</h3>
          <ul className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E50000] rounded-full"></div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}
