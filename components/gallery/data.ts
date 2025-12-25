import { Project, GalleryItem } from "./types"

// All individual images
export const galleryImages: GalleryItem[] = [
  // Original images
  { id: 1, src: "/gallery/DSCF0923.JPG", highResSrc: "/gallery/DSCF0923.JPG", alt: "Urban Scene", category: "street", title: "Morning Light", description: "The way light hits concrete at 7am" },
  { id: 2, src: "/gallery/DSCF0924 (1).JPG", highResSrc: "/gallery/DSCF0924 (1).JPG", alt: "Architecture", category: "architecture", title: "Curves & Lines", description: "Finding geometry in chaos" },
  { id: 3, src: "/gallery/DSCF0928.JPG", highResSrc: "/gallery/DSCF0928.JPG", alt: "Portrait", category: "people", title: "Contemplation", description: "Lost in thought" },
  { id: 4, src: "/gallery/DSCF1347.JPG", highResSrc: "/gallery/DSCF1347.JPG", alt: "Nature", category: "nature", title: "Nestled in Nature", description: "Waking up to serene nature" },
  { id: 5, src: "/gallery/DSCF1534.JPG", highResSrc: "/gallery/DSCF1534.JPG", alt: "City Life", category: "street", title: "Golden Hour", description: "When the city glows" },
  { id: 6, src: "/gallery/DSCF1605 (1).JPG", highResSrc: "/gallery/DSCF1605 (1).JPG", alt: "Geometric", category: "architecture", title: "Spiral Ascent", description: "Looking up at possibilities" },
  { id: 7, src: "/gallery/Image (14).png", highResSrc: "/gallery/Image (14).png", alt: "Creative", category: "people", title: "Elegance in Muted Tones", description: "Beauty in simplicity" },
  
  // New images
  { id: 8, src: "/gallery/dog.jpg", highResSrc: "/gallery/dog.jpg", alt: "Dog", category: "life", title: "Loyal Friend", description: "A moment of pure joy", objectPosition: "top" },
  { id: 9, src: "/gallery/lady.jpg", highResSrc: "/gallery/lady.jpg", alt: "Portrait", category: "people", title: "Grace", description: "Timeless elegance captured" },
  { id: 10, src: "/gallery/hola.jpg", highResSrc: "/gallery/hola.jpg", alt: "Greeting", category: "street", title: "Hola", description: "A warm welcome" },
  { id: 11, src: "/gallery/lightpainting.JPG", highResSrc: "/gallery/lightpainting.JPG", alt: "Light Painting", category: "creative", title: "Light Trails", description: "Painting with light in the dark" },
  { id: 12, src: "/gallery/moodytime.PNG", highResSrc: "/gallery/moodytime.PNG", alt: "Moody", category: "mood", title: "Moody Time", description: "When shadows tell stories" },
  { id: 13, src: "/gallery/prologue-me.PNG", highResSrc: "/gallery/prologue-me.PNG", alt: "Self Portrait", category: "people", title: "Prologue", description: "The beginning of a story" },
  { id: 14, src: "/gallery/randomshadow.JPG", highResSrc: "/gallery/randomshadow.JPG", alt: "Shadow", category: "abstract", title: "Random Shadow", description: "Unexpected patterns in everyday life" },
]

export const projects: Project[] = [
  {
    id: "urban-stories",
    title: "Urban Stories",
    subtitle: "Street photography from the heart of the city",
    description: "When I go out and photograph moments, usually I have a theme in mind. These are stories told through urban landscapes and fleeting encounters.",
    images: [
      galleryImages[0], // Morning Light
      galleryImages[1], // Curves & Lines
      galleryImages[9], // Hola
    ]
  },
  {
    id: "quiet-moments",
    title: "Quiet Moments",
    subtitle: "Finding stillness in movement",
    description: "Sometimes the most powerful images come from the spaces between action. These are the pauses, the reflections, the quiet.",
    images: [
      galleryImages[2], // Contemplation
      galleryImages[3], // Nestled in Nature
      galleryImages[7], // Dog
    ]
  },
  {
    id: "architectural-forms",
    title: "Architectural Forms",
    subtitle: "Structure, light, and shadow",
    description: "Architecture tells the story of human ambition. These images explore the interplay of form and function.",
    images: [
      galleryImages[5], // Spiral Ascent
      galleryImages[6], // Elegance
      galleryImages[13], // Random Shadow
    ]
  }
]

// Hero image
export const heroImage = galleryImages[4] // Golden Hour

// All images flat for lightbox navigation
export const allImages: GalleryItem[] = galleryImages
