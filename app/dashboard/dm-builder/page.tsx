"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare, 
  Users, 
  Copy, 
  Save, 
  Download, 
  History, 
  Star, 
  Check, 
  X, 
  AlertCircle,
  ChevronRight,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles,
  Calendar,
  FileUp,
  Mic,
  Send,
  Settings,
  Tag,
  Clock
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Platform data
const platforms = [
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    description: "Professional networking platform",
    useCases: [
      { id: "job-seekers", name: "Job Seekers", description: "People looking for job opportunities" },
      { id: "founders", name: "Founders", description: "Company founders and entrepreneurs" },
      { id: "recruiters", name: "Recruiters", description: "HR and recruitment professionals" },
      { id: "marketers", name: "Marketers", description: "Marketing and advertising professionals" },
      { id: "hiring-managers", name: "Hiring Managers", description: "People responsible for hiring" },
      { id: "mentors", name: "Mentors", description: "People offering mentorship" },
      { id: "product-managers", name: "Product Managers", description: "Product management professionals" }
    ]
  },
  { 
    id: "twitter", 
    name: "X.com (Twitter)", 
    description: "Short-form social media platform",
    useCases: [
      { id: "influencers", name: "Influencers", description: "Social media influencers" },
      { id: "entrepreneurs", name: "Entrepreneurs", description: "Business owners and entrepreneurs" },
      { id: "creators", name: "Creators", description: "Content creators" },
      { id: "journalists", name: "Journalists", description: "News and media professionals" },
      { id: "communities", name: "Communities", description: "Community groups and forums" },
      { id: "brand-pages", name: "Brand Pages", description: "Official brand accounts" }
    ]
  },
  { 
    id: "instagram", 
    name: "Instagram", 
    description: "Visual social media platform",
    useCases: [
      { id: "creators", name: "Creators", description: "Content creators" },
      { id: "models", name: "Models", description: "Fashion and lifestyle models" },
      { id: "influencers", name: "Influencers", description: "Social media influencers" },
      { id: "community-managers", name: "Community Managers", description: "People managing communities" },
      { id: "small-businesses", name: "Small Businesses", description: "Small business owners" }
    ]
  },
  { 
    id: "whatsapp", 
    name: "WhatsApp", 
    description: "Messaging platform",
    useCases: [
      { id: "clients", name: "Clients", description: "Business clients" },
      { id: "colleagues", name: "Colleagues", description: "Work colleagues" },
      { id: "sales-leads", name: "Sales Leads", description: "Potential customers" },
      { id: "friends", name: "Friends", description: "Personal contacts" },
      { id: "groups", name: "Groups", description: "Group chats" },
      { id: "support-teams", name: "Support Teams", description: "Customer support" }
    ]
  },
  { 
    id: "email", 
    name: "Email", 
    description: "Email communication",
    useCases: [
      { id: "hr", name: "HR", description: "Human resources professionals" },
      { id: "sales-prospects", name: "Sales Prospects", description: "Potential customers" },
      { id: "clients", name: "Clients", description: "Business clients" },
      { id: "teachers", name: "Teachers", description: "Educational professionals" },
      { id: "company-founders", name: "Company Founders", description: "Business owners" },
      { id: "team-leads", name: "Team Leads", description: "Team managers" }
    ]
  },
  { 
    id: "slack", 
    name: "Slack", 
    description: "Team communication platform",
    useCases: [
      { id: "coworkers", name: "Coworkers", description: "Work colleagues" },
      { id: "teams", name: "Teams", description: "Work teams" },
      { id: "managers", name: "Managers", description: "Team managers" },
      { id: "startup-founders", name: "Startup Founders", description: "Startup entrepreneurs" },
      { id: "collaborators", name: "Collaborators", description: "Project collaborators" }
    ]
  },
  { 
    id: "reddit", 
    name: "Reddit", 
    description: "Community forums",
    useCases: [
      { id: "community-mods", name: "Community Mods", description: "Community moderators" },
      { id: "niche-users", name: "Niche Users", description: "Specialized community members" },
      { id: "ama-participants", name: "AMA Participants", description: "People in AMA sessions" },
      { id: "interest-group-members", name: "Interest Group Members", description: "Members of specific groups" }
    ]
  }
]

