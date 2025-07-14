import { Brain, Sparkles, Zap, ArrowRight, Bot, Workflow } from "lucide-react"

export function AIPersonaSection() {
  const features = [
    {
      icon: Brain,
      title: "Real-time Analysis",
      description: "Instant brand voice analysis",
      color: "purple",
      highlights: ["Style detection", "Tone matching", "Voice analysis"],
      percentage: 98
    },
    {
      icon: Sparkles,
      title: "Smart Learning",
      description: "Adapts to your style",
      color: "blue",
      highlights: ["Pattern learning", "Style memory", "Continuous improvement"],
      percentage: 95
    },
    {
      icon: Zap,
      title: "Multi-Platform",
      description: "Platform-optimized content",
      color: "amber",
      highlights: ["Format adaptation", "Length optimization", "Platform-specific tone"],
      percentage: 99
    }
  ]

  return (
    <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e5e7eb,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#1f2937,transparent)]" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
            <Bot className="w-4 h-4 mr-2" />
            <span>Powered by AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter max-w-[800px]">
            How Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              AI Personas
            </span>{" "}
            Work
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-[600px] text-sm md:text-base">
            Advanced machine learning algorithms that understand and adapt to your unique voice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          {/* Workflow Lines */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-amber-200 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-amber-900/30" />
          
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-100 dark:border-gray-800"
            >
              {/* Connecting Arrows */}
              {index < features.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/3 transform -translate-y-1/2 z-10 items-center">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <ArrowRight className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
              )}
              
              {/* Icon Container with Circular Progress */}
              <div className="relative mb-6">
                <svg className="w-20 h-20">
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                  />
                  <circle
                    className={`text-${feature.color}-500 dark:text-${feature.color}-400`}
                    strokeWidth="4"
                    strokeDasharray={226.08}
                    strokeDashoffset={226.08 * ((100 - feature.percentage) / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                  />
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center bg-${feature.color}-100 dark:bg-${feature.color}-900/20 rounded-full`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">{feature.description}</p>

              {/* Feature Highlights with Icons */}
              <div className="w-full space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium bg-${feature.color}-50 text-${feature.color}-700 dark:bg-${feature.color}-900/10 dark:text-${feature.color}-300 border border-${feature.color}-100 dark:border-${feature.color}-800/50 group-hover:border-${feature.color}-200 dark:group-hover:border-${feature.color}-700/50 transition-colors duration-300`}
                  >
                    <Workflow className="w-3 h-3 mr-1.5 opacity-70" />
                    {highlight}
                  </div>
                ))}
              </div>

              {/* Accuracy Badge */}
              <div className={`absolute -top-2 -right-2 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-${feature.color}-500 shadow-lg`}>
                <span className={`text-xs font-bold text-${feature.color}-600 dark:text-${feature.color}-400`}>
                  {feature.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

