"use client"

import Image from "next/image"
import { GalleryItem } from "./types"

interface PhotoStory {
  image: GalleryItem
  category: string
  date: string
  title: string
  description: string
}

interface PhotoStoriesProps {
  stories: PhotoStory[]
  onImageClick: (item: GalleryItem) => void
}

export function PhotoStories({ stories, onImageClick }: PhotoStoriesProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      {stories.map((story, index) => (
        <article key={index} className="max-w-[70%] mx-auto mb-24 md:mb-36 last:mb-0 px-10 md:px-16">
          {/* Large Image */}
          <button
            onClick={() => onImageClick(story.image)}
            className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden cursor-pointer block"
          >
            <Image
              src={story.image.highResSrc}
              alt={story.image.alt}
              fill
              className="object-cover"
              style={{ objectPosition: story.image.objectPosition || 'center' }}
              sizes="70vw"
              loading="lazy"
            />
          </button>
          
          {/* Content */}
          <div className="text-center pt-10 md:pt-12 px-5 md:px-10">
            {/* Category & Date */}
            <div className="flex items-center justify-center gap-2.5 mb-5 text-sm text-black/50">
              <span className="tracking-wide">{story.category}</span>
              <span className="opacity-40">•</span>
              <span>{story.date}</span>
            </div>
            
            {/* Title */}
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-5 text-[#1a1815]">
              {story.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm leading-relaxed text-black/60 max-w-[580px] mx-auto">
              {story.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}
