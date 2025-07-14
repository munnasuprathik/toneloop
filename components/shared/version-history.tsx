"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, RotateCcw, Check } from "lucide-react"
import { format } from "date-fns"

interface Version {
  id: string
  content: string
  timestamp: Date
  tone?: string
  platform?: string
}

interface VersionHistoryProps {
  versions: Version[]
  onRestore: (version: Version) => void
  className?: string
}

export function VersionHistory({ versions, onRestore, className }: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Version History
        </h3>
        <span className="text-sm text-muted-foreground">
          {versions.length} versions
        </span>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {versions.map((version) => (
            <div
              key={version.id}
              className={`p-3 rounded-lg border transition-colors ${
                selectedVersion === version.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {format(version.timestamp, "MMM d, yyyy h:mm a")}
                  </p>
                  <p className="text-sm line-clamp-2">{version.content}</p>
                  {(version.tone || version.platform) && (
                    <div className="flex items-center gap-2 mt-2">
                      {version.tone && (
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {version.tone}
                        </span>
                      )}
                      {version.platform && (
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {version.platform}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedVersion(version.id)
                    onRestore(version)
                  }}
                  className="shrink-0"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
} 