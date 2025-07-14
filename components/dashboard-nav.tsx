"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Users,
  Bot,
  Copy,
  PenTool,
  BarChart3,
  Settings,
  Home,
  BookOpen,
  Dna,
  Bell,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

interface DashboardNavProps {
  isCollapsed: boolean
}

export function DashboardNav({ isCollapsed }: DashboardNavProps) {
  const pathname = usePathname()

  const mainNavItems = [
    {
      name: "Message Generator",
      href: "/dashboard/generator",
      icon: MessageSquare,
      description: "Create platform-specific messages",
    },
    {
      name: "DM Builder",
      href: "/dashboard/dm-builder",
      icon: Users,
      description: "Build personalized direct messages",
    },
  ]

  const renderNavItems = (items: typeof mainNavItems) => {
    return items.map((item) => {
      const isActive = pathname === item.href
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent" : "transparent",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <item.icon className="h-4 w-4" />
          {!isCollapsed && (
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{item.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          )}
        </Link>
      )
    })
  }

  return (
    <nav className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2 px-2">
        {!isCollapsed && (
          <>
            <span className="text-lg font-semibold">PixlPost</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </>
        )}
      </div>

      <div className="space-y-1">
        <h4 className={cn("px-2 text-xs font-semibold", isCollapsed && "hidden")}>Main</h4>
        {renderNavItems(mainNavItems)}
      </div>
    </nav>
  )
} 