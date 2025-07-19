"use client"

import { Star, Heart } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  discount?: number
  sold: number
  rating?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={192}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-[#FFCF00] text-black text-xs px-2 py-1 rounded font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">{product.name}</h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#E50000] font-bold text-lg">K{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through">K{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Sold Count */}
        <div className="text-xs text-gray-500">{product.sold} sold</div>
      </div>
    </div>
  )
}
