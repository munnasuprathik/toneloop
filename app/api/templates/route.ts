import { NextResponse } from 'next/server'

const templates = [
  { id: "hook-value-cta", name: "Hook + Value + CTA", description: "Grab attention, provide value, call to action" },
  { id: "story", name: "Story Format", description: "Narrative structure with beginning, middle, and end" },
  { id: "tips", name: "Tips & Tricks", description: "List of helpful advice or insights" },
  { id: "question", name: "Question Format", description: "Engage audience with thought-provoking questions" },
  { id: "problem-solution", name: "Problem-Solution", description: "Identify problem, present solution" },
  { id: "how-to", name: "How-To Guide", description: "Step-by-step instructions for a process" },
]

export async function GET() {
  return NextResponse.json({ templates })
} 