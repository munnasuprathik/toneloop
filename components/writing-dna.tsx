"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2, ArrowRight, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WritingDNA() {
  const [isLoading, setIsLoading] = useState(false)
  const [styleName, setStyleName] = useState("")
  const [writingSamples, setWritingSamples] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = () => {
    if (!styleName.trim() || !writingSamples.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a style name and writing samples.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const dnaProfile = `Writing DNA Profile: ${styleName}

Style Analysis:
- Sentence Structure: Complex, varied lengths
- Vocabulary Level: Advanced, industry-specific
- Tone: Professional yet approachable
- Writing Patterns: 
  * Frequent use of examples
  * Clear topic sentences
  * Balanced paragraph lengths
  * Strategic use of transitions

Key Characteristics:
1. Formal yet conversational tone
2. Data-driven arguments
3. Clear hierarchy in information
4. Consistent voice across content

Recommended Usage:
- Best for: Professional communications, technical documentation, thought leadership
- Platforms: LinkedIn, blog posts, whitepapers
- Tone adjustments: Maintain formality while adding personal touches

Sample Application:
"Based on our analysis of the market trends, we've identified three key opportunities for growth. First, the emerging demand for sustainable solutions presents a significant opening. Second, technological advancements enable us to streamline operations. Finally, changing consumer preferences create new avenues for innovation."

This profile can be used to maintain consistent writing style across all your content.`
      
      setOutput(dnaProfile)
      setIsLoading(false)

      toast({
        title: "Writing DNA generated",
        description: "Your writing style profile has been created successfully.",
      })
    }, 2000)
  }

  const handleCopy = () => {
    if (!output) return

    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Copied to clipboard",
      description: "Writing DNA profile has been copied.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Writing DNA</CardTitle>
          <CardDescription>
            Analyze and replicate your writing style patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="style-name">Style Name</Label>
            <Input
              id="style-name"
              placeholder="e.g., Technical Documentation, Thought Leadership"
              value={styleName}
              onChange={(e) => setStyleName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="writing-samples">Writing Samples</Label>
            <Textarea
              id="writing-samples"
              placeholder="Paste your writing samples here. Include various types of content for better analysis..."
              value={writingSamples}
              onChange={(e) => setWritingSamples(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Generate Writing DNA
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Writing DNA Profile</CardTitle>
                <CardDescription>
                  Your unique writing style analysis
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <pre className="whitespace-pre-wrap text-sm">{output}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 