import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-[0.03] dark:opacity-[0.05]"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800 mb-2">
            <Star className="mr-1 h-3 w-3" />
            <span>Testimonials</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
              Users
            </span>{" "}
            Say
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Join thousands of satisfied users who have transformed their content creation process.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold mr-4">
                JD
              </div>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-amber-500 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "This tool has completely transformed how we create content. The AI personas are incredibly accurate and save us hours of work."
            </p>
            <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-2">Verified Purchase</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-4">
                SJ
              </div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Content Creator</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-amber-500 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "The ability to clone my voice and maintain consistency across all platforms has been a game-changer for my content strategy."
            </p>
            <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-2">Verified Purchase</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold mr-4">
                MR
              </div>
              <div>
                <h4 className="font-semibold">Mike Rodriguez</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Social Media Manager</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-amber-500 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "The scheduling feature alone has saved us countless hours. Being able to generate and schedule content in advance is invaluable."
            </p>
            <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-2">Verified Purchase</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

