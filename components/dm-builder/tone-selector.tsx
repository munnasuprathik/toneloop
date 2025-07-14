import { Tone } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Smile,
  Briefcase,
  Zap,
  Coffee,
  Heart,
  Shield,
  Laugh,
  Rocket,
} from "lucide-react"

interface ToneOption {
  id: Tone
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const tones: ToneOption[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Formal and business-appropriate",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "friendly",
    name: "Friendly",
    description: "Warm and approachable",
    icon: Smile,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "assertive",
    name: "Assertive",
    description: "Confident and direct",
    icon: Shield,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "casual",
    name: "Casual",
    description: "Relaxed and informal",
    icon: Coffee,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "warm",
    name: "Warm",
    description: "Empathetic and caring",
    icon: Heart,
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong and impactful",
    icon: Zap,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "empathetic",
    name: "Empathetic",
    description: "Understanding and supportive",
    icon: Heart,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "enthusiastic",
    name: "Enthusiastic",
    description: "Energetic and positive",
    icon: Rocket,
    color: "bg-yellow-100 text-yellow-700",
  },
]

interface DMToneSelectorProps {
  selectedTone: Tone
  onToneSelect: (tone: Tone) => void
}

export function DMToneSelector({
  selectedTone,
  onToneSelect,
}: DMToneSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tones.map((tone) => {
        const Icon = tone.icon
        const isSelected = selectedTone === tone.id

        return (
          <Card
            key={tone.id}
            className={cn(
              "relative p-4 cursor-pointer transition-all hover:shadow-md",
              "border-2",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-primary/20"
            )}
            onClick={() => onToneSelect(tone.id)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div
                className={cn(
                  "p-2 rounded-full",
                  isSelected ? "bg-primary text-primary-foreground" : tone.color
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium">{tone.name}</h3>
              <p className="text-xs text-muted-foreground">
                {tone.description}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
} 