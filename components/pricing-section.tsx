"use client"

import { useState } from "react"
import { Check, X, Zap, Sparkles, Rocket, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const plans = [
    {
      name: "Basic",
      monthlyPrice: "$5",
      yearlyPrice: "$50",
      yearlySavings: "Save $10",
      description: "For individuals just getting started with tone-based messaging",
      icon: Zap,
      color: "green",
      popular: false,
      features: [
        { name: "100 message generations/month", included: true },
        { name: "10 predefined tones", included: true },
        { name: "1 Campaign (up to 30 days)", included: true },
        { name: "Use on 1 platform (LinkedIn or WhatsApp)", included: true },
        { name: "5 built-in templates", included: true },
        { name: "Upload topic list via file", included: true },
        { name: "Schedule posts to 1 platform", included: true },
        { name: '"Clone Me" Mode', included: false },
        { name: "Famous Persona tones (Elon, Sam, etc.)", included: false },
        { name: "Voice input (Ghostwriter)", included: false },
        { name: "DM tracking", included: false },
        { name: "Multi-platform support", included: false },
        { name: "Early access to feature drops", included: billingCycle === "yearly" },
      ],
      cta: "Get Started",
    },
    {
      name: "Plus",
      monthlyPrice: "$7",
      yearlyPrice: "$70",
      yearlySavings: "Save $14",
      description: "Unlock the full experience",
      icon: Sparkles,
      color: "purple",
      popular: true,
      features: [
        { name: "Unlimited messages", included: true },
        { name: "25+ tones & personas", included: true },
        { name: '3 "Clone Me" profiles', included: true },
        { name: "Up to 3 simultaneous campaigns", included: true },
        { name: "Multi-platform posting (LinkedIn, X, Insta)", included: true },
        { name: "Ghostwriter Mode (text + voice input)", included: true },
        { name: "Custom templates", included: true },
        { name: "Schedule posts across 3 platforms", included: true },
        { name: "Tone fine-tuning with sliders", included: true },
        { name: "Up to 5 Clone Me profiles", included: billingCycle === "yearly" },
        { name: "VIP feature voting access", included: billingCycle === "yearly" },
      ],
      cta: "Upgrade to Plus",
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "What happens if I exceed my message limit?",
      answer: "If you reach your monthly message limit, you'll be prompted to upgrade your plan or wait until your next billing cycle for a reset."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all plans. If you're not satisfied, contact our support team for a full refund."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. For Enterprise plans, we also offer invoicing options."
    }
  ]

  const getColorClass = (color: string, element: "bg" | "text" | "border" | "hover" | "gradient") => {
    const colorMap: Record<string, Record<string, string>> = {
      green: {
        bg: "bg-green-100 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
        hover: "hover:bg-green-200 dark:hover:bg-green-900/30",
        gradient: "from-green-500 to-emerald-500",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        hover: "hover:bg-purple-200 dark:hover:bg-purple-900/30",
        gradient: "from-purple-500 to-indigo-500",
      },
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        hover: "hover:bg-blue-200 dark:hover:bg-blue-900/30",
        gradient: "from-blue-500 to-cyan-500",
      },
    }

    return colorMap[color][element]
  }

  return (
    <section id="pricing" className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e5e7eb,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#1f2937,transparent)]" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple & Affordable{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Pricing
            </span>
          </h2>
          
          <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
            Choose the plan that's right for you
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-4 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 text-xs">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-xl border bg-white dark:bg-gray-800 p-5 shadow-sm relative ${
                plan.popular 
                  ? "border-purple-500 dark:border-purple-700 shadow-md scale-[1.02] z-10" 
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-0.5 rounded-full text-sm font-medium shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col items-center text-center mb-4">
                <div className={`w-10 h-10 rounded-full bg-${plan.color}-100 dark:bg-${plan.color}-900/20 flex items-center justify-center mb-3`}>
                  <plan.icon className={`w-5 h-5 text-${plan.color}-600 dark:text-${plan.color}-400`} />
                </div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">
                    {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <Badge className="mt-2 bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    {plan.yearlySavings}
                  </Badge>
                )}
              </div>

              <div className="flex-1">
                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className={`h-4 w-4 ${getColorClass(plan.color, "text")} mr-2 shrink-0 mt-0.5`} />
                      ) : (
                        <X className="h-4 w-4 text-gray-300 dark:text-gray-600 mr-2 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>
                        {feature.name}
                        {billingCycle === "yearly" && featureIndex >= (plan.name === "Basic" ? 12 : 9) && feature.included && (
                          <Badge className="ml-2 bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 text-xs">
                            Yearly
                          </Badge>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/signup" className="w-full">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                      : `bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700`
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  className="flex items-center justify-between w-full p-4 text-left"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">
              Ready to Transform Your Content?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base mb-6 max-w-xl mx-auto">
              Join thousands of creators and businesses who are already using ToneLoop to create engaging content in their unique voice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup">
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2 text-base font-medium">
                  Get Started Today
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-6 py-2 text-base font-medium">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

