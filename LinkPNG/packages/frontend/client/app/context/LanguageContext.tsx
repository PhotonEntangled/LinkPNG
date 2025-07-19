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
  // Navigation & Header (existing)
  search: {
    en: "Search for products, brands, and more...",
    tok: "Painim ol kainkain samting..."
  },
  searchButton: {
    en: "Search",
    tok: "Painim"
  },
  
  // Categories & Services - Home Page Icons
  topUp: {
    en: "Top Up",
    tok: "Putim Moni"
  },
  payBills: {
    en: "Pay Bills",
    tok: "Peim Bill"
  },
  linkpngFood: {
    en: "LinkPNG Food",
    tok: "LinkPNG Kaikai"
  },
  promos: {
    en: "Promos", 
    tok: "Promosen"
  },
  live: {
    en: "Live",
    tok: "Live"
  },
  fashion: {
    en: "Fashion",
    tok: "Nais Klos"
  },
  electronics: {
    en: "Electronics",
    tok: "Ol Mashin"
  },
  globalDeals: {
    en: "Global Deals",
    tok: "Worl Sel"
  },

  // Flash Sale Section
  flashSale: {
    en: "FLASH SALE",
    tok: "KWIK SEL"
  },
  endsIn: {
    en: "Ends in:",
    tok: "Pinis long:"
  },
  viewAll: {
    en: "View All",
    tok: "Lukim Olgeta"
  },
  sold: {
    en: "sold",
    tok: "salim"
  },
  
  // Product Categories
  homeGarden: {
    en: "Home & Garden",
    tok: "Haus na Gaden"
  },
  beautyHealth: {
    en: "Beauty & Health",
    tok: "Nais na Helt"
  },
  sportsOutdoor: {
    en: "Sports & Outdoor", 
    tok: "Sport na Ausait"
  },
  localProducts: {
    en: "Local Products",
    tok: "Ples Samting"
  },
  
  // Shop Section Headers
  shopByCategory: {
    en: "Shop by Category",
    tok: "Baim long Kain"
  },
  dailyDiscover: {
    en: "Daily Discover",
    tok: "De De Painim"
  },
  loadMore: {
    en: "Load More Products",
    tok: "Kisim Moa Samting"
  },

  // Cart & Shopping (existing expanded)
  addToCart: {
    en: "Add to Cart", 
    tok: "Putim long Basket"
  },
  viewCart: {
    en: "View Cart",
    tok: "Lukim Basket"
  },
  checkout: {
    en: "Checkout",
    tok: "Baim Nau"
  },
  buyNow: {
    en: "Buy Now",
    tok: "Baim Nau"
  },
  
  // Common Actions (existing expanded)
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
  
  // Footer - Customer Service
  customerService: {
    en: "Customer Service",
    tok: "Helpim Kastoma"
  },
  helpCenter: {
    en: "Help Center",
    tok: "Help Ples"
  },
  contactUs: {
    en: "Contact Us",
    tok: "Tok long Mipela"
  },
  returnPolicy: {
    en: "Return Policy",
    tok: "Bekim Polis"
  },
  shippingInfo: {
    en: "Shipping Info",
    tok: "Salim Infomesen"
  },
  
  // Footer - About LinkPNG
  aboutLinkpng: {
    en: "About LinkPNG",
    tok: "Long LinkPNG"
  },
  aboutUs: {
    en: "About Us",
    tok: "Long Mipela"
  },
  careers: {
    en: "Careers", 
    tok: "Wok Ples"
  },
  press: {
    en: "Press",
    tok: "Niuspepa"
  },
  investorRelations: {
    en: "Investor Relations",
    tok: "Investa Stori"
  },
  sustainability: {
    en: "Sustainability",
    tok: "Gutpela Wok"
  },
  
  // Footer - Payment & Delivery
  paymentDelivery: {
    en: "Payment & Delivery",
    tok: "Peim na Salim"
  },
  paymentMethods: {
    en: "Payment Methods",
    tok: "Peim Pasin"
  },
  deliveryPartners: {
    en: "Delivery Partners",
    tok: "Salim Pata"
  },
  
  // Company Description
  companyDescription: {
    en: "Papua New Guinea's premier online marketplace. Shop with confidence, deliver with care.",
    tok: "Nambawan maket ples bilong Papua Niugini. Baim wantaim bel isi, salim wantaim lukaut."
  },
  fairTrade: {
    en: "We're committed to fair trade.",
    tok: "Mipela laik stretpela maket."
  },
  
  // Product Details
  rating: {
    en: "rating",
    tok: "mak"
  },
  reviews: {
    en: "reviews", 
    tok: "tok tok"
  },
  inStock: {
    en: "In Stock",
    tok: "I Gat"
  },
  outOfStock: {
    en: "Out of Stock",
    tok: "Pinis"
  },
  
  // Time & Promotions
  limitedTime: {
    en: "Limited Time Only!",
    tok: "Liklik Taim Tasol!"
  },
  shopNow: {
    en: "Shop Now",
    tok: "Baim Nau"
  },
  specialPrice: {
    en: "Special Price",
    tok: "Spesol Prais"
  },
  
  // Account & Profile
  account: {
    en: "Account",
    tok: "Akaun"
  },
  profile: {
    en: "Profile", 
    tok: "Profail"
  },
  login: {
    en: "Login",
    tok: "Go Insait"
  },
  register: {
    en: "Register",
    tok: "Raitim Nem"
  },
  
  // Notifications & Status
  notifications: {
    en: "Notifications",
    tok: "Toksave"
  },
  success: {
    en: "Success",
    tok: "Orait"
  },
  error: {
    en: "Error", 
    tok: "Rong"
  },
  loading: {
    en: "Loading...",
    tok: "Wetim..."
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