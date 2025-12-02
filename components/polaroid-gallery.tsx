"use client"

import { useState } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"

interface GalleryImage {
  src: string
  caption: string
}

interface PolaroidGalleryProps {
  images: GalleryImage[]
}

// Helper function to check if a file is a video
const isVideoFile = (src: string): boolean => {
  const videoExtensions = ['.mov', '.mp4', '.avi', '.webm']
  const ext = src.toLowerCase().substring(src.lastIndexOf('.'))
  return videoExtensions.includes(ext)
}

// Helper function to check if a file is a special image format (HEIC/DNG)
const isSpecialImageFormat = (src: string): boolean => {
  const specialExtensions = ['.heic', '.dng', '.raw']
  const ext = src.toLowerCase().substring(src.lastIndexOf('.'))
  return specialExtensions.includes(ext)
}

export function PolaroidGallery({ images }: PolaroidGalleryProps) {
  const [openImage, setOpenImage] = useState<string | null>(null)

  if (!images || images.length === 0) return null

  return (
    <>
      {/* Gallery Container */}
      <div 
        className="overflow-x-auto overflow-y-hidden -mx-6 md:mx-0"
        style={{ 
          scrollSnapType: "x mandatory", 
          touchAction: "pan-x pan-y", 
          scrollBehavior: "smooth" 
        }}
      >
        <div className="flex gap-4 md:gap-6 h-[280px] my-6 px-6 md:px-0 md:max-w-[90%] md:mx-auto items-center md:justify-center">
          {images.map((image, index) => {
            const rotation = index % 2 === 0 ? -2 : 2
            return (
              <div
                key={image.src}
                data-image-index={index}
                className="flex-shrink-0 snap-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-background rounded-sm group"
                tabIndex={0}
                role="button"
                aria-label={`Open image: ${image.caption}`}
                onClick={() => setOpenImage(image.src)}
                onKeyDown={(e) => e.key === "Enter" && setOpenImage(image.src)}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                  scrollSnapAlign: "start",
                  minWidth: "186px",
                }}
              >
                {/* Polaroid Card */}
                <div className="polaroid-card p-3 pb-12 hover:shadow-xl transition-all duration-300 relative rounded-sm border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 group-hover:scale-105">
                  {/* Media Container with vintage effects */}
                  <div className="relative h-[180px] w-[180px] overflow-hidden rounded-sm">
                    {/* Vintage grain overlay (only for images) */}
                    {!isVideoFile(image.src) && (
                      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
                    )}
                    
                    {/* Vignette effect (only for images) */}
                    {!isVideoFile(image.src) && (
                      <div className="absolute inset-0 z-10 pointer-events-none rounded-sm"
                        style={{
                          boxShadow: "inset 0 0 40px rgba(0,0,0,0.15)"
                        }}
                      />
                    )}
                    
                    {isVideoFile(image.src) ? (
                      // Video element for MOV files
                      <video
                        src={image.src.startsWith('/') ? image.src : `/${image.src}`}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    ) : (
                      // Image element for all image formats including HEIC/DNG
                      <Image
                        src={image.src.startsWith('/') ? image.src : `/${image.src}`}
                        alt={image.caption}
                        fill
                        className={`object-cover sepia-[0.1] contrast-[1.05] brightness-[1.02] ${
                          isSpecialImageFormat(image.src) ? 'opacity-90' : ''
                        }`}
                        sizes="180px"
                        onError={(e) => {
                          // Fallback for special formats that might not render directly
                          const target = e.target as HTMLImageElement
                          if (isSpecialImageFormat(image.src)) {
                            target.style.opacity = '0.7'
                            target.alt = `${image.caption} (Special format - may not display correctly in all browsers)`
                          }
                        }}
                      />
                    )}
                    
                    {/* Video indicator */}
                    {isVideoFile(image.src) && (
                      <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Caption */}
                  <div className="absolute bottom-2 left-3 right-3 h-8 flex items-center justify-center">
                    <p 
                      className="text-stone-600 dark:text-stone-400 text-center text-sm opacity-80 font-handwriting"
                      style={{ 
                        textShadow: "0 1px 1px rgba(0,0,0,0.1)" 
                      }}
                    >
                      {image.caption}
                    </p>
                  </div>
                  
                  {/* Decorative corner highlights (aged paper effect) */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-transparent via-stone-300/20 to-stone-400/30 rounded-full opacity-60 dark:via-stone-600/20 dark:to-stone-700/30" />
                  <div className="absolute bottom-14 left-2 w-2 h-2 bg-gradient-to-tl from-transparent via-stone-300/15 to-stone-400/25 rounded-full opacity-40 dark:via-stone-600/15 dark:to-stone-700/25" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal - rendered with portal to escape container constraints */}
      {openImage && typeof window !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpenImage(null)}
        >
          <div
            className="relative flex items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideoFile(openImage) ? (
              <video
                src={openImage.startsWith('/') ? openImage : `/${openImage}`}
                controls
                autoPlay
                className="w-auto h-auto max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              />
            ) : (
              <Image
                src={openImage.startsWith('/') ? openImage : `/${openImage}`}
                alt=""
                width={1200}
                height={800}
                className={`w-auto h-auto max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl object-contain ${
                  isSpecialImageFormat(openImage) ? 'opacity-95' : ''
                }`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (isSpecialImageFormat(openImage)) {
                    target.style.opacity = '0.8'
                    target.alt = "Special format image - may not display correctly in all browsers"
                  }
                }}
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default PolaroidGallery

