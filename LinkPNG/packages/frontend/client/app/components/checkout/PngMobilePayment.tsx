"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Building, Coins, CheckCircle, AlertCircle, Loader } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

interface PaymentMethod {
  id: string
  name: string
  nameKey: string
  type: "mobile" | "bank" | "cash" | "crypto"
  logo: string
  fees: number
  processingTime: string
  availability: "available" | "limited" | "unavailable"
  description: string
  descriptionKey: string
}

interface PngMobilePaymentProps {
  amount: number
  onPaymentComplete?: (method: PaymentMethod, transactionId: string) => void
  onPaymentFailed?: (method: PaymentMethod, error: string) => void
  className?: string
}

export default function PngMobilePayment({ 
  amount, 
  onPaymentComplete, 
  onPaymentFailed, 
  className = "" 
}: PngMobilePaymentProps) {
  const { t } = useLanguage()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"select" | "details" | "confirm" | "processing" | "success" | "failed">("select")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [pin, setPin] = useState("")

  // PNG-specific payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "digicel-paygo",
      name: "Digicel PayGo",
      nameKey: "digicelPaygo",
      type: "mobile",
      logo: "📱",
      fees: 0.02, // 2%
      processingTime: "Instant",
      availability: "available",
      description: "Papua New Guinea's leading mobile wallet service",
      descriptionKey: "digicelPaygoDesc"
    },
    {
      id: "mvil",
      name: "MVIL Mobile Money",
      nameKey: "mvilMoney",
      type: "mobile", 
      logo: "💳",
      fees: 0.025, // 2.5%
      processingTime: "1-2 minutes",
      availability: "available",
      description: "Secure mobile payments across PNG",
      descriptionKey: "mvilMoneyDesc"
    },
    {
      id: "bsp-bank",
      name: "BSP Bank Transfer",
      nameKey: "bspBank",
      type: "bank",
      logo: "🏦",
      fees: 0.015, // 1.5%
      processingTime: "2-5 minutes",
      availability: "available",
      description: "Bank South Pacific online banking",
      descriptionKey: "bspBankDesc"
    },
    {
      id: "westpac-png",
      name: "Westpac PNG",
      nameKey: "westpacPng",
      type: "bank",
      logo: "🏧",
      fees: 0.02, // 2%
      processingTime: "3-10 minutes",
      availability: "available",
      description: "Secure banking with Westpac PNG",
      descriptionKey: "westpacPngDesc"
    },
    {
      id: "cash-on-delivery",
      name: "Cash on Delivery",
      nameKey: "cashOnDelivery",
      type: "cash",
      logo: "💰",
      fees: 0.05, // 5% handling fee
      processingTime: "Upon delivery",
      availability: "limited",
      description: "Pay with cash when your order arrives (urban areas only)",
      descriptionKey: "cashOnDeliveryDesc"
    },
    {
      id: "store-deposit",
      name: "Store Cash Deposit",
      nameKey: "storeCashDeposit",
      type: "cash",
      logo: "🏪",
      fees: 0.03, // 3%
      processingTime: "15-30 minutes",
      availability: "available",
      description: "Deposit cash at any LinkPNG partner store",
      descriptionKey: "storeCashDepositDesc"
    }
  ]

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
    if (method.type === "cash") {
      setPaymentStep("confirm")
    } else {
      setPaymentStep("details")
    }
  }

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) return

    setIsProcessing(true)
    setPaymentStep("processing")

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1
    
    if (success) {
      const transactionId = `PNG${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      setPaymentStep("success")
      onPaymentComplete?.(selectedMethod, transactionId)
    } else {
      setPaymentStep("failed")
      onPaymentFailed?.(selectedMethod, "Network timeout. Please try again.")
    }
    
    setIsProcessing(false)
  }

  const formatKina = (amount: number) => {
    return `K${amount.toFixed(2)}`
  }

  const calculateTotal = (baseAmount: number, fees: number) => {
    return baseAmount + (baseAmount * fees)
  }

  if (paymentStep === "success") {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">{t("paymentSuccessful")}</h3>
        <p className="text-green-600 mb-4">{t("paymentProcessedSuccessfully")}</p>
        <div className="bg-white p-4 rounded border">
          <p className="text-sm text-gray-600">{t("paymentMethod")}: {selectedMethod?.name}</p>
          <p className="text-sm text-gray-600">{t("amount")}: {formatKina(calculateTotal(amount, selectedMethod?.fees || 0))}</p>
        </div>
      </div>
    )
  }

  if (paymentStep === "failed") {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}>
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-red-800 mb-2">{t("paymentFailed")}</h3>
        <p className="text-red-600 mb-4">{t("paymentFailedMessage")}</p>
        <button 
          onClick={() => setPaymentStep("select")}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          {t("tryAgain")}
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-png-red">{t("pngPaymentMethods")}</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">{t("pngTotalAmount")}</p>
          <p className="text-xl font-bold text-png-black">{formatKina(amount)}</p>
        </div>
      </div>

      {paymentStep === "select" && (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">{t("pngSelectPaymentMethod")}</p>
          
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => handlePaymentMethodSelect(method)}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                method.availability === "unavailable" ? "opacity-50 cursor-not-allowed" : "hover:border-png-red"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{method.logo}</span>
                  <div>
                    <h3 className="font-semibold text-png-black">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{t("paymentProcessingTime")}: {method.processingTime}</span>
                      <span className="text-xs text-gray-500">{t("paymentFees")}: {(method.fees * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-png-black">
                    {formatKina(calculateTotal(amount, method.fees))}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    method.availability === "available" ? "bg-green-100 text-green-800" :
                    method.availability === "limited" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {t(`payment${method.availability.charAt(0).toUpperCase() + method.availability.slice(1)}`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {paymentStep === "details" && selectedMethod && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <button 
              onClick={() => setPaymentStep("select")}
              className="text-png-red hover:underline"
            >
              ← {t("back")}
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-xl">{selectedMethod.logo}</span>
              <span className="font-semibold">{selectedMethod.name}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("paymentPhoneNumber")}
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+675 XXXX XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-png-red focus:border-transparent"
              />
            </div>

            {selectedMethod.type === "mobile" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("mobilePIN")}
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-png-red focus:border-transparent"
                />
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>{t("subtotal")}</span>
                <span>{formatKina(amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("paymentFees")} ({(selectedMethod.fees * 100).toFixed(1)}%)</span>
                <span>{formatKina(amount * selectedMethod.fees)}</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                <span>{t("total")}</span>
                <span>{formatKina(calculateTotal(amount, selectedMethod.fees))}</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentStep("confirm")}
              disabled={!phoneNumber || (selectedMethod.type === "mobile" && !pin)}
              className="w-full bg-png-red text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
            >
              {t("continueToConfirmation")}
            </button>
          </div>
        </div>
      )}

      {paymentStep === "confirm" && selectedMethod && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <button 
              onClick={() => setPaymentStep(selectedMethod.type === "cash" ? "select" : "details")}
              className="text-png-red hover:underline"
            >
              ← {t("back")}
            </button>
            <h3 className="font-semibold">{t("confirmPayment")}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t("paymentMethod")}</span>
              <div className="flex items-center space-x-2">
                <span>{selectedMethod.logo}</span>
                <span className="font-medium">{selectedMethod.name}</span>
              </div>
            </div>
            
            {phoneNumber && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t("paymentPhoneNumber")}</span>
                <span className="font-mono">{phoneNumber}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">{t("paymentProcessingTime")}</span>
              <span>{selectedMethod.processingTime}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>{t("pngTotalAmount")}</span>
                <span className="text-png-red">{formatKina(calculateTotal(amount, selectedMethod.fees))}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePaymentSubmit}
            disabled={isProcessing}
            className="w-full bg-png-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>{t("processing")}</span>
              </div>
            ) : (
              t("confirmAndPay")
            )}
          </button>
        </div>
      )}

      {paymentStep === "processing" && (
        <div className="text-center py-8">
          <Loader className="w-16 h-16 text-png-red mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-png-black mb-2">{t("paymentProcessingMsg")}</h3>
          <p className="text-gray-600">{t("pleaseWait")}</p>
          {selectedMethod && (
            <p className="text-sm text-gray-500 mt-2">
              {t("usingPaymentMethodMsg")}: {selectedMethod.name}
            </p>
          )}
        </div>
      )}
    </div>
  )
} 