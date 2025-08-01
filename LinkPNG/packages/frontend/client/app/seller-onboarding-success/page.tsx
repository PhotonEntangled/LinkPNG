"use client"

import { CheckCircle, ArrowRight, FileText, MessageCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "../hooks/useApp"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function SellerOnboardingSuccessPage() {
  const { setCurrentPage } = useApp()

  const nextSteps = [
    {
      icon: FileText,
      title: "Identity Verification",
      description: "Our team will review your documents within 24-48 hours",
      status: "In Progress",
      eta: "24-48 hours"
    },
    {
      icon: Settings,
      title: "Account Setup",
      description: "Configure your seller dashboard and preferences",
      status: "Pending",
      eta: "After verification"
    },
    {
      icon: MessageCircle,
      title: "Welcome Call",
      description: "Optional 15-minute call to help you get started",
      status: "Pending",
      eta: "After approval"
    }
  ]

  const sellerResources = [
    {
      title: "Seller Handbook",
      description: "Complete guide to selling on LinkPNG",
      action: "Download PDF"
    },
    {
      title: "PNG Logistics Guide",
      description: "How shipping works across PNG provinces",
      action: "Read Guide"
    },
    {
      title: "Product Photography Tips",
      description: "Take better photos to increase sales",
      action: "Watch Video"
    },
    {
      title: "Seller Community",
      description: "Connect with other PNG entrepreneurs",
      action: "Join Group"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Registration Submitted Successfully!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for choosing LinkPNG to grow your business. We're excited to have you join our community of PNG entrepreneurs.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800">
                <strong>What's Next?</strong> We'll review your application and verify your identity. 
                You'll receive an email confirmation within 24-48 hours.
              </p>
            </div>
          </div>

          {/* Next Steps Timeline */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Onboarding Progress</h2>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === "In Progress" 
                          ? "bg-blue-100 text-blue-600" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          step.status === "In Progress" ? "text-blue-600" : "text-gray-500"
                        }`}>
                          {step.status}
                        </div>
                        <div className="text-xs text-gray-500">{step.eta}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Seller Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Get Ready to Sell</h2>
            <p className="text-gray-600 mb-6">
              While we process your application, explore these resources to prepare for success on LinkPNG.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sellerResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm">
                      {resource.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Need Help Getting Started?</h3>
              <p className="text-gray-600 mb-6">
                Our seller support team is here to help you succeed. Contact us if you have any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline">
                  Email: sellers@linkpng.com
                </Button>
                <Button variant="outline">
                  Call: +675 123 SELL (7355)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              onClick={() => setCurrentPage("home")}
              variant="outline"
              size="lg"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={() => window.open("mailto:sellers@linkpng.com")}
              size="lg"
            >
              Contact Seller Support
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}