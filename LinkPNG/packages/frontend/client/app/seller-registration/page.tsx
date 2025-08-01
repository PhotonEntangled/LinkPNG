"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle, Upload, Building, User, CreditCard, Store, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useApp } from "../hooks/useApp"
import Header from "../components/Header"

const STEPS = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Verification", icon: CheckCircle },
  { id: 3, title: "Shop Setup", icon: Store }
]

const PNG_PROVINCES = [
  "Western Highlands", "Southern Highlands", "Enga", "Hela",
  "Western Province", "Gulf", "Central", "National Capital District",
  "Morobe", "Eastern Highlands", "Madang", "East Sepik", "West Sepik",
  "Manus", "East New Britain", "West New Britain", "New Ireland", "Bougainville"
]

export default function SellerRegistrationPage() {
  const { setCurrentPage } = useApp()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    sellerType: "",
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    idNumber: "",
    province: "",
    shopName: "",
    shopDescription: "",
    payoutMethod: "",
    accountNumber: ""
  })

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
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
        break
      case 2:
        if (!formData.idNumber || !formData.province) {
          toast({
            title: "Verification Required",
            description: "Please provide your ID and province.",
            variant: "destructive"
          })
          return false
        }
        break
      case 3:
        if (!formData.shopName || !formData.shopDescription || !formData.payoutMethod) {
          toast({
            title: "Shop Setup Required",
            description: "Please complete your shop setup.",
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
    console.log("Seller registration data:", formData)
    setCurrentPage("seller-onboarding-success")
  }

  const updateFormData = (updates: any) => {
    setFormData(prev => ({ ...prev, ...updates }))
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
                    <p className="text-sm text-gray-600 mt-1">Perfect for personal businesses and crafts</p>
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
            <div>
              <Label htmlFor="idNumber">PNG National ID Number *</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => updateFormData({ idNumber: e.target.value })}
                placeholder="Enter your NID number"
              />
            </div>

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
              <Label>Upload ID Document</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload clear photo of your National ID</p>
                <Button variant="outline" className="mt-2">Choose File</Button>
              </div>
            </div>
          </div>
        )

      case 3:
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
            </div>

            <div>
              <Label htmlFor="shopDescription">Shop Description *</Label>
              <Textarea
                id="shopDescription"
                value={formData.shopDescription}
                onChange={(e) => updateFormData({ shopDescription: e.target.value })}
                placeholder="Tell customers about your business..."
                rows={4}
              />
            </div>

            <div>
              <Label>Payment Method *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {[
                  { id: "bank", name: "Bank Transfer", desc: "BSP, ANZ, Westpac" },
                  { id: "micash", name: "MiCash", desc: "Digicel mobile money" },
                  { id: "cellmoni", name: "CellMoni", desc: "Bemobile mobile money" }
                ].map(method => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all ${formData.payoutMethod === method.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
                    onClick={() => updateFormData({ payoutMethod: method.id })}
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

            {formData.payoutMethod && (
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                  placeholder="Your account number"
                />
              </div>
            )}
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
              
              return (
                <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted
                      ? "bg-green-500 text-white" 
                      : isActive 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-600"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs text-center ${isActive ? "font-medium" : "text-gray-600"}`}>
                    {step.title}
                  </span>
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