"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { Navigation } from "@/components/navigation"
import { movies, getMoviesByYear, getYears, getFormats, getUniqueMovieCount, type Movie } from "@/lib/movies"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts"

export default function MoviesPage() {
  const { isSignedIn } = useAuth()
  const [filterYear, setFilterYear] = useState<string>("all")
  const [filterFormat, setFilterFormat] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "poster">("poster")
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

        {/* Stats + view toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{movies.length} screenings</span>
            <span>·</span>
            <span>{getUniqueMovieCount()} unique titles</span>
            <span>·</span>
            <span>{years.length} years</span>
          </div>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "poster" : "list")}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border"
          >
            {viewMode === "list" ? "poster view" : "list view"}
          </button>
        </div>
      </div>

      {/* Charts on small screens - stacks above */}
      <div className="lg:hidden mb-8 space-y-4">
        <PublicCharts />
        {isSignedIn && <MovieAnalytics />}
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left column: filters + movie list */}
        <div className="flex-1 min-w-0">
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
                  {viewMode === "list" ? (
                    <div className="space-y-2">
                      {filteredByYear[year].map((movie) => (
                        <MovieCard key={movie.booking_id} movie={movie} showDetails={!!isSignedIn} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredByYear[year].map((movie) => (
                        <TicketCard key={movie.booking_id} movie={movie} showDetails={!!isSignedIn} />
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Right column: charts (large screens only, sticky) */}
        <div className="hidden lg:block lg:w-[420px] flex-shrink-0">
          <div className="sticky top-8 space-y-4">
            <PublicCharts />
            {isSignedIn && <MovieAnalytics />}
          </div>
        </div>
      </div>
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

const CHART_COLORS = [
  "hsl(var(--foreground))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--foreground) / 0.7)",
  "hsl(var(--muted-foreground) / 0.7)",
  "hsl(var(--foreground) / 0.5)",
  "hsl(var(--muted-foreground) / 0.5)",
  "hsl(var(--foreground) / 0.35)",
  "hsl(var(--muted-foreground) / 0.35)",
]

function useChartData() {
  const monthlyData: Record<string, { month: string; spent: number; count: number }> = {}
  for (const m of movies) {
    const key = m.date.slice(0, 7)
    if (!monthlyData[key]) {
      const d = new Date(m.date)
      monthlyData[key] = {
        month: d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        spent: 0,
        count: 0,
      }
    }
    monthlyData[key].spent += m.amount_paid_INR || 0
    monthlyData[key].count += 1
  }
  const spendingByMonth = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ ...v, spent: Math.round(v.spent) }))

  const formatCounts: Record<string, number> = {}
  for (const m of movies) {
    formatCounts[m.format] = (formatCounts[m.format] || 0) + 1
  }
  const formatData = Object.entries(formatCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }))

  const yearlySpending: Record<string, number> = {}
  for (const m of movies) {
    const year = m.date.slice(0, 4)
    yearlySpending[year] = (yearlySpending[year] || 0) + (m.amount_paid_INR || 0)
  }
  const yearlyData = Object.entries(yearlySpending)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, spent]) => ({ year, spent: Math.round(spent) }))

  return { spendingByMonth, formatData, yearlyData }
}

const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--background))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "6px",
    fontSize: "12px",
    padding: "6px 10px",
  },
  labelStyle: { color: "hsl(var(--foreground))", fontWeight: 500 },
  itemStyle: { color: "hsl(var(--muted-foreground))" },
}

