export type GalleryItem = {
  id: number
  src: string
  highResSrc: string
  alt: string
  category: string
  title: string
  description?: string
  year?: string
  camera?: string
  objectPosition?: string // e.g., "top", "center", "bottom", "left", "right"
}

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  images: GalleryItem[]
}

