"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle, Upload, Settings, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Header from "../components/Header"

const ONBOARDING_STEPS = [
  { id: 4, title: "Shop Setup", icon: Store },
  { id: 5, title: "First Product", icon: Upload },
  { id: 6, title: "Configuration", icon: Settings }
]

const PNG_PROVINCES = [
  "Central", "Chimbu", "Eastern Highlands", "East New Britain", "East Sepik",
  "Enga", "Gulf", "Hela", "Jiwaka", "Madang", "Manus", "Milne Bay", "Morobe",
  "National Capital District", "New Ireland", "Northern", "Southern Highlands",
  "Western", "Western Highlands", "West New Britain", "West Sepik"
]

const PRODUCT_CATEGORIES = [
  "Traditional Crafts", "PNG Coffee & Food", "Local Fashion", 
  "Personal Care", "Modern PNG", "Bilums & Bags"
]

export default function SellerOnboardingWizard() {
  const { toast } = useToast()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(4) // Start at step 4
  const [formData, setFormData] = useState({
    // Shop Setup (Step 4)
    businessName: "",
    shopDescription: "",
    logoFile: null as File | null,
    
    // First Product (Step 5)  
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productImage: null as File | null,
    
    // Configuration (Step 6)
    bankName: "",
    accountNumber: "",
    shippingRate: "",
    returnPolicy: "",
    termsOfService: ""
  })

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 4:
        return formData.businessName && formData.shopDescription
      case 5:
        return formData.productName && formData.productDescription && 
               formData.productPrice && formData.productCategory
      case 6:
        return formData.bankName && formData.accountNumber && formData.shippingRate
      default:
        return false
    }
  }

  const handleNext = () => {
    if (!canProceed()) {
      toast({
        title: "Information Required",
        description: "Please complete all required fields before continuing.",
        variant: "destructive"
      })
      return
    }

    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1)
      // Success toast for each step
      toast({
        title: `Step ${currentStep} Complete!`,
        description: `${ONBOARDING_STEPS[currentStep - 4].title} information saved successfully.`
      })
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 4) {
      setCurrentStep(prev => prev - 1)
    } else {
      router.push("/seller-registration")
    }
  }

  const handleComplete = () => {
    // Simulate saving all data
    toast({
      title: "🎉 Shop Setup Complete!",
      description: "Welcome to LinkPNG! Your seller account is ready for business."
    })

    // Simulate brief loading before redirect
    setTimeout(() => {
      router.push("/seller")
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 4:
        return <ShopSetupStep formData={formData} updateFormData={updateFormData} />
      case 5:
        return <ProductUploadStep formData={formData} updateFormData={updateFormData} />
      case 6:
        return <ShopConfigStep formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Shop Setup</h1>
            <p className="text-gray-600">Just a few more steps to get your shop ready!</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of 6</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 6) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / 6) * 100} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {ONBOARDING_STEPS.map((step) => {
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-sm font-medium text-center ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 4 ? "Back to Registration" : "Previous"}
            </Button>
            
            <Button onClick={handleNext} disabled={!canProceed()}>
              {currentStep === 6 ? "Complete Setup" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4: Shop Setup Component
function ShopSetupStep({ formData, updateFormData }: {
  formData: any
  updateFormData: (updates: any) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Setup Your Shop</h2>
        <p className="text-gray-600 mb-6">Tell customers about your business and upload your logo.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            data-testid="shop-name-input"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="Your Shop Name"
          />
        </div>

        <div>
          <Label htmlFor="shopDescription">Shop Description *</Label>
          <Textarea
            id="shopDescription"
            data-testid="shop-description-input"
            value={formData.shopDescription}
            onChange={(e) => updateFormData({ shopDescription: e.target.value })}
            placeholder="Tell customers about your business, products, and what makes you special..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="logoUpload">Shop Logo (Optional)</Label>
          <Input
            id="logoUpload"
            type="file"
            accept="image/*"
            data-testid="logo-upload-input"
            onChange={(e) => updateFormData({ logoFile: e.target.files?.[0] || null })}
          />
          <p className="text-sm text-gray-500 mt-1">Upload a square image for best results (JPG, PNG)</p>
        </div>
      </div>
    </div>
  )
}

// Step 5: Product Upload Component  
function ProductUploadStep({ formData, updateFormData }: {
  formData: any
  updateFormData: (updates: any) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Your First Product</h2>
        <p className="text-gray-600 mb-6">Start with one product to showcase your offerings.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="productName">Product Name *</Label>
            <Input
              id="productName"
              data-testid="product-name-input"
              value={formData.productName}
              onChange={(e) => updateFormData({ productName: e.target.value })}
              placeholder="e.g., Traditional Highland Bilum"
            />
          </div>
          <div>
            <Label htmlFor="productPrice">Price (PGK) *</Label>
            <Input
              id="productPrice"
              type="number"
              data-testid="product-price-input"
              value={formData.productPrice}
              onChange={(e) => updateFormData({ productPrice: e.target.value })}
              placeholder="150"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="productCategory">Category *</Label>
          <Select
            value={formData.productCategory}
            onValueChange={(value) => updateFormData({ productCategory: value })}
          >
            <SelectTrigger data-testid="product-category-select">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="productDescription">Product Description *</Label>
          <Textarea
            id="productDescription"
            data-testid="product-description-input"
            value={formData.productDescription}
            onChange={(e) => updateFormData({ productDescription: e.target.value })}
            placeholder="Describe your product, its materials, size, and what makes it special..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="productImage">Product Image (Optional)</Label>
          <Input
            id="productImage"
            type="file"
            accept="image/*"
            data-testid="product-image-input"
            onChange={(e) => updateFormData({ productImage: e.target.files?.[0] || null })}
          />
        </div>
      </div>
    </div>
  )
}

// Step 6: Shop Configuration Component
function ShopConfigStep({ formData, updateFormData }: {
  formData: any
  updateFormData: (updates: any) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Final Configuration</h2>
        <p className="text-gray-600 mb-6">Set up payments, shipping, and shop policies.</p>
      </div>

      <div className="space-y-6">
        {/* Payment Details */}
        <div>
          <h3 className="font-medium mb-3">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                data-testid="bank-name-input"
                value={formData.bankName}
                onChange={(e) => updateFormData({ bankName: e.target.value })}
                placeholder="Bank South Pacific"
              />
            </div>
            <div>
              <Label htmlFor="configAccountNumber">Account Number *</Label>
              <Input
                id="configAccountNumber"
                data-testid="account-number-input"
                value={formData.accountNumber}
                onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                placeholder="1234567890"
              />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h3 className="font-medium mb-3">Shipping</h3>
          <div>
            <Label htmlFor="shippingRate">Flat Shipping Rate (PGK) *</Label>
            <Input
              id="shippingRate"
              type="number"
              data-testid="shipping-rate-input"
              value={formData.shippingRate}
              onChange={(e) => updateFormData({ shippingRate: e.target.value })}
              placeholder="15"
            />
            <p className="text-sm text-gray-500 mt-1">Set a single shipping rate for all PNG deliveries</p>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-medium mb-3">Shop Policies</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="returnPolicy">Return Policy</Label>
              <Textarea
                id="returnPolicy"
                data-testid="return-policy-input"
                value={formData.returnPolicy}
                onChange={(e) => updateFormData({ returnPolicy: e.target.value })}
                placeholder="e.g., Returns accepted within 7 days if item is unused..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="termsOfService">Terms of Service</Label>
              <Textarea
                id="termsOfService"
                data-testid="terms-service-input"
                value={formData.termsOfService}
                onChange={(e) => updateFormData({ termsOfService: e.target.value })}
                placeholder="e.g., All sales are final unless item is damaged..."
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}