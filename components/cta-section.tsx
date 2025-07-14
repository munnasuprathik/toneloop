import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Zap } from "lucide-react"

export function CtaSection() {
  const benefits = [
    "Generate perfect messages in seconds",
    "Sound like your favorite personalities",
    "Schedule posts across multiple platforms",
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-[0.03] dark:opacity-[0.05]"></div>

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
              <span>Get Started Today</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Ready to Transform Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Content Creation
              </span>
              ?
            </h2>

            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join thousands of users who are already saving time and creating better content with our AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-6 py-3 text-sm font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                View Pricing
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">50+ Writing Tones</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Multi-Platform Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Smart Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            {/* Funnel Diagram */}
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Choose Your Tone</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select from 50+ writing styles</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Write Your Topic</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enter what you want to write about</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Generate Content</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">AI creates your perfect message</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-semibold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Share & Schedule</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Post across all platforms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">300%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Faster Content Creation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

