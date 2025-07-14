import { ArrowRight, MessageSquare, Calendar, Zap, CheckCircle, Clock, User, Sparkles, Share2 } from "lucide-react"

export function UserJourneySection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-[0.03] dark:opacity-[0.05]"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 mb-2">
            <Zap className="mr-1 h-3 w-3" />
            <span>Simple Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Your Path to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Perfect Messaging
            </span>
          </h2>
        </div>

        {/* User Journey Diagram - Desktop */}
        <div className="hidden lg:block relative">
          {/* Main path */}
          <div className="absolute top-1/2 left-0 right-0 h-4 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-green-900/20 transform -translate-y-1/2 rounded-full"></div>

          {/* Journey Steps */}
          <div className="grid grid-cols-5 gap-4 relative">
            {/* Step 1: Sign Up */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/20 border-4 border-white dark:border-gray-950 flex items-center justify-center mb-4 shadow-lg z-10">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Sign Up</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Create your account in seconds</p>

              <div className="mt-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mb-2">
                  <User className="h-8 w-8 text-purple-500" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">30 seconds</span>
              </div>
            </div>

            {/* Step 2: Choose Tone */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 border-4 border-white dark:border-gray-950 flex items-center justify-center mb-4 shadow-lg z-10">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Choose Tone</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Select from 50+ persona options</p>

              <div className="mt-4 flex flex-col items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-950">
                    CEO
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-950">
                    EM
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-950">
                    DEV
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Write Topic */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/20 border-4 border-white dark:border-gray-950 flex items-center justify-center mb-4 shadow-lg z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Write Topic</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Enter your message topic</p>

              <div className="mt-4 flex flex-col items-center">
                <div className="w-24 h-8 rounded bg-white dark:bg-gray-800 shadow-md flex items-center px-2 mb-2">
                  <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>
                </div>
                <MessageSquare className="h-4 w-4 text-indigo-500" />
              </div>
            </div>

            {/* Step 4: Generate */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/20 border-4 border-white dark:border-gray-950 flex items-center justify-center mb-4 shadow-lg z-10">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Generate</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">AI creates your perfect message</p>

              <div className="mt-4 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-amber-200 dark:bg-amber-800/30 rounded-full animate-pulse opacity-75"></div>
                  <div className="relative w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Share */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 border-4 border-white dark:border-gray-950 flex items-center justify-center mb-4 shadow-lg z-10">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  5
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Share</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Post or schedule across platforms</p>

              <div className="mt-4 flex flex-col items-center">
                <div className="flex space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[8px] font-bold">
                    in
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px] font-bold">
                    W
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[8px] font-bold">
                    X
                  </div>
                </div>
                <Share2 className="h-4 w-4 text-green-500 mt-2" />
              </div>
            </div>

            {/* Connecting arrows */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 left-0 transform -translate-y-1/2"
                style={{ left: `${i * 20 + 16}%` }}
              >
                <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600" />
              </div>
            ))}
          </div>

          {/* Time indicators */}
          <div className="mt-8 grid grid-cols-5 gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm font-medium">Start</span>
              </div>
            </div>
            <div></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-indigo-500 mr-1" />
                <span className="text-sm font-medium">1 minute</span>
              </div>
            </div>
            <div></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium">Done!</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Journey - Mobile */}
        <div className="lg:hidden space-y-8">
          {/* Step 1 */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Sign Up</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create your account in seconds</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600 rotate-90" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Choose Tone</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select from 50+ persona options</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600 rotate-90" />
          </div>

          {/* Step 3 */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Write Topic</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your message topic</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600 rotate-90" />
          </div>

          {/* Step 4 */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Generate</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI creates your perfect message</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600 rotate-90" />
          </div>

          {/* Step 5 */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              5
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Share</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Post or schedule across platforms</p>
            </div>
          </div>
        </div>

        {/* ROI Metrics */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-center mb-8">Measurable Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">Save 3+ Hours</h4>
              <p className="text-gray-500 dark:text-gray-400">Per week on content creation</p>

              <div className="w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "80%" }}></div>
              </div>
              <div className="flex justify-between w-full mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21H3V3" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M21 9L13 17L9 13L3 19"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">300% Increase</h4>
              <p className="text-gray-500 dark:text-gray-400">In engagement rates</p>

              <div className="relative h-20 w-full mt-4">
                <div className="absolute bottom-0 left-0 w-1/4 h-4 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                <div className="absolute bottom-0 right-0 w-1/4 h-16 bg-blue-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-1/4 right-1/4 border-b border-dashed border-gray-300 dark:border-gray-600"></div>
                <div className="absolute bottom-4 left-1/4 right-1/4 text-xs text-center text-gray-500 dark:text-gray-400">
                  +300%
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">95% Satisfaction</h4>
              <p className="text-gray-500 dark:text-gray-400">From our users</p>

              <div className="relative w-full h-20 mt-4 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="14"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="55" textAnchor="middle" fill="#22C55E" fontSize="16" fontWeight="bold">
                    95%
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 