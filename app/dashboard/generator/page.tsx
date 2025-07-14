"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  MessageSquare, 
  Upload, 
  Mic, 
  Copy, 
  Save, 
  Download, 
  History, 
  Star, 
  Check, 
  X, 
  AlertCircle,
  ChevronRight,
  Wand2
} from "lucide-react"

// Famous personas data
const famousPersonas = [
  { id: "elon-musk", name: "Elon Musk", description: "Innovative, direct, and future-focused" },
  { id: "barack-obama", name: "Barack Obama", description: "Inspirational, measured, and inclusive" },
  { id: "naval-ravikant", name: "Naval Ravikant", description: "Philosophical, concise, and wisdom-focused" },
  { id: "ali-abdaal", name: "Ali Abdaal", description: "Educational, friendly, and productivity-focused" },
  { id: "taylor-swift", name: "Taylor Swift", description: "Personal, storytelling, and relatable" },
  { id: "steve-jobs", name: "Steve Jobs", description: "Visionary, persuasive, and minimalist" },
  { id: "bill-gates", name: "Bill Gates", description: "Analytical, philanthropic, and solution-oriented" },
  { id: "oprah-winfrey", name: "Oprah Winfrey", description: "Empowering, empathetic, and motivational" },
  { id: "sheryl-sandberg", name: "Sheryl Sandberg", description: "Professional, leadership-focused, and data-driven" },
  { id: "tony-robbins", name: "Tony Robbins", description: "Motivational, high-energy, and action-oriented" },
  { id: "joe-rogan", name: "Joe Rogan", description: "Conversational, curious, and engaging" },
  { id: "warren-buffett", name: "Warren Buffett", description: "Wise, analytical, and value-focused" },
  { id: "rihanna", name: "Rihanna", description: "Bold, confident, and trendsetting" },
  { id: "kanye-west", name: "Kanye West", description: "Creative, bold, and disruptive" },
  { id: "tim-ferriss", name: "Tim Ferriss", description: "Analytical, experimental, and optimization-focused" },
  { id: "sundar-pichai", name: "Sundar Pichai", description: "Technical, strategic, and innovation-focused" },
  { id: "mark-cuban", name: "Mark Cuban", description: "Direct, entrepreneurial, and results-driven" },
  { id: "emma-chamberlain", name: "Emma Chamberlain", description: "Authentic, relatable, and trend-aware" },
  { id: "serena-williams", name: "Serena Williams", description: "Powerful, determined, and excellence-focused" },
  { id: "jeff-bezos", name: "Jeff Bezos", description: "Customer-centric, strategic, and long-term focused" },
  { id: "greta-thunberg", name: "Greta Thunberg", description: "Passionate, direct, and cause-driven" },
  { id: "sachin-tendulkar", name: "Sachin Tendulkar", description: "Humble, masterful, and inspiring" },
  { id: "virat-kohli", name: "Virat Kohli", description: "Passionate, aggressive, and performance-driven" },
  { id: "mukesh-ambani", name: "Mukesh Ambani", description: "Strategic, growth-focused, and visionary" },
  { id: "satya-nadella", name: "Satya Nadella", description: "Transformative, empathetic, and tech-focused" },
  { id: "ranveer-allahbadia", name: "Ranveer Allahbadia", description: "Motivational, practical, and youth-focused" },
  { id: "apj-abdul-kalam", name: "A.P.J. Abdul Kalam", description: "Inspirational, scientific, and visionary" },
  { id: "indra-nooyi", name: "Indra Nooyi", description: "Strategic, performance-driven, and culturally aware" },
  { id: "malala-yousafzai", name: "Malala Yousafzai", description: "Courageous, educational, and advocacy-focused" },
  { id: "pewdiepie", name: "PewDiePie", description: "Entertaining, authentic, and community-focused" }
]

// Normal personas data
const normalPersonas = [
  { id: "teacher", name: "Teacher", description: "Educational, patient, and encouraging" },
  { id: "student", name: "Student", description: "Curious, enthusiastic, and learning-focused" },
  { id: "friend", name: "Friend", description: "Casual, supportive, and conversational" },
  { id: "doctor", name: "Doctor", description: "Professional, authoritative, and caring" },
  { id: "parent", name: "Parent", description: "Nurturing, protective, and guidance-focused" },
  { id: "job-seeker", name: "Job Seeker", description: "Professional, eager, and value-focused" },
  { id: "leader", name: "Leader", description: "Visionary, decisive, and team-focused" },
  { id: "mentor", name: "Mentor", description: "Wise, supportive, and growth-oriented" },
  { id: "analyst", name: "Analyst", description: "Data-driven, precise, and insight-focused" },
  { id: "coach", name: "Coach", description: "Motivational, strategic, and improvement-focused" },
  { id: "marketer", name: "Marketer", description: "Strategic, persuasive, and audience-focused" },
  { id: "ceo", name: "CEO", description: "Strategic, leadership-focused, and results-driven" },
  { id: "developer", name: "Developer", description: "Technical, problem-solving, and detail-oriented" },
  { id: "freelancer", name: "Freelancer", description: "Independent, flexible, and client-focused" },
  { id: "public-speaker", name: "Public Speaker", description: "Engaging, impactful, and audience-aware" }
]

