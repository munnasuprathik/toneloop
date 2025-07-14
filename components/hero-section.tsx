"use client"

import { ArrowRight, Brain, Rocket, Globe, Search, MessageSquare, Bot, Sparkles, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import React from "react"
import { cn } from "@/lib/utils"

type LeaderType = "Elon" | "Mark" | "Sam" | "Sundar"

export default function HeroSection() {
  const [selectedLeader, setSelectedLeader] = useState<LeaderType>("Elon")

  const leaders = {
    Elon: {
      name: "Elon Musk",
      icon: Rocket,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-100",
      example: "Just shipped another Starship update! 🚀 Rapid iteration = path to Mars. The team's crushing it with new heat shield design. Aiming for orbital test flight next month. Watch this space..."
    },
    Mark: {
      name: "Mark Cuban",
      icon: Brain,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
      example: "The future of business? AI + human creativity. Been testing new tech that's mind-blowing. Remember: the biggest opportunities come from solving real problems. Stay curious, keep learning. 💡"
    },
    Sam: {
      name: "Sam Altman",
      icon: Globe,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100",
      example: "AGI progress update: Seeing remarkable improvements in reasoning capabilities. Key insight: scaling alone isn't enough. Need novel architectures. More details soon..."
    },
    Sundar: {
      name: "Sundar Pichai",
      icon: Search,
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
      example: "Excited to share our latest AI breakthroughs at #GoogleIO. Democratizing access to cutting-edge technology while ensuring responsible development. The future is collaborative. 🌟"
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-slate-900/50 dark:to-gray-950">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f61a_1px,transparent_1px)] [background-size:16px_16px] sm:[background-size:32px_32px] dark:bg-[radial-gradient(#3b82f60d_1px,transparent_1px)]" />
        
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-900/10 dark:to-blue-900/10" />

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* Professional Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-l-2 border-t-2 border-blue-500/20 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-r-2 border-t-2 border-purple-500/20 rounded-tr-3xl" />

        {/* Subtle Glow Effects */}
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute right-1/4 top-1/3 translate-x-1/2 -translate-y-1/2">
          <div className="w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        {/* Bottom Decorative Lines */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
          <div className="h-px mt-1 sm:mt-2 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-gray-800/50" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Badge */}
        <div className="mx-auto mb-6 sm:mb-8 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-blue-100 bg-white/70 px-4 sm:px-7 py-1.5 sm:py-2 shadow-sm backdrop-blur transition-all hover:bg-white/90 hover:border-blue-200 hover:shadow-md dark:border-blue-800/50 dark:bg-gray-900/70 dark:hover:bg-gray-900/90">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
          <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">AI-Powered Content Creation</p>
        </div>

        {/* Main heading */}
        <div className="mx-auto mb-8 sm:mb-10 max-w-4xl text-center">
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            AI That Posts Like You.
            <span className="relative mt-1 sm:mt-2 block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              At Scale.
              <span className="absolute -right-8 sm:-right-12 top-0 h-6 w-6 sm:h-8 sm:w-8 animate-bounce">
                <Rocket className="h-6 w-6 sm:h-8 sm:w-8 rotate-45 text-purple-500/50" />
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4 sm:px-0">
            From daily posts to outreach DMs — PixlPost writes, plans, and schedules content in your voice.
          </p>
          
          {/* Trust Indicators */}
          <div className="mx-auto mt-6 sm:mt-8 flex flex-col sm:flex-row max-w-fit items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {/* Removed: No credit card required and 14-day free trial */}
          </div>
        </div>

        {/* Tech Leaders Grid */}
        <div className="mx-auto mt-10 sm:mt-16 max-w-3xl px-2 sm:px-0">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            {Object.entries(leaders).map(([key, leader]) => (
              <button
                key={key}
                onClick={() => setSelectedLeader(key as LeaderType)}
                className={cn(
                  "group relative rounded-xl border p-3 sm:p-4 transition-all hover:scale-105 hover:border-purple-500 hover:shadow-md",
                  selectedLeader === key
                    ? "border-purple-500 bg-white/95 shadow-md dark:bg-gray-900/95"
                    : "border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80"
                )}
              >
                <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
                  {React.createElement(leader.icon, {
                    className: cn(
                      "h-6 w-6 sm:h-8 sm:w-8 transition-transform group-hover:scale-110",
                      leader.iconColor
                    )
                  })}
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">{leader.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Preview Box */}
          <div className="mt-6 sm:mt-8 rounded-xl border border-purple-100/50 bg-white/95 p-4 sm:p-6 shadow-md backdrop-blur transition-all hover:shadow-lg dark:border-purple-800/50 dark:bg-gray-900/95">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className={cn(
                "rounded-full p-1.5 sm:p-2 shadow-sm transition-transform hover:scale-110",
                leaders[selectedLeader].bgColor
              )}>
                {React.createElement(leaders[selectedLeader].icon, {
                  className: cn("h-5 w-5 sm:h-6 sm:w-6", leaders[selectedLeader].iconColor)
                })}
              </div>
              <div className="flex-1">
                <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                  {leaders[selectedLeader].name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {leaders[selectedLeader].example}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mx-auto mt-8 sm:mt-12 flex flex-col sm:flex-row max-w-fit items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="group w-full sm:w-auto bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-md transition-transform text-sm sm:text-base">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Free trial available</span>
        </div>
      </div>
    </section>
  )
}