// Tone options
const tones = [
  { id: "professional", name: "Professional", description: "Formal and business-appropriate" },
  { id: "friendly", name: "Friendly", description: "Warm and approachable" },
  { id: "casual", name: "Casual", description: "Relaxed and informal" },
  { id: "enthusiastic", name: "Enthusiastic", description: "Energetic and positive" },
  { id: "confident", name: "Confident", description: "Assured and self-assured" },
  { id: "humorous", name: "Humorous", description: "Funny and witty" },
  { id: "empathetic", name: "Empathetic", description: "Understanding and supportive" },
  { id: "persuasive", name: "Persuasive", description: "Convincing and compelling" },
  { id: "informative", name: "Informative", description: "Educational and explanatory" },
  { id: "custom", name: "Custom", description: "Create your own tone" }
]

// DM templates data
const dmTemplates = [
  { 
    id: "cold-outreach", 
    name: "Cold Outreach", 
    description: "Initial contact with a new prospect",
    structure: [
      { id: "intro", name: "Introduction", required: true },
      { id: "value", name: "Value Proposition", required: true },
      { id: "call-to-action", name: "Call to Action", required: true }
    ]
  },
  { 
    id: "follow-up", 
    name: "Follow-up", 
    description: "Follow-up after initial contact",
    structure: [
      { id: "reference", name: "Previous Contact Reference", required: true },
      { id: "reminder", name: "Reminder of Value", required: true },
      { id: "next-steps", name: "Next Steps", required: true }
    ]
  },
  { 
    id: "nurture", 
    name: "Nurture", 
    description: "Building relationship with existing contacts",
    structure: [
      { id: "personal-touch", name: "Personal Touch", required: true },
      { id: "update", name: "Update or News", required: true },
      { id: "engagement", name: "Engagement Prompt", required: true }
    ]
  },
  { 
    id: "re-engagement", 
    name: "Re-engagement", 
    description: "Reconnecting with dormant contacts",
    structure: [
      { id: "apology", name: "Apology for Gap", required: true },
      { id: "update", name: "What's New", required: true },
      { id: "value", name: "New Value Proposition", required: true },
      { id: "reconnect", name: "Reconnection Request", required: true }
    ]
  },
  { 
    id: "custom", 
    name: "Custom", 
    description: "Create your own DM structure",
    structure: []
  }
]

// Personalization variables
const personalizationVariables = [
  { id: "first-name", name: "First Name", description: "Contact's first name" },
  { id: "last-name", name: "Last Name", description: "Contact's last name" },
  { id: "company", name: "Company", description: "Contact's company name" },
  { id: "position", name: "Position", description: "Contact's job title" },
  { id: "industry", name: "Industry", description: "Contact's industry" },
  { id: "location", name: "Location", description: "Contact's location" },
  { id: "mutual-connection", name: "Mutual Connection", description: "Name of mutual connection" },
  { id: "previous-interaction", name: "Previous Interaction", description: "Details of previous interaction" },
  { id: "specific-interest", name: "Specific Interest", description: "Contact's specific interest or need" },
  { id: "custom-field", name: "Custom Field", description: "Add your own custom field" }
]

