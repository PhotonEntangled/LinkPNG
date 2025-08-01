"use client"

import { useState } from "react"
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Product {
  id: number
  name: string
  price: number
  image: string
  status: "active" | "inactive" | "pending"
  views: number
  sales: number
  trustScore: number
  stock: number
}

interface ProductActionsProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
  onToggleStatus: (productId: number) => void
}

export default function ProductActions({ 
  product, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: ProductActionsProps) {
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)

  const handleView = () => {
    setShowViewDialog(true)
  }

  const handleEdit = () => {
    onEdit(product)
    toast({
      title: "Edit Mode",
      description: "Product edit functionality will be available soon.",
    })
  }

  const handleDelete = () => {
    onDelete(product.id)
    setShowDeleteDialog(false)
    toast({
      title: "Product Deleted",
      description: `${product.name} has been removed from your listings.`,
      variant: "destructive"
    })
  }

  const handleToggleStatus = () => {
    onToggleStatus(product.id)
    const newStatus = product.status === "active" ? "inactive" : "active"
    toast({
      title: "Status Updated",
      description: `${product.name} is now ${newStatus}.`,
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus}>
            {product.status === "active" ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Product Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-lg font-bold text-green-600">K{product.price.toFixed(2)}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.status === "active" 
                      ? "bg-green-100 text-green-800"
                      : product.status === "inactive"
                        ? "bg-gray-100 text-gray-800" 
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {product.status.toUpperCase()}
                  </span>
                  <span>Stock: {product.stock}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold">{product.views}</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{product.sales}</div>
                <div className="text-sm text-gray-600">Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{product.trustScore}%</div>
                <div className="text-sm text-gray-600">Trust Score</div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Performance Insights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Conversion rate: {product.sales > 0 ? ((product.sales / product.views) * 100).toFixed(1) : '0'}%</p>
                <p>• Trust score trend: {product.trustScore >= 80 ? '📈 Good' : product.trustScore >= 60 ? '📊 Average' : '📉 Needs improvement'}</p>
                <p>• Inventory status: {product.stock < 10 ? '⚠️ Low stock' : '✅ Good stock'}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
              All sales data and customer reviews will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}