"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ToneSelector } from "@/components/tone-selector"
import { PlatformSelector } from "@/components/platform-selector"
import {
  Loader2,
  Save,
  Copy,
  Sparkles,
  Mic,
  Pause,
  Check,
  Upload,
  Image,
  Wand2,
  Smile,
  ArrowRight,
  Minimize,
  MessageSquare,
  Clock,
  Heart,
  ThumbsUp,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function MessageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState("")
  const [activePreviewTab, setActivePreviewTab] = useState("preview")
  const [activeIntentTab, setActiveIntentTab] = useState("custom")
  const [personalizationFields, setPersonalizationFields] = useState<{ name: string; value: string }[]>([
    { name: "recipient_name", value: "" },
    { name: "company_name", value: "" },
    { name: "date", value: new Date().toLocaleDateString() },
  ])
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [friendliness, setFriendliness] = useState([50])
  const [conciseness, setConciseness] = useState([50])
  const [formality, setFormality] = useState([50])
  const [useEmojis, setUseEmojis] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Intent quick prompts
  const intentPrompts = {
    apology: "I need to apologize for missing the deadline on the project.",
    celebration: "I want to congratulate the team on reaching our quarterly goals.",
    followup: "I'm following up on our conversation about the new marketing strategy.",
    clarification: "I need to clarify the requirements for the upcoming project.",
    question: "I have a question about the budget allocation for next quarter.",
    idea: "I have an idea for improving our customer onboarding process.",
  }

  const handleGenerate = async () => {
    if (!prompt || !selectedTone || !selectedPlatform) {
      toast({
        title: "Missing information",
        description: "Please provide a prompt, select a tone, and choose a platform.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Process personalization fields
    let processedPrompt = prompt
    personalizationFields.forEach((field) => {
      if (field.value) {
        processedPrompt = processedPrompt.replace(new RegExp(`{{${field.name}}}`, "g"), field.value)
      }
    })

    try {
      // Simulate API call
      setTimeout(() => {
        // Sample messages for different intents
        const sampleMessages = {
          apology: `I wanted to reach out and sincerely apologize for missing the deadline on our project. This isn't representative of my usual work ethic, and I understand the impact it may have had on our timeline.

I've taken steps to ensure this won't happen again, including implementing a better tracking system for my deliverables. The revised work will be in your inbox by end of day tomorrow.

Please let me know if you'd like to discuss this further. I appreciate your understanding.`,

          celebration: `Team,

Incredible work hitting our quarterly goals! 🎉

We've not only met but exceeded our targets by 15%, which puts us in an excellent position for Q2. This achievement reflects everyone's dedication and smart execution.

I'd like to especially recognize the marketing team for their creative campaign that drove a 30% increase in leads, and the dev team for launching our new feature ahead of schedule.

Let's build on this momentum. I've scheduled a team celebration for next Friday – details to follow.

Great job, everyone!`,

          custom: `I've been thinking about our conversation regarding the new marketing strategy. The approach you outlined has significant potential, especially the focus on personalized customer journeys.

Based on my experience with similar initiatives, I believe we could enhance the strategy by incorporating more data-driven decision points at key customer touchpoints. This would allow us to optimize in real-time rather than waiting for campaign completion.

Would you be open to discussing this further? I've drafted some specific suggestions that might complement your existing framework.

Looking forward to your thoughts.`,
        }

        // Apply tone adjustments
        let message = sampleMessages[activeIntentTab as keyof typeof sampleMessages] || sampleMessages.custom

        // Apply friendliness adjustment
        if (friendliness[0] > 70) {
          message = message.replace(/\./g, "! ")
          message = message.replace(/I appreciate/g, "I really appreciate")
          message = message.replace(/Thank you/g, "Thank you so much")
        } else if (friendliness[0] < 30) {
          message = message.replace(/I wanted to/g, "I need to")
          message = message.replace(/Would you be/g, "Are you")
          message = message.replace(/I believe/g, "I think")
        }

        // Apply conciseness adjustment
        if (conciseness[0] > 70) {
          // Make more concise
          message = message
            .split("\n\n")
            .map((para) => {
              // Keep first and last paragraph, shorten middle ones
              return para.split(". ").slice(0, 1).join(". ") + "."
            })
            .join("\n\n")
        }

        // Apply formality adjustment
        if (formality[0] > 70) {
          message = message.replace(/I think/g, "I believe")
          message = message.replace(/Let's/g, "We should")
          message = message.replace(/Great job/g, "Excellent work")
        } else if (formality[0] < 30) {
          message = message.replace(/I believe/g, "I think")
          message = message.replace(/Would you be open to/g, "Wanna")
          message = message.replace(/discuss this further/g, "chat more about this")
        }

        // Add emojis if enabled
        if (useEmojis) {
          message = message.replace(/Thank you/g, "Thank you 🙏")
          message = message.replace(/congratulate/g, "congratulate 🎉")
          message = message.replace(/excellent/gi, "excellent ✨")
          message = message.replace(/great job/gi, "great job 🚀")
          message = message.replace(/looking forward/gi, "looking forward 👀")
        }

        setGeneratedMessage(message)
        setIsGenerating(false)

        toast({
          title: "Message generated",
          description: "Your message has been created successfully.",
        })
      }, 1500)
    } catch (error) {
      console.error("Error generating message:", error)
      toast({
        title: "Generation failed",
        description: "There was an error generating your message. Please try again.",
        variant: "destructive",
      })
      setIsGenerating(false)
    }
  }

  const handleSpeechRecognition = () => {
    setIsRecording(true)

    // Simulate speech recognition
    toast({
      title: "Listening...",
      description: "Speak your message content",
    })

    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setRecordedText(
        "I need to follow up with the client about their feedback on our proposal and schedule a meeting to discuss next steps.",
      )

      toast({
        title: "Speech recognized",
        description: "Your speech has been converted to text",
      })
    }, 3000)
  }

  const handleUseRecordedText = () => {
    setPrompt(recordedText)
    setRecordedText("")

    toast({
      title: "Text added",
      description: "The transcribed text has been added to your prompt",
    })
  }

  const handleCopyMessage = () => {
    if (!generatedMessage) return

    navigator.clipboard.writeText(generatedMessage)
    toast({
      title: "Copied to clipboard",
      description: "Your message has been copied to the clipboard.",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    // For this demo, we'll simulate parsing different file types
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        // In a real app, you would parse different file types differently
        // For now, we'll just use the text content for text files
        if (
          file.type.includes("text") ||
          file.name.endsWith(".md") ||
          file.name.endsWith(".csv") ||
          file.name.endsWith(".rtf")
        ) {
          setPrompt(event.target.result as string)
          toast({
            title: "File uploaded",
            description: `Content from "${file.name}" has been loaded.`,
          })
        } else {
          // For other files, simulate extraction
          setTimeout(() => {
            setPrompt(`Content extracted from ${file.name}.

In a production environment, we would use specialized libraries to extract text from ${file.type} files.`)
            toast({
              title: "File processed",
              description: `Content from "${file.name}" has been extracted.`,
            })
          }, 1000)
        }
      }
    }

    // For text-based files, read as text
    if (
      file.type.includes("text") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".csv") ||
      file.name.endsWith(".rtf")
    ) {
      reader.readAsText(file)
    } else {
      // For binary files, read as array buffer (in a real app, you'd use specific parsers)
      reader.readAsArrayBuffer(file)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleIntentSelect = (intent: string) => {
    setActiveIntentTab(intent)
    if (intent !== "custom") {
      setPrompt(intentPrompts[intent as keyof typeof intentPrompts])
    }
  }

  const handleAddPersonalizationField = () => {
    setPersonalizationFields([...personalizationFields, { name: "", value: "" }])
  }

  const handleUpdatePersonalizationField = (index: number, field: { name: string; value: string }) => {
    const newFields = [...personalizationFields]
    newFields[index] = field
    setPersonalizationFields(newFields)
  }

  const handleRemovePersonalizationField = (index: number) => {
    const newFields = [...personalizationFields]
    newFields.splice(index, 1)
    setPersonalizationFields(newFields)
  }

  const handleInsertPersonalizationField = (fieldName: string) => {
    const textArea = document.getElementById("prompt") as HTMLTextAreaElement
    if (textArea) {
      const cursorPos = textArea.selectionStart
      const textBefore = prompt.substring(0, cursorPos)
      const textAfter = prompt.substring(cursorPos)
      setPrompt(textBefore + `{{${fieldName}}}` + textAfter)

      // Focus back on textarea and set cursor position after the inserted field
      setTimeout(() => {
        textArea.focus()
        const newCursorPos = cursorPos + fieldName.length + 4 // 4 for the {{ and }}
        textArea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    } else {
      setPrompt(prompt + `{{${fieldName}}}`)
    }
  }

  const handleRephrase = (type: string) => {
    if (!generatedMessage) return

    toast({
      title: "Rephrasing message",
      description: `Making your message ${type}...`,
    })

    setTimeout(() => {
      let newMessage = generatedMessage

      switch (type) {
        case "friendlier":
          setFriendliness([85])
          newMessage = newMessage.replace(/\./g, "! ")
          newMessage = newMessage.replace(/I appreciate/g, "I really appreciate")
          newMessage = newMessage.replace(/Thank you/g, "Thank you so much 😊")
          break
        case "shorter":
          setConciseness([85])
          // Make more concise by keeping only first sentence of each paragraph
          newMessage = newMessage
            .split("\n\n")
            .map((para) => {
              return para.split(". ")[0] + "."
            })
            .join("\n\n")
          break
        case "formal":
          setFormality([85])
          newMessage = newMessage.replace(/I think/g, "I believe")
          newMessage = newMessage.replace(/Let's/g, "We should")
          newMessage = newMessage.replace(/Great job/g, "Excellent work")
          break
        case "emoji":
          setUseEmojis(true)
          newMessage = newMessage.replace(/Thank you/g, "Thank you 🙏")
          newMessage = newMessage.replace(/congratulate/g, "congratulate 🎉")
          newMessage = newMessage.replace(/excellent/gi, "excellent ✨")
          newMessage = newMessage.replace(/great job/gi, "great job 🚀")
          newMessage = newMessage.replace(/looking forward/gi, "looking forward 👀")
          break
      }

      setGeneratedMessage(newMessage)

      toast({
        title: "Message rephrased",
        description: `Your message is now ${type}.`,
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">1. Choose Your Tone</CardTitle>
              <CardDescription>Select a persona tone for your message</CardDescription>
            </CardHeader>
            <CardContent>
              <ToneSelector selectedTone={selectedTone} onSelectTone={setSelectedTone} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">2. Select Platform</CardTitle>
              <CardDescription>Choose where your message will be posted</CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform={setSelectedPlatform} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">3. Enter Your Message</CardTitle>
                  <CardDescription>What do you want to say?</CardDescription>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Wand2 className="h-4 w-4 mr-2" />
                      Personalize
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Personalization Fields</h4>
                      <p className="text-xs text-muted-foreground">
                        Insert these fields into your message to personalize it.
                      </p>

                      <div className="space-y-2">
                        {personalizationFields.map((field, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              placeholder="Field name"
                              value={field.name}
                              onChange={(e) =>
                                handleUpdatePersonalizationField(index, {
                                  ...field,
                                  name: e.target.value,
                                })
                              }
                              className="flex-1 h-8"
                            />
                            <Input
                              placeholder="Value"
                              value={field.value}
                              onChange={(e) =>
                                handleUpdatePersonalizationField(index, {
                                  ...field,
                                  value: e.target.value,
                                })
                              }
                              className="flex-1 h-8"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleRemovePersonalizationField(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={handleAddPersonalizationField}>
                          Add Field
                        </Button>
                        <Button size="sm" onClick={() => setShowPersonalization(false)}>
                          Done
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeIntentTab} onValueChange={handleIntentSelect}>
                <TabsList className="grid grid-cols-3 mb-2 h-auto p-1">
                  <TabsTrigger value="custom" className="text-xs py-1.5">
                    Custom
                  </TabsTrigger>
                  <TabsTrigger value="apology" className="text-xs py-1.5">
                    Apology
                  </TabsTrigger>
                  <TabsTrigger value="celebration" className="text-xs py-1.5">
                    Celebration
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid grid-cols-3 h-auto p-1">
                  <TabsTrigger value="followup" className="text-xs py-1.5">
                    Follow-up
                  </TabsTrigger>
                  <TabsTrigger value="clarification" className="text-xs py-1.5">
                    Clarification
                  </TabsTrigger>
                  <TabsTrigger value="idea" className="text-xs py-1.5">
                    Idea Sharing
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative">
                <Textarea
                  id="prompt"
                  placeholder="Enter your message topic or idea..."
                  className="min-h-[120px] resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <div className="absolute bottom-2 right-2 flex gap-1">
                  {personalizationFields.map(
                    (field, index) =>
                      field.name && (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleInsertPersonalizationField(field.name)}
                        >
                          {field.name}
                        </Button>
                      ),
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleSpeechRecognition}
                  disabled={isRecording}
                >
                  {isRecording ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Voice Input
                    </>
                  )}
                </Button>

                <Button variant="outline" size="sm" onClick={triggerFileUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".txt,.md,.rtf,.csv,.doc,.docx,.xls,.xlsx,.pdf,.odt,.ods,.ppt,.pptx"
                    onChange={handleFileUpload}
                  />
                </Button>

                <Button variant="outline" size="sm">
                  <Image className="mr-2 h-4 w-4" />
                  Add Media
                </Button>
              </div>

              {recordedText && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Mic className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm font-medium">Transcribed Text</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setRecordedText("")}>
                      <span className="sr-only">Close</span>
                      <span aria-hidden="true">×</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{recordedText}</p>
                  <div className="flex justify-end">
                    <Button size="sm" className="h-7" onClick={handleUseRecordedText}>
                      <Check className="mr-1 h-3 w-3" />
                      Use This Text
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 px-6 py-4">
              <Button
                onClick={handleGenerate}
                disabled={!prompt || !selectedTone || !selectedPlatform || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Message
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Generated Message</CardTitle>
                  <CardDescription>Your AI-generated content will appear here</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {generatedMessage && (
                    <Button variant="ghost" size="sm" className="h-8" onClick={handleCopyMessage}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {isGenerating ? (
                <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                    <p className="text-sm text-muted-foreground">Generating your message...</p>
                  </div>
                </div>
              ) : !generatedMessage ? (
                <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800 mb-4">
                      <Sparkles className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="font-medium">Your message will appear here</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      Select a tone, platform, and enter your message content, then click "Generate Message"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab} className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <TabsContent value="preview" className="flex-1 flex flex-col">
                        <div className="rounded-lg border p-4 flex-1">
                          <div className="whitespace-pre-wrap break-words text-sm">{generatedMessage}</div>
                        </div>
                      </TabsContent>

                      <TabsContent value="linkedin" className="flex-1 flex flex-col">
                        <div className="rounded-lg border p-4 bg-[#f3f2ef] dark:bg-gray-800 flex-1">
                          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                              <div>
                                <div className="font-semibold">John Doe</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">CEO at Example Company</div>
                              </div>
                            </div>
                            <div className="whitespace-pre-wrap break-words text-sm">{generatedMessage}</div>
                            <div className="flex items-center mt-4 pt-3 border-t">
                              <ThumbsUp className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                              <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">24 reactions</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="whatsapp" className="flex-1 flex flex-col">
                        <div className="rounded-lg border p-4 bg-[#e5ded8] dark:bg-gray-800 flex-1">
                          <div className="max-w-[80%] bg-white dark:bg-gray-900 rounded-lg p-3 mb-2 ml-auto">
                            <div className="whitespace-pre-wrap break-words text-sm">{generatedMessage}</div>
                            <div className="flex justify-end items-center mt-1">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-400">10:30 AM</span>
                              <Check className="h-3 w-3 text-blue-500 ml-1" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="email" className="flex-1 flex flex-col">
                        <div className="rounded-lg border p-4 bg-white dark:bg-gray-900 flex-1">
                          <div className="border-b pb-3 mb-3">
                            <div className="flex items-center mb-2">
                              <span className="font-medium w-20">From:</span>
                              <span>john.doe@example.com</span>
                            </div>
                            <div className="flex items-center mb-2">
                              <span className="font-medium w-20">To:</span>
                              <span>recipient@example.com</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium w-20">Subject:</span>
                              <span className="font-medium">Re: Your Inquiry</span>
                            </div>
                          </div>
                          <div className="whitespace-pre-wrap break-words text-sm">{generatedMessage}</div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>

                  {/* Tone adjustment controls */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Quick Adjustments</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRephrase("friendlier")}
                        className="justify-start"
                      >
                        <Smile className="h-4 w-4 mr-2 text-amber-500" />
                        Make it friendlier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRephrase("shorter")}
                        className="justify-start"
                      >
                        <Minimize className="h-4 w-4 mr-2 text-blue-500" />
                        Make it shorter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRephrase("formal")}
                        className="justify-start"
                      >
                        <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                        Make it formal
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRephrase("emoji")}
                        className="justify-start"
                      >
                        <Smile className="h-4 w-4 mr-2 text-green-500" />
                        Add emojis
                      </Button>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="friendliness">Friendliness</Label>
                          <span className="text-xs text-muted-foreground">{friendliness[0]}%</span>
                        </div>
                        <Slider
                          id="friendliness"
                          min={0}
                          max={100}
                          step={1}
                          value={friendliness}
                          onValueChange={setFriendliness}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="conciseness">Conciseness</Label>
                          <span className="text-xs text-muted-foreground">{conciseness[0]}%</span>
                        </div>
                        <Slider
                          id="conciseness"
                          min={0}
                          max={100}
                          step={1}
                          value={conciseness}
                          onValueChange={setConciseness}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="use-emojis" checked={useEmojis} onCheckedChange={setUseEmojis} />
                          <Label htmlFor="use-emojis">Use emojis</Label>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleGenerate} className="h-8">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {generatedMessage && (
              <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-between">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save as Template
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Use Message
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

