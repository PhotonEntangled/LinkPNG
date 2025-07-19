"use client"

import { useApp } from "../context/AppContext"
import HomePage from "./HomePage"
import ProductDetailPage from "./ProductDetailPage"
import CartPage from "./CartPage"
import CheckoutPage from "./CheckoutPage"
import ConfirmationPage from "./ConfirmationPage"
import TrackingPage from "./TrackingPage"

export default function AppRouter() {
  const { currentPage } = useApp()

  switch (currentPage) {
    case "home":
      return <HomePage />
    case "product":
      return <ProductDetailPage />
    case "cart":
      return <CartPage />
    case "checkout":
      return <CheckoutPage />
    case "confirmation":
      return <ConfirmationPage />
    case "tracking":
      return <TrackingPage />
    default:
      return <HomePage />
  }
}
