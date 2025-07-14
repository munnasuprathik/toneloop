import { ArrowRight, MessageSquare, Calendar, Zap, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

export function HowItWorksSection() {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account in seconds",
      icon: CheckCircle2,
      color: "purple",
      time: "30s",
      benefits: ["Quick setup", "No credit card", "Instant access"]
    },
    {
      title: "Generate Content",
      description: "Let AI write perfect content",
      icon: Zap,
      color: "blue",
      time: "10s",
      benefits: ["Multiple variations", "Smart formatting", "Brand voice match"]
    },
    {
      title: "Share Content",
      description: "Post to any platform",
      icon: Calendar,
      color: "amber",
      time: "20s",
      benefits: ["One-click sharing", "Auto-formatting", "Schedule posts"]
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_90%)]" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
            <Clock className="w-4 h-4 mr-2" />
            <span>60-Second Setup</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Three Simple Steps to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Perfect Content
            </span>
          </h2>
        </div>

        {/* Desktop Process Flow */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Main Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-purple-100 via-blue-100 to-amber-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-amber-900/20 transform -translate-y-1/2 rounded-full"></div>

          <div className="grid grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Step Card */}
                <div className="flex flex-col items-center">
                  {/* Icon Circle */}
                  <div className={`relative w-24 h-24 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/20 border-2 border-${step.color}-500/30 flex items-center justify-center mb-6 z-10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                    <step.icon className={`h-10 w-10 text-${step.color}-600 dark:text-${step.color}-400`} />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-${step.color}-500 flex items-center justify-center text-lg font-bold text-${step.color}-600 shadow-sm">
                      {index + 1}
                    </div>
                    {/* Time Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-${step.color}-200 dark:border-${step.color}-800 text-xs font-medium text-${step.color}-600 dark:text-${step.color}-400 shadow-sm">
                      {step.time}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mb-4">{step.description}</p>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {step.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Process Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/20 border-2 border-${step.color}-500/30 flex items-center justify-center mb-4`}>
                <step.icon className={`h-8 w-8 text-${step.color}-600 dark:text-${step.color}-400`} />
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
              {index < steps.length - 1 && (
                <div className="my-8">
                  <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600 transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

