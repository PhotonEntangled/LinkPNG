"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import Image from "next/image"

interface FlashSaleProduct {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  discount: number
  sold: number
  stock: number
}

interface FlashSaleProps {
  products: FlashSaleProduct[]
  onProductClick?: (product: FlashSaleProduct) => void
}

export default function FlashSale({ products, onProductClick }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 56,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-gradient-to-r from-[#E50000] to-red-600 py-6 mt-2">
      <div className="container mx-auto px-4">
        {/* Flash Sale Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFCF00] text-black px-3 py-1 rounded-lg font-bold text-lg">⚡ FLASH SALE</div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Ends in:</span>
              <div className="flex gap-1">
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded text-sm font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded text-sm font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded text-sm font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          <button className="text-white text-sm hover:underline">View All</button>
        </div>

        {/* Flash Sale Products */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-40 bg-white rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onProductClick?.(product)}
              >
                <div className="relative mb-2">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={128}
                    height={128}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="absolute top-1 left-1 bg-[#FFCF00] text-black text-xs px-2 py-1 rounded font-bold">
                    -{product.discount}%
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">{product.name}</h3>

                <div className="mb-2">
                  <div className="text-[#E50000] font-bold text-lg">K{product.price}</div>
                  <div className="text-gray-500 text-sm line-through">K{product.originalPrice}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#E50000] h-full transition-all duration-300"
                      style={{ width: `${(product.sold / product.stock) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{product.sold} sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
