"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle, Upload, AlertCircle, Building, User, CreditCard, Store, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useApp } from "../hooks/useApp"
import Header from "../components/Header"

interface RegistrationData {
  // Step 1: Seller Type & Basic Info
  sellerType: "individual" | "business" | ""
  fullName: string
  businessName: string
  email: string
  phone: string
  
  // Step 2: Identity Verification
  idType: "nid" | "passport" | ""
  idNumber: string
  idPhoto: File | null
  selfiePhoto: File | null
  
  // Step 3: Business Verification (for businesses)
  businessRegNumber: string
  ipaNumber: string
  businessLicense: File | null
  
  // Step 4: Address & Logistics
  pickupAddress: string
  province: string
  city: string
  
  // Step 5: Payout Setup
  payoutMethod: "bank" | "micash" | "cellmoni" | ""
  bankName: string
  accountNumber: string
  accountHolder: string
  
  // Step 6: Shop Profile
  shopName: string
  shopDescription: string
  shopLogo: File | null
  productCategories: string[]
}

const STEPS = [
  { id: 1, title: "Seller Type", icon: User },
  { id: 2, title: "Identity Verification", icon: CheckCircle },
  { id: 3, title: "Business Details", icon: Building },
  { id: 4, title: "Address & Logistics", icon: Package },
  { id: 5, title: "Payment Setup", icon: CreditCard },
  { id: 6, title: "Shop Profile", icon: Store }
]

const PNG_PROVINCES = [
  "Western Highlands", "Southern Highlands", "Enga", "Hela",
  "Western Province", "Gulf", "Central", "National Capital District",
  "Morobe", "Eastern Highlands", "Madang", "East Sepik", "West Sepik",
  "Manus", "East New Britain", "West New Britain", "New Ireland", "Bougainville"
]

const PRODUCT_CATEGORIES = [
  "Traditional Crafts", "PNG Coffee", "Local Foods", "PNG Fashion",
  "Personal Care", "Electronics", "Home & Garden", "Books & Media"
]

