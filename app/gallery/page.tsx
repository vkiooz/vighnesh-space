"use client"

import { useState, useEffect } from "react"
import {
  GalleryNav,
  GalleryHero,
  FilmStrip,
  ProjectSection,
  StatementBanner,
  PhotoStories,
  EdgeGrid,
  EditorialStories,
  HeroBanner,
  FinalGrid,
  GalleryFooter,
  GalleryLightbox,
  projects,
  heroImage,
  allImages,
  GalleryItem,
} from "@/components/gallery"

// Photo stories data - using new images
const photoStories = [
  {
    image: allImages[8], // Lady
    category: "Portrait",
    date: "12/25/24",
    title: "Grace in Motion",
    description: "There's something timeless about capturing genuine moments. The light fell perfectly that afternoon, and everything aligned for just a second."
  },
  {
    image: allImages[10], // Light Painting
    category: "Creative",
    date: "12/20/24",
    title: "Painting with Light",
    description: "Long exposures reveal a world invisible to the naked eye. These trails of light tell stories of movement, time, and the magic of patience."
  },
  {
    image: allImages[12], // Prologue Me
    category: "Life",
    date: "11/15/24",
    title: "Prologue",
    description: "Every story has a beginning. This self-portrait marks the start of a visual journey, a commitment to seeing the world differently."
  }
]

// Editorial stories data - using new images
const editorialStories = [
  {
    image: allImages[11], // Moody Time
    date: "5/30/19",
    title: "Moody Afternoons",
    description: "When shadows tell stories and light plays hide and seek. These moody moments capture the poetry in ordinary days."
  },
  {
    image: allImages[5], // Prologue Me
    date: "5/29/19",
    title: "Welcome to the City",
    description: "The city is a canvas, and I'm just a brush. These images capture the essence of a city that never sleeps, where every corner tells a story."
  },
  {
    image: allImages[13], // Random Shadow
    date: "5/29/19",
    title: "Found Patterns",
    description: "Architecture leaves its mark everywhere. These accidental geometries remind us that art hides in plain sight, waiting to be noticed."
  }
]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const openLightbox = (item: GalleryItem) => {
    const idx = allImages.findIndex(i => i.id === item.id)
    setLightboxIndex(idx)
    setLightbox(item)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % allImages.length 
      : (lightboxIndex - 1 + allImages.length) % allImages.length
    setLightboxIndex(newIndex)
    setLightbox(allImages[newIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === 'ArrowRight') navigateLightbox('next')
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox, lightboxIndex])

  // Map project index to variant type
  const getVariant = (index: number): "duo" | "tall" | "featured" => {
    if (index === 0) return "duo"
    if (index === 1) return "tall"
    return "featured"
  }

  return (
    <div className="gallery-luxe">
      {/* Navigation */}
      <GalleryNav />

      {/* Hero Section */}
      <GalleryHero 
        image={heroImage} 
        onImageClick={openLightbox} 
        isLoaded={isLoaded} 
      />

      {/* Film Strip */}
      <FilmStrip 
        images={allImages} 
        onImageClick={openLightbox} 
      />

      {/* Project Sections */}
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          variant={getVariant(index)}
          allImages={allImages}
          onImageClick={openLightbox}
        />
      ))}

      {/* Statement Banner */}
      <StatementBanner />

      {/* Photo Stories */}
      <PhotoStories 
        stories={photoStories}
        onImageClick={openLightbox}
      />

      {/* Edge-to-Edge Grid */}
      {/* <EdgeGrid 
        images={allImages}
        onImageClick={openLightbox}
      /> */}

      {/* Editorial Stories */}
      <EditorialStories
        stories={editorialStories}
        onImageClick={openLightbox}
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Final Grid */}
      <FinalGrid 
        images={allImages} 
        onImageClick={openLightbox} 
      />

      {/* Footer */}
      <GalleryFooter />

      {/* Lightbox */}
      {lightbox && (
        <GalleryLightbox
          item={lightbox}
          currentIndex={lightboxIndex}
          totalCount={allImages.length}
          onClose={() => setLightbox(null)}
          onPrev={() => navigateLightbox('prev')}
          onNext={() => navigateLightbox('next')}
        />
      )}
    </div>
  )
}
