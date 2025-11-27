// List 100 items - edit this file to add/update items
// Set completed: true and optionally add completedDate or link

export type ListItem = {
  id: number
  text: string
  completed: boolean
  completedDate?: string  // e.g., "2024-11-27"
  link?: string           // optional link to proof/blog post
  category?: string
}

export const list100Items: ListItem[] = [
  // Life milestones
  { id: 1, text: "Own a house", completed: false, category: "life" },
  { id: 2, text: "Own a car", completed: false, category: "life" },
  { id: 3, text: "Own a bike", completed: false, category: "life" },
  { id: 4, text: "Learn to drive", completed: true, category: "life" },
  
  // Travel
  { id: 5, text: "Visit Japan", completed: false, category: "travel" },
  { id: 6, text: "Go on a road trip", completed: true, completedDate: "2024-06", category: "travel" },
  { id: 7, text: "See the Northern Lights", completed: false, category: "travel" },
  { id: 8, text: "Visit all 7 continents", completed: false, category: "travel" },
  { id: 9, text: "Backpack through Europe", completed: false, category: "travel" },
  
  // Fitness & Health
  { id: 10, text: "Run a marathon", completed: false, category: "fitness" },
  { id: 11, text: "Learn to swim", completed: true, completedDate: "2023-08", category: "fitness" },
  { id: 12, text: "Do 100 pushups in one go", completed: false, category: "fitness" },
  { id: 13, text: "Complete a triathlon", completed: false, category: "fitness" },
  { id: 14, text: "Achieve under 15% body fat", completed: false, category: "fitness" },
  
  // Skills
  { id: 15, text: "Learn a musical instrument", completed: false, category: "skills" },
  { id: 16, text: "Learn a new language", completed: false, category: "skills" },
  { id: 17, text: "Give a public talk", completed: false, category: "skills" },
  { id: 18, text: "Write a book", completed: false, category: "skills" },
  { id: 19, text: "Learn to cook 10 cuisines", completed: false, category: "skills" },
  
  // Career & Creation
  { id: 20, text: "Build a b2c startup", completed: false, category: "career" },
  { id: 21, text: "Build a b2b startup", completed: false, category: "career" },
  { id: 22, text: "Mentor someone", completed: false, category: "career" },
  { id: 23, text: "Start a company", completed: false, category: "career" },
  { id: 24, text: "Speak at a conference", completed: false, category: "career" },
  
  // Photography
  { id: 25, text: "Have a photo exhibition", completed: false, category: "photography" },
  { id: 26, text: "Photograph a wedding", completed: false, category: "photography" },
  { id: 27, text: "Get published in a magazine", completed: false, category: "photography" },
  { id: 28, text: "Master film photography", completed: false, category: "photography" },
  
  // Experiences
  { id: 29, text: "Watch a sunrise from a mountain", completed: false, category: "experience" },
  { id: 30, text: "Camp under the stars", completed: false, category: "experience" },
  { id: 31, text: "Watch a sunrise from a mountain", completed: false, category: "experience" },
  
  // Add more items as needed...
  // The list will automatically show completion progress
]

export function getCompletedCount(): number {
  return list100Items.filter(item => item.completed).length
}

export function getTotalCount(): number {
  return list100Items.length
}

export function getCategories(): string[] {
  const categories = new Set(list100Items.map(item => item.category).filter(Boolean))
  return Array.from(categories) as string[]
}

