"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
  ]

  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold">ToneLoop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/login"
            className="text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-3 text-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container space-y-6 px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-6">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

