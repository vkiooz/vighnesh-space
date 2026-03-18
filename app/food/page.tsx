"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { orders, getRestaurants, getPlatforms, type FoodOrder } from "@/lib/food"
import { getItemImage, getFoodImage } from "@/lib/food-images"
import { getItemCalories, getOrderCalories } from "@/lib/food-calories"
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

export default function FoodPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const [filterPlatform, setFilterPlatform] = useState<string>("all")
  const [filterRestaurant, setFilterRestaurant] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "poster">("poster")
  const [selectedOrder, setSelectedOrder] = useState<FoodOrder | null>(null)

  if (isLoaded && !isSignedIn) {
    redirect("/")
  }

  if (!isLoaded) {
    return (
      <main>
        <Navigation />
        <p className="text-sm text-muted-foreground py-8">Loading...</p>
      </main>
    )
  }

  const platforms = getPlatforms()
  const restaurants = getRestaurants()

  const filtered = orders.filter((o) => {
    if (filterPlatform !== "all" && o.platform !== filterPlatform) return false
    if (filterRestaurant !== "all" && o.restaurant !== filterRestaurant) return false
    return true
  })

  const filteredByMonth: Record<string, FoodOrder[]> = {}
  for (const order of filtered) {
    const month = order.date.slice(0, 7)
    if (!filteredByMonth[month]) filteredByMonth[month] = []
    filteredByMonth[month].push(order)
  }

  const sortedMonths = Object.keys(filteredByMonth).sort((a, b) => b.localeCompare(a))

  const totalSpent = orders.reduce((sum, o) => sum + o.amount_paid_INR, 0)
  const avgPerOrder = totalSpent / orders.length

  // Monthly spending
  const monthlyData: Record<string, { month: string; spent: number; count: number }> = {}
  for (const o of orders) {
    const key = o.date.slice(0, 7)
    if (!monthlyData[key]) {
      const d = new Date(o.date)
      monthlyData[key] = {
        month: d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        spent: 0,
        count: 0,
      }
    }
    monthlyData[key].spent += o.amount_paid_INR
    monthlyData[key].count += 1
  }
  const spendingByMonth = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ ...v, spent: Math.round(v.spent) }))

  // Restaurant breakdown
  const restaurantCounts: Record<string, number> = {}
  for (const o of orders) {
    restaurantCounts[o.restaurant] = (restaurantCounts[o.restaurant] || 0) + 1
  }
  const restaurantData = Object.entries(restaurantCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }))

  // Platform breakdown
  const platformCounts: Record<string, number> = {}
  for (const o of orders) {
    platformCounts[o.platform] = (platformCounts[o.platform] || 0) + 1
  }
  const platformData = Object.entries(platformCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }))

  // Top items
  const itemCounts: Record<string, number> = {}
  for (const o of orders) {
    for (const item of o.items) {
      const name = item.name.replace(/\s*\[.*?\]\s*/g, " ").replace(/\s*\(.*?\)\s*/g, " ").trim()
      itemCounts[name] = (itemCounts[name] || 0) + item.quantity
    }
  }
  const topItems = Object.entries(itemCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }))

  // Spending by restaurant
  const restaurantSpending: Record<string, number> = {}
  for (const o of orders) {
    restaurantSpending[o.restaurant] = (restaurantSpending[o.restaurant] || 0) + o.amount_paid_INR
  }
  const spendingByRestaurant = Object.entries(restaurantSpending)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value: Math.round(value) }))

  // Total discounts saved
  const totalDiscount = orders.reduce((sum, o) => sum + (o.discount || 0), 0)

  // Avg order value by restaurant
  const avgByRestaurant = Object.entries(restaurantSpending)
    .map(([name, total]) => ({ name, value: Math.round(total / restaurantCounts[name]) }))
    .sort((a, b) => b.value - a.value)

  // Yearly spending
  const yearlySpending: Record<string, number> = {}
  for (const o of orders) {
    const year = o.date.slice(0, 4)
    yearlySpending[year] = (yearlySpending[year] || 0) + o.amount_paid_INR
  }
  const yearlyData = Object.entries(yearlySpending)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, spent]) => ({ year, spent: Math.round(spent) }))

  return (
    <main>
      <Navigation />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-medium mb-2">Food Orders</h1>
        <p className="text-muted-foreground text-sm mb-4">
          A log of food delivery orders.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{orders.length} orders</span>
            <span>·</span>
            <span>{restaurants.length} restaurants</span>
            <span>·</span>
            <span>{platforms.length} platforms</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode("poster")}
              className={`px-2 py-1 rounded transition-colors ${viewMode === "poster" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              poster
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2 py-1 rounded transition-colors ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              list
            </button>
          </div>
        </div>
      </div>

      {/* Analytics on small screens */}
      <div className="lg:hidden mb-8 space-y-4">
        <FoodAnalytics
          totalSpent={totalSpent}
          avgPerOrder={avgPerOrder}
          totalDiscount={totalDiscount}
          spendingByMonth={spendingByMonth}
          restaurantData={restaurantData}
          platformData={platformData}
          topItems={topItems}
          spendingByRestaurant={spendingByRestaurant}
          avgByRestaurant={avgByRestaurant}
          yearlyData={yearlyData}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6 text-sm">
            <FilterButton active={filterPlatform === "all"} onClick={() => setFilterPlatform("all")}>
              all platforms
            </FilterButton>
            {platforms.map((p) => (
              <FilterButton key={p} active={filterPlatform === p} onClick={() => setFilterPlatform(p)}>
                {p} ({platformCounts[p]})
              </FilterButton>
            ))}
            <span className="text-muted-foreground mx-1">·</span>
            <FilterButton active={filterRestaurant === "all"} onClick={() => setFilterRestaurant("all")}>
              all restaurants
            </FilterButton>
            {restaurants.map((r) => (
              <FilterButton key={r} active={filterRestaurant === r} onClick={() => setFilterRestaurant(r)}>
                {r} ({restaurantCounts[r]})
              </FilterButton>
            ))}
          </div>

          {/* Order list */}
          {sortedMonths.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8">No orders match the selected filters.</p>
          ) : (
            <div className="space-y-8">
              {sortedMonths.map((month) => {
                const d = new Date(month + "-01")
                const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                return (
                  <section key={month}>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">{label}</h2>
                    {viewMode === "poster" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredByMonth[month].map((order) => (
                          <FoodPosterCard key={order.order_id} order={order} onClick={() => setSelectedOrder(order)} />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredByMonth[month].map((order) => (
                          <OrderCard key={order.order_id} order={order} />
                        ))}
                      </div>
                    )}
                  </section>
                )
              })}
            </div>
          )}
        </div>

        {/* Right column: analytics */}
        <div className="hidden lg:block lg:w-[420px] flex-shrink-0">
          <div className="sticky top-8 space-y-4">
            <FoodAnalytics
              totalSpent={totalSpent}
              avgPerOrder={avgPerOrder}
              totalDiscount={totalDiscount}
              spendingByMonth={spendingByMonth}
              restaurantData={restaurantData}
              platformData={platformData}
              topItems={topItems}
              spendingByRestaurant={spendingByRestaurant}
              avgByRestaurant={avgByRestaurant}
              yearlyData={yearlyData}
            />
          </div>
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </main>
  )
}

function OrderModal({ order, onClose }: { order: FoodOrder; onClose: () => void }) {
  const date = new Date(order.date)
  const formattedDate = date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative bg-background border border-border rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <div className="font-medium">{order.restaurant}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{formattedDate}</div>
          </div>
        </div>

        {/* Items */}
        <div className="p-4 space-y-3">
          {order.items.map((item, i) => {
            const img = getItemImage(item.name, order.restaurant)
            const cal = getItemCalories(item.name)
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 h-32 rounded-lg bg-muted flex-shrink-0 overflow-hidden relative">
                  {img ? (
                    <Image src={img} alt={item.name} fill className="object-cover" sizes="128px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-lg">🍽</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.quantity > 1 && `×${item.quantity}`}
                    {item.price && ` · ₹${item.price}`}
                    {cal !== null && ` · ~${cal * item.quantity} kcal`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 space-y-1.5 text-xs">
          {order.item_total && (
            <div className="flex justify-between text-muted-foreground">
              <span>Item total</span><span>₹{order.item_total}</span>
            </div>
          )}
          {order.discount && (
            <div className="flex justify-between text-muted-foreground">
              <span>Discount</span><span>-₹{order.discount}</span>
            </div>
          )}
          {order.taxes && (
            <div className="flex justify-between text-muted-foreground">
              <span>Taxes</span><span>₹{order.taxes}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-sm pt-1.5 border-t border-dashed border-border">
            <span>Paid</span><span>₹{order.amount_paid_INR}</span>
          </div>
          {(() => { const cal = getOrderCalories(order.items); return cal ? (
            <div className="flex justify-between text-muted-foreground">
              <span>Est. calories</span><span>~{cal} kcal</span>
            </div>
          ) : null })()}
          <div className="flex justify-between text-muted-foreground pt-1">
            <span className="capitalize">{order.platform}</span>
            <span>{order.delivery_address}</span>
          </div>
        </div>
      </div>
    </div>
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

function FoodAnalytics({
  totalSpent,
  avgPerOrder,
  totalDiscount,
  spendingByMonth,
  restaurantData,
  platformData,
  topItems,
  spendingByRestaurant,
  avgByRestaurant,
  yearlyData,
}: {
  totalSpent: number
  avgPerOrder: number
  totalDiscount: number
  spendingByMonth: { month: string; spent: number; count: number }[]
  restaurantData: { name: string; value: number }[]
  platformData: { name: string; value: number }[]
  topItems: { name: string; value: number }[]
  spendingByRestaurant: { name: string; value: number }[]
  avgByRestaurant: { name: string; value: number }[]
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
          <div className="text-xs text-muted-foreground">Avg / Order</div>
          <div className="text-lg font-medium mt-0.5">₹{Math.round(avgPerOrder)}</div>
        </div>
      </div>
      {totalDiscount > 0 && (
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-muted-foreground">Total Discounts Saved</div>
          <div className="text-lg font-medium mt-0.5">₹{Math.round(totalDiscount).toLocaleString("en-IN")}</div>
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

      {/* Restaurant breakdown */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Top Restaurants</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="50%" height={160}>
            <PieChart>
              <Pie data={restaurantData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} strokeWidth={1} stroke="hsl(var(--background))">
                {restaurantData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-1.5">
            {restaurantData.slice(0, 8).map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
                <span className="ml-auto font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform breakdown */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Platform Split</h3>
        <div className="space-y-2">
          {platformData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span className="text-muted-foreground capitalize">{d.name}</span>
              <span className="ml-auto font-medium">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top items */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Most Ordered Items</h3>
        <div className="space-y-2">
          {topItems.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground/50 w-4 text-right flex-shrink-0">{i + 1}</span>
              <span className="text-muted-foreground truncate">{d.name}</span>
              <span className="ml-auto font-medium flex-shrink-0">×{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spending by restaurant */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Spending by Restaurant</h3>
        <div className="space-y-2">
          {spendingByRestaurant.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{d.name}</span>
              <span className="font-medium flex-shrink-0 ml-2">₹{d.value.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Avg order value by restaurant */}
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">Avg Order by Restaurant</h3>
        <div className="space-y-2">
          {avgByRestaurant.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{d.name}</span>
              <span className="font-medium flex-shrink-0 ml-2">₹{d.value}</span>
            </div>
          ))}
        </div>
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


function FoodPosterCard({ order, onClick }: { order: FoodOrder; onClick: () => void }) {
  const date = new Date(order.date)
  const formattedDate = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  // Collect unique images for all items
  const images: string[] = []
  const seen = new Set<string>()
  for (const item of order.items) {
    const img = getItemImage(item.name, order.restaurant)
    if (img && !seen.has(img)) {
      seen.add(img)
      images.push(img)
    }
  }

  return (
    <div className="rounded-lg border border-border hover:border-muted-foreground/30 transition-colors overflow-hidden cursor-pointer" onClick={onClick}>
      {/* Image */}
      <div className="aspect-[4/3] relative bg-muted">
        {images.length >= 4 ? (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            {images.slice(0, 4).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 640px) 25vw, 17vw" />
              </div>
            ))}
          </div>
        ) : images.length >= 2 ? (
          <div className="grid grid-cols-2 w-full h-full">
            {images.slice(0, 2).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 640px) 25vw, 17vw" />
              </div>
            ))}
          </div>
        ) : images.length === 1 ? (
          <Image
            src={images[0]}
            alt={order.restaurant}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-3xl">
            🍽
          </div>
        )}
      </div>
      {/* Calorie strip */}
      {(() => { const cal = getOrderCalories(order.items); return cal ? (
        <div className="bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">
          ~{cal} kcal
        </div>
      ) : null })()}
      {/* Details */}
      <div className="p-2.5">
        <div className="flex items-start justify-between gap-1">
          <div className="text-sm font-medium truncate">{order.restaurant}</div>
          <span className="text-sm font-medium flex-shrink-0">₹{Math.round(order.amount_paid_INR)}</span>
        </div>
        <div className="text-[10px] text-muted-foreground/70 mt-1 line-clamp-2">
          {order.items.map((item, i) => (
            <span key={i}>
              {i > 0 && " · "}
              {item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ""}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-muted-foreground">{formattedDate}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">
            {order.platform}
          </span>
        </div>
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: FoodOrder }) {
  const date = new Date(order.date)
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })

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
            <div className="text-sm font-medium">{order.restaurant}</div>
            <div className="text-[10px] text-muted-foreground/70 mt-0.5">
              {order.items.map((item, i) => (
                <span key={i}>
                  {i > 0 && " · "}
                  {item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-medium">₹{order.amount_paid_INR.toFixed(2)}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">
            {order.platform}
          </span>
        </div>
      </div>
    </div>
  )
}
