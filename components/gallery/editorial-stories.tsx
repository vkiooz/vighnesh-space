"use client"

import Image from "next/image"
import { GalleryItem } from "./types"

interface EditorialStory {
  image: GalleryItem
  date: string
  title: string
  description: string
}

interface EditorialStoriesProps {
  stories: EditorialStory[]
  onImageClick: (item: GalleryItem) => void
}

export function EditorialStories({ stories, onImageClick }: EditorialStoriesProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      {stories.map((story, index) => (
        <article 
          key={index} 
          className="max-w-[80%] mx-auto px-8 md:px-12 lg:px-16 mb-20 md:mb-32 last:mb-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 lg:gap-24 items-start">
            {/* Large Image */}
            <button
              onClick={() => onImageClick(story.image)}
              className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <Image
                src={story.image.highResSrc}
                alt={story.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
                loading="lazy"
              />
            </button>
            
            {/* Text Content */}
            <div className="flex flex-col justify-start pt-0 md:pt-4">
              {/* Date */}
              <span className="text-sm text-gray-400 mb-3 tracking-wide">
                {story.date}
              </span>
              
              {/* Title */}
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-gray-900 mb-6">
                {story.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                {story.description}
              </p>
              
              {/* Read More Link */}
              {/* <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-600 transition-colors inline-block border-b border-gray-300 pb-0.5 w-fit">
                Read More
              </span> */}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