// Famous personas
const famousPersonas = [
  { id: "elon-musk", name: "Elon Musk", description: "Tech entrepreneur and CEO of Tesla and SpaceX" },
  { id: "barack-obama", name: "Barack Obama", description: "Former U.S. President" },
  { id: "naval-ravikant", name: "Naval Ravikant", description: "Entrepreneur, investor, and philosopher" },
  { id: "ali-abdaal", name: "Ali Abdaal", description: "Content creator and productivity expert" },
  { id: "taylor-swift", name: "Taylor Swift", description: "Singer-songwriter and musician" },
  { id: "steve-jobs", name: "Steve Jobs", description: "Co-founder of Apple Inc." },
  { id: "bill-gates", name: "Bill Gates", description: "Co-founder of Microsoft" },
  { id: "oprah-winfrey", name: "Oprah Winfrey", description: "Media executive, actress, and philanthropist" },
  { id: "sheryl-sandberg", name: "Sheryl Sandberg", description: "Former COO of Meta Platforms" },
  { id: "tony-robbins", name: "Tony Robbins", description: "Life coach and motivational speaker" },
  { id: "joe-rogan", name: "Joe Rogan", description: "Podcast host and comedian" },
  { id: "warren-buffett", name: "Warren Buffett", description: "Investor and CEO of Berkshire Hathaway" },
  { id: "rihanna", name: "Rihanna", description: "Singer, actress, and businesswoman" },
  { id: "kanye-west", name: "Kanye West", description: "Rapper, producer, and fashion designer" },
  { id: "tim-ferriss", name: "Tim Ferriss", description: "Author, entrepreneur, and podcaster" },
  { id: "sundar-pichai", name: "Sundar Pichai", description: "CEO of Alphabet and Google" },
  { id: "mark-cuban", name: "Mark Cuban", description: "Entrepreneur, investor, and TV personality" },
  { id: "emma-chamberlain", name: "Emma Chamberlain", description: "YouTuber and influencer" },
  { id: "serena-williams", name: "Serena Williams", description: "Tennis player and entrepreneur" },
  { id: "jeff-bezos", name: "Jeff Bezos", description: "Founder of Amazon" },
  { id: "greta-thunberg", name: "Greta Thunberg", description: "Environmental activist" },
  { id: "sachin-tendulkar", name: "Sachin Tendulkar", description: "Former cricketer" },
  { id: "virat-kohli", name: "Virat Kohli", description: "Cricketer" },
  { id: "mukesh-ambani", name: "Mukesh Ambani", description: "Chairman of Reliance Industries" },
  { id: "satya-nadella", name: "Satya Nadella", description: "CEO of Microsoft" },
  { id: "ranveer-allahbadia", name: "Ranveer Allahbadia", description: "Content creator and entrepreneur" },
  { id: "apj-abdul-kalam", name: "A.P.J. Abdul Kalam", description: "Former President of India" },
  { id: "indra-nooyi", name: "Indra Nooyi", description: "Former CEO of PepsiCo" },
  { id: "malala-yousafzai", name: "Malala Yousafzai", description: "Education activist and Nobel laureate" },
  { id: "pewdiepie", name: "PewDiePie", description: "YouTuber and content creator" }
]

// Normal personas
const normalPersonas = [
  { id: "teacher", name: "Teacher", description: "Educational professional" },
  { id: "student", name: "Student", description: "Person pursuing education" },
  { id: "friend", name: "Friend", description: "Personal acquaintance" },
  { id: "doctor", name: "Doctor", description: "Medical professional" },
  { id: "parent", name: "Parent", description: "Person with children" },
  { id: "job-seeker", name: "Job Seeker", description: "Person looking for employment" },
  { id: "leader", name: "Leader", description: "Person in a leadership position" },
  { id: "mentor", name: "Mentor", description: "Person providing guidance" },
  { id: "analyst", name: "Analyst", description: "Person analyzing data or situations" },
  { id: "coach", name: "Coach", description: "Person providing training or guidance" },
  { id: "marketer", name: "Marketer", description: "Person promoting products or services" },
  { id: "ceo", name: "CEO", description: "Chief Executive Officer" },
  { id: "developer", name: "Developer", description: "Software developer" },
  { id: "freelancer", name: "Freelancer", description: "Self-employed professional" },
  { id: "public-speaker", name: "Public Speaker", description: "Person who speaks to audiences" }
]

