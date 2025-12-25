"use client"

import Image from "next/image"
import { GalleryItem } from "./types"

interface EdgeGridProps {
  images: GalleryItem[]
  onImageClick: (item: GalleryItem) => void
}

export function EdgeGrid({ images, onImageClick }: EdgeGridProps) {
  // We need at least 9 images for the full grid pattern
  // Repeat images if we don't have enough
  const gridImages = images.length >= 9 
    ? images 
    : [...images, ...images, ...images].slice(0, 9)

  return (
    <section className="w-full bg-white">
      {/* Row 1: 3 images with varying heights */}
      <div className="flex gap-0">
        {/* Left: Tall vertical */}
        <button
          onClick={() => onImageClick(gridImages[0])}
          className="relative flex-1 aspect-[3/4] overflow-hidden cursor-pointer"
        >
          <Image
            src={gridImages[0].highResSrc}
            alt={gridImages[0].alt}
            fill
            className="object-cover"
            sizes="33vw"
            loading="lazy"
          />
        </button>
        
        {/* Center: 2 stacked */}
        <div className="flex-1 flex flex-col gap-0">
          <button
            onClick={() => onImageClick(gridImages[1])}
            className="relative flex-1 overflow-hidden cursor-pointer"
          >
            <Image
              src={gridImages[1].highResSrc}
              alt={gridImages[1].alt}
              fill
              className="object-cover"
              sizes="33vw"
              loading="lazy"
            />
          </button>
          <div className="flex-1 bg-[#5ba3a3]" />
        </div>
        
        {/* Right: Tall vertical */}
        <button
          onClick={() => onImageClick(gridImages[2])}
          className="relative flex-1 aspect-[3/4] overflow-hidden cursor-pointer"
        >
          <Image
            src={gridImages[2].highResSrc}
            alt={gridImages[2].alt}
            fill
            className="object-cover"
            sizes="33vw"
            loading="lazy"
          />
        </button>
      </div>

      {/* Row 2: 3 columns with different arrangements */}
      <div className="flex gap-0 mt-0">
        {/* Left: 2 stacked */}
        <div className="flex-1 flex flex-col gap-0">
          <div className="flex-1 bg-white" />
          <button
            onClick={() => onImageClick(gridImages[3])}
            className="relative flex-1 overflow-hidden cursor-pointer"
          >
            <Image
              src={gridImages[3].highResSrc}
              alt={gridImages[3].alt}
              fill
              className="object-cover"
              sizes="33vw"
              loading="lazy"
            />
          </button>
        </div>
        
        {/* Center: Large image spanning full height */}
        <button
          onClick={() => onImageClick(gridImages[4])}
          className="relative flex-1 aspect-[3/4] overflow-hidden cursor-pointer"
        >
          <Image
            src={gridImages[4].highResSrc}
            alt={gridImages[4].alt}
            fill
            className="object-cover"
            sizes="33vw"
            loading="lazy"
          />
        </button>
        
        {/* Right: 2 stacked */}
        <div className="flex-1 flex flex-col gap-0">
          <button
            onClick={() => onImageClick(gridImages[5])}
            className="relative flex-1 overflow-hidden cursor-pointer"
          >
            <Image
              src={gridImages[5].highResSrc}
              alt={gridImages[5].alt}
              fill
              className="object-cover"
              sizes="33vw"
              loading="lazy"
            />
          </button>
          <button
            onClick={() => onImageClick(gridImages[6])}
            className="relative flex-1 overflow-hidden cursor-pointer"
          >
            <Image
              src={gridImages[6].highResSrc}
              alt={gridImages[6].alt}
              fill
              className="object-cover"
              sizes="33vw"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
