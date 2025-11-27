"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { list100Items, getCompletedCount, getTotalCount, getCategories, type ListItem } from "@/lib/list100"
import { Check, ExternalLink } from "lucide-react"

export default function List100Page() {
  const [filter, setFilter] = useState<string>("all")
  const completed = getCompletedCount()
  const total = getTotalCount()
  const categories = getCategories()
  const percentage = Math.round((completed / total) * 100)

  const filteredItems = filter === "all" 
    ? list100Items 
    : filter === "completed"
    ? list100Items.filter(item => item.completed)
    : filter === "pending"
    ? list100Items.filter(item => !item.completed)
    : list100Items.filter(item => item.category === filter)

  return (
    <main>
      <Navigation />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-medium mb-2">List 100</h1>
        <p className="text-muted-foreground text-sm mb-4">
          100 things to do before I turn 100. (Incomplete)
        </p>
        
        {/* Progress */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            {completed} of {total} ({percentage}%)
          </span>
          <div className="flex-1 max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/30 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6 text-sm">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          all
        </FilterButton>
        <FilterButton active={filter === "completed"} onClick={() => setFilter("completed")}>
          done
        </FilterButton>
        <FilterButton active={filter === "pending"} onClick={() => setFilter("pending")}>
          pending
        </FilterButton>
        <span className="text-muted-foreground mx-1">·</span>
        {categories.map(cat => (
          <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
            {cat}
          </FilterButton>
        ))}
      </div>

      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredItems.map((item) => (
          <ListItemCard key={item.id} item={item} />
        ))}
      </div>

    </main>
  )
}

function FilterButton({ 
  children, 
  active, 
  onClick 
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

function ListItemCard({ item }: { item: ListItem }) {
  return (
    <div 
      className={`group flex items-start gap-2 p-3 rounded-lg border transition-colors ${
        item.completed 
          ? "border-border/50 bg-muted/30" 
          : "border-border hover:border-muted-foreground/30"
      }`}
    >
      <div className={`w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center ${
        item.completed 
          ? "border-foreground/30 bg-foreground/10" 
          : "border-muted-foreground/30"
      }`}>
        {item.completed && <Check className="w-2.5 h-2.5 text-foreground/60" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-snug ${item.completed ? "text-muted-foreground" : "text-foreground"}`}>
          {item.text}
        </p>
        {item.completed && (
          <div className="flex items-center gap-2 mt-1">
            {item.completedDate && (
              <span className="text-xs text-muted-foreground">{item.completedDate}</span>
            )}
            {item.link && (
              <Link 
                href={item.link} 
                target="_blank"
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
              >
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

