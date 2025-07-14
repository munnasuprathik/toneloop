export type Platform = "linkedin" | "instagram" | "twitter" | "email" | "whatsapp"

export type LinkedInUseCase = 
  | "networking"
  | "job-inquiry"
  | "hiring"
  | "sales"
  | "partnership"
  | "event"
  | "follow-up"
  | "recommendation"
  | "appreciation"
  | "reconnection"

export type InstagramUseCase =
  | "collab"
  | "shoutout"
  | "networking"
  | "event"
  | "cold-dm"
  | "feedback"
  | "creative-partnership"
  | "brand-inquiry"

export type TwitterUseCase =
  | "collab-pitch"
  | "event-hype"
  | "appreciation"
  | "feedback"
  | "profile-intro"
  | "startup-connect"
  | "cold-outreach"

export type EmailUseCase =
  | "cold-sales"
  | "partnership"
  | "hiring"
  | "influencer-collab"
  | "job-inquiry"
  | "service-inquiry"
  | "follow-up"
  | "feedback"
  | "newsletter"
  | "investor-pitch"

export type WhatsAppUseCase =
  | "client-follow-up"
  | "meeting-confirmation"
  | "lead-nurturing"
  | "sales-touchpoint"
  | "reactivation"
  | "personal-check-in"
  | "service-intro"

export type UseCase = 
  | LinkedInUseCase 
  | InstagramUseCase 
  | TwitterUseCase 
  | EmailUseCase 
  | WhatsAppUseCase

export type Tone = "professional" | "casual" | "friendly" | "formal" | "persuasive"

export interface Recipient {
  name: string
  role?: string
  company?: string
  mutualInterest?: string
  email?: string
  profile?: string
  website?: string
  customFields?: Record<string, string>
}

export interface DMMessage {
  id: string
  platform: Platform
  useCase: string
  content: string
  subject?: string
  icebreaker?: string
  followUps?: FollowUpMessage[]
  tone: Tone
  tags?: string[]
  timestamp: Date
  scheduledFor?: Date
}

export interface FollowUpMessage {
  id: string
  content: string
  delay: number // in days
}

export interface DMRecipient {
  name: string
  company?: string
  role?: string
  industry?: string
  interests?: string[]
  previousInteraction?: string
  customFields?: Record<string, string>
}

export interface DMUseCase {
  id: string
  name: string
  description: string
  platform: Platform
  category: "networking" | "sales" | "hiring" | "collaboration" | "support" | "other"
  requiredFields: string[]
  optionalFields: string[]
  examples: string[]
}

export interface DMTemplate extends DMMessage {
  name: string
  description?: string
  isPublic?: boolean
  usageCount: number
  lastUsed?: Date
}

export interface DMSchedule {
  id: string
  messageId: string
  scheduledFor: Date
  status: "pending" | "sent" | "failed"
  recipient: DMRecipient
  platform: Platform
  retryCount?: number
  errorMessage?: string
} 