// Platform data
const platforms = [
  { id: "linkedin", name: "LinkedIn", description: "Professional networking", characterLimit: 3000 },
  { id: "twitter", name: "Twitter (X)", description: "Short-form social media", characterLimit: 280 },
  { id: "whatsapp", name: "WhatsApp", description: "Messaging platform", characterLimit: 1000 },
  { id: "instagram", name: "Instagram", description: "Visual social media", characterLimit: 2200 },
  { id: "email", name: "Email", description: "Email communication", characterLimit: 50000 },
  { id: "facebook", name: "Facebook", description: "Social networking", characterLimit: 63206 },
  { id: "reddit", name: "Reddit", description: "Community forums", characterLimit: 40000 },
]

// Template data
const templates = [
  { id: "hook-value-cta", name: "Hook + Value + CTA", description: "Grab attention, provide value, call to action" },
  { id: "story", name: "Story Format", description: "Narrative structure with beginning, middle, and end" },
  { id: "tips", name: "Tips & Tricks", description: "List of helpful advice or insights" },
  { id: "question", name: "Question Format", description: "Engage audience with thought-provoking questions" },
  { id: "problem-solution", name: "Problem-Solution", description: "Identify problem, present solution" },
  { id: "how-to", name: "How-To Guide", description: "Step-by-step instructions for a process" },
]

type Persona = { id: string; name: string; description: string }
type Platform = { id: string; name: string; description: string; characterLimit: number }
type Template = { id: string; name: string; description: string }

