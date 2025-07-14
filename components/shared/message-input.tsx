"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Upload, Copy, Check, RefreshCw, Save, Bookmark } from "lucide-react"
import { toast } from "sonner"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ToneAdjustment } from "./tone-adjustment"
import { PersonalizationTokens } from "./personalization-tokens"

interface Token {
  key: string
  value: string
}

interface MessageInputProps {
  onGenerate: (input: string, tone: string, platform: string, adjustments: ToneAdjustments, tokens: Token[]) => void
  onCopy?: (text: string) => void
  onSave?: (message: SavedMessage) => void
  defaultTone?: string
  defaultPlatform?: string
  showToneSelector?: boolean
  showPlatformSelector?: boolean
  placeholder?: string
  label?: string
  loading?: boolean
}

interface ToneAdjustments {
  friendliness: number
  formality: number
  conciseness: number
}

interface SavedMessage {
  content: string
  tone: string
  platform: string
  adjustments: ToneAdjustments
  tokens: Token[]
}

export function MessageInput({
  onGenerate,
  onCopy,
  onSave,
  defaultTone = "professional",
  defaultPlatform = "linkedin",
  showToneSelector = true,
  showPlatformSelector = true,
  placeholder = "Type your message here...",
  label = "Message",
  loading = false
}: MessageInputProps) {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [isCopied, setIsCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [tokens, setTokens] = useState<Token[]>([])
  const [adjustments, setAdjustments] = useState<ToneAdjustments>({
    friendliness: 50,
    formality: 50,
    conciseness: 50
  })

  // Use localStorage to persist user preferences
  const [lastUsedTone, setLastUsedTone] = useLocalStorage("lastUsedTone", defaultTone)
  const [lastUsedPlatform, setLastUsedPlatform] = useLocalStorage("lastUsedPlatform", defaultPlatform)

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text first")
      return
    }

    setIsGenerating(true)
    try {
      await onGenerate(input, lastUsedTone, lastUsedPlatform, adjustments, tokens)
      toast.success("Message generated successfully!")
    } catch (error) {
      toast.error("Failed to generate message")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (onCopy) {
      onCopy(input)
    } else {
      try {
        await navigator.clipboard.writeText(input)
        setIsCopied(true)
        toast.success("Copied to clipboard!")
        setTimeout(() => setIsCopied(false), 2000)
      } catch (error) {
        toast.error("Failed to copy text")
      }
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        content: input,
        tone: lastUsedTone,
        platform: lastUsedPlatform,
        adjustments,
        tokens
      })
      toast.success("Message saved!")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInput(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      setMediaRecorder(recorder)
      setIsRecording(true)

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, e.data])
        }
      }

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        // Here you would typically send this to a speech-to-text service
        // For now, we'll just show a success message
        toast.success("Voice recording captured!")
        setAudioChunks([])
      }

      recorder.start()
    } catch (error) {
      toast.error("Failed to access microphone")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)
      mediaRecorder.stream.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="message">{label}</Label>
            <div className="flex items-center gap-2">
              {showToneSelector && (
                <Select
                  value={lastUsedTone}
                  onValueChange={(value) => {
                    setLastUsedTone(value)
                    toast.success(`Tone set to ${value}`)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="empathetic">Empathetic</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {showPlatformSelector && (
                <Select
                  value={lastUsedPlatform}
                  onValueChange={(value) => {
                    setLastUsedPlatform(value)
                    toast.success(`Platform set to ${value}`)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <Textarea
            id="message"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px]"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                className={isRecording ? "text-red-500" : ""}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!input.trim()}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              {onSave && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  disabled={!input.trim()}
                >
                  <Save className="h-4 w-4" />
                </Button>
              )}
              <Button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating || loading}
              >
                {isGenerating || loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <ToneAdjustment
          friendliness={adjustments.friendliness}
          formality={adjustments.formality}
          conciseness={adjustments.conciseness}
          onFriendlinessChange={(value) => setAdjustments(prev => ({ ...prev, friendliness: value }))}
          onFormalityChange={(value) => setAdjustments(prev => ({ ...prev, formality: value }))}
          onConcisenessChange={(value) => setAdjustments(prev => ({ ...prev, conciseness: value }))}
        />

        <PersonalizationTokens
          tokens={tokens}
          onTokensChange={setTokens}
        />
      </div>
    </div>
  )
} 