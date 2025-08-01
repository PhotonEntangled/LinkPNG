"use client"

import { useState, type ReactNode } from "react"
import { AppContext } from "./AppContext"
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
  const [cartItems, setCartItems] = useState<Product[]>([])
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
      <DemoControls />
    </AppContext.Provider>
  )
}
