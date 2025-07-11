"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef<number>(0)
  const positionRef = useRef(0)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    const contentElement = contentRef.current

    if (!marqueeElement || !contentElement) return

    const animate = () => {
      if (pauseOnHover && isHovered) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const marqueeWidth = marqueeElement.offsetWidth
      const contentWidth = contentElement.offsetWidth

      if (direction === "left") {
        positionRef.current -= speed / 60 // 60fps
        if (positionRef.current <= -contentWidth) {
          positionRef.current = marqueeWidth
        }
      } else {
        positionRef.current += speed / 60
        if (positionRef.current >= marqueeWidth) {
          positionRef.current = -contentWidth
        }
      }

      contentElement.style.transform = `translateX(${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize position
    if (direction === "left") {
      positionRef.current = marqueeElement.offsetWidth
    } else {
      positionRef.current = -contentElement.offsetWidth
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, direction, pauseOnHover, isHovered])

  return (
    <div
      ref={marqueeRef}
      className={cn("relative overflow-hidden", className)}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={contentRef}
        className="absolute whitespace-nowrap will-change-transform"
      >
        {children}
      </div>
    </div>
  )
} 