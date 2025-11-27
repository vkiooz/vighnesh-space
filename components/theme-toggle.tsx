"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-8 h-8" />
  }

  // Get the current effective theme (system theme if theme is "system")
  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("system")
    } else if (theme === "system") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
      title={`Current theme: ${theme} (${currentTheme})`}
    >
      {theme === "system" ? (
        <Monitor className="w-4 h-4" />
      ) : isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}

