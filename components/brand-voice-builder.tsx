"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2, ArrowRight, Link as LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function BrandVoiceBuilder() {
  const [isLoading, setIsLoading] = useState(false)
  const [toneName, setToneName] = useState("")
  const [toneDescription, setToneDescription] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [brandBrief, setBrandBrief] = useState("")
  const [brandBriefUrl, setBrandBriefUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const emojis = ["👔", "😊", "🚀", "💻", "🎯", "🎓", "📊", "🛠️", "💡", "🌟"]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleCreate = () => {
    if (!toneName.trim() || !toneDescription.trim() || !selectedEmoji) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Voice profile created",
        description: `"${toneName}" has been created successfully.`,
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Brand Voice</CardTitle>
          <CardDescription>
            Define your brand's unique voice and personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tone-name">Voice Name</Label>
            <Input
              id="tone-name"
              placeholder="e.g., Marketing Team, Customer Support"
              value={toneName}
              onChange={(e) => setToneName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone-description">Description</Label>
            <Textarea
              id="tone-description"
              placeholder="Describe the voice and personality..."
              value={toneDescription}
              onChange={(e) => setToneDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Emoji</Label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant={selectedEmoji === emoji ? "default" : "outline"}
                  size="sm"
                  className="text-xl"
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Brand Brief</Label>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand-brief">Text Description</Label>
                <Textarea
                  id="brand-brief"
                  placeholder="Describe your brand's values, mission, and target audience..."
                  value={brandBrief}
                  onChange={(e) => setBrandBrief(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand-brief-url">External Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="brand-brief-url"
                    placeholder="Paste Notion, Google Doc, or other link"
                    value={brandBriefUrl}
                    onChange={(e) => setBrandBriefUrl(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {uploadedFile ? uploadedFile.name : "No file chosen"}
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Voice Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 