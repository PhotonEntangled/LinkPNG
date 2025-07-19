"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// Language types
export type Language = "en" | "tok"

// Translation interface
interface Translations {
  [key: string]: {
    en: string
    tok: string
  }
}

// PNG E-commerce translations based on research
const translations: Translations = {
  // Navigation & Header
  search: {
    en: "Search for products, brands, and more...",
    tok: "Painim ol kainkain samting..."
  },
  searchButton: {
    en: "Search",
    tok: "Painim"
  },
  
  // Cart & Shopping
  addToCart: {
    en: "Add to Cart", 
    tok: "Putim long Basket"
  },
  viewCart: {
    en: "View Cart",
    tok: "Lukim Basket"
  },
  myCart: {
    en: "My Cart",
    tok: "Basket bilong mi"
  },
  checkout: {
    en: "Checkout",
    tok: "Baim Nau"
  },
  buyNow: {
    en: "Buy Now",
    tok: "Baim Nau"
  },
  
  // Account & User
  myAccount: {
    en: "My Account",
    tok: "Akaun bilong mi"
  },
  signIn: {
    en: "Sign In",
    tok: "Sain In"
  },
  signOut: {
    en: "Sign Out", 
    tok: "Sain Aut"
  },
  
  // Product & Categories
  categories: {
    en: "Categories",
    tok: "Ol Kain"
  },
  specialOffer: {
    en: "Special Offer",
    tok: "Spesel Til"
  },
  description: {
    en: "Description",
    tok: "Stori bilong en"
  },
  
  // Common Actions
  home: {
    en: "Home",
    tok: "Hom Pes"
  },
  total: {
    en: "Total",
    tok: "Olgeta"
  },
  subtotal: {
    en: "Subtotal",
    tok: "Sampela Olgeta"
  },
  shipping: {
    en: "Shipping",
    tok: "Salim"
  },
  free: {
    en: "FREE",
    tok: "NATING"
  },
  freeShipping: {
    en: "Free Shipping",
    tok: "Salim Nating"
  },
  freeShippingMessage: {
    en: "more for free shipping",
    tok: "moa long salim nating"
  },
  items: {
    en: "items",
    tok: "ol samting"
  },
  orderSummary: {
    en: "Order Summary", 
    tok: "Stori bilong Oda"
  },
  trackOrder: {
    en: "Track Order",
    tok: "Trekim Oda"
  },
  orderConfirmed: {
    en: "Order Confirmed",
    tok: "Oda i Orait"
  },
  
  // Language selector
  english: {
    en: "English",
    tok: "English"
  },
  tokPisin: {
    en: "Tok Pisin", 
    tok: "Tok Pisin"
  },
  
  // Promotional messages
  freeShippingPromo: {
    en: "Free Shipping on Orders Over K50",
    tok: "Salim Nating long ol oda K50 na moa"
  },
  appDownload: {
    en: "Download LinkPNG App for Exclusive Deals",
    tok: "Daunim LinkPNG App long ol spesel pel"
  }
}

// Language Context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isEnglish: boolean
  isTokPisin: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  
  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Translation key "${key}" not found`)
      return key // Fallback to key if translation missing
    }
    return translation[language]
  }
  
  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isEnglish: language === "en",
    isTokPisin: language === "tok"
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 