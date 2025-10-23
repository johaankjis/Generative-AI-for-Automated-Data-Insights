"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Database, FileCode, TrendingUp, AlertTriangle, BarChart3, Sparkles } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Query Generator",
    href: "/query-generator",
    icon: FileCode,
  },
  {
    title: "Executive Summaries",
    href: "/summaries",
    icon: TrendingUp,
  },
  {
    title: "Anomaly Detection",
    href: "/anomalies",
    icon: AlertTriangle,
  },
  {
    title: "Self-Service Analytics",
    href: "/analytics",
    icon: Database,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2 px-3 py-2 mb-4">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg">AI Insights</span>
      </div>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
