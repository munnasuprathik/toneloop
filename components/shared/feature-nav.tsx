"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare, MessageCircle, Wand2, Copy, Palette, Dna, Mic, Upload, History } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const features = [
  {
    name: "Generator",
    path: "/dashboard/generator",
    icon: MessageSquare,
    description: "Create messages in any tone",
    badge: "Premium",
    features: [
      { name: "Voice Input", icon: Mic, plan: "Premium" },
      { name: "File Upload", icon: Upload, plan: "Premium" },
      { name: "Version History", icon: History, plan: "Pro" }
    ]
  },
  {
    name: "DM Builder",
    path: "/dashboard/dm-builder",
    icon: MessageCircle,
    badge: "Premium",
    description: "Craft platform-specific DMs",
    features: [
      { name: "Icebreakers", icon: MessageSquare, plan: "Premium" },
      { name: "Follow-ups", icon: MessageCircle, plan: "Pro" },
      { name: "Multi-platform", icon: Copy, plan: "Pro" }
    ]
  },
  {
    name: "Templates",
    path: "/dashboard/templates",
    icon: Copy,
    badge: "Pro",
    description: "Save and reuse templates",
    features: [
      { name: "Save Templates", icon: Copy, plan: "Pro" },
      { name: "Categories", icon: Copy, plan: "Pro" },
      { name: "Usage Tracking", icon: History, plan: "Pro" }
    ]
  },
  {
    name: "Brand Voice",
    path: "/dashboard/tones",
    icon: Palette,
    badge: "Pro",
    description: "Define your brand's voice",
    features: [
      { name: "Custom Tones", icon: Palette, plan: "Pro" },
      { name: "Voice Profiles", icon: Mic, plan: "Pro" },
      { name: "Style Guides", icon: Copy, plan: "Pro" }
    ]
  },
  {
    name: "Writing DNA",
    path: "/dashboard/writing-dna",
    icon: Dna,
    badge: "Premium",
    description: "Analyze writing patterns",
    features: [
      { name: "Pattern Analysis", icon: Dna, plan: "Premium" },
      { name: "Style Matching", icon: Copy, plan: "Premium" },
      { name: "AI Learning", icon: Wand2, plan: "Premium" }
    ]
  }
]

interface FeatureNavProps {
  className?: string
  onFeatureChange?: (feature: typeof features[0]) => void
}

export function FeatureNav({ className, onFeatureChange }: FeatureNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-2 overflow-x-auto pb-2", className)}>
        {features.map((feature) => {
          const isActive = pathname === feature.path
          const Icon = feature.icon

          return (
            <Tooltip key={feature.path}>
              <TooltipTrigger asChild>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => {
                    if (onFeatureChange) {
                      onFeatureChange(feature)
                    }
                    router.push(feature.path)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{feature.name}</span>
                  {feature.badge && (
                    <Badge variant="secondary" className="ml-1">
                      {feature.badge}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-[300px]">
                <div className="space-y-2">
                  <p className="font-medium">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features?.map((subFeature, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <subFeature.icon className="h-3 w-3" />
                        <span className="text-xs">{subFeature.name}</span>
                        <Badge variant="outline" className="h-4 px-1 text-[10px]">
                          {subFeature.plan}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
} 