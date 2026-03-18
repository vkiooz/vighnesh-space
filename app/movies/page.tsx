"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Navigation } from "@/components/navigation"
import { movies, getMoviesByYear, getYears, getFormats, getUniqueMovieCount, type Movie } from "@/lib/movies"

export default function MoviesPage() {
  const { isSignedIn } = useAuth()
  const [filterYear, setFilterYear] = useState<string>("all")
  const [filterFormat, setFilterFormat] = useState<string>("all")
  const years = getYears()
  const formats = getFormats()
  const moviesByYear = getMoviesByYear()

  const filtered = movies.filter((m) => {
    if (filterYear !== "all" && !m.date.startsWith(filterYear)) return false
    if (filterFormat !== "all" && m.format !== filterFormat) return false
    return true
  })

  const filteredByYear: Record<string, Movie[]> = {}
  for (const movie of filtered) {
    const year = movie.date.slice(0, 4)
    if (!filteredByYear[year]) filteredByYear[year] = []
    filteredByYear[year].push(movie)
  }

  const sortedYears = Object.keys(filteredByYear).sort((a, b) => b.localeCompare(a))

  return (
    <main>
      <Navigation />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-medium mb-2">Movies</h1>
        <p className="text-muted-foreground text-sm mb-4">
          A log of every movie I&apos;ve watched in theatres.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{movies.length} screenings</span>
          <span>·</span>
          <span>{getUniqueMovieCount()} unique titles</span>
          <span>·</span>
          <span>{years.length} years</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6 text-sm">
        <FilterButton active={filterYear === "all"} onClick={() => setFilterYear("all")}>
          all years
        </FilterButton>
        {years.map((year) => (
          <FilterButton key={year} active={filterYear === year} onClick={() => setFilterYear(year)}>
            {year} ({moviesByYear[year].length})
          </FilterButton>
        ))}
        <span className="text-muted-foreground mx-1">·</span>
        <FilterButton active={filterFormat === "all"} onClick={() => setFilterFormat("all")}>
          all formats
        </FilterButton>
        {formats.map((fmt) => (
          <FilterButton key={fmt} active={filterFormat === fmt} onClick={() => setFilterFormat(fmt)}>
            {fmt}
          </FilterButton>
        ))}
      </div>

      {/* Movie List */}
      {sortedYears.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8">No movies match the selected filters.</p>
      ) : (
        <div className="space-y-8">
          {sortedYears.map((year) => (
            <section key={year}>
              <h2 className="text-sm font-medium text-muted-foreground mb-3">{year}</h2>
              <div className="space-y-2">
                {filteredByYear[year].map((movie) => (
                  <MovieCard key={movie.booking_id} movie={movie} showDetails={!!isSignedIn} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  )
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded transition-colors ${
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function MovieCard({ movie, showDetails }: { movie: Movie; showDetails: boolean }) {
  const date = new Date(movie.date)
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })

  return (
    <div className="group flex items-start gap-3 p-3 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors">
      <div className="w-10 text-center flex-shrink-0 pt-0.5">
        <div className="text-sm font-medium">{formattedDate.split(" ")[0]}</div>
        <div className="text-xs text-muted-foreground">{formattedDate.split(" ")[1]}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <a
            href={`https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium leading-snug hover:underline"
          >
            {movie.title}
          </a>
          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
            {movie.format}
          </span>
        </div>
        {showDetails && (
          <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            <span>{movie.time}</span>
            <span>{movie.screen}</span>
            <span>{movie.venue}</span>
            {movie.tickets && <span>{movie.tickets} ticket{movie.tickets > 1 ? "s" : ""}</span>}
            {movie.amount_paid_INR && <span>₹{movie.amount_paid_INR.toFixed(2)}</span>}
          </div>
        )}
        {(movie.note || movie.notes) && (
          <p className="text-xs text-muted-foreground/70 mt-1 italic">{movie.notes || movie.note}</p>
        )}
      </div>
    </div>
  )
}
