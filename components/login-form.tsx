"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Logged in!",
        description: "You've successfully logged in to PixlPost.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Enter your password" type="password" required />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <Link href="/forgot-password" className="text-sm underline underline-offset-4 hover:text-primary">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Sign in"}
      </Button>
    </form>
  )
}

