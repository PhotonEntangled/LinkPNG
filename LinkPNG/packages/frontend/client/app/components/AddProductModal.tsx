"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Upload, X, MapPin, Package, DollarSign, Image as ImageIcon, Tag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProductFormData {
  name: string
  description: string
  price: string
  originalPrice: string
  category: string
  subcategory: string
  province: string
  images: string[]
  inventory: string
  sku: string
  tags: string[]
  culturalSignificance: string
  isTraditional: boolean
  isOrganic: boolean
  isHandmade: boolean
}

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: ProductFormData) => void
}

export default function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const { toast } = useToast()
  const [currentTag, setCurrentTag] = useState("")
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    province: "",
    images: [],
    inventory: "",
    sku: "",
    tags: [],
    culturalSignificance: "",
    isTraditional: false,
    isOrganic: false,
    isHandmade: false
  })

  const provinces = [
    "Western Highlands", "Southern Highlands", "Enga", "Hela",
    "Western Province", "Gulf", "Central", "National Capital District",
    "Morobe", "Eastern Highlands", "Madang", "East Sepik", "West Sepik",
    "Manus", "East New Britain", "West New Britain", "New Ireland", "Bougainville"
  ]

  const categories = [
    { value: "traditional-crafts", label: "Traditional Crafts", subcategories: ["Bilum Bags", "Wood Carvings", "Pottery", "Masks", "Jewelry"] },
    { value: "png-coffee", label: "PNG Coffee", subcategories: ["Arabica", "Robusta", "Instant Coffee", "Coffee Beans"] },
    { value: "local-foods", label: "Local Foods", subcategories: ["Sago Products", "Taro", "Coconut Products", "Spices", "Honey"] },
    { value: "png-fashion", label: "PNG Fashion", subcategories: ["Traditional Wear", "Modern PNG Style", "Accessories", "Textiles"] },
    { value: "personal-care", label: "Personal Care", subcategories: ["Natural Soaps", "Oils", "Traditional Medicine", "Skincare"] },
    { value: "modern-png", label: "Modern PNG", subcategories: ["Electronics", "Books", "Art", "Home Goods"] }
  ]

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Product name is required",
        variant: "destructive"
      })
      return
    }

    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      toast({
        title: "Validation Error", 
        description: "Valid price is required",
        variant: "destructive"
      })
      return
    }

    if (!formData.category) {
      toast({
        title: "Validation Error",
        description: "Please select a category",
        variant: "destructive"
      })
      return
    }

    if (!formData.province) {
      toast({
        title: "Validation Error",
        description: "Please select your province",
        variant: "destructive"
      })
      return
    }

    onSubmit(formData)
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      subcategory: "",
      province: "",
      images: [],
      inventory: "",
      sku: "",
      tags: [],
      culturalSignificance: "",
      isTraditional: false,
      isOrganic: false,
      isHandmade: false
    })
    
    toast({
      title: "Success!",
      description: "Product has been created successfully",
    })
  }

  const selectedCategory = categories.find(cat => cat.value === formData.category)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Product to LinkPNG
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Traditional Bilum Bag - Highlands Style"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Optional)</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="e.g., BILUM-HIGH-001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your product, its features, and what makes it special..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Selling Price (PGK) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="85.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (PGK)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="120.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inventory">Stock Quantity</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={formData.inventory}
                    onChange={(e) => setFormData(prev => ({ ...prev, inventory: e.target.value }))}
                    placeholder="25"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Categories & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, category: value, subcategory: "" }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select value={formData.subcategory} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, subcategory: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory.subcategories.map(subcat => (
                          <SelectItem key={subcat} value={subcat}>
                            {subcat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="province">Province/Origin *</Label>
                  <Select value={formData.province} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, province: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(province => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PNG Cultural Context */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                PNG Cultural Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="culturalSignificance">Cultural Significance</Label>
                <Textarea
                  id="culturalSignificance"
                  value={formData.culturalSignificance}
                  onChange={(e) => setFormData(prev => ({ ...prev, culturalSignificance: e.target.value }))}
                  placeholder="Describe the cultural importance, traditional use, or story behind this product..."
                  rows={2}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isTraditional}
                    onChange={(e) => setFormData(prev => ({ ...prev, isTraditional: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Traditional/Cultural Product</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isHandmade}
                    onChange={(e) => setFormData(prev => ({ ...prev, isHandmade: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Handmade</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isOrganic}
                    onChange={(e) => setFormData(prev => ({ ...prev, isOrganic: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Organic/Natural</span>
                </label>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Product Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tags like 'handwoven', 'authentic', 'traditional'..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Upload product images</p>
                <p className="text-sm text-gray-500">Drag and drop images here or click to browse</p>
                <Button type="button" variant="outline" className="mt-4">
                  Choose Images
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                * Image upload functionality will be implemented in the next phase
              </p>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}