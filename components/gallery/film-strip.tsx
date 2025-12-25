"use client"

import Image from "next/image"
import { GalleryItem } from "./types"

interface FilmStripProps {
  images: GalleryItem[]
  onImageClick: (item: GalleryItem) => void
}

export function FilmStrip({ images, onImageClick }: FilmStripProps) {
  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="flex gap-2 md:gap-3 px-10 md:px-16 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
        {images.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onImageClick(item)}
            className="relative flex-shrink-0 w-[280px] h-[380px] md:w-[340px] md:h-[450px] lg:w-[400px] lg:h-[530px] overflow-hidden"
          >
            <Image
              src={item.highResSrc}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, (max-width: 1200px) 340px, 400px"
              loading={index < 3 ? "eager" : "lazy"}
              priority={index === 0}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
