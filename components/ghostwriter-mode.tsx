"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToneSelector } from "@/components/tone-selector"
import { PlatformSelector } from "@/components/platform-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mic,
  MicOff,
  Loader2,
  MessageSquare,
  Copy,
  Calendar,
  Save,
  Ghost,
  FileText,
  Image,
  Zap,
  Twitter,
  Linkedin,
  BookOpen,
  LayoutList,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"

export function GhostwriterMode() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordedText, setRecordedText] = useState("")
  const [topic, setTopic] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [outputFormats, setOutputFormats] = useState<string[]>(["post"])
  const [promptPack, setPromptPack] = useState("")
  const [scheduleDate, setScheduleDate] = useState<string>("")
  const [scheduleTime, setScheduleTime] = useState<string>("09:00")
  const [activeTab, setActiveTab] = useState("voice")
  const [activeOutputTab, setActiveOutputTab] = useState("post")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Prompt pack suggestions
  const promptPacks = [
    { id: "founder", name: "Founder Lessons", description: "Share insights from your founder journey" },
    { id: "team", name: "Team Culture", description: "Talk about building and nurturing teams" },
    { id: "product", name: "Product Journey", description: "Share product development stories" },
    { id: "funding", name: "Funding Experience", description: "Discuss fundraising and investor relations" },
    { id: "growth", name: "Growth Strategies", description: "Share tactics that drove business growth" },
    { id: "failure", name: "Failure & Resilience", description: "Talk about overcoming setbacks" },
  ]

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setScheduleDate(tomorrow.toISOString().split("T")[0])

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    toast({
      title: "Recording started",
      description: "Speak your message idea or topic...",
    })
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Simulate speech-to-text conversion
    setTimeout(() => {
      const simulatedText =
        "I just realized my product failed because I ignored the user's voice. It was a hard lesson."
      setRecordedText(simulatedText)
      setTopic(simulatedText)

      toast({
        title: "Recording processed",
        description: "Your voice has been converted to text.",
      })
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleGenerate = () => {
    if (!topic) {
      toast({
        title: "Missing information",
        description: "Please provide a topic or idea for your content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      const sampleOutputs = {
        post: `Ignoring your users is the fastest way to fail. I learned it the hard way.

When we launched our first product, we were so convinced of our vision that we dismissed early feedback. "Users don't know what they want," we told ourselves.

Six months and $200K later, we had a beautifully engineered product that solved a problem nobody actually had.

The hard truth: your vision means nothing if it doesn't solve a real user pain point.

Now, we talk to users before writing a single line of code. Our NPS went from -15 to +65.

Stay close to the people you build for. Their problems are your opportunity.

#StartupLessons #ProductDevelopment`,

        tweet: `Ignoring your users is the fastest way to fail. I learned it the hard way.

Stay close to the people you build for. Their problems are your opportunity.`,

        carousel: `# Slide 1
## The Costly Mistake Every Founder Makes
Ignoring your users is the fastest way to fail. I learned it the hard way.

# Slide 2
## The Ego Trap
When we launched our first product, we were so convinced of our vision that we dismissed early feedback.

"Users don't know what they want," we told ourselves.

# Slide 3
## The Expensive Lesson
Six months and $200K later, we had a beautifully engineered product that solved a problem nobody actually had.

# Slide 4
## The Hard Truth
Your vision means nothing if it doesn't solve a real user pain point.

# Slide 5
## The Turnaround
Now, we talk to users before writing a single line of code. Our NPS went from -15 to +65.

# Slide 6
## The Golden Rule
Stay close to the people you build for. Their problems are your opportunity.`,

        blog: `# Ignoring User Feedback: My $200K Mistake

## The Ego-Driven Beginning

When we launched our first product, we were so convinced of our vision that we dismissed early feedback. "Users don't know what they want," we told ourselves. This Steve Jobs-inspired mindset seemed romantic and visionary at the time.

## The Painful Reality Check

Six months and $200K later, we had a beautifully engineered product that solved a problem nobody actually had. Our launch day came with great fanfare but little interest. The metrics were abysmal:

- Sign-ups: 80% below projections
- Activation rate: 12% (industry average: 35%)
- Retention after 30 days: 3%

## The Turnaround Strategy

The hard truth hit us: your vision means nothing if it doesn't solve a real user pain point. We had to radically change our approach:

1. **User interviews first**: We conducted 50+ interviews before touching the codebase
2. **Problem validation**: We created simple prototypes to test if we were solving real problems
3. **Continuous feedback loops**: We built systems to constantly gather and analyze user feedback

## The Results

The transformation was remarkable. Our next product launch showed:

- NPS improvement from -15 to +65
- Retention increased to 42%
- Word-of-mouth became our primary acquisition channel

## Key Lessons

Stay close to the people you build for. Their problems are your opportunity. Vision is important, but it must be grounded in user reality.

The most expensive education I ever received was learning that building in isolation is the surest path to failure.`,
      }

      setGeneratedMessage(sampleOutputs[activeOutputTab as keyof typeof sampleOutputs])
      setIsGenerating(false)

      toast({
        title: "Content generated",
        description: `Your ${activeOutputTab} content is ready.`,
      })
    }, 2000)
  }

  const handleCopy = () => {
    if (!generatedMessage) return
    navigator.clipboard.writeText(generatedMessage)
    toast({
      title: "Copied to clipboard",
      description: "Your content has been copied to the clipboard.",
    })
  }

  const handleSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      toast({
        title: "Missing schedule information",
        description: "Please select a date and time for scheduling.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Content scheduled",
      description: `Your content will be posted on ${scheduleDate} at ${scheduleTime}.`,
    })
  }

  const handlePromptPackSelect = (packId: string) => {
    setPromptPack(packId)

    // Set topic based on selected prompt pack
    const promptSuggestions = {
      founder:
        "The biggest mistake I made when starting my company was focusing too much on the product and not enough on distribution.",
      team: "Building a remote-first culture taught me that trust and clear communication are more important than physical presence.",
      product:
        "We pivoted our product three times before finding product-market fit. Here's what I learned about listening to users.",
      funding: "Raising our Series A taught me that investors invest in lines, not dots. Here's how we built momentum.",
      growth: "The counterintuitive growth hack that took us from 100 to 10,000 users in 60 days.",
      failure:
        "Our first product failed because we built something nobody wanted. Here's how we recovered and found success.",
    }

    setTopic(promptSuggestions[packId as keyof typeof promptSuggestions] || "")
  }

  const handleOutputFormatChange = (format: string) => {
    const isSelected = outputFormats.includes(format)

    if (isSelected) {
      // Don't allow deselecting the last format
      if (outputFormats.length > 1) {
        setOutputFormats(outputFormats.filter((f) => f !== format))
      }
    } else {
      setOutputFormats([...outputFormats, format])
    }

    // If the active tab is being deselected, change to the first available format
    if (isSelected && activeOutputTab === format && outputFormats.length > 1) {
      const newActiveTab = outputFormats.find((f) => f !== format) || outputFormats[0]
      setActiveOutputTab(newActiveTab)
    }

    // If adding a new format and no active tab, set this as active
    if (!isSelected && !activeOutputTab) {
      setActiveOutputTab(format)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ghostwriter Mode</CardTitle>
              <CardDescription>Turn your voice or rough ideas into polished content</CardDescription>
            </div>
            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">Plus Feature</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="voice">Voice Input</TabsTrigger>
              <TabsTrigger value="text">Text Input</TabsTrigger>
              <TabsTrigger value="prompt-packs">Prompt Packs</TabsTrigger>
            </TabsList>

            <TabsContent value="voice" className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                {isRecording ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                      <Mic className="h-8 w-8 text-red-600" />
                    </div>
                    <div className="text-xl font-mono">{formatTime(recordingTime)}</div>
                    <p className="text-sm text-muted-foreground">Recording in progress...</p>
                    <Button variant="destructive" onClick={handleStopRecording} className="mt-2">
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="font-medium">Record Your Message Idea</p>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      Speak your message idea or topic, and we'll convert it to text and generate content
                    </p>
                    <Button onClick={handleStartRecording} className="mt-2 bg-purple-600 hover:bg-purple-700">
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  </div>
                )}
              </div>

              {recordedText && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Transcribed
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => setRecordedText("")}>
                      Clear
                    </Button>
                  </div>
                  <p className="text-sm">{recordedText}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Your Idea or Topic</Label>
                <Textarea
                  id="topic"
                  placeholder="Enter your rough idea or topic for content creation..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  Just type a rough idea, and we'll transform it into polished content
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleStartRecording}>
                  <Mic className="mr-2 h-4 w-4" />
                  Voice Input
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
                <Button variant="outline" size="sm">
                  <Image className="mr-2 h-4 w-4" />
                  Add Media
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="prompt-packs" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promptPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      promptPack === pack.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handlePromptPackSelect(pack.id)}
                  >
                    <h3 className="font-medium">{pack.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                  </div>
                ))}
              </div>

              {promptPack && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="prompt-topic">Customize Your Topic</Label>
                  <Textarea
                    id="prompt-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Edit the suggested topic or write your own based on the selected theme
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label className="block mb-2">Tone</Label>
              <ToneSelector selectedTone={selectedTone} onSelectTone={setSelectedTone} />
            </div>
            <div>
              <Label className="block mb-2">Platform</Label>
              <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform={setSelectedPlatform} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Output Formats</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={outputFormats.includes("post") ? "default" : "outline"}
                size="sm"
                onClick={() => handleOutputFormatChange("post")}
                className={outputFormats.includes("post") ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Post
              </Button>
              <Button
                variant={outputFormats.includes("tweet") ? "default" : "outline"}
                size="sm"
                onClick={() => handleOutputFormatChange("tweet")}
                className={outputFormats.includes("tweet") ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Tweet
              </Button>
              <Button
                variant={outputFormats.includes("carousel") ? "default" : "outline"}
                size="sm"
                onClick={() => handleOutputFormatChange("carousel")}
                className={outputFormats.includes("carousel") ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                <LayoutList className="mr-2 h-4 w-4" />
                Carousel
              </Button>
              <Button
                variant={outputFormats.includes("blog") ? "default" : "outline"}
                size="sm"
                onClick={() => handleOutputFormatChange("blog")}
                className={outputFormats.includes("blog") ? "bg-green-500 hover:bg-green-600" : ""}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-end">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Ghost className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedMessage && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Your ghostwritten content in {selectedTone ? selectedTone.replace(/-/g, " ") : "selected"} tone
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {outputFormats.length > 1 && (
                  <Tabs value={activeOutputTab} onValueChange={setActiveOutputTab}>
                    <TabsList>
                      {outputFormats.includes("post") && <TabsTrigger value="post">Post</TabsTrigger>}
                      {outputFormats.includes("tweet") && <TabsTrigger value="tweet">Tweet</TabsTrigger>}
                      {outputFormats.includes("carousel") && <TabsTrigger value="carousel">Carousel</TabsTrigger>}
                      {outputFormats.includes("blog") && <TabsTrigger value="blog">Blog</TabsTrigger>}
                    </TabsList>
                  </Tabs>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-900">
              <pre className="whitespace-pre-wrap break-words text-sm font-sans">{generatedMessage}</pre>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium">Schedule Post</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">Date</Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-time">Time</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-post" />
                  <Label htmlFor="auto-post">
                    Auto-post to {selectedPlatform ? selectedPlatform.split("-")[0] : "platform"}
                  </Label>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Optimal Time
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">Optimal Posting Times</h4>
                      <p className="text-sm text-muted-foreground">Based on your audience engagement</p>

                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Linkedin className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-sm">LinkedIn</span>
                          </div>
                          <span className="text-sm font-medium">Tue/Thu 9-10 AM</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </div>
                          <span className="text-sm font-medium">Mon/Wed 12-1 PM</span>
                        </div>

                        <Button
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            setScheduleTime("09:00")
                            toast({
                              title: "Optimal time set",
                              description: "Schedule updated to the optimal posting time.",
                            })
                          }}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Use Optimal Time
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Weekly Ghost Session reminder is set for Monday at 9 AM. You'll receive a notification to create new
                  content.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save as Template
              </Button>
            </div>
            <Button onClick={handleSchedule} className="bg-purple-600 hover:bg-purple-700">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

