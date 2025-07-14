import { ArrowRight, CheckCircle2, Sparkles, PenLine, Zap, Share2, ArrowRightCircle, Clock } from "lucide-react"

export function UserJourneySection() {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Quick 30s setup",
      icon: CheckCircle2,
      color: "purple",
      time: "30s"
    },
    {
      number: "2",
      title: "Choose Tone",
      description: "50+ options",
      icon: Sparkles,
      color: "blue",
      time: "1m"
    },
    {
      number: "3",
      title: "Write Topic",
      description: "Enter message",
      icon: PenLine,
      color: "indigo",
      time: "1m"
    },
    {
      number: "4",
      title: "Generate",
      description: "AI writes for you",
      icon: Zap,
      color: "amber",
      time: "30s"
    },
    {
      number: "5",
      title: "Share",
      description: "Post anywhere",
      icon: Share2,
      color: "green",
      time: "Done!"
    },
  ]

  return (
    <section className="w-full py-8 md:py-12 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/30 bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-gray-950 dark:to-gray-950" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
            <Clock className="w-4 h-4 mr-2" />
            <span>3-Minute Setup</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter max-w-[800px]">
            Your Path to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Perfect Messaging
            </span>
          </h2>
        </div>

        {/* Desktop Journey */}
        <div className="hidden lg:block relative mx-auto max-w-6xl">
          {/* Main Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-green-900/30 transform -translate-y-1/2 rounded-full"></div>

          {/* Connecting Arrows */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 transform -translate-y-1/2 z-20"
              style={{ left: `${i * 25 - 12.5}%` }}
            >
              <ArrowRightCircle className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
          ))}

          <div className="grid grid-cols-5 gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center group">
                {/* Step Box */}
                <div className={`relative w-24 h-24 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/20 border-2 border-${step.color}-500/30 dark:border-${step.color}-500/20 flex items-center justify-center mb-4 z-10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-${step.color}-500/50`}>
                  <step.icon className={`h-10 w-10 text-${step.color}-600 dark:text-${step.color}-400 transition-transform duration-300 group-hover:scale-110`} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-${step.color}-500 flex items-center justify-center text-sm font-bold text-${step.color}-600 shadow-sm">
                    {step.number}
                  </div>
                  {/* Time Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-${step.color}-200 dark:border-${step.color}-800 text-xs font-medium text-${step.color}-600 dark:text-${step.color}-400 shadow-sm whitespace-nowrap">
                    {step.time}
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Journey */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center space-x-4 bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/20 border-2 border-${step.color}-500/30 flex items-center justify-center group-hover:scale-105 transition-all duration-300`}>
                  <step.icon className={`h-8 w-8 text-${step.color}-600 dark:text-${step.color}-400`} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-gray-950 border-2 border-${step.color}-500 flex items-center justify-center text-xs font-bold text-${step.color}-600">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <span className={`text-xs font-medium text-${step.color}-600 dark:text-${step.color}-400 px-2 py-1 rounded-full bg-${step.color}-50 dark:bg-${step.color}-900/20 border border-${step.color}-100 dark:border-${step.color}-800`}>
                      {step.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-[4.5rem] bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 dark:to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

