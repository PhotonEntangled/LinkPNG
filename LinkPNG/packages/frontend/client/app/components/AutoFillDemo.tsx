"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Eye, EyeOff } from "lucide-react"

// Demo data for auto-filling forms
const AUTO_FILL_DATA = {
  seller: {
    sellerType: "individual",
    fullName: "Maria Kerenga",
    businessName: "Highland Crafts PNG",
    email: "maria.kerenga@gmail.com",
    phone: "+675 7123 4567",
    emailCode: "123456",
    phoneCode: "789012",
    province: "Western Highlands",
    shopName: "Maria's Traditional Bilums",
    shopDescription: "Authentic handwoven bilum bags from the Western Highlands, passed down through generations. Each piece tells a story of PNG's rich cultural heritage.",
    payoutMethod: "micash",
    accountNumber: "70123456"
  },
  product: {
    name: "Traditional Highland Bilum",
    description: "Handwoven traditional bilum bag from Western Highlands. Made with natural fibers and traditional techniques passed down through generations.",
    price: "85.00",
    category: "traditional-crafts",
    inventory: "25",
    province: "Western Highlands"
  },
  buyer: {
    fullName: "John Temu",
    email: "john.temu@gmail.com",
    phone: "+675 7987 6543",
    address: "Section 4, Gerehu",
    city: "Port Moresby",
    province: "National Capital District",
    postalCode: "111"
  }
}

interface AutoFillDemoProps {
  visible?: boolean
}

