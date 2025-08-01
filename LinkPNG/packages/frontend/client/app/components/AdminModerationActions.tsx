"use client"

import { useState } from "react"
import { Eye, Check, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ModerationActionsProps {
  item: {
    id: number
    type: string
    title: string
    seller?: string
    product?: string
    reviewer?: string
    trustScore: number
    reason: string
    flaggedBy: string
    date: string
  }
  onApprove: (id: number, comment: string) => void
  onReject: (id: number, comment: string) => void
}

export default function AdminModerationActions({ item, onApprove, onReject }: ModerationActionsProps) {
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [showComment, setShowComment] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)

  const handleAction = (action: 'approve' | 'reject') => {
    if (!comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please add a moderation comment before taking action.",
        variant: "destructive"
      })
      return
    }

    if (action === 'approve') {
      onApprove(item.id, comment)
      toast({
        title: "Item Approved",
        description: `${item.type} "${item.title}" has been approved and is now live.`,
      })
    } else {
      onReject(item.id, comment)
      toast({
        title: "Item Rejected",
        description: `${item.type} "${item.title}" has been rejected and removed.`,
      })
    }

    setComment("")
    setShowComment(false)
    setActionType(null)
  }

  const startAction = (action: 'approve' | 'reject') => {
    setActionType(action)
    setShowComment(true)
  }

  return (
    <div className="flex gap-2 ml-4">
      {/* View Details */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Moderation Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Type:</strong> {item.type}</div>
              <div><strong>Trust Score:</strong> {item.trustScore}%</div>
              <div><strong>Flagged By:</strong> {item.flaggedBy}</div>
              <div><strong>Date:</strong> {item.date}</div>
            </div>
            <div><strong>Title:</strong> {item.title}</div>
            {item.seller && <div><strong>Seller:</strong> {item.seller}</div>}
            {item.product && <div><strong>Product:</strong> {item.product}</div>}
            {item.reviewer && <div><strong>Reviewer:</strong> {item.reviewer}</div>}
            <div><strong>Reason:</strong> {item.reason}</div>
            
            {/* Simulated additional details */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <strong>Additional Context:</strong>
              <p className="mt-2 text-sm">
                This {item.type} was flagged by our {item.flaggedBy.toLowerCase()} for review. 
                The trust score of {item.trustScore}% indicates {item.trustScore < 30 ? 'high risk' : item.trustScore < 70 ? 'moderate risk' : 'low risk'}.
                {item.type === 'product' && ' The product listing may contain prohibited content or violate marketplace policies.'}
                {item.type === 'review' && ' The review shows patterns consistent with fake or manipulated feedback.'}
                {item.type === 'seller' && ' The seller account has multiple policy violations and requires immediate attention.'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comment Toggle */}
      <Button variant="outline" size="sm" onClick={() => setShowComment(!showComment)}>
        <MessageSquare className="w-4 h-4" />
      </Button>

      {/* Approve */}
      <Button 
        variant="outline" 
        size="sm" 
        className="text-green-600 hover:bg-green-50"
        onClick={() => startAction('approve')}
      >
        <Check className="w-4 h-4" />
      </Button>

      {/* Reject */}
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600 hover:bg-red-50"
        onClick={() => startAction('reject')}
      >
        <X className="w-4 h-4" />
      </Button>

      {/* Comment Section */}
      {showComment && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 z-10">
          <div className="space-y-3">
            <Textarea
              placeholder={`Add moderation comment for ${actionType || 'this'} action...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2">
              {actionType === 'approve' && (
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction('approve')}
                >
                  Approve with Comment
                </Button>
              )}
              {actionType === 'reject' && (
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleAction('reject')}
                >
                  Reject with Comment
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShowComment(false)
                  setActionType(null)
                  setComment("")
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}