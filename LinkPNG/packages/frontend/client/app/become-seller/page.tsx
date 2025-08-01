"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Users, TrendingUp, Globe, Shield, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "../hooks/useApp"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function BecomeSellerPage() {
  const { setCurrentPage } = useApp()

  const benefits = [
    {
      icon: Globe,
      title: "Reach All of PNG",
      description: "Access customers from Port Moresby to Mount Hagen, across all 22 provinces"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Professional tools to manage inventory, track sales, and expand your reach"
    },
    {
      icon: Shield,
      title: "Trusted Marketplace",
      description: "LinkPNG's Trust Score system builds customer confidence in your products"
    },
    {
      icon: Banknote,
      title: "Easy Payments",
      description: "Get paid via bank transfer, BSP, or mobile money (MiCash/Cellmoni)"
    }
  ]

  const sellerStories = [
    {
      name: "Maria from Western Highlands",
      business: "Traditional Bilum Bags",
      story: "Increased sales by 300% selling authentic Highland bilums nationwide",
      image: "/images/products/bilum-highlands.svg"
    },
    {
      name: "John from Morobe",
      business: "PNG Coffee Roaster", 
      story: "Now shipping premium PNG coffee to customers across the Pacific",
      image: "/images/products/highlands-coffee.svg"
    },
    {
      name: "Sarah from East Sepik",
      business: "Traditional Wood Carvings",
      story: "Preserving PNG culture while building a sustainable business online",
      image: "/images/products/sepik-carving.svg"
    }
  ]

  const requirements = [
    "PNG National ID or valid passport",
    "Mobile phone number for verification", 
    "Bank account or mobile money account",
    "Products that comply with PNG regulations",
    "Commitment to quality and customer service"
  ]

  const handleStartSelling = () => {
    setCurrentPage("seller-registration")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Turn Your PNG Business Into Success
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of PNG entrepreneurs selling across all 22 provinces. 
              From traditional crafts to modern products - grow your business with LinkPNG.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={handleStartSelling}
                data-action="start-registration"
              >
                Start Selling Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
              >
                Watch Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell on LinkPNG */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Sell on LinkPNG?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building PNG's largest marketplace to connect local businesses with customers nationwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">PNG Entrepreneurs Growing with LinkPNG</h2>
            <p className="text-lg text-gray-600">Real stories from real sellers across Papua New Guinea</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sellerStories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img 
                    src={story.image} 
                    alt={story.business}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{story.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{story.business}</p>
                  <p className="text-gray-600 italic">"{story.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Start Selling</h2>
            <p className="text-lg text-gray-600">Simple steps to get your PNG business online</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-bold mb-2">Sign Up</h3>
                <p className="text-sm text-gray-600">Create your seller account with your PNG ID</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-bold mb-2">Verify Identity</h3>
                <p className="text-sm text-gray-600">Upload your PNG National ID for verification</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-bold mb-2">List Products</h3>
                <p className="text-sm text-gray-600">Add your first product with photos and details</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-bold mb-2">Start Selling</h3>
                <p className="text-sm text-gray-600">Receive orders and grow your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Requirements to Sell</h2>
              <p className="text-lg text-gray-600">Make sure you have everything needed to start selling</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join PNG's Premier Marketplace?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your seller journey today and reach customers across all of Papua New Guinea
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleStartSelling}
              data-action="start-registration"
            >
              Begin Seller Registration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
            >
              Download Seller Guide
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}