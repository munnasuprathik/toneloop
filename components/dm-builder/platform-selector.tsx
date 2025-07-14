import { Linkedin, Instagram, Twitter, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Platform } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"

interface PlatformOption {
  id: Platform
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  maxLength?: number
}

const platforms: PlatformOption[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    description: "Professional networking and business outreach",
    maxLength: 300,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    description: "Creative collaborations and influencer outreach",
    maxLength: 1000,
  },
  {
    id: "twitter",
    name: "X/Twitter",
    icon: Twitter,
    description: "Quick connections and community engagement",
    maxLength: 1000,
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    description: "Formal communications and detailed proposals",
  },
  {
    id: "whatsapp",
    name: "WhatsApp/SMS",
    icon: MessageSquare,
    description: "Direct and personal business messaging",
    maxLength: 1000,
  },
]

interface DMPlatformSelectorProps {
  selectedPlatform: Platform | null
  onPlatformSelect: (platform: Platform) => void
}

export function DMPlatformSelector({
  selectedPlatform,
  onPlatformSelect,
}: DMPlatformSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {platforms.map((platform) => {
        const Icon = platform.icon
        const isSelected = selectedPlatform === platform.id

        return (
          <Card
            key={platform.id}
            className={cn(
              "relative p-4 cursor-pointer transition-all hover:shadow-md",
              "border-2",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-primary/20"
            )}
            onClick={() => onPlatformSelect(platform.id)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div
                className={cn(
                  "p-2 rounded-full",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">{platform.name}</h3>
              <p className="text-sm text-muted-foreground">
                {platform.description}
              </p>
              {platform.maxLength && (
                <span className="text-xs text-muted-foreground">
                  Max {platform.maxLength} characters
                </span>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
} 