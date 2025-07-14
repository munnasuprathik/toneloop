import { Mail, MessageSquare, Slack, Linkedin, Twitter } from "lucide-react"

export function getPlatformIcon(platform: string) {
  const iconMap: Record<string, any> = {
    email: Mail,
    whatsapp: MessageSquare,
    slack: Slack,
    "linkedin-post": Linkedin,
    "linkedin-dm": Linkedin,
    twitter: Twitter,
  }

  return iconMap[platform] || MessageSquare
}