export default function SellerRegistrationPage() {
  const { setCurrentPage } = useApp()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationData>({
    sellerType: "",
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    idType: "",
    idNumber: "",
    idPhoto: null,
    selfiePhoto: null,
    businessRegNumber: "",
    ipaNumber: "",
    businessLicense: null,
    pickupAddress: "",
    province: "",
    city: "",
    payoutMethod: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    shopName: "",
    shopDescription: "",
    shopLogo: null,
    productCategories: []
  })

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === 2 && formData.sellerType === "individual") {
        // Skip business verification for individuals
        setCurrentStep(4)
      } else if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep === 4 && formData.sellerType === "individual") {
      // Skip business verification when going back
      setCurrentStep(2)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.sellerType || !formData.fullName || !formData.email || !formData.phone) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive"
          })
          return false
        }
        if (formData.sellerType === "business" && !formData.businessName) {
          toast({
            title: "Business Name Required",
            description: "Please enter your business name.",
            variant: "destructive"
          })
          return false
        }
        break
      case 2:
        if (!formData.idType || !formData.idNumber) {
          toast({
            title: "ID Verification Required",
            description: "Please provide your identification details.",
            variant: "destructive"
          })
          return false
        }
        break
      case 3:
        if (formData.sellerType === "business" && !formData.businessRegNumber) {
          toast({
            title: "Business Registration Required",
            description: "Please provide your business registration details.",
            variant: "destructive"
          })
          return false
        }
        break
      case 4:
        if (!formData.pickupAddress || !formData.province) {
          toast({
            title: "Address Required",
            description: "Please provide your pickup address and province.",
            variant: "destructive"
          })
          return false
        }
        break
      case 5:
        if (!formData.payoutMethod || !formData.accountNumber) {
          toast({
            title: "Payment Setup Required",
            description: "Please set up your payout method.",
            variant: "destructive"
          })
          return false
        }
        break
      case 6:
        if (!formData.shopName || !formData.shopDescription || formData.productCategories.length === 0) {
          toast({
            title: "Shop Profile Incomplete",
            description: "Please complete your shop profile and select at least one product category.",
            variant: "destructive"
          })
          return false
        }
        break
    }
    return true
  }

  const handleSubmit = () => {
    toast({
      title: "Registration Submitted!",
      description: "Your seller application is being reviewed. You'll receive confirmation within 24-48 hours.",
    })
    // In a real app, this would submit to backend
    console.log("Seller registration data:", formData)
    setCurrentPage("seller-onboarding-success")
  }

  const updateFormData = (updates: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleCategoryToggle = (category: string) => {
    const currentCategories = formData.productCategories
    if (currentCategories.includes(category)) {
      updateFormData({
        productCategories: currentCategories.filter(c => c !== category)
      })
    } else {
      updateFormData({
        productCategories: [...currentCategories, category]
      })
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Are you registering as an individual or business?</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <Card 
                  className={`cursor-pointer transition-all ${formData.sellerType === "individual" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
                  onClick={() => updateFormData({ sellerType: "individual" })}
                >
                  <CardContent className="p-4 text-center">
                    <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">Individual Seller</h3>
                    <p className="text-sm text-gray-600 mt-1">Perfect for personal businesses, crafts, and side hustles</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all ${formData.sellerType === "business" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
                  onClick={() => updateFormData({ sellerType: "business" })}
                >
                  <CardContent className="p-4 text-center">
                    <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">Registered Business</h3>
                    <p className="text-sm text-gray-600 mt-1">For companies registered with PNG IPA</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name (as per ID) *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  placeholder="Enter your full legal name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="your.email@gmail.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">PNG Mobile Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  placeholder="+675 7xxx xxxx"
                />
              </div>
              {formData.sellerType === "business" && (
                <div>
                  <Label htmlFor="businessName">Registered Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateFormData({ businessName: e.target.value })}
                    placeholder="Your Business Name Pty Ltd"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                We need to verify your identity to ensure marketplace security and comply with PNG regulations.
              </AlertDescription>
            </Alert>

            <div>
              <Label>ID Document Type *</Label>
              <Select value={formData.idType} onValueChange={(value: "nid" | "passport") => updateFormData({ idType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nid">PNG National ID Card</SelectItem>
                  <SelectItem value="passport">PNG Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => updateFormData({ idNumber: e.target.value })}
                placeholder={formData.idType === "nid" ? "Enter your NID number" : "Enter passport number"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Upload ID Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload clear photo of your {formData.idType === "nid" ? "National ID" : "passport"}</p>
                  <Button variant="outline" className="mt-2">Choose File</Button>
                </div>
              </div>
              <div>
                <Label>Upload Selfie Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Take a clear selfie holding your ID document</p>
                  <Button variant="outline" className="mt-2">Take Photo</Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <Building className="h-4 w-4" />
              <AlertDescription>
                Provide your PNG business registration details for verification.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessRegNumber">Business Registration Number</Label>
                <Input
                  id="businessRegNumber"
                  value={formData.businessRegNumber}
                  onChange={(e) => updateFormData({ businessRegNumber: e.target.value })}
                  placeholder="Your business registration number"
                />
              </div>
              <div>
                <Label htmlFor="ipaNumber">PNG IPA Number (if applicable)</Label>
                <Input
                  id="ipaNumber"
                  value={formData.ipaNumber}
                  onChange={(e) => updateFormData({ ipaNumber: e.target.value })}
                  placeholder="IPA registration number"
                />
              </div>
            </div>

            <div>
              <Label>Business License/Certificate</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Upload your business registration certificate or license</p>
                <Button variant="outline" className="mt-2">Choose File</Button>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="pickupAddress">Business/Pickup Address *</Label>
              <Textarea
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={(e) => updateFormData({ pickupAddress: e.target.value })}
                placeholder="Enter your complete address where orders will be picked up"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Province *</Label>
                <Select value={formData.province} onValueChange={(value) => updateFormData({ province: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your province" />
                  </SelectTrigger>
                  <SelectContent>
                    {PNG_PROVINCES.map(province => (
                      <SelectItem key={province} value={province}>{province}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">City/Town</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData({ city: e.target.value })}
                  placeholder="Enter your city or town"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>How would you like to receive payments? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {[
                  { id: "bank", name: "Bank Transfer", desc: "BSP, ANZ, Westpac" },
                  { id: "micash", name: "MiCash", desc: "Digicel mobile money" },
                  { id: "cellmoni", name: "CellMoni", desc: "Bemobile mobile money" }
                ].map(method => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all ${formData.payoutMethod === method.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
                    onClick={() => updateFormData({ payoutMethod: method.id as any })}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-xs text-gray-600">{method.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {formData.payoutMethod === "bank" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select value={formData.bankName} onValueChange={(value) => updateFormData({ bankName: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bsp">Bank South Pacific (BSP)</SelectItem>
                      <SelectItem value="anz">ANZ Bank PNG</SelectItem>
                      <SelectItem value="westpac">Westpac Bank PNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                    placeholder="Your bank account number"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="accountHolder">Account Holder Name *</Label>
                  <Input
                    id="accountHolder"
                    value={formData.accountHolder}
                    onChange={(e) => updateFormData({ accountHolder: e.target.value })}
                    placeholder="Name as shown on bank account"
                  />
                </div>
              </div>
            )}

            {(formData.payoutMethod === "micash" || formData.payoutMethod === "cellmoni") && (
              <div>
                <Label htmlFor="mobileAccount">Mobile Money Number *</Label>
                <Input
                  id="mobileAccount"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                  placeholder={`Your ${formData.payoutMethod === "micash" ? "MiCash" : "CellMoni"} registered number`}
                />
              </div>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shopName">Shop Name *</Label>
                <Input
                  id="shopName"
                  value={formData.shopName}
                  onChange={(e) => updateFormData({ shopName: e.target.value })}
                  placeholder="Your shop display name"
                />
              </div>
              <div>
                <Label>Shop Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-600">Upload shop logo</p>
                  <Button variant="outline" size="sm" className="mt-1">Choose</Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="shopDescription">Shop Description *</Label>
              <Textarea
                id="shopDescription"
                value={formData.shopDescription}
                onChange={(e) => updateFormData({ shopDescription: e.target.value })}
                placeholder="Tell customers about your business, what you sell, and what makes you unique..."
                rows={4}
              />
            </div>

            <div>
              <Label>What types of products will you sell? *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                {PRODUCT_CATEGORIES.map(category => (
                  <Badge
                    key={category}
                    variant={formData.productCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer p-2 text-center justify-center"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Seller Registration</h1>
            <p className="text-gray-600">Join PNG's premier marketplace and start selling today</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {STEPS.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="flex justify-between mb-8 overflow-x-auto">
            {STEPS.map((step) => {
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              const isSkipped = step.id === 3 && formData.sellerType === "individual" && currentStep > 3
              
              return (
                <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted || isSkipped
                      ? "bg-green-500 text-white" 
                      : isActive 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-600"
                  }`}>
                    {isCompleted || isSkipped ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs text-center ${isActive ? "font-medium" : "text-gray-600"}`}>
                    {step.title}
                  </span>
                  {isSkipped && <span className="text-xs text-gray-500">(Skipped)</span>}
                </div>
              )
            })}
          </div>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <STEPS[currentStep - 1].icon className="w-5 h-5" />
                {STEPS[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === STEPS.length ? "Complete Registration" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}