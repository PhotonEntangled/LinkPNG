"use client"

import { useState, useEffect } from "react"
import { useApp } from "../hooks/useApp"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AutomatedSellerDemoProps {
  onComplete?: () => void
}

export function useAutomatedSellerDemo({ onComplete }: AutomatedSellerDemoProps = {}) {
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
      action: async () => {
        // Select individual seller type first
        setTimeout(() => {
          const individualCard = document.querySelector('[data-seller-type="individual"]') as HTMLElement
          if (individualCard) individualCard.click()
        }, 500)
        
        // Simulate typing in form fields with proper delays
        setTimeout(async () => {
          await fillFieldSlowly("input[id='fullName']", DEMO_DATA.fullName)
          await new Promise(resolve => setTimeout(resolve, 800))
          await fillFieldSlowly("input[id='email']", DEMO_DATA.email)
          await new Promise(resolve => setTimeout(resolve, 800))
          await fillFieldSlowly("input[id='phone']", DEMO_DATA.phone)
        }, 1000)
        return 6000
      }
    },
    {
      name: "Proceed to Step 2",
      action: () => {
        // Find the Continue button by its text content
        const buttons = Array.from(document.querySelectorAll('button'))
        const continueButton = buttons.find(btn => btn.textContent?.includes('Continue'))
        if (continueButton) {
          continueButton.click()
        }
        return 2000
      }
    },
    {
      name: "Auto-fill Verification Codes",
      action: async () => {
        // Fill email verification code
        setTimeout(async () => {
          await fillFieldSlowly("input[placeholder='Enter 6-digit code']", DEMO_DATA.emailCode)
          setTimeout(() => {
            const buttons = Array.from(document.querySelectorAll('button'))
            const emailVerifyBtn = buttons.find(btn => 
              btn.textContent?.includes('Verify') && !btn.disabled
            )
            if (emailVerifyBtn) emailVerifyBtn.click()
          }, 800)
        }, 1000)

        // Fill phone verification code after email is verified
        setTimeout(async () => {
          // Find the second verification input (phone)
          const inputs = Array.from(document.querySelectorAll("input[placeholder='Enter 6-digit code']"))
          const phoneInput = inputs[1] as HTMLInputElement
          if (phoneInput) {
            await simulateTyping(phoneInput, DEMO_DATA.phoneCode)
            setTimeout(() => {
              const buttons = Array.from(document.querySelectorAll('button'))
              const phoneVerifyBtn = buttons.find(btn => 
                btn.textContent?.includes('Verify') && !btn.disabled
              )
              if (phoneVerifyBtn) phoneVerifyBtn.click()
            }, 800)
          }
        }, 4000)
        return 7000
      }
    },
    {
      name: "Proceed to Step 3",
      action: () => {
        const buttons = Array.from(document.querySelectorAll('button'))
        const continueButton = buttons.find(btn => btn.textContent?.includes('Continue'))
        if (continueButton) {
          continueButton.click()
        }
        return 2000
      }
    },
    {
      name: "Fill Shop Setup Details",
      action: async () => {
        // Fill shop name
        setTimeout(async () => {
          await fillFieldSlowly("input[id='shopName']", DEMO_DATA.shopName)
        }, 500)
        
        // Fill shop description
        setTimeout(async () => {
          await fillFieldSlowly("textarea[id='shopDescription']", DEMO_DATA.shopDescription)
        }, 2500)
        
        // Select province
        setTimeout(() => {
          const provinceSelect = document.querySelector('[role="combobox"]') as HTMLElement
          if (provinceSelect) {
            provinceSelect.click()
            setTimeout(() => {
              const option = document.querySelector(`[data-value="${DEMO_DATA.province}"]`) as HTMLElement
              if (option) option.click()
            }, 500)
          }
        }, 5000)
        
        // Select payout method
        setTimeout(() => {
          const micashCard = document.querySelector('[data-payout-method="micash"]') as HTMLElement
          if (micashCard) micashCard.click()
        }, 6500)
        
        // Fill account number
        setTimeout(async () => {
          await fillFieldSlowly("input[id='accountNumber']", DEMO_DATA.accountNumber)
        }, 7500)
        
        return 9000
      }
    },
    {
      name: "Complete Registration",
      action: () => {
        const buttons = Array.from(document.querySelectorAll('button'))
        const completeButton = buttons.find(btn => btn.textContent?.includes('Complete Registration'))
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

  // Helper function to simulate realistic typing
  const simulateTyping = (element: HTMLInputElement | HTMLTextAreaElement, text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!element) {
        resolve()
        return
      }

      element.focus()
      element.value = ""
      
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          element.value += text[index]
          // Trigger both input and change events for React
          element.dispatchEvent(new Event('input', { bubbles: true }))
          element.dispatchEvent(new Event('change', { bubbles: true }))
          index++
        } else {
          clearInterval(typeInterval)
          element.blur()
          resolve()
        }
      }, Math.random() * 100 + 50) // Random delay between 50-150ms for human-like typing
    })
  }

  // Helper to fill a field with typing simulation
  const fillFieldSlowly = async (selector: string, value: string) => {
    const element = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement
    if (element) {
      await simulateTyping(element, value)
    }
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

// Default export for backward compatibility
export default function AutomatedSellerDemo(props: AutomatedSellerDemoProps) {
  return useAutomatedSellerDemo(props)
}