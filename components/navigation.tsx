"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "home" },
  { href: "/writings", label: "writings" },
  { href: "/gallery", label: "gallery" },
  { href: "/quotes", label: "quotes" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-5 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "nav-link",
              pathname === item.href && "nav-link-active"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
