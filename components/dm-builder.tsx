"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToneSelector } from "@/components/tone-selector"
import { PlatformSelector } from "@/components/platform-selector"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Users,
  Send,
  Copy,
  Save,
  Loader2,
  Briefcase,
  HandshakeIcon,
  UserPlus,
  Calendar,
  Clock,
  Linkedin,
  Mail,
  Twitter,
  AlertCircle,
  Search,
  Link,
  CheckCircle,
  ArrowRight,
  Check,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const platforms = [
  { value: "linkedin", label: "LinkedIn", icon: "💼" },
  { value: "instagram", label: "Instagram", icon: "📸" },
  { value: "twitter", label: "X (Twitter)", icon: "🐦" },
  { value: "email", label: "Email", icon: "✉️" },
  { value: "whatsapp", label: "WhatsApp", icon: "💬" },
]

const useCases = {
  linkedin: [
    { value: "networking", label: "Networking Request", description: "Build a new professional connection" },
    { value: "job-inquiry", label: "Job Inquiry", description: "Reach out to recruiters or employees" },
    { value: "hiring", label: "Hiring Outreach", description: "Recruit potential candidates" },
    { value: "sales", label: "Sales/Lead Generation", description: "Pitch a product or service" },
    { value: "partnership", label: "Partnership Inquiry", description: "Propose business collaboration" },
    { value: "event", label: "Event Invitation", description: "Invite to webinars or meetups" },
    { value: "follow-up", label: "Follow-Up Message", description: "After connecting or a meeting" },
    { value: "recommendation", label: "Recommendation Request", description: "Ask for endorsements" },
    { value: "content", label: "Content Appreciation", description: "Compliment on a recent post" },
    { value: "reconnect", label: "Reconnection", description: "Re-engage an old contact" },
  ],
  instagram: [
    { value: "collab", label: "Collab Request", description: "Reach out to influencers or brands" },
    { value: "shoutout", label: "Shoutout Request", description: "Ask for promotion or feature" },
    { value: "networking", label: "Networking", description: "Connect with creators in your space" },
    { value: "event", label: "Event Invitation", description: "Invite to IRL or virtual events" },
    { value: "cold", label: "Cold DM", description: "Introduce yourself or your product" },
    { value: "feedback", label: "Product Feedback", description: "Ask for reviews/testimonials" },
    { value: "creative", label: "Creative Partnership", description: "Discuss reels/posts collab" },
    { value: "brand", label: "Brand Enquiry", description: "Ask for product/brand details" },
  ],
  twitter: [
    { value: "quick-collab", label: "Quick Collab Pitch", description: "Short DM for collaboration" },
    { value: "event", label: "Event Hype Message", description: "Message about upcoming event" },
    { value: "appreciation", label: "Thread Appreciation", description: "React to someone's content" },
    { value: "feedback", label: "Feedback Request", description: "Ask feedback on a tweet/post" },
    { value: "intro", label: "Profile Intro", description: "Start a conversation with value" },
    { value: "startup", label: "Startup/Founder Connect", description: "Reach out to builders" },
    { value: "cold", label: "Cold Outreach", description: "Connect with strangers with value" },
  ],
  email: [
    { value: "cold-sales", label: "Cold Sales Email", description: "Introduce a service/product" },
    { value: "partnership", label: "Partnership Pitch", description: "Suggest collaboration or synergy" },
    { value: "hiring", label: "Hiring Outreach", description: "Contact potential candidates" },
    { value: "influencer", label: "Influencer Collab", description: "Email creators for collabs" },
    { value: "job", label: "Job Inquiry", description: "Apply or ask about roles" },
    { value: "service", label: "Service Inquiry", description: "Ask about services or rates" },
    { value: "follow-up", label: "Follow-Up Email", description: "Continue previous conversation" },
    { value: "feedback", label: "Feedback Request", description: "Ask for product/content feedback" },
    { value: "newsletter", label: "Newsletter Connection", description: "Reach out to subscribers" },
    { value: "investor", label: "Investor Pitch/Intro", description: "Connect with potential investors" },
  ],
  whatsapp: [
    { value: "client-followup", label: "Client Follow-Up", description: "After meetings or service" },
    { value: "meeting", label: "Meeting Confirmation", description: "Send reminders or invites" },
    { value: "nurturing", label: "Lead Nurturing", description: "Keep conversations going" },
    { value: "sales", label: "Sales Touchpoint", description: "Offer discounts / updates" },
    { value: "reactivation", label: "Reactivation Message", description: "Bring back inactive leads" },
    { value: "checkin", label: "Personal Check-in", description: "Casual yet purposeful ping" },
    { value: "service", label: "Service Intro", description: "Quick intro of your offerings" },
  ],
}

