import { useState } from "react"
import { Platform, DMMessage } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Copy, Save, Send, Clock, Linkedin, Instagram, Twitter, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface DMPreviewProps {
  message: DMMessage | null
  onSaveTemplate: () => void
  onSchedule: (date: Date) => void
}

export function DMPreview({
  message,
  onSaveTemplate,
  onSchedule,
}: DMPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null)

  const handleCopy = () => {
    if (message) {
      navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSchedule = () => {
    // In a real app, this would open a date picker
    const date = new Date()
    date.setDate(date.getDate() + 1)
    setScheduledDate(date)
    onSchedule(date)
  }

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!message) {
    return (
      <Card className="p-6 flex items-center justify-center h-[300px]">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Your message will appear here
          </p>
          <p className="text-sm text-muted-foreground">
            Fill in the details and generate your message
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getPlatformIcon(message.platform)}
          <span className="font-medium capitalize">{message.platform}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground capitalize">
            {message.useCase.replace(/-/g, " ")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className={cn(copied && "text-green-500")}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSaveTemplate}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSchedule}
          >
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview">
        <TabsList className="w-full justify-start border-b rounded-none px-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="followups">Follow-ups</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-4 space-y-4">
          {message.subject && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Subject</p>
              <p className="text-sm border rounded-md p-2 bg-muted/50">
                {message.subject}
              </p>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm font-medium">Message</p>
            <div className="border rounded-md p-4 bg-muted/50 whitespace-pre-wrap">
              {message.content}
            </div>
          </div>

          {message.icebreaker && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Icebreaker</p>
              <div className="border rounded-md p-2 bg-muted/50">
                {message.icebreaker}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="followups" className="p-4 space-y-4">
          {message.followUps && message.followUps.length > 0 ? (
            <div className="space-y-4">
              {message.followUps.map((followUp, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Follow-up {index + 1} ({(index + 1) * 3} days later)
                    </p>
                  </div>
                  <div className="border rounded-md p-3 bg-muted/50">
                    {followUp}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No follow-up messages configured
            </div>
          )}
        </TabsContent>
      </Tabs>

      {scheduledDate && (
        <div className="border-t p-4 bg-muted/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Scheduled for {formatDate(scheduledDate)}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setScheduledDate(null)}>
            Cancel
          </Button>
        </div>
      )}
    </Card>
  )
} 