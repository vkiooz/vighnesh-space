"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      {/* Persistent Sidebar */}
      <div className="fixed top-0 left-0 h-full w-20 bg-white/80 backdrop-blur-md border-r border-gray-200/50 shadow-lg z-50 flex flex-col items-center py-6">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="flex items-center justify-center">
            <div className="w-12 h-8 bg-black rounded-xl flex items-center justify-center font-mono text-white text-sm">
              v/s
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center space-y-4 flex-1">
          <Link
            href="/"
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100/50 hover:bg-gray-200/70 transition-all duration-200 hover:scale-110"
            title="Home"
          >
            <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <div className="absolute left-16 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Home
            </div>
          </Link>

          <Link
            href="/about"
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100/50 hover:bg-gray-200/70 transition-all duration-200 hover:scale-110"
            title="About"
          >
            <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div className="absolute left-16 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              About
            </div>
          </Link>

          <Link
            href="/gallery"
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100/50 hover:bg-gray-200/70 transition-all duration-200 hover:scale-110"
            title="Gallery"
          >
            <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="absolute left-16 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Gallery
            </div>
          </Link>

          <Link
            href="/contact"
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100/50 hover:bg-gray-200/70 transition-all duration-200 hover:scale-110"
            title="Contact"
          >
            <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="absolute left-16 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Contact
            </div>
          </Link>
        </nav>

        {/* Bottom indicator dot */}
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-auto"></div>
      </div>

      {/* Content area with left margin to account for sidebar */}
      <div className="ml-20">
        {/* This is where the page content will be rendered */}
      </div>
    </>
  )
}