export default function MessageGeneratorPage() {
  // Dynamic data state
  const [personas, setPersonas] = useState<{ famousPersonas: Persona[]; normalPersonas: Persona[] }>({ famousPersonas: [], normalPersonas: [] })
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Core state
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedPersonaType, setSelectedPersonaType] = useState<"famous" | "normal" | "none">("none")
  const [selectedPersona, setSelectedPersona] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [context, setContext] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  
  // Additional features state
  const [useTemplate, setUseTemplate] = useState(false)
  const [messageHistory, setMessageHistory] = useState<Array<{id: string, content: string, timestamp: Date}>>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch("/api/personas").then(res => res.json()),
      fetch("/api/platforms").then(res => res.json()),
      fetch("/api/templates").then(res => res.json()),
    ]).then(([personasData, platformsData, templatesData]) => {
      setPersonas(personasData)
      setPlatforms(platformsData.platforms)
      setTemplates(templatesData.templates)
      setLoading(false)
    }).catch(() => {
      setError("Failed to load data. Please refresh the page.")
      setLoading(false)
    })
  }, [])

  const handleGenerate = async () => {
    if (!selectedPlatform || !selectedPersona || !context) return
    
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      const persona = selectedPersonaType === "famous" 
        ? personas.famousPersonas.find(p => p.id === selectedPersona)
        : personas.normalPersonas.find(p => p.id === selectedPersona)
      
      const platform = platforms.find(p => p.id === selectedPlatform)
      const template = useTemplate ? templates.find(t => t.id === selectedTemplate) : null
      
      let message = `Generated as ${persona?.name} for ${platform?.name}:\n\n`
      
      if (template) {
        switch (template.id) {
          case "hook-value-cta":
            message += `🚀 ${context}\n\n`
            message += `Here's why this matters: [Value proposition]\n\n`
            message += `Ready to take action? [Call to action]`
            break
          case "story":
            message += `Let me share a story...\n\n`
            message += `${context}\n\n`
            message += `The key takeaway: [Main insight]`
            break
          case "tips":
            message += `Top tips about ${context}:\n\n`
            message += `1. [Key insight 1]\n`
            message += `2. [Key insight 2]\n`
            message += `3. [Key insight 3]`
            break
          default:
            message += context
        }
      } else {
        message += context
      }
      
      setGeneratedMessage(message)
      setMessageHistory(prev => [
        { id: Date.now().toString(), content: message, timestamp: new Date() },
        ...prev
      ])
      
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
    toast.success("Message copied to clipboard!")
  }

  const handleDownloadMessage = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedMessage], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "generated-message.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Message Generator</h1>
            <p className="text-muted-foreground">Create platform-specific messages with AI personas</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            aria-label="Show message history"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></span>
            <span className="ml-4 text-muted-foreground">Loading data...</span>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center py-12">
            <span className="text-red-500 font-medium">{error}</span>
          </div>
        )}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column - Configuration */}
            <div className="space-y-6">
              {/* Platform Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Choose Platform</CardTitle>
                  <CardDescription>Select where you'll share your message</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.id}
                        variant={selectedPlatform === platform.id ? "default" : "outline"}
                        className="w-full justify-start transition-all duration-150"
                        onClick={() => setSelectedPlatform(platform.id)}
                        aria-pressed={selectedPlatform === platform.id}
                      >
                        <span className="truncate">{platform.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Persona Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Select Voice</CardTitle>
                  <CardDescription>Choose how your message should sound</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="famous" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="famous">Famous Personas</TabsTrigger>
                      <TabsTrigger value="normal">Normal Personas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="famous" className="space-y-2">
                      <ScrollArea className="h-[200px] rounded-md border p-2">
                        <div className="grid grid-cols-2 gap-2">
                          {personas.famousPersonas.map((persona) => (
                            <Button
                              key={persona.id}
                              variant={selectedPersona === persona.id && selectedPersonaType === "famous" ? "default" : "outline"}
                              className="w-full justify-start transition-all duration-150"
                              onClick={() => {
                                setSelectedPersonaType("famous")
                                setSelectedPersona(persona.id)
                              }}
                              aria-pressed={selectedPersona === persona.id && selectedPersonaType === "famous"}
                            >
                              <span className="truncate">{persona.name}</span>
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="normal" className="space-y-2">
                      <ScrollArea className="h-[200px] rounded-md border p-2">
                        <div className="grid grid-cols-2 gap-2">
                          {personas.normalPersonas.map((persona) => (
                            <Button
                              key={persona.id}
                              variant={selectedPersona === persona.id && selectedPersonaType === "normal" ? "default" : "outline"}
                              className="w-full justify-start transition-all duration-150"
                              onClick={() => {
                                setSelectedPersonaType("normal")
                                setSelectedPersona(persona.id)
                              }}
                              aria-pressed={selectedPersona === persona.id && selectedPersonaType === "normal"}
                            >
                              <span className="truncate">{persona.name}</span>
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>3. Template (Optional)</CardTitle>
                      <CardDescription>Choose a message structure</CardDescription>
                    </div>
                    <Switch
                      checked={useTemplate}
                      onCheckedChange={setUseTemplate}
                      aria-label="Toggle template selection"
                    />
                  </div>
                </CardHeader>
                {useTemplate && (
                  <CardContent>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                )}
              </Card>

              {/* Message Input */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Your Message</CardTitle>
                  <CardDescription>Write or paste your message content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type your message here..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="min-h-[100px]"
                    aria-label="Message input"
                  />
                  <div className="mt-4">
                    <Button
                      className="w-full"
                      onClick={handleGenerate}
                      disabled={!selectedPlatform || !selectedPersona || !context || isGenerating}
                      aria-busy={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate Message
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview & History */}
            <div className="space-y-6">
              {/* Preview */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Message Preview</CardTitle>
                      <CardDescription>Generated content will appear here</CardDescription>
                    </div>
                    {generatedMessage && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleCopyMessage} aria-label="Copy message">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleDownloadMessage} aria-label="Download message">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedMessage ? (
                    <div className="rounded-lg border bg-muted p-4 transition-all duration-150">
                      <pre className="whitespace-pre-wrap font-sans">{generatedMessage}</pre>
                    </div>
                  ) : (
                    <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                      Configure your message settings and click Generate
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* History */}
              {showHistory && messageHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Message History</CardTitle>
                    <CardDescription>Your recently generated messages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {messageHistory.map((message) => (
                          <div
                            key={message.id}
                            className="rounded-lg border p-3 text-sm hover:bg-accent/30 transition-colors cursor-pointer"
                            tabIndex={0}
                            role="button"
                            aria-label="Load message"
                            onClick={() => setGeneratedMessage(message.content)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-muted-foreground">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setGeneratedMessage(message.content)}
                                aria-label="Load message"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="line-clamp-2">{message.content}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 