import { useState } from "react"
import { Platform, Tone } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface FollowUpMessage {
  id: string
  content: string
  delay: number
}

interface DMFollowUpBuilderProps {
  platform: Platform
  tone: Tone
  enabled: boolean
  onToggle: (enabled: boolean) => void
  onFollowUpsChange: (followUps: string[]) => void
}

export function DMFollowUpBuilder({
  platform,
  tone,
  enabled,
  onToggle,
  onFollowUpsChange,
}: DMFollowUpBuilderProps) {
  const [followUps, setFollowUps] = useState<FollowUpMessage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const addFollowUp = () => {
    const newFollowUp: FollowUpMessage = {
      id: Date.now().toString(),
      content: "",
      delay: followUps.length === 0 ? 3 : followUps[followUps.length - 1].delay + 2,
    }
    setFollowUps([...followUps, newFollowUp])
  }

  const removeFollowUp = (id: string) => {
    const updatedFollowUps = followUps.filter((fu) => fu.id !== id)
    setFollowUps(updatedFollowUps)
    updateParentFollowUps(updatedFollowUps)
  }

  const updateFollowUpContent = (id: string, content: string) => {
    const updatedFollowUps = followUps.map((fu) =>
      fu.id === id ? { ...fu, content } : fu
    )
    setFollowUps(updatedFollowUps)
    updateParentFollowUps(updatedFollowUps)
  }

  const updateFollowUpDelay = (id: string, delay: number) => {
    const updatedFollowUps = followUps.map((fu) =>
      fu.id === id ? { ...fu, delay } : fu
    )
    setFollowUps(updatedFollowUps)
  }

  const updateParentFollowUps = (updatedFollowUps: FollowUpMessage[]) => {
    onFollowUpsChange(updatedFollowUps.map((fu) => fu.content))
  }

  const generateFollowUps = () => {
    setIsGenerating(true)
    
    // Simulate API call to generate follow-ups
    setTimeout(() => {
      const platformSpecificFollowUps = getPlatformSpecificFollowUps()
      const newFollowUps = platformSpecificFollowUps.map((content, index) => ({
        id: Date.now().toString() + index,
        content,
        delay: (index + 1) * 3,
      }))
      
      setFollowUps(newFollowUps)
      updateParentFollowUps(newFollowUps)
      setIsGenerating(false)
    }, 1000)
  }

  const getPlatformSpecificFollowUps = () => {
    switch (platform) {
      case "linkedin":
        return [
          "I wanted to follow up on my previous message. Would you be open to a brief conversation about potential collaboration?",
          "I understand you're busy, but I'd really appreciate just a quick response to know if this is something you'd be interested in discussing further.",
        ]
      case "email":
        return [
          "I'm following up on my previous email. I'd love to get your thoughts on this opportunity.",
          "I wanted to make sure my previous email didn't get lost in your inbox. Would you have a moment to review it?",
        ]
      case "whatsapp":
        return [
          "Hey, just checking if you had a chance to see my previous message?",
          "I wanted to follow up on my earlier message. Let me know if you'd like to connect!",
        ]
      default:
        return [
          "Just following up on my previous message. Would love to hear your thoughts!",
          "I wanted to make sure you saw my previous message. Let me know if you're interested in connecting!",
        ]
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">Follow-up Messages</h3>
          <p className="text-sm text-muted-foreground">
            Create a sequence of follow-up messages to increase response rates
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="followup-toggle"
            checked={enabled}
            onCheckedChange={onToggle}
          />
          <Label htmlFor="followup-toggle">Enable</Label>
        </div>
      </div>

      {enabled && (
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={generateFollowUps}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>Generating follow-ups...</>
            ) : (
              <>Generate Follow-up Sequence</>
            )}
          </Button>

          <div className="space-y-4">
            {followUps.map((followUp, index) => (
              <div
                key={followUp.id}
                className="p-4 border rounded-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Follow-up {index + 1}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{followUp.delay} days later</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFollowUp(followUp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={followUp.content}
                  onChange={(e) => updateFollowUpContent(followUp.id, e.target.value)}
                  placeholder="Enter follow-up message content..."
                  className="min-h-[100px]"
                />
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`delay-${followUp.id}`}>Delay (days):</Label>
                  <Input
                    id={`delay-${followUp.id}`}
                    type="number"
                    min={1}
                    value={followUp.delay}
                    onChange={(e) => updateFollowUpDelay(followUp.id, parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={addFollowUp}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Follow-up Message
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
} 