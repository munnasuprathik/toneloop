import { NextResponse } from 'next/server'

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

export async function GET() {
  return NextResponse.json({ famousPersonas, normalPersonas })
} 