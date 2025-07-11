"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

type GalleryItem = {
  id: number
  src: string
  highResSrc: string
  alt: string
  category: string
  title: string
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery/thumbnails/DSCF0923.JPG",
    highResSrc: "/gallery/web-optimized/DSCF0923.JPG",
    alt: "Street Photography - Urban Scene",
    category: "street",
    title: "Urban Moments",
    description: "Capturing life in the city",
  },
  {
    id: 2,
    src: "/gallery/thumbnails/DSCF0924 (1).JPG",
    highResSrc: "/gallery/web-optimized/DSCF0924 (1).JPG",
    alt: "Architecture - Building Details",
    category: "architecture", 
    title: "Architectural Lines",
    description: "Form and structure in focus",
  },
  {
    id: 3,
    src: "/gallery/thumbnails/DSCF0928.JPG",
    highResSrc: "/gallery/web-optimized/DSCF0928.JPG",
    alt: "Portrait Photography",
    category: "people",
    title: "Human Stories",
    description: "Authentic moments captured",
  },
  {
    id: 4,
    src: "/gallery/thumbnails/DSCF1347.JPG",
    highResSrc: "/gallery/web-optimized/DSCF1347.JPG",
    alt: "Nature Photography",
    category: "nature",
    title: "Natural Beauty",
    description: "The world through my lens",
  },
  {
    id: 5,
    src: "/gallery/thumbnails/DSCF1534.JPG",
    highResSrc: "/gallery/web-optimized/DSCF1534.JPG",
    alt: "Street Photography - City Life",
    category: "street",
    title: "City Life",
    description: "Street photography at its finest",
  },
  {
    id: 6,
    src: "/gallery/thumbnails/DSCF1605 (1).JPG",
    highResSrc: "/gallery/web-optimized/DSCF1605 (1).JPG",
    alt: "Architecture - Geometric Patterns",
    category: "architecture",
    title: "Geometric Patterns", 
    description: "Lines and angles in harmony",
  },
  {
    id: 7,
    src: "/gallery/thumbnails/Image (14).jpg",
    highResSrc: "/gallery/web-optimized/Image (14).jpg",
    alt: "Creative Photography",
    category: "people",
    title: "Creative Expression",
    description: "Art and emotion combined",
  },
]

const categories = [
  { id: "all", label: "All" },
  { id: "street", label: "Street" },
  { id: "architecture", label: "Architecture" },
  { id: "people", label: "People" },
  { id: "nature", label: "Nature" },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null)

  const filteredItems =
    activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  const openLightbox = (item: GalleryItem) => {
    setLightboxImage(item)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  return (
    <main>
      {/* Header Section */}
      <section className="py-12 bg-white border-b">
        <div className="mx-64">
          <div className="flex flex-row space-x-12">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
              <Image
                src="/me.png"
                alt="Vighnesh Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover brightness-120"
              />
            </div>
            
            <div className="flex flex-col space-y-4">
            {/* Name and Handle */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold font-noticia">Vighnesh</h1>
            </div>
            
            {/* Bio */}
            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                Capturing life's melodies in motion<br/>
                Bangalore, India
              </p>
              <div className="pt-4">
                <div className="flex justify-center">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                      <span
                        key={category.id}
                        onClick={() => setActiveFilter(category.id)}
                        className={`rounded-xl text-sm cursor-pointer px-3 py-1 hover:bg-gray-100 ${activeFilter === category.id ? "bg-gray-100" : "bg-white"}`}
                      >
                        {category.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
     

      {/* Main Gallery */}
      <section className="py-2 bg-gray-50">
        <div className="mx-2">
          <div className="grid grid-cols-3 gap-2">
            {filteredItems.map((item, index) => {
              const rowIndex = Math.floor(index / 2);
              const colIndex = index % 2;
              const isLandscapeRow = rowIndex % 2 === 0;
              const shouldBeLandscape = isLandscapeRow ? colIndex === 0 : colIndex === 1;
              
              return (
                <Card
                  key={item.id}
                  className={`cursor-pointer group overflow-hidden hover:shadow-lg transition-all duration-300 rounded-none m-0 ${
                    shouldBeLandscape 
                      ? 'col-span-2' 
                      : 'col-span-1'
                  }`}
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative h-full">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      width={600}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-lg font-bold mb-2 font-noticia">{item.title}</h3>
                        <p className="text-sm text-gray-200 leading-relaxed opacity-90">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl w-full max-h-full bg-white rounded-lg overflow-hidden flex" onClick={(e) => e.stopPropagation()}>
            {/* Image Section - Left Side */}
            <div className="flex-1 relative min-h-[80vh] bg-gray-100">
              <Image
                src={lightboxImage.highResSrc || "/placeholder.svg"}
                alt={lightboxImage.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Story/Blog Section - Right Side */}
            <div className="w-96 bg-white p-8 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 font-noticia leading-tight">
                    {lightboxImage.title}
                  </h2>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lightboxImage.description}
                  </p>
                </div>
                
                {/* Additional Story Content */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-row justify-between text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">21st July 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {lightboxImage.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-12">
                    <h3 className="font-semibold text-gray-900 mb-3">récit | story</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      This piece represents a moment captured in time, where light, composition, and emotion converge to tell a story that goes beyond the visible frame. Each element has been carefully considered to create a visual narrative that speaks to the viewer's imagination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
