"use client"

import { ReactNode } from "react"
import { FeatureNav } from "@/components/shared/feature-nav"
import { VersionHistory } from "@/components/shared/version-history"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { FeatureOnboarding } from "@/components/shared/feature-onboarding"

interface MessageVersion {
  id: string
  content: string
  timestamp: Date
  tone?: string
  platform?: string
}

interface MessageCreationLayoutProps {
  children: ReactNode
  feature: string
  versions: MessageVersion[]
  onVersionRestore: (version: MessageVersion) => void
  showVersionHistory?: boolean
  onboardingSteps?: {
    target: string
    title: string
    content: string
    position: "top" | "right" | "bottom" | "left"
  }[]
}

export function MessageCreationLayout({
  children,
  feature,
  versions,
  onVersionRestore,
  showVersionHistory = true,
  onboardingSteps = [],
}: MessageCreationLayoutProps) {
  const [hasVisited, setHasVisited] = useLocalStorage(
    `${feature}-visited`,
    false
  )

  const handleFeatureChange = (newFeature: { name: string; path: string }) => {
    if (newFeature.path !== `/dashboard/${feature}`) {
      toast.success(`Switched to ${newFeature.name}`)
    }
  }

  const handleVersionRestore = (version: MessageVersion) => {
    onVersionRestore(version)
    toast.success("Version restored")
  }

  return (
    <div className="space-y-6">
      <FeatureNav
        onFeatureChange={handleFeatureChange}
      />
      
      <div className={`grid grid-cols-1 ${showVersionHistory ? 'lg:grid-cols-4 gap-6' : ''}`}>
        <div className={showVersionHistory ? 'lg:col-span-3' : ''}>
          <Card className="p-6">
            {children}
          </Card>
        </div>
        
        {showVersionHistory && (
          <div className="space-y-6">
            <VersionHistory
              versions={versions}
              onRestore={handleVersionRestore}
            />
          </div>
        )}
      </div>

      {!hasVisited && onboardingSteps.length > 0 && (
        <FeatureOnboarding
          feature={feature}
          steps={onboardingSteps}
        />
      )}
    </div>
  )
} 