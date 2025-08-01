"use client"

import { useState, type ReactNode } from "react"
import { AppContext } from "./AppContext"
import DemoOverlay from "../components/DemoOverlay"
import DemoControls from "../components/DemoControls"
import { toast } from "@/components/ui/use-toast"

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  sold?: number;
  stock?: number;
  rating?: number;
  quantity?: number;
  seller?: string;
}

export interface AppContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  cartItems: Product[]
  setCartItems: (items: Product[]) => void
  addToCart: (product: Product) => void
  selectedOrderId?: string
  setSelectedOrderId: (orderId: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("") // Add search term state
  const [cartItems, setCartItems] = useState<Product[]>([
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
  ])
  const [selectedOrderId, setSelectedOrderId] = useState<string>()

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        )
      )
      toast({
        title: "Item Updated",
        description: `${product.name} quantity increased in your cart`,
        variant: "default",
      })
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, seller: "LinkPNG Seller" }])
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
        variant: "default",
      })
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        cartItems,
        setCartItems,
        addToCart,
        selectedOrderId,
        setSelectedOrderId,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
      <DemoOverlay />
      <DemoControls />
    </AppContext.Provider>
  )
}
