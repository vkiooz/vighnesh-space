"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { GalleryItem, Project } from "./types"

interface ProjectSectionProps {
  project: Project
  variant: "duo" | "tall" | "featured"
  allImages: GalleryItem[]
  onImageClick: (item: GalleryItem) => void
}

export function ProjectSection({ project, variant, allImages, onImageClick }: ProjectSectionProps) {
  return (
    <section className="py-16 md:py-20 border-t border-black/[0.08]">
      {/* Project Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 px-10 md:px-16 pb-16 md:pb-20 max-w-[1600px] mx-auto">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-none tracking-tight">
            {project.title}
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-5">
          <p className="text-sm leading-relaxed text-black/60 max-w-[400px]">
            {project.description}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest pt-4 border-t border-black/20 cursor-pointer hover:opacity-60 transition-opacity">
            <span>View Collection</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Project Images - Overflow Layout */}
      {(variant === "duo" || variant === "tall") && (
        <div className="flex gap-2 md:gap-3 overflow-hidden">
          {/* Left peek */}
          <button
            onClick={() => onImageClick(variant === "duo" ? allImages[6] : allImages[0])}
            className={`gallery-peek gallery-peek-left relative flex-shrink-0 overflow-hidden cursor-pointer opacity-70 hover:opacity-90 transition-opacity ${
              variant === "tall" ? "aspect-[2/3]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={(variant === "duo" ? allImages[6] : allImages[0]).highResSrc}
              alt={(variant === "duo" ? allImages[6] : allImages[0]).alt}
              fill
              className="object-cover object-right"
              sizes="15vw"
              loading="lazy"
            />
          </button>
          
          {/* Main images */}
          {(variant === "duo" ? project.images.slice(0, 2) : project.images).map((item) => (
            <button
              key={item.id}
              onClick={() => onImageClick(item)}
              className={`relative flex-1 min-w-0 overflow-hidden cursor-pointer group ${
                variant === "tall" ? "aspect-[3/4] md:aspect-[2/3]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={item.highResSrc}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 35vw"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-serif text-lg md:text-xl mb-1">{item.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{item.description}</p>
              </div>
            </button>
          ))}
          
          {/* Right peek */}
          <button
            onClick={() => onImageClick(variant === "duo" ? allImages[5] : allImages[1])}
            className={`gallery-peek gallery-peek-right relative flex-shrink-0 overflow-hidden cursor-pointer opacity-70 hover:opacity-90 transition-opacity ${
              variant === "tall" ? "aspect-[2/3]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={(variant === "duo" ? allImages[5] : allImages[1]).highResSrc}
              alt={(variant === "duo" ? allImages[5] : allImages[1]).alt}
              fill
              className="object-cover object-left"
              sizes="15vw"
              loading="lazy"
            />
          </button>
        </div>
      )}

      {/* Featured Layout */}
      {variant === "featured" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 px-10 md:px-16 max-w-[1800px] mx-auto">
          <button
            onClick={() => onImageClick(project.images[0])}
            className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
          >
            <Image
              src={project.images[0].highResSrc}
              alt={project.images[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </button>
          <button
            onClick={() => onImageClick(project.images[1])}
            className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
          >
            <Image
              src={project.images[1].highResSrc}
              alt={project.images[1].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-serif text-lg md:text-xl mb-1">{project.images[1].title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{project.images[1].description}</p>
            </div>
          </button>
        </div>
      )}
    </section>
  )
}
