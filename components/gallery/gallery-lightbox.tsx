"use client"

import Image from "next/image"
import { X, ArrowLeft, ArrowRight } from "lucide-react"
import { GalleryItem } from "./types"

interface GalleryLightboxProps {
  item: GalleryItem
  currentIndex: number
  totalCount: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryLightbox({ 
  item, 
  currentIndex, 
  totalCount, 
  onClose, 
  onPrev, 
  onNext 
}: GalleryLightboxProps) {
  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-6 right-6 text-white/50 hover:text-white p-3 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>
      
      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-5 transition-colors z-10"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      
      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-5 transition-colors z-10"
      >
        <ArrowRight className="w-8 h-8" />
      </button>
      
      {/* Image */}
      <div 
        className="relative w-[90vw] h-[75vh] max-w-[1400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.highResSrc}
          alt={item.alt}
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* Info Bar */}
      <div className="absolute bottom-8 left-10 right-10 flex justify-between items-end text-white z-10">
        <div>
          <h3 className="font-serif text-lg md:text-xl mb-1">{item.title}</h3>
          {item.description && <p className="text-sm opacity-60">{item.description}</p>}
        </div>
        <span className="text-xs opacity-40 tracking-widest">
          {currentIndex + 1} / {totalCount}
        </span>
      </div>
    </div>
  )
}
