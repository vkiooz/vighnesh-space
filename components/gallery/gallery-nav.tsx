"use client"

import Link from "next/link"

export function GalleryNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link 
          href="/" 
          className="text-white text-sm tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
        >
          ← Back
        </Link>
        <span className="text-white text-sm tracking-[0.3em] uppercase">
          Gallery
        </span>
      </div>
    </nav>
  )
}