function PublicCharts() {
  const { spendingByMonth, formatData } = useChartData()

  return (
    <div className="space-y-4">
      {/* Screenings per month */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Screenings per Month</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={spendingByMonth}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} allowDecimals={false} width={20} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [v, "Screenings"]} />
            <Bar dataKey="count" fill="hsl(var(--foreground))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Format breakdown */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Format Breakdown</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="50%" height={160}>
            <PieChart>
              <Pie data={formatData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} strokeWidth={1} stroke="hsl(var(--background))">
                {formatData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-1.5">
            {formatData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MovieAnalytics() {
  const totalSpent = movies.reduce((sum, m) => sum + (m.amount_paid_INR || 0), 0)
  const totalTickets = movies.reduce((sum, m) => sum + (m.tickets || 0), 0)
  const avgPerTicket = totalTickets > 0 ? totalSpent / totalTickets : 0
  const { spendingByMonth, yearlyData } = useChartData()

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Spent" value={`₹${Math.round(totalSpent).toLocaleString("en-IN")}`} />
        <StatCard label="Avg / Ticket" value={`₹${Math.round(avgPerTicket)}`} />
      </div>

      {/* Monthly spending */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={spendingByMonth}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} width={50} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [`₹${v}`, "Spent"]} />
            <Area type="monotone" dataKey="spent" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground) / 0.1)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Yearly spending */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Yearly Spending</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={yearlyData}>
            <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} width={50} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [`₹${v}`, "Spent"]} />
            <Bar dataKey="spent" fill="hsl(var(--foreground))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-medium mt-0.5">{value}</div>
    </div>
  )
}

function TicketCard({ movie, showDetails }: { movie: Movie; showDetails: boolean }) {
  const date = new Date(movie.date)
  const dayName = date.toLocaleDateString("en-IN", { weekday: "short" })
  const formattedDate = date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <div className="rounded-lg border border-border hover:border-muted-foreground/30 transition-colors relative" style={{ containerType: 'inline-size' }}>
      {/* Notch semicircles on outer border */}
      {movie.poster && (
        <>
          <div className="absolute w-5 h-5 rounded-full bg-background border border-border z-10 overflow-hidden" style={{ left: 'calc(7rem - 10px)', top: '-11px', clipPath: 'inset(50% 0 0 0)' }} />
          <div className="absolute w-5 h-5 rounded-full bg-background border border-border z-10 overflow-hidden" style={{ left: 'calc(7rem - 10px)', bottom: '-11px', clipPath: 'inset(0 0 50% 0)' }} />
        </>
      )}
      <div className="flex overflow-hidden rounded-lg">
        {/* Poster */}
        {movie.poster && (
          <div className="w-28 flex-shrink-0 relative">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={112}
              height={168}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Ticket details */}
        <div className="flex-1 p-3 border-l border-dashed border-border relative">

          <div className="flex items-start justify-between gap-2">
            <a
              href={movie.imdb_url || `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium leading-snug hover:underline"
            >
              {movie.title}
            </a>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
              {movie.format}
            </span>
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            {dayName}, {formattedDate} | {movie.time}
          </div>

          {showDetails && (
            <div className="mt-2 space-y-1">
              <div className="text-[10px] text-muted-foreground/70">{movie.venue}</div>
              <div className="text-[10px] text-muted-foreground/70">{movie.screen}</div>
              {(movie.tickets || movie.amount_paid_INR) && (
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-dashed border-border">
                  {movie.tickets && (
                    <span className="text-[10px] text-muted-foreground/70">
                      {movie.tickets} ticket{movie.tickets > 1 ? "s" : ""}
                    </span>
                  )}
                  {movie.amount_paid_INR && (
                    <span className="text-sm font-medium">
                      ₹{movie.amount_paid_INR.toFixed(2)}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
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
      <div className="text-center flex-shrink-0 pt-0.5">
        <div className="text-sm"><span className="font-medium">{formattedDate.split(" ")[0]}</span> <span className="text-muted-foreground">{formattedDate.split(" ")[1]}</span></div>
        {showDetails && <div className="text-[10px] text-muted-foreground/70 mt-0.5">{movie.time}</div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <a
            href={movie.imdb_url || `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`}
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
          <>
            <div className="text-[10px] text-muted-foreground/70 mt-1 flex flex-wrap gap-x-3">
              <span>{movie.venue}</span>
              {movie.tickets && <span>{movie.tickets} ticket{movie.tickets > 1 ? "s" : ""}</span>}
              {movie.amount_paid_INR && <span>₹{movie.amount_paid_INR.toFixed(2)}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
