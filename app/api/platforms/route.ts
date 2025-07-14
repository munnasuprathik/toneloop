import { NextResponse } from 'next/server'

const platforms = [
  { id: "linkedin", name: "LinkedIn", description: "Professional networking", characterLimit: 3000 },
  { id: "twitter", name: "Twitter (X)", description: "Short-form social media", characterLimit: 280 },
  { id: "whatsapp", name: "WhatsApp", description: "Messaging platform", characterLimit: 1000 },
  { id: "instagram", name: "Instagram", description: "Visual social media", characterLimit: 2200 },
  { id: "email", name: "Email", description: "Email communication", characterLimit: 50000 },
  { id: "facebook", name: "Facebook", description: "Social networking", characterLimit: 63206 },
  { id: "reddit", name: "Reddit", description: "Community forums", characterLimit: 40000 },
]

export async function GET() {
  return NextResponse.json({ platforms })
} 