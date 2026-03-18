import rideData from "@/content/rides.json"

export type Ride = {
  msg_id: string
  date: string
  day_of_week: string
  time_of_day: string
  ride_type: string | null
  amount_paid_INR: number
  trip_charge_INR: number
  payment: string
  distance_km: number
  duration_min: number
  from: string
  to: string
}

export const rides: Ride[] = rideData as Ride[]

export function getRideTypes(): string[] {
  return [...new Set(rides.map((r) => r.ride_type).filter(Boolean))].sort() as string[]
}

export function getTimesOfDay(): string[] {
  return [...new Set(rides.map((r) => r.time_of_day).filter(Boolean))].sort() as string[]
}

function shortenAddress(addr: string): string {
  if (!addr) return ""
  // Extract the most recognizable part (area name)
  const parts = addr.split(",").map((s) => s.trim())
  // Try to find a recognizable area name (skip house numbers, pin codes, state, country)
  const skip = /^\d|karnataka|india|bengaluru|bangalore/i
  const meaningful = parts.filter((p) => !skip.test(p))
  return meaningful.slice(0, 2).join(", ") || parts[0]
}

export function shortFrom(ride: Ride): string {
  return shortenAddress(ride.from)
}

export function shortTo(ride: Ride): string {
  return shortenAddress(ride.to)
}
