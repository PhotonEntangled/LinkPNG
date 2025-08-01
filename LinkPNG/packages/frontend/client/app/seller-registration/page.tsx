"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "../hooks/useApp"
import Header from "../components/Header"

export default function SellerRegistrationPage() {
  const { setCurrentPage } = useApp()

  const handleSubmit = () => {
    setCurrentPage("seller-onboarding-success")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Seller Registration</h1>
            <p className="text-gray-600">Join PNG's premier marketplace</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@gmail.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+675 7xxx xxxx" />
                </div>
                <div>
                  <Label htmlFor="shop">Shop Name</Label>
                  <Input id="shop" placeholder="Your shop name" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button onClick={handleSubmit} size="lg">
              Complete Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}