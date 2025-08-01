"use client"

import Image from "next/image"

interface OrderItemData {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  seller: string
}

interface OrderItemProps {
  item: OrderItemData
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
      <Image 
        src={item.image || "/images/products/highlands-coffee.svg"} 
        alt={item.name} 
        width={64}
        height={64}
        className="w-16 h-16 object-cover rounded-lg" 
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 line-clamp-2 mb-1">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-2">by {item.seller}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
          <span className="font-bold text-[#E50000]">K{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
