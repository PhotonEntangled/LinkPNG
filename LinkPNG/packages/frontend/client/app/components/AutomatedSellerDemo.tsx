"use client"

import { useState, useEffect } from "react"
import { useApp } from "../hooks/useApp"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AutomatedSellerDemoProps {
  onComplete?: () => void
}

export default function AutomatedSellerDemo({ onComplete }: AutomatedSellerDemoProps) {
  const { setCurrentPage } = useApp()
  const { toast } = useToast()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Demo data for the automated flow
  const DEMO_DATA = {
    sellerType: "individual",
    fullName: "Maria Kerenga",
    email: "maria.kerenga@gmail.com", 
    phone: "+675 7123 4567",
    emailCode: "123456",
    phoneCode: "789012",
    shopName: "Maria's Traditional Bilums",
    shopDescription: "Authentic handwoven bilum bags from the Western Highlands, passed down through generations. Each piece tells a story of PNG's rich cultural heritage.",
    province: "Western Highlands",
    payoutMethod: "micash",
    accountNumber: "70123456"
  }

  // Automated demo steps
  const DEMO_STEPS = [
    {
      name: "Navigate to Become Seller",
      action: () => {
        setCurrentPage("become-seller")
        return 2000
      }
    },
    {
      name: "Click Start Registration",
      action: () => {
        const button = document.querySelector('button[data-action="start-registration"]') as HTMLButtonElement
        if (button) {
          button.click()
        } else {
          // Fallback to navigation
          setCurrentPage("seller-registration")
        }
        return 3000
      }
    },
    {
      name: "Fill Registration Form Step 1",
      action: () => {
        // Simulate typing in form fields with delays
        setTimeout(() => fillFieldSlowly("input[id='fullName']", DEMO_DATA.fullName), 500)
        setTimeout(() => fillFieldSlowly("input[id='email']", DEMO_DATA.email), 1500)
        setTimeout(() => fillFieldSlowly("input[id='phone']", DEMO_DATA.phone), 2500)
        setTimeout(() => {
          // Select individual seller type
          const individualCard = document.querySelector('[data-seller-type="individual"]') as HTMLElement
          if (individualCard) individualCard.click()
        }, 3500)
        return 5000
      }
    },
    {
      name: "Proceed to Step 2",
      action: () => {
        const nextButton = document.querySelector('button:contains("Continue")') as HTMLButtonElement
        if (nextButton) {
          nextButton.click()
        }
        return 2000
      }
    },
    {
      name: "Auto-fill Verification Codes",
      action: () => {
        setTimeout(() => {
          // Fill email verification code
          fillFieldSlowly("input[placeholder*='6-digit code']:first-of-type", DEMO_DATA.emailCode)
          setTimeout(() => {
            const emailVerifyBtn = document.querySelector('button:contains("Verify"):first-of-type') as HTMLButtonElement
            if (emailVerifyBtn) emailVerifyBtn.click()
          }, 1000)
        }, 1000)

        setTimeout(() => {
          // Fill phone verification code  
          fillFieldSlowly("input[placeholder*='6-digit code']:last-of-type", DEMO_DATA.phoneCode)
          setTimeout(() => {
            const phoneVerifyBtn = document.querySelector('button:contains("Verify"):last-of-type') as HTMLButtonElement
            if (phoneVerifyBtn) phoneVerifyBtn.click()
          }, 1000)
        }, 3000)
        return 6000
      }
    },
    {
      name: "Proceed to Step 3",
      action: () => {
        const nextButton = document.querySelector('button:contains("Continue")') as HTMLButtonElement
        if (nextButton) {
          nextButton.click()
        }
        return 2000
      }
    },
    {
      name: "Fill Shop Setup Details",
      action: () => {
        setTimeout(() => fillFieldSlowly("input[id='shopName']", DEMO_DATA.shopName), 500)
        setTimeout(() => fillFieldSlowly("textarea[id='shopDescription']", DEMO_DATA.shopDescription), 2000)
        setTimeout(() => {
          // Select province
          const provinceSelect = document.querySelector('[role="combobox"]') as HTMLElement
          if (provinceSelect) {
            provinceSelect.click()
            setTimeout(() => {
              const option = document.querySelector(`[data-value="${DEMO_DATA.province}"]`) as HTMLElement
              if (option) option.click()
            }, 500)
          }
        }, 4000)
        setTimeout(() => {
          // Select payout method
          const micashCard = document.querySelector('[data-payout-method="micash"]') as HTMLElement
          if (micashCard) micashCard.click()
        }, 5500)
        setTimeout(() => fillFieldSlowly("input[id='accountNumber']", DEMO_DATA.accountNumber), 6500)
        return 8000
      }
    },
    {
      name: "Complete Registration",
      action: () => {
        const completeButton = document.querySelector('button:contains("Complete Registration")') as HTMLButtonElement
        if (completeButton) {
          completeButton.click()
        }
        return 3000
      }
    },
    {
      name: "Show Success and Transition",
      action: () => {
        toast({
          title: "🎉 Registration Complete!",
          description: "Seller account approved and ready for business!"
        })
        
        // Simulate approval process
        setTimeout(() => {
          toast({
            title: "✅ Account Verified",
            description: "Welcome to LinkPNG Seller Dashboard!"
          })
        }, 2000)
        
        setTimeout(() => {
          router.push("/seller")
        }, 4000)
        
        return 5000
      }
    }
  ]

  // Helper function to simulate typing
  const fillFieldSlowly = (selector: string, value: string) => {
    const element = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement
    if (!element) return

    element.focus()
    element.value = ""
    
    // Simulate typing character by character
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < value.length) {
        element.value += value[index]
        // Trigger input event for React
        element.dispatchEvent(new Event('input', { bubbles: true }))
        index++
      } else {
        clearInterval(typeInterval)
        element.blur()
      }
    }, 50) // 50ms between characters for realistic typing speed
  }

  // Execute demo steps sequentially
  useEffect(() => {
    if (!isRunning || currentStep >= DEMO_STEPS.length) return

    const step = DEMO_STEPS[currentStep]
    console.log(`🎬 Executing step ${currentStep + 1}: ${step.name}`)
    
    // Show step progress toast
    toast({
      title: `Demo Step ${currentStep + 1}/${DEMO_STEPS.length}`,
      description: step.name
    })

    const delay = step.action()
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentStep, isRunning, toast, setCurrentPage, router])

  // Complete demo when all steps are done
  useEffect(() => {
    if (isRunning && currentStep >= DEMO_STEPS.length) {
      setIsRunning(false)
      setCurrentStep(0)
      onComplete?.()
      
      toast({
        title: "🎬 Demo Complete!",
        description: "Automated seller registration flow finished successfully."
      })
    }
  }, [currentStep, isRunning, onComplete, toast])

  const startDemo = () => {
    setIsRunning(true)
    setCurrentStep(0)
    
    toast({
      title: "🎬 Starting Automated Demo",
      description: "Watch the complete seller registration flow!"
    })
  }

  const stopDemo = () => {
    setIsRunning(false)
    setCurrentStep(0)
    
    toast({
      title: "⏹️ Demo Stopped",
      description: "Automated flow has been halted."
    })
  }

  return {
    startDemo,
    stopDemo,
    isRunning,
    currentStep,
    totalSteps: DEMO_STEPS.length
  }
}