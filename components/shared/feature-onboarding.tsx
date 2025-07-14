"use client"

import { useState, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { X } from "lucide-react"

interface OnboardingStep {
  target: string
  title: string
  content: string
  position?: "top" | "right" | "bottom" | "left"
}

interface FeatureOnboardingProps {
  feature: string
  steps: OnboardingStep[]
  className?: string
}

export function FeatureOnboarding({
  feature,
  steps,
  className,
}: FeatureOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useLocalStorage(
    `onboarding-${feature}-complete`,
    false
  )

  useEffect(() => {
    if (!isComplete) {
      const timer = setTimeout(() => {
        const element = document.querySelector(steps[currentStep].target)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [currentStep, steps, isComplete])

  if (isComplete) return null

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleSkip = () => {
    setIsComplete(true)
  }

  const currentStepData = steps[currentStep]

  return (
    <TooltipProvider>
      <Tooltip open={!isComplete} delayDuration={0}>
        <TooltipTrigger asChild>
          <div className={className} />
        </TooltipTrigger>
        <TooltipContent
          side={currentStepData.position || "bottom"}
          className="w-80 p-4"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold mb-1">{currentStepData.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.content}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleSkip}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-8 rounded ${
                      index === currentStep
                        ? "bg-primary"
                        : "bg-primary/20"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 