export default function DMBuilderPage() {
  // Core state
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedUseCase, setSelectedUseCase] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [useCustomMessage, setUseCustomMessage] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [selectedPersona, setSelectedPersona] = useState("")
  const [personaType, setPersonaType] = useState<"famous" | "normal" | "none">("none")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [useTemplate, setUseTemplate] = useState(false)

  // Simplified handlers
  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId)
    setSelectedUseCase("")
  }

  const handleUseCaseSelect = (useCaseId: string) => {
    setSelectedUseCase(useCaseId)
  }

  const handleToneSelect = (toneId: string) => {
    setSelectedTone(toneId)
    setSelectedPersona("")
    setPersonaType("none")
  }

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId)
    setSelectedTone("")
  }

  const handlePersonaTypeSelect = (type: "famous" | "normal" | "none") => {
    setPersonaType(type)
    setSelectedPersona("")
    setSelectedTone("")
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleGenerateMessage = async () => {
    if (!selectedPlatform || !selectedUseCase || (!selectedTone && !selectedPersona)) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      if (useCustomMessage) {
        setMessageContent(customMessage)
      } else {
        let toneDescription = ""
        if (selectedTone) {
          const tone = tones.find(t => t.id === selectedTone)
          toneDescription = tone ? tone.description : ""
        } else if (selectedPersona) {
          const persona = personaType === "famous" 
            ? famousPersonas.find(p => p.id === selectedPersona)
            : normalPersonas.find(p => p.id === selectedPersona)
          toneDescription = persona ? `Writing as ${persona.name}: ${persona.description}` : ""
        }
        
        let templateInfo = ""
        if (useTemplate && selectedTemplate) {
          const template = dmTemplates.find(t => t.id === selectedTemplate)
          if (template) {
            templateInfo = `\n\nTemplate: ${template.name} - ${template.description}`
          }
        }
        
        setMessageContent(`Generated message content will appear here...\n\nTone: ${toneDescription}${templateInfo}`)
      }
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">DM Builder</h1>
          <p className="text-muted-foreground">Create personalized direct messages in seconds</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Panel - Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Message Settings</CardTitle>
              <CardDescription>Configure your message parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Selection */}
              <div className="space-y-2">
                <Label>Platform</Label>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={selectedPlatform === platform.id ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handlePlatformSelect(platform.id)}
                    >
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Use Case Selection */}
              {selectedPlatform && (
                <div className="space-y-2">
                  <Label>Recipient Type</Label>
                  <Select value={selectedUseCase} onValueChange={handleUseCaseSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms
                        .find(p => p.id === selectedPlatform)
                        ?.useCases.map(useCase => (
                          <SelectItem key={useCase.id} value={useCase.id}>
                            {useCase.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Optional Template Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Template (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="use-template" 
                      checked={useTemplate}
                      onCheckedChange={setUseTemplate}
                    />
                    <Label htmlFor="use-template" className="text-sm">
                      {useTemplate ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                </div>
                {useTemplate && (
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {dmTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Tone Selection */}
              <div className="space-y-2">
                <Label>Message Tone</Label>
                <Tabs defaultValue="tones" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tones">Tones</TabsTrigger>
                    <TabsTrigger value="famous">Famous</TabsTrigger>
                    <TabsTrigger value="normal">Normal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tones" className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {tones.map(tone => (
                        <Button
                          key={tone.id}
                          variant={selectedTone === tone.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleToneSelect(tone.id)}
                        >
                          {tone.name}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="famous" className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {famousPersonas.map(persona => (
                        <Button
                          key={persona.id}
                          variant={selectedPersona === persona.id && personaType === "famous" ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => {
                            setPersonaType("famous")
                            handlePersonaSelect(persona.id)
                          }}
                        >
                          {persona.name}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="normal" className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {normalPersonas.map(persona => (
                        <Button
                          key={persona.id}
                          variant={selectedPersona === persona.id && personaType === "normal" ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => {
                            setPersonaType("normal")
                            handlePersonaSelect(persona.id)
                          }}
                        >
                          {persona.name}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Optional Message Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Custom Message (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="custom-message" 
                      checked={useCustomMessage}
                      onCheckedChange={setUseCustomMessage}
                    />
                    <Label htmlFor="custom-message" className="text-sm">
                      {useCustomMessage ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                </div>
                {useCustomMessage && (
                  <Textarea
                    placeholder="Type your custom message here..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-[120px]"
                  />
                )}
              </div>

              {/* Generate Button */}
              <Button 
                className="w-full" 
                onClick={handleGenerateMessage}
                disabled={!selectedPlatform || !selectedUseCase || (!selectedTone && !selectedPersona) || isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Message"}
              </Button>
            </CardContent>
          </Card>

          {/* Right Panel - Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Message Preview</CardTitle>
                <CardDescription>Your generated message</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      {platforms.find(p => p.id === selectedPlatform)?.name} - 
                      {platforms.find(p => p.id === selectedPlatform)?.useCases.find(u => u.id === selectedUseCase)?.name}
                    </p>
                    {selectedPersona && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Tone: {personaType === "famous" 
                          ? famousPersonas.find(p => p.id === selectedPersona)?.name
                          : normalPersonas.find(p => p.id === selectedPersona)?.name}
                      </p>
                    )}
                    {selectedTone && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Tone: {tones.find(t => t.id === selectedTone)?.name}
                      </p>
                    )}
                    {useTemplate && selectedTemplate && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Template: {dmTemplates.find(t => t.id === selectedTemplate)?.name}
                      </p>
                    )}
                    <p>{messageContent || "Your message will appear here..."}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Configure your message settings to generate a preview
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 