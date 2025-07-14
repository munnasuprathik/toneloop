"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Clock, MessageSquare, Star } from "lucide-react"

interface Suggestion {
  id: string
  type: "topic" | "time" | "tone" | "template"
  title: string
  description: string
  score: number
  action?: () => void
}

interface SmartSuggestionsProps {
  suggestions: Suggestion[]
  onApply: (suggestion: Suggestion) => void
  className?: string
}

export function SmartSuggestions({
  suggestions,
  onApply,
  className,
}: SmartSuggestionsProps) {
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredSuggestions = selectedType === "all"
    ? suggestions
    : suggestions.filter(s => s.type === selectedType)

  const getIcon = (type: string) => {
    switch (type) {
      case "topic":
        return <Sparkles className="h-4 w-4" />
      case "time":
        return <Clock className="h-4 w-4" />
      case "tone":
        return <MessageSquare className="h-4 w-4" />
      case "template":
        return <Star className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Smart Suggestions
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedType === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedType("all")}
          >
            All
          </Button>
          <Button
            variant={selectedType === "topic" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedType("topic")}
          >
            Topics
          </Button>
          <Button
            variant={selectedType === "time" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedType("time")}
          >
            Timing
          </Button>
          <Button
            variant={selectedType === "tone" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedType("tone")}
          >
            Tones
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 rounded-lg border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getIcon(suggestion.type)}
                    <h4 className="font-medium">{suggestion.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-xs bg-secondary px-2 py-1 rounded">
                      {suggestion.score}% match
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onApply(suggestion)}
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
} 