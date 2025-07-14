import { useState } from "react"
import { Platform, Recipient } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, RefreshCw, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface DMIcebreakerProps {
  platform: Platform
  recipient: Recipient
  enabled: boolean
  onToggle: (enabled: boolean) => void
  onSelect: (icebreaker: string) => void
}

export function DMIcebreaker({
  platform,
  recipient,
  enabled,
  onToggle,
  onSelect,
}: DMIcebreakerProps) {
  const [icebreakers, setIcebreakers] = useState<string[]>([])
  const [selectedIcebreaker, setSelectedIcebreaker] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateIcebreakers = () => {
    setIsGenerating(true)
    
    // Simulate API call to generate icebreakers
    setTimeout(() => {
      const newIcebreakers = [
        `Hi ${recipient.name}, I noticed your work at ${recipient.company || "your company"} and was impressed by your expertise in ${recipient.role || "your field"}.`,
        `Hello ${recipient.name}, I came across your profile and was intrigued by your experience with ${recipient.role || "your role"}.`,
        `Hey ${recipient.name}, I saw your recent post about ${recipient.mutualInterest || "your industry"} and wanted to connect.`,
        `Hi ${recipient.name}, I'm reaching out because I noticed we share an interest in ${recipient.mutualInterest || "similar topics"}.`,
        `Hello ${recipient.name}, I'm a fan of ${recipient.company || "your company"}'s work and wanted to connect with you specifically.`,
      ]
      
      setIcebreakers(newIcebreakers)
      setIsGenerating(false)
    }, 1000)
  }

  const handleSelect = (icebreaker: string) => {
    setSelectedIcebreaker(icebreaker)
    onSelect(icebreaker)
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">Personalized Icebreaker</h3>
          <p className="text-sm text-muted-foreground">
            Generate personalized openers based on recipient information
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="icebreaker-toggle"
            checked={enabled}
            onCheckedChange={onToggle}
          />
          <Label htmlFor="icebreaker-toggle">Enable</Label>
        </div>
      </div>

      {enabled && (
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={generateIcebreakers}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Icebreakers
              </>
            )}
          </Button>

          {icebreakers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Suggested Icebreakers</h4>
              <div className="space-y-2">
                {icebreakers.map((icebreaker, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-md border cursor-pointer transition-colors",
                      selectedIcebreaker === icebreaker
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleSelect(icebreaker)}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm">{icebreaker}</p>
                      {selectedIcebreaker === icebreaker && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
} 