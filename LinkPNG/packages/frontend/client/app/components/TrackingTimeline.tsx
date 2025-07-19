"use client"

import { Check, Package, Truck, MapPin, Clock } from "lucide-react"

interface TrackingStep {
  id: number
  status: string
  label: string
  description: string
  date: string
  completed: boolean
  current?: boolean
  icon: string
}

interface TrackingTimelineProps {
  steps: TrackingStep[]
}

export default function TrackingTimeline({ steps }: TrackingTimelineProps) {
  const getIcon = (iconType: string, completed: boolean, current?: boolean) => {
    const iconClass = `w-5 h-5 ${completed ? "text-white" : current ? "text-[#E50000]" : "text-gray-400"}`

    switch (iconType) {
      case "check":
        return <Check className={iconClass} />
      case "package":
        return <Package className={iconClass} />
      case "truck":
        return <Truck className={iconClass} />
      case "map":
        return <MapPin className={iconClass} />
      default:
        return <Clock className={iconClass} />
    }
  }

  const getStepStyle = (step: TrackingStep) => {
    if (step.completed) {
      return "bg-green-500 border-green-500"
    } else if (step.current) {
      return "bg-white border-[#E50000] border-2"
    } else {
      return "bg-gray-200 border-gray-200"
    }
  }

  const getConnectorStyle = (index: number) => {
    const currentStep = steps[index]
    const nextStep = steps[index + 1]

    if (currentStep.completed && nextStep?.completed) {
      return "bg-green-500"
    } else if (currentStep.completed || currentStep.current) {
      return "bg-gradient-to-b from-green-500 to-gray-200"
    } else {
      return "bg-gray-200"
    }
  }

  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex items-start">
          {/* Timeline connector */}
          {index < steps.length - 1 && (
            <div className={`absolute left-6 top-12 w-0.5 h-16 ${getConnectorStyle(index)}`} />
          )}

          {/* Step icon */}
          <div
            className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepStyle(step)}`}
          >
            {getIcon(step.icon, step.completed, step.current)}
          </div>

          {/* Step content */}
          <div className="ml-4 pb-8 flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    step.completed ? "text-green-600" : step.current ? "text-[#E50000]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
              <div
                className={`text-sm mt-2 md:mt-0 md:ml-4 ${
                  step.completed
                    ? "text-green-600 font-medium"
                    : step.current
                      ? "text-[#E50000] font-medium"
                      : "text-gray-500"
                }`}
              >
                {step.date}
              </div>
            </div>

            {/* Additional details for current step */}
            {step.current && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#E50000] rounded-full animate-pulse"></div>
                  <span className="text-[#E50000] font-medium">Current Status</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  Your package is currently in transit. Expected delivery within 2-3 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
