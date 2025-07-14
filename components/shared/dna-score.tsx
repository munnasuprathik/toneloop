"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dna, CheckCircle2, XCircle } from "lucide-react"

interface DNAAttribute {
  name: string
  score: number
  description: string
}

interface DNAScoreProps {
  score: number
  attributes: DNAAttribute[]
  className?: string
}

export function DNAScore({ score, attributes, className }: DNAScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Dna className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Writing DNA Match</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Match</span>
            <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
              {score}%
            </span>
          </div>
          <Progress value={score} className="h-2" />
        </div>

        <div className="space-y-4">
          {attributes.map((attribute) => (
            <div key={attribute.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{attribute.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${getScoreColor(attribute.score)}`}>
                    {attribute.score}%
                  </span>
                  {attribute.score >= 70 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <Progress value={attribute.score} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {attribute.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 