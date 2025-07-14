import { Platform, UseCase } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Building2,
  Calendar,
  HandshakeIcon,
  Heart,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Rocket,
  Star,
  Users,
  Zap,
} from "lucide-react"

interface UseCaseOption {
  id: UseCase
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  platforms: Platform[]
}

const useCases: UseCaseOption[] = [
  {
    id: "networking",
    name: "Professional Networking",
    description: "Connect with industry professionals and expand your network",
    icon: Users,
    platforms: ["linkedin", "twitter"],
  },
  {
    id: "sales",
    name: "Sales Outreach",
    description: "Reach out to potential clients and customers",
    icon: HandshakeIcon,
    platforms: ["linkedin", "email", "whatsapp"],
  },
  {
    id: "hiring",
    name: "Recruitment",
    description: "Connect with potential candidates for job opportunities",
    icon: Building2,
    platforms: ["linkedin", "email"],
  },
  {
    id: "partnership",
    name: "Partnership Proposal",
    description: "Propose collaborations and business partnerships",
    icon: Briefcase,
    platforms: ["linkedin", "email"],
  },
  {
    id: "collab",
    name: "Creator Collaboration",
    description: "Connect with other creators for joint projects",
    icon: Star,
    platforms: ["instagram", "twitter"],
  },
  {
    id: "event",
    name: "Event Invitation",
    description: "Invite connections to upcoming events or webinars",
    icon: Calendar,
    platforms: ["linkedin", "instagram", "email"],
  },
  {
    id: "follow-up",
    name: "Follow-up Message",
    description: "Follow up on previous interactions or meetings",
    icon: MessageCircle,
    platforms: ["linkedin", "email", "whatsapp"],
  },
  {
    id: "cold-dm",
    name: "Cold Outreach",
    description: "Initiate first contact with potential connections",
    icon: Zap,
    platforms: ["instagram", "twitter", "linkedin"],
  },
  {
    id: "appreciation",
    name: "Appreciation Note",
    description: "Express gratitude or admiration",
    icon: Heart,
    platforms: ["linkedin", "twitter", "email"],
  },
  {
    id: "feedback",
    name: "Feedback Request",
    description: "Request feedback or testimonials",
    icon: MessagesSquare,
    platforms: ["instagram", "twitter", "email", "whatsapp"],
  },
  {
    id: "investor-pitch",
    name: "Investor Outreach",
    description: "Connect with potential investors",
    icon: Rocket,
    platforms: ["email", "linkedin"],
  },
  {
    id: "service-intro",
    name: "Service Introduction",
    description: "Introduce your services to potential clients",
    icon: Megaphone,
    platforms: ["email", "whatsapp", "linkedin"],
  },
]

interface DMUseCaseSelectorProps {
  selectedPlatform: Platform
  selectedUseCase: UseCase | null
  onUseCaseSelect: (useCase: UseCase) => void
}

export function DMUseCaseSelector({
  selectedPlatform,
  selectedUseCase,
  onUseCaseSelect,
}: DMUseCaseSelectorProps) {
  const filteredUseCases = useCases.filter((useCase) =>
    useCase.platforms.includes(selectedPlatform)
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredUseCases.map((useCase) => {
        const Icon = useCase.icon
        const isSelected = selectedUseCase === useCase.id

        return (
          <Card
            key={useCase.id}
            className={cn(
              "relative p-4 cursor-pointer transition-all hover:shadow-md",
              "border-2",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-primary/20"
            )}
            onClick={() => onUseCaseSelect(useCase.id)}
          >
            <div className="flex items-start space-x-4">
              <div
                className={cn(
                  "p-2 rounded-full",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{useCase.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {useCase.description}
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
} 