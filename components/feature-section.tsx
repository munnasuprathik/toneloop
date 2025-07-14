import { Bot, Sparkles, Zap, Share2, MessageSquare, Clock, Target, Palette } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Bot,
      title: "AI Personas",
      description: "Choose from 50+ writing tones or create your own unique voice",
      color: "purple",
      benefits: ["Custom voice creation", "Brand tone matching", "Personality adaptation"],
    },
    {
      icon: Sparkles,
      title: "Smart Learning",
      description: "AI that learns and adapts to your writing style over time",
      color: "blue",
      benefits: ["Style analysis", "Continuous learning", "Personalized output"],
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform",
      description: "Optimized content for every social media platform",
      color: "green",
      benefits: ["Format optimization", "Platform-specific tone", "Auto-formatting"],
    },
    {
      icon: Clock,
      title: "Time Saving",
      description: "Generate perfect content in seconds, not hours",
      color: "amber",
      benefits: ["Bulk generation", "Quick edits", "Scheduled posting"],
    },
    {
      icon: Target,
      title: "Audience Focus",
      description: "Content that resonates with your target audience",
      color: "rose",
      benefits: ["Demographic targeting", "Engagement optimization", "A/B testing"],
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden" id="features">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_90%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Create Perfect Content
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced AI tools that help you create engaging content for any platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col p-6 sm:p-8 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

              {/* Benefits */}
              <div className="mt-auto space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className={`flex items-center text-sm font-medium text-${feature.color}-600 dark:text-${feature.color}-400`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-500 mr-3`} />
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Hover Border */}
              <div className={`absolute inset-0 rounded-xl border-2 border-${feature.color}-500/0 group-hover:border-${feature.color}-500/50 transition-colors duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

