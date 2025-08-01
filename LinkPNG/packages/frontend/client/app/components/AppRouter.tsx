"use client"

import { useEffect } from "react"
import { useApp } from "../context/AppContext"
import HomePage from "./HomePage"
import ProductDetailPage from "./ProductDetailPage"
import CartPage from "./CartPage"
import CheckoutPage from "./CheckoutPage"
import ConfirmationPage from "./ConfirmationPage"
import TrackingPage from "./TrackingPage"
import SearchPage from "./SearchPage"
import BecomeSellerPage from "../become-seller/page"
import SellerRegistrationPage from "../seller-registration/page"
import SellerOnboardingSuccessPage from "../seller-onboarding-success/page"

export default function AppRouter() {
  const { currentPage } = useApp()

  // Scroll to top whenever page changes
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0)
    
    // Also scroll after a short delay to handle content loading
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [currentPage])

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
    case "search":
      return <SearchPage />
    case "become-seller":
      return <BecomeSellerPage />
    case "seller-registration":
      return <SellerRegistrationPage />
    case "seller-onboarding-success":
      return <SellerOnboardingSuccessPage />
    default:
      return <HomePage />
  }
}