export default function AutoFillDemo({ visible = true }: AutoFillDemoProps) {
  const [isVisible, setIsVisible] = useState(visible)
  const [lastFillTime, setLastFillTime] = useState(0)

  // Global keyboard shortcut (Ctrl+Shift+F)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        event.preventDefault()
        handleAutoFill()
      }
      // Toggle visibility with Ctrl+Shift+V
      if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const fillInput = (selector: string, value: string, delay = 0) => {
    setTimeout(() => {
      const element = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (element) {
        // For inputs and textareas
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.focus()
          element.value = value
          element.dispatchEvent(new Event('input', { bubbles: true }))
          element.dispatchEvent(new Event('change', { bubbles: true }))
        }
        // For select elements  
        else if (element.tagName === 'SELECT') {
          element.value = value
          element.dispatchEvent(new Event('change', { bubbles: true }))
        }
      }
    }, delay)
  }

  const clickElement = (selector: string, delay = 0) => {
    setTimeout(() => {
      const element = document.querySelector(selector) as HTMLElement
      if (element) {
        element.click()
      }
    }, delay)
  }

  const detectPageAndFill = () => {
    const currentPath = window.location.pathname
    const currentPage = getCurrentPage()

    if (currentPage === "seller-registration") {
      fillSellerRegistration()
    } else if (currentPage === "become-seller") {
      // Auto-click "Start Selling Today" button
      clickElement('button:contains("Start Selling Today")', 500)
    } else if (isAddProductModalOpen()) {
      fillAddProductModal()
    } else if (currentPath.includes('checkout')) {
      fillCheckoutForm()
    } else {
      showNotification("🎬 Auto-fill: No forms detected on this page", "info")
    }
  }

  const getCurrentPage = () => {
    // Check if it's a React SPA page by looking for specific elements
    if (document.querySelector('[data-testid="seller-registration"]') || 
        document.querySelector('h1:contains("Seller Registration")')) {
      return "seller-registration"
    }
    if (document.querySelector('h1:contains("Turn Your PNG Business")')) {
      return "become-seller"
    }
    return "unknown"
  }

  const isAddProductModalOpen = () => {
    return document.querySelector('[role="dialog"]') && 
           document.querySelector('input[placeholder*="product name" i]')
  }

  const fillSellerRegistration = () => {
    const data = AUTO_FILL_DATA.seller
    
    // Step 1: Basic Info
    clickElement('div:contains("Individual Seller")', 100)
    fillInput('input[placeholder*="full legal name" i]', data.fullName, 200)
    fillInput('input[type="email"]', data.email, 300)
    fillInput('input[placeholder*="mobile" i]', data.phone, 400)
    
    // Continue to next step
    setTimeout(() => clickElement('button:contains("Continue")', 500), 600)
    
    // Step 2: Verification (auto-fill codes)
    setTimeout(() => {
      fillInput('input[placeholder*="6-digit" i]', data.emailCode, 100)
      clickElement('button:contains("Verify")', 200)
    }, 1200)
    
    setTimeout(() => {
      const phoneCodeInputs = document.querySelectorAll('input[placeholder*="6-digit" i]')
      if (phoneCodeInputs[1]) {
        (phoneCodeInputs[1] as HTMLInputElement).value = data.phoneCode
        phoneCodeInputs[1].dispatchEvent(new Event('input', { bubbles: true }))
      }
      setTimeout(() => clickElement('button:contains("Verify")', 100), 200)
    }, 1800)
    
    // Continue to final step
    setTimeout(() => clickElement('button:contains("Continue")', 100), 2400)
    
    // Step 3: Shop Setup
    setTimeout(() => {
      fillInput('input[placeholder*="shop display name" i]', data.shopName, 100)
      fillInput('textarea[placeholder*="business" i]', data.shopDescription, 200)
      clickElement('div:contains("MiCash")', 300)
      fillInput('input[placeholder*="account number" i]', data.accountNumber, 400)
    }, 3000)
    
    showNotification("🎬 Demo: Seller registration auto-filled!", "success")
  }

  const fillAddProductModal = () => {
    const data = AUTO_FILL_DATA.product
    
    fillInput('input[placeholder*="product name" i]', data.name, 100)
    fillInput('textarea[placeholder*="description" i]', data.description, 200)
    fillInput('input[placeholder*="price" i]', data.price, 300)
    fillInput('input[placeholder*="inventory" i]', data.inventory, 400)
    
    // Select category and province if available
    setTimeout(() => {
      const categorySelect = document.querySelector('select, [role="combobox"]')
      if (categorySelect) {
        clickElement('[role="combobox"]', 100)
        setTimeout(() => clickElement('[role="option"]:contains("Traditional")', 200), 100)
      }
    }, 500)
    
    showNotification("🎬 Demo: Product form auto-filled!", "success")
  }

  const fillCheckoutForm = () => {
    const data = AUTO_FILL_DATA.buyer
    
    fillInput('input[placeholder*="name" i]', data.fullName, 100)
    fillInput('input[type="email"]', data.email, 200)
    fillInput('input[placeholder*="phone" i]', data.phone, 300)
    fillInput('input[placeholder*="address" i]', data.address, 400)
    fillInput('input[placeholder*="city" i]', data.city, 500)
    
    showNotification("🎬 Demo: Checkout form auto-filled!", "success")
  }

  const showNotification = (message: string, type: "success" | "info" = "success") => {
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10B981" : "#3B82F6"};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-size: 14px;
    `
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  const handleAutoFill = () => {
    const now = Date.now()
    if (now - lastFillTime < 1000) return // Prevent spam
    
    setLastFillTime(now)
    detectPageAndFill()
  }

  const toggleVisibility = () => {
    setIsVisible(prev => !prev)
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleVisibility}
          className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-gray-50"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Demo Tools</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleVisibility}
            className="p-1 h-auto"
          >
            <EyeOff className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-2">
          <Button
            size="sm"
            onClick={handleAutoFill}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Zap className="w-3 h-3 mr-2" />
            Auto-Fill Forms
          </Button>
          <div className="text-xs text-gray-500 space-y-1">
            <div>Ctrl+Shift+F: Auto-fill</div>
            <div>Ctrl+Shift+V: Toggle</div>
          </div>
        </div>
      </div>
    </div>
  )
}