import moviesData from "@/content/movies.json"

export type Movie = {
  title: string
  format: string
  date: string
  time: string
  venue: string
  screen: string
  city: string
  booking_id: string
  note?: string
}

export const movies: Movie[] = moviesData as Movie[]

export function getMoviesByYear(): Record<string, Movie[]> {
  const grouped: Record<string, Movie[]> = {}
  for (const movie of movies) {
    const year = movie.date.slice(0, 4)
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(movie)
  }
  return grouped
}

export function getYears(): string[] {
  return Object.keys(getMoviesByYear()).sort((a, b) => b.localeCompare(a))
}

export function getFormats(): string[] {
  const formats = new Set(movies.map((m) => m.format))
  return Array.from(formats).sort()
}

export function getUniqueMovieCount(): number {
  return new Set(movies.map((m) => m.title)).size
}
