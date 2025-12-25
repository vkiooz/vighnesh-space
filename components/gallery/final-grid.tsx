"use client"

import Image from "next/image"
import { GalleryItem } from "./types"

interface FinalGridProps {
  images: GalleryItem[]
  onImageClick: (item: GalleryItem) => void
}

export function FinalGrid({ images, onImageClick }: FinalGridProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 px-10 md:px-16 max-w-[1800px] mx-auto mb-20">
      {images.slice(0, 4).map((item, i) => (
        <button
          key={`final-${item.id}`}
          onClick={() => onImageClick(item)}
          className={`relative overflow-hidden cursor-pointer group ${
            i === 0 
              ? "col-span-2 aspect-video md:col-span-2 md:row-span-2 md:aspect-auto" 
              : "aspect-square"
          }`}
        >
          <Image
            src={item.highResSrc}
            alt={item.alt}
            fill
            className="object-cover"
            sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
            loading="lazy"
          />
        </button>
      ))}
    </section>
  )
}