const tones = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "assertive", label: "Assertive" },
  { value: "casual", label: "Casual" },
]

export function DMBuilder() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [dmGoal, setDmGoal] = useState("networking")
  const [recipientName, setRecipientName] = useState("")
  const [recipientRole, setRecipientRole] = useState("")
  const [recipientCompany, setRecipientCompany] = useState("")
  const [context, setContext] = useState("")
  const [icebreaker, setIcebreaker] = useState("mutual-connection")
  const [icebreakingContext, setIcebreakingContext] = useState("")
  const [followUpSequence, setFollowUpSequence] = useState(false)
  const [activeMessageTab, setActiveMessageTab] = useState("initial")
  const [followUpMessages, setFollowUpMessages] = useState<{ [key: string]: string }>({
    followup1: "",
    followup2: "",
  })
  const [followUpDays, setFollowUpDays] = useState<{ [key: string]: number }>({
    followup1: 3,
    followup2: 7,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [platform, setPlatform] = useState("")
  const [useCase, setUseCase] = useState("")
  const [mutualInterest, setMutualInterest] = useState("")
  const [tone, setTone] = useState("")
  const [addIcebreaker, setAddIcebreaker] = useState(false)
  const [addFollowup, setAddFollowup] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = () => {
    if (!platform || !useCase || !recipientName || !tone) {
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
      const message = generateMessage()
      setOutput(message)
      setIsLoading(false)

      toast({
        title: "Message generated",
        description: "Your personalized message has been created.",
      })
    }, 2000)
  }

  const generateMessage = () => {
    let message = ""
    const platformData = platforms.find(p => p.value === platform)
    const useCaseData = useCases[platform as keyof typeof useCases]?.find(u => u.value === useCase)
    const toneData = tones.find(t => t.value === tone)

    // Platform-specific message generation
    switch (platform) {
      case "linkedin":
        message = generateLinkedInMessage(useCaseData?.label || "", toneData?.label || "")
        break
      case "instagram":
        message = generateInstagramMessage(useCaseData?.label || "", toneData?.label || "")
        break
      case "twitter":
        message = generateTwitterMessage(useCaseData?.label || "", toneData?.label || "")
        break
      case "email":
        message = generateEmailMessage(useCaseData?.label || "", toneData?.label || "")
        break
      case "whatsapp":
        message = generateWhatsAppMessage(useCaseData?.label || "", toneData?.label || "")
        break
    }

    // Add follow-up if enabled
    if (addFollowup) {
      message += "\n\nFollow-up Message:\n" + generateFollowUpMessage(platform, useCaseData?.label || "")
    }

    return message
  }

  const generateLinkedInMessage = (useCase: string, tone: string) => {
    let message = `Hi ${recipientName}${recipientRole ? `, ${recipientRole}` : ""}${recipientCompany ? ` at ${recipientCompany}` : ""},\n\n`

    // Add icebreaker if enabled
    if (addIcebreaker) {
      message += `I noticed we both share an interest in ${mutualInterest || "similar topics"}. `
    }

    // Add use case specific content
    switch (useCase) {
      case "Networking Request":
        message += `I'd love to connect and learn more about your experience in ${recipientRole || "your field"}.`
        break
      case "Job Inquiry":
        message += `I'm interested in learning more about opportunities at ${recipientCompany || "your company"}.`
        break
      case "Hiring Outreach":
        message += `Your experience in ${recipientRole || "your field"} aligns perfectly with what we're looking for at ${recipientCompany || "our company"}.`
        break
      case "Sales/Lead Generation":
        message += `I believe our ${recipientCompany ? "companies" : "services"} could benefit from a conversation about potential collaboration.`
        break
      case "Partnership Inquiry":
        message += `I see great potential for collaboration between our companies in the ${mutualInterest || "industry"} space.`
        break
      case "Event Invitation":
        message += `I'd like to invite you to our upcoming event focused on ${mutualInterest || "industry trends"}.`
        break
      case "Follow-Up Message":
        message += `Following up on our previous conversation about ${mutualInterest || "our discussion"}.`
        break
      case "Recommendation Request":
        message += `I'd greatly appreciate your endorsement for my work in ${mutualInterest || "my field"}.`
        break
      case "Content Appreciation":
        message += `Your recent post about ${mutualInterest || "your topic"} was particularly insightful.`
        break
      case "Reconnection":
        message += `It's been a while since we last connected. I'd love to catch up and discuss ${mutualInterest || "industry developments"}.`
        break
    }

    // Add tone-specific closing
    message += "\n\n"
    switch (tone) {
      case "Professional":
        message += "I'd appreciate the opportunity to connect and discuss further."
        break
      case "Friendly":
        message += "Looking forward to potentially connecting!"
        break
      case "Assertive":
        message += "Let's schedule a quick call to explore this further."
        break
      case "Casual":
        message += "Would love to chat more about this!"
        break
    }

    message += "\n\nBest regards,\n[Your name]"
    return message
  }

  const generateInstagramMessage = (useCase: string, tone: string) => {
    let message = `Hey ${recipientName}! 👋\n\n`

    // Add icebreaker if enabled
    if (addIcebreaker) {
      message += `Love your content about ${mutualInterest || "your niche"}! `
    }

    // Add use case specific content
    switch (useCase) {
      case "Collab Request":
        message += `I think we could create something amazing together.`
        break
      case "Shoutout Request":
        message += `Your audience would love to hear about ${recipientCompany || "our product"}.`
        break
      case "Networking":
        message += `Would love to connect and share ideas about ${mutualInterest || "our industry"}.`
        break
      case "Event Invitation":
        message += `We're hosting an event about ${mutualInterest || "industry trends"} and would love you to join!`
        break
      case "Cold DM":
        message += `I wanted to introduce myself and our ${recipientCompany || "product/service"}.`
        break
      case "Product Feedback":
        message += `Would love your thoughts on our latest ${recipientCompany || "product"}.`
        break
      case "Creative Partnership":
        message += `Let's brainstorm some creative ideas for a collaboration.`
        break
      case "Brand Enquiry":
        message += `Interested in learning more about ${recipientCompany || "your brand"}.`
        break
    }

    // Add tone-specific closing
    message += "\n\n"
    switch (tone) {
      case "Casual":
        message += "DM me if you're interested! 😊"
        break
      case "Professional":
        message += "Looking forward to your response."
        break
      case "Friendly":
        message += "Let's connect and create something cool! ✨"
        break
      case "Assertive":
        message += "Let's make this happen! 💪"
        break
    }

    return message
  }

  const generateTwitterMessage = (useCase: string, tone: string) => {
    let message = `Hi ${recipientName}! \n\n`

    // Add icebreaker if enabled
    if (addIcebreaker) {
      message += `Love your tweets about ${mutualInterest || "your topics"}! `
    }

    // Add use case specific content
    switch (useCase) {
      case "Quick Collab Pitch":
        message += `Quick question about potential collaboration.`
        break
      case "Event Hype Message":
        message += `Excited about the upcoming event!`
        break
      case "Thread Appreciation":
        message += `Your latest thread was 🔥`
        break
      case "Feedback Request":
        message += `Would love your thoughts on our latest update.`
        break
      case "Profile Intro":
        message += `Your work in ${mutualInterest || "your field"} is impressive.`
        break
      case "Startup/Founder Connect":
        message += `Love what you're building at ${recipientCompany || "your startup"}.`
        break
      case "Cold Outreach":
        message += `Quick question about ${mutualInterest || "potential collaboration"}.`
        break
    }

    // Add tone-specific closing
    message += "\n\n"
    switch (tone) {
      case "Casual":
        message += "DM if interested!"
        break
      case "Professional":
        message += "Looking forward to connecting."
        break
      case "Friendly":
        message += "Let's chat! 👋"
        break
      case "Assertive":
        message += "Let's make it happen! 💪"
        break
    }

    return message
  }

  const generateEmailMessage = (useCase: string, tone: string) => {
    let subject = ""
    let message = ""

    // Generate subject line based on use case
    switch (useCase) {
      case "Cold Sales Email":
        subject = `Quick question about ${recipientCompany || "your business"}`
        break
      case "Partnership Pitch":
        subject = `Potential collaboration with ${recipientCompany || "your company"}`
        break
      case "Hiring Outreach":
        subject = `Career opportunity at ${recipientCompany || "our company"}`
        break
      case "Influencer Collab":
        subject = `Collaboration opportunity for ${recipientName}`
        break
      case "Job Inquiry":
        subject = `Interested in opportunities at ${recipientCompany || "your company"}`
        break
      case "Service Inquiry":
        subject = `Questions about ${recipientCompany || "your services"}`
        break
      case "Follow-Up Email":
        subject = `Following up: ${mutualInterest || "our conversation"}`
        break
      case "Feedback Request":
        subject = `Quick feedback request`
        break
      case "Newsletter Connection":
        subject = `Connecting from ${recipientCompany || "our newsletter"}`
        break
      case "Investor Pitch/Intro":
        subject = `Investment opportunity: ${recipientCompany || "our startup"}`
        break
    }

    message = `Subject: ${subject}\n\n`
    message += `Hi ${recipientName}${recipientRole ? `, ${recipientRole}` : ""},\n\n`

    // Add icebreaker if enabled
    if (addIcebreaker) {
      message += `I noticed your work in ${mutualInterest || "your field"} and was impressed. `
    }

    // Add use case specific content
    switch (useCase) {
      case "Cold Sales Email":
        message += `I believe our services could add value to ${recipientCompany || "your business"}.`
        break
      case "Partnership Pitch":
        message += `I see great potential for collaboration between our companies.`
        break
      case "Hiring Outreach":
        message += `Your experience in ${recipientRole || "your field"} would be valuable to our team.`
        break
      case "Influencer Collab":
        message += `We'd love to explore a collaboration opportunity.`
        break
      case "Job Inquiry":
        message += `I'm interested in learning more about opportunities at ${recipientCompany || "your company"}.`
        break
      case "Service Inquiry":
        message += `I'd like to learn more about your services and pricing.`
        break
      case "Follow-Up Email":
        message += `Following up on our previous discussion about ${mutualInterest || "our conversation"}.`
        break
      case "Feedback Request":
        message += `Would appreciate your thoughts on our latest ${recipientCompany || "product/service"}.`
        break
      case "Newsletter Connection":
        message += `As a subscriber, I'd love to connect and discuss ${mutualInterest || "industry trends"}.`
        break
      case "Investor Pitch/Intro":
        message += `We're building something exciting at ${recipientCompany || "our startup"} and would love to connect.`
        break
    }

    // Add tone-specific closing
    message += "\n\n"
    switch (tone) {
      case "Professional":
        message += "I'd appreciate the opportunity to discuss this further."
        break
      case "Friendly":
        message += "Looking forward to potentially connecting!"
        break
      case "Assertive":
        message += "Let's schedule a call to explore this opportunity."
        break
      case "Casual":
        message += "Would love to chat more about this!"
        break
    }

    message += "\n\nBest regards,\n[Your name]"
    return message
  }

  const generateWhatsAppMessage = (useCase: string, tone: string) => {
    let message = `Hi ${recipientName}! 👋\n\n`

    // Add icebreaker if enabled
    if (addIcebreaker) {
      message += `Hope you're doing well! `
    }

    // Add use case specific content
    switch (useCase) {
      case "Client Follow-Up":
        message += `Just checking in about our last conversation.`
        break
      case "Meeting Confirmation":
        message += `Confirming our meeting scheduled for tomorrow.`
        break
      case "Lead Nurturing":
        message += `Wanted to share some updates about ${recipientCompany || "our services"}.`
        break
      case "Sales Touchpoint":
        message += `We have a special offer on ${recipientCompany || "our products"} you might be interested in.`
        break
      case "Reactivation Message":
        message += `We miss you! Here's what's new at ${recipientCompany || "our company"}.`
        break
      case "Personal Check-in":
        message += `How are you? Would love to catch up!`
        break
      case "Service Intro":
        message += `Quick intro to our ${recipientCompany || "services"} - let me know if you'd like to learn more.`
        break
    }

    // Add tone-specific closing
    message += "\n\n"
    switch (tone) {
      case "Casual":
        message += "Let me know what you think! 😊"
        break
      case "Professional":
        message += "Looking forward to your response."
        break
      case "Friendly":
        message += "Would love to hear from you! ✨"
        break
      case "Assertive":
        message += "Let's move forward with this!"
        break
    }

    return message
  }

  const generateFollowUpMessage = (platform: string, useCase: string) => {
    switch (platform) {
      case "linkedin":
        return `Hi ${recipientName},

I wanted to follow up on my previous message about ${useCase.toLowerCase()}. I'm still very interested in ${useCase === "Networking Request" ? "connecting" : "discussing this further"}.

Would you have a few minutes for a quick chat?

Best regards,
[Your name]`
      case "instagram":
        return `Hey ${recipientName}! 

Just following up on my previous message about ${useCase.toLowerCase()}. Still interested in ${useCase === "Collab Request" ? "collaborating" : "connecting"}!

Let me know if you'd like to discuss further! ✨`
      case "twitter":
        return `Hi ${recipientName},

Following up on my previous DM about ${useCase.toLowerCase()}. Still interested in ${useCase === "Quick Collab Pitch" ? "collaborating" : "connecting"}!

Let me know! 👋`
      case "email":
        return `Subject: Following up: ${useCase}

Hi ${recipientName},

I wanted to follow up on my previous email about ${useCase.toLowerCase()}. I'm still very interested in ${useCase === "Cold Sales Email" ? "discussing how we can help" : "connecting"}.

Would you have a few minutes for a quick chat?

Best regards,
[Your name]`
      case "whatsapp":
        return `Hi ${recipientName}! 

Just following up on my previous message about ${useCase.toLowerCase()}. Still interested in ${useCase === "Client Follow-Up" ? "continuing our discussion" : "connecting"}!

Let me know when you have a moment! 😊`
      default:
        return ""
    }
  }

  const handleCopy = () => {
    if (!output) return

    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Copied to clipboard",
      description: "Message has been copied.",
    })
  }

  const handleSave = () => {
    toast({
      title: "Template saved",
      description: "Your DM template has been saved for future use.",
    })
  }

  const handleCopySequence = () => {
    if (!generatedMessage) return

    const sequence = `INITIAL MESSAGE:
${generatedMessage}

FOLLOW-UP #1 (After ${followUpDays.followup1} days):
${followUpMessages.followup1}

FOLLOW-UP #2 (After ${followUpDays.followup2} days):
${followUpMessages.followup2}`

    navigator.clipboard.writeText(sequence)

    toast({
      title: "Sequence copied",
      description: "Your complete message sequence has been copied to the clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DM Builder</CardTitle>
          <CardDescription>
            Create personalized direct messages for any platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.icon} {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

            <div className="space-y-2">
              <Label htmlFor="use-case">Use Case</Label>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent>
                  {platform && useCases[platform as keyof typeof useCases]?.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

              <div className="space-y-2">
              <Label htmlFor="recipient-name">Recipient Name</Label>
                <Input
                  id="recipient-name"
                placeholder="John Doe"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
              <Label htmlFor="recipient-role">Recipient Role</Label>
                <Input
                  id="recipient-role"
                placeholder="Marketing Manager"
                  value={recipientRole}
                  onChange={(e) => setRecipientRole(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-company">Company</Label>
                <Input
                  id="recipient-company"
                placeholder="Company name"
                  value={recipientCompany}
                  onChange={(e) => setRecipientCompany(e.target.value)}
                />
              </div>

            <div className="space-y-2">
              <Label htmlFor="mutual-interest">Mutual Interest</Label>
              <Input
                id="mutual-interest"
                placeholder="Shared interest or connection"
                value={mutualInterest}
                onChange={(e) => setMutualInterest(e.target.value)}
              />
                </div>

                <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="icebreaker"
                checked={addIcebreaker}
                onCheckedChange={setAddIcebreaker}
              />
              <Label htmlFor="icebreaker">Add Icebreaker</Label>
              </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="followup"
                checked={addFollowup}
                onCheckedChange={setAddFollowup}
              />
              <Label htmlFor="followup">Add Follow-up</Label>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Message
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
                <CardTitle>Generated Message</CardTitle>
                <CardDescription>
                  Your personalized message is ready
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

