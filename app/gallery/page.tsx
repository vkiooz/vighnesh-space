"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Navigation } from "@/components/navigation"

type GalleryItem = {
  id: number
  src: string
  highResSrc: string
  alt: string
  category: string
  title: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, src: "/gallery/thumbnails/DSCF0923.JPG", highResSrc: "/gallery/web-optimized/DSCF0923.JPG", alt: "Urban Scene", category: "street", title: "Urban Moments" },
  { id: 2, src: "/gallery/thumbnails/DSCF0924 (1).JPG", highResSrc: "/gallery/web-optimized/DSCF0924 (1).JPG", alt: "Architecture", category: "architecture", title: "Architectural Lines" },
  { id: 3, src: "/gallery/thumbnails/DSCF0928.JPG", highResSrc: "/gallery/web-optimized/DSCF0928.JPG", alt: "Portrait", category: "people", title: "Human Stories" },
  { id: 4, src: "/gallery/thumbnails/DSCF1347.JPG", highResSrc: "/gallery/web-optimized/DSCF1347.JPG", alt: "Nature", category: "nature", title: "Natural Beauty" },
  { id: 5, src: "/gallery/thumbnails/DSCF1534.JPG", highResSrc: "/gallery/web-optimized/DSCF1534.JPG", alt: "City Life", category: "street", title: "City Life" },
  { id: 6, src: "/gallery/thumbnails/DSCF1605 (1).JPG", highResSrc: "/gallery/web-optimized/DSCF1605 (1).JPG", alt: "Geometric", category: "architecture", title: "Geometric Patterns" },
  { id: 7, src: "/gallery/thumbnails/Image (14).jpg", highResSrc: "/gallery/web-optimized/Image (14).jpg", alt: "Creative", category: "people", title: "Creative Expression" },
]

const categories = ["all", "street", "architecture", "people", "nature"]

export default function GalleryPage() {
  const [filter, setFilter] = useState("all")
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const filtered = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter)

  return (
    <main>
      <Navigation />

      <div className="mb-6">
        <h1 className="text-xl font-medium mb-2">Gallery</h1>
        <p className="text-muted-foreground text-sm mb-4">
          Photography. Finding the extraordinary in the ordinary.
        </p>
        <div className="flex gap-3 text-sm">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={filter === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group relative aspect-square overflow-hidden bg-muted"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-3xl w-full max-h-[80vh]" onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox.highResSrc}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
            <p className="mt-3 text-sm text-muted-foreground">{lightbox.title}</p>
          </div>
        </div>
      )}
    </main>
  )
}
