"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { rides, getRideTypes, getTimesOfDay, shortFrom, shortTo, type Ride } from "@/lib/rides"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"

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

export default function RidesPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const [filterType, setFilterType] = useState<string>("all")
  const [filterTime, setFilterTime] = useState<string>("all")

  if (isLoaded && !isSignedIn) redirect("/")
  if (!isLoaded) {
    return (
      <main>
        <Navigation />
        <p className="text-sm text-muted-foreground py-8">Loading...</p>
      </main>
    )
  }

  const rideTypes = getRideTypes()
  const timesOfDay = getTimesOfDay()

  const filtered = rides.filter((r) => {
    if (filterType !== "all" && r.ride_type !== filterType) return false
    if (filterTime !== "all" && r.time_of_day !== filterTime) return false
    return true
  })

  const filteredByMonth: Record<string, Ride[]> = {}
  for (const ride of filtered) {
    const month = ride.date.slice(0, 7)
    if (!filteredByMonth[month]) filteredByMonth[month] = []
    filteredByMonth[month].push(ride)
  }
  const sortedMonths = Object.keys(filteredByMonth).sort((a, b) => b.localeCompare(a))

  // Stats
  const totalSpent = rides.reduce((s, r) => s + r.amount_paid_INR, 0)
  const totalDistance = rides.reduce((s, r) => s + r.distance_km, 0)
  const totalDuration = rides.reduce((s, r) => s + r.duration_min, 0)
  const avgPerRide = totalSpent / rides.length
  const totalSaved = rides.reduce((s, r) => s + (r.trip_charge_INR - r.amount_paid_INR), 0)

  // Monthly spending
  const monthlyData: Record<string, { month: string; spent: number; count: number }> = {}
  for (const r of rides) {
    const key = r.date.slice(0, 7)
    if (!monthlyData[key]) {
      const d = new Date(r.date)
      monthlyData[key] = {
        month: d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        spent: 0, count: 0,
      }
    }
    monthlyData[key].spent += r.amount_paid_INR
    monthlyData[key].count += 1
  }
  const spendingByMonth = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ ...v, spent: Math.round(v.spent) }))

  // Ride type breakdown
  const typeCounts: Record<string, number> = {}
  for (const r of rides) {
    const type = r.ride_type || "Unknown"
    typeCounts[type] = (typeCounts[type] || 0) + 1
  }
  const typeData = Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }))

  // Time of day breakdown
  const timeCounts: Record<string, number> = {}
  for (const r of rides) {
    const time = r.time_of_day || "unknown"
    timeCounts[time] = (timeCounts[time] || 0) + 1
  }
  const timeData = Object.entries(timeCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }))

  // Day of week breakdown
  const dayCounts: Record<string, number> = {}
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  for (const r of rides) {
    dayCounts[r.day_of_week] = (dayCounts[r.day_of_week] || 0) + 1
  }
  const dayData = dayOrder
    .filter((d) => dayCounts[d])
    .map((name) => ({ name: name.slice(0, 3), value: dayCounts[name] }))

  // Top routes
  const routeCounts: Record<string, { from: string; to: string; count: number; totalSpent: number }> = {}
  for (const r of rides) {
    const fromShort = shortFrom(r)
    const toShort = shortTo(r)
    const key = `${fromShort} → ${toShort}`
    if (!routeCounts[key]) routeCounts[key] = { from: fromShort, to: toShort, count: 0, totalSpent: 0 }
    routeCounts[key].count += 1
    routeCounts[key].totalSpent += r.amount_paid_INR
  }
  const topRoutes = Object.values(routeCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  // Yearly spending
  const yearlySpending: Record<string, number> = {}
  for (const r of rides) {
    const year = r.date.slice(0, 4)
    yearlySpending[year] = (yearlySpending[year] || 0) + r.amount_paid_INR
  }
  const yearlyData = Object.entries(yearlySpending)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, spent]) => ({ year, spent: Math.round(spent) }))

  return (
    <main>
      <Navigation />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-medium mb-2">Uber Rides</h1>
        <p className="text-muted-foreground text-sm mb-4">
          A log of Uber rides in Bengaluru.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{rides.length} rides</span>
          <span>·</span>
          <span>{Math.round(totalDistance)} km</span>
          <span>·</span>
          <span>{Math.round(totalDuration / 60)} hrs</span>
        </div>
      </div>

      {/* Analytics on small screens */}
      <div className="lg:hidden mb-8 space-y-4">
        <RideAnalytics
          totalSpent={totalSpent}
          avgPerRide={avgPerRide}
          totalDistance={totalDistance}
          totalDuration={totalDuration}
          totalSaved={totalSaved}
          spendingByMonth={spendingByMonth}
          typeData={typeData}
          timeData={timeData}
          dayData={dayData}
          topRoutes={topRoutes}
          yearlyData={yearlyData}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6 text-sm">
            <FilterButton active={filterType === "all"} onClick={() => setFilterType("all")}>
              all types
            </FilterButton>
            {rideTypes.map((t) => (
              <FilterButton key={t} active={filterType === t} onClick={() => setFilterType(t)}>
                {t} ({typeCounts[t]})
              </FilterButton>
            ))}
            <span className="text-muted-foreground mx-1">·</span>
            <FilterButton active={filterTime === "all"} onClick={() => setFilterTime("all")}>
              all times
            </FilterButton>
            {timesOfDay.map((t) => (
              <FilterButton key={t} active={filterTime === t} onClick={() => setFilterTime(t)}>
                {t} ({timeCounts[t]})
              </FilterButton>
            ))}
          </div>

          {/* Ride list */}
          {sortedMonths.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8">No rides match the selected filters.</p>
          ) : (
            <div className="space-y-8">
              {sortedMonths.map((month) => {
                const d = new Date(month + "-01")
                const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                return (
                  <section key={month}>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">{label}</h2>
                    <div className="space-y-2">
                      {filteredByMonth[month].map((ride) => (
                        <RideCard key={ride.msg_id} ride={ride} />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </div>

        {/* Right column: analytics */}
        <div className="hidden lg:block lg:w-[420px] flex-shrink-0">
          <div className="sticky top-8 space-y-4">
            <RideAnalytics
              totalSpent={totalSpent}
              avgPerRide={avgPerRide}
              totalDistance={totalDistance}
              totalDuration={totalDuration}
              totalSaved={totalSaved}
              spendingByMonth={spendingByMonth}
              typeData={typeData}
              timeData={timeData}
              dayData={dayData}
              topRoutes={topRoutes}
              yearlyData={yearlyData}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded transition-colors ${
        active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function RideAnalytics({
  totalSpent, avgPerRide, totalDistance, totalDuration, totalSaved,
  spendingByMonth, typeData, timeData, dayData, topRoutes, yearlyData,
}: {
  totalSpent: number
  avgPerRide: number
  totalDistance: number
  totalDuration: number
  totalSaved: number
  spendingByMonth: { month: string; spent: number; count: number }[]
  typeData: { name: string; value: number }[]
  timeData: { name: string; value: number }[]
  dayData: { name: string; value: number }[]
  topRoutes: { from: string; to: string; count: number; totalSpent: number }[]
  yearlyData: { year: string; spent: number }[]
}) {
  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-muted-foreground">Total Spent</div>
          <div className="text-lg font-medium mt-0.5">₹{Math.round(totalSpent).toLocaleString("en-IN")}</div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-muted-foreground">Avg / Ride</div>
          <div className="text-lg font-medium mt-0.5">₹{Math.round(avgPerRide)}</div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-muted-foreground">Total Distance</div>
          <div className="text-lg font-medium mt-0.5">{Math.round(totalDistance)} km</div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-muted-foreground">Total Time</div>
          <div className="text-lg font-medium mt-0.5">{Math.round(totalDuration / 60)} hrs</div>
        </div>
      </div>
      {totalSaved > 0 && (
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-muted-foreground">Discounts Saved</div>
          <div className="text-lg font-medium mt-0.5">₹{Math.round(totalSaved).toLocaleString("en-IN")}</div>
        </div>
      )}

      {/* Monthly spending */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={spendingByMonth}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} width={50} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [`₹${v}`, "Spent"]} />
            <Bar dataKey="spent" fill="hsl(var(--foreground))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ride type breakdown */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Ride Type</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="40%" height={120}>
            <PieChart>
              <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} strokeWidth={1} stroke="hsl(var(--background))">
                {typeData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-1.5">
            {typeData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
                <span className="ml-auto font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time of day */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Time of Day</h3>
        <div className="space-y-2">
          {timeData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span className="text-muted-foreground capitalize">{d.name}</span>
              <span className="ml-auto font-medium">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day of week */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Rides by Day</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={dayData}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} width={30} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="value" fill="hsl(var(--foreground))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top routes */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Top Routes</h3>
        <div className="space-y-2.5">
          {topRoutes.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-xs gap-2">
              <span className="text-muted-foreground truncate">{r.from} <span className="text-muted-foreground/70">→ {r.to}</span></span>
              <span className="font-medium flex-shrink-0">×{r.count} <span className="text-muted-foreground font-normal">₹{Math.round(r.totalSpent)}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Yearly spending */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Yearly Spending</h3>
        <ResponsiveContainer width="100%" height={120}>
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

function RideCard({ ride }: { ride: Ride }) {
  const date = new Date(ride.date)
  const formattedDate = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  const from = shortFrom(ride)
  const to = shortTo(ride)

  return (
    <div className="group p-3 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="text-center flex-shrink-0 pt-0.5">
            <div className="text-sm">
              <span className="font-medium">{formattedDate.split(" ")[0]}</span>{" "}
              <span className="text-muted-foreground">{formattedDate.split(" ")[1]}</span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground truncate">
              {from} <span className="text-muted-foreground/70">→ {to}</span>
            </div>
            <div className="text-[10px] text-muted-foreground/50 mt-1">
              {ride.distance_km} km · {ride.duration_min} min
              {ride.time_of_day && ` · ${ride.time_of_day}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-medium">₹{ride.amount_paid_INR}</span>
          {ride.ride_type && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {ride.ride_type.replace("Uber ", "")}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
