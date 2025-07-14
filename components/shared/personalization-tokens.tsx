"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"

interface Token {
  key: string
  value: string
}

interface PersonalizationTokensProps {
  tokens: Token[]
  onTokensChange: (tokens: Token[]) => void
}

export function PersonalizationTokens({
  tokens,
  onTokensChange,
}: PersonalizationTokensProps) {
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")

  const handleAddToken = () => {
    if (newKey && newValue) {
      const newTokens = [...tokens, { key: newKey, value: newValue }]
      onTokensChange(newTokens)
      setNewKey("")
      setNewValue("")
    }
  }

  const handleRemoveToken = (index: number) => {
    const newTokens = tokens.filter((_, i) => i !== index)
    onTokensChange(newTokens)
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Personalization Tokens</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Token key (e.g., name)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <Input
            placeholder="Token value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button onClick={handleAddToken} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {tokens.map((token, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1 p-2 bg-muted rounded-md">
              <span className="font-mono text-sm">
                {`{{${token.key}}}`}
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                → {token.value}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveToken(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
} 