"use client"

import { useState } from "react"
import { Plus, TrendingUp, Package, Star, Eye, Edit, Trash2, BarChart3, DollarSign, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import AddProductModal from "@/app/components/AddProductModal"
import ProductActions from "@/app/components/ProductActions"
import { useToast } from "@/components/ui/use-toast"
import { useApp } from "../hooks/useApp"

// Mock seller data
const sellerData = {
  name: "TechGear Pro",
  trustScore: 92,
  totalSales: 15420,
  rating: 4.7,
  totalListings: 45,
  activeListings: 38,
  monthlyRevenue: 12450,
  totalReviews: 3240,
}

const listings = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    status: "active",
    views: 1247,
    sales: 89,
    trustScore: 50,
    stock: 25,
  },
  {
    id: 2,
    name: "USB-C Fast Charger",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop",
    status: "active",
    views: 856,
    sales: 156,
    trustScore: 91,
    stock: 50,
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
    status: "inactive",
    views: 432,
    sales: 23,
    trustScore: 85,
    stock: 0,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
    status: "pending",
    views: 0,
    sales: 0,
    trustScore: 76,
    stock: 15,
  },
]

const recentActivity = [
  { type: "sale", item: "Wireless Bluetooth Headphones", amount: 79.99, time: "2 hours ago" },
  { type: "review", item: "USB-C Fast Charger", rating: 5, time: "4 hours ago" },
  { type: "sale", item: "Wireless Mouse", amount: 34.99, time: "6 hours ago" },
  { type: "listing", item: "New product submitted for review", time: "1 day ago" },
]

