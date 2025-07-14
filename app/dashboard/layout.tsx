"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-background",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <DashboardNav isCollapsed={isCollapsed} />
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 3v18" />
                    <path d="M14 15l3-3 3 3" />
                    <path d="M14 9l3 3 3-3" />
                  </svg>
                </button>
              </div>
              <UserNav />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 container py-6">
          {children}
        </main>
      </div>
    </div>
  )
} 