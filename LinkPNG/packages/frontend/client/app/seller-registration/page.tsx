"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle, Mail, Smartphone, Building, User } from "lucide-react"
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
  { id: 3, title: "Shop Setup", icon: Building }
]

const PNG_PROVINCES = [
  "Central", "Chimbu", "Eastern Highlands", "East New Britain", "East Sepik",
  "Enga", "Gulf", "Hela", "Jiwaka", "Madang", "Manus", "Milne Bay", "Morobe",
  "National Capital District", "New Ireland", "Northern", "Southern Highlands",
  "Western", "Western Highlands", "West New Britain", "West Sepik"
]

export default function SellerRegistrationPage() {
  const { setCurrentPage } = useApp()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    sellerType: "",
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    emailCode: "",
    emailVerified: false,
    phoneCode: "",
    phoneVerified: false,
    shopName: "",
    shopDescription: "",
    province: "",
    payoutMethod: "",
    accountNumber: "",
  })

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        if (!formData.sellerType || !formData.fullName || !formData.email || !formData.phone) {
          return false
        }
        if (formData.sellerType === "business" && !formData.businessName) {
          return false
        }
        break
      case 2:
        if (!formData.emailVerified || !formData.phoneVerified) {
          return false
        }
        break
      case 3:
        if (!formData.shopName || !formData.shopDescription || !formData.payoutMethod) {
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (!canProceed()) {
      switch (currentStep) {
        case 1:
          toast({
            title: "Information Required",
            description: "Please complete all required fields.",
            variant: "destructive"
          })
          return false
        case 2:
          toast({
            title: "Verification Required",
            description: "Please verify both your email and phone number.",
            variant: "destructive"
          })
          return false
        case 3:
          toast({
            title: "Shop Setup Required",
            description: "Please complete your shop setup.",
            variant: "destructive"
          })
          return false
      }
      return false
    }
    
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSubmit = () => {
    if (!canProceed()) return
    
    toast({
      title: "Registration Submitted!",
      description: "Your seller account is being reviewed. You'll hear from us within 24 hours.",
    })
    console.log("Seller registration data:", formData)
    setCurrentPage("seller-onboarding-success")
  }

  const updateFormData = (updates: any) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const verifyEmailCode = () => {
    if (formData.emailCode === "123456") {
      updateFormData({ emailVerified: true })
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified.",
      })
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your code and try again.",
        variant: "destructive"
      })
    }
  }

  const verifyPhoneCode = () => {
    if (formData.phoneCode === "789012") {
      updateFormData({ phoneVerified: true })
      toast({
        title: "Phone Verified!",
        description: "Your phone number has been successfully verified.",
      })
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your code and try again.",
        variant: "destructive"
      })
    }
  }

  const sendEmailCode = () => {
    toast({
      title: "Code Sent!",
      description: "Verification code sent to your email.",
    })
  }

  const sendPhoneCode = () => {
    toast({
      title: "Code Sent!",
      description: "Verification code sent to your phone.",
    })
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
                  placeholder="Your legal full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="your@email.com"
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
                  placeholder="+675 7123 4567"
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Demo Mode - Use These Codes:</h3>
              <p className="text-sm text-blue-700">Email Code: <strong>123456</strong></p>
              <p className="text-sm text-blue-700">Phone Code: <strong>789012</strong></p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Email Verification</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <Button onClick={sendEmailCode} disabled={formData.emailVerified}>
                    <Mail className="w-4 h-4 mr-2" />
                    {formData.emailVerified ? "Sent" : "Send Code"}
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter 6-digit code"
                    value={formData.emailCode}
                    onChange={(e) => updateFormData({ emailCode: e.target.value })}
                    maxLength={6}
                    disabled={formData.emailVerified}
                  />
                  <Button 
                    onClick={verifyEmailCode}
                    disabled={formData.emailVerified || !formData.emailCode}
                  >
                    {formData.emailVerified ? <CheckCircle className="w-4 h-4 text-green-600" /> : "Verify"}
                  </Button>
                </div>
              </div>

              <div>
                <Label>Phone Verification</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.phone}
                    disabled
                    className="bg-gray-50"
                  />
                  <Button onClick={sendPhoneCode} disabled={formData.phoneVerified}>
                    <Smartphone className="w-4 h-4 mr-2" />
                    {formData.phoneVerified ? "Sent" : "Send Code"}
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter 6-digit code"
                    value={formData.phoneCode}
                    onChange={(e) => updateFormData({ phoneCode: e.target.value })}
                    maxLength={6}
                    disabled={formData.phoneVerified}
                  />
                  <Button 
                    onClick={verifyPhoneCode}
                    disabled={formData.phoneVerified || !formData.phoneCode}
                  >
                    {formData.phoneVerified ? <CheckCircle className="w-4 h-4 text-green-600" /> : "Verify"}
                  </Button>
                </div>
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
              <div>
                <Label htmlFor="province">Province *</Label>
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
            </div>

            <div>
              <Label htmlFor="shopDescription">Shop Description *</Label>
              <Textarea
                id="shopDescription"
                value={formData.shopDescription}
                onChange={(e) => updateFormData({ shopDescription: e.target.value })}
                placeholder="Tell customers about your products and story..."
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium">Preferred Payout Method *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Seller Registration</h1>
            <p className="text-gray-600">Join PNG's premier marketplace and start selling today</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {STEPS.length}</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / STEPS.length) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {STEPS.map((step) => {
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
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === 1) {
                  setCurrentPage("become-seller")
                } else {
                  setCurrentStep(prev => prev - 1)
                }
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? "Back to Info" : "Previous"}
            </Button>
            
            <Button
              onClick={currentStep === STEPS.length ? handleSubmit : handleNext}
              disabled={!canProceed()}
            >
              {currentStep === STEPS.length ? "Complete Registration" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}