function TrustScoreDisplay({ score }: { score: number }) {
  const getScoreData = (score: number) => {
    if (score >= 90)
      return {
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        icon: "🛡️",
      }
    if (score >= 80)
      return {
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        icon: "✅",
      }
    if (score >= 70)
      return {
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        icon: "⚠️",
      }
    return {
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: "❌",
    }
  }

  const scoreData = getScoreData(score)

  return (
    <div className={`text-center p-4 rounded-xl ${scoreData.bgColor}`}>
      <div className="text-2xl mb-2">{scoreData.icon}</div>
      <div className={`text-4xl font-bold ${scoreData.color} mb-1`}>{score}</div>
      <div className="text-sm text-gray-600 mb-3">Trust Score</div>
      <Progress value={score} className="h-2" />
    </div>
  )
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [sellerListings, setSellerListings] = useState(listings)
  const { toast } = useToast()
  const { setCurrentPage } = useApp()

  const handleAddProduct = (productData: any) => {
    // Create new product with proper ID and default values
    const newProduct = {
      id: Math.max(...sellerListings.map(p => p.id)) + 1,
      name: productData.name,
      price: parseFloat(productData.price),
      image: "/images/products/bilum-highlands.svg", // Default image for now
      status: "pending" as const,
      views: 0,
      sales: 0,
      trustScore: 75, // Default trust score for new products
      stock: parseInt(productData.inventory) || 0,
    }

    setSellerListings(prev => [newProduct, ...prev])
    setShowAddProductModal(false)
    
    toast({
      title: "Product Created Successfully!",
      description: `${productData.name} has been added to your listings and is pending review.`,
    })
  }

  const handleEditProduct = (product: any) => {
    // TODO: Open edit modal with pre-filled data
    console.log("Edit product:", product)
  }

  const handleDeleteProduct = (productId: number) => {
    setSellerListings(prev => prev.filter(p => p.id !== productId))
  }

  const handleToggleProductStatus = (productId: number) => {
    setSellerListings(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === "active" ? "inactive" : "active" as const }
        : p
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setCurrentPage("home")}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Seller Dashboard</h1>
              <p className="text-gray-600">Welcome back, {sellerData.name}</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowAddProductModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Trust Score Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrustScoreDisplay score={sellerData.trustScore} />
                </CardContent>
              </Card>

              {/* Revenue Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${sellerData.monthlyRevenue.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              {/* Total Sales Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sellerData.totalSales.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">All time</div>
                </CardContent>
              </Card>

              {/* Active Listings Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sellerData.activeListings}</div>
                  <div className="text-sm text-gray-600">of {sellerData.totalListings} total</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          {activity.type === "sale" && <DollarSign className="w-4 h-4 text-blue-600" />}
                          {activity.type === "review" && <Star className="w-4 h-4 text-yellow-600" />}
                          {activity.type === "listing" && <Package className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{activity.item}</div>
                          <div className="text-xs text-gray-600">{activity.time}</div>
                        </div>
                        {activity.amount && <div className="font-bold text-green-600">+${activity.amount}</div>}
                        {activity.rating && (
                          <div className="flex items-center">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Trust Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Product Quality</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Shipping Speed</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customer Service</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Description Accuracy</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Product Listings</h2>
              <div className="flex gap-2">
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
                <Button onClick={() => setShowAddProductModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {sellerListings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{listing.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>${listing.price}</span>
                          <span>Stock: {listing.stock}</span>
                          <Badge
                            className={
                              listing.status === "active"
                                ? "bg-green-100 text-green-800"
                                : listing.status === "inactive"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Trust Score</div>
                        <div className="font-bold">{listing.trustScore}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Views</div>
                        <div className="font-bold">{listing.views}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Sales</div>
                        <div className="font-bold">{listing.sales}</div>
                      </div>
                      <ProductActions
                        product={listing}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                        onToggleStatus={handleToggleProductStatus}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">K12,450</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38,942</div>
                <p className="text-xs text-muted-foreground">+8.3% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/products/bilum-highlands.svg"
                        alt="Traditional Bilum"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">Traditional Bilum Bag</p>
                        <p className="text-xs text-gray-500">K85.00</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">89 sales</p>
                      <p className="text-xs text-green-600">+15%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/products/highlands-coffee.svg"
                        alt="PNG Coffee"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">PNG Coffee Beans</p>
                        <p className="text-xs text-gray-500">K42.00</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">156 sales</p>
                      <p className="text-xs text-green-600">+22%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/products/kundu-drum.svg"
                        alt="Kundu Drum"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">Traditional Kundu Drum</p>
                        <p className="text-xs text-gray-500">K125.00</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">34 sales</p>
                      <p className="text-xs text-green-600">+8%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Direct</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-24 h-2" />
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Search</span>
                    <div className="flex items-center gap-2">
                      <Progress value={32} className="w-24 h-2" />
                      <span className="text-sm font-medium">32%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Social Media</span>
                    <div className="flex items-center gap-2">
                      <Progress value={18} className="w-24 h-2" />
                      <span className="text-sm font-medium">18%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Referrals</span>
                    <div className="flex items-center gap-2">
                      <Progress value={5} className="w-24 h-2" />
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trust Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.7</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">From 3,240 reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">156</div>
                  <p className="text-xs text-green-600">+12 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">94%</div>
                  <p className="text-xs text-gray-500">Within 24 hours</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Latest Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        M
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Maria K.</span>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          "Amazing traditional bilum bag! The quality is outstanding and it arrived quickly from Western Highlands. Perfect for carrying my market goods. Will definitely buy again!"
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Traditional Bilum Bag</Badge>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        J
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">James T.</span>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-3 h-3 text-gray-300" />
                          </div>
                          <span className="text-xs text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          "Great PNG coffee beans! Rich flavor and authentic taste. Shipping was fast to Port Moresby. Only issue was packaging could be better."
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">PNG Coffee Beans</Badge>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Sarah L.</span>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">2 weeks ago</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          "Beautiful traditional kundu drum! The craftsmanship is incredible and it sounds amazing. Perfect addition to our cultural center. Highly recommend this seller!"
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Traditional Kundu Drum</Badge>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="outline">View All Reviews</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  )
}
