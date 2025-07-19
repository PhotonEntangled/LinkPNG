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
  // Language Names
  english: {
    en: "English",
    tok: "English"
  },
  tokPisin: {
    en: "tokPisin",
    tok: "tokPisin"
  },

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

  // Banner/Carousel Translations
  flashSaleBanner: {
    en: "Flash Sale 50% OFF",
    tok: "Kwik Sel 50% Daunim"
  },
  flashSaleBannerSubtitle: {
    en: "Limited Time Only!",
    tok: "Liklik Taim Tasol!"
  },
  freeShippingBanner: {
    en: "Free Shipping Nationwide",
    tok: "Salim Nating long Olgeta Ples"
  },
  freeShippingBannerSubtitle: {
    en: "Orders over K50",
    tok: "Oda antap long K50"
  },
  newArrivalsBanner: {
    en: "New Arrivals Daily",
    tok: "Nupela Samting Olgeta De"
  },
  newArrivalsBannerSubtitle: {
    en: "Fresh products every day",
    tok: "Nupela samting olgeta de"
  },
  
  // Product Name Translations
  wirelessHeadphones: {
    en: "Wireless Bluetooth Headphones",
    tok: "Wireless Bluetooth Iers"
  },
  smartPhoneCase: {
    en: "Smart Phone Case",
    tok: "Smart Fon Keva"
  },
  usbFastCharger: {
    en: "USB Fast Charger",
    tok: "USB Kwik Chaja"
  },
  bluetoothSpeaker: {
    en: "Bluetooth Speaker",
    tok: "Bluetooth Spika"
  },
  organicCoconutOil: {
    en: "Organic Coconut Oil 500ml",
    tok: "Coconut Wel 500ml"
  },
  traditionalBilumBag: {
    en: "Traditional Bilum Bag",
    tok: "Tru Bilum Bek"
  },
  pngCoffeeMugSet: {
    en: "PNG Coffee Mug Set",
    tok: "PNG Kofi Kap Set"
  },
  handcarvedMask: {
    en: "Hand-carved Traditional Mask",
    tok: "Han Wokim Mask"
  },
  premiumCoffeeBeans: {
    en: "Premium Coffee Beans 1kg",
    tok: "Nambawan Kopi Bin 1kg"
  },
  singsingSarongWrap: {
    en: "Sing-sing Sarong Wrap",
    tok: "Singsing Lap-lap Klos"
  },
  bambooKitchenSet: {
    en: "Bamboo Kitchen Set",
    tok: "Bambu Kuk Set"
  },
  pngHoneyJar: {
    en: "PNG Honey Jar 250ml",
    tok: "PNG Hani Botol 250ml"
  },

  // Cart Page Translations
  continueShopping: {
    en: "Continue Shopping",
    tok: "Go On Wantaim Baim"
  },
  shoppingCart: {
    en: "Shopping Cart",
    tok: "Baim Basket"
  },
  selectAll: {
    en: "Select All",
    tok: "Makim Olgeta"
  },
  items: {
    en: "items",
    tok: "samting"
  },
  by: {
    en: "by",
    tok: "long"
  },
  yourCartIsEmpty: {
    en: "Your cart is empty",
    tok: "Basket bilong yu i emp"
  },
  addSomeProducts: {
    en: "Add some products to get started!",
    tok: "Putim sampela samting long stat!"
  },
  startShopping: {
    en: "Start Shopping",
    tok: "Stat Baim"
  },
  addFreeShippingMessage: {
    en: "Add for free shipping",
    tok: "Putim moa long salim nating"
  },

  // Checkout Page Translations
  backToCart: {
    en: "Back to Cart",
    tok: "Go Bek long Basket"
  },
  checkout: {
    en: "Checkout",
    tok: "Peim Nau"
  },
  deliveryAddress: {
    en: "Delivery Address",
    tok: "Ples bilong Bringim"
  },
  fullName: {
    en: "Full Name",
    tok: "Ful Nem"
  },
  enterFullName: {
    en: "Enter your full name",
    tok: "Raitim ful nem bilong yu"
  },
  phoneNumber: {
    en: "Phone Number",
    tok: "Namba Fon"
  },
  enterPhoneNumber: {
    en: "+675 XXXX XXXX",
    tok: "+675 XXXX XXXX"
  },
  streetAddress: {
    en: "Street Address",
    tok: "Adres bilong Rot"
  },
  enterCompleteAddress: {
    en: "Enter your complete address",
    tok: "Raitim olgeta adres bilong yu"
  },
  city: {
    en: "City",
    tok: "Taun"
  },
  province: {
    en: "Province",
    tok: "Provins"
  },

  // PNG Mobile Payment System
  pngPaymentMethods: {
    en: "PNG Payment Methods",
    tok: "PNG We bilong Peim"
  },
  pngSelectPaymentMethod: {
    en: "Choose your preferred payment method",
    tok: "Makim we yu laik peim"
  },
  pngTotalAmount: {
    en: "Total Amount",
    tok: "Olgeta Mani"
  },
  paymentProcessingTime: {
    en: "Processing Time",
    tok: "Taim bilong Wokim"
  },
  paymentFees: {
    en: "Fees",
    tok: "Mani bilong Peim"
  },
  paymentAvailable: {
    en: "Available",
    tok: "Gat"
  },
  paymentLimited: {
    en: "Limited",
    tok: "Liklik Tasol"
  },
  paymentUnavailable: {
    en: "Unavailable", 
    tok: "Nogat"
  },
  
  // Payment Method Names & Descriptions
  digicelPaygo: {
    en: "Digicel PayGo",
    tok: "Digicel PayGo"
  },
  digicelPaygoDesc: {
    en: "Papua New Guinea's leading mobile wallet service",
    tok: "Nambawan mobail mani bilong PNG"
  },
  mvilMoney: {
    en: "MVIL Mobile Money",
    tok: "MVIL Mobail Mani"
  },
  mvilMoneyDesc: {
    en: "Secure mobile payments across PNG",
    tok: "Seif mobail peim long olgeta hap bilong PNG"
  },
  bspBank: {
    en: "BSP Bank Transfer",
    tok: "BSP Bank Senisim"
  },
  bspBankDesc: {
    en: "Bank South Pacific online banking",
    tok: "Bank Saut Pasifik onlain banking"
  },
  westpacPng: {
    en: "Westpac PNG",
    tok: "Westpac PNG"
  },
  westpacPngDesc: {
    en: "Secure banking with Westpac PNG",
    tok: "Seif banking wantaim Westpac PNG"
  },
  cashOnDelivery: {
    en: "Cash on Delivery",
    tok: "Peim wantaim Mani taim Deliveri"
  },
  cashOnDeliveryDesc: {
    en: "Pay with cash when your order arrives (urban areas only)",
    tok: "Peim wantaim kesh taim samting i kam (taun hap tasol)"
  },
  storeCashDeposit: {
    en: "Store Cash Deposit",
    tok: "Putim Mani long Stoa"
  },
  storeCashDepositDesc: {
    en: "Deposit cash at any LinkPNG partner store",
    tok: "Putim kesh long eni LinkPNG wantok stoa"
  },

  // Payment Form Fields
  paymentPhoneNumber: {
    en: "Phone Number",
    tok: "Namba bilong Fon"
  },
  mobilePIN: {
    en: "Mobile PIN",
    tok: "Mobail PIN"
  },
  
  // Payment Flow Navigation
  continueToConfirmation: {
    en: "Continue to Confirmation",
    tok: "Go long Strongim"
  },
  confirmPayment: {
    en: "Confirm Payment",
    tok: "Strongim Peim"
  },
  confirmAndPay: {
    en: "Confirm & Pay",
    tok: "Strongim na Peim"
  },
  paymentProcessingMsg: {
    en: "Processing Payment",
    tok: "I Wokim Peim"
  },
  pleaseWait: {
    en: "Please wait while we process your payment...",
    tok: "Wet liklik taim mipela i wokim peim bilong yu..."
  },
  usingPaymentMethodMsg: {
    en: "Using payment method",
    tok: "Usim peim we"
  },

  // Payment Success/Failure Messages
  paymentSuccessful: {
    en: "Payment Successful!",
    tok: "Peim i Gutpela!"
  },
  paymentProcessedSuccessfully: {
    en: "Your payment has been processed successfully.",
    tok: "Peim bilong yu i pinis gut."
  },
  paymentFailed: {
    en: "Payment Failed",
    tok: "Peim i No Gutpela"
  },
  paymentFailedMessage: {
    en: "Sorry, we couldn't process your payment. Please try again.",
    tok: "Sori, mipela no inap wokim peim bilong yu. Traim gen."
  },
  tryAgain: {
    en: "Try Again",
    tok: "Traim Gen"
  },

  // PNG Cities
  portMoresby: {
    en: "Port Moresby",
    tok: "Pot Mosbi"
  },
  lae: {
    en: "Lae",
    tok: "Lae"
  },
  mountHagen: {
    en: "Mount Hagen",
    tok: "Maun Hagen"
  },
  madang: {
    en: "Madang",
    tok: "Madang"
  },
  wewak: {
    en: "Wewak",
    tok: "Wewak"
  },
  
  // PNG Provinces
  nationalCapitalDistrict: {
    en: "National Capital District",
    tok: "Nasonal Kapitol Distrik"
  },
  morobe: {
    en: "Morobe",
    tok: "Morobe"
  },
  westernHighlands: {
    en: "Western Highlands",
    tok: "Westen Hailans"
  },
  eastSepik: {
    en: "East Sepik",
    tok: "Is Sepik"
  },
  
  paymentMethod: {
    en: "Payment Method",
    tok: "Pasin bilong Peim"
  },
  mobileMoney: {
    en: "Mobile Money",
    tok: "Fon Moni"
  },
  payWithMobileMoney: {
    en: "Pay with Digicel, Bmobile, or other mobile wallets",
    tok: "Peim wantaim Digicel, Bmobile, o narapela fon moni"
  },
  creditDebitCard: {
    en: "Credit/Debit Card",
    tok: "Kredit/Debit Kat"
  },
  visaMastercardEtc: {
    en: "Visa, Mastercard, and other major cards",
    tok: "Visa, Mastercard, na narapela bikpela kat"
  },
  cashOnDelivery: {
    en: "Cash on Delivery",
    tok: "Peim Taim Kisim"
  },
  payWhenOrderArrives: {
    en: "Pay when your order arrives",
    tok: "Peim taim oda i kam"
  },
  qty: {
    en: "Qty",
    tok: "Hamas"
  },
  price: {
    en: "Price",
    tok: "Prais"
  },
  freeLabel: {
    en: "FREE",
    tok: "NATING"
  },
  placeOrder: {
    en: "Place Order",
    tok: "Mekim Oda"
  },
  termsOfServiceAndPrivacyPolicy: {
    en: "By placing your order, you agree to our Terms of Service and Privacy Policy",
    tok: "Taim yu mekim oda, yu orait long ol lo na pasin bilong ples"
  },

  // Confirmation Page Translations
  orderPlaced: {
    en: "Order Placed!",
    tok: "Oda i Pinis!"
  },
  thankYouPurchase: {
    en: "Thank you for your purchase. Your order #LPG-2024-001 has been confirmed.",
    tok: "Tenkyu long baim. Oda namba #LPG-2024-001 bilong yu i orait pinis."
  },
  trackYourOrder: {
    en: "Track Your Order",
    tok: "Lukim Oda Bilong Yu"
  },

  // Tracking Page Translations
  orderTracking: {
    en: "Order Tracking",
    tok: "Lukim Oda"
  },
  back: {
    en: "Back",
    tok: "Go Bek"
  },
  orderNumber: {
    en: "Order Number",
    tok: "Namba Oda"
  },
  orderDate: {
    en: "Order Date",
    tok: "De bilong Oda"
  },
  estimatedDelivery: {
    en: "Estimated Delivery",
    tok: "Taim bilong Kam"
  },
  trackingNumber: {
    en: "Tracking Number",
    tok: "Namba bilong Lukim"
  },
  orderItems: {
    en: "Order Items",
    tok: "Ol Samting long Oda"
  },
  deliveryDetails: {
    en: "Delivery Details",
    tok: "Stori bilong Bringim"
  },
  contactDriver: {
    en: "Contact Driver",
    tok: "Toktok wantaim Draiva"
  },
  copied: {
    en: "Copied!",
    tok: "Kopi Pinis!"
  },
  copyNumber: {
    en: "Copy number",
    tok: "Kopi namba"
  },
  orderDetails: {
    en: "Order Details",
    tok: "Stori bilong Oda"
  },
  shippingMethod: {
    en: "Shipping Method",
    tok: "Pasin bilong Salim"
  },
  standardDelivery: {
    en: "Standard Delivery",
    tok: "Standa Bringim"
  },
  seller: {
    en: "Seller",
    tok: "Man bilong Salim"
  },
  callCourier: {
    en: "Call Courier",
    tok: "Ringim Kuriar"
  },
  liveChat: {
    en: "Live Chat",
    tok: "Tok Nau"
  },
  getInstantHelp: {
    en: "Get instant help",
    tok: "Kisim help kwik"
  },
  reportIssue: {
    en: "Report Issue",
    tok: "Tokim Hevi"
  },
  orderProblems: {
    en: "Order problems",
    tok: "Hevi long oda"
  },
  orderProgress: {
    en: "Order Progress",
    tok: "Oda i Go"
  },
  deliveryLocation: {
    en: "Delivery Location",
    tok: "Ples bilong Bringim"
  },
  liveTrackingComingSoon: {
    en: "Live tracking map coming soon",
    tok: "Lukim map i kam bihain"
  },
  currentlyInPortMoresbyArea: {
    en: "Currently in Port Moresby area",
    tok: "Nau long Pot Mosbi eria"
  },
  
  // Order Status Translations
  orderPlacedStatus: {
    en: "Order Placed",
    tok: "Oda i Pinis"
  },
  confirmed: {
    en: "Confirmed",
    tok: "Orait"
  },
  processing: {
    en: "Processing",
    tok: "Wokim"
  },
  shipped: {
    en: "Shipped",
    tok: "Salim Pinis"
  },
  outForDelivery: {
    en: "Out for Delivery",
    tok: "Go long Bringim"
  },
  delivered: {
    en: "Delivered",
    tok: "Bringim Pinis"
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
  checkoutButton: {
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
  },

  // MISSING PRODUCT TRANSLATIONS
  solarPowerBank: {
    en: "Solar Power Bank",
    tok: "Solar Paua Bek"
  },
  pngFlagTshirt: {
    en: "PNG Flag T-Shirt",
    tok: "PNG Flag Siot"
  },
  tropicalFruitSnacks: {
    en: "Tropical Fruit Snacks",
    tok: "Tropiko Prut Kaikai"
  },
  handwovenBasket: {
    en: "Handwoven Basket",
    tok: "Han Wokim Basket"
  },

  // MISSING HEADER TRANSLATIONS
  freeShippingPromo: {
    en: "Free Shipping Nationwide",
    tok: "Salim Nating long Olgeta Ples"
  },
  appDownload: {
    en: "Download Our App",
    tok: "Daunim App Bilong Mipela"
  },
  myAccount: {
    en: "My Account",
    tok: "Akaun Bilong Mi"
  },
  categories: {
    en: "Categories",
    tok: "Ol Kain"
  },

  // NAVIGATION MENU ITEMS
  bilumsAndBags: {
    en: "Bilums & Bags",
    tok: "Bilum na Bek"
  },
  carvingsAndArt: {
    en: "Carvings & Art",
    tok: "Wokim na Art"
  },
  pngCoffeeAndFood: {
    en: "PNG Coffee & Food",
    tok: "PNG Kopi na Kaikai"
  },
  localFashion: {
    en: "Local Fashion",
    tok: "Ples Nais Klos"
  },
  traditionalCrafts: {
    en: "Traditional Crafts",
    tok: "Kastom Wokim"
  },

  // PRODUCT DETAIL PAGE TRANSLATIONS
  productNotFound: {
    en: "Product not found",
    tok: "Samting i no stap"
  },
  backToHome: {
    en: "Back to Home",
    tok: "Go Bek long Hom"
  },
  quantity: {
    en: "Quantity:",
    tok: "Hamas:"
  },
  freeShippingToPortMoresby: {
    en: "Free shipping to Port Moresby",
    tok: "Salim nating long Pot Mosbi"
  },
  securePaymentGuaranteed: {
    en: "Secure payment guaranteed",
    tok: "Peim i save pinis"
  },
  sevenDayReturnPolicy: {
    en: "7-day return policy",
    tok: "7-de bekim polis"
  },
  productDetails: {
    en: "Product Details",
    tok: "Stori bilong Samting"
  },
  keyFeatures: {
    en: "Key Features:",
    tok: "Bikpela Samting:"
  },

  // PRODUCT FEATURES
  highQualityMaterials: {
    en: "High quality materials",
    tok: "Gutpela samting bilong wokim"
  },
  fastShippingWithinPng: {
    en: "Fast shipping within PNG",
    tok: "Kwik salim insait long PNG"
  },
  localWarrantySupport: {
    en: "Local warranty support",
    tok: "Ples waranti helpim"
  },
  authenticProductGuarantee: {
    en: "Authentic product guarantee",
    tok: "Tru samting i garantim"
  },

  // SELLER INFO
  linkpngVerifiedSeller: {
    en: "LinkPNG Verified Seller",
    tok: "LinkPNG Mekim Orait Selman"
  },
  followers: {
    en: "followers",
    tok: "ol man i bihainim"
  },

  // TRACKING PAGE MISSING TRANSLATIONS
  needHelp: {
    en: "Need Help?",
    tok: "Yu laik Help?"
  },
  contactCustomerService: {
    en: "Contact Customer Service",
    tok: "Ringim Kastoma Sevis"
  },
  viewOrderDetails: {
    en: "View Order Details",
    tok: "Lukim Oda Infomesen"
  },
  returnRefundRequest: {
    en: "Return/Refund Request",
    tok: "Strongim o Bekim Mani"
  },

  // AUTHENTIC PNG PRODUCT TRANSLATIONS
  // Traditional Crafts
  bilumBagHighlands: {
    en: "Traditional Bilum Bag - Highlands Style",
    tok: "Tru Bilum Bek - Hailans Stil"
  },
  sepikWoodCarving: {
    en: "Sepik River Wood Carving - Crocodile Spirit",
    tok: "Sepik Riba Wud Karim - Pukpuk Spirit"
  },
  manusShellJewelry: {
    en: "Traditional Shell Jewelry Set - Manus",
    tok: "Tru Sel Bikpela Set - Manus"
  },
  oroTapaCloth: {
    en: "Tapa Cloth Wall Hanging - Oro Style",
    tok: "Tapa Klos Hangim - Oro Stil"
  },
  kunduDrumMiniature: {
    en: "Kundu Drum Miniature - Decorative",
    tok: "Smol Kundu Dram - Bilong Makim"
  },
  traditionalClayPot: {
    en: "Traditional Clay Pot - Pottery Village",
    tok: "Tru Kle Pot - Poteri Vilis"
  },
  gulfWovenMat: {
    en: "Woven Grass Sleeping Mat - Gulf Province",
    tok: "Wovin Gras Mat bilong Slip - Gulf Provins"
  },

  // PNG Coffee
  westernHighlandsCoffee: {
    en: "PNG Arabica Coffee - Western Highlands",
    tok: "PNG Arabika Kofi - Westen Hailans"
  },
  sigriEstateCoffee: {
    en: "Sigri Estate Coffee - Wahgi Valley",
    tok: "Sigri Estate Kofi - Wahgi Valley"
  },
  easternHighlandsCoffee: {
    en: "Eastern Highlands Organic Coffee",
    tok: "Isten Hailans Organik Kofi"
  },

  // Local Foods
  westernSagoFlour: {
    en: "Traditional Sago Flour - Western Province",
    tok: "Tru Sago Flaua - Westen Provins"
  },
  milneBayDriedFish: {
    en: "Dried Fish - Milne Bay Traditional",
    tok: "Drai Pis - Milne Bay Tru"
  },
  morobeTaroChips: {
    en: "Taro Chips - Morobe Style",
    tok: "Taro Sips - Morobe Stil"
  },
  madangWildHoney: {
    en: "Wild Honey - Madang Forest",
    tok: "Bus Hani - Madang Pores"
  },
  pngSpicesMix: {
    en: "PNG Spices Mix - Traditional Recipe",
    tok: "PNG Spais Miksim - Tru Resipe"
  },

  // PNG Fashion & Modern Items
  traditionalPatternsLaptop: {
    en: "Traditional Patterns Laptop Bag",
    tok: "Tru Pasin Laptop Bek"
  },
  bougainvilleCoconutSoap: {
    en: "Coconut Oil Soap - Bougainville Natural",
    tok: "Kokonas Wel Sop - Bugenvil Natura"
  },
  birdOfParadiseArt: {
    en: "Bird of Paradise Artwork - Digital Print",
    tok: "Pisin Bilong Paradais Piksa - Dijital Print"
  },
  pngIndependenceTshirt: {
    en: "PNG Independence T-Shirt Collection",
    tok: "PNG Fridom Siot Koleksen"
  },

  // Product Categories

  pngCoffee: {
    en: "PNG Coffee",
    tok: "PNG Kofi"
  },
  localFoods: {
    en: "Local Foods",
    tok: "Ples Kaikai"
  },
  pngFashion: {
    en: "PNG Fashion",
    tok: "PNG Fasin"
  },
  modernPng: {
    en: "Modern PNG",
    tok: "Nupela PNG"
  },

  // Voice Search functionality
  startVoiceSearch: {
    en: "Start voice search",
    tok: "Statim vois painim"
  },
  stopVoiceSearch: {
    en: "Stop voice search",
    tok: "Stopim vois painim"
  },

  // Interactive Zone Section  
  gamificationZone: {
    en: "PNG Interactive Zone",
    tok: "PNG Ples bilong Pleipla"
  },
  gamificationDescription: {
    en: "Traditional PNG culture meets modern rewards - play authentic games and earn exclusive prizes!",
    tok: "Tru PNG kastom i mitim nupela prais - pla tru geim na kisim sipesol gif!"
  },

  // Gamification Features - Spin the Kundu
  spinTheKundu: {
    en: "Spin the Kundu",
    tok: "Winim Kundu"
  },
  spinKunduDescription: {
    en: "Traditional drum meets modern prizes - spin for authentic PNG rewards!",
    tok: "Tru kundu i mitim nupela gris - winim bilong kisim PNG prais!"
  },
  spinsRemaining: {
    en: "Spins Remaining",
    tok: "Wain i Stap"
  },
  spinning: {
    en: "Spinning",
    tok: "I Winim"
  },
  spinNow: {
    en: "Spin Now",
    tok: "Winim Nau"
  },
  noSpinsRemaining: {
    en: "No Spins Left",
    tok: "Nogat Wain"
  },
  congratulations: {
    en: "Congratulations!",
    tok: "Amamas!"
  },
  prizeAddedToAccount: {
    en: "Prize added to your account",
    tok: "Prais i go long akaun bilong yu"
  },
  dailySpinLimit: {
    en: "3 spins per day - resets at midnight PNG time",
    tok: "3 taim wain long de - kamap gen long mitanait PNG taim"
  },
  traditionMeetsInnovation: {
    en: "Where tradition meets innovation 🇵🇬",
    tok: "Ples kastom i mitim nupela samting 🇵🇬"
  },

  // Prize Names for Spin the Kundu
  freeShippingOuterProvince: {
    en: "Free Shipping to Outer Provinces",
    tok: "Fri Karim i Go Long Ausait Provins"
  },
  discountTraditionalCrafts: {
    en: "20% Off Traditional Crafts",
    tok: "20% Less Long Tru Samting"
  },
  pngCoffeeDiscount: {
    en: "15% Off PNG Coffee",
    tok: "15% Less Long PNG Kofi"
  },
  loyaltyPointsBonus: {
    en: "500 Bonus Loyalty Points",
    tok: "500 Bonus Laialty Point"
  },
  nextOrderDiscount: {
    en: "K10 Off Next Order",
    tok: "K10 Less Long Nekst Oda"
  },
  grandPrize: {
    en: "Free Traditional Bilum Bag",
    tok: "Fri Tru Bilum Bek"
  },

  // Provincial Challenge Features
  provincialChallenge: {
    en: "PNG Provincial Challenge",
    tok: "PNG Provins Salenj"
  },
  provincialChallengeDescription: {
    en: "Explore authentic products from each province and earn rewards!",
    tok: "Lukautim tru samting long olgeta provins na kisim prais!"
  },
  totalScore: {
    en: "Total Score",
    tok: "Olgeta Mak"
  },
  provincesCompleted: {
    en: "Provinces Completed",
    tok: "Provins i Pinis"
  },
  challengeProgress: {
    en: "Progress",
    tok: "Wikim"
  },
  challengePoints: {
    en: "points",
    tok: "point"
  },
  easyDifficulty: {
    en: "Easy",
    tok: "Isi"
  },
  mediumDifficulty: {
    en: "Medium", 
    tok: "Namel"
  },
  hardDifficulty: {
    en: "Hard",
    tok: "Hat"
  },
  difficulty: {
    en: "Difficulty",
    tok: "Hat o Nogat"
  },
  challenge: {
    en: "Challenge",
    tok: "Salenj"
  },
  reward: {
    en: "Reward", 
    tok: "Prais"
  },
  shopNow: {
    en: "Shop Now",
    tok: "Baim Nau"
  },
  challengeRewardsInfo: {
    en: "Complete challenges to unlock new provinces and earn exclusive rewards",
    tok: "Pinisim salenj bilong openim nupela provins na kisim prais"
  },

  // Province Challenges
  westernHighlandsChallenge: {
    en: "Purchase 3 coffee items from Western Highlands",
    tok: "Baim 3 kofi samting long Westen Hailans"
  },
  eastSepikChallenge: {
    en: "Buy 2 traditional crafts from East Sepik", 
    tok: "Baim 2 tru wokim samting long Is Sepik"
  },
  manusChallenge: {
    en: "Collect 4 items from Manus Province",
    tok: "Bungim 4 samting long Manus Provins"
  },
  madangChallenge: {
    en: "Try 3 natural products from Madang",
    tok: "Traim 3 natura samting long Madang"
  },
  oroChallenge: {
    en: "Purchase 2 authentic tapa cloth items",
    tok: "Baim 2 tru tapa klos samting"
  },
  bougainvilleChallenge: {
    en: "Complete the Bougainville collection (5 items)",
    tok: "Pinisim Bugenvil koleksen (5 samting)"
  },

  // Province Rewards
  westernHighlandsReward: {
    en: "15% off next coffee order + Coffee Expert badge",
    tok: "15% less long nekst kofi oda + Kofi Ekspat bei"
  },
  eastSepikReward: {
    en: "Free shipping + Craft Collector badge",
    tok: "Fri karim + Wokim Samting Kolekta bei"
  },
  manusReward: {
    en: "K20 voucher + Island Explorer badge",
    tok: "K20 baucher + Ailan Explora bei"
  },
  madangReward: {
    en: "Honey jar gift + Nature Lover badge",
    tok: "Hani paia gif + Natura Lava bei"
  },
  oroReward: {
    en: "Tapa cloth sample + Cultural Heritage badge",
    tok: "Tapa klos sampel + Kulcha Heritis bei"
  },
  bougainvilleReward: {
    en: "Coconut product set + Island Champion badge",
    tok: "Kokonas samting set + Ailan Jampion bei"
  },

  // Games Page Translations
  games: {
    en: "Games",
    tok: "Geim"
  },
  gamesAvailable: {
    en: "Games Available",
    tok: "Geim i Stap"
  },
  totalPrizes: {
    en: "Total Prizes",
    tok: "Olgeta Prais"
  },
  provincesToExplore: {
    en: "Provinces to Explore",
    tok: "Provins bilong Lukim"
  },
  yourPoints: {
    en: "Your Points",
    tok: "Poin bilong Yu"
  },
  moreGamesComing: {
    en: "More Games Coming Soon",
    tok: "Planti Geim Bai Kam"
  },
  luckySixes: {
    en: "Lucky Sixes",
    tok: "Laki Sikis"
  },
  dailyChallenge: {
    en: "Daily Challenge",
    tok: "Olgeta De Chalenj"
  },
  pricePrediction: {
    en: "Price Prediction",
    tok: "Prais Praim"
  },
  leaderboard: {
    en: "Leaderboard",
    tok: "Nambawan List"
  },
  comingSoon: {
    en: "Coming Soon",
    tok: "Bai Kam"
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