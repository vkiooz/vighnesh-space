"use client"

import Image from "next/image"
import { GalleryItem } from "./types"

interface GalleryHeroProps {
  image: GalleryItem
  onImageClick: (item: GalleryItem) => void
  isLoaded: boolean
}

export function GalleryHero({ image, onImageClick, isLoaded }: GalleryHeroProps) {
  return (
    <section className={`relative w-full h-[60vh] min-h-[500px] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={() => onImageClick(image)}
        className="relative w-full h-full block cursor-pointer"
      >
        <Image
          src={image.highResSrc}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-300">
          <span className="text-white text-sm md:text-base tracking-[0.25em] lowercase font-light">
            welcome to the city
          </span>
        </div>
      </button>
    </section>
  )
}
