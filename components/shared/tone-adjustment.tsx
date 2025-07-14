"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface ToneAdjustmentProps {
  friendliness: number
  formality: number
  conciseness: number
  onFriendlinessChange: (value: number) => void
  onFormalityChange: (value: number) => void
  onConcisenessChange: (value: number) => void
}

export function ToneAdjustment({
  friendliness,
  formality,
  conciseness,
  onFriendlinessChange,
  onFormalityChange,
  onConcisenessChange,
}: ToneAdjustmentProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Friendliness</Label>
          <span className="text-sm text-muted-foreground">{friendliness}%</span>
        </div>
        <Slider
          value={[friendliness]}
          onValueChange={([value]) => onFriendlinessChange(value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Formality</Label>
          <span className="text-sm text-muted-foreground">{formality}%</span>
        </div>
        <Slider
          value={[formality]}
          onValueChange={([value]) => onFormalityChange(value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Conciseness</Label>
          <span className="text-sm text-muted-foreground">{conciseness}%</span>
        </div>
        <Slider
          value={[conciseness]}
          onValueChange={([value]) => onConcisenessChange(value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </Card>
  )
} 